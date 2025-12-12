# Exercise 1: Modern Build Setup with Vite

**Difficulty:** ⭐⭐ Intermediate
**Time Estimate:** 90-120 minutes

## 🎯 Learning Objectives

By completing this exercise, you will:
- Set up Vite with production-ready configuration
- Configure code splitting for optimal performance
- Manage environment variables properly
- Generate source maps for debugging
- Optimize bundle size for production

---

## 📋 Scenario

You're tasked with setting up a new React project using modern build tools. The project needs to be production-ready with:
- Fast development server
- Optimized production builds
- Proper environment management
- Code splitting to reduce initial bundle size
- Source maps for error debugging

---

## 🚀 Setup

### Step 1: Create Vite Project

```bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
```

### Step 2: Install Additional Dependencies

```bash
# Development dependencies
npm install -D @vitejs/plugin-react
npm install -D vite-plugin-compression
npm install -D rollup-plugin-visualizer

# Production dependencies
npm install react-router-dom
npm install axios
```

---

## 🎯 Tasks

### Task 1: Configure Code Splitting

**Goal:** Separate vendor code from application code for better caching.

**Edit `vite.config.js`:**

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: './dist/stats.html',
      open: true
    })
  ],

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // TODO: Configure vendor chunk
          // TODO: Configure router chunk
          // TODO: Configure utils chunk
        }
      }
    }
  }
});
```

**Your task:** Configure `manualChunks` to create separate bundles for:
- `vendor`: React and React-DOM
- `router`: react-router-dom
- `utils`: axios and any other utilities

**Test:**
```bash
npm run build
# Check dist/assets/ - you should see:
# - vendor.[hash].js
# - router.[hash].js
# - utils.[hash].js
# - index.[hash].js
```

---

### Task 2: Set Up Environment Variables

**Goal:** Create proper environment configuration for dev, staging, and production.

**Create environment files:**

```bash
# .env.development
VITE_API_URL=http://localhost:8000/api
VITE_ENV=development
VITE_ENABLE_DEBUG=true
VITE_SENTRY_DSN=

# .env.staging
VITE_API_URL=https://api.staging.example.com
VITE_ENV=staging
VITE_ENABLE_DEBUG=true
VITE_SENTRY_DSN=your_sentry_dsn_here

# .env.production
VITE_API_URL=https://api.example.com
VITE_ENV=production
VITE_ENABLE_DEBUG=false
VITE_SENTRY_DSN=your_sentry_dsn_here
```

**Create `src/config.js`:**

```javascript
// TODO: Validate required environment variables
// TODO: Export configuration object
// TODO: Add type checking (optional)

const requiredEnvVars = [
  'VITE_API_URL',
  'VITE_ENV'
];

// Validate on import
requiredEnvVars.forEach(varName => {
  if (!import.meta.env[varName]) {
    throw new Error(`Missing required environment variable: ${varName}`);
  }
});

export const config = {
  // TODO: Add configuration values
};
```

**Update `.gitignore`:**
```
.env.local
.env.*.local
```

---

### Task 3: Optimize Build Size

**Goal:** Achieve bundle size < 200KB (gzipped).

**Add compression plugin:**

```javascript
import compression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: 'gzip',
      ext: '.gz'
    })
  ],

  build: {
    target: 'es2020',
    minify: 'esbuild',
    cssMinify: true,

    rollupOptions: {
      output: {
        manualChunks: {
          // Your chunks from Task 1
        }
      }
    }
  }
});
```

**Optimization checklist:**
- [ ] Tree shaking enabled (automatic with Vite)
- [ ] Minification enabled
- [ ] CSS minification enabled
- [ ] Gzip compression configured
- [ ] Bundle analysis shows clear separation

---

### Task 4: Configure Source Maps

**Goal:** Generate source maps for production debugging without exposing them publicly.

**Update `vite.config.js`:**

```javascript
export default defineConfig({
  build: {
    sourcemap: true, // Generate source maps

    rollupOptions: {
      output: {
        sourcemapExcludeSources: true // Don't include source code in maps
      }
    }
  }
});
```

**Verify:**
```bash
npm run build
ls -lh dist/assets/*.map
# You should see .map files generated
```

---

### Task 5: Add Build Scripts

**Update `package.json`:**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:staging": "vite build --mode staging",
    "build:production": "vite build --mode production",
    "preview": "vite preview",
    "analyze": "vite build && open dist/stats.html"
  }
}
```

**Test all build modes:**
```bash
npm run build:staging
npm run build:production
npm run analyze
```

---

## ✅ Success Criteria

Your solution must:

1. **Code Splitting:**
   - ✅ Vendor chunk (React, React-DOM) separated
   - ✅ Router chunk (react-router-dom) separated
   - ✅ Main application code in separate chunk
   - ✅ Bundle analysis shows clear separation

2. **Environment Variables:**
   - ✅ Three environment files (.env.development, .env.staging, .env.production)
   - ✅ Config validation on app startup
   - ✅ No secrets committed to git
   - ✅ Different API URLs per environment

3. **Bundle Size:**
   - ✅ Total bundle size < 200KB (gzipped)
   - ✅ Vendor chunk > 100KB (React is large)
   - ✅ Main app chunk < 50KB
   - ✅ Gzip compression working

4. **Source Maps:**
   - ✅ .map files generated in dist/assets/
   - ✅ Source code not included in maps
   - ✅ Can debug minified code in browser DevTools

5. **Build Process:**
   - ✅ `npm run build` completes without errors
   - ✅ `npm run build:staging` uses staging env vars
   - ✅ `npm run build:production` uses production env vars
   - ✅ `npm run analyze` opens bundle visualization

---

## 🧪 Testing

### Manual Testing

**1. Development build:**
```bash
npm run dev
# Should start instantly (< 1 second)
# Visit http://localhost:5173
# Check console for environment: "development"
```

**2. Production build:**
```bash
npm run build:production
npm run preview
# Visit http://localhost:4173
# Check console for environment: "production"
# Debug mode should be false
```

**3. Bundle analysis:**
```bash
npm run analyze
# stats.html should open
# Verify chunks are properly split
# Check total size < 200KB
```

**4. Source maps:**
```bash
# In browser DevTools
# Open any error/console.log
# Click on file location
# Should see original source code, not minified
```

---

## 💡 Bonus Challenges

1. **Add CSS Code Splitting:**
   - Separate CSS for each route
   - Lazy load route-specific CSS
   - Minimize CSS file sizes

2. **Implement Tree Shaking:**
   - Use lodash-es instead of lodash
   - Import only specific functions
   - Verify unused code is removed

3. **Add Pre-compression:**
   - Generate both gzip and brotli
   - Configure for different file types
   - Compare compression ratios

4. **Performance Budget:**
   - Add bundlesize package
   - Set budget for each chunk
   - Fail build if budget exceeded

5. **Dynamic Imports:**
   - Lazy load heavy components
   - Use React.lazy() and Suspense
   - Measure impact on bundle size

---

## 📚 Resources

- [Vite Documentation](https://vitejs.dev/)
- [Rollup Code Splitting](https://rollupjs.org/guide/en/#code-splitting)
- [Bundle Size Optimization](https://web.dev/reduce-javascript-payloads-with-code-splitting/)
- [Source Maps Explained](https://web.dev/source-maps/)

---

## 🎉 Completion

Once you've successfully:
- Configured code splitting
- Set up environment variables
- Optimized bundle size < 200KB
- Generated source maps
- Tested all build modes

You're ready for Exercise 2: CI/CD Pipeline! 🚀

