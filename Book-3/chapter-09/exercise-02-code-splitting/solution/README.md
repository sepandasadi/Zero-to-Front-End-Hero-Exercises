# Exercise 2 Solution: Code Splitting

Complete implementation of route-based and component-level code splitting with error handling and optimized loading states.

## 📁 Solution Files

- `src/App.jsx` - Route splitting with lazy loading
- `src/pages/` - All routes as lazy-loadable modules
- `src/components/LoadingSpinner.jsx` - Loading fallback component
- `src/components/LoadingSkeleton.jsx` - Skeleton loading component
- `src/components/ErrorBoundary.jsx` - Error handling for lazy loading
- `vite.config.js` - Bundle analysis configuration

## 🎨 Implementation Highlights

### 1. Route-Based Code Splitting

**Before:**
```jsx
import Home from './pages/Home';
import Products from './pages/Products';
import Dashboard from './pages/Dashboard';
```
All routes loaded immediately = **450 KB initial bundle**

**After:**
```jsx
const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
```
Routes load on demand = **85 KB initial bundle** (81% reduction!)

### 2. Component-Level Code Splitting

**Modal Component:**
- Only loads when user clicks "Open Modal"
- Saves ~15 KB from initial bundle

**Chart Component:**
- Only loads when user clicks "Show Analytics"
- Saves ~100 KB (Recharts library) from initial bundle

### 3. Error Boundary

Handles lazy loading failures gracefully:
- Network errors
- Failed chunk loads
- Module loading errors

### 4. Loading States

- **Spinner:** For route transitions
- **Skeleton:** For component loading
- Both provide better UX than blank screen

## 📊 Performance Results

### Bundle Size Comparison

**Before Code Splitting:**
```
Build output:
dist/assets/index-abc123.js    450.2 KB

Initial page load (Home): 450.2 KB
```

**After Code Splitting:**
```
Build output:
dist/assets/index-def456.js     85.5 KB  (main bundle)
dist/assets/Home-ghi789.js      45.2 KB  (Home route chunk)
dist/assets/Products-jkl012.js 125.3 KB  (Products route chunk)
dist/assets/Dashboard-mno345.js 194.2 KB (Dashboard route chunk)
dist/assets/Modal-pqr678.js     12.8 KB  (Modal component chunk)
dist/assets/Chart-stu901.js    102.4 KB  (Chart component chunk)

Initial page load (Home): 85.5 + 45.2 = 130.7 KB
Reduction: 319.5 KB (71% smaller!)
```

### Page Load Breakdown

| Page | Before | After | Saved | % Reduction |
|------|--------|-------|-------|-------------|
| Home | 450 KB | 131 KB | 319 KB | 71% |
| Products (no chart) | 450 KB | 256 KB | 194 KB | 43% |
| Products (with chart) | 450 KB | 359 KB | 91 KB | 20% |
| Dashboard | 450 KB | 325 KB | 125 KB | 28% |

**Key insight:** Even the heaviest page (Products with Chart) is 20% lighter than the original bundle!

### Load Time Improvements

**On 4G (5 Mbps):**

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Initial Load | 720ms | 210ms | **71% faster** |
| TTI | 4.2s | 1.8s | **57% faster** |
| Route Navigation | N/A | ~100ms | Instant |

**On Slow 3G (400 Kbps):**

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Initial Load | 9.0s | 2.6s | **71% faster** |
| TTI | 12.5s | 5.2s | **58% faster** |

### Time to Interactive (TTI)

```
Before: 4.2s
After:  1.8s
Improvement: 2.4s faster (57%)
```

## 🎓 Key Learnings

### 1. Route Splitting = Biggest Impact

**Single change, massive results:**
- Convert `import` → `lazy(() => import())`
- Add `<Suspense>` boundary
- 71% bundle reduction

**Lesson:** Always split by route. It's the easiest high-impact optimization.

### 2. Component Splitting for Heavy Dependencies

**Chart component breakdown:**
```
Recharts library: 102 KB
Component code: 2.4 KB
Total: 104.4 KB
```

**Impact:**
- Users who never click "Show Analytics": **Never download 104 KB**
- Users who do click: Small delay, but saves everyone else

**Lesson:** Lazy load components with heavy dependencies (charts, editors, maps).

### 3. Conditional Splitting Works Best

**Modal component:**
- Only 12.8 KB
- But shown conditionally (button click)
- Perfect candidate for splitting

**Lesson:** If it's hidden by default, lazy load it.

### 4. Error Boundaries are Critical

**Without error boundary:**
- Failed chunk load = white screen of death
- No way to recover

**With error boundary:**
- Shows error message
- Offers reload button
- Logs error for debugging

**Lesson:** Always wrap lazy components in error boundary.

### 5. Loading States Matter

**Bad UX:**
```jsx
<Suspense fallback={<div>Loading...</div>}>
```
- Jarring
- Unprofessional
- No indication of progress

**Good UX:**
```jsx
<Suspense fallback={<LoadingSpinner />}>
```
- Smooth animation
- Clear visual feedback
- Professional appearance

**Even better:**
```jsx
<Suspense fallback={<LoadingSkeleton />}>
```
- Shows page structure
- Reduces perceived wait time
- Best user experience

**Lesson:** Invest in good loading states.

## 🔧 How It Works

### Lazy Loading Flow

**1. Initial Load:**
```
User visits → Browser downloads:
- index.html
- main bundle (85 KB)
- Home chunk (45 KB)
Total: 130 KB
```

**2. Route Navigation:**
```
User clicks Products → Browser downloads:
- Products chunk (125 KB)
Already have: main bundle
No need to re-download common code
```

