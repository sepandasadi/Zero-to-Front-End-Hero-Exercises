// TODO: Implement Service Worker for PWA

// Step 1: Define cache name and files to cache
// const CACHE_NAME = 'todo-pwa-v1';
// const urlsToCache = [
//   '/',
//   '/index.html',
//   '/styles.css',
//   '/app.js',
//   '/manifest.json'
// ];

// Step 2: Install event - cache files
// self.addEventListener('install', (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME)
//       .then((cache) => {
//         console.log('Opened cache');
//         return cache.addAll(urlsToCache);
//       })
//   );
// });

// Step 3: Fetch event - serve from cache
// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     caches.match(event.request)
//       .then((response) => {
//         return response || fetch(event.request);
//       })
//   );
// });

// Step 4: Activate event - clean old caches
// self.addEventListener('activate', (event) => {
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames
//           .filter(name => name !== CACHE_NAME)
//           .map(name => caches.delete(name))
//       );
//     })
//   );
// });

console.log('Service Worker file loaded - uncomment code to implement!');

