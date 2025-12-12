# Exercise 2: Bundle Size Optimization

**Difficulty:** ⭐⭐ Intermediate

**Estimated Time:** 60-90 minutes

---

## 🎯 Learning Objectives

By completing this exercise, you will:
- Analyze bundle size with rollup-plugin-visualizer
- Replace heavy dependencies with lightweight alternatives
- Enable tree shaking by using ES modules
- Implement manual code splitting
- Reduce bundle size by 50%+ through strategic optimizations

---

## 📋 Scenario

Your app's initial bundle is 1.8MB and loads slowly on mobile devices. Users on 3G connections wait 10+ seconds for the initial load. Your task is to reduce the bundle size to under 900KB (50% reduction) and improve load times significantly.

---

## 🔧 Setup

### Prerequisites
- Node.js 18+ installed
- Vite or webpack project
- Understanding of ES modules vs CommonJS

### Installation

```bash
# Navigate to exercise directory
cd exercise-02-bundle-optimization

# Install dependencies
npm install

# Build to see current bundle size
npm run build
```

---

## 📊 Initial Analysis

### Task 1: Install Bundle Analyzer

```bash
npm install --save-dev rollup-plugin-visualizer
```

**For Vite projects, update `vite.config.js`:**

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
      filename: 'dist/stats.html'
    })
  ]
});
```

### Task 2: Build and Analyze

```bash
npm run build
```

The visualizer will auto-open showing your bundle composition.

**Document the following:**
- Total bundle size: _____ KB
- Top 3 largest dependencies:
  1. ____________ (_____ KB)
  2. ____________ (_____ KB)
  3. ____________ (_____ KB)

---

## 🎯 Optimization Tasks

### Task 3: Replace moment.js with date-fns

**Problem:** moment.js is 300KB and includes all locales by default.

**Current code:**

```javascript
import moment from 'moment';

const formatted = moment().format('MMMM Do YYYY');
const relative = moment().subtract(7, 'days').fromNow();
```

**Solution: Replace with date-fns**

```bash
npm uninstall moment
npm install date-fns
```

```javascript
import { format, formatDistanceToNow, subDays } from 'date-fns';

const formatted = format(new Date(), 'MMMM do yyyy');
const relative = formatDistanceToNow(subDays(new Date(), 7), { addSuffix: true });
```

**Expected savings:** ~280KB (93% reduction!)

---

### Task 4: Optimize lodash with Tree Shaking

**Problem:** Importing lodash as a whole includes the entire library.

**Current code:**

```javascript
import _ from 'lodash';

_.debounce(fn, 300);
_.throttle(fn, 1000);
_.uniq(array);
```

**Solution 1: Use lodash-es (ES modules)**

```bash
npm uninstall lodash
npm install lodash-es
```

```javascript
import debounce from 'lodash-es/debounce';
import throttle from 'lodash-es/throttle';
import uniq from 'lodash-es/uniq';

