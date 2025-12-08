# Challenge Project: Performance Audit & Optimization Sprint

**Duration:** 10-12 hours

**Difficulty:** ⭐⭐⭐ Advanced

**Type:** Portfolio-Worthy Comprehensive Project

---

## 🎯 Project Overview

Transform a deliberately slow React app into a high-performance application achieving:
- ✅ Lighthouse Performance Score: 90+
- ✅ Bundle Size: < 200KB (initial)
- ✅ LCP: < 2.5s
- ✅ INP: < 200ms
- ✅ CLS: < 0.1
- ✅ Memory Stable: < 150MB after 10 minutes
- ✅ All Core Web Vitals: GREEN

---

## 📋 What You'll Build

A complete performance optimization project demonstrating senior-level skills:

1. **Baseline Measurement** - Professional performance audit
2. **React Optimizations** - memo, useMemo, callback, virtualization
3. **Bundle Optimization** - Tree shaking, code splitting, dependency replacement
4. **Memory Leak Fixes** - Complete cleanup implementation
5. **Production Monitoring** - RUM with Web Vitals
6. **CI/CD Integration** - Lighthouse CI with performance gates

---

## 🔧 Starter Application

The starter app is **intentionally slow** with realistic performance problems:

### Current Problems
- 📦 Bundle: 2.5MB (way too large!)
- 🐌 10,000-item list without virtualization
- 📚 Heavy dependencies (moment.js, full lodash)
- 💧 Multiple memory leaks in Dashboard
- ⚠️ No React optimizations (no memo/useMemo/useCallback)
- 🚫 No lazy loading or code splitting

### Current Performance
- Lighthouse Performance: 25/100
- LCP: 8.5s
- INP: 850ms
- CLS: 0.35
- Bundle Size: 2.5MB
- Memory after 5min: 600MB
- Load Time (3G): 15+ seconds

---

## 📁 Project Structure

```
challenge-performance-audit/
├── starter/              # Start here
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Products.jsx  # 10,000 items, not virtualized
│   │   │   └── Dashboard.jsx # Memory leaks
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json      # Heavy dependencies
│   └── vite.config.js
├── solution/             # Reference implementation
└── README.md             # This file
```

---

## 🚀 Phase 1: Baseline Measurement (1 hour)

### Setup

```bash
cd starter
npm install
npm run dev
```

### Task 1.1: Run Lighthouse Audit

1. Build production version:
   ```bash
   npm run build
   npm run preview
   ```

2. Open http://localhost:4173 in Chrome
3. Open DevTools → Lighthouse
4. Select "Performance" only
5. Click "Analyze page load"

**Document results:**

```markdown
## Baseline Performance Audit

**Date:** ___________
**Browser:** Chrome ___

### Lighthouse Scores (Desktop)
- Performance: ____ / 100
- Accessibility: ____ / 100

### Core Web Vitals
- LCP (Largest Contentful Paint): ____ s
- INP (Interaction to Next Paint): ____ ms
- CLS (Cumulative Layout Shift): ____

### Other Metrics
- First Contentful Paint: ____ s
- Time to Interactive: ____ s
- Speed Index: ____ s
- Total Blocking Time: ____ ms
```

---

### Task 1.2: Bundle Analysis

Install analyzer:

```bash
npm install --save-dev rollup-plugin-visualizer
```

Update `vite.config.js`:

```javascript
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true
    })
  ]
});
```

Build and analyze:

```bash
npm run build
```

**Document findings:**

```markdown
### Bundle Analysis

**Total Bundle Size:** ____ KB

**Top 5 Largest Dependencies:**
1. ______________ (____ KB)
2. ______________ (____ KB)
3. ______________ (____ KB)
4. ______________ (____ KB)
5. ______________ (____ KB)

**Identified Issues:**
- [ ] moment.js included (300KB)
- [ ] Full lodash included (250KB)
- [ ] Charts not lazy loaded (200KB)
- [ ] No code splitting
- [ ] Vendor and app code bundled together
```

---

### Task 1.3: React Profiler Recording

1. Open React DevTools → Profiler
2. Click "Record"
3. Navigate to Products page
4. Type in search filter
5. Click "Stop"

**Document:**

