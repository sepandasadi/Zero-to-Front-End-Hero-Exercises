# Exercise 4: Dark Mode Implementation

## Learning Objectives

By the end of this exercise, you will:

- ✅ Configure Tailwind for class-based dark mode
- ✅ Create dark mode color variants
- ✅ Build a theme toggle component
- ✅ Persist theme preference with localStorage
- ✅ Detect system color scheme preference
- ✅ Apply dark mode across entire app

**Time:** 60-75 minutes
**Difficulty:** Intermediate

---

## Scenario

Users of **"DesignFlow"** work late into the night. They need dark mode to reduce eye strain! Your job: implement a complete dark mode system with toggle, persistence, and system detection.

---

## Part 1: Configure Dark Mode (10 minutes)

### **Step 1: Update Tailwind Config**

```js
// tailwind.config.js
export default {
  darkMode: 'class',  // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Add dark mode specific colors
        'dark-bg': '#0f172a',
        'dark-surface': '#1e293b',
        'dark-border': '#334155',
      }
    }
  }
}
```

### **Step 2: Test Basic Dark Mode**

Add `dark` class to `<html>` temporarily:

```html
<html class="dark">
```

Then test dark variants:

```jsx
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  This text changes color!
</div>
```

---

## Part 2: Create Theme Toggle (15 minutes)

Build a toggle button component:

### **Requirements:**

- [ ] Sun icon for light mode
- [ ] Moon icon for dark mode
- [ ] Smooth transition between icons
- [ ] Accessible (ARIA labels)
- [ ] Works in navigation bar

### **Example:**

```jsx
function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="
        p-2 rounded-lg
        bg-gray-200 dark:bg-gray-700
        text-gray-800 dark:text-gray-200
        hover:bg-gray-300 dark:hover:bg-gray-600
        transition-colors
      "
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}
```

---

## Part 3: Persist Theme with localStorage (15 minutes)

Users expect their theme choice to persist across sessions!

### **Requirements:**

- [ ] Save theme preference to localStorage
- [ ] Load theme on mount
- [ ] Prevent flash of wrong theme (FOUC)

### **Implementation:**

```jsx
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  // Load theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);

    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

---

## Part 4: System Preference Detection (10 minutes)

Respect the user's system settings by default!

### **Requirements:**

- [ ] Detect `prefers-color-scheme` media query
- [ ] Use system preference if no saved preference
- [ ] Allow manual override

### **Implementation:**

```jsx
useEffect(() => {
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    // Detect system preference
    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    setTheme(systemPrefersDark ? 'dark' : 'light');
  }
}, []);

// Listen for system preference changes
useEffect(() => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  const handleChange = (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  };

  mediaQuery.addEventListener('change', handleChange);
  return () => mediaQuery.removeEventListener('change', handleChange);
}, []);
```

---

## Part 5: Style Components for Dark Mode (20 minutes)

Update all your components with dark mode variants:

### **Navigation:**

```jsx
<nav className="
  bg-white dark:bg-gray-900
  border-b border-gray-200 dark:border-gray-800
  shadow-sm
">
```

### **Cards:**

```jsx
<div className="
  bg-white dark:bg-gray-800
  border border-gray-200 dark:border-gray-700
  shadow-md dark:shadow-gray-900/30
  rounded-xl
  p-6
">
```

### **Text:**

```jsx
<h1 className="text-gray-900 dark:text-white">
<p className="text-gray-600 dark:text-gray-300">
<a className="text-blue-600 dark:text-blue-400 hover:underline">
```

### **Buttons:**

```jsx
const variants = {
  primary: `
    bg-purple-600 dark:bg-purple-500
    text-white
    hover:bg-purple-700 dark:hover:bg-purple-600
  `,
  secondary: `
    bg-gray-200 dark:bg-gray-700
    text-gray-900 dark:text-gray-100
    hover:bg-gray-300 dark:hover:bg-gray-600
  `,
};
```

### **Inputs:**

```jsx
<input className="
  bg-white dark:bg-gray-800
  border-gray-300 dark:border-gray-600
  text-gray-900 dark:text-white
  placeholder-gray-500 dark:placeholder-gray-400
  focus:ring-purple-500 dark:focus:ring-purple-400
  focus:border-purple-500 dark:focus:border-purple-400
