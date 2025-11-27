# Part III – Section 4: Performance & Best Practices  
## Chapter 9 — Page Speed and Optimization  
### Exercise and Solutions

**Exercise: Build a Performance‑Optimized Landing Page**  
Implement:
- Responsive images (`<picture>`, AVIF/WebP, `srcset`/`sizes`)  
- Lazy‑loaded feature chunk (dynamic `import()`)  
- Immutable caching with hashed filenames  
- Critical CSS inline; non‑critical CSS preloaded  
- Lighthouse audit notes (list your before/after metrics)

**Included Solutions**  
- `perf/index.html` – critical CSS inline, responsive hero image, preload + deferred assets  
- `perf/theme-hash123.css` – non‑critical theme styles  
- `perf/main-hash456.js` – entry module; lazy imports the feature chunk  
- `perf/feature-chunk-hash789.js` – code‑split feature loaded on demand  
- `perf/server-cache-example.js` – sample cache headers for hashed assets
