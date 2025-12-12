# Exercise 4: Prefetching & Priority Hints

**Difficulty:** Intermediate
**Time:** 1 hour
**Focus:** Performance optimization with prefetching and priority hints

## 🎯 Learning Objectives

- Implement prefetch on hover
- Use `fetchpriority` attribute
- Optimize resource loading order
- Measure performance improvements

## 📋 Requirements

### **1. Prefetch on Hover**
```javascript
link.addEventListener('mouseenter', () => {
  const prefetch = document.createElement('link');
  prefetch.rel = 'prefetch';
  prefetch.href = link.href;
  document.head.appendChild(prefetch);
});
```

### **2. Priority Hints**
```html
<!-- High priority: Hero image -->
<img src="hero.jpg" fetchpriority="high" alt="Hero">

<!-- Low priority: Below-fold images -->
<img src="footer.png" fetchpriority="low" loading="lazy" alt="Footer">

<!-- High priority: Critical script -->
<script src="app.js" fetchpriority="high"></script>

<!-- Low priority: Analytics -->
<script src="analytics.js" fetchpriority="low" async></script>
```

### **3. DNS Prefetch & Preconnect**
```html
<!-- DNS Prefetch: Resolve domain early -->
<link rel="dns-prefetch" href="https://fonts.googleapis.com">

<!-- Preconnect: Establish connection -->
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Preload: Critical resource -->
<link rel="preload" href="critical.css" as="style">
```

## ✅ Acceptance Criteria

- [ ] Hover prefetch implemented on navigation
- [ ] Priority hints on all images
- [ ] DNS prefetch for external resources
- [ ] Preload for critical CSS/fonts
- [ ] Measure with Lighthouse (before/after)
- [ ] LCP improved by 10%+

## 🎁 Bonus

- Predictive prefetching (ML-based)
- Prefetch based on scroll position
- Adaptive loading based on connection speed
- Intersection Observer for smarter prefetch


