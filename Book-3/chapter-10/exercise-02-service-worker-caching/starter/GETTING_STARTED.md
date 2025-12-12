# Getting Started - Service Worker Caching

## 📦 Setup

Service Workers require a server (can't use `file://` protocol).

### **Option 1: VS Code Live Server (Recommended)**
1. Install "Live Server" extension in VS Code
2. Right-click `index.html` → "Open with Live Server"
3. Automatically opens at `http://127.0.0.1:5500`

### **Option 2: Python Server**
```bash
python3 -m http.server 8000
# Visit http://localhost:8000
```

### **Option 3: Node.js http-server**
```bash
npx http-server -p 8000
# Visit http://localhost:8000
```

---

## 🎯 Your Task

Implement Service Worker with multiple caching strategies.

### **Phase 1: Register Service Worker**

In `script.js`:
```javascript
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log('✅ SW registered'))
    .catch(err => console.error('❌ SW failed:', err));
}
```

### **Phase 2: Install Event (Cache Static Assets)**

In `sw.js`:
```javascript
const CACHE_NAME = 'my-app-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/offline.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});
```

### **Phase 3: Fetch Event (Serve from Cache)**

Implement three strategies:

**1. Cache First** (static assets):
```javascript
// CSS, JS, images → cache first
if (request.url.match(/\.(css|js|png|jpg)$/)) {
  return caches.match(request) || fetch(request);
}
```

**2. Network First** (API):
```javascript
// API → network first, fallback to cache
if (request.url.includes('/api/')) {
  return fetch(request)
    .then(response => {
      cache.put(request, response.clone());
      return response;
    })
    .catch(() => caches.match(request));
}
```

**3. Stale-While-Revalidate** (HTML):
```javascript
// HTML → serve cached, update in background
const cached = await caches.match(request);
const fetchPromise = fetch(request).then(response => {
  cache.put(request, response.clone());
  return response;
});
return cached || fetchPromise;
```

### **Phase 4: Activate Event (Clean Old Caches)**

```javascript
self.addEventListener('activate', (event) => {
  const cacheWhitelist = ['my-app-v1'];
  event.waitUntil(
    caches.keys().then(names =>
      Promise.all(
        names.map(name => {
          if (!cacheWhitelist.includes(name)) {
            return caches.delete(name);
          }
        })
      )
    )
  );
});
```

---

## ✅ Success Criteria

- [ ] Service Worker registers successfully
- [ ] Static assets cached during install
- [ ] Works offline (test with DevTools "Offline" checkbox)
- [ ] Network tab shows "(from ServiceWorker)"
- [ ] Old caches cleaned up on version change

---

## 🧪 Testing

### **1. Test Registration**
1. Open DevTools (F12)
2. Console → Should see "✅ SW registered"
3. Application tab → Service Workers → Should see your SW

### **2. Test Caching**
1. Application tab → Cache Storage
2. Expand cache → See cached files

### **3. Test Offline**
1. Network tab → Check "Offline"
2. Reload page
3. Page should still load!
4. Console → See "📡 Serving from cache"

### **4. Test Cache Strategies**
1. Network tab
2. Reload page
3. Look for "(from ServiceWorker)" next to requests

---

## 🎁 Bonus Challenges

1. **Use Workbox:** Simplify SW code with Google's library
2. **Cache expiration:** Delete old caches after 7 days
3. **Background sync:** Retry failed requests when back online
4. **Update notification:** Alert user when new version available

---

## 🐛 Common Issues

**Issue:** SW not registering
- Check file is named `sw.js` (exact name)
- Make sure it's in same directory as `index.html`

**Issue:** Changes not showing
- Update CACHE_NAME to force new version: `v1` → `v2`
- Or: DevTools → Update on reload

**Issue:** Offline doesn't work
- Check all files are in `urlsToCache`
- Verify cache strategy is correct

---

## 📚 Files Provided

- `index.html` - Simple blog page
- `styles.css` - Basic styling
- `script.js` - Registration code (you complete it)
- `sw.js` - Service Worker (you complete it)
- `offline.html` - Offline fallback page

---

**Need help?** Check `../hints.md` or `../solution/`

**Estimated time:** 2 hours

Good luck! 🚀

