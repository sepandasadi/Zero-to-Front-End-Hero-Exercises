// Service Worker for offline caching (BONUS)

const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `app-cache-${CACHE_VERSION}`;

// Resources to cache on install
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/index.js',
  '/assets/style.css'
];

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Caching app shell');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Handle API requests with stale-while-revalidate
  if (event.request.url.includes('/api/')) {
    event.respondWith(staleWhileRevalidate(event.request));
    return;
  }

  // Handle other requests with cache-first
  event.respondWith(cacheFirst(event.request));
});

// Cache-first strategy
async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  if (cached) {
    return cached;
  }

  const response = await fetch(request);

  // Cache successful responses
  if (response.ok) {
    cache.put(request, response.clone());
  }

  return response;
}

// Stale-while-revalidate strategy
async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  // Fetch from network in background
  const fetchPromise = fetch(request).then(response => {
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  });

  // Return cached response immediately, or wait for network
  return cached || fetchPromise;
}

