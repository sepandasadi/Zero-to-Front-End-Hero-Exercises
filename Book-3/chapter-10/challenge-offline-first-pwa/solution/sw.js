// Service Worker for Offline-First E-Commerce PWA

const CACHE_VERSION = 'v1';
const CACHE_NAME = `shop-pwa-${CACHE_VERSION}`;
const API_CACHE = `shop-api-${CACHE_VERSION}`;
const IMG_CACHE = `shop-images-${CACHE_VERSION}`;

// Files to cache during install
const urlsToCache = [
  '/',
  '/index.html',
  '/cart.html',
  '/styles.css',
  '/app.js',
  '/cart.js',
  '/db.js',
  '/manifest.json'
];

// ==================== INSTALL ====================
self.addEventListener('install', (event) => {
  console.log('📦 Service Worker: Installing...');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Caching app shell');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('✅ Installation complete');
        return self.skipWaiting();
      })
  );
});

// ==================== ACTIVATE ====================
self.addEventListener('activate', (event) => {
  console.log('🔄 Service Worker: Activating...');

  const cacheWhitelist = [CACHE_NAME, API_CACHE, IMG_CACHE];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log('🗑️ Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('✅ Activation complete');
      return self.clients.claim();
    })
  );
});

// ==================== FETCH ====================
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // API requests: Network First
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(request, API_CACHE));
    return;
  }

  // Images: Cache First
  if (request.destination === 'image') {
    event.respondWith(cacheFirst(request, IMG_CACHE));
    return;
  }

  // HTML: Stale-While-Revalidate
  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(staleWhileRevalidate(request, CACHE_NAME));
    return;
  }

  // Static assets (CSS, JS): Cache First
  if (request.destination === 'style' ||
      request.destination === 'script') {
    event.respondWith(cacheFirst(request, CACHE_NAME));
    return;
  }

  // Default: Network First
  event.respondWith(networkFirst(request, CACHE_NAME));
});

// ==================== CACHING STRATEGIES ====================

// Cache First: For static assets and images
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  if (cached) {
    console.log('📡 Cache First: Serving from cache:', request.url);
    return cached;
  }

  try {
    const response = await fetch(request);

    if (response.ok) {
      cache.put(request, response.clone());
    }

    console.log('🌐 Cache First: Fetched and cached:', request.url);
    return response;
  } catch (error) {
    console.error('❌ Cache First: Fetch failed:', error);
    throw error;
  }
}

// Network First: For API requests
async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request);

    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
      console.log('🌐 Network First: Fresh from network:', request.url);
    }

    return response;
  } catch (error) {
    console.log('📡 Network First: Network failed, trying cache:', request.url);

    const cached = await caches.match(request);
    if (cached) {
      console.log('📡 Network First: Serving from cache:', request.url);
      return cached;
    }

    console.error('❌ Network First: No cache available:', error);
    throw error;
  }
}

// Stale-While-Revalidate: For HTML pages
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  // Fetch fresh version in background
  const fetchPromise = fetch(request).then((response) => {
    if (response.ok) {
      cache.put(request, response.clone());
      console.log('🔄 Stale-While-Revalidate: Updated cache:', request.url);
    }
    return response;
  }).catch((error) => {
    console.error('❌ Stale-While-Revalidate: Fetch failed:', error);
  });

  // Return cached version immediately or wait for fetch
  if (cached) {
    console.log('📡 Stale-While-Revalidate: Serving cached, updating in background:', request.url);
    return cached;
  }

  console.log('🌐 Stale-While-Revalidate: No cache, waiting for network:', request.url);
  return fetchPromise;
}

// ==================== BACKGROUND SYNC ====================
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-orders') {
    console.log('🔄 Background Sync: Syncing orders...');
    event.waitUntil(syncOrders());
  }
});

async function syncOrders() {
  try {
    // In production, this would fetch pending orders from IndexedDB
    // and sync them to the server

    console.log('✅ Orders synced successfully');

    // Notify all clients
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
      client.postMessage({
        type: 'SYNC_COMPLETE',
        message: 'Orders synced successfully'
      });
    });
  } catch (error) {
    console.error('❌ Sync failed:', error);
    throw error; // Will retry
  }
}

// ==================== PUSH NOTIFICATIONS (Optional) ====================
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Shop PWA';
  const options = {
    body: data.body || 'You have a new notification',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-72.png',
    data: data
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(
    clients.openWindow(event.notification.data.url || '/')
  );
});

// ==================== MESSAGE ====================
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log('✅ Service Worker script loaded');

