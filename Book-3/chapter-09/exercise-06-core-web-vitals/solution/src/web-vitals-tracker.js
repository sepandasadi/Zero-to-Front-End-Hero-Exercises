// Complete Web Vitals tracking implementation

import {onLCP, onINP, onCLS, onFCP, onTTFB} from 'web-vitals';

// Configuration
const config = {
  enableConsoleLogging: true,
  enableAnalytics: true,
  analyticsEndpoint: '/api/web-vitals'
};

// Send to Google Analytics 4
function sendToGA4(metric) {
  if (typeof gtag === 'undefined') {
    console.warn('[Web Vitals] gtag not available');
    return;
  }

  const {name, value, id, delta} = metric;

  gtag('event', name, {
    value: Math.round(name === 'CLS' ? value * 1000 : value),
    metric_id: id,
    metric_value: value,
    metric_delta: delta,
    metric_rating: getRating(name, value)
  });
}

// Send to custom analytics endpoint
function sendToAnalytics(metric) {
  const body = JSON.stringify({
    ...metric,
    page: window.location.pathname,
    userAgent: navigator.userAgent,
    connection: navigator.connection?.effectiveType,
    deviceMemory: navigator.deviceMemory,
    timestamp: new Date().toISOString()
  });

  // Use sendBeacon for reliability (works even when page is closing)
  if (navigator.sendBeacon) {
    navigator.sendBeacon(config.analyticsEndpoint, body);
  } else {
    fetch(config.analyticsEndpoint, {
      method: 'POST',
      body,
      headers: {'Content-Type': 'application/json'},
      keepalive: true
    }).catch(err => console.error('[Web Vitals] Failed to send:', err));
  }
}

// Log to console with color coding
function logToConsole(metric) {
  const {name, value} = metric;
  const rating = getRating(name, value);
  const color = rating === 'good' ? 'green' : rating === 'needs-improvement' ? 'orange' : 'red';
  const emoji = rating === 'good' ? '🟢' : rating === 'needs-improvement' ? '🟡' : '🔴';

  const displayValue = name === 'CLS'
    ? value.toFixed(3)
    : value < 1000
      ? `${Math.round(value)}ms`
      : `${(value / 1000).toFixed(2)}s`;

  console.log(
    `%c${emoji} ${name}: ${displayValue} (${rating})`,
    `color: ${color}; font-weight: bold; font-size: 14px;`
  );
}

// Get rating based on thresholds
function getRating(name, value) {
  const thresholds = {
    LCP: [2500, 4000],
    INP: [200, 500],
    CLS: [0.1, 0.25],
    FCP: [1800, 3000],
    TTFB: [800, 1800]
  };

  const [good, needsImprovement] = thresholds[name] || [0, 0];

  if (value <= good) return 'good';
  if (value <= needsImprovement) return 'needs-improvement';
  return 'poor';
}

// Main handler for all metrics
function handleMetric(metric) {
  if (config.enableConsoleLogging) {
    logToConsole(metric);
  }

  if (config.enableAnalytics) {
    sendToGA4(metric);
    sendToAnalytics(metric);
  }

  // Dispatch custom event for UI components
  window.dispatchEvent(new CustomEvent('web-vitals', {
    detail: metric
  }));
}

// Initialize Web Vitals tracking
export function initWebVitals(options = {}) {
  // Merge options with config
  Object.assign(config, options);

  // Track all metrics
  onLCP(handleMetric);
  onINP(handleMetric);
  onCLS(handleMetric);
  onFCP(handleMetric);
  onTTFB(handleMetric);

  console.log('%c[Web Vitals] Tracking initialized', 'color: blue; font-weight: bold;');
}

// Export for manual use
export { onLCP, onINP, onCLS, onFCP, onTTFB };

