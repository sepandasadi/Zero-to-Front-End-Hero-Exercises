# Exercise 2: Service Worker Caching - Solution

## 📋 Implementation Summary

This solution demonstrates:
- ✅ Service Worker registration
- ✅ Three caching strategies (Cache First, Network First, Stale-While-Revalidate)
- ✅ Offline support
- ✅ Cache versioning and cleanup
- ✅ Update notifications

---

## 🔑 Key Concepts

### **1. Service Worker Lifecycle**

```javascript
// 1. Install - Cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// 2. Activate - Clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(cleanupOldCaches());
});

// 3. Fetch - Intercept requests
self.addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request));
});
```

---

### **2. Caching Strategies**

#### **Cache First** (Static Assets)
**Use for:** CSS, JS, images, fonts

```javascript
async function cacheFirst(request) {
  const cached = await caches.match(request);
  return cached || fetch(request);
}
```

**Pros:**
- ⚡ Instant loading (from cache)
- Works offline
- Reduces server load

**Cons:**
- Might serve stale content
- Requires cache versioning for updates

---

#### **Network First** (API/Dynamic Content)
**Use for:** API requests, user data, real-time content

```javascript
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    cache.put(request, response.clone());
    return response;
  } catch {
    return caches.match(request);
  }
}
```

**Pros:**
- Always try for fresh data
- Falls back to cache when offline
- Best for dynamic content

**Cons:**
- Slower (network request)
- No offline-first

---

#### **Stale-While-Revalidate** (Best of Both)
**Use for:** HTML pages, semi-static content

```javascript
async function staleWhileRevalidate(request) {
  const cached = await cache.match(request);

  // Update cache in background
  const fetchPromise = fetch(request).then(response => {
    cache.put(request, response.clone());
    return response;
  });

  return cached || fetchPromise;
}
```

**Pros:**
- ⚡ Instant loading (cached)
- 🔄 Fresh data next visit
- Best UX for most scenarios

**Cons:**
- First visit shows stale data
- Uses background bandwidth

---

## 📊 Comparison

| Strategy | Speed | Freshness | Offline | Best For |
|----------|-------|-----------|---------|----------|
| Cache First | ⚡⚡⚡ | ❌ | ✅ | Static assets |
| Network First | ⚡ | ✅✅✅ | ⚡ | APIs, user data |
| Stale-While-Revalidate | ⚡⚡⚡ | ✅✅ | ✅ | HTML, most content |

---

## 🎯 When to Use Each Strategy

### **Cache First:**
```javascript
// Versioned assets (never change)
/app.v123.js
/styles.abc456.css
/logo.png
```

### **Network First:**
```javascript
// Dynamic data (always fresh)
/api/user
/api/posts
/api/comments
```

### **Stale-While-Revalidate:**
```javascript
// Semi-static (balance speed + freshness)
/index.html
/about.html
/blog-post.html
```

---

## 🛠️ Advanced Features

### **1. Cache Versioning**

```javascript
const CACHE_NAME = 'my-app-v2'; // Increment version

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(names =>
      Promise.all(
        names
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    )
  );
});
```

**Why?** Force users to get updated assets

---

### **2. Update Notifications**

```javascript
registration.addEventListener('updatefound', () => {
  const newWorker = registration.installing;

  newWorker.addEventListener('statechange', () => {
    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
      showUpdateNotification();
    }
  });
});
```

---

### **3. Skip Waiting**

```javascript
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Activate immediately
});

self.addEventListener('activate', (event) => {
  self.clients.claim(); // Take control of all pages
});
```

---

## 🧪 Testing

### **1. Test Registration**
```javascript
navigator.serviceWorker.register('/sw.js')
  .then(reg => console.log('✅ Registered:', reg.scope))
  .catch(err => console.error('❌ Failed:', err));
```

**DevTools → Application → Service Workers:** See status

---

### **2. Test Offline**
1. DevTools → Network tab
2. Check "Offline"
3. Reload page
4. **Verify:** Page loads from cache

---

### **3. Test Caching**
1. DevTools → Network tab
2. Reload page
3. Look for **(from ServiceWorker)** next to requests

---

### **4. View Cached Files**
DevTools → Application → Cache Storage → Expand cache → See files

---

## 🐛 Troubleshooting

### **Problem:** Changes not showing

**Solution:**
1. Increment `CACHE_NAME` version
2. Or: DevTools → "Update on reload"
3. Or: Unregister SW, reload twice

---

### **Problem:** SW not registering

**Checklist:**
- [ ] File named exactly `sw.js`
- [ ] File in root directory
- [ ] Using local server (not `file://`)
- [ ] Check DevTools Console for errors

---

### **Problem:** Works in DevTools but not real offline

**Verify:**
- [ ] All files in `urlsToCache`
- [ ] Cache First strategy for static assets
- [ ] Offline fallback page exists

---

## 📚 Next Steps

1. **Exercise 3:** Full PWA (manifest + install)
2. **Bonus:** Use Workbox library (simpler API)
3. **Advanced:** Background Sync, Push Notifications

---

## 🎓 Learning Outcomes

After this exercise, you should understand:

✅ Service Worker lifecycle (install, activate, fetch)
✅ When to use each caching strategy
✅ How to test offline functionality
✅ Cache versioning and cleanup
✅ Update notifications

---

## 📖 Resources

- [Service Worker API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Offline Cookbook - Google](https://web.dev/offline-cookbook/)
- [Workbox - Service Worker Library](https://developers.google.com/web/tools/workbox)
- [Service Worker Lifecycle - web.dev](https://web.dev/service-worker-lifecycle/)

---

**Offline support achieved!** ⚡ Ready for Exercise 3? 🚀

