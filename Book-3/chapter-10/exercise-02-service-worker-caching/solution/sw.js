// Service Worker - Multiple Caching Strategies

const CACHE_NAME = 'tech-blog-v1';
const API_CACHE = 'tech-blog-api-v1';

// Files to cache during install
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/offline.html'
];

// Install Event - Cache static assets
self.addEventListener('install', (event) => {
  console.log('📦 Service Worker: Installing...');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Caching static assets');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('✅ Installation complete');
        // Force the waiting service worker to become the active service worker
        return self.skipWaiting();
      })
  );
});

// Activate Event - Clean up old caches
self.addEventListener('activate', (event) => {
  console.log('🔄 Service Worker: Activating...');

  const cacheWhitelist = [CACHE_NAME, API_CACHE];

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
      // Take control of all pages immediately
      return self.clients.claim();
    })
  );
});

// Fetch Event - Multiple strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Strategy 1: Cache First (for static assets)
  if (request.destination === 'style' ||
      request.destination === 'script' ||
      request.destination === 'image') {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Strategy 2: Network First (for API requests)
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Strategy 3: Stale-While-Revalidate (for HTML pages)
  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  // Default: Network only
  event.respondWith(fetch(request));
});

// Strategy 1: Cache First
async function cacheFirst(request) {
  const cached = await caches.match(request);

  if (cached) {
    console.log('📡 Cache First: Serving from cache:', request.url);
    return cached;
  }

  try {
    const response = await fetch(request);

    // Cache the new response
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, response.clone());

    console.log('🌐 Cache First: Fetched and cached:', request.url);
    return response;
  } catch (error) {
    console.error('❌ Cache First: Failed to fetch:', request.url);
    throw error;
  }
}

// Strategy 2: Network First
async function networkFirst(request) {
  try {
    const response = await fetch(request);

    // Update cache with fresh response
    const cache = await caches.open(API_CACHE);
    cache.put(request, response.clone());

    console.log('🌐 Network First: Fresh data from network:', request.url);
    return response;
  } catch (error) {
    console.log('📡 Network First: Network failed, trying cache:', request.url);

    const cached = await caches.match(request);
    if (cached) {
      console.log('📡 Network First: Serving from cache:', request.url);
      return cached;
    }

    console.error('❌ Network First: No cache available:', request.url);
    throw error;
  }
}

// Strategy 3: Stale-While-Revalidate
async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  // Fetch fresh version in background
  const fetchPromise = fetch(request).then((response) => {
    cache.put(request, response.clone());
    console.log('🔄 Stale-While-Revalidate: Updated cache in background:', request.url);
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

// Listen for messages from clients
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log('✅ Service Worker script loaded');

