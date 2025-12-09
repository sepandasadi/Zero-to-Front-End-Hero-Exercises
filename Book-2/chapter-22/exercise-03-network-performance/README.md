# Exercise 3: Network & Performance Analysis

**Difficulty:** ⭐⭐ Intermediate
**Time Required:** 60-75 minutes
**Prerequisites:** Exercises 1-2 completed

---

## 📚 Learning Objectives

By completing this exercise, you will:
- Master the Network panel and understand request timing
- Analyze the waterfall chart
- Use network throttling to simulate slow connections
- Record and analyze performance profiles
- Identify performance bottlenecks
- Understand FCP, LCP, and other metrics
- Optimize page load time

---

## 🎯 Exercise Overview

You'll analyze a slow-loading webpage, identify performance issues using the Network and Performance panels, and optimize it for faster loading.

---

## 📋 Part 1: Network Panel Analysis

### Setup

Open the `starter/slow-website.html` file in Chrome.

### Challenge 1: Analyze Network Waterfall

1. Open DevTools → Network tab
2. Reload the page (Ctrl+R)
3. **Observe:**
   - Total requests
   - Total size transferred
   - Total load time
   - DOMContentLoaded time (blue line)
   - Load time (red line)

**Tasks:**
```
1. How many HTTP requests were made? _____
2. What's the total size transferred? _____
3. What's the load time? _____
4. Which resource took the longest? _____
5. Which resource is the largest? _____
```

### Challenge 2: Understand Request Timing

1. Click on any request
2. Go to **Timing** tab
3. **Study the breakdown:**
   - Queueing
   - Stalled
   - DNS Lookup
   - Initial connection
   - SSL
   - Request sent
   - Waiting (TTFB)
   - Content Download

**Task:** Which phase takes the longest for large images?

### Challenge 3: Filter and Search

```javascript
// Try these filters:
- img      // Only images
- css      // Only stylesheets
- js       // Only JavaScript
- xhr      // Only AJAX requests
- larger-than:100k  // Files > 100KB
```

**Tasks:**
1. Filter to show only images
2. Sort by size (largest first)
3. Identify images that could be optimized
4. Take a screenshot of your findings

### Challenge 4: Network Throttling

1. Click **No throttling** dropdown
2. Select **Slow 3G**
3. Reload page
4. **Compare:**
   - Load time on Fast connection: _____
   - Load time on Slow 3G: _____
   - Difference: _____

**Reality check:** Many users have slow connections!

### Challenge 5: Block Requests

1. Right-click on a CSS file
2. Select **Block request URL**
3. Reload page
4. **Observe:** Page without that resource
5. Unblock it (Network Request Blocking tab)

**Why useful:** Test graceful degradation

---

## 📝 Part 2: Performance Panel Analysis

### Challenge 6: Record Page Load

1. Open Performance panel
2. Click **Record** button (Ctrl+E)
3. Reload page
4. Stop recording when page finishes loading

**Observe the timeline:**
- FCP (First Contentful Paint)
- LCP (Largest Contentful Paint)
- Layout shifts
- JavaScript execution
- Rendering

### Challenge 7: Analyze Main Thread Activity

1. In the performance recording, find the **Main** section
2. Look for long tasks (yellow/red bars)
3. Click on a long task
4. **See:**
   - Function name
   - File and line number
   - Duration

**Task:** Identify the 3 longest tasks and their durations.

### Challenge 8: Find Bottlenecks

Look for these issues:
- Long JavaScript execution (yellow)
- Layout thrashing (purple)
- Forced reflows
- Long tasks blocking main thread

**Document:**
```
Issue 1: _____
Location: _____
Duration: _____
Impact: _____
```

### Challenge 9: Analyze FPS

1. Enable **FPS** meter (Ctrl+Shift+P → "Show FPS")
2. Scroll the page
3. **Observe:** FPS drops below 60?

**Goal:** Maintain 60 FPS for smooth experience

### Challenge 10: Screenshots Timeline

1. Start new recording
2. Check **Screenshots** checkbox
3. Record page load
4. **See:** Visual progression of page loading

**Useful for:** Understanding user experience

---

## 📝 Part 3: Optimization Tasks

