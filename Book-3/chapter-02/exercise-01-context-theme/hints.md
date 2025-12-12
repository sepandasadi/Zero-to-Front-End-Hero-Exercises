# Hints: Context API Theme System

Need a little help? Here are progressive hints to guide you through the exercise.

## 🎯 General Approach

Start with the Context, then the Provider, then the components. Test after each step!

---

## Hint 1: Creating the Context

<details>
<summary>Click to reveal hint about Context creation</summary>

Create your Context with `createContext()`:

```jsx
import { createContext } from 'react';

export const ThemeContext = createContext();
```

Then create a Provider component that will wrap your app and provide the theme state to all children.

</details>

---

## Hint 2: Initializing Theme State

<details>
<summary>Click to reveal hint about initial theme</summary>

Check localStorage first, then system preference:

```jsx
function getInitialTheme() {
  // 1. Check localStorage
  const saved = localStorage.getItem('theme');
  if (saved) return saved;

  // 2. Check system preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

// In your Provider:
const [theme, setTheme] = useState(getInitialTheme);
```

</details>

---

## Hint 3: Saving to LocalStorage

<details>
<summary>Click to reveal hint about persistence</summary>

Use `useEffect` to save theme whenever it changes:

```jsx
useEffect(() => {
  localStorage.setItem('theme', theme);
}, [theme]);
```

Simple as that! The effect runs whenever theme changes.

</details>

---

## Hint 4: Memoizing the Context Value

<details>
<summary>Click to reveal hint about performance</summary>

Use `useMemo` to prevent unnecessary re-renders:

```jsx
const value = useMemo(() => ({
  theme,
  setTheme,
  toggleTheme: () => setTheme(prev => prev === 'light' ? 'dark' : 'light')
}), [theme]);
```

This ensures components only re-render when theme actually changes, not on every Provider render.

</details>

---

## Hint 5: Custom useTheme Hook

<details>
<summary>Click to reveal hint about custom hook</summary>

Create a custom hook for better developer experience:

```jsx
export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context;
}
```

Now components can just `const { theme } = useTheme()` instead of `useContext(ThemeContext)`.

</details>

---

## Hint 6: Wrapping Your App

<details>
<summary>Click to reveal hint about Provider placement</summary>

In `App.jsx` or `main.jsx`, wrap everything with ThemeProvider:

```jsx
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Header />
      <main>
        <ThemeToggle />
        <ThemedCard title="Card 1">Content</ThemedCard>
      </main>
    </ThemeProvider>
  );
}
```

</details>

---

## Hint 7: Using Theme in Components

<details>
<summary>Click to reveal hint about consuming theme</summary>

Any component can now use the theme:

```jsx
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

No props needed! The component gets theme directly from Context.

</details>

---

## Hint 8: Styling Options

<details>
<summary>Click to reveal hint about styling approaches</summary>

**Option 1: CSS Classes**
```css
.card--light { background: white; color: #333; }
.card--dark { background: #2d2d2d; color: #f0f0f0; }
```

**Option 2: CSS Variables**
```jsx
useEffect(() => {
  document.documentElement.setAttribute('data-theme', theme);
}, [theme]);
```

```css
:root[data-theme="light"] {
  --bg: white;
  --text: #333;
}
:root[data-theme="dark"] {
  --bg: #2d2d2d;
  --text: #f0f0f0;
}
```

**Option 3: Inline Styles (for this exercise)**
```jsx
const styles = theme === 'light'
  ? { background: 'white', color: '#333' }
  : { background: '#2d2d2d', color: '#f0f0f0' };

return <div style={styles}>...</div>
```

</details>

---

## Hint 9: Theme Toggle Button

<details>
<summary>Click to reveal hint about toggle button</summary>

```jsx
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
    >
      {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </button>
  );
}
```

Simple! Just call `toggleTheme` on click.

</details>

---

## Hint 10: Debugging

<details>
<summary>Click to reveal debugging tips</summary>

**Check Context is providing:**
```jsx
console.log('Theme Provider rendering, theme:', theme);
```

**Check components are receiving:**
```jsx
const { theme } = useTheme();
console.log('Component received theme:', theme);
```

**Check localStorage:**
```javascript
// In browser console:
localStorage.getItem('theme')
```

**Common issues:**
- Components not updating? Check if value is memoized
- Error about Context? Make sure ThemeProvider wraps your app
- Theme not persisting? Check if useEffect is saving to localStorage

</details>

---

## Complete Solution Outline

<details>
<summary>Click to reveal complete code structure</summary>

**ThemeContext.jsx:**
1. Create Context with `createContext()`
2. Create ThemeProvider component
3. Initialize state with localStorage/system preference
4. Create toggleTheme function
5. Save to localStorage with useEffect
6. Memoize value with useMemo
7. Create useTheme custom hook

**App.jsx:**
1. Import ThemeProvider
2. Wrap app with ThemeProvider
3. Include ThemeToggle and themed components

**Components:**
1. Import and use useTheme hook
2. Destructure theme from context
3. Apply conditional styling based on theme

</details>

---

**Still stuck?** Check the solution folder for a complete working example!

[← Back to Exercise](./README.md)

