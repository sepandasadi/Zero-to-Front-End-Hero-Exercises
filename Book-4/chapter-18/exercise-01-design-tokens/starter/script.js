/**
 * Design Tokens Theme Switcher - Starter
 *
 * Your tasks:
 * 1. Create a theme manager class
 * 2. Implement theme toggle functionality
 * 3. Save theme preference to localStorage
 * 4. Apply theme on page load
 * 5. Listen for system theme changes (bonus)
 */

// Constants
const THEMES = {
  LIGHT: 'light',
  DARK: 'dark'
};

const STORAGE_KEY = 'design-tokens-theme';

// TODO: Create ThemeManager class
class ThemeManager {
  constructor() {
    // TODO: Initialize theme manager
    // - Get toggle button element
    // - Get current theme from storage or default to light
    // - Call init method
  }

  init() {
    // TODO: Set up theme manager
    // - Apply initial theme
    // - Add event listener to toggle button
  }

  getStoredTheme() {
    // TODO: Get theme from localStorage
  }

  setStoredTheme(theme) {
    // TODO: Save theme to localStorage
  }

  applyTheme(theme) {
    // TODO: Apply theme to document
    // - Set or remove data-theme attribute on document.documentElement
    // - Update button icon/text
    // - Save to localStorage
  }

  toggleTheme() {
    // TODO: Toggle between light and dark theme
  }
}

// TODO: Initialize theme manager when DOM is ready

