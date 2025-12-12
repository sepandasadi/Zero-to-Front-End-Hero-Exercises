# Exercise 5: Caching Strategy - Hints 💡

**Try the exercise yourself first before reading these hints!**

---

## Hint 1: Content Hashing

**Webpack/Vite automatically adds hashes:**

```javascript
// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].[hash].js`,
        chunkFileNames: `assets/[name].[hash].js`,
        assetFileNames: `assets/[name].[hash].[ext]`
      }
    }
  }
};
```

**Output:**
```
app.abc123.js
styles.def456.css
logo.ghi789.png
```

**Why:** Each file gets unique hash based on content. Change file = new hash = cache busted!

---

## Hint 2: Cache Headers for Vercel

**vercel.json:**

```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    }
  ]
}
```

**Explanation:**
- Static assets (hashed): 1 year cache
- HTML: No cache (always fresh)

---

## Hint 3: Cache Headers for Netlify

**_headers file:**

```
# Cache static assets for 1 year
/assets/*
  Cache-Control: public, max-age=31536000, immutable

# Cache images for 1 year
/*.jpg
  Cache-Control: public, max-age=31536000, immutable
/*.png
  Cache-Control: public, max-age=31536000, immutable
/*.webp
  Cache-Control: public, max-age=31536000, immutable

# Don't cache HTML
/*.html
  Cache-Control: public, max-age=0, must-revalidate
```

---

## Hint 4: Service Worker Caching

**Basic Service Worker:**

```javascript
// sw.js
const CACHE_NAME = 'v1';
const urlsToCache = [
  '/',
  '/styles.css',
  '/app.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
```

**Register:**
```javascript
// main.js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
```

---

## Hint 5: Stale-While-Revalidate

**Best for: API responses**

```javascript
// sw.js
self.addEventListener('fetch', event => {
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      caches.open('api-cache').then(cache => {
        return cache.match(event.request).then(cachedResponse => {
          const fetchPromise = fetch(event.request).then(networkResponse => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
          return cachedResponse || fetchPromise;
        });
      })
    );
  }
});
```

**Result:** Instant response from cache + update in background!

---

## Hint 6: Testing Cache Headers

**Check in DevTools:**

1. Network tab
2. Click a resource
3. Headers tab
4. Look for `Cache-Control`

**Should see:**
```
Cache-Control: public, max-age=31536000, immutable
```

**Or use curl:**
```bash
curl -I https://yoursite.com/assets/app.abc123.js

# Look for:
# Cache-Control: public, max-age=31536000, immutable
```

---

## Hint 7: Measuring Cache Hit Rate

**Before and after comparison:**

**First visit (cold cache):**
```
Total size: 1.2 MB
Time: 3.2s
```

**Repeat visit (warm cache):**
```
Total size: 245 bytes (from disk cache)
Time: 0.3s

10x faster!
```

**Check in Network tab:**
- Blue icons = cached
- Size shows "(from disk cache)"

---

## Hint 8: Cache Versioning

**When deploying new version:**

```javascript
// sw.js
const CACHE_VERSION = 'v2'; // Increment on deploy

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_VERSION)
          .map(name => caches.delete(name))
      );
    })
  );
});
```

**Clears old caches automatically!**

---

## Hint 9: CDN Setup

**Vercel/Netlify:** Automatic CDN, no setup needed!

**Cloudflare Pages:**
1. Connect repo
2. Deploy
3. Automatic CDN + caching

**Benefits:**
- Files served from nearest location
- Reduced latency
- Better performance globally

---

## Hint 10: Cache Strategy Matrix

**Different strategies for different resources:**

| Resource | Strategy | Duration |
|----------|----------|----------|
| HTML | No cache | 0 |
| CSS (hashed) | Immutable | 1 year |
| JS (hashed) | Immutable | 1 year |
| Images (hashed) | Immutable | 1 year |
| API responses | Stale-while-revalidate | 5 min |
| User data | Network-first | 0 |

---

**You've got this! Cache all the things!** 🚀

