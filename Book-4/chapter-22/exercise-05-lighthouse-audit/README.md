# Exercise 5: Lighthouse Audit & Optimization

**Difficulty:** ⭐⭐ Intermediate-Advanced
**Time Required:** 60-90 minutes
**Prerequisites:** Exercises 1-4 completed

---

## 📚 Learning Objectives

By completing this exercise, you will:
- Run comprehensive Lighthouse audits
- Understand Core Web Vitals (FCP, LCP, CLS, TBT, FID)
- Interpret Lighthouse scores and recommendations
- Implement performance optimizations systematically
- Fix accessibility issues
- Improve best practices score
- Optimize SEO
- Achieve 90+ scores across all categories

---

## 🎯 Exercise Overview

You'll take a poorly-optimized website with low Lighthouse scores and systematically improve it to achieve excellent scores (90+) across all categories.

---

## 📋 Part 1: Understanding Lighthouse

### What is Lighthouse?

Lighthouse is an automated tool for improving web page quality. It audits:
- **Performance** - Speed and optimization
- **Accessibility** - Usability for all users
- **Best Practices** - Web development standards
- **SEO** - Search engine optimization
- **PWA** - Progressive Web App capabilities

### Core Web Vitals

Three key metrics for user experience:

1. **LCP (Largest Contentful Paint)** - Loading performance
   - Good: < 2.5 seconds
   - Needs improvement: 2.5 - 4 seconds
   - Poor: > 4 seconds

2. **FID (First Input Delay)** - Interactivity
   - Good: < 100ms
   - Needs improvement: 100 - 300ms
   - Poor: > 300ms

3. **CLS (Cumulative Layout Shift)** - Visual stability
   - Good: < 0.1
   - Needs improvement: 0.1 - 0.25
   - Poor: > 0.25

### Other Important Metrics

- **FCP (First Contentful Paint)** - When first content appears
- **TBT (Total Blocking Time)** - How long main thread is blocked
- **SI (Speed Index)** - How quickly content is visually displayed
- **TTI (Time to Interactive)** - When page becomes fully interactive

---

## 📝 Part 2: Running Your First Audit

### Setup

1. Open `starter/unoptimized-site.html` in Chrome
2. Open DevTools (F12)
3. Go to **Lighthouse** tab
4. Select categories: All
5. Select device: Mobile
6. Click **Analyze page load**

### Initial Scores (Expected)

```
Performance:      20-30  ❌
Accessibility:    60-70  ⚠️
Best Practices:   70-80  ⚠️
SEO:             60-70  ⚠️
```

### Review the Report

1. **Scores** - Overall metrics
2. **Metrics** - Detailed timing data
3. **Opportunities** - Suggestions for improvement (with estimated savings)
4. **Diagnostics** - Issues to investigate
5. **Passed Audits** - What's working well

---

## 📝 Part 3: Performance Optimization

### Current Performance Issues

Review the "Opportunities" section:

1. **Eliminate render-blocking resources** (Est. savings: 2-3s)
2. **Properly size images** (Est. savings: 1-2s)
3. **Defer offscreen images** (Est. savings: 1-2s)
4. **Minify CSS** (Est. savings: 0.5s)
5. **Minify JavaScript** (Est. savings: 0.5s)
6. **Enable text compression** (Est. savings: 1s)
7. **Reduce unused JavaScript** (Est. savings: 1-2s)
8. **Serve images in next-gen formats** (Est. savings: 1s)

### Optimization Task 1: Images

**Problems:**
- Images too large (2MB+ each)
- Not lazy loaded
- No dimensions (causes CLS)
- PNG/JPG instead of WebP

**Fixes:**
```html
<!-- ❌ Before -->
<img src="large-image.jpg" alt="Hero">

<!-- ✅ After -->
<img
  src="hero-800.webp"
  srcset="hero-400.webp 400w, hero-800.webp 800w, hero-1200.webp 1200w"
  sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
  alt="Hero"
  width="1200"
  height="800"
  loading="lazy"
>
```

**Expected improvement:** +20-30 points

### Optimization Task 2: Eliminate Render-Blocking Resources

**Problems:**
- Multiple CSS files blocking render
- JavaScript in `<head>` blocks parsing

**Fixes:**
```html
<!-- ❌ Before -->
<link rel="stylesheet" href="styles.css">
<link rel="stylesheet" href="font-icons.css">
<script src="app.js"></script>

<!-- ✅ After -->
<style>
  /* Inline critical CSS */
</style>
<link rel="preload" href="styles.css" as="style" onload="this.rel='stylesheet'">
<script src="app.js" defer></script>
```

**Expected improvement:** +15-25 points

