/* ════════════════════════════════════════════════════════════════
   LUDICROUS CREATIONS — Pageview Beacon
   ─────────────────────────────────────────────────────────────────
   Fire-and-forget daily pageview counter. No cookies, no personal
   data collected — just an anonymous daily hit count per calendar
   day (UTC), stored in a free counter API (abacus.jasoncameron.dev).
   Read back and charted by /analytics/ (see that page for the dashboard).
   Never throws — a blocked request or offline visitor never breaks the site.
   ════════════════════════════════════════════════════════════════ */
(function () {
    try {
        var NAMESPACE = 'ludicrous-creations-2f5ai9rw';
        var today = new Date().toISOString().slice(0, 10); // UTC YYYY-MM-DD
        var url = 'https://abacus.jasoncameron.dev/hit/' + NAMESPACE + '/views-' + today;
        fetch(url, { mode: 'cors', keepalive: true }).catch(function () {});
    } catch (e) {
        /* analytics must never break the site */
    }
})();
