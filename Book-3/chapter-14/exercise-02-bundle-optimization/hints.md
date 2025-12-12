# Hints - Exercise 2: Bundle Size Optimization

## Stuck? Try These Hints!

### Hint 1: Installing Bundle Analyzer

**Question:** How do I visualize my bundle?

**Answer:**
```bash
npm install --save-dev rollup-plugin-visualizer
```

Then update `vite.config.js`:
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

Run `npm run build` and it will auto-open showing bundle composition!

---

### Hint 2: Replacing moment.js

**Question:** How do I replace moment.js with date-fns?

**Step 1:** Install date-fns
```bash
npm uninstall moment
npm install date-fns
```

**Step 2:** Replace imports
```javascript
// Before
import moment from 'moment';
const formatted = moment().format('MMMM Do YYYY');
const ago = moment().subtract(7, 'days').fromNow();

// After
import { format, formatDistanceToNow, subDays } from 'date-fns';
const formatted = format(new Date(), 'MMMM do yyyy');
const ago = formatDistanceToNow(subDays(new Date(), 7), { addSuffix: true });
```

---

### Hint 3: Optimizing lodash

**Question:** How do I reduce lodash's bundle size?

**Option 1: Use native JavaScript (best)**
```javascript
// Instead of lodash
import _ from 'lodash';
_.uniq(arr);
_.sum(arr);
_.max(arr);

// Use native
[...new Set(arr)];
arr.reduce((a, b) => a + b, 0);
Math.max(...arr);
```

**Option 2: Use lodash-es with tree shaking**
```bash
npm uninstall lodash
npm install lodash-es
```

```javascript
// Import specific functions
import debounce from 'lodash-es/debounce';
import throttle from 'lodash-es/throttle';
```

---

### Hint 4: Lazy Loading Routes

**Question:** How do I lazy load a component?

**Answer:**
```javascript
import { lazy, Suspense } from 'react';

// Instead of
import Dashboard from './pages/Dashboard';

// Use lazy loading
const Dashboard = lazy(() => import('./pages/Dashboard'));

// In Routes
<Route
  path="/dashboard"
  element={
    <Suspense fallback={<div>Loading...</div>}>
      <Dashboard />
    </Suspense>
  }
/>
```

**Result:** Dashboard and its dependencies (recharts) only load when user visits that route!

---

### Hint 5: Manual Chunk Splitting

**Question:** How do I split vendor and app code?

**Answer:** Update `vite.config.js`:
```javascript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-charts': ['recharts']
        }
      }
    }
  }
});
```

This creates separate chunks that can be cached independently!

---

### Hint 6: Tree Shaking Configuration

**Question:** How do I enable tree shaking?

**Answer:** Add to `package.json`:
```json
{
  "sideEffects": [
    "*.css"
  ]
}
```

Or if NO files have side effects:
```json
{
  "sideEffects": false
}
```

**Important:** Only mark files as side-effect-free if they truly are!

---

### Hint 7: Checking Bundle Size

**Question:** How do I know if my optimizations worked?

**Answer:**
1. Build the project:
   ```bash
   npm run build
   ```

2. Check dist folder size:
   ```bash
   ls -lh dist/assets
   ```

3. Look at the visualizer report (opens automatically)

4. Compare "before" vs "after" sizes

---

### Hint 8: Common date-fns Functions

**Cheat sheet for replacing moment.js:**

```javascript
import {
  format,              // Format dates
  formatDistanceToNow, // "3 days ago"
  subDays,            // Subtract days
  addDays,            // Add days
  parseISO,           // Parse ISO string
  isAfter,            // Compare dates
  isBefore,           // Compare dates
  differenceInDays    // Difference between dates
} from 'date-fns';

// Examples
format(new Date(), 'MMMM do yyyy');           // "January 1st 2024"
formatDistanceToNow(date, { addSuffix: true }); // "3 days ago"
subDays(new Date(), 7);                       // 7 days ago
```

---

### Hint 9: Lazy Loading Best Practices

**What to lazy load:**
- ✅ Routes (pages)
- ✅ Heavy components (charts, maps, editors)
- ✅ Modals and dialogs
- ✅ Features used by < 50% of users

**What NOT to lazy load:**
- ❌ Small components (< 10KB)
- ❌ Critical above-the-fold content
- ❌ Components that load immediately

**Rule of thumb:** If component + dependencies > 50KB, consider lazy loading!

---

### Hint 10: Debugging Tree Shaking

**Question:** Why isn't tree shaking working?

**Check:**
1. Are you using ES modules (`import`/`export`)?
   ```javascript
   // ✅ Good
   import { something } from 'lib';

   // ❌ Bad - CommonJS
   const lib = require('lib');
   ```

2. Is library using ES modules?
   ```javascript
   // ✅ Good
   import debounce from 'lodash-es/debounce';

   // ❌ Bad - CommonJS build
   import _ from 'lodash';
   ```

3. Is production build enabled?
   ```bash
   npm run build  # Not npm run dev
   ```

---

### Hint 11: Native Alternatives to lodash

```javascript
// _.uniq
const uniq = arr => [...new Set(arr)];

// _.sum
const sum = arr => arr.reduce((a, b) => a + b, 0);

// _.max
const max = arr => Math.max(...arr);

// _.debounce
function debounce(fn, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

// _.throttle
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

// _.cloneDeep (for simple objects)
const cloneDeep = obj => JSON.parse(JSON.stringify(obj));

// _.isEmpty
const isEmpty = obj => Object.keys(obj).length === 0;
```

---

### Hint 12: Verification Steps

**After each optimization, verify:**

1. **Build the app:**
   ```bash
   npm run build
   ```

2. **Check bundle size:**
   ```bash
   ls -lh dist/assets/*.js
   ```

3. **Test in browser:**
   ```bash
   npm run preview
   ```
   Navigate to http://localhost:4173

4. **Check that everything works:**
   - All pages load correctly
   - Dashboard charts display
   - Dates format correctly
   - No console errors

---

### Hint 13: Understanding the Visualizer

**Reading the bundle analyzer:**

- **Big boxes** = large dependencies (optimize these!)
- **Nested boxes** = how dependencies import each other
- **Colors** = different chunks
- **Hover** = see exact size

**Look for:**
- Unexpectedly large dependencies
- Duplicate dependencies
- Unused code

---

### Hint 14: Order of Operations

**Recommended order:**

1. **Install and run visualizer** - See what's large
2. **Replace moment.js** - Biggest single win
3. **Optimize lodash** - Second biggest win
4. **Lazy load Dashboard** - Removes charts from main bundle
5. **Configure chunk splitting** - Better caching
6. **Verify improvements** - Measure everything

---

### Still Stuck?

**Check these common issues:**

1. **Bundle still large after changes?**
   - Did you run `npm run build` (not `dev`)?
   - Did you remove old dependencies from package.json?
   - Clear dist folder: `rm -rf dist && npm run build`

2. **Lazy loading not working?**
   - Did you wrap in `<Suspense>`?
   - Is import using `lazy(() => import(...))`?
   - Check browser Network tab - should see separate chunk load

3. **Tree shaking not working?**
   - Using ES modules (not CommonJS)?
   - Library has ES module build?
   - Production build enabled?

---

**Pro tip:** Check the solution folder to compare your implementation!

Good luck optimizing! 🚀

