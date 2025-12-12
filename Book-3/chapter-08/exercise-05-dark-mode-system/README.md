# Exercise 5: Dark Mode System ⭐⭐⭐

**Difficulty:** Advanced
**Time:** 2 hours
**Focus:** Implementing a complete theming system

## 🎯 Learning Objectives

- Build a dark mode theme system
- Use CSS custom properties for theming
- Implement theme toggle with persistence
- Respect system preferences
- Ensure all components work in both themes

---

## 📋 Requirements

### Theme System Features

1. **Light Mode** (default)
2. **Dark Mode**
3. **System Preference** detection
4. **LocalStorage** persistence
5. **Theme Toggle** component
6. **Smooth Transitions** between themes

### Implementation

- Update design tokens for dark mode
- Apply `[data-theme="dark"]` to root element
- All components must work in both themes
- Toggle preserves user choice
- Respects `prefers-color-scheme: dark`

---

## 🚀 Getting Started

### Update Tokens for Dark Mode

**tokens.json:**
```json
{
  "light": {
    "color": {
      "bg-primary": "#ffffff",
      "text-primary": "#111827"
    }
  },
  "dark": {
    "color": {
      "bg-primary": "#1f2937",
      "text-primary": "#f9fafb"
    }
  }
}
```

### Theme Toggle Component

```html
<button id="themeToggle" class="theme-toggle" aria-label="Toggle dark mode">
  <svg class="theme-toggle__icon theme-toggle__icon--sun">
    <!-- Sun icon -->
  </svg>
  <svg class="theme-toggle__icon theme-toggle__icon--moon">
    <!-- Moon icon -->
  </svg>
</button>
```

### Theme Toggle JavaScript

```javascript
const themeToggle = {
  init() {
    this.applySystemTheme();
    this.setupToggle();
  },

  applySystemTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
      this.setTheme(savedTheme);
    } else if (systemPrefersDark) {
      this.setTheme('dark');
    }
  },

  setTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('theme', theme);
  },

  toggle() {
    const current = document.documentElement.getAttribute('data-theme');
    this.setTheme(current === 'dark' ? 'light' : 'dark');
  },

  setupToggle() {
    document.getElementById('themeToggle').addEventListener('click', () => {
      this.toggle();
    });
  }
};

themeToggle.init();
```

---

## ✅ Acceptance Criteria

- [ ] Dark mode tokens defined
- [ ] Theme toggle button works
- [ ] Theme persists in localStorage
- [ ] System preference detected
- [ ] All components work in dark mode
- [ ] Smooth transitions
- [ ] No flash of unstyled content (FOUC)

---

**Build a beautiful dark mode!** 🌙✨

