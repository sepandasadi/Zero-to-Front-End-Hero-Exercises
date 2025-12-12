/**
 * Design Tokens Theme Switcher - Enhanced Solution
 * Features:
 * - Light/dark mode toggle
 * - localStorage persistence
 * - System preference detection
 * - Token export functionality
 * - Toast notifications
 */

// Theme constants
const THEMES = {
  LIGHT: 'light',
  DARK: 'dark'
};

const STORAGE_KEY = 'design-tokens-theme';

// Toast utility
class Toast {
  constructor() {
    this.element = document.getElementById('toast');
  }

  show(message, type = 'success', duration = 3000) {
    this.element.textContent = message;
    this.element.className = `toast show ${type}`;

    setTimeout(() => {
      this.element.className = 'toast';
    }, duration);
  }
}

// Theme manager class
class ThemeManager {
  constructor() {
    this.toggleButton = document.getElementById('theme-toggle');
    this.themeIcon = this.toggleButton.querySelector('.theme-icon');
    this.themeLabel = this.toggleButton.querySelector('.theme-label');
    this.currentTheme = this.getStoredTheme() || this.getSystemTheme();
    this.toast = new Toast();

    this.init();
  }

  init() {
    // Set initial theme
    this.applyTheme(this.currentTheme);

    // Add event listener
    this.toggleButton.addEventListener('click', () => this.toggleTheme());

    // Listen for system theme changes
    this.watchSystemTheme();

    // Keyboard shortcut (Ctrl/Cmd + Shift + T)
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        this.toggleTheme();
      }
    });
  }

  getStoredTheme() {
    return localStorage.getItem(STORAGE_KEY);
  }

  setStoredTheme(theme) {
    localStorage.setItem(STORAGE_KEY, theme);
  }

  getSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return THEMES.DARK;
    }
    return THEMES.LIGHT;
  }

  applyTheme(theme) {
    const root = document.documentElement;

    if (theme === THEMES.DARK) {
      root.setAttribute('data-theme', 'dark');
      this.themeIcon.textContent = '☀️';
      this.themeLabel.textContent = 'Light Mode';
      this.toggleButton.setAttribute('aria-label', 'Switch to light mode');
    } else {
      root.removeAttribute('data-theme');
      this.themeIcon.textContent = '🌙';
      this.themeLabel.textContent = 'Dark Mode';
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
    this.toast.show(`Switched to ${newTheme} mode`, 'success');
  }

  watchSystemTheme() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e) => {
      // Only auto-switch if no preference is stored
      if (!this.getStoredTheme()) {
        const newTheme = e.matches ? THEMES.DARK : THEMES.LIGHT;
        this.applyTheme(newTheme);
      }
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

// Token exporter
class TokenExporter {
  constructor(toast) {
    this.exportButton = document.getElementById('export-tokens');
    this.toast = toast;

    if (this.exportButton) {
      this.exportButton.addEventListener('click', () => this.exportTokens());
    }
  }

  exportTokens() {
    const formats = [
      { name: 'CSS Variables', fn: exportAsCSS, ext: 'css' },
      { name: 'JSON', fn: exportAsJSON, ext: 'json' },
      { name: 'JavaScript Module', fn: exportAsModule, ext: 'js' }
    ];

    // Show selection menu
    const formatChoice = this.promptForFormat(formats);

    if (formatChoice !== null && formatChoice < formats.length) {
      const format = formats[formatChoice];
      const content = format.fn();

      this.downloadFile(content, `design-tokens.${format.ext}`);
      this.toast.show(`Tokens exported as ${format.name}!`, 'success');
    }
  }

  promptForFormat(formats) {
    const message = 'Choose export format:\n\n' +
      formats.map((f, i) => `${i + 1}. ${f.name}`).join('\n');

    const choice = prompt(message, '1');

    if (choice === null) return null;
    return parseInt(choice) - 1;
  }

  downloadFile(content, filename) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    } else {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      return Promise.resolve();
    }
  }
}

// Color copier - click on color to copy hex value
class ColorCopier {
  constructor(toast) {
    this.toast = toast;
    this.init();
  }

  init() {
    // Add click handlers to all color items
    const colorItems = document.querySelectorAll('.color-item, .semantic-card');

    colorItems.forEach(item => {
      item.style.cursor = 'pointer';
      item.addEventListener('click', (e) => {
        const color = window.getComputedStyle(item).backgroundColor;
        const hex = this.rgbToHex(color);

        this.copyToClipboard(hex);
        this.toast.show(`Copied ${hex} to clipboard!`, 'success');
      });
    });
  }

  rgbToHex(rgb) {
    const result = rgb.match(/\d+/g);
    if (!result) return rgb;

    const hex = result.map(x => {
      const hex = parseInt(x).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    });

    return '#' + hex.join('');
  }

  copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text);
    } else {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
  }
}

// Initialize everything when DOM is ready
function init() {
  const toast = new Toast();
  const themeManager = new ThemeManager();
  const tokenExporter = new TokenExporter(toast);
  const colorCopier = new ColorCopier(toast);

  console.log('✨ Design Tokens System initialized');
  console.log('💡 Tip: Press Ctrl/Cmd + Shift + T to toggle theme');
  console.log('🎨 Click on any color to copy its hex value');
}

// Run init when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export for potential use in modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ThemeManager,
    TokenExporter,
    ColorCopier,
    Toast,
    THEMES
  };
}

