# Challenge: Offline-First E-Commerce PWA - Hints

Building a production PWA? Here are comprehensive hints!

## 🔍 Hint 1: Project Structure

<details>
<summary>Click to reveal</summary>

```
my-pwa/
├── index.html
├── manifest.json
├── sw.js
├── offline.html
├── styles/
│   └── main.css
├── scripts/
│   ├── app.js
│   ├── db.js (IndexedDB)
│   └── sync.js (Background Sync)
├── icons/
│   ├── icon-192.png
│   ├── icon-512.png
│   └── maskable-icon.png
└── pages/
    ├── products.html
    ├── cart.html
    └── checkout.html
```
</details>

---

## 🔍 Hint 2: IndexedDB for Offline Cart

<details>
<summary>Click to reveal</summary>

**Using Dexie.js (simpler than raw IndexedDB):**

```bash
npm install dexie
```

```javascript
import Dexie from 'dexie';

const db = new Dexie('EcommercePWA');

db.version(1).stores({
  products: 'id, name, price',
  cart: '++id, productId, quantity',
  orders: '++id, items, total, timestamp, synced'
});

// Add to cart
async function addToCart(product, quantity) {
  await db.cart.add({
    productId: product.id,
    quantity: quantity
  });
}

// Get cart
async function getCart() {
  return await db.cart.toArray();
}

// Save order offline
async function saveOrder(order) {
  await db.orders.add({
    ...order,
    timestamp: Date.now(),
    synced: false
  });
}
```
</details>

---

## 🔍 Hint 3: Background Sync

<details>
<summary>Click to reveal</summary>

**Register background sync when order submitted offline:**

```javascript
// app.js
async function submitOrder(order) {
  // Save to IndexedDB
  await db.orders.add({
    ...order,
    synced: false
  });

  // Register background sync
  if ('serviceWorker' in navigator && 'sync' in navigator.serviceWorker) {
    const registration = await navigator.serviceWorker.ready;
    await registration.sync.register('sync-orders');
  } else {
    // Fallback: sync immediately
    await syncOrders();
  }
}
```

**Service Worker handles sync:**

```javascript
// sw.js
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-orders') {
    event.waitUntil(syncOrders());
  }
});

async function syncOrders() {
  const db = await openDB();
  const unsynced = await db.orders.where('synced').equals(false).toArray();

  for (const order of unsynced) {
    try {
      await fetch('/api/orders', {
        method: 'POST',
        body: JSON.stringify(order)
      });

      // Mark as synced
      await db.orders.update(order.id, { synced: true });
    } catch (error) {
      console.error('Sync failed:', error);
      throw error; // Retry later
    }
  }
}
```
</details>

---

## 🔍 Hint 4: Advanced Service Worker Strategies

<details>
<summary>Click to reveal</summary>

```javascript
// sw.js
const CACHE_NAME = 'pwa-v1';
const API_CACHE = 'api-v1';
const IMG_CACHE = 'images-v1';

// Route-based strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // HTML: Stale-While-Revalidate
  if (request.mode === 'navigate') {
    event.respondWith(staleWhileRevalidate(request, CACHE_NAME));
    return;
  }

  // API: Network First with timeout
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirstWithTimeout(request, API_CACHE, 3000));
    return;
  }

  // Images: Cache First
  if (request.destination === 'image') {
    event.respondWith(cacheFirst(request, IMG_CACHE));
    return;
  }

  // Static assets: Cache First
  if (url.pathname.match(/\.(css|js|woff2)$/)) {
    event.respondWith(cacheFirst(request, CACHE_NAME));
    return;
  }

  // Default: Network only
  event.respondWith(fetch(request));
});

// Network First with timeout fallback
async function networkFirstWithTimeout(request, cacheName, timeout) {
  const cache = await caches.open(cacheName);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(request, { signal: controller.signal });
    clearTimeout(timeoutId);

    cache.put(request, response.clone());
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) return cached;

    throw error;
  }
}
```
</details>

