const browsePath = "/library/inventory/browse";
const displayParameters = new Set([
  "q", "lang", "embed", "max", "offset", "perpage", "view", "sort", "requestedformat",
  "lastfilter", "_hide_unavailable", "_hide_unavailable_reservation",
]);
const availabilityParameters = new Set(["hide_unavailable", "hide_unavailable_reservation"]);
const storageKey = "manivelle.lastZeroResult";

export function normalizeTerm(input) {
  if (typeof input !== "string") return null;
  const term = input.normalize("NFKC").trim().replace(/\s+/gu, " ").toLowerCase();
  if (term.length > 100 || !/\p{L}/u.test(term)) return null;
  if (/[@\p{Cc}\p{Cf}]|https?:|www\.|(?:\d[ .()+-]*){7}/u.test(term)) return null;
  return term;
}

function isFilter([key, value]) {
  key = key.toLowerCase();
  value = value.trim().toLowerCase();
  if (!value || displayParameters.has(key) || key.startsWith("utm_")) return false;
  if (key === "location") return value !== "0";
  if (key === "include_all_floating") return value !== "true";
  if (availabilityParameters.has(key)) return value !== "false" && value !== "0";
  // Treat unfamiliar parameters as filters so their misses stay out of the stocking report.
  return true;
}

export function observeSearch(url, document) {
  if (url.pathname.replace(/\/$/u, "") !== browsePath) return null;
  const heading = document.querySelector("#results-content h1 small");
  if (!heading) return null;

  const term = normalizeTerm(url.searchParams.get("q"));
  const count = heading.textContent.trim();
  const offset = url.searchParams.get("offset");
  if (!term || (offset && offset !== "0") || !/^0\s+(?:results?|résultats?)$/iu.test(count)) {
    return { event: null };
  }

  const filters = new URLSearchParams([...url.searchParams].filter(isFilter));
  const selectedLocation = document.querySelector("#location-filter")?.value;
  if (selectedLocation && selectedLocation !== "0" && !filters.has("location")) {
    filters.set("location", selectedLocation);
  }
  for (const name of availabilityParameters) {
    if (document.querySelector(`input[type="checkbox"][name="${name}"]:checked`)) {
      filters.set(name, "true");
    }
  }
  filters.sort();
  return {
    event: { term, scope: filters.size ? "filtered" : "catalogue" },
    signature: JSON.stringify([term, filters.toString()]),
  };
}

async function trackSearch() {
  if (navigator.globalPrivacyControl === true) return;
  if (performance.getEntriesByType("navigation")[0]?.type === "back_forward") return;
  const observation = observeSearch(new URL(window.location.href), document);
  if (!observation) return;

  let storage;
  try {
    storage = window.sessionStorage;
    if (!observation.event) storage.removeItem(storageKey);
    else if (storage.getItem(storageKey) === observation.signature) return;
  } catch {
    storage = undefined;
  }
  if (!observation.event) return;

  try {
    const response = await fetch(new URL("events", import.meta.url), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(observation.event),
      credentials: "omit",
      referrerPolicy: "no-referrer",
      keepalive: true,
    });
    if (response.ok) storage?.setItem(storageKey, observation.signature);
  } catch {
    // A collector or storage failure must never interrupt catalogue use.
  }
}

if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", trackSearch, { once: true });
  } else {
    void trackSearch();
  }
}
