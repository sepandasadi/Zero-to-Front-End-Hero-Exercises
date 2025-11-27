# Part III – Section 4: Performance & Best Practices  
## Chapter 10 — Lazy Loading & Caching (Deep Dive)  
### Exercise and Solutions

**Exercise: Lazy-Hydrated Island + Caching**  
Build a page with an above‑the‑fold shell and a below‑the‑fold **analytics island** that hydrates only when visible or on button click. Add:
- Preloaded non‑critical CSS applied after load  
- Hero image prioritized (preload or `fetchpriority="high"`)  
- Service Worker runtime cache for same‑origin GET requests  
- Server cache headers with immutable, hashed assets

**Included Solutions**  
- `lazy-cache/index.html` – shell + preloads + island placeholder  
- `lazy-cache/theme-caa1.css` – non‑critical theme CSS  
- `lazy-cache/entry-9af2.js` – visibility/intent‑based hydration + SW registration  
- `lazy-cache/analytics-chunk-22bb.js` – lazy chunk for analytics island  
- `lazy-cache/sw.js` – cautious runtime cache implementation  
- `lazy-cache/server-cache.js` – sample cache headers for hashed assets
