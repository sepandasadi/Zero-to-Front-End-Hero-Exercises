/**
 * Theme System - Complete Implementation
 * Handles dark mode with localStorage persistence and system preference detection
 */

const ThemeSystem = {
  /**
   * Initialize the theme system
   */
  init() {
    this.applyStoredTheme();
    this.setupToggle();
    this.watchSystemPreference();
    this.enableTransitions();
  },

  /**
   * Apply stored theme or system preference
   */
  applyStoredTheme() {
    const storedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (storedTheme) {
      this.setTheme(storedTheme);
    } else if (systemPrefersDark) {
      this.setTheme('dark');
    } else {
      this.setTheme('light');
    }
  },

  /**
   * Set theme (light or dark)
   * @param {string} theme - 'light' or 'dark'
   */
  setTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }

    localStorage.setItem('theme', theme);
    this.updateMetaThemeColor(theme);

    // Dispatch custom event for other scripts to listen to
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
  },

  /**
   * Get current theme
   * @returns {string} 'light' or 'dark'
   */
  getTheme() {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  },

  /**
   * Toggle between light and dark
   */
  toggle() {
    const current = this.getTheme();
    const newTheme = current === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  },

  /**
   * Setup toggle button event listener
   */
  setupToggle() {
    const toggleBtn = document.getElementById('themeToggle');

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => this.toggle());

      // Keyboard shortcut: Ctrl/Cmd + Shift + D
      document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
          e.preventDefault();
          this.toggle();
        }
      });
    }
  },

  /**
   * Watch for system preference changes
   */
  watchSystemPreference() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Listen for changes to system preference
    mediaQuery.addEventListener('change', (e) => {
      // Only auto-switch if user hasn't explicitly set a preference
      const hasUserPreference = localStorage.getItem('theme');

      if (!hasUserPreference) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });
  },

  /**
   * Update meta theme-color for mobile browsers
   * @param {string} theme - Current theme
   */
  updateMetaThemeColor(theme) {
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');

    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.name = 'theme-color';
      document.head.appendChild(metaThemeColor);
    }

    // Set appropriate color based on theme
    const colors = {
      light: '#FFFFFF',
      dark: '#1F2937'
    };

    metaThemeColor.content = colors[theme];
  },

  /**
   * Enable smooth transitions after initial page load
   * This prevents transitions from running on page load
   */
  enableTransitions() {
    // Wait for initial render, then enable transitions
    window.requestAnimationFrame(() => {
      setTimeout(() => {
        document.documentElement.classList.add('theme-transitions');
      }, 100);
    });
  },

  /**
   * Clear user preference (revert to system preference)
   */
  clearPreference() {
    localStorage.removeItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.setTheme(systemPrefersDark ? 'dark' : 'light');
  }
};

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => ThemeSystem.init());
} else {
  ThemeSystem.init();
}

// Example: Listen to theme changes
window.addEventListener('themechange', (e) => {
  console.log(`Theme changed to: ${e.detail.theme}`);
});

// Export for use in modules (optional)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ThemeSystem;
}

