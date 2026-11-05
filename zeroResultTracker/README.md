# La Manivelle zero-result tracker

The tracker reads the result count myTurn rendered for a search on `/library/inventory/browse`. It records a miss only when there is a search term and the count explicitly says `0 résultats` or `0 results`. Case and spacing variants count toward the same term.

The report sorts by **catalogue misses** first. These are searches with no active filters. **Filtered misses** are reported separately and can reflect location, dates, category, or other constraints. Treat catalogue misses as leads to review for stock or search improvements. Typos and unfamiliar item names can also cause a miss.

## Try it locally

Use Node.js 22.13 or later. No packages are needed. From this directory, run:

```sh
node tracker.mjs demo
```

Open [the demo catalogue](http://127.0.0.1:8787/library/inventory/browse). With all antennas selected, `pizza` returns a result and `microscope` logs a catalogue miss. Select Meyrin and search for `pizza` to log a filtered miss. Refresh that page to check that it still counts once. The demo uses fictional stock and writes to `data/demo.sqlite`.

In a second terminal, from the same directory:

```sh
node tracker.mjs report --demo
node tracker.mjs report --demo --csv > demo-misses.csv
```

## Connect to myTurn

1. Run `node tracker.mjs serve` on a host with persistent storage. The collector listens on `127.0.0.1:8787` by default. Put it behind an HTTPS reverse proxy that forwards `/tracker.js` and `/events`. Set `PORT` to change the local port or `TRACKER_DB` to set the database path. The default live database is `data/searches.sqlite`.
2. A La Manivelle admin can add the following to **Settings → Site Customization → Public include**, using the collector's HTTPS hostname. Check whether the tenant's content security policy allows the script and its requests. [myTurn site customization documentation](https://support.myturn.com/hc/en-us/articles/206389487-Organization-Settings)

   ```html
   <script type="module" src="https://YOUR-COLLECTOR/tracker.js" referrerpolicy="no-referrer"></script>
   ```

3. Verify one matching search, one unfiltered miss, and one filtered miss on the tenant before collecting visitor traffic. Repeat in French and English and check a signed-in date filter. Use a temporary `TRACKER_DB` during verification to keep test searches out of the live report.
4. Run `node tracker.mjs report` or `node tracker.mjs report --csv > zero-result-searches.csv` on the collector host, pointing to the same database as the service.

## What gets counted

The browser sends the normalized search term and either `catalogue` or `filtered`. The SQLite database holds aggregate counts. The tracker skips terms resembling email addresses, phone numbers, or links and honors Global Privacy Control. It sends no cookies or referrer and stores no account ID, full URL, filter values, or IP address in the database. Configure any required consent through the site's existing setup, and configure proxy logs and rate limits for the public endpoint. Browser origin checks limit which sites can submit events in a browser. A custom client can forge an origin header.

Counts represent visits to qualifying search results and can include repeated searches by the same person. The tracker suppresses consecutive duplicate misses in the same tab after a successful submission. It skips back/forward navigations and pages with a nonzero pagination offset. It observes searches only on catalogue pages where the include is installed. If myTurn changes the count markup, an unrecognized count produces no event.
