// Simulated analytics script
// In production, load this asynchronously!

console.log('📊 Loading analytics...');

(function() {
  const Analytics = {
    init: function() {
      console.log('Analytics initialized');
      this.trackPageView();
      this.setupListeners();
    },

    trackPageView: function() {
      // Simulate API call
      console.log('Tracking page view');
    },

    trackEvent: function(category, action, label) {
      console.log('Event:', category, action, label);
    },

    setupListeners: function() {
      // Track all link clicks
      document.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
          this.trackEvent('Navigation', 'Click', e.target.href);
        }
      });
    }
  };

  // Expensive operation that blocks
  let sum = 0;
  for (let i = 0; i < 5000000; i++) {
    sum += Math.sqrt(i);
  }

  // Initialize when script loads (blocking!)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      Analytics.init();
    });
  } else {
    Analytics.init();
  }
})();

console.log('✅ Analytics loaded (this also took time!)');

