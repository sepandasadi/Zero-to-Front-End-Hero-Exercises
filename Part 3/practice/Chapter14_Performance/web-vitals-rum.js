// Minimal RUM collector for LCP/INP/CLS
// Usage: include in production and send to your endpoint/log
// Requires: npm i web-vitals (or adapt to PerformanceObserver)
/* global webVitals */
(function () {
  function send(metric) {
    console.log('[RUM]', metric.name, metric.value, metric) // replace with fetch('/rum', {body: JSON.stringify(metric)})
  }
  if (typeof webVitals !== 'undefined') {
    webVitals.onLCP(send); webVitals.onINP(send); webVitals.onCLS(send);
  } else if ('PerformanceObserver' in window) {
    // Barebones CLS using PO
    try {
      const po = new PerformanceObserver((list) => {
        for (const e of list.getEntries()) {
          if (e.entryType === 'layout-shift' && !e.hadRecentInput) {
            send({ name: 'CLS', value: e.value, entries: [e] })
          }
        }
      })
      po.observe({ type: 'layout-shift', buffered: true })
    } catch {}
  }
})();
