// Exercise 06: History API - SOLUTION
// Build a Single Page Application router

// Page content templates
const pages = {
  home: {
    title: 'Home',
    content: `
      <h1 class="page-title">🏠 Welcome Home</h1>
      <p>This is a single-page application built with the History API.</p>
      <p>Click the links in the navigation to see SPA routing in action!</p>
      <ul>
        <li>✅ No page reloads</li>
        <li>✅ Browser back/forward work</li>
        <li>✅ URLs update correctly</li>
        <li>✅ State management built-in</li>
      </ul>
    `
  },
  about: {
    title: 'About',
    content: `
      <h1 class="page-title">ℹ️ About Us</h1>
      <p>This demo shows how to build SPA navigation using the History API.</p>
      <h3>How It Works:</h3>
      <ol>
        <li>Intercept link clicks</li>
        <li>Use history.pushState() instead of navigation</li>
        <li>Update content dynamically</li>
        <li>Listen to popstate for back/forward</li>
      </ol>
    `
  },
  contact: {
    title: 'Contact',
    content: `
      <h1 class="page-title">📧 Contact Us</h1>
      <p>Email: hello@example.com</p>
      <p>Phone: (555) 123-4567</p>
      <p>Notice how the URL changes without page reload!</p>
    `
  },
  products: {
    title: 'Products',
    content: `
      <h1 class="page-title">🛍️ Products</h1>
      <p>Product list would go here.</p>
      <p>Try using the browser's back and forward buttons!</p>
    `
  }
};

// Navigate to a page using History API
function navigateToPage(pageName, addToHistory = true) {
  const page = pages[pageName];
  
  if (!page) {
    console.error('Page not found:', pageName);
    return;
  }
  
  // Update content
  const contentDiv = document.getElementById('content');
  contentDiv.innerHTML = page.content;
  
  // Update page title
  document.title = `${page.title} - History API Demo`;
  
  // Update active nav link
  updateActiveNavLink(pageName);
  
  // Add to browser history
  if (addToHistory) {
    const url = pageName === 'home' ? '/' : `/${pageName}`;
    
    // pushState(stateObject, title, url)
    // stateObject: data to store with this history entry
    // title: mostly ignored by browsers (use document.title instead)
    // url: new URL to display
    history.pushState(
      { page: pageName, timestamp: Date.now() },
      page.title,
      url
    );
    
    console.log(`Navigated to ${pageName} via pushState`);
  }
}

// Update active navigation link
function updateActiveNavLink(pageName) {
  // Remove active class from all links
  document.querySelectorAll('nav a').forEach(link => {
    link.classList.remove('active');
  });
  
  // Add active class to current page link
  const activeLink = document.querySelector(`nav a[data-page="${pageName}"]`);
  if (activeLink) {
    activeLink.classList.add('active');
  }
}

// Handle browser back/forward buttons
window.addEventListener('popstate', (event) => {
  console.log('Popstate event:', event.state);
  
  if (event.state && event.state.page) {
    // Restore page from state
    // Don't add to history (we're already moving through history!)
    navigateToPage(event.state.page, false);
  } else {
    // No state (initial page load or navigated to URL directly)
    const path = window.location.pathname;
    const pageName = path === '/' ? 'home' : path.slice(1);
    navigateToPage(pageName, false);
  }
});

// Intercept link clicks
function setupNavigation() {
  const nav = document.getElementById('nav');
  
  nav.addEventListener('click', (event) => {
    // Check if clicked element is a link
    if (event.target.tagName === 'A') {
      // Prevent default navigation
      event.preventDefault();
      
      const pageName = event.target.dataset.page;
      navigateToPage(pageName);
    }
  });
}

// BONUS: replaceState example
function updateQueryParams(key, value) {
  const url = new URL(window.location);
  url.searchParams.set(key, value);
  
  // Replace current history entry (doesn't add new entry)
  history.replaceState(
    { ...history.state, [key]: value },
    '',
    url.toString()
  );
  
  console.log(`Updated query param: ${key}=${value}`);
}

// BONUS: Parse query parameters
function getQueryParam(key) {
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}

// BONUS: Go back/forward programmatically
function goBack() {
  history.back();
}

function goForward() {
  history.forward();
}

function goToPage(delta) {
  history.go(delta); // Negative = back, positive = forward
}

// Initialize
function init() {
  console.log('🧭 History API SPA Router initialized!');
  
  // Setup navigation interceptor
  setupNavigation();
  
  // Determine initial page from URL
  const path = window.location.pathname;
  const pageName = path === '/' ? 'home' : path.slice(1);
  
  // Load initial page (don't add to history - we're already here)
  navigateToPage(pageName, false);
  
  // Set initial state if none exists
  if (!history.state) {
    history.replaceState({ page: pageName }, '', window.location.pathname);
  }
  
  console.log('\n💡 Try these:');
  console.log('- Click navigation links (no reload!)');
  console.log('- Use browser back/forward buttons');
  console.log('- Check the URL in address bar');
  console.log('- Open DevTools → Application → Session Storage to see state');
  
  // Demo query params
  console.log('\n💡 Bonus - Try in console:');
  console.log('  updateQueryParam("filter", "popular")');
  console.log('  getQueryParam("filter")');
  console.log('  goBack()');
  console.log('  goForward()');
}

// Make functions available in console for testing
window.demoFunctions = {
  updateQueryParams,
  getQueryParam,
  goBack,
  goForward,
  navigateToPage
};

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', init);

console.log('\n📚 Real-World Use Cases:');
console.log('- Single Page Applications (React, Vue, Angular)');
console.log('- Tabbed interfaces with shareable URLs');
console.log('- Multi-step forms with back/forward support');
console.log('- Image galleries with deep linking');
console.log('- Dashboard filters with URL persistence');
