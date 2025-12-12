# Exercise 4: Prefetching & Priority Hints - Hints

## 🔍 Hint 1: Prefetch on Hover

<details>
<summary>Click to reveal</summary>

```javascript
// Select all links with data-prefetch attribute
const links = document.querySelectorAll('a[data-prefetch]');

links.forEach(link => {
  link.addEventListener('mouseenter', () => {
    // Create prefetch link
    const prefetchLink = document.createElement('link');
    prefetchLink.rel = 'prefetch';
    prefetchLink.href = link.href;

    // Add to document head
    document.head.appendChild(prefetchLink);

    console.log('Prefetched:', link.href);
  }, { once: true }); // Only prefetch once
});
```

**Why it works:**
- Average hover time: 300-500ms
- Page loads instantly when clicked!
</details>

---

## 🔍 Hint 2: Priority Hints

<details>
<summary>Click to reveal</summary>

```html
<!-- Hero image (LCP element) -->
<img
  src="hero.jpg"
  fetchpriority="high"
  alt="Hero"
>

<!-- Below-fold images -->
<img
  src="footer.jpg"
  fetchpriority="low"
  loading="lazy"
  alt="Footer"
>

<!-- Critical script -->
<script src="app.js" fetchpriority="high"></script>

<!-- Analytics (not critical) -->
<script src="analytics.js" fetchpriority="low" async></script>
```

**Rules:**
- `high`: LCP elements, critical resources
- `low`: Below-fold, non-critical
- `auto`: Let browser decide (default)
</details>

---

## 🔍 Hint 3: Resource Hints

<details>
<summary>Click to reveal</summary>

```html
<head>
  <!-- DNS Prefetch: Resolve DNS early -->
  <link rel="dns-prefetch" href="https://fonts.googleapis.com">
  <link rel="dns-prefetch" href="https://cdn.example.com">

  <!-- Preconnect: DNS + TCP + TLS -->
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

  <!-- Preload: Critical resource -->
  <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/critical.css" as="style">

  <!-- Prefetch: Likely next page -->
  <link rel="prefetch" href="/products.html">
</head>
```

**When to use:**
- `dns-prefetch`: External domains
- `preconnect`: External resources you'll definitely use
- `preload`: Critical resources in current page
- `prefetch`: Resources for next navigation
</details>

---

## 🔍 Hint 4: Measuring Impact

<details>
<summary>Click to reveal</summary>

```javascript
// Measure prefetch impact
const start = performance.now();

fetch('/page.html')
  .then(() => {
    const duration = performance.now() - start;
    console.log(`Load time: ${duration}ms`);
  });

// Or use Navigation Timing API
window.addEventListener('load', () => {
  const perfData = performance.getEntriesByType('navigation')[0];
  console.log('DOM Content Loaded:', perfData.domContentLoadedEventEnd);
  console.log('Load Complete:', perfData.loadEventEnd);
});
```

**Lighthouse:**
- Before: Baseline metrics
- After: Compare LCP, FCP
- Goal: 10-20% improvement
</details>

---

## 📚 Resources

- [Resource Hints - W3C](https://www.w3.org/TR/resource-hints/)
- [Priority Hints - web.dev](https://web.dev/priority-hints/)
- [Prefetching - MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Link_prefetching_FAQ)