---

## 🔍 Hint 5: Install Prompt with Analytics

<details>
<summary>Click to reveal</summary>

```javascript
let deferredPrompt;
let installShown = false;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  // Wait for user to scroll 50%
  window.addEventListener('scroll', () => {
    if (!installShown && window.scrollY > document.body.scrollHeight / 2) {
      showInstallPrompt();
      installShown = true;
    }
  }, { once: true });
});

async function showInstallPrompt() {
  const banner = document.getElementById('install-banner');
  banner.style.display = 'block';

  banner.querySelector('.install-yes').addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();

      const result = await deferredPrompt.userChoice;

      // Track analytics
      gtag('event', 'pwa_install', {
        outcome: result.outcome
      });

      if (result.outcome === 'accepted') {
        console.log('✅ User installed PWA');
      }

      deferredPrompt = null;
      banner.style.display = 'none';
    }
  });
}

// Detect if already installed
window.addEventListener('appinstalled', () => {
  console.log('✅ PWA installed!');
  gtag('event', 'pwa_installed');
});
```
</details>

---

## 🔍 Hint 6: Lighthouse PWA Checklist

<details>
<summary>Click to reveal</summary>

**Critical requirements:**

- [ ] **HTTPS** (required for PWA)
- [ ] **Web App Manifest** with:
  - `name`
  - `short_name`
  - `start_url`
  - `display: standalone`
  - `icons` (192x192, 512x512)
- [ ] **Service Worker** that:
  - Responds to fetch events
  - Has offline fallback
  - Caches start_url
- [ ] **Viewport meta tag**
- [ ] **Theme color**
- [ ] **Works offline**

**Test in DevTools:**
1. Application → Manifest (check all fields)
2. Application → Service Workers (active)
3. Lighthouse → Progressive Web App → Run audit
4. Goal: 90+ score
</details>

---

## 🔍 Hint 7: Edge Caching (Cloudflare/Vercel)

<details>
<summary>Click to reveal</summary>

**Cloudflare Pages (`_headers` file):**
```
/
  Cache-Control: public, max-age=0, must-revalidate

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/api/*
  Cache-Control: no-cache
```

**Vercel (`vercel.json`):**
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
    }
  ]
}
```
</details>

---

## 🐛 Common Issues

### Issue: Install prompt doesn't appear
**Checklist:**
- [ ] HTTPS (or localhost)
- [ ] Valid manifest linked
- [ ] Icons 192x192 and 512x512
- [ ] Service Worker registered
- [ ] `start_url` loads when offline
- [ ] Visited site at least twice
- [ ] Not already installed

### Issue: Lighthouse PWA score < 90
**Check:**
- Run audit in Incognito mode
- Clear all caches first
- Fix all errors (not warnings)
- Test offline mode

### Issue: Background Sync not working
**Note:**
- Only works in Chrome/Edge
- Requires HTTPS
- Test with DevTools → Application → Service Workers → "Sync"

---

## ✅ Testing Checklist

- [ ] Manifest loads (DevTools → Application → Manifest)
- [ ] Service Worker active
- [ ] Works 100% offline
- [ ] Install prompt appears
- [ ] Can install to home screen
- [ ] Opens in standalone mode
- [ ] Cart persists offline (IndexedDB)
- [ ] Orders sync when back online
- [ ] Lighthouse PWA: 100
- [ ] Lighthouse Performance: 90+
- [ ] All Core Web Vitals: Green

---

## 📚 Resources

- [PWA Builder](https://www.pwabuilder.com/)
- [Workbox](https://developers.google.com/web/tools/workbox)
- [Dexie.js](https://dexie.org/) (IndexedDB wrapper)
- [Background Sync API](https://web.dev/periodic-background-sync/)
- [PWA Checklist](https://web.dev/pwa-checklist/)

---

**This is a big challenge!** Take your time and build it step by step. 💪

