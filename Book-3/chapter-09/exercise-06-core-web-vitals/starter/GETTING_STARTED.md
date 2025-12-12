# Getting Started: Core Web Vitals

## 🎯 Your Task

Measure and optimize Core Web Vitals (LCP, INP, CLS) to achieve all green scores.

---

## 📋 Steps to Complete

### Step 1: Install web-vitals Library

```bash
npm install web-vitals
```

---

### Step 2: Measure Current Metrics

Create `src/analytics/web-vitals.js`:

```javascript
import {onLCP, onINP, onCLS, onFCP, onTTFB} from 'web-vitals';

function logMetric(metric) {
  console.log(metric.name, metric.value);
}

onLCP(logMetric);
onINP(logMetric);
onCLS(logMetric);
onFCP(logMetric);
onTTFB(logMetric);
```

Import in your `main.js`:
```javascript
import './analytics/web-vitals';
```

---

### Step 3: Document Baseline

Run your app and note the metrics:

| Metric | Current | Target | Status |
|--------|---------|--------|--------|
| LCP | __ s | < 2.5s | ⚪ |
| INP | __ ms | < 200ms | ⚪ |
| CLS | __ | < 0.1 | ⚪ |

---

### Step 4: Optimize LCP (Largest Contentful Paint)

**Target: < 2.5s**

**Common fixes:**

1. **Optimize LCP image:**
   ```html
   <link rel="preload" as="image" href="hero.webp">
   <img src="hero.webp" fetchpriority="high" alt="Hero">
   ```

2. **Remove render-blocking resources:**
   ```html
   <script src="app.js" defer></script>
   ```

3. **Use CDN** for faster delivery

---

### Step 5: Optimize INP (Interaction to Next Paint)

**Target: < 200ms**

**Common fixes:**

1. **Debounce expensive operations:**
   ```javascript
   import { debounce } from 'lodash';

   const handleSearch = debounce((query) => {
     // Expensive operation
   }, 300);
   ```

2. **Use React.memo:**
   ```javascript
   const ExpensiveComponent = memo(({ data }) => {
     // ...
   });
   ```

3. **Break up long tasks:**
   ```javascript
   async function processItems(items) {
     for (let item of items) {
       await processItem(item);
       await new Promise(r => setTimeout(r, 0)); // Yield
     }
   }
   ```

---

### Step 6: Fix CLS (Cumulative Layout Shift)

**Target: < 0.1**

**Common fixes:**

1. **Set image dimensions:**
   ```html
   <img src="photo.jpg" width="800" height="600" alt="Photo">
   ```

2. **Use font-display:**
   ```css
   @font-face {
     font-family: 'CustomFont';
     src: url('font.woff2');
     font-display: swap;
   }
   ```

3. **Reserve space for dynamic content:**
   ```css
   .ad-container {
     min-height: 250px;
   }
   ```

---

### Step 7: Re-Measure

After fixes, check metrics again:

| Metric | Before | After | Status |
|--------|--------|-------|--------|
| LCP | __ s | __ s | 🟢/🔴 |
| INP | __ ms | __ ms | 🟢/🔴 |
| CLS | __ | __ | 🟢/🔴 |

---

### Step 8: Send to Analytics (Bonus)

```javascript
import {onLCP, onINP, onCLS} from 'web-vitals';

function sendToAnalytics(metric) {
  // Send to Google Analytics
  gtag('event', metric.name, {
    value: Math.round(metric.value),
    metric_id: metric.id,
  });

  // Or send to custom endpoint
  fetch('/api/web-vitals', {
    method: 'POST',
    body: JSON.stringify(metric),
    keepalive: true
  });
}

onLCP(sendToAnalytics);
onINP(sendToAnalytics);
onCLS(sendToAnalytics);
```

---

## ✅ Success Criteria

- [ ] web-vitals library installed
- [ ] All 3 metrics measured
- [ ] LCP < 2.5s (🟢 green)
- [ ] INP < 200ms (🟢 green)
- [ ] CLS < 0.1 (🟢 green)
- [ ] Lighthouse confirms green metrics
- [ ] Documentation complete

---

## 💡 Tips

**LCP optimization:**
- Focus on hero image first
- Preload critical resources
- Use fetchpriority="high"

**INP optimization:**
- Debounce user inputs
- Use Web Workers for heavy tasks
- Optimize React re-renders

**CLS optimization:**
- Always set image dimensions
- Use font-display: swap
- Reserve space for ads/dynamic content

---

**Ready to go green? Let's optimize!** 🟢