### Optimization Task 3: Reduce JavaScript Execution Time

**Problems:**
- Large unused libraries
- No code splitting
- Expensive operations on main thread

**Fixes:**
- Remove unused libraries
- Use dynamic imports
- Move expensive work to Web Workers
- Implement virtual scrolling

**Expected improvement:** +10-20 points

### Optimization Task 4: Optimize Core Web Vitals

#### Fix LCP (Largest Contentful Paint)

```
Current LCP: 6-8 seconds ❌
Target: < 2.5 seconds ✅

Fixes:
- Optimize hero image (compress, WebP, dimensions)
- Preload critical resources
- Remove render-blocking resources
- Use CDN
```

#### Fix CLS (Cumulative Layout Shift)

```
Current CLS: 0.4+ ❌
Target: < 0.1 ✅

Fixes:
- Add width/height to ALL images
- Reserve space for ads/embeds
- Avoid inserting content above existing content
- Use transform/opacity for animations
```

#### Fix TBT (Total Blocking Time)

```
Current TBT: 1500-2000ms ❌
Target: < 300ms ✅

Fixes:
- Break up long tasks
- Defer non-critical JavaScript
- Use requestIdleCallback
- Code splitting
```

---

## 📝 Part 4: Accessibility Fixes

### Current Accessibility Issues

Common issues found:

1. ❌ Missing alt text on images
2. ❌ Low contrast text
3. ❌ Missing form labels
4. ❌ Improper heading hierarchy (h1 → h3 without h2)
5. ❌ Links without descriptive text ("click here")
6. ❌ Missing ARIA labels
7. ❌ No focus indicators
8. ❌ Missing lang attribute

### Fix 1: Image Alt Text

```html
<!-- ❌ Before -->
<img src="hero.jpg">

<!-- ✅ After -->
<img src="hero.jpg" alt="Team collaboration in modern office">
```

### Fix 2: Color Contrast

```css
/* ❌ Before: Contrast ratio 2.8:1 (fails) */
.text {
  color: #888;
  background: #fff;
}

/* ✅ After: Contrast ratio 4.6:1 (passes AA) */
.text {
  color: #595959;
  background: #fff;
}
```

Use DevTools color picker to check contrast!

### Fix 3: Form Labels

```html
<!-- ❌ Before -->
<input type="text" placeholder="Email">

<!-- ✅ After -->
<label for="email">Email Address</label>
<input type="text" id="email" name="email" placeholder="you@example.com">
```

### Fix 4: Heading Hierarchy

```html
<!-- ❌ Before -->
<h1>Title</h1>
<h3>Subtitle</h3>  <!-- Skipped h2! -->

<!-- ✅ After -->
<h1>Title</h1>
<h2>Subtitle</h2>
```

### Fix 5: Descriptive Links

```html
<!-- ❌ Before -->
<a href="/about">Click here</a>

<!-- ✅ After -->
<a href="/about">Learn more about our company</a>
```

### Fix 6: Focus Indicators

```css
/* ❌ Before: No focus style */
button:focus {
  outline: none;
}

/* ✅ After: Clear focus indicator */
button:focus {
  outline: 2px solid #4A90E2;
  outline-offset: 2px;
}
```

**Expected improvement:** From 65 to 95+ points

---

## 📝 Part 5: Best Practices Fixes

### Current Issues

1. ❌ Uses HTTP instead of HTTPS
2. ❌ Missing CSP (Content Security Policy)
3. ❌ Console errors present
4. ❌ Using deprecated APIs
5. ❌ Images without aspect ratio
6. ❌ Missing document title
7. ❌ Insecure third-party resources

### Fixes

```html
<!-- ✅ Add meta tags -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">

<!-- ✅ Add CSP -->
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self' 'unsafe-inline';">

<!-- ✅ Document title -->
<title>Optimized Website - Fast & Accessible</title>

<!-- ✅ Fix console errors -->
<!-- Review and fix all JavaScript errors -->

<!-- ✅ Use HTTPS for all resources -->
<script src="https://cdn.example.com/library.js"></script>
```

**Expected improvement:** From 75 to 90+ points

---

## 📝 Part 6: SEO Optimization

### Current SEO Issues

1. ❌ Missing meta description
2. ❌ Document doesn't have title
3. ❌ Links are not crawlable
4. ❌ Image elements do not have [alt] attributes
5. ❌ Missing viewport meta tag
6. ❌ Font sizes too small for mobile
7. ❌ Tap targets not sized appropriately

### Fixes

