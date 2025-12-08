// Web Vitals monitoring setup
import { onLCP, onINP, onCLS, onFCP, onTTFB } from 'web-vitals';

function sendToAnalytics({ name, value, id, rating }) {
  // Get rating emoji
  const emoji = rating === 'good' ? '✅' : rating === 'needs-improvement' ? '⚠️' : '❌';

  console.log(`${emoji} [Web Vitals] ${name}:`, {
    value: Math.round(value),
    rating,
    id
  });

  // In production, send to your analytics service
  // Example with Google Analytics:
  // gtag('event', name, {
  //   value: Math.round(value),
  //   metric_id: id,
  //   metric_rating: rating
  // });

  // Example with custom analytics:
  // fetch('/api/analytics', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     metric: name,
  //     value: Math.round(value),
  //     rating,
  //     id,
  //     url: location.pathname,
  //     timestamp: Date.now()
  //   })
  // }).catch(err => console.error('Analytics error:', err));
}

// Track all Core Web Vitals
onLCP(sendToAnalytics);
onINP(sendToAnalytics);
onCLS(sendToAnalytics);
onFCP(sendToAnalytics);
onTTFB(sendToAnalytics);

console.log('📊 Web Vitals monitoring initialized');