```markdown
### React Performance Profile

**ProductList Component:**
- Render time: ____ ms
- Re-renders on search: ____ times
- ProductCard renders: ____ (should be minimal!)

**Identified Issues:**
- [ ] All products re-render on filter change
- [ ] No React.memo on ProductCard
- [ ] No useMemo for filtering/sorting
- [ ] No useCallback for event handlers
```

---

### Task 1.4: Memory Baseline

1. DevTools → Memory → Heap snapshot
2. Take snapshot (label: "Baseline")
3. Navigate to Dashboard
4. Wait 2 minutes
5. Force garbage collection
6. Take snapshot (label: "After 2min")
7. Compare snapshots

**Document:**

```markdown
### Memory Analysis

**Baseline:** ____ MB
**After 2 minutes:** ____ MB
**Growth:** ____ MB

**Detached DOM nodes:** ____
**Event listeners:** ____

**Identified Leaks:**
- [ ] WebSocket not closed
- [ ] Intervals not cleared
- [ ] Event listeners not removed
- [ ] Subscriptions not unsubscribed
```

---

## 🎯 Phase 2: React Optimizations (3 hours)

### Task 2.1: Virtualize ProductList

**File:** `src/pages/Products.jsx`

Install react-window:

```bash
npm install react-window
```

**Convert to virtualized list:**

```javascript
import { FixedSizeList } from 'react-window';

function Products() {
  // ... existing state and filtering logic ...

  return (
    <FixedSizeList
      height={600}
      itemCount={filteredProducts.length}
      itemSize={120}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>
          <ProductCard product={filteredProducts[index]} />
        </div>
      )}
    </FixedSizeList>
  );
}
```

**Expected improvement:** Render time 3000ms → 50ms (98% reduction!)

---

### Task 2.2: Add React.memo to ProductCard

**File:** `src/components/ProductCard.jsx`

```javascript
const ProductCard = React.memo(function ProductCard({ product, onAddToCart }) {
  console.log('ProductCard rendered:', product.id);

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={() => onAddToCart(product)}>Add to Cart</button>
    </div>
  );
});

export default ProductCard;
```

---

### Task 2.3: Add useMemo for Filtering/Sorting

**File:** `src/pages/Products.jsx`

```javascript
const filteredAndSorted = useMemo(() => {
  let result = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  result.sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return a.price - b.price;
  });

  return result;
}, [products, searchTerm, sortBy]);
```

---

### Task 2.4: Add useCallback for Event Handlers

```javascript
const handleAddToCart = useCallback((product) => {
  setCart(prev => [...prev, product]);
}, []);

const handleSort = useCallback((newSortBy) => {
  setSortBy(newSortBy);
}, []);
```

---

### Task 2.5: Verify React Optimizations

Re-run React Profiler:

**Before vs After:**

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| List render time | 3000ms | ____ ms | ____ % |
| ProductCard re-renders | 10,000 | ____ | ____ % |
| Typing responsiveness | Laggy | ____ | ✅ |

---

## 📦 Phase 3: Bundle Optimization (2 hours)

### Task 3.1: Replace moment.js with date-fns

```bash
npm uninstall moment
npm install date-fns
```

**Find and replace all moment usage:**

```javascript
// Before
import moment from 'moment';
const formatted = moment().format('MMMM Do YYYY');

// After
import { format } from 'date-fns';
const formatted = format(new Date(), 'MMMM do yyyy');
```

**Expected savings:** ~280KB

---

### Task 3.2: Optimize lodash

```bash
npm uninstall lodash
npm install lodash-es
```

**Replace imports:**

```javascript
// Before
import _ from 'lodash';
_.debounce(fn, 300);

// After
import debounce from 'lodash-es/debounce';
debounce(fn, 300);
```

**Or use native alternatives:**

```javascript
// Uniq
const uniq = arr => [...new Set(arr)];

// Debounce
function debounce(fn, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}
```

**Expected savings:** ~230KB

---

### Task 3.3: Lazy Load Dashboard

```javascript
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/dashboard"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Dashboard />
          </Suspense>
        }
      />
    </Routes>
  );
}
```

---

### Task 3.4: Manual Chunk Splitting

**vite.config.js:**

```javascript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          charts: ['recharts']
        }
      }
    }
  }
});
```

---

### Task 3.5: Verify Bundle Improvements

Re-run bundle analysis:

| Metric | Before | After | Savings |
|--------|--------|-------|---------|
| Total bundle | 2.5MB | ____ KB | ____ % |
| moment.js | 300KB | 0KB | 100% |
| lodash | 250KB | ____ KB | ____ % |
| Initial load | 2.5MB | ____ KB | ____ % |

