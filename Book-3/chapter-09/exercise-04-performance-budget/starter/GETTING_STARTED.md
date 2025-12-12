# Getting Started: Performance Budget

## 🎯 Your Task

Set up a performance budget, analyze your current bundle size, optimize to meet the budget, and set up automated enforcement.

---

## 📋 Steps to Complete

### Step 1: Analyze Current Bundle

First, let's see what we're working with:

```bash
# Build your project
npm run build

# Check output sizes
ls -lh dist/
```

**Document current sizes:**
- JavaScript: ___ KB
- CSS: ___ KB
- Images: ___ KB
- Total: ___ KB

---

### Step 2: Visualize Bundle Contents

**Install analyzer:**
```bash
npm install --save-dev rollup-plugin-visualizer
```

**Add to vite.config.js:**
```javascript
import { visualizer } from 'rollup-plugin-visualizer';

export default {
  plugins: [
    visualizer({ open: true })
  ]
};
```

**Build and analyze:**
```bash
npm run build
# Opens stats.html with visualization
```

**Identify largest dependencies:**
1. _______________
2. _______________
3. _______________

---

### Step 3: Create budget.json

Based on your analysis, create realistic budgets:

```json
{
  "budget": [
    {
      "resourceSizes": [
        { "resourceType": "script", "budget": 200 },
        { "resourceType": "stylesheet", "budget": 50 },
        { "resourceType": "image", "budget": 500 },
        { "resourceType": "total", "budget": 1000 }
      ]
    }
  ],
  "timings": [
    { "metric": "interactive", "budget": 3000 },
    { "metric": "first-contentful-paint", "budget": 1500 }
  ]
}
```

**Adjust based on your needs!**

---

### Step 4: Optimize to Meet Budget

Common optimization strategies:

#### 1. Remove Unused Dependencies

```bash
# Check what's using space
npm list --depth=0

# Remove unused packages
npm uninstall unused-package
```

#### 2. Replace Heavy Libraries

**Example: date-fns instead of moment.js**
```bash
npm uninstall moment
npm install date-fns
```

**Savings: 211 KB!**

#### 3. Code Splitting

```javascript
// Before: Everything in main bundle
import HeavyComponent from './HeavyComponent';

// After: Lazy load
const HeavyComponent = lazy(() => import('./HeavyComponent'));
```

#### 4. Tree Shaking

```javascript
// ❌ Imports entire library
import _ from 'lodash';

// ✅ Only imports what you need
import debounce from 'lodash/debounce';
```

---

### Step 5: Set Up Lighthouse CI

**Install:**
```bash
npm install --save-dev @lhci/cli
```

**Create lighthouserc.json:**
```json
{
  "ci": {
    "collect": {
      "staticDistDir": "./dist"
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "resource-summary:script:size": ["error", {"maxNumericValue": 204800}]
      }
    }
  }
}
```

**Test it:**
```bash
npm run build
npx lhci autorun
```

**Should pass all budget checks!**

---

### Step 6: Add to package.json Scripts

```json
{
  "scripts": {
    "build": "vite build",
    "analyze": "vite build && open stats.html",
    "budget": "lhci autorun"
  }
}
```

---

### Step 7: (Optional) GitHub Actions

Create `.github/workflows/budget.yml`:

```yaml
name: Performance Budget
on: [pull_request]

jobs:
  budget:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm run build
      - run: npx lhci autorun
```

Now budgets are enforced on every PR!

---

## ✅ Success Criteria

- [ ] Current bundle analyzed
- [ ] Largest dependencies identified
- [ ] budget.json created with realistic targets
- [ ] Bundle optimized to meet budget
- [ ] Lighthouse CI configured
- [ ] All budget checks passing
- [ ] Documentation complete

---

## 📊 Expected Results

**Before optimization:**
- Total bundle: ~1.5 MB
- Main JS: ~450 KB
- Fails budget checks

**After optimization:**
- Total bundle: ~800 KB
- Main JS: ~180 KB
- Passes all budget checks ✅

**Improvement: 47% reduction**

---

## 💡 Tips

1. **Start conservative:** It's easier to relax budgets than tighten them later

2. **Target mobile 3G:** If it's fast on slow connections, it's fast everywhere

3. **Monitor trends:** Track bundle size over time

4. **Automate:** Fail builds that exceed budget

5. **Document exceptions:** Sometimes you need to exceed budget - document why

---

**Ready to set your budget? Let's go!** 💰

