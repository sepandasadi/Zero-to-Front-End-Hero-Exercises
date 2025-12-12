# Exercise 3: Lighthouse Audit - Hints 💡

**Try the exercise yourself first before reading these hints!**

---

## Hint 1: Running Lighthouse in Chrome DevTools

**Steps:**
1. Open your website in Chrome
2. Press `F12` to open DevTools
3. Click the "Lighthouse" tab (or ">>" menu → Lighthouse)
4. Select categories to audit (Performance, Accessibility, Best Practices, SEO)
5. Choose "Desktop" or "Mobile"
6. Click "Analyze page load"

**Result:** Full report with scores and recommendations!

---

## Hint 2: Understanding the Report

**Main Sections:**

1. **Scores (0-100):**
   - 90-100: Green (Good)
   - 50-89: Orange (Needs Improvement)
   - 0-49: Red (Poor)

2. **Metrics:**
   - FCP (First Contentful Paint)
   - LCP (Largest Contentful Paint)
   - TBT (Total Blocking Time)
   - CLS (Cumulative Layout Shift)
   - Speed Index

3. **Opportunities:** Things that will improve performance (with estimated savings!)

4. **Diagnostics:** Additional information about page performance

---

## Hint 3: Top 5 Quick Wins

### 1. Properly Size Images

**Problem:** Serving images larger than needed

**Fix:**
```html
<!-- Bad -->
<img src="huge-image.jpg"> <!-- 3000×2000px for 300×200px space -->

<!-- Good -->
<img src="image-300.jpg" width="300" height="200">
```

**Impact:** Save 50-90% of image bandwidth!

---

### 2. Remove Unused CSS

**Problem:** Loading CSS you don't use

**How to find:**
1. DevTools → Coverage tab
2. Reload page
3. See which CSS is unused (red bars)

**Fix:**
```bash
# Use PurgeCSS
npm install --save-dev @fullhuman/postcss-purgecss
```

**Or manually:** Remove unused frameworks/libraries

**Impact:** 30-70% reduction in CSS size

---

### 3. Eliminate Render-Blocking Resources

**Problem:** CSS/JS blocks page rendering

**Fix for CSS:**
```html
<!-- Bad -->
<link rel="stylesheet" href="styles.css">

<!-- Good: Load critical CSS inline -->
<style>
  /* Critical above-the-fold CSS here */
</style>
<!-- Load rest async -->
<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

**Fix for JS:**
```html
<!-- Bad -->
<script src="app.js"></script>

<!-- Good -->
<script src="app.js" defer></script>
<!-- or -->
<script src="app.js" async></script>
```

**Impact:** 0.5-2 seconds faster FCP

---

### 4. Enable Text Compression

**Problem:** Serving uncompressed text files

**Fix (Verce

l):**
```json
// vercel.json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Encoding",
          "value": "gzip"
        }
      ]
    }
  ]
}
```

**Fix (Netlify):**
Automatic! Just deploy.

**Manual (Node/Express):**
```javascript
const compression = require('compression');
app.use(compression());
```

**Impact:** 60-80% smaller text files

---

### 5. Serve Images in Next-Gen Formats

**Problem:** Using JPEG/PNG instead of WebP/AVIF

**Fix:**
```html
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Fallback">
</picture>
```

**Impact:** 25-80% smaller image files

---

## Hint 4: Fixing Accessibility Issues

**Common issues:**

1. **Missing alt text:**
```html
<!-- Bad -->
<img src="photo.jpg">

<!-- Good -->
<img src="photo.jpg" alt="Description of photo">
```

2. **Low contrast text:**
```css
/* Bad: 2.5:1 contrast */
color: #999;
background: #fff;

/* Good: 4.5:1 contrast */
color: #666;
background: #fff;
```

3. **Missing form labels:**
```html
<!-- Bad -->
<input type="text" placeholder="Name">

<!-- Good -->
<label for="name">Name</label>
<input type="text" id="name">
```

---

## Hint 5: Documenting Your Improvements

Create a comparison table:

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Performance | 62 | 95 | +33 |
| LCP | 4.2s | 1.8s | -2.4s |
| CLS | 0.18 | 0.02 | -0.16 |
| Bundle Size | 450 KB | 130 KB | -71% |

**Include screenshots:**
- Before audit (full report)
- After audit (full report)
- Specific improvements (e.g., Coverage tab showing unused CSS removed)

---

## Hint 6: Achieving 90+ Score

**Checklist:**

Performance:
- [ ] Optimize images (WebP/AVIF, correct sizes)
- [ ] Code splitting implemented
- [ ] Lazy load off-screen images
- [ ] Minimize JS/CSS
- [ ] Use CDN
- [ ] Enable compression

Accessibility:
- [ ] All images have alt text
- [ ] Sufficient color contrast
- [ ] Proper heading hierarchy
- [ ] Form labels present
- [ ] ARIA attributes where needed

Best Practices:
- [ ] HTTPS enabled
- [ ] No console errors
- [ ] Proper doctype
- [ ] Valid meta viewport

SEO:
- [ ] Title tag present
- [ ] Meta description
- [ ] Semantic HTML
- [ ] Crawlable links

---

## Hint 7: Using Lighthouse CI

**Automate audits in your pipeline:**

```bash
# Install
npm install --save-dev @lhci/cli

# Run
npx lhci autorun
```

**Configuration (`lighthouserc.json`):**
```json
{
  "ci": {
    "collect": {
      "url": ["http://localhost:3000"],
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 0.9}]
      }
    }
  }
}
```

**Fail builds if score drops!**

---

## Hint 8: Common Mistakes

❌ **Testing on fast connection**
- Use throttling (Slow 3G) for realistic results

❌ **Testing while developing**
- Always test production build

❌ **Ignoring mobile**
- Mobile scores are usually lower - test both!

❌ **Only running once**
- Run 3-5 times and average

❌ **Chasing 100 score**
- 90+ is excellent, 100 is often impractical

---

**You've got this! Make that Lighthouse green!** 🟢

