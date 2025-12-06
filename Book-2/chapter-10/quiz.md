# Chapter 10: Lazy Loading & Caching Deep Dive - Quiz

Test your understanding of advanced performance patterns!

**Instructions:**
- Answer all 15 questions
- Each question has one correct answer
- Explanations provided after each question
- Passing score: 13/15 (87%)

---

## Questions

### 1. What advantage does Intersection Observer have over native `loading="lazy"`?

**A)** It's faster
**B)** More control over when to load (custom thresholds, animations)
**C)** Better browser support
**D)** Smaller file size

<details>
<summary>Show Answer</summary>

**Correct Answer: B) More control over when to load (custom thresholds, animations)**

**Explanation:**
Intersection Observer provides more control:
- Custom threshold (e.g., load 200px before visible)
- Add animations when elements appear
- Load multiple resources, not just images
- Custom logic based on intersection ratio

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.add('fade-in'); // Custom animation
      observer.unobserve(img);
    }
  });
}, {
  rootMargin: '200px' // Load 200px before visible
});
```

Native `loading="lazy"` is simpler but less flexible.
</details>

---

### 2. What is the best caching strategy for static assets (CSS, JS, images)?

**A)** Network first
**B)** Cache first
**C)** Network only
**D)** Stale-while-revalidate

<details>
<summary>Show Answer</summary>

**Correct Answer: B) Cache first**

**Explanation:**
For static assets (especially versioned assets like `app.abc123.js`):
- **Cache first**: Check cache, serve immediately if found, otherwise fetch from network
- Result: **Instant** loading on repeat visits

```javascript
// Service Worker: Cache first
self.addEventListener('fetch', (event) => {
  if (event.request.url.match(/\.(js|css|png|jpg|webp)$/)) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        return cached || fetch(event.request);
      })
    );
  }
});
```

**Other strategies:**
- Network first: Better for dynamic content (API responses)
- Stale-while-revalidate: Good compromise for semi-static content
</details>

---

### 3. Which caching strategy serves cached content immediately while fetching fresh data in the background?

**A)** Cache first
**B)** Network first
**C)** Stale-while-revalidate
**D)** Cache only

<details>
<summary>Show Answer</summary>

**Correct Answer: C) Stale-while-revalidate**

**Explanation:**
Stale-while-revalidate provides the best of both worlds:
1. Serve cached version immediately (instant!)
2. Fetch fresh version in background
3. Next visit gets updated version

```javascript
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((cached) => {
        const fetchPromise = fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
        return cached || fetchPromise;
      });
    })
  );
});
```

**Use case:** Most real-world scenarios (speed + freshness)
</details>

---

### 4. What are the three minimum requirements for a Progressive Web App (PWA)?

**A)** HTTPS, Service Worker, Web App Manifest
**B)** HTTPS, React, Mobile-first
**C)** Service Worker, IndexedDB, Push Notifications
**D)** HTTPS, TypeScript, Testing

<details>
<summary>Show Answer</summary>

**Correct Answer: A) HTTPS, Service Worker, Web App Manifest**

**Explanation:**
PWA requirements:
1. **HTTPS**: Required for Service Workers (security)
2. **Service Worker**: Enables offline support and caching
3. **Web App Manifest**: Enables install prompt

```json
// manifest.json
{
  "name": "My PWA",
  "short_name": "MyPWA",
  "start_url": "/",
  "display": "standalone",
  "icons": [
    {"src": "/icon-192.png", "sizes": "192x192"},
    {"src": "/icon-512.png", "sizes": "512x512"}
  ]
}
```

**Additional best practices:**
- Responsive design
- Fast (Lighthouse 90+)
- Works offline
- Install prompt
</details>

---

### 5. What is the primary advantage of HTTP/2 multiplexing over HTTP/1.1?

**A)** Better compression
**B)** Multiple requests over single connection (no waiting)
**C)** Encrypted by default
**D)** Smaller headers

<details>
<summary>Show Answer</summary>

**Correct Answer: B) Multiple requests over single connection (no waiting)**

**Explanation:**
HTTP/2 multiplexing allows multiple requests/responses simultaneously over one connection:

**HTTP/1.1:**
```
Request 1 → Response 1 (wait)
  Request 2 → Response 2 (wait)
    Request 3 → Response 3
```

**HTTP/2:**
```
Request 1 ┐
Request 2 ├→ All sent simultaneously
Request 3 ┘
  ↓