debounce(fn, 300);
throttle(fn, 1000);
uniq(array);
```

**Solution 2: Use native JavaScript (even better!)**

```javascript
// Debounce
function debounce(fn, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

// Throttle
function throttle(fn, limit) {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Uniq
const uniq = (array) => [...new Set(array)];
```

**Expected savings:** 230-250KB

---

### Task 5: Lazy Load Heavy Components

**Problem:** Chart library (200KB) loads on every page, but only used on Dashboard.

**Current code:**

```javascript
import { LineChart, BarChart } from 'recharts';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
```

**Solution: Lazy load Dashboard**

```javascript
import { lazy, Suspense } from 'react';

// Lazy load Dashboard (which imports recharts)
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

**Result:** recharts (200KB) is NOT in the initial bundle! Only loads when user navigates to /dashboard.

---

### Task 6: Manual Chunk Splitting

**Problem:** Vendor code and app code are bundled together. Any app code change requires re-downloading vendor code.

**Solution: Split vendor chunks in `vite.config.js`:**

```javascript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React ecosystem (changes rarely)
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],

          // UI library (changes rarely)
          'vendor-ui': ['@mui/material', '@mui/icons-material'],

          // Charts (only on dashboard)
          'vendor-charts': ['recharts']
        }
      }
    }
  }
});
```

**Result:**
- `vendor-react.js` (150KB) - Cached long-term
- `vendor-ui.js` (200KB) - Only loads when UI components used
- `vendor-charts.js` (180KB) - Only loads on dashboard
- `app.js` (100KB) - Your code

---

### Task 7: Enable Tree Shaking Everywhere

**Review all imports and convert to named imports:**

**❌ Bad (no tree shaking):**

```javascript
import * as utils from './utils';
import helpers from './helpers';
```

**✅ Good (tree shaking works):**

```javascript
import { formatDate, calculateTotal } from './utils';
import { debounce, throttle } from './helpers';
```

**Mark package as side-effect-free in `package.json`:**

```json
{
  "name": "your-app",
  "sideEffects": false
}
```

Or specify which files have side effects:

```json
{
  "sideEffects": [
    "*.css",
    "src/polyfills.js"
  ]
}
```

---

## 📊 Task 8: Measure Improvements

Build again and compare:

```bash
npm run build
```

**Document results:**

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Total bundle | 1.8MB | _____ KB | _____ % |
| moment.js | 300KB | 0KB (removed) | 100% |
| lodash | 250KB | _____ KB | _____ % |
| Initial JS | 1.8MB | _____ KB | _____ % |
| Charts (lazy) | In bundle | Split chunk | ✅ |

---

## ✅ Success Criteria

Your optimized bundle should achieve:

- ✅ Total initial bundle < 900KB (50%+ reduction)
- ✅ moment.js replaced with date-fns or native
- ✅ lodash optimized or replaced with native
- ✅ Heavy components (charts) lazy loaded
- ✅ Vendor code split into separate chunks
- ✅ All imports use ES modules (for tree shaking)
- ✅ Lighthouse Performance score increases by 10+ points
- ✅ Initial page load time improves by 30%+

---

## 📈 Expected Results

### Before Optimization
```
Initial bundle: 1.8MB
- moment.js: 300KB
- lodash: 250KB
- recharts: 200KB (in initial bundle)
- @mui/material: 180KB
- react + react-dom: 140KB
- Your app code: 730KB

Lighthouse Performance: 65/100
Load time (3G): 12 seconds
```

### After Optimization
```
Initial bundle: 850KB (-53%)
- date-fns: 20KB
- lodash-es (tree shaken): 15KB
- recharts: Lazy loaded (separate chunk: 180KB)
- vendor-react: 150KB
- vendor-ui: 200KB
- Your app code: 465KB

Lighthouse Performance: 85/100 (+20 points)
Load time (3G): 5 seconds (-58%)
```

---

## 🎁 Bonus Challenges

### Bonus 1: Set Up Bundle Size Budgets

Create `budgets.json`:

```json
{
  "budgets": [
    {
      "path": "dist/**/*.js",
      "maxSize": "200KB"
    },
    {
      "path": "dist/**/*.css",
      "maxSize": "50KB"
    }
  ]
}
```

Install budget checker:

```bash
npm install --save-dev bundlesize
```

Add to `package.json`:

```json
{
  "scripts": {
    "test:size": "bundlesize"
  },
  "bundlesize": [
    {
      "path": "./dist/**/*.js",
      "maxSize": "200 KB"
    }
  ]
}
```

**Run:** `npm run test:size` - Fails if bundle exceeds budget!

---

### Bonus 2: Analyze with webpack-bundle-analyzer

If using webpack:

```bash
npm install --save-dev webpack-bundle-analyzer
```

**webpack.config.js:**

```javascript
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: true
    })
  ]
};
```

---

### Bonus 3: Implement Dynamic Imports for Modal

```javascript
// Instead of importing Modal upfront
import Modal from './Modal';

// Lazy load when needed
function MyComponent() {
  const [showModal, setShowModal] = useState(false);
  const [Modal, setModal] = useState(null);

  const openModal = async () => {
    const { default: ModalComponent } = await import('./Modal');
    setModal(() => ModalComponent);
    setShowModal(true);
  };

  return (
    <>
      <button onClick={openModal}>Open Modal</button>
      {showModal && Modal && <Modal onClose={() => setShowModal(false)} />}
    </>
  );
}
```

---

## 🔍 Verification Steps

1. **Build and check output:**
   ```bash
   npm run build
   ```

2. **Check dist/ folder:**
   ```bash
   ls -lh dist/assets
   ```

3. **Run Lighthouse audit:**
   - Open production build
   - Open DevTools → Lighthouse
   - Run audit
   - Performance score should be 80+

4. **Test on slow connection:**
   - DevTools → Network → Slow 3G
   - Reload page
   - Initial load should be under 6 seconds

---

## 📚 Key Takeaways

- **Dependency choice matters**: moment.js (300KB) vs date-fns (20KB)
- **Tree shaking requires ES modules**: Use `import` not `require()`
- **Lazy loading wins**: Don't load code users might never use
- **Code splitting strategy**: Vendor chunks vs app chunks
- **Measure, optimize, verify**: Always use bundle analyzer tools

---

## 🎓 Common Pitfalls

❌ **Importing entire library:**
```javascript
import _ from 'lodash'; // Bundles entire library
```

✅ **Import specific functions:**
```javascript
import debounce from 'lodash-es/debounce';
```

---

❌ **No code splitting:**
```javascript
import HeavyComponent from './HeavyComponent';
```

✅ **Lazy load heavy components:**
```javascript
const HeavyComponent = lazy(() => import('./HeavyComponent'));
```

---

## 📖 Further Reading

- [Webpack Bundle Analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
- [Tree Shaking Documentation](https://webpack.js.org/guides/tree-shaking/)
- [React.lazy and Suspense](https://react.dev/reference/react/lazy)
- [Vite Manual Chunking](https://vitejs.dev/guide/build.html#chunking-strategy)

---

## 🎉 Congratulations!

You've successfully reduced your bundle size by 50%+! Users on slow connections will thank you. Every KB matters for mobile users and those on limited data plans.

**Next:** Move on to Exercise 3 - Memory Leak Detection & Fix

