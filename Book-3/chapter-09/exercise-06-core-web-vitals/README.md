# Exercise 6: Core Web Vitals Optimization

**Difficulty:** Advanced
**Time:** 2 hours
**Focus:** LCP, INP, and CLS optimization

---

## 🎯 Learning Objectives

- Understand and measure Core Web Vitals
- Optimize LCP (Largest Contentful Paint)
- Optimize INP (Interaction to Next Paint)
- Fix CLS (Cumulative Layout Shift) issues
- Monitor with Web Vitals API

---

## 📋 Requirements

### **1. Measure Current Web Vitals**

Install web-vitals library:
```bash
npm install web-vitals
```

Track metrics:
```javascript
import {onLCP, onINP, onCLS} from 'web-vitals';

onLCP(console.log);
onINP(console.log);
onCLS(console.log);
```

Document baseline scores.

### **2. Optimize LCP (Target: < 2.5s)**

**Common fixes:**
- Optimize hero image (WebP/AVIF, proper size)
- Preload LCP resource:
  ```html
  <link rel="preload" as="image" href="hero.jpg">
  ```
- Use CDN
- Avoid render-blocking JavaScript

### **3. Optimize INP (Target: < 200ms)**

**Common fixes:**
- Debounce input handlers
- Use Web Workers for heavy computations
- Optimize React re-renders (React.memo, useMemo)
- Split long tasks into smaller chunks

Example:
```javascript
// Bad: Blocks main thread
const results = heavyCalculation(data);

// Good: Use Web Worker
const worker = new Worker('worker.js');
worker.postMessage(data);
worker.onmessage = (e) => {
  const results = e.data;
};
```

### **4. Fix CLS (Target: < 0.1)**

**Common fixes:**
- Add width/height to all images:
  ```html
  <img src="product.jpg" width="800" height="600" alt="Product">
  ```
- Reserve space for ads/embeds:
  ```css
  .ad-container {
    min-height: 250px;
  }
  ```
- Use `font-display: swap` for web fonts:
  ```css
  @font-face {
    font-family: 'CustomFont';
    src: url('font.woff2');
    font-display: swap;
  }
  ```
- Avoid inserting content above existing content

### **5. Monitor with Analytics**

Send Web Vitals to Google Analytics:
```javascript
import {onLCP, onINP, onCLS} from 'web-vitals';

function sendToAnalytics({name, value, id}) {
  gtag('event', name, {
    value: Math.round(value),
    metric_id: id,
  });
}

onLCP(sendToAnalytics);
onINP(sendToAnalytics);
onCLS(sendToAnalytics);
```

---

## ✅ Acceptance Criteria

- [ ] Web Vitals tracking implemented
- [ ] LCP < 2.5s (green)
- [ ] INP < 200ms (green)
- [ ] CLS < 0.1 (green)
- [ ] All three metrics verified in Lighthouse
- [ ] Documentation of changes made
- [ ] Before/after comparison

---

## 🎁 Bonus

- Set up Real User Monitoring (RUM)
- Track Web Vitals by page/route
- Create dashboard for monitoring
- A/B test optimizations
- Field data comparison (lab vs real users)

---

## 📊 Success Metrics

**Baseline vs Optimized:**

| Metric | Baseline | Target | Final | Status |
|--------|----------|--------|-------|--------|
| LCP    | ?        | < 2.5s | ?     | ❌/✅   |
| INP    | ?        | < 200ms| ?     | ❌/✅   |
| CLS    | ?        | < 0.1  | ?     | ❌/✅   |

---

**All green = Success!** 🎉

