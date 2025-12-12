# Exercise 4 Solution: Performance Budget

Complete implementation of performance budgeting with automated enforcement.

## 📊 Results

### Bundle Analysis

**Before Optimization:**
```
dist/assets/index.js      452 KB
dist/assets/vendor.js     312 KB
dist/assets/styles.css     68 KB
dist/assets/images/*      1.2 MB
───────────────────────────────
Total: 2.03 MB
```

**After Optimization:**
```
dist/assets/index.js      178 KB  (-61%)
dist/assets/home.js        42 KB  (split)
dist/assets/dashboard.js   98 KB  (split)
dist/assets/styles.css     18 KB  (-74%)
dist/assets/images/*      285 KB  (-76%)
───────────────────────────────
Total: 621 KB  (-69% reduction!)
```

### Budget Compliance

| Resource Type | Budget | Actual | Status |
|---------------|--------|--------|--------|
| JavaScript | 200 KB | 178 KB | ✅ Pass |
| CSS | 50 KB | 18 KB | ✅ Pass |
| Images | 500 KB | 285 KB | ✅ Pass |
| **Total** | **1000 KB** | **621 KB** | ✅ **Pass** |

### Performance Metrics

| Metric | Budget | Actual | Status |
|--------|--------|--------|--------|
| FCP | 1.5s | 0.8s | ✅ Pass |
| LCP | 2.5s | 1.6s | ✅ Pass |
| TTI | 3.0s | 2.1s | ✅ Pass |

---

## 🔧 Optimizations Implemented

### 1. Replaced Heavy Dependencies

**moment.js → date-fns**
```bash
npm uninstall moment
npm install date-fns
```

**Savings:** 289 KB → 78 KB = **211 KB saved**

**Code change:**
```javascript
// Before
import moment from 'moment';
const date = moment().format('YYYY-MM-DD');

// After
import { format } from 'date-fns';
const date = format(new Date(), 'yyyy-MM-dd');
```

---

### 2. Implemented Code Splitting

**Route-based splitting:**
```javascript
const Dashboard = lazy(() => import('./pages/Dashboard'));
```

**Result:** Main bundle 452 KB → 178 KB

---

### 3. Removed Unused CSS

**Used PurgeCSS:**
```javascript
// postcss.config.js
module.exports = {
  plugins: [
    require('@fullhuman/postcss-purgecss')({
      content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
    })
  ]
};
```

**Result:** 68 KB → 18 KB (74% reduction)

---

### 4. Optimized Images

- Converted to WebP/AVIF
- Proper sizing
- Lazy loading

**Result:** 1.2 MB → 285 KB (76% reduction)

---

### 5. Tree Shaking

**Lodash optimization:**
```javascript
// Before: Imports entire lodash
import _ from 'lodash';

// After: Only imports specific functions
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
```

**Savings:** ~70 KB

---

## 📋 Budget Configuration

### budget.json

```json
{
  "budget": [
    {
      "path": "/*",
      "resourceSizes": [
        {
          "resourceType": "script",
          "budget": 200
        },
        {
          "resourceType": "stylesheet",
          "budget": 50
        },
        {
          "resourceType": "image",
          "budget": 500
        },
        {
          "resourceType": "total",
          "budget": 1000
        }
      ]
    }
  ],
  "timings": [
    {
      "metric": "interactive",
      "budget": 3000
    },
    {
      "metric": "first-contentful-paint",
      "budget": 1500
    },
    {
      "metric": "largest-contentful-paint",
      "budget": 2500
    }
  ]
}
```

---

### lighthouserc.json