```html
<!-- ✅ Essential SEO meta tags -->
<title>Your Page Title | Brand Name</title>
<meta name="description" content="Compelling description of your page content, 150-160 characters.">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- ✅ Open Graph tags -->
<meta property="og:title" content="Your Page Title">
<meta property="og:description" content="Page description">
<meta property="og:image" content="https://example.com/image.jpg">
<meta property="og:url" content="https://example.com/page">

<!-- ✅ Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Your Page Title">
<meta name="twitter:description" content="Page description">

<!-- ✅ Canonical URL -->
<link rel="canonical" href="https://example.com/page">

<!-- ✅ Structured data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Your Page Title",
  "description": "Page description"
}
</script>
```

```css
/* ✅ Mobile-friendly text sizes */
body {
  font-size: 16px;  /* At least 16px for body text */
}

/* ✅ Tap targets at least 48x48px */
button, a {
  min-height: 48px;
  min-width: 48px;
}
```

**Expected improvement:** From 70 to 95+ points

---

## ✅ Acceptance Criteria

Your optimization is complete when Lighthouse shows:

- [ ] **Performance:** 90+ (Green)
- [ ] **Accessibility:** 95+ (Green)
- [ ] **Best Practices:** 90+ (Green)
- [ ] **SEO:** 95+ (Green)

### Core Web Vitals Target

- [ ] **LCP:** < 2.5s (Green)
- [ ] **FID:** < 100ms (Green)
- [ ] **CLS:** < 0.1 (Green)

### Additional Checks

- [ ] **FCP:** < 1.8s
- [ ] **TBT:** < 300ms
- [ ] **Speed Index:** < 3.4s
- [ ] All images have alt text
- [ ] All forms have labels
- [ ] Color contrast passes AA standard
- [ ] No console errors
- [ ] Mobile-friendly

---

## 📊 Expected Results

### Before
```
Performance:      25  ❌
Accessibility:    65  ⚠️
Best Practices:   75  ⚠️
SEO:             68  ⚠️

FCP: 4.5s  ❌
LCP: 7.2s  ❌
TBT: 1850ms  ❌
CLS: 0.45  ❌
```

### After
```
Performance:      93  ✅
Accessibility:    98  ✅
Best Practices:   92  ✅
SEO:             95  ✅

FCP: 0.9s  ✅
LCP: 1.8s  ✅
TBT: 180ms  ✅
CLS: 0.02  ✅
```

### Improvement
```
Performance:      +68 points
Accessibility:    +33 points
Best Practices:   +17 points
SEO:             +27 points

FCP: 80% faster
LCP: 75% faster
TBT: 90% faster
CLS: 95% better
```

---

## 🎓 Bonus Challenges

### 1. Achieve 100 Performance Score

- Optimize images to WebP
- Implement service worker
- Use HTTP/2 or HTTP/3
- Implement resource hints
- Perfect code splitting

### 2. PWA Optimization

- Add manifest.json
- Implement service worker
- Make app installable
- Add offline support
- Add app icons

### 3. Advanced Optimization

- Implement lazy hydration
- Use Intersection Observer for everything
- Implement predictive prefetching
- Use facade pattern for embeds
- Implement streaming SSR

---

## 📚 Key Takeaways

- **Lighthouse** provides actionable optimization advice
- **Core Web Vitals** directly impact user experience
- **Performance** improvements often have biggest impact
- **Accessibility** makes site usable for everyone
- **Iterative optimization** - measure, fix, re-measure
- **Real-world testing** on slow devices/networks is crucial
- **Automated audits** should be part of CI/CD
- **Balance** optimization with development speed

---

## 🔧 Lighthouse Tips

### Command Line

```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit
lighthouse https://example.com --view

# Mobile audit
lighthouse https://example.com --preset=mobile

# Desktop audit
lighthouse https://example.com --preset=desktop

# Save report
lighthouse https://example.com --output=html --output-path=./report.html
```

### CI/CD Integration

```yaml
# GitHub Actions example
- name: Lighthouse CI
  uses: treosh/lighthouse-ci-action@v9
  with:
    urls: |
      https://example.com
      https://example.com/about
    budgetPath: ./budget.json
    uploadArtifacts: true
```

### Performance Budgets

```json
// budget.json
{
  "path": "/*",
  "timings": [
    {
      "metric": "first-contentful-paint",
      "budget": 2000
    },
    {
      "metric": "largest-contentful-paint",
      "budget": 2500
    }
  ],
  "resourceSizes": [
    {
      "resourceType": "script",
      "budget": 300
    },
    {
      "resourceType": "image",
      "budget": 500
    }
  ]
}
```

---

**Estimated Completion Time:** 60-90 minutes
**Next:** Challenge - DevTools Mastery

**Fantastic work! You've achieved excellent Lighthouse scores!** 🎯⚡

