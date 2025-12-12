// Service Worker - Cache Strategies
// TODO: Implement install, fetch, and activate events

// Cache name (change version to force update)
const CACHE_NAME = 'my-app-v1';

// Files to cache during install
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/offline.html'
];

// TODO: Install Event - Cache static assets
// self.addEventListener('install', (event) => {
//   console.log('📦 Service Worker: Installing...');
//   event.waitUntil(
//     caches.open(CACHE_NAME)
//       .then((cache) => {
//         console.log('📦 Caching static assets');
//         return cache.addAll(urlsToCache);
//       })
//   );
// });

// TODO: Fetch Event - Serve from cache or network
// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     caches.match(event.request)
//       .then((response) => {
//         // Return cached version or fetch from network
//         if (response) {
//           console.log('📡 Serving from cache:', event.request.url);
//           return response;
//         }
//         console.log('🌐 Fetching from network:', event.request.url);
//         return fetch(event.request);
//       })
//   );
// });

// TODO: Activate Event - Clean up old caches
// self.addEventListener('activate', (event) => {
//   console.log('🔄 Service Worker: Activating...');
//   const cacheWhitelist = [CACHE_NAME];
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cacheName) => {
//           if (!cacheWhitelist.includes(cacheName)) {
//             console.log('🗑️ Deleting old cache:', cacheName);
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });

console.log('👉 Service Worker file loaded. Uncomment the code above to implement!');

