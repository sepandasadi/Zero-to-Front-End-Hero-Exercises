// Prefetch on Hover - Solution

let prefetchCount = 0;
const prefetchedUrls = new Set();

// Select all links with data-prefetch attribute
const postLinks = document.querySelectorAll('[data-prefetch]');

postLinks.forEach(link => {
  link.addEventListener('mouseenter', () => {
    const url = link.href;

    // Don't prefetch the same URL twice
    if (prefetchedUrls.has(url)) {
      return;
    }

    // Create prefetch link
    const prefetchLink = document.createElement('link');
    prefetchLink.rel = 'prefetch';
    prefetchLink.href = url;
    prefetchLink.as = 'document';

    // Add to head
    document.head.appendChild(prefetchLink);

    // Track prefetched URLs
    prefetchedUrls.add(url);
    prefetchCount++;

    // Update counter
    updatePrefetchCount();

    console.log('✅ Prefetched:', url);
  }, { once: true }); // Only fire once per element
});

function updatePrefetchCount() {
  const counter = document.getElementById('prefetch-count');
  if (counter) {
    counter.textContent = prefetchCount;
  }
}

// Measure performance
window.addEventListener('load', () => {
  const perfData = performance.getEntriesByType('navigation')[0];

  console.log('📊 Performance Metrics:');
  console.log('DOM Content Loaded:', perfData.domContentLoadedEventEnd.toFixed(2), 'ms');
  console.log('Load Complete:', perfData.loadEventEnd.toFixed(2), 'ms');
  console.log('Transfer Size:', (perfData.transferSize / 1024).toFixed(2), 'KB');

  // Log Resource Timing for images
  const resources = performance.getEntriesByType('resource');
  const images = resources.filter(r => r.initiatorType === 'img');

  console.log('📸 Images loaded:', images.length);
  images.forEach(img => {
    console.log(`  ${img.name.split('/').pop()}: ${img.duration.toFixed(2)}ms`);
  });
});

// Intersection Observer for analytics (bonus)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const card = entry.target;
      console.log('👁️ Card visible:', card.querySelector('h2').textContent);
    }
  });
}, {
  threshold: 0.5
});

document.querySelectorAll('.blog-card').forEach(card => {
  observer.observe(card);
});

console.log('✅ Prefetch on hover enabled!');
console.log('💡 Hover over blog links to prefetch them');