### Optimization 1: Reduce Image Sizes

**Current problem:**
```
image1.jpg - 2.5MB
image2.jpg - 1.8MB
image3.jpg - 2.1MB
Total: 6.4MB
```

**Your tasks:**
1. Use DevTools to identify oversized images
2. Note which images are largest
3. In the solution, these are optimized to WebP
4. Compare file sizes

### Optimization 2: Eliminate Render-Blocking CSS

**Current problem:**
- 3 CSS files block rendering
- Page can't render until all CSS downloads

**Solution approach:**
1. Inline critical CSS
2. Defer non-critical CSS
3. Remove unused CSS

### Optimization 3: Defer JavaScript

**Current problem:**
- Large JavaScript files block parsing
- Scripts execute before DOM is ready

**Solution approach:**
1. Add `defer` attribute to scripts
2. Move scripts to bottom of body
3. Use `async` where appropriate

### Optimization 4: Enable Caching

**Current problem:**
- No cache headers
- Resources re-downloaded every time

**Solution approach:**
1. Add cache-control headers
2. Use ETags
3. Implement service worker

### Optimization 5: Reduce HTTP Requests

**Current problem:**
- 40+ HTTP requests
- Each request has overhead

**Solution approach:**
1. Combine CSS files
2. Use CSS sprites
3. Inline small resources
4. Lazy load below-the-fold content

---

## ✅ Verification Tasks

### Task 1: Network Analysis Report

Create a document with:
- [ ] Total requests (before/after)
- [ ] Total size (before/after)
- [ ] Load time (before/after)
- [ ] Largest resources identified
- [ ] Network waterfall screenshot

### Task 2: Performance Metrics

Document these metrics:
- [ ] FCP (First Contentful Paint)
- [ ] LCP (Largest Contentful Paint)
- [ ] TBT (Total Blocking Time)
- [ ] TTI (Time to Interactive)

### Task 3: Optimizations Applied

List all optimizations:
- [ ] Images optimized (WebP, compression)
- [ ] CSS optimized (minified, critical CSS)
- [ ] JavaScript optimized (defer, minify)
- [ ] HTTP requests reduced
- [ ] Caching implemented

---

## 📊 Expected Results

### Before Optimization
```
Requests: 40+
Size: 8MB+
Load time: 8+ seconds
FCP: 3+ seconds
LCP: 5+ seconds
```

### After Optimization
```
Requests: <20
Size: <1MB
Load time: <2 seconds
FCP: <1 second
LCP: <2 seconds
```

### Improvement
```
Requests: 50%+ reduction
Size: 85%+ reduction
Load time: 75%+ reduction
```

---

## 🎓 Bonus Challenges

1. **Service Worker**
   - Implement offline caching
   - Cache API responses
   - Background sync

2. **Resource Hints**
   ```html
   <link rel="preconnect" href="https://api.example.com">
   <link rel="dns-prefetch" href="https://cdn.example.com">
   <link rel="preload" href="critical.css" as="style">
   ```

3. **Image Optimization**
   - Implement responsive images
   - Use `<picture>` element
   - Lazy load images
   - Add blur-up placeholders

4. **Code Splitting**
   - Split JavaScript bundles
   - Dynamic imports
   - Route-based splitting

---

## 📚 Key Takeaways

- **Network panel** shows all requests and timing
- **Waterfall chart** reveals request dependencies
- **Throttling** helps test slow connections
- **Performance panel** shows detailed timeline
- **Main thread** should not be blocked
- **FCP and LCP** are critical metrics
- **Images** are often the biggest bottleneck
- **Fewer requests** = faster loading
- **Compression** dramatically reduces size
- **Defer/Async** prevents blocking

---

## 🔧 DevTools Features Used

- ✅ Network panel
- ✅ Network throttling
- ✅ Request blocking
- ✅ Performance recording
- ✅ FPS meter
- ✅ Screenshots timeline
- ✅ Main thread analysis
- ✅ Coverage tool
- ✅ Network waterfall
- ✅ Request timing breakdown

---

**Estimated Completion Time:** 60-75 minutes
**Next Exercise:** Exercise 4 - Memory Leak Detection

**Excellent work optimizing performance!** 🚀📊

