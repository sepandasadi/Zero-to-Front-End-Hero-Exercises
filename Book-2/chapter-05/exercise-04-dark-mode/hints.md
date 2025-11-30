# Exercise 4: Dark Mode Implementation - Hints

## Configuration

### Step 1: Enable Dark Mode in Config

```js
// tailwind.config.js
export default {
  darkMode: 'class', // Enable class-based dark mode
  // ... rest of config
}
```

**Strategies:**
- `'media'` = Uses system preference (prefers-color-scheme)
- `'class'` = Manual toggle with `.dark` class on `<html>`

We use `'class'` for manual control!

---

## Dark Mode State Management

### Complete Theme Toggle Hook

```jsx
import { useState, useEffect } from 'react'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  // Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    // Use saved theme, or fall back to system preference
    if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)

    if (!darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    // ...
  )
}
```

---

## Dark Mode Variants

### Basic Syntax

```jsx
// Light mode: white background
// Dark mode: gray-800 background
className="bg-white dark:bg-gray-800"

// Light mode: gray-900 text
// Dark mode: white text
className="text-gray-900 dark:text-white"
```

**Pattern:** `property dark:dark-property`

---

## Common Patterns

### Background Colors

```jsx
// Page background
className="bg-white dark:bg-gray-900"

// Card background
className="bg-white dark:bg-gray-800"

// Elevated surface
className="bg-gray-50 dark:bg-gray-800"
```

### Text Colors

```jsx
// Primary text
className="text-gray-900 dark:text-white"

// Secondary text
className="text-gray-600 dark:text-gray-300"

// Muted text
className="text-gray-500 dark:text-gray-400"
```

### Borders

```jsx
className="border border-gray-200 dark:border-gray-700"
```

### Shadows

```jsx
// Light shadow in light mode, no shadow in dark
className="shadow-lg dark:shadow-none"

// Or use dark-specific shadow
className="shadow-lg dark:shadow-gray-700/50"
```

---

## Theme Toggle Button

### Sun/Moon Icon Toggle

```jsx
<button
  onClick={toggleDarkMode}
  className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors"
  aria-label="Toggle dark mode"
>
  {darkMode ? '☀️' : '🌙'}
</button>
```

### Animated Toggle

```jsx
<button
  onClick={toggleDarkMode}
  className="relative w-14 h-7 bg-gray-300 dark:bg-gray-600 rounded-full transition-colors"
>
  <div className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform ${
    darkMode ? 'translate-x-7' : 'translate-x-0'
  }`} />
</button>
```

---

## Complete Component Example

### Card with Dark Mode

```jsx
<div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg dark:shadow-none transition-colors">
  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
    Card Title
  </h2>
  <p className="text-gray-600 dark:text-gray-300">
    This card works in both light and dark mode!
  </p>
  <button className="mt-4 px-4 py-2 bg-purple-600 dark:bg-purple-500 text-white rounded-lg hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors">
    Button
  </button>
</div>
```

---

## Color Palette Strategy

### Recommended Grays for Dark Mode

```jsx
// Backgrounds
bg-white      → dark:bg-gray-900  (page)
bg-gray-50    → dark:bg-gray-800  (card)
bg-gray-100   → dark:bg-gray-700  (elevated)

// Text
text-gray-900 → dark:text-white   (heading)
text-gray-700 → dark:text-gray-200 (body)
text-gray-600 → dark:text-gray-300 (secondary)
text-gray-500 → dark:text-gray-400 (muted)

// Borders
border-gray-200 → dark:border-gray-700
border-gray-300 → dark:border-gray-600
```

---

## Transitions

### Smooth Theme Transitions

Add to base CSS:

```css
/* src/index.css */
* {
  @apply transition-colors duration-200;
}
```

Or per element:

```jsx
className="transition-colors duration-200"
```

---

## System Preference Detection

```jsx
// Detect system color scheme
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

// Listen for changes
useEffect(() => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  const handleChange = (e) => {
    if (!localStorage.getItem('theme')) {
      // Only apply if user hasn't set preference
      setDarkMode(e.matches)
      document.documentElement.classList.toggle('dark', e.matches)
    }
  }

  mediaQuery.addEventListener('change', handleChange)
  return () => mediaQuery.removeEventListener('change', handleChange)
}, [])
```

---

## Testing Checklist

- [ ] Dark mode toggles on button click
- [ ] Theme persists after page reload
- [ ] All backgrounds adapt to dark mode
- [ ] All text colors readable in dark mode
- [ ] Borders visible in dark mode
- [ ] Buttons work in both themes
- [ ] Transitions are smooth
- [ ] Respects system preference (if no saved theme)
- [ ] No flash of wrong theme on load

---

## Common Mistakes

### ❌ Mistake 1: Forgetting dark class on html

```jsx
// Wrong - won't work
document.body.classList.add('dark')

// Correct - must be on html element
document.documentElement.classList.add('dark')
```

### ❌ Mistake 2: Not saving to localStorage

```jsx
// Wrong - loses theme on reload
const toggleDarkMode = () => {
  setDarkMode(!darkMode)
  document.documentElement.classList.toggle('dark')
}

// Correct - persists theme
const toggleDarkMode = () => {
  setDarkMode(!darkMode)
  document.documentElement.classList.toggle('dark')
  localStorage.setItem('theme', !darkMode ? 'dark' : 'light')
}
```

### ❌ Mistake 3: Poor contrast in dark mode

```jsx
// Wrong - hard to read
className="bg-gray-900 text-gray-800 dark:bg-gray-100 dark:text-gray-300"

// Correct - good contrast
className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white"
```

---

## Quick Reference

```jsx
// Common dark mode patterns

// Backgrounds
className="bg-white dark:bg-gray-900"           // Page
className="bg-gray-50 dark:bg-gray-800"         // Card
className="bg-gray-100 dark:bg-gray-700"        // Input

// Text
className="text-gray-900 dark:text-white"       // Heading
className="text-gray-600 dark:text-gray-300"    // Body
className="text-gray-500 dark:text-gray-400"    // Muted

// Borders
className="border-gray-200 dark:border-gray-700"

// Buttons
className="bg-purple-600 dark:bg-purple-500 hover:bg-purple-700 dark:hover:bg-purple-600"

// Toggle button
<button onClick={toggleDarkMode}>
  {darkMode ? '☀️' : '🌙'}
</button>
```

---

Good luck! Test in both modes! 🌙☀️