" />
```

---

## Part 6: Prevent Flash of Unstyled Content (FOUC)

Add this script to your `index.html` **before** React loads:

```html
<script>
  // Prevent FOUC by applying theme immediately
  (function() {
    const theme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (theme === 'dark' || (!theme && systemPrefersDark)) {
      document.documentElement.classList.add('dark');
    }
  })();
</script>
```

This ensures the correct theme is applied **before** React renders!

---

## Bonus: Smooth Theme Transitions

Add this to your CSS for smooth color transitions:

```css
/* src/index.css */
* {
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

/* But disable for reduced motion users */
@media (prefers-reduced-motion: reduce) {
  * {
    transition: none;
  }
}
```

---

## Deliverables

Your app should have:

- [ ] Dark mode configuration in Tailwind
- [ ] Theme toggle button (accessible)
- [ ] localStorage persistence
- [ ] System preference detection
- [ ] All components styled for both themes
- [ ] No FOUC (flash of wrong theme)
- [ ] Smooth transitions between themes
- [ ] Good contrast in both modes

---

## Testing Checklist

Test your implementation:

- [ ] Toggle works (light ↔ dark)
- [ ] Reload page - theme persists
- [ ] Clear localStorage - uses system preference
- [ ] Change system preference - app updates (if no saved theme)
- [ ] All text is readable in both modes
- [ ] Images/logos look good in both modes
- [ ] Shadows work in dark mode
- [ ] Borders visible in dark mode

---

## Common Pitfalls

### **Pitfall 1: Forgetting borders**

```jsx
// ❌ Border invisible in dark mode
<div className="border">

// ✅ Border visible in both modes
<div className="border border-gray-200 dark:border-gray-700">
```

### **Pitfall 2: Hard-coded colors**

```jsx
// ❌ Always gray (doesn't adapt)
<p className="text-gray-600">

// ✅ Adapts to theme
<p className="text-gray-600 dark:text-gray-300">
```

### **Pitfall 3: Missing contrast**

Test with WCAG contrast checkers!

- Light mode: Dark text on light bg
- Dark mode: Light text on dark bg

---

## Extension Challenges

1. **Add a third theme** (e.g., "auto" that follows system)
2. **Theme selector** with 3+ themes (light, dark, purple, ocean)
3. **Section-specific themes** (dark header, light content)
4. **Animated toggle** (slide/fade transition)
5. **Theme preview** (show both themes side-by-side)

---

## Hints

<details>
<summary>Hint 1: useContext for global theme</summary>

```jsx
// ThemeContext.jsx
export const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

// Usage
const { theme, toggleTheme } = useTheme();
```
</details>

<details>
<summary>Hint 2: Color scale for dark mode</summary>

**Light mode:** Use lower numbers (100, 200, 300)
**Dark mode:** Use higher numbers (700, 800, 900)

```jsx
bg-gray-100 dark:bg-gray-900
text-gray-900 dark:text-gray-100
```
</details>

<details>
<summary>Hint 3: Images in dark mode</summary>

For logos/images that need dark mode variants:

```jsx
<img
  src={theme === 'dark' ? '/logo-dark.svg' : '/logo-light.svg'}
  alt="Logo"
/>
```

Or use CSS filter:

```jsx
<img className="dark:brightness-90 dark:contrast-90" src="..." />
```
</details>

---

## Key Learnings

- ✅ `darkMode: 'class'` enables class-based dark mode
- ✅ `dark:` prefix for dark mode variants
- ✅ localStorage persists user preference
- ✅ `prefers-color-scheme` detects system preference
- ✅ FOUC prevention with inline script
- ✅ Good contrast required in both modes
- ✅ Transitions make theme switching smooth

**Your app now has professional dark mode support!** 🌙✨

---

## Next Steps

Move on to **Exercise 5: Component Wrappers & Patterns** to learn professional component architecture!