Response 1, 2, 3 (all arrive together)
```

**Result:** No head-of-line blocking, faster page loads

**Other HTTP/2 benefits:**
- Header compression (HPACK)
- Server push
- Stream prioritization
</details>

---

### 6. What is prefetching on hover?

**A)** Loading images when user hovers over them
**B)** Loading next page in background when user hovers over a link
**C)** Preloading CSS on hover
**D)** Caching on mouse movement

<details>
<summary>Show Answer</summary>

**Correct Answer: B) Loading next page in background when user hovers over a link**

**Explanation:**
Prefetch on hover loads the next page before user clicks:

```javascript
document.querySelectorAll('a[data-prefetch]').forEach(link => {
  link.addEventListener('mouseenter', () => {
    const prefetch = document.createElement('link');
    prefetch.rel = 'prefetch';
    prefetch.href = link.href;
    document.head.appendChild(prefetch);
  });
});
```

**How it works:**
1. User hovers over link (300-500ms before click)
2. Browser prefetches page in background
3. User clicks → page loads instantly (already cached)

**Result:** Feels instant!
</details>

---

### 7. What does `fetchpriority="high"` do?

**A)** Makes the request faster
**B)** Tells browser this resource is important (load first)
**C)** Caches the resource
**D)** Compresses the resource

<details>
<summary>Show Answer</summary>

**Correct Answer: B) Tells browser this resource is important (load first)**

**Explanation:**
Priority hints help the browser prioritize resource loading:

```html
<!-- High priority: LCP image -->
<img src="hero.jpg" fetchpriority="high" alt="Hero">

<!-- Low priority: Below-fold images -->
<img src="footer.png" fetchpriority="low" loading="lazy" alt="Footer">

<!-- High priority: Critical script -->
<script src="app.js" fetchpriority="high"></script>

<!-- Low priority: Analytics -->
<script src="analytics.js" fetchpriority="low" async></script>
```

**Impact:** Can improve LCP by 10-20% by prioritizing hero images

**Values:**
- `high`: Load first
- `low`: Load last
- `auto`: Let browser decide (default)
</details>

---

### 8. What is Background Sync in Service Workers?

**A)** Syncing files in background
**B)** Retrying failed requests when connection returns
**C)** Syncing with other tabs
**D)** Background downloads

<details>
<summary>Show Answer</summary>

**Correct Answer: B) Retrying failed requests when connection returns**

**Explanation:**
Background Sync retries failed requests when the user comes back online:

```javascript
// Register sync when offline
navigator.serviceWorker.ready.then((swRegistration) => {
  return swRegistration.sync.register('sync-messages');
});

// Service Worker handles sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-messages') {
    event.waitUntil(sendPendingMessages());
  }
});
```

**Use case:**
1. User submits form offline
2. Store data locally (IndexedDB)
3. Register background sync
4. When online → sync automatically

**Result:** No lost data, better UX
</details>

---

### 9. What is the main difference between HTTP/2 and HTTP/3?

**A)** HTTP/3 uses UDP (QUIC) instead of TCP
**B)** HTTP/3 is encrypted, HTTP/2 is not
**C)** HTTP/3 is faster for static content
**D)** HTTP/3 has better compression

<details>
<summary>Show Answer</summary>

**Correct Answer: A) HTTP/3 uses UDP (QUIC) instead of TCP**

**Explanation:**
HTTP/3 is built on QUIC protocol (UDP) instead of TCP:

**Key advantages:**
- **0-RTT connection**: No TCP handshake (faster initial load)
- **Better mobile**: Handles network switching (Wi-Fi ↔ cellular)
- **No head-of-line blocking**: Lost packets don't block other streams

**Comparison:**
| Feature | HTTP/2 | HTTP/3 |
|---------|--------|--------|
| Protocol | TCP | QUIC (UDP) |
| Handshake | TLS + TCP | 0-RTT |
| Head-of-line blocking | Partial | None |
| Mobile switching | Poor | Excellent |

**Adoption:** Google, Facebook, Cloudflare use HTTP/3
</details>

---

### 10. What is edge caching?

**A)** Caching at browser edge
**B)** Caching at servers distributed globally (close to users)
**C)** Caching on hard drive edge
**D)** Caching network edges

<details>
<summary>Show Answer</summary>

**Correct Answer: B) Caching at servers distributed globally (close to users)**

**Explanation:**
Edge caching stores content on servers worldwide (close to users):

**Traditional:**
```
User (Tokyo) → [12,000 km] → Server (US)
Latency: 200ms
```

**Edge caching:**
```
User (Tokyo) → [50 km] → Edge (Tokyo)
Latency: 10ms
```

**20x faster!**

**Providers:**
- Cloudflare (300+ cities)
- Vercel Edge Network
- AWS CloudFront
- Fastly

**Use cases:**
- Static assets (instant delivery worldwide)
- API responses (cache at edge)
- Dynamic content (edge functions)
</details>

---

### 11. What is Workbox?

**A)** A React component library
**B)** A Google library for managing Service Workers
**C)** A build tool
**D)** A testing framework

<details>
<summary>Show Answer</summary>

**Correct Answer: B) A Google library for managing Service Workers**

**Explanation:**
Workbox simplifies Service Worker development:

```javascript
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

// Cache static assets (cache-first)
workbox.routing.registerRoute(
  ({request}) => request.destination === 'style' ||
                 request.destination === 'script',
  new workbox.strategies.CacheFirst()
);

