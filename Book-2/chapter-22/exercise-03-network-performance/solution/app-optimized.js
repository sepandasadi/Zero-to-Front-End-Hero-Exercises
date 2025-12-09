// Optimized main application JavaScript
// Loaded with defer attribute

console.log('🚀 Loading optimized app.js...');

const App = {
  init: function() {
    console.log('App initializing... (after DOM ready)');
    this.setupEventListeners();
    // Removed heavy loadDynamicContent
  },

  setupEventListeners: function() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => {
      btn.addEventListener('click', function() {
        console.log('Button clicked');
      }, { passive: true });
    });
  },

  // ✅ FIXED: Efficient DOM manipulation using DocumentFragment
  updateUI: function() {
    const container = document.querySelector('.container');
    if (container) {
      const fragment = document.createDocumentFragment();

      // Build all elements in memory first
      for (let i = 0; i < 100; i++) {
        const div = document.createElement('div');
        div.textContent = `Item ${i}`;
        fragment.appendChild(div);
      }

      // Single append (one reflow instead of 100!)
      container.appendChild(fragment);
    }
  }
};

// ✅ FIXED: No immediate execution, script is deferred
// DOM is guaranteed to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => App.init());
} else {
  App.init();
}

console.log('✅ Optimized app.js loaded');