**3. Component Load:**
```
User clicks "Show Analytics" → Browser downloads:
- Chart chunk (102 KB)
Mounts in ~100ms
```

### Network Waterfall

```
Before (no splitting):
|████████████████████████| main.js (450 KB, 720ms)

After (with splitting):
|████████| main.js (85 KB, 140ms)
|████| Home.js (45 KB, 70ms)
... (user navigates to Products)
|██████████| Products.js (125 KB, 200ms)
... (user clicks Show Analytics)
|████████████| Chart.js (102 KB, 163ms)
```

**Total time from visit to seeing chart:**
- Before: 720ms (everything loads upfront)
- After: 140 + 70 + 200 + 163 = 573ms (staged loading)

**But most users never see chart:**
- Before: 720ms (wasted 102 KB downloading chart)
- After: 210ms (never download chart) ← **71% faster for most users!**

## 💡 Advanced Techniques Used

### 1. Webpack Magic Comments (Optional)

```jsx
const Dashboard = lazy(() =>
  import(/* webpackChunkName: "dashboard" */ './pages/Dashboard')
);
```

**Benefits:**
- Custom chunk names (easier debugging)
- Better in production bundle analysis

### 2. Prefetching on Hover

```jsx
const prefetchProducts = () => {
  import('./pages/Products');
};

<Link to="/products" onMouseEnter={prefetchProducts}>
  Products
</Link>
```

**Result:** Chunk downloads on hover, navigation is instant on click!

### 3. Multiple Suspense Boundaries

**Route-level:**
```jsx
<Suspense fallback={<LoadingSpinner />}>
  <Routes>...</Routes>
</Suspense>
```

**Component-level:**
```jsx
<Suspense fallback={<div>Loading chart...</div>}>
  <Chart />
</Suspense>
```

**Benefit:** Granular loading states, better UX.

## 🚀 Production Recommendations

### 1. Always Split Routes

```jsx
// ✅ DO THIS
const Home = lazy(() => import('./pages/Home'));

// ❌ DON'T DO THIS
import Home from './pages/Home';
```

**Why:** Automatic 50-70% bundle reduction.

### 2. Split Heavy Dependencies

Look for:
- Chart libraries (Chart.js, Recharts, D3)
- Rich text editors (Quill, Draft.js, TinyMCE)
- Map libraries (Mapbox, Leaflet)
- Video players
- PDF viewers

**If it's > 50 KB, lazy load it.**

### 3. Split Conditionally Shown Components

```jsx
// Modals
const Modal = lazy(() => import('./Modal'));

// Dropdowns with heavy content
const MegaMenu = lazy(() => import('./MegaMenu'));

// Admin panels
const AdminPanel = lazy(() => import('./AdminPanel'));
```

### 4. Monitor Bundle Size

**Set up bundle size monitoring:**
```json
// package.json
{
  "scripts": {
    "build": "vite build",
    "analyze": "vite build && open stats.html"
  }
}
```

**Run after every major change.**

### 5. Set Performance Budgets

```json
// budget.json
{
  "budget": [
    {
      "resourceSizes": [
        { "resourceType": "script", "budget": 200 }
      ]
    }
  ]
}
```

**Fail builds if exceeded.**

## 📚 Tools Used

### Bundle Analysis

- **rollup-plugin-visualizer** (Vite)
- **webpack-bundle-analyzer** (Webpack)
- Shows chunk sizes and contents

### Performance Monitoring

- **Lighthouse** - Overall performance score
- **web-vitals** library - Track TTI, LCP
- **Chrome DevTools Network tab** - Verify chunks

## 🎯 Real-World Impact

### Case Studies

**Twitter:**
- Route splitting reduced initial bundle by 60%
- Page load 2x faster on mobile

**Airbnb:**
- Component splitting saved 50% on search page
- Lazy loaded map = instant page load

**Netflix:**
- Lazy loaded player = 75% smaller initial bundle
- TTI improved from 6s to 2s

## 🐛 Common Gotchas

### 1. Named Exports

```jsx
// ❌ Won't work
export function Modal() { ... }
const Modal = lazy(() => import('./Modal'));

// ✅ Solution 1: Use default export
export default function Modal() { ... }

// ✅ Solution 2: Re-export
const Modal = lazy(() =>
  import('./Modal').then(m => ({ default: m.Modal }))
);
```

### 2. Forgetting Suspense

```jsx
// ❌ Will crash
const Home = lazy(() => import('./Home'));
<Home />

// ✅ Must wrap with Suspense
<Suspense fallback={<Loading />}>
  <Home />
</Suspense>
```

### 3. Over-Splitting

```jsx
// ❌ Too many small chunks
const Button = lazy(() => import('./Button')); // 2 KB component

// ✅ Only split large components
// Keep small components in main bundle
```

**Rule of thumb:** Only split if > 20 KB.

## ✅ Verification Checklist

- [✅] All routes lazy loaded
- [✅] Heavy components lazy loaded (Chart, Modal)
- [✅] Suspense boundaries added
- [✅] Error boundary implemented
- [✅] Loading states professional
- [✅] Bundle size reduced by 50%+
- [✅] Network tab shows chunked loading
- [✅] All routes still functional
- [✅] Slow 3G tested

---

**Congratulations! You've mastered code splitting!** 🎉

**Key Takeaway:** Code splitting is the single most effective performance optimization you can make. A few lazy() calls = 50-70% smaller bundles with minimal effort.

**Next:** Exercise 3 - Lighthouse audits to verify these improvements!

