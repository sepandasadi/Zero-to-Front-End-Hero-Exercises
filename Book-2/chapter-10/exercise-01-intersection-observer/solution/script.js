// Intersection Observer for Lazy Loading Images

// Track loaded images
let loadedCount = 0;
const totalImages = document.querySelectorAll('img.lazy').length;

// Update counter
function updateCounter() {
  const counter = document.getElementById('loaded-count');
  if (counter) {
    counter.textContent = loadedCount;
  }
}

// Load image function
function loadImage(img) {
  const src = img.dataset.src;

  if (!src) return;

  // Set up load event
  img.addEventListener('load', () => {
    img.classList.add('loaded');
    loadedCount++;
    updateCounter();
    console.log(`✅ Loaded: ${src}`);
  });

  // Set up error event
  img.addEventListener('error', () => {
    img.classList.add('error');
    img.alt = 'Failed to load image';
    console.error(`❌ Failed to load: ${src}`);
  });

  // Start loading
  img.src = src;
}

// Create Intersection Observer
const observerOptions = {
  root: null, // Use viewport
  rootMargin: '50px', // Load 50px before visible
  threshold: 0.1 // Trigger when 10% visible
};

const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;

      // Load the image
      loadImage(img);

      // Stop observing this image
      observer.unobserve(img);
    }
  });
};

const imageObserver = new IntersectionObserver(observerCallback, observerOptions);

// Observe all lazy images
const lazyImages = document.querySelectorAll('img.lazy');

lazyImages.forEach(img => {
  imageObserver.observe(img);
});

console.log(`🔍 Observing ${totalImages} images for lazy loading`);

// Optional: Prefetch images on hover
lazyImages.forEach(img => {
  const parent = img.closest('.gallery-item');
  if (parent) {
    parent.addEventListener('mouseenter', () => {
      if (!img.classList.contains('loaded') && img.dataset.src) {
        // Prefetch on hover for instant loading
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = img.dataset.src;
        document.head.appendChild(prefetchLink);
      }
    });
  }
});

