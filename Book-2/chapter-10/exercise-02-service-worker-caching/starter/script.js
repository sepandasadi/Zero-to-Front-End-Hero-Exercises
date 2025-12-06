// TODO: Register Service Worker

// Step 1: Check if Service Workers are supported
// if ('serviceWorker' in navigator) {
//   // Step 2: Register the Service Worker
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/sw.js')
//       .then(registration => {
//         console.log('✅ Service Worker registered:', registration.scope);
//         updateStatus('✅ Service Worker Active');
//       })
//       .catch(error => {
//         console.error('❌ Service Worker registration failed:', error);
//         updateStatus('❌ Service Worker Failed');
//       });
//   });
// } else {
//   console.log('❌ Service Workers not supported');
//   updateStatus('❌ Not Supported');
// }

// Update status display
function updateStatus(message) {
  const statusEl = document.getElementById('sw-status');
  if (statusEl) {
    statusEl.textContent = message;
  }
}

// Test offline button
document.getElementById('test-offline')?.addEventListener('click', () => {
  alert('To test offline:\n\n1. Open DevTools (F12)\n2. Network tab\n3. Check "Offline"\n4. Reload page\n\nIf page loads, your Service Worker works! 🎉');
});

// Initial status
updateStatus('⏳ Service Worker not registered yet');

console.log('👉 Register the Service Worker in this file!');

