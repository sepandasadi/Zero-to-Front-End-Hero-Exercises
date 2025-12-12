import {onLCP, onINP, onCLS} from 'web-vitals';

export function initWebVitals() {
  function sendToAnalytics(metric) {
    const {name, value} = metric;
    const rating = getRating(name, value);
    const emoji = rating === 'good' ? '🟢' : rating === 'needs-improvement' ? '🟡' : '🔴';

    console.log(
      `%c${emoji} ${name}: ${formatValue(name, value)} (${rating})`,
      `color: ${rating === 'good' ? 'green' : rating === 'needs-improvement' ? 'orange' : 'red'}; font-weight: bold;`
    );
  }

  function getRating(name, value) {
    const thresholds = {
      LCP: [2500, 4000],
      INP: [200, 500],
      CLS: [0.1, 0.25]
    };
    const [good, needsImprovement] = thresholds[name] || [0, 0];
    if (value <= good) return 'good';
    if (value <= needsImprovement) return 'needs-improvement';
    return 'poor';
  }

  function formatValue(name, value) {
    if (name === 'CLS') return value.toFixed(3);
    return value < 1000 ? `${Math.round(value)}ms` : `${(value / 1000).toFixed(2)}s`;
  }

  onLCP(sendToAnalytics);
  onINP(sendToAnalytics);
  onCLS(sendToAnalytics);
}

