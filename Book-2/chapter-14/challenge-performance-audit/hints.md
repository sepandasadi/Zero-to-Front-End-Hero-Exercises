# Hints - Performance Audit & Optimization Sprint Challenge

## Overview Hints

This challenge combines all three exercises. If you're stuck:
- **Review Exercise 1-3 solutions** for reference
- **Work in phases** - don't try to fix everything at once
- **Measure before and after** each optimization

---

## Phase 1: Baseline Measurement Hints

### Hint 1: Running Lighthouse

```bash
# Build first!
npm run build
npm run preview

# Then in Chrome:
# DevTools (F12) → Lighthouse → Analyze page load
```

**Document:** Take screenshots! You'll need before/after comparisons.

### Hint 2: Bundle Analyzer Setup

```bash
npm install --save-dev rollup-plugin-visualizer
```

In `vite.config.js`:
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

### Hint 3: Finding Memory Leaks

1. DevTools → Memory → Heap snapshot (baseline)
2. Navigate to Dashboard, wait 2 min
3. Navigate away and back (3 times)
4. Force GC (trash icon)
5. Take second snapshot
6. Compare - look for growing objects

---

## Phase 2: React Optimizations Hints

### Hint 4: Virtualizing the Product List

The Products page has 10,000 items! You need virtualization.

```bash
npm install react-window
```

```javascript
import { FixedSizeGrid } from 'react-window';

// In Products.jsx
<FixedSizeGrid
  columnCount={4}
  columnWidth={280}
  height={600}
  rowCount={Math.ceil(products.length / 4)}
  rowHeight={150}
  width={1200}
>
  {({ columnIndex, rowIndex, style }) => {
    const index = rowIndex * 4 + columnIndex;
    if (index >= products.length) return null;

    return (
      <div style={{ ...style, padding: '10px' }}>
        <ProductCard product={products[index]} />
      </div>
    );
  }}
</FixedSizeGrid>
```

### Hint 5: React.memo Pattern

From Exercise 1:

```javascript
import React from 'react';

const ProductCard = React.memo(function ProductCard({ product, onAddToCart }) {
  // component code
});
```

### Hint 6: useMemo Pattern

```javascript
const sortedProducts = useMemo(() => {
  // expensive operation
  return filtered.sort(...);
}, [filtered, sortBy]); // dependencies
```

### Hint 7: useCallback Pattern

```javascript
const onAddToCart = useCallback((product) => {
  setCart(prev => [...prev, product]);
}, []); // stable reference
```

---

## Phase 3: Bundle Optimization Hints

### Hint 8: Replacing moment.js

From Exercise 2:

```bash
npm uninstall moment
npm install date-fns
```

```javascript
// Before
import moment from 'moment';
moment().format('MMMM Do YYYY');

// After
import { format } from 'date-fns';
format(new Date(), 'MMMM do yyyy');
```

### Hint 9: Replacing lodash

Use native JavaScript:

```javascript
// Before
import _ from 'lodash';
_.sortBy(array, 'name');
_.uniq(array);

// After
array.sort((a, b) => a.name.localeCompare(b.name));
[...new Set(array)];
```

### Hint 10: Lazy Loading Dashboard

```javascript
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));

// In Routes:
<Route
  path="/dashboard"
  element={
    <Suspense fallback={<div>Loading...</div>}>
      <Dashboard />
    </Suspense>
  }
/>
```

### Hint 11: Manual Chunking

In `vite.config.js`:

```javascript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-charts': ['recharts'],
          'vendor-utils': ['date-fns', 'react-window']
        }
      }
    }
  }
});
```

---

## Phase 4: Memory Leak Fixes Hints

### Hint 12: All 5 Leaks in Dashboard

From Exercise 3, fix each leak by returning cleanup:

**1. WebSocket:**
```javascript
useEffect(() => {
  const ws = ...;
  return () => ws.close(); // ✅
}, []);
```

**2. Interval:**
```javascript
useEffect(() => {
  const interval = setInterval(...);
  return () => clearInterval(interval); // ✅
}, []);
```

**3. Event Listener:**
```javascript
useEffect(() => {
  const handler = () => {};
  window.addEventListener('resize', handler);
  return () => window.removeEventListener('resize', handler); // ✅
}, []);
```

**4. Subscription:**
```javascript
useEffect(() => {
  const sub = dataService.subscribe(...);
  return () => sub.unsubscribe(); // ✅
}, []);
```

**5. Array Growth:**
```javascript
setData(prev => {
  const updated = [...prev, newData];
  return updated.slice(-100); // ✅ Cap at 100
});
```

---

## Phase 5: Production Monitoring Hints

### Hint 13: Web Vitals Setup

```bash
npm install web-vitals
```

Create `src/monitoring.js`:

```javascript
import { onLCP, onINP, onCLS, onFCP, onTTFB } from 'web-vitals';

function sendToAnalytics({ name, value, rating }) {
  console.log(`[Web Vitals] ${name}:`, {
    value: Math.round(value),
    rating
  });

  // Send to analytics in production
}

onLCP(sendToAnalytics);
onINP(sendToAnalytics);
onCLS(sendToAnalytics);
onFCP(sendToAnalytics);
onTTFB(sendToAnalytics);
```

