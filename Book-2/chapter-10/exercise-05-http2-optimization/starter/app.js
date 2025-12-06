// HTTP/2 Demonstration

console.log('📊 Checking HTTP protocol...');

// Detect HTTP/2
window.addEventListener('load', () => {
  // Check protocol in Performance API
  const perfData = performance.getEntriesByType('navigation')[0];

  if (perfData) {
    console.log('Protocol:', perfData.nextHopProtocol);

    // Display protocol to user
    const protocol = perfData.nextHopProtocol;
    const protocolBadge = document.createElement('div');
    protocolBadge.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${protocol.includes('h2') || protocol.includes('h3') ? '#4caf50' : '#ff6b6b'};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      font-weight: bold;
      z-index: 9999;
    `;
    protocolBadge.textContent = protocol.includes('h2')
      ? '✅ HTTP/2 Enabled!'
      : protocol.includes('h3')
      ? '🚀 HTTP/3 Enabled!'
      : '❌ HTTP/1.1 (Deploy to enable HTTP/2)';

    document.body.appendChild(protocolBadge);
  }

  // Log performance metrics
  console.log('📈 Performance Metrics:');
  console.log('DOM Content Loaded:', perfData?.domContentLoadedEventEnd.toFixed(2), 'ms');
  console.log('Load Complete:', perfData?.loadEventEnd.toFixed(2), 'ms');

  // Log all resources
  const resources = performance.getEntriesByType('resource');
  console.log('📦 Resources loaded:', resources.length);

  resources.forEach(resource => {
    console.log(`  ${resource.name.split('/').pop()}: ${resource.duration.toFixed(2)}ms (${resource.nextHopProtocol})`);
  });
});

