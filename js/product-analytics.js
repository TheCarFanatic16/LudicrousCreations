/* ════════════════════════════════════════════════════════════════
   LUDICROUS CREATIONS — Per-Product Pageview + Engagement Beacon
   ─────────────────────────────────────────────────────────────────
   Runs only on product-*.html pages. Two signals per visit, both
   anonymous counters (no cookies, no personal data):

   1. A view hit for this product, the moment the page loads.
   2. A time-on-page "bucket" hit, fired when the visitor leaves.
      The counter API here only supports +1 increments (no arbitrary
      add/average without an account) — so instead of a precise
      average, each view is sorted into one of 5 duration buckets.
      Read back and charted by /analytics/.
   Never throws — a blocked request or offline visitor never breaks the site.
   ════════════════════════════════════════════════════════════════ */
(function () {
    try {
        var NAMESPACE = 'ludicrous-creations-5ncv7efs';
        var match = location.pathname.match(/product-([a-z0-9-]+)\.html/i);
        if (!match) return;
        var slug = match[1].toLowerCase();
        var base = 'https://abacus.jasoncameron.dev/hit/' + NAMESPACE + '/';

        fetch(base + 'product-views-' + slug, { mode: 'cors', keepalive: true }).catch(function () {});

        var start = Date.now();
        var sent = false;
        function sendDuration() {
            if (sent) return;
            sent = true;
            var secs = (Date.now() - start) / 1000;
            var bucket = secs < 30 ? 'u30'
                       : secs < 60 ? 's30-60'
                       : secs < 180 ? 'm1-3'
                       : secs < 600 ? 'm3-10'
                       : 'm10p';
            fetch(base + 'product-time-' + slug + '-' + bucket, { mode: 'cors', keepalive: true }).catch(function () {});
        }
        document.addEventListener('visibilitychange', function () {
            if (document.visibilityState === 'hidden') sendDuration();
        });
        window.addEventListener('pagehide', sendDuration);
    } catch (e) {
        /* analytics must never break the site */
    }
})();
