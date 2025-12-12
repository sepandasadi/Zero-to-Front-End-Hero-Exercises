# Exercise 6: CSS Variables + Tailwind - Hints

## Hybrid Approach Benefits

**CSS Variables:**
- Runtime theming (instant theme switching)
- No rebuild required
- Works with vanilla JavaScript

**Tailwind:**
- Utility classes
- Design consistency
- Developer experience

**Combined = Best of both worlds!**

---

## Setup Pattern

### Step 1: Define CSS Variables

```css
/* src/index.css */
:root {
  /* Light theme */
  --color-primary: #7c3aed;
  --color-secondary: #fb7185;
  --color-background: #ffffff;
  --color-surface: #f9fafb;
  --color-text: #1f2937;
  --color-text-muted: #6b7280;
  --color-border: #e5e7eb;
}

[data-theme="dark"] {
  --color-primary: #a78bfa;
  --color-secondary: #fb7185;
  --color-background: #111827;
  --color-surface: #1f2937;
  --color-text: #f9fafb;
  --color-text-muted: #d1d5db;
  --color-border: #374151;
}

[data-theme="forest"] {
  --color-primary: #10b981;
  --color-secondary: #34d399;
  --color-background: #064e3b;
  --color-surface: #065f46;
  --color-text: #ecfdf5;
  --color-text-muted: #a7f3d0;
  --color-border: #059669;
}

[data-theme="ocean"] {
  --color-primary: #06b6d4;
  --color-secondary: #0ea5e9;
  --color-background: #0c4a6e;
  --color-surface: #075985;
  --color-text: #e0f2fe;
  --color-text-muted: #7dd3fc;
  --color-border: #0284c7;
}
```

---

### Step 2: Reference in Tailwind Config

```js
// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        text: 'var(--color-text)',
        'text-muted': 'var(--color-text-muted)',
        border: 'var(--color-border)',
      },
    },
  },
}
```

---

### Step 3: Use in Components

```jsx
// Components automatically get theme colors!
<div className="bg-background text-text">
  <div className="bg-surface border border-border p-6 rounded-lg">
    <h2 className="text-primary font-bold">Heading</h2>
    <p className="text-text-muted">Description</p>
    <button className="bg-primary text-white px-4 py-2 rounded">
      Button
    </button>
  </div>
</div>
```

---

### Step 4: Theme Switching

```jsx
function App() {
  const [theme, setTheme] = useState('light')

  const changeTheme = (newTheme) => {
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  // Load saved theme on mount
  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'light'
    setTheme(saved)
    document.documentElement.setAttribute('data-theme', saved)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Theme selector */}
      <div className="flex gap-2">
        <button onClick={() => changeTheme('light')}>Light</button>
        <button onClick={() => changeTheme('dark')}>Dark</button>
        <button onClick={() => changeTheme('forest')}>Forest</button>
        <button onClick={() => changeTheme('ocean')}>Ocean</button>
      </div>
    </div>
  )
}
```

---

## Advanced Patterns

### Pattern 1: Opacity Variations

```css
:root {
  --color-primary: #7c3aed;
  --color-primary-50: rgba(124, 58, 237, 0.05);
  --color-primary-100: rgba(124, 58, 237, 0.1);
  --color-primary-200: rgba(124, 58, 237, 0.2);
}
```

```js
// tailwind.config.js
colors: {
  primary: {
    DEFAULT: 'var(--color-primary)',
    50: 'var(--color-primary-50)',
    100: 'var(--color-primary-100)',
    200: 'var(--color-primary-200)',
  }
}
```

---

### Pattern 2: Component-Specific Variables

```css
:root {
  --button-padding-x: 1rem;
  --button-padding-y: 0.5rem;
  --button-radius: 0.5rem;
}

[data-theme="rounded"] {
  --button-radius: 9999px; /* Fully rounded */
}
```

---

### Pattern 3: Multi-Brand Support

```css
[data-brand="acme"] {
  --color-primary: #ff6b6b;
  --color-secondary: #4ecdc4;
}

[data-brand="techco"] {
  --color-primary: #0066ff;
  --color-secondary: #00ccff;
}
```

```jsx
// Switch brands at runtime!
document.documentElement.setAttribute('data-brand', 'acme')
```

---

## Complete Theme Selector Component

```jsx
function ThemeSelector({ currentTheme, onThemeChange }) {
  const themes = [
    { name: 'light', label: 'Light', icon: '☀️' },
    { name: 'dark', label: 'Dark', icon: '🌙' },
    { name: 'forest', label: 'Forest', icon: '🌲' },
    { name: 'ocean', label: 'Ocean', icon: '🌊' },
  ]

  return (
    <div className="flex gap-2">
      {themes.map(theme => (
        <button
          key={theme.name}
          onClick={() => onThemeChange(theme.name)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            currentTheme === theme.name
              ? 'bg-primary text-white'
              : 'bg-surface text-text hover:bg-border'
          }`}
        >
          <span className="mr-2">{theme.icon}</span>
          {theme.label}
        </button>
      ))}
    </div>
  )
}
```

---

## Benefits vs Trade-offs

### ✅ Benefits
- **Instant theme switching** (no rebuild)
- **Unlimited themes** (add via CSS only)
- **Runtime updates** (user customization)
- **Smaller bundle** (colors in CSS, not JS)
- **Works everywhere** (vanilla JS, React, Vue, etc.)

### ⚠️ Trade-offs
- **No IntelliSense** for variable values in CSS
- **More setup** than pure Tailwind
- **Harder to tree-shake** unused themes
- **No compile-time validation** of color values

---

## When to Use This Approach

**Good for:**
- Multi-tenant apps (different brands)
- User-customizable themes
- Theme marketplaces
- Apps needing 3+ themes

**Overkill for:**
- Simple light/dark mode (use Tailwind dark:)
- Single-theme apps
- Rapid prototypes

---

## Testing Checklist

- [ ] All 4+ themes work
- [ ] Theme persists after reload
- [ ] Tailwind classes use CSS variables
- [ ] Smooth transitions between themes
- [ ] All components adapt to themes
- [ ] No hardcoded colors remain
- [ ] Theme selector UI works

---

## Common Mistakes

### ❌ Mistake 1: Hardcoding colors

```jsx
// Wrong - bypasses the system
<div className="bg-purple-600">
```

```jsx
// Correct - uses CSS variable
<div className="bg-primary">
```

### ❌ Mistake 2: Forgetting transitions

```css
/* Add to all themed elements */
* {
  transition: background-color 0.2s ease,
              color 0.2s ease,
              border-color 0.2s ease;
}
```

### ❌ Mistake 3: Not using RGB for opacity

```css
/* Wrong - can't use with opacity */
--color-primary: #7c3aed;

/* Better - use RGB for opacity variants */
--color-primary-rgb: 124, 58, 237;
```

```js
// Then use with opacity
colors: {
  primary: 'rgb(var(--color-primary-rgb))',
  'primary-50': 'rgba(var(--color-primary-rgb), 0.05)',
}
```

---

Good luck creating multi-theme support! 🎨✨

