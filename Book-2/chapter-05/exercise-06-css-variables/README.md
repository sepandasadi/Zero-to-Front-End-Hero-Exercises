# Exercise 6: Tailwind + CSS Variables

## Learning Objectives

By the end of this exercise, you will:

- ✅ Combine Tailwind with CSS custom properties
- ✅ Create runtime-switchable themes
- ✅ Build multi-brand support system
- ✅ Implement instant theme switching (no rebuild)
- ✅ Understand when to use this hybrid approach

**Time:** 75-90 minutes
**Difficulty:** Advanced

---

## Scenario

**"DesignFlow"** is expanding! They're launching:
- **DesignFlow Pro** (purple theme)
- **DesignFlow Teams** (blue theme)
- **DesignFlow Enterprise** (dark gray theme)

Each brand needs different colors, but you can't rebuild for each one. **Solution: Tailwind + CSS Variables!**

---

## Why This Approach?

**Traditional Tailwind:**
```jsx
<div className="bg-blue-500 text-white">
  // Hardcoded blue - can't change at runtime
</div>
```

**Tailwind + CSS Variables:**
```jsx
// Config
colors: {
  primary: 'var(--color-primary)',
}

// CSS
:root { --color-primary: #3b82f6; }
[data-theme="pro"] { --color-primary: #7c3aed; }

// Usage
<div className="bg-primary text-white">
  // Adapts to theme instantly!
</div>
```

**Benefits:**
- ✅ Change themes at runtime (no rebuild!)
- ✅ Multi-brand support
- ✅ User-customizable colors
- ✅ Still use Tailwind utilities

---

## Part 1: Setup CSS Variables (15 minutes)

### **Step 1: Define Color Variables**

Create `src/themes.css`:

```css
/* Default theme (Pro - Purple) */
:root {
  --color-primary: 237 59 237;      /* HSL or RGB (no commas!) */
  --color-secondary: 107 114 128;
  --color-accent: 20 184 166;

  --color-success: 16 185 129;
  --color-warning: 245 158 11;
  --color-error: 239 68 68;

  --color-surface: 255 255 255;
  --color-background: 249 250 251;
  --color-text: 17 24 39;
  --color-text-muted: 107 114 128;

  --color-border: 229 231 235;
}

/* Teams theme (Blue) */
[data-theme="teams"] {
  --color-primary: 59 130 246;
  --color-secondary: 107 114 128;
  --color-accent: 16 185 129;

  /* Same semantic colors */
  --color-surface: 255 255 255;
  --color-background: 249 250 251;
  --color-text: 17 24 39;
}

/* Enterprise theme (Dark Gray) */
[data-theme="enterprise"] {
  --color-primary: 71 85 105;
  --color-secondary: 148 163 184;
  --color-accent: 251 146 60;

  --color-surface: 255 255 255;
  --color-background: 248 250 252;
  --color-text: 15 23 42;
}

/* Dark mode for all themes */
[data-theme="pro"].dark,
[data-theme="teams"].dark,
[data-theme="enterprise"].dark {
  --color-surface: 30 41 59;
  --color-background: 15 23 42;
  --color-text: 248 250 252;
  --color-text-muted: 148 163 184;
  --color-border: 51 65 85;
}
```

**Why RGB values?** So we can use opacity:
```jsx
<div className="bg-primary/50">  // 50% opacity!
```

### **Step 2: Import in main CSS**

```css
/* src/index.css */
@import './themes.css';

@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## Part 2: Configure Tailwind (10 minutes)

Reference CSS variables in your config:

```js
// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Reference CSS variables
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',

        success: 'rgb(var(--color-success) / <alpha-value>)',
        warning: 'rgb(var(--color-warning) / <alpha-value>)',
        error: 'rgb(var(--color-error) / <alpha-value>)',

        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        background: 'rgb(var(--color-background) / <alpha-value>)',
        'text-base': 'rgb(var(--color-text) / <alpha-value>)',
        'text-muted': 'rgb(var(--color-text-muted) / <alpha-value>)',

        border: 'rgb(var(--color-border) / <alpha-value>)',
      }
    }
  }
}
```

**Now you can use:**
```jsx
<div className="bg-primary text-surface">
<div className="bg-primary/50">  // 50% opacity!
<div className="border-border">
```

---

## Part 3: Theme Switcher Component (20 minutes)

Build a theme selector:

```tsx
type Theme = 'pro' | 'teams' | 'enterprise';

function ThemeSelector() {
  const [theme, setTheme] = useState<Theme>('pro');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') as Theme || 'pro';
    const savedDark = localStorage.getItem('darkMode') === 'true';

    setTheme(savedTheme);
    setIsDark(savedDark);

    applyTheme(savedTheme, savedDark);
  }, []);

  const applyTheme = (newTheme: Theme, dark: boolean) => {
    const html = document.documentElement;

    // Set data-theme attribute
    html.setAttribute('data-theme', newTheme);

    // Toggle dark class
    if (dark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }

    // Save to localStorage
    localStorage.setItem('theme', newTheme);
    localStorage.setItem('darkMode', String(dark));
  };

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    applyTheme(newTheme, isDark);
  };

  const toggleDark = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    applyTheme(theme, newDark);
  };

  return (
    <div className="flex items-center gap-4">
      {/* Theme selector */}
      <select
        value={theme}
        onChange={(e) => changeTheme(e.target.value as Theme)}
        className="
          px-3 py-2 rounded-lg
          bg-surface border-border border
          text-text-base
        "
      >
        <option value="pro">Pro (Purple)</option>
        <option value="teams">Teams (Blue)</option>
        <option value="enterprise">Enterprise (Gray)</option>
      </select>

      {/* Dark mode toggle */}
      <button
        onClick={toggleDark}
        className="
          p-2 rounded-lg
          bg-surface border-border border
          hover:bg-primary/10
          text-text-base
        "
      >
        {isDark ? '☀️' : '🌙'}
      </button>
    </div>
  );
}
```

---

## Part 4: Update Components (15 minutes)

Refactor your components to use semantic colors:

### **Before (Hardcoded):**

```jsx
<button className="bg-purple-600 text-white hover:bg-purple-700">
  Submit