// API requests (network-first)
workbox.routing.registerRoute(
  ({url}) => url.pathname.startsWith('/api/'),
  new workbox.strategies.NetworkFirst()
);

// HTML (stale-while-revalidate)
workbox.routing.registerRoute(
  ({request}) => request.mode === 'navigate',
  new workbox.strategies.StaleWhileRevalidate()
);
```

**Features:**
- Pre-built caching strategies
- Cache expiration
- Background sync
- Precaching
- Easier than vanilla Service Workers
</details>

---

### 12. What Service Worker lifecycle event is best for caching static assets?

**A)** fetch
**B)** install
**C)** activate
**D)** message

<details>
<summary>Show Answer</summary>

**Correct Answer: B) install**

**Explanation:**
The `install` event is when the Service Worker is first installed:

```javascript
const CACHE_NAME = 'my-app-v1';
const urlsToCache = [
  '/',
  '/styles.css',
  '/app.js',
  '/logo.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});
```

**Lifecycle:**
1. **install**: Cache static assets (first time only)
2. **activate**: Clean up old caches
3. **fetch**: Intercept network requests

**Why install?**
- Runs once when SW is first registered
- Ensures critical assets are cached before SW takes control
- User gets offline support immediately
</details>

---

### 13. What is the purpose of `rootMargin` in Intersection Observer?

**A)** Set margin around root element
**B)** Load elements before they enter viewport (preload buffer)
**C)** Set CSS margin
**D)** Define root element

<details>
<summary>Show Answer</summary>

**Correct Answer: B) Load elements before they enter viewport (preload buffer)**

**Explanation:**
`rootMargin` creates a buffer zone to load elements early:

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadImage(entry.target);
    }
  });
}, {
  rootMargin: '200px' // Load 200px before visible
});
```

**How it works:**
```
┌─────────────────────┐
│   rootMargin: 200px │ ← Load here
├─────────────────────┤
│                     │
│   Viewport (visible)│
│                     │
├─────────────────────┤
│   rootMargin: 200px │ ← Load here
└─────────────────────┘
```

**Result:** Images load before user scrolls to them (smoother UX)
</details>

---

### 14. What is HTTP/2 Server Push?

**A)** Server sends notifications to client
**B)** Server sends resources before client requests them
**C)** Server pushes updates via WebSockets
**D)** Server uploads files automatically

<details>
<summary>Show Answer</summary>

**Correct Answer: B) Server sends resources before client requests them**

**Explanation:**
Server Push allows the server to send resources proactively:

```nginx
# nginx configuration
location / {
  http2_push /styles.css;
  http2_push /app.js;
}
```

**How it works:**
1. Client requests `index.html`
2. Server responds with HTML
3. Server also pushes CSS and JS (before browser requests)
4. Browser receives everything faster

**Use case:**
- Push critical CSS/JS that's always needed
- Eliminate round trips for critical resources

**Warning:** Don't over-push (waste bandwidth if already cached)
</details>

---

### 15. What is the main benefit of installing a PWA versus using it in browser?

**A)** Better performance
**B)** Native-like experience (home screen icon, fullscreen, offline)
**C)** Smaller file size
**D)** Better security

<details>
<summary>Show Answer</summary>

**Correct Answer: B) Native-like experience (home screen icon, fullscreen, offline)**

**Explanation:**
Installing a PWA provides native-like benefits:

**Installed PWA:**
- Home screen icon (easy access)
- Fullscreen mode (no browser chrome)
- Standalone window
- Offline support
- Push notifications
- Feels like native app

**Web App Manifest enables install:**
```json
{
  "name": "My App",
  "short_name": "MyApp",
  "start_url": "/",
  "display": "standalone", // Fullscreen
  "icons": [
    {"src": "/icon-192.png", "sizes": "192x192"},
    {"src": "/icon-512.png", "sizes": "512x512"}
  ]
}
```

**Stats:**
- 40% increase in engagement after install (Pinterest)
- 60% increase in conversions (AliExpress)
</details>

---

## Scoring

- **15/15 (100%)**: Advanced Performance Expert! 🏆
- **13-14/15 (87-93%)**: Excellent! You understand advanced patterns. ⭐
- **11-12/15 (73-80%)**: Good! Review Service Workers and caching strategies.
- **9-10/15 (60-67%)**: Passing, but review PWA requirements and HTTP/2.
- **< 9/15 (< 60%)**: Review the chapter and try again.

---

## Key Takeaways

If you remember nothing else, remember:

1. **Intersection Observer > native lazy loading** (more control)
2. **Stale-while-revalidate** = best caching strategy for most cases
3. **PWA = HTTPS + Service Worker + Manifest** (instant + offline)
4. **HTTP/2 multiplexing** = parallel requests, no waiting
5. **Edge caching** = 10-20x faster delivery worldwide

**Make your apps feel instant!** ⚡

