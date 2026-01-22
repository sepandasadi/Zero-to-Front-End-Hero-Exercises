// Exercise 04: Intersection Observer - SOLUTION

console.log("=== Exercise 4: Intersection Observer ===\n");

// ========================================
// Task 1: Setup Lazy Loading Images
// ========================================

// Sample images (using placeholder service)
const imageUrls = [
  'https://picsum.photos/400/300?random=1',
  'https://picsum.photos/400/300?random=2',
  'https://picsum.photos/400/300?random=3',
  'https://picsum.photos/400/300?random=4',
  'https://picsum.photos/400/300?random=5',
  'https://picsum.photos/400/300?random=6',
  'https://picsum.photos/400/300?random=7',
  'https://picsum.photos/400/300?random=8'
];

// Create image elements with data-src (not loaded yet)
function createLazyImages() {
  const grid = document.getElementById('image-grid');
  
  imageUrls.forEach((url, index) => {
    const img = document.createElement('img');
    img.dataset.src = url;  // Store real URL in data attribute
    img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999" font-family="sans-serif"%3ELoading...%3C/text%3E%3C/svg%3E';
    img.classList.add('lazy-image', 'loading');
    img.alt = `Image ${index + 1}`;
    grid.appendChild(img);
  });
  
  console.log(`Created ${imageUrls.length} lazy images`);
}

// Setup Intersection Observer for lazy loading
function setupLazyLoading() {
  // Create observer with options
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      // Check if element is intersecting (visible in viewport)
      if (entry.isIntersecting) {
        const img = entry.target;
        
        console.log('Loading image:', img.dataset.src);
        
        // Load the actual image
        img.src = img.dataset.src;
        
        // Update classes when loaded
        img.onload = () => {
          img.classList.remove('loading');
          img.classList.add('loaded');
          console.log('Image loaded successfully');
        };
        
        // Stop watching this image (performance!)
        observer.unobserve(img);
      }
    });
  }, {
    // Start loading 100px before image enters viewport
    rootMargin: '100px',
    // Trigger when any part of image is visible
    threshold: 0
  });
  
  // Observe all lazy images
  const lazyImages = document.querySelectorAll('.lazy-image');
  lazyImages.forEach(img => imageObserver.observe(img));
  
  console.log(`Observing ${lazyImages.length} images`);
}

// ========================================
// Task 2: Infinite Scroll
// ========================================

let currentPage = 1;
const postsPerPage = 5;
const maxPages = 5;
let isLoading = false;

// Generate mock posts
function generatePosts(page) {
  const posts = [];
  const startId = (page - 1) * postsPerPage + 1;
  
  for (let i = 0; i < postsPerPage; i++) {
    posts.push({
      id: startId + i,
      title: `Post ${startId + i}`,
      content: `This is the content of post ${startId + i}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
    });
  }
  
  return posts;
}

// Add posts to DOM
function addPosts(posts) {
  const container = document.getElementById('posts-container');
  
  posts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.className = 'post';
    postElement.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
    `;
    container.appendChild(postElement);
  });
  
  console.log(`Added ${posts.length} posts (page ${currentPage})`);
}

// Load next page of posts
function loadMorePosts() {
  if (isLoading || currentPage >= maxPages) {
    return;
  }
  
  isLoading = true;
  currentPage++;
  
  console.log(`Loading page ${currentPage}...`);
  
  // Simulate API delay
  setTimeout(() => {
    const newPosts = generatePosts(currentPage);
    addPosts(newPosts);
    isLoading = false;
    
    // Hide sentinel if no more pages
    if (currentPage >= maxPages) {
      const sentinel = document.getElementById('sentinel');
      sentinel.style.display = 'none';
      console.log('No more posts to load');
    }
  }, 1000);
}

// Setup infinite scroll observer
function setupInfiniteScroll() {
  const sentinel = document.getElementById('sentinel');
  
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // When sentinel becomes visible, load more
      if (entry.isIntersecting && !isLoading) {
        console.log('Sentinel visible - loading more posts');
        loadMorePosts();
      }
    });
  }, {
    // Start loading when sentinel is 200px away
    rootMargin: '200px'
  });
  
  scrollObserver.observe(sentinel);
  console.log('Infinite scroll observer set up');
}

// ========================================
// Task 3: Scroll Animations
// ========================================

function setupScrollAnimations() {
  // Create observer for animations
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add visible class to trigger animation
        entry.target.classList.add('visible');
        console.log('Element animated:', entry.target.textContent);
        
        // Optional: unobserve if you want animation to happen only once
        // animationObserver.unobserve(entry.target);
      } else {
        // Remove visible class to reset animation
        // (comment this out if you want animation to happen only once)
        entry.target.classList.remove('visible');
      }
    });
  }, {
    // Trigger when 20% of element is visible
    threshold: 0.2
  });
  
  // Observe all animation boxes
  const boxes = document.querySelectorAll('.animate-box');
  boxes.forEach(box => animationObserver.observe(box));
  
  console.log(`Observing ${boxes.length} boxes for animations`);
}

// ========================================
// Task 4: Performance Monitoring
// ========================================

function setupPerformanceMonitoring() {
  let observerCallbacks = 0;
  let scrollEvents = 0;
  
  // Count observer callbacks
  const perfObserver = new IntersectionObserver(() => {
    observerCallbacks++;
  });
  
  document.querySelectorAll('.animate-box').forEach(el => {
    perfObserver.observe(el);
  });
  
  // Count scroll events (for comparison)
  window.addEventListener('scroll', () => {
    scrollEvents++;
  });
  
  // Log stats every 5 seconds
  setInterval(() => {
    console.log(`Performance Stats (last 5s):
      Intersection Observer callbacks: ${observerCallbacks}
      Scroll events: ${scrollEvents}
      Ratio: ${scrollEvents > 0 ? (scrollEvents / Math.max(observerCallbacks, 1)).toFixed(1) : 0}x more scroll events!
    `);
    observerCallbacks = 0;
    scrollEvents = 0;
  }, 5000);
}

// ========================================
// Initialize Everything
// ========================================

function init() {
  console.log("Initializing Intersection Observer demos...");
  
  // Create lazy images
  createLazyImages();
  
  // Setup lazy loading observer
  setupLazyLoading();
  
  // Load initial posts
  const initialPosts = generatePosts(1);
  addPosts(initialPosts);
  
  // Setup infinite scroll
  setupInfiniteScroll();
  
  // Setup scroll animations
  setupScrollAnimations();
  
  // Setup performance monitoring
  setupPerformanceMonitoring();
  
  console.log("✅ All observers set up!");
  console.log("📜 Scroll down to see:");
  console.log("  - Images lazy load");
  console.log("  - Posts load infinitely");
  console.log("  - Boxes animate into view");
}

// BONUS: Advanced threshold demonstration
function demonstrateThresholds() {
  const box = document.querySelector('.animate-box');
  
  const thresholdObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      console.log(`Visibility: ${(entry.intersectionRatio * 100).toFixed(0)}%`);
    });
  }, {
    // Trigger at multiple visibility percentages
    threshold: [0, 0.25, 0.5, 0.75, 1.0]
  });
  
  if (box) {
    thresholdObserver.observe(box);
  }
}

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  init();
  // demonstrateThresholds(); // Uncomment to see threshold demo
});

console.log("\n💡 Why Intersection Observer?");
console.log("- Scroll events fire hundreds of times per second");
console.log("- Intersection Observer is debounced and optimized");
console.log("- Better performance, especially on mobile");
console.log("- Built-in support for thresholds and margins");
console.log("- Watch the console for performance comparison!");