---

## 🔧 Phase 4: Memory Leak Fixes (2 hours)

### Task 4.1: Fix All Leaks in Dashboard

**File:** `src/pages/Dashboard.jsx`

Fix these leaks:

1. **WebSocket:**
```javascript
useEffect(() => {
  const ws = new WebSocket('wss://api.example.com');
  ws.onmessage = handleMessage;

  return () => ws.close(); // ✅
}, []);
```

2. **Interval:**
```javascript
useEffect(() => {
  const interval = setInterval(() => setTime(new Date()), 1000);
  return () => clearInterval(interval); // ✅
}, []);
```

3. **Event Listener:**
```javascript
useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize); // ✅
}, []);
```

4. **Subscription:**
```javascript
useEffect(() => {
  const sub = dataService.subscribe(handleData);
  return () => sub.unsubscribe(); // ✅
}, []);
```

5. **Limit Array Growth:**
```javascript
setData(prev => {
  const updated = [...prev, newData];
  return updated.slice(-100); // Keep last 100 ✅
});
```

---

### Task 4.2: Verify Memory Fixes

Re-run heap snapshots:

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Memory after 10min | 600MB | ____ MB | ____ % |
| Detached DOM | 200+ | ____ | ____ % |
| Event listeners | Growing | ____ | Stable ✅ |

---

## 📊 Phase 5: Production Monitoring (2 hours)

### Task 5.1: Implement Web Vitals Tracking

```bash
npm install web-vitals
```

**src/monitoring.js:**

```javascript
import { onLCP, onINP, onCLS, onFCP, onTTFB } from 'web-vitals';

function sendToAnalytics({ name, value, id }) {
  console.log(`[Web Vitals] ${name}:`, value);

  // Send to your analytics
  fetch('/api/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      metric: name,
      value: Math.round(value),
      id,
      url: location.pathname,
      timestamp: Date.now()
    })
  }).catch(err => console.error('Analytics error:', err));
}

onLCP(sendToAnalytics);
onINP(sendToAnalytics);
onCLS(sendToAnalytics);
onFCP(sendToAnalytics);
onTTFB(sendToAnalytics);
```

**src/main.jsx:**

```javascript
import './monitoring';
```

---

### Task 5.2: Set Up Lighthouse CI

**.github/workflows/lighthouse.yml:**

```yaml
name: Lighthouse CI
on: [pull_request]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3

      - run: npm install
      - run: npm run build

      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli
          lhci autorun
```

**lighthouserc.json:**

```json
{
  "ci": {
    "collect": {
      "startServerCommand": "npm run preview",
      "url": ["http://localhost:4173/"]
    },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }]
      }
    }
  }
}
```

---

## 📈 Phase 6: Final Measurement (1 hour)

### Re-run All Audits

1. **Lighthouse:** Desktop + Mobile
2. **Bundle Analyzer**
3. **React Profiler**
4. **Memory Profiler**

### Document Complete Results

Create `PERFORMANCE_REPORT.md`:

