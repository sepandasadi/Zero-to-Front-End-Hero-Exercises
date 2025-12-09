// Main application JavaScript
// This should be deferred or loaded at the end!

console.log('🚀 Loading app.js...');

// ❌ PROBLEM: Trying to access DOM before it's ready
const App = {
  init: function() {
    console.log('App initializing...');
    this.setupEventListeners();
    this.loadDynamicContent();
  },

  setupEventListeners: function() {
    // This might fail if DOM isn't ready
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => {
      btn.addEventListener('click', function() {
        console.log('Button clicked');
      });
    });
  },

  loadDynamicContent: function() {
    // Simulating API calls
    console.log('Loading dynamic content...');

    // Expensive operation
    for (let i = 0; i < 3000000; i++) {
      Math.random();
    }

    console.log('Dynamic content loaded');
  },

  // ❌ PROBLEM: Inefficient DOM manipulation
  updateUI: function() {
    const container = document.querySelector('.container');
    if (container) {
      // Creating elements one by one (causes multiple reflows)
      for (let i = 0; i < 100; i++) {
        const div = document.createElement('div');
        div.textContent = `Item ${i}`;
        container.appendChild(div); // Reflow each time!
      }
    }
  }
};

// Execute immediately (blocks parsing!)
App.init();

console.log('✅ App.js loaded');

