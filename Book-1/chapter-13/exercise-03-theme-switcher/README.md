# Exercise 3: Light/Dark Theme Switcher

**Difficulty:** ⭐⭐ Intermediate
**Time:** 35-45 minutes

## 🎯 Objective

Implement a complete light/dark theme switcher with JavaScript and localStorage persistence.

## 📚 Concepts Practiced

- CSS Variables for theming
- JavaScript theme toggling
- localStorage for persistence
- Smooth color transitions

## 📋 Requirements

1. Light theme (default)
2. Dark theme
3. Toggle button
4. All colors update automatically
5. Smooth transitions
6. Save preference to localStorage
7. Load saved theme on page load

## ✅ Success Criteria

- [ ] Button switches themes
- [ ] Theme persists after page reload
- [ ] All colors transition smoothly
- [ ] Text always readable
- [ ] No flashing on page load

## 🌓 Theme Implementation

```css
:root {
  --bg: #ffffff;
  --text: #2c3e50;
  transition: background-color 0.3s, color 0.3s;
}

[data-theme="dark"] {
  --bg: #1a1a1a;
  --text: #ecf0f1;
}
```

```javascript
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}
```

---

**Full instructions in starter folder.**