```markdown
# Performance Optimization Results

**Project:** Performance Audit & Optimization Sprint
**Date:** ___________
**Author:** ___________

## Executive Summary

Successfully optimized a slow React application, achieving:
- 🚀 ____ % improvement in Lighthouse Performance score
- 📦 ____ % reduction in bundle size
- ⚡ ____ % improvement in page load time
- 💾 ____ % reduction in memory usage

## Metrics Comparison

### Lighthouse Scores

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Performance | 25 | ____ | +____ |
| LCP | 8.5s | ____ s | ____ % |
| INP | 850ms | ____ ms | ____ % |
| CLS | 0.35 | ____ | ____ % |

### Bundle Size

| Category | Before | After | Reduction |
|----------|--------|-------|-----------|
| Total JS | 2.5MB | ____ KB | ____ % |
| moment.js | 300KB | 0KB (removed) | 100% |
| lodash | 250KB | ____ KB | ____ % |
| Initial Load | 2.5MB | ____ KB | ____ % |

### Runtime Performance

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| List Render | 3000ms | ____ ms | ____ % |
| Memory (10min) | 600MB | ____ MB | ____ % |
| Scroll FPS | 18 | ____ | +____ % |

## Optimizations Applied

### React Optimizations
1. ✅ Virtualized 10,000-item product list with react-window
2. ✅ Added React.memo to ProductCard component
3. ✅ Implemented useMemo for filtering and sorting
4. ✅ Used useCallback for event handlers

### Bundle Optimizations
5. ✅ Replaced moment.js with date-fns (-280KB)
6. ✅ Optimized lodash with tree shaking (-230KB)
7. ✅ Lazy loaded Dashboard route
8. ✅ Implemented manual chunk splitting
9. ✅ Enabled tree shaking across all imports

### Memory Optimizations
10. ✅ Fixed WebSocket leak (added close on unmount)
11. ✅ Fixed interval leak (added clearInterval)
12. ✅ Fixed event listener leak (added removeEventListener)
13. ✅ Fixed subscription leak (added unsubscribe)
14. ✅ Limited data array growth (max 100 items)

### Monitoring & CI/CD
15. ✅ Implemented Web Vitals tracking with web-vitals library
16. ✅ Set up Lighthouse CI in GitHub Actions
17. ✅ Configured performance budgets

## Business Impact (Estimated)

- **Load Time:** ____ % faster (8.5s → ____ s)
- **Expected Conversion Lift:** +____ %
- **Expected Bounce Rate Reduction:** -____ %
- **Mobile Experience:** Transformed from unusable to excellent

## Lessons Learned

1. ___________
2. ___________
3. ___________

## Next Steps

1. ___________
2. ___________
```

---

## ✅ Final Success Criteria

Your optimized application should achieve:

- ✅ Lighthouse Performance: 90+ (Desktop), 85+ (Mobile)
- ✅ Initial bundle: < 200KB
- ✅ LCP: < 2.5s
- ✅ INP: < 200ms
- ✅ CLS: < 0.1
- ✅ Memory stable: < 150MB after 10min
- ✅ All Core Web Vitals: GREEN
- ✅ CI/CD with performance gates: Passing
- ✅ RUM implemented: Tracking real users

---

## 📦 Deliverables

Submit the following:

1. ✅ **Source Code** (GitHub repository)
2. ✅ **PERFORMANCE_REPORT.md** (complete with all metrics)
3. ✅ **Lighthouse Reports** (before/after screenshots)
4. ✅ **Bundle Analyzer Reports** (before/after screenshots)
5. ✅ **Memory Profiler Screenshots** (before/after comparison)
6. ✅ **Working CI/CD Pipeline** (GitHub Actions config)
7. ✅ **Live Demo** (deployed to Vercel/Netlify - optional bonus)

---

## 🎁 Bonus Challenges

### Bonus 1: Achieve Lighthouse 95+

Go beyond 90:
- Implement critical CSS inlining
- Optimize font loading with font-display: swap
- Add resource hints (preload, prefetch, preconnect)
- Implement service worker for offline support

### Bonus 2: Deploy to Production

Deploy optimized app:
- Vercel or Netlify deployment
- Configure CDN caching headers
- Set up edge functions for geo-routing
- Add custom domain

### Bonus 3: Performance Dashboard

Build a dashboard showing:
- Real-time Web Vitals from users
- Performance trends over time
- Performance by geographic region
- Performance by device type

---

## 🏆 Portfolio Value

This project demonstrates:

- ✅ **Performance profiling skills** (Lighthouse, React Profiler, Memory Profiler)
- ✅ **React optimization expertise** (memo, useMemo, useCallback, virtualization)
- ✅ **Bundle optimization knowledge** (tree shaking, code splitting, dependency management)
- ✅ **Memory leak debugging** (heap snapshots, cleanup functions)
- ✅ **Production monitoring** (RUM, Web Vitals, error tracking)
- ✅ **CI/CD integration** (performance regression prevention)

**This is a senior-level performance optimization project!**

---

## 📚 Resources

- [Web Vitals Documentation](https://web.dev/vitals/)
- [React Performance Optimization](https://react.dev/learn/render-and-commit)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Vite Bundle Optimization](https://vitejs.dev/guide/build.html)

---

## 🎉 Congratulations!

You've completed a comprehensive performance optimization project demonstrating production-level skills. This project is portfolio-worthy and shows your ability to:
- Identify performance bottlenecks
- Implement systematic optimizations
- Measure and verify improvements
- Set up continuous monitoring

Share this project with potential employers to demonstrate your senior-level front-end development skills!

