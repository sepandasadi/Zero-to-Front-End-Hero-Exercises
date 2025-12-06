// Register Service Worker

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('✅ Service Worker registered:', registration.scope);
        updateStatus('✅ Service Worker Active');

        // Listen for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          console.log('🔄 New Service Worker installing...');

          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('⬆️ New version available! Reload to update.');
              showUpdateNotification();
            }
          });
        });
      })
      .catch(error => {
        console.error('❌ Service Worker registration failed:', error);
        updateStatus('❌ Service Worker Failed');
      });

    // Check for cached files
    if ('caches' in window) {
      caches.keys().then(cacheNames => {
        console.log('📦 Caches:', cacheNames);
        updateCacheInfo(cacheNames.length);
      });
    }
  });
} else {
  console.log('❌ Service Workers not supported');
  updateStatus('❌ Not Supported');
}

// Update status display
function updateStatus(message) {
  const statusEl = document.getElementById('sw-status');
  if (statusEl) {
    statusEl.textContent = message;
  }
}

// Update cache info
function updateCacheInfo(count) {
  const cacheInfo = document.getElementById('cache-info');
  if (cacheInfo) {
    cacheInfo.textContent = `${count} cache(s) active`;
  }
}

// Show update notification
function showUpdateNotification() {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #667eea;
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    z-index: 9999;
  `;
  notification.innerHTML = `
    <strong>Update Available!</strong><br>
    <small>Reload to get the latest version</small>
  `;
  document.body.appendChild(notification);

  setTimeout(() => notification.remove(), 5000);
}

// Test offline button
document.getElementById('test-offline')?.addEventListener('click', () => {
  alert('To test offline:\n\n1. Open DevTools (F12)\n2. Network tab\n3. Check "Offline"\n4. Reload page\n\nIf page loads, your Service Worker works! 🎉');
});

// Clear cache button
document.getElementById('clear-cache')?.addEventListener('click', async () => {
  if ('caches' in window) {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map(name => caches.delete(name)));

    // Unregister Service Worker
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(registrations.map(reg => reg.unregister()));

    alert('✅ Cache cleared! Reload the page.');
    updateCacheInfo(0);
  }
});

// Initial status
updateStatus('⏳ Loading...');

// Log Service Worker events
navigator.serviceWorker?.addEventListener('message', (event) => {
  console.log('📨 Message from SW:', event.data);
});

// Detect online/offline
window.addEventListener('online', () => {
  console.log('✅ Back online!');
  updateStatus('✅ Service Worker Active (Online)');
});

window.addEventListener('offline', () => {
  console.log('📡 Offline mode');
  updateStatus('📡 Service Worker Active (Offline)');
});

