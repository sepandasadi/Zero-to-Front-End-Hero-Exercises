// ================================
// Accessible Navigation - SOLUTION
// ================================

console.log('✓ Accessible Navigation loaded');

// DOM Elements
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Track menu state
let isMenuOpen = false;

// ================================
// Toggle Menu
// ================================

function toggleMenu() {
  isMenuOpen = !isMenuOpen;

  // Update ARIA attributes
  hamburger.setAttribute('aria-expanded', isMenuOpen);
  nav.setAttribute('aria-hidden', !isMenuOpen);

  // If opening, trap focus
  if (isMenuOpen) {
    trapFocus();
  }

  console.log(`Menu ${isMenuOpen ? 'opened' : 'closed'}`);
}

// ================================
// Close Menu
// ================================

function closeMenu() {
  if (isMenuOpen) {
    isMenuOpen = false;
    hamburger.setAttribute('aria-expanded', 'false');
    nav.setAttribute('aria-hidden', 'true');
    console.log('Menu closed');
  }
}

// ================================
// Trap Focus (Mobile Menu)
// ================================

function trapFocus() {
  // Only trap focus on mobile
  if (window.innerWidth >= 768) return;

  const focusableElements = nav.querySelectorAll(
    'a[href], button:not([disabled])'
  );

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  // Focus first element
  firstElement.focus();

  // Trap focus within menu
  nav.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  });
}

// ================================
// Event Listeners
// ================================

// Hamburger click
hamburger.addEventListener('click', toggleMenu);

// Escape key to close
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && isMenuOpen) {
    closeMenu();
    hamburger.focus(); // Return focus to button
  }
});

// Close when clicking outside
document.addEventListener('click', (e) => {
  if (isMenuOpen &&
      !nav.contains(e.target) &&
      !hamburger.contains(e.target)) {
    closeMenu();
  }
});

// Close menu on link click (mobile)
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth < 768) {
      closeMenu();
    }
  });
});

// Close menu on resize to desktop
window.addEventListener('resize', () => {
  if (window.innerWidth >= 768 && isMenuOpen) {
    closeMenu();
  }
});

// ================================
// Initialize
// ================================

// Set initial ARIA states
hamburger.setAttribute('aria-expanded', 'false');
nav.setAttribute('aria-hidden', 'true');

console.log('\n📋 Accessibility Features:');
console.log('   ✓ ARIA attributes');
console.log('   ✓ Keyboard navigation');
console.log('   ✓ Focus management');
console.log('   ✓ Screen reader support');
console.log('   ✓ Skip to main content');
console.log('\n🧪 Test with:');
console.log('   - Tab key navigation');
console.log('   - Escape key to close');
console.log('   - Screen reader');
console.log('   - Keyboard only (unplug mouse!)');

