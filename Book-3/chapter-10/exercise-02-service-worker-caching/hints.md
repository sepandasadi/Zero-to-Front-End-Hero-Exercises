# Exercise 2: Service Worker Caching - Hints

Stuck on Service Workers? Here are some hints!

## 🔍 Hint 1: Registering Service Worker

<details>
<summary>Click to reveal</summary>

Register in your main JavaScript file:

```javascript
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('✅ SW registered:', registration.scope);
      })
      .catch(error => {
        console.error('❌ SW registration failed:', error);
      });
  });
}
```

**Important:** Service Worker file must be at root or same level!
</details>

---

## 🔍 Hint 2: Install Event - Caching Static Assets

<details>
<summary>Click to reveal</summary>

The `install` event fires when SW is first registered:

```javascript
const CACHE_NAME = 'my-app-v1';
const urlsToCache = [
  '/',
  '/styles.css',
  '/script.js',
  '/offline.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});
```

**Tip:** Use `event.waitUntil()` to keep SW alive while caching
</details>

---

## 🔍 Hint 3: Fetch Event - Cache First Strategy

<details>
<summary>Click to reveal</summary>

For static assets (CSS, JS, images):

```javascript
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});
```

**Flow:**
1. Request comes in
2. Check cache
3. If found → return cached version (instant!)
4. If not found → fetch from network
</details>

---

## 🔍 Hint 4: Network First Strategy (for API)

<details>
<summary>Click to reveal</summary>

For dynamic content that needs to be fresh:

```javascript
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Clone response (can only use once)
          const responseClone = response.clone();

          // Update cache
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });

          return response;
        })
        .catch(() => {
          // If network fails, try cache
          return caches.match(event.request);
        })
    );
  }
});
```

**Flow:**
1. Try network first
2. Cache the response
3. If network fails → fall back to cache
</details>

---

## 🔍 Hint 5: Stale-While-Revalidate

<details>
<summary>Click to reveal</summary>

Best of both worlds (instant + fresh):

```javascript
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((cached) => {
        // Fetch fresh version in background
        const fetchPromise = fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });

        // Return cached immediately, update in background
        return cached || fetchPromise;
      });
    })
  );
});
```

**Flow:**
1. Return cached version immediately (instant!)
2. Fetch fresh version in background
3. Update cache
4. Next visit gets fresh version
</details>

---

## 🔍 Hint 6: Activate Event - Clean Old Caches

<details>
<summary>Click to reveal</summary>

Clean up old caches when new SW activates:

```javascript
self.addEventListener('activate', (event) => {
  const cacheWhitelist = ['my-app-v2']; // Current version

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
```
</details>

---

## 🔍 Hint 7: Testing in Chrome DevTools

<details>
<summary>Click to reveal</summary>

**Application Tab → Service Workers:**
- See registered SW
- Unregister/Update
- Simulate offline

**Application Tab → Cache Storage:**
- View cached files
- Delete caches

**Network Tab:**
- See which requests come from SW (shows "Service Worker")

**Test offline:**
1. Check "Offline" checkbox
2. Reload page
3. Verify it works!
</details>

---

## 🐛 Common Issues

### Issue: SW not registering
**Solution:**
- Check file is named `sw.js`
- Check file is in root directory
- Open DevTools → Console for errors

### Issue: Changes not showing
**Solution:**
- SW caches aggressively!
- Update CACHE_NAME version (v1 → v2)
- Or: DevTools → Application → Service Workers → "Update on reload"

### Issue: Offline doesn't work
**Solution:**
- Make sure all files are in `urlsToCache`
- Check Network tab → requests should show "(from ServiceWorker)"

### Issue: HTTPS required error
**Solution:**
- SW requires HTTPS in production
- `localhost` works for development
- Use Netlify/Vercel for HTTPS deployment

---

## ✅ Testing Checklist

- [ ] SW registers successfully (check DevTools Console)
- [ ] Static assets cached (check Application → Cache Storage)
- [ ] Works offline (check Offline checkbox)
- [ ] Old caches deleted on version change
- [ ] Network requests show "(from ServiceWorker)"

---

## 📚 Resources

- [Service Worker API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Service Worker Lifecycle](https://web.dev/service-worker-lifecycle/)
- [Workbox - Google's SW Library](https://developers.google.com/web/tools/workbox)
- [Offline Cookbook](https://web.dev/offline-cookbook/)

---

**Still stuck?** Check the solution, but try debugging first! 💪

