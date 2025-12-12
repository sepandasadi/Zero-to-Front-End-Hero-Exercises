# Getting Started: Code Splitting

## 🎯 Your Task

Create a React application with route-based and component-level code splitting to reduce initial bundle size.

---

## 📁 Starting Point

This folder contains a React app without code splitting. Your job is to implement lazy loading to reduce the initial bundle size.

**Current structure:**
```
src/
├── App.jsx           - Main app component (MODIFY THIS)
├── main.jsx          - Entry point
├── pages/
│   ├── Home.jsx      - Home page
│   ├── Products.jsx  - Products page (heavy with Chart component)
│   └── Dashboard.jsx - Dashboard page (heavy)
├── components/
│   ├── Navigation.jsx
│   ├── Chart.jsx     - Heavy chart component (will lazy load)
│   └── Modal.jsx     - Modal component (will lazy load)
└── ...
```

---

## 🚀 Steps to Complete

### Step 1: Set Up the Project

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# In another terminal, build and check bundle size
npm run build
```

**Document the initial bundle size** from the build output. Look for something like:
```
dist/assets/index-abc123.js  XXX.XX KB
```

---

### Step 2: Implement Route-Based Splitting

**Current App.jsx (no splitting):**
```jsx
import Home from './pages/Home';
import Products from './pages/Products';
import Dashboard from './pages/Dashboard';
```

**Your task - Convert to lazy loading:**

```jsx
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./pages/Home'));
// TODO: Lazy load Products
// TODO: Lazy load Dashboard

function App() {
  return (
    <BrowserRouter>
      {/* TODO: Wrap Routes with Suspense */}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* ... */}
      </Routes>
    </BrowserRouter>
  );
}
```

**Requirements:**
- Lazy load all 3 routes
- Add Suspense boundary with loading fallback
- Test navigation between routes

---

### Step 3: Implement Component-Level Splitting

Two components are good candidates for lazy loading:

#### 3a. Chart Component (in Products page)

The Chart component uses a heavy charting library. Lazy load it so it only downloads when user clicks "Show Analytics".

**Current Products.jsx:**
```jsx
import Chart from '../components/Chart';

function Products() {
  const [showChart, setShowChart] = useState(false);

  return (
    <div>
      <button onClick={() => setShowChart(true)}>
        Show Analytics
      </button>
      {showChart && <Chart data={data} />}
    </div>
  );
}
```

**Your task:**
- Convert Chart import to lazy loading
- Add Suspense boundary around Chart
- Add loading fallback

#### 3b. Modal Component (in Home page)

The Modal is only shown when user clicks a button. Perfect for lazy loading!

**Your task:**
- Lazy load the Modal component in Home.jsx
- Add Suspense boundary
- Add loading fallback

---

### Step 4: Create Loading Components

Create better loading fallbacks than just `<div>Loading...</div>`:

**Create `src/components/LoadingSpinner.jsx`:**
```jsx
export default function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
}
```

**Create `src/components/LoadingSkeleton.jsx`:**
```jsx
export default function LoadingSkeleton() {
  return (
    <div className="skeleton">
      <div className="skeleton-header"></div>
      <div className="skeleton-content"></div>
    </div>
  );
}
```

Use these as your Suspense fallbacks.

---

### Step 5: Add Error Boundary

Create an error boundary to handle lazy loading failures:

**Create `src/components/ErrorBoundary.jsx`:**
```jsx
import { Component } from 'react';

class ErrorBoundary extends Component {
  // TODO: Implement error boundary
  // - Track hasError state
  // - Implement getDerivedStateFromError
  // - Implement componentDidCatch
  // - Render error UI if error
  // - Otherwise render children
}
```

**Wrap your app:**
```jsx
<ErrorBoundary>
  <Suspense fallback={<LoadingSpinner />}>
    <Routes>...</Routes>
  </Suspense>
</ErrorBoundary>
```

---

### Step 6: Analyze Bundle

**Run the build again:**
```bash
npm run build
```

**Document the new bundle sizes:**
- Main bundle size
- Each route chunk size
- Calculate reduction percentage

**Optional - Use bundle analyzer:**

For Vite:
```bash
npm install --save-dev rollup-plugin-visualizer
```

Add to `vite.config.js`:
```javascript
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true })
  ],
});
```

Then run `npm run build` to see visualization.

---

### Step 7: Test Everything

1. **Network tab test:**
   - Open DevTools → Network tab
   - Navigate to home → Note which chunks load
   - Navigate to products → Note new chunk loads
   - Navigate to dashboard → Note new chunk loads

2. **Slow connection test:**
   - DevTools → Network → Throttle to "Slow 3G"
   - Navigate between routes
   - Verify loading states appear
   - Verify routes still work

3. **Error handling test:**
   - Temporarily break an import path
   - Verify error boundary catches it
   - Fix the import

---

## ✅ Success Criteria

Your implementation should have:

- [ ] All 3 routes lazy loaded
- [ ] Chart component lazy loaded
- [ ] Modal component lazy loaded
- [ ] Suspense boundaries with proper fallbacks
- [ ] Error boundary implemented
- [ ] Initial bundle size reduced by 50%+
- [ ] All routes still work correctly
- [ ] Loading states show on slow connections

---

## 📊 Expected Results

**Before Code Splitting:**
```
Build output:
dist/assets/index-abc123.js    450 KB

Initial page load: 450 KB
```

**After Code Splitting:**
```
Build output:
dist/assets/index-abc123.js     85 KB  (main)
dist/assets/Home-def456.js      45 KB  (route)
dist/assets/Products-ghi789.js 125 KB  (route)
dist/assets/Dashboard-jkl012.js 195 KB (route)

Initial page load: 85 + 45 = 130 KB (71% reduction!)
```

---

## 💡 Tips

**1. Start Simple**
Begin with just route splitting, then add component-level splitting.

**2. Check Network Tab**
Use Chrome DevTools Network tab to verify chunks are loading on demand.

**3. Test Loading States**
Use network throttling to see your loading fallbacks in action.

**4. Named Chunks (Optional)**
Use magic comments for better chunk names:
```jsx
const Dashboard = lazy(() =>
  import(/* webpackChunkName: "dashboard" */ './pages/Dashboard')
);
```

**5. Don't Over-Split**
Only split:
- Routes (always)
- Heavy components (charts, editors)
- Conditionally shown components (modals)

Don't split small components - the overhead isn't worth it.

---

## 🆘 Common Issues

**"React element type is invalid"**
- Make sure your lazy component exports default (not named export)
- Or use the re-export technique from hints

**"Loading... shows forever"**
- Check console for import errors
- Verify file paths are correct
- Make sure component actually exports something

**"No bundle size reduction"**
- Verify you're using `lazy()` not regular `import`
- Check build output for multiple chunks
- Make sure you removed the old imports

**"App crashes on route change"**
- Did you add Suspense boundary?
- Check error boundary is working
- Look for console errors

---

## 📈 Measuring Impact

Create a simple comparison table:

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Main bundle | ? KB | ? KB | ? % |
| Initial load | ? KB | ? KB | ? % |
| Home route | ? KB | ? KB | - |
| Products route | ? KB | ? KB | - |
| Dashboard route | ? KB | ? KB | - |

---

**Ready to split some code? Let's do this!** ⚡

