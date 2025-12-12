# Exercise 2: Code Splitting - Hints 💡

**Try the exercise yourself first before reading these hints!**

---

## Hint 1: Basic Route-Based Splitting

Use `React.lazy()` to split by routes:

```jsx
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// ❌ Old way: All routes loaded upfront
// import Home from './pages/Home';
// import Products from './pages/Products';

// ✅ New way: Each route loaded on demand
const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

**What happens:**
- Initial load: Only App code + Home route
- Navigate to /products: Downloads Products chunk
- Navigate to /dashboard: Downloads Dashboard chunk

---

## Hint 2: Component-Level Splitting

Lazy load heavy components that aren't always needed:

```jsx
import { lazy, Suspense, useState } from 'react';

// Heavy chart library - only load when needed
const Chart = lazy(() => import('./components/Chart'));

function Dashboard() {
  const [showChart, setShowChart] = useState(false);

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => setShowChart(true)}>
        Show Analytics
      </button>

      {showChart && (
        <Suspense fallback={<div>Loading chart...</div>}>
          <Chart data={analyticsData} />
        </Suspense>
      )}
    </div>
  );
}
```

**When to use:**
- Modals (only load when opened)
- Charts/graphs (heavy libraries)
- Rich text editors
- Maps
- Video players

---

## Hint 3: Named Exports with Lazy Loading

If your component uses named exports:

```jsx
// ❌ Won't work with named exports
const Modal = lazy(() => import('./components/Modal'));

// ✅ Solution: Re-export as default
const Modal = lazy(() =>
  import('./components/Modal').then(module => ({
    default: module.Modal
  }))
);
```

**Or better, change the component to default export:**

```jsx
// Modal.jsx
export default function Modal() { // Changed from: export function Modal()
  return <div className="modal">...</div>;
}
```

---

## Hint 4: Better Loading Fallbacks

Create a proper loading component:

```jsx
// LoadingSpinner.jsx
export default function LoadingSpinner() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
}
```

```css
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

**Use it:**

```jsx
import LoadingSpinner from './components/LoadingSpinner';

<Suspense fallback={<LoadingSpinner />}>
  <LazyRoute />
</Suspense>
```

---

## Hint 5: Error Boundaries for Lazy Loading

Handle loading failures gracefully:

```jsx
import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Lazy loading error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <h2>Oops! Something went wrong.</h2>
          <button onClick={() => window.location.reload()}>
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

**Use it:**

```jsx
<ErrorBoundary>
  <Suspense fallback={<LoadingSpinner />}>
    <Routes>
      <Route path="/" element={<Home />} />
      {/* ... */}
    </Routes>
  </Suspense>
</ErrorBoundary>
```

---

## Hint 6: Bundle Analysis (Webpack)

**Install the analyzer:**

```bash
npm install --save-dev webpack-bundle-analyzer
```

**Add to package.json:**

```json
{
  "scripts": {
    "build": "react-scripts build",
    "analyze": "npm run build && npx webpack-bundle-analyzer build/static/js/*.js"
  }
}
```

**Run it:**

```bash
npm run analyze
```

Opens visualization in browser showing:
- Size of each chunk
- What's inside each chunk
- Opportunities for splitting

---

## Hint 7: Bundle Analysis (Vite)

**Install the analyzer:**

```bash
npm install --save-dev rollup-plugin-visualizer
```

**Add to vite.config.js:**

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    })
  ],
});
```

**Build to see analysis:**

```bash
npm run build
```

---

## Hint 8: Prefetching Routes

Prefetch next route on hover for instant navigation:

```jsx
const Products = lazy(() => import('./pages/Products'));

function Navigation() {
  const prefetchProducts = () => {
    // Triggers the import but doesn't render yet
    const component = import('./pages/Products');
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link
        to="/products"
        onMouseEnter={prefetchProducts}
      >
        Products
      </Link>
    </nav>
  );
}
```

**Result:** When user hovers over link, chunk downloads. When they click, it's already loaded = instant!

---

## Hint 9: Measuring Bundle Size Reduction

**Before code splitting:**

```bash
npm run build
```

Check output:
```
dist/assets/index-abc123.js    450.2 KB
```

**After code splitting:**

```bash
npm run build
```

Check output:
```
dist/assets/index-abc123.js      85.5 KB  (main bundle)
dist/assets/Home-def456.js       45.2 KB  (Home route)
dist/assets/Products-ghi789.js  125.3 KB  (Products route)
dist/assets/Dashboard-jkl012.js 194.2 KB  (Dashboard route)
```

**Calculation:**
- Before: User downloads 450 KB to see homepage
- After: User downloads 85.5 + 45.2 = **130.7 KB** to see homepage
- Savings: **319.5 KB (71% reduction)**

---

## Hint 10: Webpack Magic Comments

Customize chunk names and loading behavior:

```jsx
// Give chunks custom names
const Dashboard = lazy(() =>
  import(/* webpackChunkName: "dashboard" */ './pages/Dashboard')
);

// Prefetch (downloads during idle time)
const Products = lazy(() =>
  import(/* webpackPrefetch: true */ './pages/Products')
);

// Preload (downloads in parallel)
const Settings = lazy(() =>
  import(/* webpackPreload: true */ './pages/Settings')
);
```

**Differences:**
- **Prefetch:** Downloads when browser idle (low priority)
- **Preload:** Downloads immediately in parallel (medium priority)
- **No hint:** Downloads only when needed (on-demand)

---

## Hint 11: Skeleton Loading

Instead of spinner, show content skeleton:

```jsx
function ProductSkeleton() {
  return (
    <div className="product-skeleton">
      <div className="skeleton-image"></div>
      <div className="skeleton-title"></div>
      <div className="skeleton-price"></div>
      <div className="skeleton-description"></div>
    </div>
  );
}
```

```css
.skeleton-image {
  width: 100%;
  height: 200px;
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

**Use it:**

```jsx
<Suspense fallback={<ProductSkeleton />}>
  <ProductsList />
</Suspense>
```

---

## Hint 12: Measuring Time to Interactive (TTI)

**Install web-vitals:**

```bash
npm install web-vitals
```

**Measure TTI improvement:**

```javascript
import { onTTI } from 'web-vitals';

onTTI((metric) => {
  console.log('Time to Interactive:', metric.value);
});
```

**Expected improvement:**
- Before: TTI = 4.5s
- After: TTI = 2.1s (53% faster)

---

## Common Mistakes to Avoid

❌ **Lazy loading above-the-fold content** → Delays initial render
❌ **No Suspense boundary** → React error
❌ **Suspense inside lazy component** → Infinite loop
❌ **Over-splitting** → Too many requests
❌ **No error boundary** → Poor error UX

✅ **Best practices:**
- Split by route (always)
- Lazy load modals, charts, heavy components
- Use error boundaries
- Provide good loading states
- Analyze bundle before/after
- Test on slow 3G

---

## Quick Wins Checklist

Start with these for maximum impact:

1. ✅ Split all routes (easiest, biggest impact)
2. ✅ Lazy load modal dialogs
3. ✅ Lazy load chart libraries (Recharts, Chart.js, etc.)
4. ✅ Add error boundary
5. ✅ Run bundle analyzer
6. ✅ Document size reduction

**Expected results:**
- 50-70% reduction in initial bundle size
- 30-50% faster Time to Interactive
- Better user experience on slow connections

---

**You've got this! Split that bundle!** 🚀

