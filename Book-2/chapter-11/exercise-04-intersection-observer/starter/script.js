// Exercise 04: Intersection Observer - STARTER CODE

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

// TODO: Create image elements with data-src attribute
function createLazyImages() {
  const grid = document.getElementById('image-grid');
  
  imageUrls.forEach((url, index) => {
    const img = document.createElement('img');
    // TODO: Set data-src to actual URL
    // TODO: Set src to placeholder (or blank)
    img.classList.add('lazy-image', 'loading');
    img.alt = `Image ${index + 1}`;
    grid.appendChild(img);
  });
}

// TODO: Create Intersection Observer for lazy loading
function setupLazyLoading() {
  // TODO: Create observer
  // TODO: In callback, check if entry.isIntersecting
  // TODO: Load image by setting src from data-src
  // TODO: Remove loading class, add loaded class
  // TODO: Unobserve the image after loading
  
  // TODO: Observe all .lazy-image elements
}

// ========================================
// Task 2: Infinite Scroll
// ========================================

let currentPage = 1;
const postsPerPage = 5;
const maxPages = 5;

// TODO: Generate mock posts
function generatePosts(page) {
  const posts = [];
  const startId = (page - 1) * postsPerPage + 1;
  
  for (let i = 0; i < postsPerPage; i++) {
    posts.push({
      id: startId + i,
      title: `Post ${startId + i}`,
      content: `This is the content of post ${startId + i}. Lorem ipsum dolor sit amet.`
    });
  }
  
  return posts;
}

// TODO: Add posts to DOM
function addPosts(posts) {
  const container = document.getElementById('posts-container');
  
  posts.forEach(post => {
    // TODO: Create post HTML
    // TODO: Append to container
  });
}

// TODO: Setup infinite scroll observer
function setupInfiniteScroll() {
  const sentinel = document.getElementById('sentinel');
  
  // TODO: Create observer for sentinel
  // TODO: When sentinel is visible, load next page
  // TODO: Hide sentinel when no more pages
  
  // TODO: Observe sentinel
}

// ========================================
// Task 3: Scroll Animations
// ========================================

// TODO: Setup animation observer
function setupScrollAnimations() {
  // TODO: Create observer
  // TODO: Add 'visible' class when isIntersecting
  // TODO: Optional: remove 'visible' when not intersecting (repeat animation)
  
  // TODO: Observe all .animate-box elements
}

// ========================================
// Task 4: Performance Monitoring
// ========================================

// TODO: Log observer callbacks
function setupPerformanceMonitoring() {
  let callbackCount = 0;
  
  // TODO: Track how many times observer callbacks fire
  // Compare to scroll events (which fire hundreds of times)
}

// ========================================
// Initialize Everything
// ========================================

function init() {
  console.log("Initializing Intersection Observer demos...");
  
  // TODO: Create lazy images
  
  // TODO: Setup lazy loading observer
  
  // TODO: Load initial posts
  
  // TODO: Setup infinite scroll
  
  // TODO: Setup scroll animations
  
  console.log("✅ All observers set up!");
  console.log("Scroll down to see the magic!");
}

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', init);
