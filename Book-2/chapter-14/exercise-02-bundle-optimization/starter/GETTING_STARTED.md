# Getting Started - Exercise 2: Bundle Size Optimization

## Installation

```bash
npm install
```

This will install several HEAVY dependencies:
- moment.js (~300KB)
- lodash (~250KB)
- recharts (~200KB)
- Material-UI (~180KB)

## Running the App

```bash
# Development
npm run dev

# Build and check bundle size
npm run build
```

After building, check the `dist/` folder size!

## Your Task

Reduce the bundle size from **1.8MB to < 900KB** (50% reduction).

### Current Problems

1. **moment.js** - 300KB for simple date formatting
2. **lodash** - 250KB imported as whole library
3. **recharts** - 200KB loaded on every page
4. **No code splitting** - Everything in one bundle
5. **No tree shaking** - Unused code included

### Step 1: Install Bundle Analyzer

```bash
npm install --save-dev rollup-plugin-visualizer
```

Update `vite.config.js` to uncomment the visualizer plugin.

### Step 2: Build and Analyze

```bash
npm run build
```

The visualizer will open automatically showing your bundle composition.

**Document your findings:**
- Total bundle size: _____ KB
- Largest dependencies: _____

### Step 3: Apply Optimizations

Follow the tasks in the README:
1. Replace moment.js with date-fns
2. Optimize lodash (use lodash-es or native JavaScript)
3. Lazy load Dashboard page
4. Implement manual chunk splitting
5. Enable tree shaking

### Step 4: Measure Improvement

Build again and compare:

```bash
npm run build
```

Target: < 900KB (50%+ reduction)

## Success Criteria

- ✅ Bundle size < 900KB
- ✅ moment.js replaced or removed
- ✅ lodash optimized
- ✅ Dashboard lazy loaded
- ✅ Vendor chunks separated

Good luck! 🚀

