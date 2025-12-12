# Exercise 6: Core Web Vitals - Hints 💡

**Try the exercise yourself first before reading these hints!**

---

## Hint 1: Installing web-vitals Library

```bash
npm install web-vitals
```

**Basic usage:**

```javascript
import {onLCP, onINP, onCLS, onFCP, onTTFB} from 'web-vitals';

onLCP(console.log);  // Largest Contentful Paint
onINP(console.log);  // Interaction to Next Paint
onCLS(console.log);  // Cumulative Layout Shift
onFCP(console.log);  // First Contentful Paint
onTTFB(console.log); // Time to First Byte
```

---

## Hint 2: Optimizing LCP (Largest Contentful Paint)

**Target: < 2.5s**

**Common causes of slow LCP:**
1. Large images
2. Render-blocking resources
3. Slow server response
4. Client-side rendering

**Fixes:**

```html
<!-- 1. Preload LCP image -->
<link rel="preload" as="image" href="hero.jpg">

<!-- 2. Optimize image -->
<picture>
  <source srcset="hero.avif" type="image/avif">
  <source srcset="hero.webp" type="image/webp">
  <img src="hero.jpg" alt="Hero" width="1200" height="800">
</picture>

<!-- 3. Priority hint -->
<img src="hero.jpg" fetchpriority="high" alt="Hero">
```

---

## Hint 3: Optimizing INP (Interaction to Next Paint)

**Target: < 200ms**

**Common causes of slow INP:**
1. Long JavaScript tasks
2. Synchronous event handlers
3. Heavy React re-renders

**Fixes:**

```javascript
// 1. Debounce expensive operations
import { debounce } from 'lodash';

const handleSearch = debounce((query) => {
  // Expensive search operation
}, 300);

// 2. Use Web Workers for heavy computation
const worker = new Worker('worker.js');
worker.postMessage(data);
worker.onmessage = (e) => {
  updateUI(e.data);
};

// 3. React optimization
const MemoizedComponent = React.memo(ExpensiveComponent);

// 4. Break up long tasks
async function processItems(items) {
  for (let item of items) {
    await processItem(item);
    await new Promise(r => setTimeout(r, 0)); // Yield to browser
  }
}
```

---

## Hint 4: Fixing CLS (Cumulative Layout Shift)

**Target: < 0.1**

**Common causes:**
1. Images without dimensions
2. Ads/embeds
3. Web fonts (FOIT/FOUT)
4. Dynamic content injection

**Fixes:**

```html
<!-- 1. Always set image dimensions -->
<img src="photo.jpg" width="800" height="600" alt="Photo">

<!-- 2. Reserve space for ads -->
<div style="min-height: 250px; background: #f0f0f0;">
  <!-- Ad loads here -->
</div>

<!-- 3. Use font-display -->
<style>
  @font-face {
    font-family: 'CustomFont';
    src: url('font.woff2');
    font-display: swap; /* or optional */
  }
</style>

<!-- 4. CSS aspect-ratio -->
<style>
  .video-container {
    aspect-ratio: 16 / 9;
  }
</style>
```

---

## Hint 5: Sending Metrics to Analytics

**Google Analytics 4:**

```javascript
import {onLCP, onINP, onCLS} from 'web-vitals';

function sendToGoogleAnalytics({name, delta, value, id}) {
  gtag('event', name, {
    value: delta,
    metric_id: id,
    metric_value: value,
    metric_delta: delta,
  });
}

onLCP(sendToGoogleAnalytics);
onINP(sendToGoogleAnalytics);
onCLS(sendToGoogleAnalytics);
```

**Custom endpoint:**

```javascript
function sendToAnalytics(metric) {
  fetch('/api/analytics', {
    method: 'POST',
    body: JSON.stringify(metric),
    headers: {'Content-Type': 'application/json'},
    keepalive: true
  });
}

onLCP(sendToAnalytics);
```

---

## Hint 6: Real User Monitoring (RUM)

**Track metrics by page:**

```javascript
import {onLCP, onINP, onCLS} from 'web-vitals';

function sendToRUM(metric) {
  const data = {
    ...metric,
    page: window.location.pathname,
    userAgent: navigator.userAgent,
    connection: navigator.connection?.effectiveType
  };

  navigator.sendBeacon('/api/rum', JSON.stringify(data));
}

onLCP(sendToRUM);
onINP(sendToRUM);
onCLS(sendToRUM);
```

---

## Hint 7: Web Vitals Dashboard

**Create a simple dashboard:**

```javascript
// Display metrics in UI
import {onLCP, onINP, onCLS} from 'web-vitals';

const metricsDisplay = document.getElementById('metrics');

function displayMetric({name, value}) {
  const rating = value < getThreshold(name) ? '🟢' : '🔴';
  metricsDisplay.innerHTML += `
    <div>${rating} ${name}: ${value.toFixed(2)}</div>
  `;
}

function getThreshold(name) {
  return {
    LCP: 2500,
    INP: 200,
    CLS: 0.1
  }[name];
}

onLCP(displayMetric);
onINP(displayMetric);
onCLS(displayMetric);
```

---

## Hint 8: Chrome User Experience Report (CrUX)

**Check field data for your site:**

```bash
# Install CrUX API tool
npm install -g crux

# Get data for your origin
crux https://yoursite.com
```

**Shows real-world Web Vitals from actual users!**

---

## Hint 9: Testing Tools

**Lighthouse (Lab Data):**
- DevTools → Lighthouse
- Controlled environment
- Consistent results

**PageSpeed Insights (Field + Lab):**
- https://pagespeed.web.dev/
- Real user data (CrUX)
- Plus simulated data

**Web Vitals Extension:**
- Install Chrome extension
- See metrics in real-time
- Easy testing

---

## Hint 10: Quick Win Checklist

**For LCP:**
- [ ] Optimize LCP image (WebP/AVIF)
- [ ] Preload LCP resource
- [ ] Remove render-blocking resources
- [ ] Use CDN

**For INP:**
- [ ] Debounce input handlers
- [ ] Use React.memo / useMemo
- [ ] Move heavy work to Web Workers
- [ ] Break up long tasks

**For CLS:**
- [ ] Add width/height to all images
- [ ] Use font-display: swap
- [ ] Reserve space for ads/embeds
- [ ] Avoid inserting content above existing content

---

**You've got this! Green all the metrics!** 🟢🟢🟢