</button>
```

### **After (Semantic):**

```jsx
<button className="bg-primary text-surface hover:bg-primary/90">
  Submit
</button>
```

**Update all components:**

```jsx
// Navigation
<nav className="bg-surface border-b border-border">

// Card
<div className="bg-surface border border-border rounded-xl">

// Text
<h1 className="text-text-base">
<p className="text-text-muted">

// Button variants
const variants = {
  primary: 'bg-primary text-surface hover:bg-primary/90',
  secondary: 'bg-secondary text-surface hover:bg-secondary/90',
  success: 'bg-success text-surface hover:bg-success/90',
};

// Alert types
const types = {
  success: 'bg-success/10 border-success text-success',
  warning: 'bg-warning/10 border-warning text-warning',
  error: 'bg-error/10 border-error text-error',
};
```

---

## Part 5: Theme Preview (15 minutes)

Build a theme preview showing all 3 themes side-by-side:

```tsx
function ThemePreview() {
  const themes: Theme[] = ['pro', 'teams', 'enterprise'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {themes.map(theme => (
        <div key={theme} data-theme={theme} className="bg-surface border border-border rounded-xl p-6">
          <h3 className="text-xl font-bold text-text-base mb-4">
            {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </h3>

          {/* Color swatches */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-primary"></div>
              <span className="text-text-muted text-sm">Primary</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-secondary"></div>
              <span className="text-text-muted text-sm">Secondary</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-accent"></div>
              <span className="text-text-muted text-sm">Accent</span>
            </div>
          </div>

          {/* Component preview */}
          <button className="w-full px-4 py-2 bg-primary text-surface rounded-lg hover:bg-primary/90">
            Button
          </button>
        </div>
      ))}
    </div>
  );
}
```

---

## Part 6: Custom Theme Builder (Bonus - 20 minutes)

Allow users to create custom themes:

```tsx
function CustomThemeBuilder() {
  const [customColors, setCustomColors] = useState({
    primary: '#7c3aed',
    secondary: '#6b7280',
    accent: '#14b8a6',
  });

  const applyCustomTheme = () => {
    const root = document.documentElement;

    // Convert hex to RGB
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}`
        : '0 0 0';
    };

    root.style.setProperty('--color-primary', hexToRgb(customColors.primary));
    root.style.setProperty('--color-secondary', hexToRgb(customColors.secondary));
    root.style.setProperty('--color-accent', hexToRgb(customColors.accent));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">Custom Theme</h3>

      <div className="space-y-2">
        <label>
          Primary:
          <input
            type="color"
            value={customColors.primary}
            onChange={(e) => setCustomColors({ ...customColors, primary: e.target.value })}
          />
        </label>

        <label>
          Secondary:
          <input
            type="color"
            value={customColors.secondary}
            onChange={(e) => setCustomColors({ ...customColors, secondary: e.target.value })}
          />
        </label>

        <label>
          Accent:
          <input
            type="color"
            value={customColors.accent}
            onChange={(e) => setCustomColors({ ...customColors, accent: e.target.value })}
          />
        </label>
      </div>

      <button onClick={applyCustomTheme} className="px-4 py-2 bg-primary text-surface rounded-lg">
        Apply Theme
      </button>
    </div>
  );
}
```

---

## Deliverables

Your app should have:

- [ ] CSS variables defined for all theme tokens
- [ ] Tailwind config references CSS variables
- [ ] 3 brand themes (Pro, Teams, Enterprise)
- [ ] Dark mode for all themes
- [ ] Theme selector component
- [ ] All components use semantic colors
- [ ] Instant theme switching (no rebuild!)
- [ ] localStorage persistence
- [ ] Theme preview showcase
- [ ] Bonus: Custom theme builder

---

## Testing Checklist

- [ ] Switch between Pro/Teams/Enterprise - colors change instantly
- [ ] Toggle dark mode in each theme
- [ ] Reload page - theme persists
- [ ] All components adapt to theme
- [ ] Opacity modifiers work (`bg-primary/50`)
- [ ] Border colors adapt
- [ ] Text colors have good contrast

---

## Key Learnings

- ✅ CSS variables enable runtime theming
- ✅ Tailwind can reference CSS variables
- ✅ RGB format enables opacity (`/50`)
- ✅ `data-theme` attribute for theme switching
- ✅ Semantic color names (`primary` vs `purple-600`)
- ✅ No rebuild needed for theme changes
- ✅ Perfect for multi-brand applications

**You've mastered the hybrid approach!** 🎨✨

---

## When to Use This Pattern

**Use Tailwind + CSS Variables when:**
- ✅ Multi-brand support needed
- ✅ User-customizable themes
- ✅ Runtime theme switching
- ✅ A/B testing different color schemes

**Use pure Tailwind when:**
- ❌ Single brand
- ❌ No runtime theme changes
- ❌ Simpler mental model preferred

---

## Next Steps

Tackle the **Challenge Project: Modern Dashboard** to put everything together!

