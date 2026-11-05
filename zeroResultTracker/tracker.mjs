import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { createServer } from "node:http";
import { dirname } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { normalizeTerm } from "./tracker-client.mjs";

const myTurnOrigin = "https://manivelle.myturn.com";
const browsePath = "/library/inventory/browse";
const maxBodyBytes = 2048;
const clientScript = readFileSync(new URL("tracker-client.mjs", import.meta.url));

const { positionals, values } = parseArgs({
  allowPositionals: true,
  options: { csv: { type: "boolean" }, demo: { type: "boolean" } },
});
const [command] = positionals;
const demo = command === "demo" || values.demo;
const databasePath = process.env.TRACKER_DB || fileURLToPath(
  new URL(demo ? "data/demo.sqlite" : "data/searches.sqlite", import.meta.url),
);

function openCollectorDatabase() {
  mkdirSync(dirname(databasePath), { recursive: true });
  const database = new DatabaseSync(databasePath);
  database.exec(`
    PRAGMA busy_timeout = 5000;
    CREATE TABLE IF NOT EXISTS misses (
      term TEXT PRIMARY KEY,
      catalogue_misses INTEGER NOT NULL,
      filtered_misses INTEGER NOT NULL
    ) STRICT;
  `);
  return database;
}

function printReport() {
  let rows = [];
  if (existsSync(databasePath)) {
    const database = new DatabaseSync(databasePath, { readOnly: true });
    try {
      database.exec("PRAGMA busy_timeout = 5000");
      rows = database.prepare(`
        SELECT term, catalogue_misses, filtered_misses FROM misses
        ORDER BY catalogue_misses DESC, filtered_misses DESC, term
      `).all();
    } finally {
      database.close();
    }
  }

  if (values.csv) {
    console.log("term,catalogue_misses,filtered_misses");
    for (const { term, catalogue_misses, filtered_misses } of rows) {
      const safeTerm = /^[=+@-]/u.test(term) ? `'${term}` : term;
      console.log(`"${safeTerm.replaceAll('"', '""')}",${catalogue_misses},${filtered_misses}`);
    }
  } else if (rows.length) {
    console.table(rows);
  } else {
    console.log("No zero-result searches recorded.");
  }
}

function demoCatalogue(url) {
  const term = normalizeTerm(url.searchParams.get("q"));
  const filtered = url.searchParams.get("location") === "4527";
  const count = !term || (term === "pizza" && !filtered) ? 1 : 0;
  return `<!doctype html>
<html lang="fr">
<meta charset="utf-8">
<title>La Manivelle · Démonstration du suivi</title>
<main>
  <h1>Catalogue de démonstration</h1>
  <p>Données fictives. Essayez « pizza », puis « microscope ».</p>
  <form action="${browsePath}">
    <label>Objet <input id="search-within-field" name="q" type="search"></label>
    <label>Antenne <select id="location-filter" name="location">
      <option value="0">Toutes les antennes</option>
      <option value="4527"${filtered ? " selected" : ""}>Meyrin</option>
    </select></label>
    <button>Rechercher</button>
  </form>
  <section id="results-content"><h1><small>${count} résultat${count === 1 ? "" : "s"}</small></h1>
  ${count ? "<p>Four à pizza</p>" : "<p>Aucun résultat</p>"}</section>
</main>
<script type="module" src="/tracker.js" referrerpolicy="no-referrer"></script>
<script>document.querySelector('#search-within-field').value = new URLSearchParams(location.search).get('q') || '';</script>
</html>`;
}

function jsonRequest(request) {
  return request.headers["content-type"]?.split(";")[0].trim().toLowerCase() === "application/json";
}

async function collect(request, response, insertMiss) {
  if (!jsonRequest(request)) {
    response.writeHead(415).end();
    return;
  }

  const chunks = [];
  let bytes = 0;
  for await (const chunk of request.iterator({ destroyOnReturn: false })) {
    bytes += chunk.length;
    if (bytes > maxBodyBytes) {
      response.writeHead(413, { Connection: "close" }).end();
      return;
    }
    chunks.push(chunk);
  }

  let event;
  try {
    event = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    response.writeHead(400).end();
    return;
  }

  const term = normalizeTerm(event?.term);
  const scope = event?.scope;
  if (!term || (scope !== "catalogue" && scope !== "filtered")) {
    response.writeHead(400).end();
    return;
  }
  insertMiss.run(term, Number(scope === "catalogue"), Number(scope === "filtered"));
  response.writeHead(204).end();
}

function startCollector() {
  const port = Number(process.env.PORT || 8787);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("PORT must be an integer between 1 and 65535.");
  }
  const localOrigin = `http://127.0.0.1:${port}`;
  const allowedOrigin = demo ? localOrigin : myTurnOrigin;
  const database = openCollectorDatabase();
  const insertMiss = database.prepare(`
    INSERT INTO misses (term, catalogue_misses, filtered_misses) VALUES (?, ?, ?)
    ON CONFLICT(term) DO UPDATE SET
      catalogue_misses = catalogue_misses + excluded.catalogue_misses,
      filtered_misses = filtered_misses + excluded.filtered_misses
  `);

  const server = createServer(async (request, response) => {
    const path = request.url.split("?", 1)[0];
    const allowed = request.headers.origin === allowedOrigin;
    response.setHeader("Vary", "Origin");
    response.setHeader("Cache-Control", "no-store");
    response.setHeader("X-Content-Type-Options", "nosniff");
    if (allowed) response.setHeader("Access-Control-Allow-Origin", allowedOrigin);

    if (request.method === "GET" && path === "/tracker.js") {
      response.writeHead(200, { "Content-Type": "text/javascript; charset=utf-8" }).end(clientScript);
      return;
    }
    if (demo && request.method === "GET" && path === browsePath) {
      const url = new URL(request.url, localOrigin);
      response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" }).end(demoCatalogue(url));
      return;
    }
    if (path !== "/events") {
      response.writeHead(404).end();
      return;
    }
    if (!allowed) {
      response.writeHead(403).end();
      return;
    }
    if (request.method === "OPTIONS") {
      response.writeHead(204, {
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "600",
      }).end();
      return;
    }
    if (request.method !== "POST") {
      response.writeHead(405, { Allow: "POST, OPTIONS" }).end();
      return;
    }
    try {
      await collect(request, response, insertMiss);
    } catch (error) {
      console.error("Could not collect search event:", error.code || error.name);
      response.writeHead(500).end();
    }
  });

  server.listen(port, "127.0.0.1", () => {
    console.log(demo ? `Demo catalogue: ${localOrigin}${browsePath}` : `Collector: ${localOrigin}`);
    console.log(`Database: ${databasePath}`);
  });
}

if (positionals.length === 1 && command === "report") {
  printReport();
} else if (positionals.length === 1 && (command === "serve" || command === "demo") && !values.csv && !values.demo) {
  startCollector();
} else {
  console.error("Usage: node tracker.mjs serve | demo | report [--demo] [--csv]");
  process.exitCode = 1;
}
