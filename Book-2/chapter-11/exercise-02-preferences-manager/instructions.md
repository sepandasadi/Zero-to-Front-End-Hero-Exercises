# Exercise 02: Preferences Manager

## 🎯 Objective

Build a complete user preferences system with theme switching, font controls, and persistent storage. Learn to synchronize settings across browser tabs using storage events.

## 📚 What You'll Learn

- Store user preferences in localStorage
- Implement dark/light mode toggle
- Control font size dynamically
- Apply CSS changes via JavaScript
- Use storage events for cross-tab sync
- sessionStorage vs localStorage
- Build settings UI

## 📋 Tasks

### Task 1: Theme Switcher

Create a dark/light mode toggle:
- Save theme preference to localStorage
- Apply theme on page load
- Toggle between themes with button
- Update CSS custom properties

### Task 2: Font Size Control

Implement font size adjustment:
- Small, Medium, Large options
- Store selected size
- Apply font size to entire page
- Use CSS custom properties

### Task 3: Layout Preferences

Add layout options:
- Sidebar position (left/right)
- Content width (narrow/wide)
- Store and apply preferences

### Task 4: Storage Events (Cross-Tab Sync)

Synchronize preferences across tabs:
- Listen to storage events
- Update UI when other tab changes settings
- Handle edge cases

### Task 5: Reset to Defaults

Create reset functionality:
- Clear all preferences
- Restore default values
- Update UI accordingly

### Task 6: sessionStorage vs localStorage

Demonstrate the difference:
- Store some preferences in sessionStorage
- Show they don't persist across sessions
- Explain use cases for each

## ✅ Success Criteria

1. ✅ Theme switches and persists
2. ✅ Font size changes apply correctly
3. ✅ Settings sync across tabs
4. ✅ Reset functionality works
5. ✅ Clean, usable UI
6. ✅ Understand storage event handling

## 💡 Hints

### Hint 1: CSS Custom Properties
```js
document.documentElement.style.setProperty('--bg-color', '#000');
```

### Hint 2: Storage Events
```js
window.addEventListener('storage', (e) => {
  if (e.key === 'theme') {
    applyTheme(e.newValue);
  }
});
```

### Hint 3: Apply Theme
```css
:root {
  --bg-color: #ffffff;
  --text-color: #000000;
}

:root[data-theme="dark"] {
  --bg-color: #1a1a1a;
  --text-color: #ffffff;
}
```

## 🧪 Testing

1. Change settings and verify they persist after refresh
2. Open multiple tabs and change settings in one
3. Verify other tabs update automatically
4. Clear localStorage and verify defaults apply
5. Test in different browsers

## ⏱️ Estimated Time

**35-45 minutes**
- Theme switcher: 10 min
- Font controls: 10 min
- Layout options: 10 min
- Storage events: 10 min
- Reset & polish: 5 min

## 🎯 Bonus Challenges

1. **More Preferences**: Add language, timezone, date format
2. **Export/Import**: Allow downloading/uploading settings JSON
3. **Preset Themes**: Multiple color schemes (light, dark, high-contrast)
4. **Animations**: Smooth transitions when changing themes
5. **Accessibility**: ARIA labels, keyboard navigation

## 📖 Resources

- [MDN: Storage Event](https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event)
- [MDN: CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Web.dev: Prefers Color Scheme](https://web.dev/prefers-color-scheme/)

---

**Ready to build?** Open the starter files and create a preferences system! ⚙️
