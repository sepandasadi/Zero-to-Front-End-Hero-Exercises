# Exercise 4: Performance Budget - Hints 💡

**Try the exercise yourself first before reading these hints!**

---

## Hint 1: Creating budget.json

**Basic structure:**

```json
{
  "budget": [
    {
      "resourceSizes": [
        { "resourceType": "script", "budget": 200 },
        { "resourceType": "stylesheet", "budget": 50 },
        { "resourceType": "image", "budget": 500 },
        { "resourceType": "document", "budget": 30 },
        { "resourceType": "font", "budget": 100 },
        { "resourceType": "total", "budget": 1000 }
      ]
    }
  ],
  "timings": [
    { "metric": "interactive", "budget": 3000 },
    { "metric": "first-contentful-paint", "budget": 1500 },
    { "metric": "largest-contentful-paint", "budget": 2500 }
  ]
}
```

**All sizes in KB, timings in milliseconds.**

---

## Hint 2: Using Webpack Bundle Analyzer

**Installation:**
```bash
npm install --save-dev webpack-bundle-analyzer
```

**Configuration (webpack.config.js):**
```javascript
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: 'bundle-report.html'
    })
  ]
};
```

**Run:**
```bash
npm run build
# Opens visualization showing what's in your bundle
```

---

## Hint 3: Vite Bundle Visualization

**Install:**
```bash
npm install --save-dev rollup-plugin-visualizer
```

**vite.config.js:**
```javascript
import { visualizer } from 'rollup-plugin-visualizer';

export default {
  plugins: [
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true
    })
  ]
};
```

---

## Hint 4: Setting Up Lighthouse CI

**Install:**
```bash
npm install --save-dev @lhci/cli
```

**Configuration (lighthouserc.json):**
```json
{
  "ci": {
    "collect": {
      "url": ["http://localhost:3000"],
      "numberOfRuns": 3
    },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "resource-summary:script:size": ["error", {"maxNumericValue": 200000}],
        "resource-summary:stylesheet:size": ["error", {"maxNumericValue": 50000}],
        "first-contentful-paint": ["error", {"maxNumericValue": 1500}]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

**Run:**
```bash
npx lhci autorun
```

---

## Hint 5: Using bundlesize Package

**Install:**
```bash
npm install --save-dev bundlesize
```

**package.json:**
```json
{
  "bundlesize": [
    {
      "path": "./dist/**/*.js",
      "maxSize": "200 KB",
      "compression": "gzip"
    },
    {
      "path": "./dist/**/*.css",
      "maxSize": "50 KB",
      "compression": "gzip"
    }
  ],
  "scripts": {
    "test:size": "bundlesize"
  }
}
```

**GitHub Actions Integration:**
```yaml
# .github/workflows/budgets.yml
name: Bundle Size Check
on: [pull_request]
jobs:
  size:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm install
      - run: npm run build
      - run: npm run test:size
```

---

## Hint 6: Identifying Large Dependencies

**Use npm why / yarn why:**
```bash
npm why lodash
# Shows why lodash is in your bundle

npm list --depth=0
# Shows all top-level dependencies
```

**Check bundle-phobia:**
Visit https://bundlephobia.com/

Example:
- `moment.js`: 289 KB
- `date-fns`: 78 KB ← Better choice!

---

## Hint 7: Tree Shaking

**Ensure imports are tree-shakeable:**

```javascript
// ❌ Bad: Imports entire library
import _ from 'lodash';
_.debounce(fn, 300);

// ✅ Good: Only imports what you need
import debounce from 'lodash/debounce';
debounce(fn, 300);

// ✅ Even better: Use native or lighter alternative
import { debounce } from './utils'; // Your own 50-line implementation
```

---

## Hint 8: Setting Realistic Budgets

**Based on connection speeds:**

**3G (400 Kbps):**
- Total budget: 500-700 KB
- JS: 150-200 KB
- CSS: 30-50 KB
- Images: 300-400 KB

**4G (5 Mbps):**
- Total budget: 1-1.5 MB
- JS: 200-300 KB
- CSS: 50-100 KB
- Images: 500-800 KB

**Rule of thumb:** Budget for worst-case scenario (3G).

---

## Hint 9: Monitoring Over Time

**Track bundle sizes in Git:**

```bash
# Add to package.json scripts
"post build": "echo $(du -sh dist) >> bundle-sizes.txt"
```

**Visualize trends:**
```bash
git log --oneline bundle-sizes.txt
# See how bundle grew over time
```

---

## Hint 10: Automated Alerts

**Slack/Discord webhook on budget violation:**

```javascript
// build-check.js
const fs = require('fs');
const https = require('https');

const stats = JSON.parse(fs.readFileSync('dist/stats.json'));
const size = stats.assets.reduce((sum, asset) => sum + asset.size, 0);
const budget = 1000000; // 1MB

if (size > budget) {
  const data = JSON.stringify({
    text: `⚠️ Bundle size exceeded! ${(size/1024).toFixed(0)}KB > ${(budget/1024).toFixed(0)}KB`
  });

  const options = {
    hostname: 'hooks.slack.com',
    path: '/services/YOUR/WEBHOOK/URL',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };

  const req = https.request(options);
  req.write(data);
  req.end();

  process.exit(1); // Fail the build
}
```

---

**You've got this! Stay under budget!** 💰

