# Exercise 5 Solution: Dark Mode System

Complete implementation of a dark mode theme system with toggle, persistence, and system preference detection.

## 📁 Solution Files

Since this builds on previous exercises, the solution includes:
- Dark mode token definitions
- Theme toggle component
- JavaScript for theme switching
- System preference detection
- LocalStorage persistence

## 🎨 Complete Implementation

### 1. Update Design Tokens

**`tokens/tokens.json`:**

```json
{
  "color": {
    "primary": {
      "500": { "value": "#3B82F6" }
    },
    "bg": {
      "primary": { "value": "#FFFFFF" },
      "secondary": { "value": "#F9FAFB" }
    },
    "text": {
      "primary": { "value": "#111827" },
      "secondary": { "value": "#6B7280" }
    }
  },
  "dark": {
    "color": {
      "primary": {
        "500": { "value": "#60A5FA" }
      },
      "bg": {
        "primary": { "value": "#1F2937" },
        "secondary": { "value": "#111827" }
      },
      "text": {
        "primary": { "value": "#F9FAFB" },
        "secondary": { "value": "#D1D5DB" }
      }
    }
  }
}
```

### 2. Generated CSS with Dark Mode

**`tokens/build.css`:**

```css
:root {
  --color-primary-500: #3B82F6;
  --color-bg-primary: #FFFFFF;
  --color-bg-secondary: #F9FAFB;
  --color-text-primary: #111827;
  --color-text-secondary: #6B7280;
}

[data-theme="dark"] {
  --color-primary-500: #60A5FA;
  --color-bg-primary: #1F2937;
  --color-bg-secondary: #111827;
  --color-text-primary: #F9FAFB;
  --color-text-secondary: #D1D5DB;
}
```

### 3. Theme Toggle Component

**HTML:**

```html
<button id="themeToggle" class="theme-toggle" aria-label="Toggle theme">
  <svg class="theme-toggle__icon theme-toggle__icon--sun" viewBox="0 0 24 24" width="20" height="20">
    <circle cx="12" cy="12" r="4" fill="currentColor"/>
    <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>
  <svg class="theme-toggle__icon theme-toggle__icon--moon" viewBox="0 0 24 24" width="20" height="20">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor"/>
  </svg>
</button>
```

**CSS:**

```css
.theme-toggle {
  position: relative;
  padding: 8px;
  background: var(--color-bg-secondary);
  border: 2px solid var(--color-gray-300);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-toggle:hover {
  background: var(--color-gray-100);
}

.theme-toggle:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
}

.theme-toggle__icon {
  position: absolute;
  color: var(--color-text-primary);
  transition: all 0.3s;
}

/* Show sun icon in light mode */
.theme-toggle__icon--sun {
  opacity: 1;
  transform: rotate(0deg) scale(1);
}

.theme-toggle__icon--moon {
  opacity: 0;
  transform: rotate(90deg) scale(0);
}

/* Show moon icon in dark mode */
[data-theme="dark"] .theme-toggle__icon--sun {
  opacity: 0;
  transform: rotate(90deg) scale(0);
}

[data-theme="dark"] .theme-toggle__icon--moon {
  opacity: 1;
  transform: rotate(0deg) scale(1);
}
```

### 4. Theme Switching JavaScript

**`theme.js` (Complete Solution):**

```javascript
/**
 * Theme System - Complete Solution
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
    this.addTransitionClass();
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
   */
  setTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }

    localStorage.setItem('theme', theme);
    this.updateMetaThemeColor(theme);
  },

  /**
   * Toggle between light and dark
   */
  toggle() {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  },

  /**
   * Setup toggle button
   */
  setupToggle() {
    const toggleBtn = document.getElementById('themeToggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => this.toggle());
    }
  },

  /**
   * Watch for system preference changes
   */
  watchSystemPreference() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    mediaQuery.addEventListener('change', (e) => {
      // Only auto-switch if user hasn't set a preference
      if (!localStorage.getItem('theme')) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });
  },

  /**
   * Update meta theme-color for mobile browsers
   */
  updateMetaThemeColor(theme) {
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');

    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.name = 'theme-color';
      document.head.appendChild(metaThemeColor);
    }

    // Set appropriate color based on theme
    metaThemeColor.content = theme === 'dark' ? '#1F2937' : '#FFFFFF';
  },

  /**
   * Add transition class to prevent FOUC (Flash of Unstyled Content)
   */
  addTransitionClass() {
    // Wait for initial render, then enable transitions
    setTimeout(() => {
      document.documentElement.classList.add('theme-transitions');
    }, 100);
  }
};

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => ThemeSystem.init());
} else {
  ThemeSystem.init();
}

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ThemeSystem;
}
```

### 5. Prevent Flash of Unstyled Content (FOUC)

**Add to `<head>` of HTML:**

```html
<script>
  // Inline script to apply theme before page renders
  (function() {
    const theme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (theme === 'dark' || (!theme && systemPrefersDark)) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  })();
</script>
```

### 6. Smooth Transitions

**Add to global CSS:**

```css
/* Only enable transitions after initial load */
.theme-transitions,
.theme-transitions * {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}
```

## ✅ Complete Checklist

- [ ] Dark mode tokens defined in `tokens.json`
- [ ] Build script generates `[data-theme="dark"]` overrides
- [ ] Theme toggle button created
- [ ] Toggle shows sun/moon icons
- [ ] JavaScript theme system implemented
- [ ] LocalStorage persistence working
- [ ] System preference detected on first visit
- [ ] System preference changes watched
- [ ] No FOUC (flash of unstyled content)
- [ ] All components tested in both themes
- [ ] Meta theme-color updated for mobile
- [ ] Smooth transitions between themes

## 🎓 What You Learned

1. **CSS Custom Properties for Theming** - Using CSS variables for dynamic theming
2. **Data Attributes** - Using `[data-theme="dark"]` selector
3. **LocalStorage** - Persisting user preferences
4. **Media Queries in JS** - Detecting system preferences
5. **FOUC Prevention** - Inline scripts in `<head>`
6. **Accessibility** - Proper ARIA labels and keyboard support

## 🚀 Advanced Features

### Multi-Theme Support

Add more themes:

```javascript
setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

// Usage
this.setTheme('dark');
this.setTheme('high-contrast');
this.setTheme('colorblind');
```

### Keyboard Shortcut

```javascript
document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + Shift + D to toggle theme
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
    e.preventDefault();
    ThemeSystem.toggle();
  }
});
```

---

**Congratulations! You've built a production-ready dark mode system!** 🌙✨