Import in `main.jsx`:
```javascript
import './monitoring';
```

### Hint 14: Lighthouse CI Setup

Install:
```bash
npm install --save-dev @lhci/cli
```

Create `lighthouserc.json`:
```json
{
  "ci": {
    "collect": {
      "startServerCommand": "npm run preview",
      "url": ["http://localhost:4173/"]
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }]
      }
    }
  }
}
```

Create `.github/workflows/lighthouse.yml`:
```yaml
name: Lighthouse CI
on: [pull_request]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - run: npx @lhci/cli autorun
```

---

## Phase 6: Final Measurement Hints

### Hint 15: Documentation Structure

Create `PERFORMANCE_REPORT.md` with:

1. **Executive Summary**
   - Top-line improvements
   - Key metrics

2. **Metrics Comparison Table**
   - Before vs After for all metrics

3. **Optimizations Applied**
   - List all 17 optimizations
   - Explain each briefly

4. **Screenshots**
   - Lighthouse (before/after)
   - Bundle analyzer (before/after)
   - Memory profiler (before/after)

5. **Lessons Learned**
   - What you learned
   - Challenges faced
   - How you solved them

### Hint 16: Taking Good Screenshots

**Lighthouse:**
- Full report showing all metrics
- Highlight Core Web Vitals section

**Bundle Analyzer:**
- Full treemap view
- Shows size of each dependency

**Memory Profiler:**
- Comparison view
- Highlight detached nodes (should be 0 after fixes)

---

## Common Issues & Solutions

### Issue 1: Lighthouse Score Still Low

**Check:**
- Did you build production? (`npm run build`)
- Are you testing preview? (`npm run preview`)
- Is bundle analyzer causing slowdown? (Remove from build)

### Issue 2: Bundle Still Large

**Check:**
- Did you remove moment.js and lodash from package.json?
- Is Dashboard lazy loaded?
- Are you using `import` not `require()`?
- Run `npm run build` and check dist/ size

### Issue 3: Memory Still Growing

**Check:**
- Are ALL useEffect cleanups present?
- Did you navigate away and back to trigger unmount?
- Did you force garbage collection?
- Are arrays capped at 100 items?

### Issue 4: Products Page Still Slow

**Check:**
- Is react-window installed?
- Are you using FixedSizeGrid?
- Is React.memo on ProductCard?
- Are useMemo/useCallback used?

---

## Verification Checklist

Before submitting:

### React Optimizations
- [ ] react-window installed and used
- [ ] ProductCard has React.memo
- [ ] Filtering uses useMemo
- [ ] Sorting uses useMemo
- [ ] onAddToCart uses useCallback
- [ ] Console shows minimal re-renders

### Bundle Optimizations
- [ ] moment.js removed, date-fns added
- [ ] lodash removed or replaced
- [ ] Dashboard lazy loaded
- [ ] Manual chunks configured
- [ ] Bundle visualizer shows < 200KB initial

### Memory Fixes
- [ ] All 5 useEffect have cleanup functions
- [ ] Arrays capped at 100 items
- [ ] Console shows cleanup logs
- [ ] Heap snapshot shows no growth
- [ ] No detached DOM nodes

### Monitoring
- [ ] web-vitals installed
- [ ] monitoring.js created and imported
- [ ] Console shows Web Vitals
- [ ] lighthouserc.json created
- [ ] GitHub Actions workflow added

### Documentation
- [ ] PERFORMANCE_REPORT.md complete
- [ ] All metrics documented
- [ ] Screenshots included
- [ ] Lessons learned written

---

## Success Criteria Reference

Your final app should achieve:

```
✅ Lighthouse Performance: 90+/100
✅ Bundle Size: < 200KB initial
✅ LCP: < 2.5s
✅ INP: < 200ms
✅ CLS: < 0.1
✅ Memory: < 150MB after 10min
✅ All Core Web Vitals: GREEN
```

---

## Quick Reference: Exercise Solutions

**Need help?** Reference these exercises:

- **Exercise 1:** React performance patterns
- **Exercise 2:** Bundle optimization techniques
- **Exercise 3:** Memory leak fixes

Each has complete starter and solution code!

---

## Time Management

Recommended time allocation:

- Phase 1 (Baseline): 1 hour
- Phase 2 (React): 3 hours
- Phase 3 (Bundle): 2 hours
- Phase 4 (Memory): 2 hours
- Phase 5 (Monitoring): 2 hours
- Phase 6 (Final): 1 hour
- Documentation: 1-2 hours

**Total: 10-12 hours**

Don't rush! This is a portfolio project.

---

## Final Tips

1. **Work systematically** - One phase at a time
2. **Measure everything** - Before and after each change
3. **Document as you go** - Don't wait until the end
4. **Test thoroughly** - Make sure nothing breaks
5. **Ask for help** - If truly stuck, check solutions

**Good luck! You've got this! 🚀**

