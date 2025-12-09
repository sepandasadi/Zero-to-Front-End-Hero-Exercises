// Optimized analytics script
// Loaded with async attribute - doesn't block parsing

console.log('📊 Loading optimized analytics...');

(function() {
  const Analytics = {
    init: function() {
      console.log('Analytics initialized (async)');
      this.trackPageView();
      this.setupListeners();
    },

    trackPageView: function() {
      // Use requestIdleCallback for non-critical work
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          console.log('Tracking page view (during idle time)');
        });
      } else {
        setTimeout(() => {
          console.log('Tracking page view (fallback)');
        }, 1000);
      }
    },

    trackEvent: function(category, action, label) {
      // Queue events and send in batches
      console.log('Event:', category, action, label);
    },

    setupListeners: function() {
      // Use event delegation (more efficient)
      document.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
          this.trackEvent('Navigation', 'Click', e.target.href);
        }
      }, { passive: true });
    }
  };

  // ✅ FIXED: No expensive synchronous operation

  // Initialize when ready (async, so might be before or after DOMContentLoaded)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      Analytics.init();
    });
  } else {
    Analytics.init();
  }
})();

console.log('✅ Optimized analytics loaded (async)');

