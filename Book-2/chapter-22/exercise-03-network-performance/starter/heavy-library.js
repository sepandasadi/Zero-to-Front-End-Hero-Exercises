// Simulated large library (like an unoptimized jQuery or similar)
// This file is intentionally large and blocks parsing

console.log('📦 Loading heavy library...');

// Simulated library code (in reality this would be much larger)
const HeavyLibrary = (function() {

  // Lots of utility functions
  const utils = {
    addClass: function(el, className) {
      el.classList.add(className);
    },

    removeClass: function(el, className) {
      el.classList.remove(className);
    },

    ajax: function(url, callback) {
      fetch(url)
        .then(response => response.json())
        .then(callback);
    },

    animate: function(el, props, duration) {
      // Animation logic
      console.log('Animating...', el, props);
    }
  };

  // Lots of polyfills (unnecessary on modern browsers)
  const polyfills = {
    arrayIncludes: function() {
      if (!Array.prototype.includes) {
        Array.prototype.includes = function(element) {
          return this.indexOf(element) !== -1;
        };
      }
    }
  };

  // Initialize everything
  polyfills.arrayIncludes();

  return {
    utils,
    version: '1.0.0'
  };
})();

// Expensive initialization
for (let i = 0; i < 1000000; i++) {
  Math.random();
}

console.log('✅ Heavy library loaded (this took time!)');

