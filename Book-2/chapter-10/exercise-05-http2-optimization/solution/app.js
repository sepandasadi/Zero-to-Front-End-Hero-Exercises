// HTTP/2 Detection and Performance Measurement

window.addEventListener('load', () => {
  // Get performance data
  const perfData = performance.getEntriesByType('navigation')[0];
  const resources = performance.getEntriesByType('resource');

  // Detect HTTP protocol
  const protocol = perfData.nextHopProtocol || 'unknown';

  updateProtocolBadge(protocol);
  displayPerformanceMetrics(perfData, resources);
  logDetailedMetrics(perfData, resources);
});

function updateProtocolBadge(protocol) {
  const badge = document.getElementById('protocol-badge');
  const protocolType = document.getElementById('protocol-type');

  if (protocol.includes('h3')) {
    badge.textContent = '🚀 HTTP/3 Enabled!';
    badge.classList.add('http3');
    protocolType.textContent = 'HTTP/3 (QUIC)';
  } else if (protocol.includes('h2')) {
    badge.textContent = '✅ HTTP/2 Enabled!';
    badge.classList.add('http2');
    protocolType.textContent = 'HTTP/2';
  } else {
    badge.textContent = '⚠️ HTTP/1.1';
    badge.style.background = '#ff6b6b';
    protocolType.textContent = 'HTTP/1.1';
  }
}

function displayPerformanceMetrics(perfData, resources) {
  // Resource count
  const resourceCount = document.getElementById('resource-count');
  resourceCount.textContent = resources.length;

  // Load time
  const loadTime = document.getElementById('load-time');
  const loadDuration = perfData.loadEventEnd - perfData.fetchStart;
  loadTime.textContent = `${loadDuration.toFixed(0)}ms`;

  // Transfer size
  const transferSize = document.getElementById('transfer-size');
  const totalSize = resources.reduce((sum, r) => sum + (r.transferSize || 0), 0);
  transferSize.textContent = `${(totalSize / 1024).toFixed(2)} KB`;
}

function logDetailedMetrics(perfData, resources) {
  console.log('📊 HTTP/2 Performance Metrics');
  console.log('================================');
  console.log('Protocol:', perfData.nextHopProtocol);
  console.log('');

  console.log('⏱️ Timing Metrics:');
  console.log('DNS Lookup:', (perfData.domainLookupEnd - perfData.domainLookupStart).toFixed(2), 'ms');
  console.log('TCP Connect:', (perfData.connectEnd - perfData.connectStart).toFixed(2), 'ms');
  console.log('TLS Handshake:', (perfData.secureConnectionStart ? (perfData.connectEnd - perfData.secureConnectionStart).toFixed(2) : 0), 'ms');
  console.log('Request:', (perfData.responseStart - perfData.requestStart).toFixed(2), 'ms');
  console.log('Response:', (perfData.responseEnd - perfData.responseStart).toFixed(2), 'ms');
  console.log('DOM Content Loaded:', perfData.domContentLoadedEventEnd.toFixed(2), 'ms');
  console.log('Load Complete:', perfData.loadEventEnd.toFixed(2), 'ms');
  console.log('');

  console.log('📦 Resources Loaded:', resources.length);

  // Group resources by protocol
  const protocols = {};
  resources.forEach(r => {
    const proto = r.nextHopProtocol || 'unknown';
    protocols[proto] = (protocols[proto] || 0) + 1;
  });

  console.log('By Protocol:');
  Object.entries(protocols).forEach(([proto, count]) => {
    console.log(`  ${proto}: ${count} resources`);
  });
  console.log('');

  // Resource types
  console.log('📄 Resource Breakdown:');
  const types = {};
  resources.forEach(r => {
    const type = r.initiatorType || 'other';
    types[type] = (types[type] || 0) + 1;
  });

  Object.entries(types).forEach(([type, count]) => {
    console.log(`  ${type}: ${count}`);
  });
  console.log('');

  // Show resources with timing
  console.log('🔍 Detailed Resource Timing:');
  resources.forEach(r => {
    console.log(`  ${r.name.split('/').pop()}`);
    console.log(`    Protocol: ${r.nextHopProtocol}`);
    console.log(`    Duration: ${r.duration.toFixed(2)}ms`);
    console.log(`    Size: ${(r.transferSize / 1024).toFixed(2)} KB`);
  });
}

// Show HTTP/2 benefits
console.log('💡 HTTP/2 Benefits:');
console.log('  ✅ Multiplexing - All requests over single connection');
console.log('  ✅ Header Compression - ~30% smaller headers (HPACK)');
console.log('  ✅ Server Push - Critical resources pushed proactively');
console.log('  ✅ Stream Prioritization - Important resources first');
console.log('  ✅ Binary Protocol - More efficient parsing');
console.log('');
console.log('📈 Expected Performance Gains:');
console.log('  • 20-40% faster page loads');
console.log('  • Reduced latency');
console.log('  • Better resource utilization');
console.log('  • Improved mobile performance');

