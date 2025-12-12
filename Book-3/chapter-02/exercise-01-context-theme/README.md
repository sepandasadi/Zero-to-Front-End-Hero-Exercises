# Exercise 1: Context API Theme System

## 🎯 Objective

Build a complete dark/light theme switcher using React Context API. Learn how to share state across components without prop drilling and implement best practices for Context performance.

## 📚 Concepts Covered

- Creating and using React Context
- Provider/Consumer pattern
- useContext hook
- Memoization with useMemo
- LocalStorage integration
- Component composition with Context

## 🎨 What You'll Build

A theme system that includes:
1. **ThemeProvider** - Manages theme state globally
2. **ThemeToggle** - Button to switch themes
3. **Themed Components** - Card, Button, Header that adapt to theme
4. **Persistence** - Theme saved to localStorage
5. **System Preference** - Detects user's OS theme preference

## 📋 Requirements

### Functional Requirements

**ThemeContext:**
- Create a Context with theme state (`'light'` or `'dark'`)
- Provide `setTheme` function to change themes
- Include `toggleTheme` helper function
- Memoize the context value

**ThemeProvider:**
- Initialize theme from localStorage or system preference
- Save theme changes to localStorage
- Wrap the app with this provider

**ThemeToggle Component:**
- Button to toggle between light/dark
- Show current theme
- Icon or emoji for visual feedback

**Themed Components:**
- Create at least 3 components that use the theme
- Cards, buttons, headers, etc.
- Each should adapt colors based on theme

### Technical Requirements

- ✅ Use `createContext` and `useContext`
- ✅ Memoize context value with `useMemo`
- ✅ Persist theme to localStorage
- ✅ Detect system preference on first load
- ✅ No prop drilling - all components use Context
- ✅ Clean CSS-in-JS or CSS variables approach

## 🚀 Getting Started

### Setup

```bash
cd starter
npm install
npm run dev
```

### File Structure

```
starter/
├── src/
│   ├── contexts/
│   │   └── ThemeContext.jsx        # Your Context implementation
│   ├── components/
│   │   ├── ThemeToggle.jsx         # Toggle button
│   │   ├── ThemedCard.jsx          # Sample themed component
│   │   ├── ThemedButton.jsx        # Sample themed component
│   │   └── Header.jsx              # Sample themed component
│   ├── App.jsx                     # Main app with provider
│   ├── main.jsx
│   └── index.css                   # Global styles
├── package.json
└── vite.config.js
```

## 💡 Implementation Steps

### Step 1: Create ThemeContext (15 min)

Create `src/contexts/ThemeContext.jsx`:

```jsx
import { createContext, useState, useMemo, useEffect } from 'react';

// 1. Create the Context
export const ThemeContext = createContext();

// 2. Create the Provider component
export function ThemeProvider({ children }) {
  // TODO: Initialize theme from localStorage or system preference
  const [theme, setTheme] = useState('light');

  // TODO: Toggle function
  const toggleTheme = () => {
    // Your code here
  };

  // TODO: Save to localStorage when theme changes
  useEffect(() => {
    // Your code here
  }, [theme]);

  // TODO: Memoize the value
  const value = useMemo(() => ({
    // Your code here
  }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Custom hook for consuming context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
```

### Step 2: Implement Theme Detection (10 min)

Add system preference detection:

```jsx
function getInitialTheme() {
  // Check localStorage first
  const saved = localStorage.getItem('theme');
  if (saved) return saved;

  // Check system preference
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  return 'light';
}
```

### Step 3: Create ThemeToggle Component (10 min)

```jsx
import { useTheme } from '../contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="theme-toggle">
      {theme === 'light' ? '🌙' : '☀️'}
      <span>{theme === 'light' ? 'Dark' : 'Light'} Mode</span>
    </button>
  );
}
```

### Step 4: Create Themed Components (20 min)

Create components that adapt to the theme:

```jsx
// ThemedCard.jsx
import { useTheme } from '../contexts/ThemeContext';

export function ThemedCard({ title, children }) {
  const { theme } = useTheme();

  return (
    <div className={`card card--${theme}`}>
      <h3>{title}</h3>
      {children}
    </div>
  );
}
```

### Step 5: Add Styles (10 min)

Use CSS variables or classes:

```css
.card--light {
  background: white;
  color: #333;
  border: 1px solid #ddd;
}

.card--dark {
  background: #2d2d2d;
  color: #f0f0f0;
  border: 1px solid #444;
}
```

## ✅ Acceptance Criteria

Your solution should:

- [ ] Theme switches between light and dark
- [ ] Theme persists across page reloads
- [ ] System preference detected on first visit
- [ ] No prop drilling - all components use Context
- [ ] Context value is memoized
- [ ] Custom useTheme hook throws error if used outside provider
- [ ] At least 3 components adapt to theme
- [ ] Clean, readable code with proper structure

## 🎁 Bonus Challenges

Want to go further? Try these:

1. **Multiple Themes** - Add a third theme (e.g., "high-contrast")
2. **Smooth Transitions** - Animate theme changes
3. **Theme Customization** - Let users pick accent colors
4. **CSS Variables** - Use `--color-bg`, `--color-text` CSS variables
5. **Auto Theme** - Auto-switch based on time of day
6. **Theme Switcher UI** - Radio buttons or dropdown instead of toggle

## 🔍 Common Pitfalls

**❌ Creating new objects in render:**
```jsx
// BAD - New object every render!
<ThemeContext.Provider value={{ theme, setTheme }}>
```

**✅ Memoize the value:**
```jsx
// GOOD - Only creates new object when theme changes
const value = useMemo(() => ({ theme, setTheme }), [theme]);
```

**❌ Not handling missing provider:**
```jsx
// BAD - Silent failure
export const useTheme = () => useContext(ThemeContext);
```

**✅ Throw helpful error:**
```jsx
// GOOD - Clear error message
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
```

## 📖 Key Takeaways

After completing this exercise, you should understand:

1. **Context Creation** - How to create and provide context
2. **Provider Pattern** - Wrapping your app with providers
3. **useContext Hook** - Consuming context in components
4. **Performance** - Why memoization matters in Context
5. **Custom Hooks** - Creating useTheme for better DX
6. **Persistence** - Integrating with localStorage

## 🎯 Success Metrics

You'll know you succeeded when:
- ✅ Theme changes instantly across all components
- ✅ Theme persists when refreshing the page
- ✅ No props passed for theme - everything uses Context
- ✅ Components re-render only when theme changes
- ✅ Code is clean and well-organized

## 📚 Related Concepts

This exercise prepares you for:
- Redux (similar provider pattern)
- Zustand (simpler global state)
- Component composition
- Custom hook patterns

---

**Need help?** Check `hints.md` for step-by-step guidance!
**Done?** Compare your solution with `solution/` folder!

**Estimated time:** 60-75 minutes

---

[← Back to Chapter 2](../README.md) | [Next Exercise: Redux Todo →](../exercise-02-redux-todo/README.md)

