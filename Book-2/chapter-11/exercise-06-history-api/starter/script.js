// Exercise 06: History API - STARTER CODE

// Page content templates
const pages = {
  home: {
    title: 'Home',
    content: `<h1>🏠 Welcome Home</h1><p>This is the home page.</p>`
  },
  about: {
    title: 'About',
    content: `<h1>ℹ️ About Us</h1><p>Learn about our SPA demo.</p>`
  },
  contact: {
    title: 'Contact',
    content: `<h1>📧 Contact</h1><p>Get in touch with us.</p>`
  },
  products: {
    title: 'Products',
    content: `<h1>🛍️ Products</h1><p>Browse our products.</p>`
  }
};

// TODO: Navigate to a page
function navigateToPage(pageName, addToHistory = true) {
  const page = pages[pageName];
  
  if (!page) {
    console.error('Page not found:', pageName);
    return;
  }
  
  // TODO: Update content div
  
  // TODO: Update document title
  
  // TODO: Update active nav link
  
  if (addToHistory) {
    // TODO: Use history.pushState() to add to browser history
    // Store state object with page name
    // Update URL
  }
}

// TODO: Update active nav link
function updateActiveNavLink(pageName) {
  // Remove 'active' from all links
  // Add 'active' to current page link
}

// TODO: Handle back/forward buttons
window.addEventListener('popstate', (event) => {
  // TODO: Get page from event.state
  // Navigate to that page (without adding to history)
});

// TODO: Intercept link clicks
function setupNavigation() {
  const nav = document.getElementById('nav');
  
  nav.addEventListener('click', (event) => {
    // TODO: Check if link was clicked
    // Prevent default navigation
    // Get page name from data-page attribute
    // Navigate using History API
  });
}

// TODO: Initialize
function init() {
  // Setup navigation interceptor
  setupNavigation();
  
  // Load initial page from URL
  const path = window.location.pathname;
  const pageName = path === '/' ? 'home' : path.slice(1);
  navigateToPage(pageName, false);
}

document.addEventListener('DOMContentLoaded', init);

console.log('🧭 History API Demo Ready!');
