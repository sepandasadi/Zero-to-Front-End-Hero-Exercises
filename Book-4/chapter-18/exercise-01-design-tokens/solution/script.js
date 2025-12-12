/**
 * Design Tokens Theme Switcher
 * Handles light/dark mode toggle with localStorage persistence
 */

// Theme constants
const THEMES = {
  LIGHT: 'light',
  DARK: 'dark'
};

const STORAGE_KEY = 'design-tokens-theme';

// Theme manager class
class ThemeManager {
  constructor() {
    this.toggleButton = document.getElementById('theme-toggle');
    this.themeIcon = this.toggleButton.querySelector('.theme-icon');
    this.currentTheme = this.getStoredTheme() || THEMES.LIGHT;

    this.init();
  }

  init() {
    // Set initial theme
    this.applyTheme(this.currentTheme);

    // Add event listener
    this.toggleButton.addEventListener('click', () => this.toggleTheme());

    // Listen for system theme changes
    this.watchSystemTheme();
  }

  getStoredTheme() {
    return localStorage.getItem(STORAGE_KEY);
  }

  setStoredTheme(theme) {
    localStorage.setItem(STORAGE_KEY, theme);
  }

  applyTheme(theme) {
    const root = document.documentElement;

    if (theme === THEMES.DARK) {
      root.setAttribute('data-theme', 'dark');
      this.themeIcon.textContent = '☀️';
      this.toggleButton.setAttribute('aria-label', 'Switch to light mode');
    } else {
      root.removeAttribute('data-theme');
      this.themeIcon.textContent = '🌙';
      this.toggleButton.setAttribute('aria-label', 'Switch to dark mode');
    }

    this.currentTheme = theme;
    this.setStoredTheme(theme);

    // Dispatch custom event for theme change
    window.dispatchEvent(new CustomEvent('themechange', {
      detail: { theme }
    }));
  }

  toggleTheme() {
    const newTheme = this.currentTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
    this.applyTheme(newTheme);
  }

  watchSystemTheme() {
    // Only watch if no theme is stored
    if (!this.getStoredTheme()) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

      const handleChange = (e) => {
        const newTheme = e.matches ? THEMES.DARK : THEMES.LIGHT;
        this.applyTheme(newTheme);
      };

      // Modern browsers
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
      } else {
        // Older browsers
        mediaQuery.addListener(handleChange);
      }
    }
  }
}

// Initialize theme manager when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
  });
} else {
  new ThemeManager();
}

// Export for potential use in modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ThemeManager, THEMES };
}

