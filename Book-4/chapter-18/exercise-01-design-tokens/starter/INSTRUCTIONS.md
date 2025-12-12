# Exercise 1: Design Tokens System - Instructions

## 🎯 Goal

Create a comprehensive design token system with CSS variables and implement light/dark mode theming.

## 📝 Tasks

### Part 1: Define Design Tokens (styles.css)

1. **Create color tokens** (in `:root`)
   - Brand colors: 9 shades (50-800)
     - Hint: Use a blue palette (#eff6ff to #1e40af)
   - Semantic colors: success, warning, error, info
     - Success: green (#10b981)
     - Warning: orange (#f59e0b)
     - Error: red (#ef4444)
     - Info: blue (#3b82f6)
   - Neutral colors: 9 shades (50-900)
   - Text colors: primary, secondary, tertiary
   - Background colors: primary, secondary, tertiary

2. **Create spacing scale**
   - Base: 4px increments
   - Scale: 0, 1 (4px), 2 (8px), 3 (12px), 4 (16px), 6 (24px), 8 (32px), 12 (48px), 16 (64px), 24 (96px)

3. **Create typography tokens**
   - Font families: sans, serif, mono
   - Font sizes: xs (12px) to 4xl (36px)
   - Font weights: normal (400), medium (500), semibold (600), bold (700)
   - Line heights: tight (1.25), normal (1.5), relaxed (1.75), loose (2)

4. **Create effect tokens**
   - Shadows: sm, base, md, lg, xl
   - Border radius: none, sm, base, md, lg, xl, 2xl, full
   - Transitions: fast (150ms), base (250ms), slow (350ms)

5. **Create dark theme** (in `[data-theme='dark']`)
   - Invert text and background colors
   - Adjust semantic colors to be brighter
   - Make shadows darker

### Part 2: Build the UI (index.html)

1. **Create header section**
   - Title
   - Theme toggle button

2. **Create color palette section**
   - Show all brand color shades (9 boxes)
   - Show semantic colors (4 boxes)

3. **Create spacing section**
   - Visualize spacing scale

4. **Create typography section**
   - Show font families (3 samples)
   - Show font sizes (8 samples)
   - Show font weights (4 samples)

5. **Create effects sections**
   - Show shadows (5 cards)
   - Show border radius (6 boxes)

### Part 3: Implement Theme Switching (script.js)

1. **Create ThemeManager class**
   - Store current theme
   - Get/set theme from localStorage

2. **Implement applyTheme()**
   - Set `data-theme` attribute on `<html>`
   - Update toggle button icon
   - Save to localStorage

3. **Implement toggleTheme()**
   - Switch between light and dark
   - Call applyTheme()

4. **Initialize on page load**
   - Load saved theme from localStorage
   - Apply saved or system preference

## ✅ Success Criteria

Your implementation should have:

- [ ] Complete color palette with 9 shades per color
- [ ] Spacing scale from 0-24
- [ ] Typography system (3 families, 8 sizes, 4 weights)
- [ ] Shadow and border radius tokens
- [ ] All tokens defined as CSS variables
- [ ] Light/dark mode implementation
- [ ] Theme persists across page reloads
- [ ] Smooth transitions between themes

## 💡 Hints

### CSS Variables Format
```css
:root {
  --color-brand-500: #3b82f6;
  --space-4: 1rem;
}

/* Use in styles */
.element {
  color: var(--color-brand-500);
  padding: var(--space-4);
}
```

### Applying Dark Theme
```css
[data-theme='dark'] {
  --color-bg-primary: #111827;
  --color-text-primary: #f9fafb;
}
```

### Theme Toggle in JavaScript
```javascript
const root = document.documentElement;
root.setAttribute('data-theme', 'dark'); // Apply dark theme
root.removeAttribute('data-theme');       // Remove (back to light)
```

### localStorage
```javascript
localStorage.setItem('theme', 'dark');
const theme = localStorage.getItem('theme');
```

## 📚 Resources

- [CSS Custom Properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Design Tokens Community Group](https://www.w3.org/community/design-tokens/)
- [localStorage (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

## 🚀 Getting Started

1. Open `index.html` in your browser
2. Start with `styles.css` - define your tokens
3. Build the UI in `index.html`
4. Implement theme switching in `script.js`
5. Test light/dark mode switching
6. Verify persistence (reload page)

## 🎁 Bonus Challenges

- Add a color picker to customize brand colors
- Export tokens as JSON
- Add more color palettes
- Implement system preference detection
- Add keyboard shortcut for theme toggle (Ctrl+Shift+T)

Good luck! 🎨