```json
{
  "ci": {
    "collect": {
      "staticDistDir": "./dist",
      "numberOfRuns": 3
    },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "resource-summary:script:size": ["error", {"maxNumericValue": 204800}],
        "resource-summary:stylesheet:size": ["error", {"maxNumericValue": 51200}],
        "resource-summary:image:size": ["error", {"maxNumericValue": 512000}],
        "first-contentful-paint": ["error", {"maxNumericValue": 1500}],
        "largest-contentful-paint": ["error", {"maxNumericValue": 2500}]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

---

## 🤖 Automated Enforcement

### GitHub Actions Workflow

```.github/workflows/performance-budget.yml
name: Performance Budget Check
on: [pull_request]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli
          lhci autorun
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}

      - name: Bundle size check
        run: npm run test:size
```

**This workflow:**
- Runs on every PR
- Builds the project
- Checks Lighthouse budgets
- Fails PR if budgets exceeded
- Posts results as PR comment

---

## 📈 Monitoring Dashboard

### Bundle Size Trends

Track bundle size over time:

```json
// package.json
{
  "scripts": {
    "postbuild": "node scripts/track-bundle-size.js"
  }
}
```

```javascript
// scripts/track-bundle-size.js
const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, '../dist');
const files = fs.readdirSync(distPath);

let totalSize = 0;
files.forEach(file => {
  const stats = fs.statSync(path.join(distPath, file));
  totalSize += stats.size;
});

const data = {
  timestamp: new Date().toISOString(),
  size: totalSize,
  sizeKB: (totalSize / 1024).toFixed(2)
};

// Append to log
fs.appendFileSync('bundle-history.json', JSON.stringify(data) + '\n');

console.log(`Bundle size: ${data.sizeKB} KB`);

// Check if over budget
const BUDGET_KB = 1000;
if (data.sizeKB > BUDGET_KB) {
  console.error(`❌ Bundle exceeds budget! ${data.sizeKB}KB > ${BUDGET_KB}KB`);
  process.exit(1);
}

console.log(`✅ Bundle within budget! ${data.sizeKB}KB <= ${BUDGET_KB}KB`);
```

---

## 💡 Key Learnings

### 1. Set Budgets Early

**Why:** Easier to maintain than optimize later

**How:** Base on:
- Target audience (mobile-first?)
- Connection speeds (3G? 4G?)
- Competitor analysis

### 2. Automate Everything

**Manual checks fail:**
- Developers forget
- Inconsistent enforcement
- Budgets creep up

**Automated checks win:**
- Run on every commit
- Consistent enforcement
- Instant feedback

### 3. Make Budgets Visible

**Dashboard on README:**
```markdown
## Bundle Size

![Bundle Size](https://img.shields.io/badge/bundle-621KB-green)
![Budget](https://img.shields.io/badge/budget-1000KB-blue)
```

**Everyone sees the budget status!**

### 4. Document Exceptions

**Sometimes you need to exceed budget:**
- Critical feature
- Temporary spike
- Special page

**Document it:**
```json
// budget.json
{
  "path": "/admin",
  "resourceSizes": [
    { "resourceType": "script", "budget": 500 }
  ],
  "comment": "Admin dashboard needs heavy charting library"
}
```

### 5. Regular Reviews

**Monthly budget review:**
- Are budgets still realistic?
- New optimization opportunities?
- Technology changes?

**Adjust as needed!**

---

## 🎯 Production Checklist

- [✅] budget.json created
- [✅] Lighthouse CI configured
- [✅] GitHub Actions workflow added
- [✅] All budgets passing
- [✅] Bundle analyzer integrated
- [✅] Monitoring dashboard set up
- [✅] Team trained on budgets
- [✅] Documentation complete

---

## 📚 Tools Used

- **@lhci/cli** - Lighthouse CI automation
- **rollup-plugin-visualizer** - Bundle visualization
- **bundlesize** - Simple size checking
- **webpack-bundle-analyzer** - Detailed analysis
- **GitHub Actions** - CI/CD automation

---

**Congratulations! You've implemented automated performance budgeting!** 🎉

**Key Takeaway:** Performance budgets prevent regression. Set them early, automate enforcement, and your site will stay fast forever.

