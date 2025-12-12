import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

/**
 * Report Web Vitals metrics
 *
 * Web Vitals are a set of useful metrics that aim to capture the user
 * experience of a web page. Learn more: https://web.dev/vitals/
 *
 * @param {Function} onPerfEntry - Callback function to handle metric
 */
export function reportWebVitals(onPerfEntry) {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    getCLS(onPerfEntry);  // Cumulative Layout Shift
    getFID(onPerfEntry);  // First Input Delay
    getFCP(onPerfEntry);  // First Contentful Paint
    getLCP(onPerfEntry);  // Largest Contentful Paint
    getTTFB(onPerfEntry); // Time to First Byte
  }
}

/**
 * Send metrics to analytics endpoint
 *
 * @param {Object} metric - Web Vital metric
 */
export function sendToAnalytics(metric) {
  const body = JSON.stringify({
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    id: metric.id,
    navigationType: metric.navigationType,
  });

  // Use `navigator.sendBeacon()` if available, falling back to `fetch()`
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/analytics', body);
  } else {
    fetch('/api/analytics', {
      body,
      method: 'POST',
      keepalive: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

