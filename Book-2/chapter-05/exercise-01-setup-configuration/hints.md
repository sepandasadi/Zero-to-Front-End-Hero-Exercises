# Exercise 1: Tailwind Setup & Configuration - Hints

## Getting Started

### Step 1: Installation
```bash
npm install
npm run dev
```

The dev server should start at `http://localhost:5173`

---

## Configuration Hints

### Hint 1: Content Paths

The `content` array tells Tailwind which files to scan:

```js
content: [
  "./index.html",              // Scan index.html
  "./src/**/*.{js,jsx,ts,tsx}", // Scan all JS/TS files in src/
],
```

**Why it matters:** Tailwind only generates CSS for classes it finds in these files (JIT mode).

---

### Hint 2: Extend vs Replace

**Always use `extend` unless you want to lose default values!**

```js
// ✅ Good - Keeps all Tailwind defaults
theme: {
  extend: {
    colors: {
      primary: '#7c3aed',  // Adds to existing colors
    }
  }
}

// ❌ Bad - Loses all default colors!
theme: {
  colors: {
    primary: '#7c3aed',  // Only this color exists now!
  }
}
```

---

### Hint 3: Complete Color Configuration

```js
extend: {
  colors: {
    primary: '#7c3aed',
    secondary: '#fb7185',
    accent: '#14b8a6',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
}
```

**Usage:**
```jsx
<div className="bg-primary text-white">Primary color</div>
<div className="bg-success text-white">Success color</div>
```

---

### Hint 4: Custom Spacing

```js
extend: {
  spacing: {
    'header': '4.5rem',   // 72px
    'sidebar': '17.5rem', // 280px
  },
}
```

**Usage:**
```jsx
<div className="h-header">Height: 72px</div>
<div className="w-sidebar">Width: 280px</div>
<div className="p-header">Padding: 72px</div>
<div className="mt-sidebar">Margin-top: 280px</div>
```

Spacing values can be used for: width, height, padding, margin, gap, etc.

---

### Hint 5: Font Family Configuration

First, add Google Fonts to `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono&display=swap" rel="stylesheet">
```

Then configure in `tailwind.config.js`:

```js
extend: {
  fontFamily: {
    sans: ['Inter', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace'],
  },
}
```

**Usage:**
```jsx
<p className="font-sans">Inter font</p>
<code className="font-mono">JetBrains Mono</code>
```

---

### Hint 6: Custom Font Sizes

```js
extend: {
  fontSize: {
    'display': ['3rem', { lineHeight: '3.5rem' }],
  },
}
```

The array format: `[fontSize, { lineHeight, letterSpacing, etc. }]`

**Usage:**
```jsx
<h1 className="text-display">Display heading</h1>
```

---

### Hint 7: Border Radius

```js
extend: {
  borderRadius: {
    'card': '1.25rem',
  },
}
```

**Usage:**
```jsx
<div className="rounded-card">Custom radius</div>
```

---

### Hint 8: Box Shadows

```js
extend: {
  boxShadow: {
    'card': '0 4px 12px rgba(0, 0, 0, 0.1)',
    'card-hover': '0 8px 24px rgba(0, 0, 0, 0.15)',
  },
}
```

**Usage:**
```jsx
<div className="shadow-card hover:shadow-card-hover transition-shadow">
  Card with custom shadow
</div>
```

---

## Component Examples

### Color Swatch Component

```jsx
function ColorSwatch({ color, name, colorClass }) {
  return (
    <div className={`${colorClass} p-6 rounded-lg text-white font-semibold shadow-md`}>
      <div className="text-sm opacity-90">{name}</div>
      <div className="text-xs opacity-75 mt-1">{color}</div>
    </div>
  );
}

// Usage
<ColorSwatch
  color="#7c3aed"
  name="Primary"
  colorClass="bg-primary"
/>
```

---

### Spacing Demo

```jsx
function SpacingDemo() {
  return (
    <div className="space-y-4">
      <div className="p-2 bg-primary text-white">p-2 (8px)</div>
      <div className="p-4 bg-primary text-white">p-4 (16px)</div>
      <div className="p-6 bg-primary text-white">p-6 (24px)</div>
      <div className="p-header bg-primary text-white">p-header (72px)</div>
    </div>
  );
}
```

---

### Typography Showcase

```jsx
function TypographyShowcase() {
  return (
    <div className="space-y-6">
      <h1 className="text-display font-bold">Display Heading</h1>
      <h2 className="text-4xl font-bold">4XL Heading</h2>
      <h3 className="text-2xl font-semibold">2XL Heading</h3>
      <p className="text-base">Base body text (16px)</p>
      <p className="text-sm text-gray-600">Small text (14px)</p>
      <code className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
        Code snippet
      </code>
    </div>
  );
}
```

---

### Card Example

```jsx
function ExampleCard() {
  return (
    <div className="rounded-card shadow-card hover:shadow-card-hover transition-shadow p-6 bg-white">
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        Custom Card
      </h3>
      <p className="text-gray-600">
        This card uses custom border radius and shadows from your Tailwind config!
      </p>
      <button className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-purple-700 transition-colors">
        Action Button
      </button>
    </div>
  );
}
```

---

## Common Issues

### Issue 1: Styles not applying

**Solutions:**
1. Restart dev server (`Ctrl+C`, then `npm run dev`)
2. Check browser console for errors
3. Verify `content` paths include your files
4. Make sure `@tailwind` directives are in CSS file

---

### Issue 2: Custom values not working

**Checklist:**
- [ ] Did you use `extend`?
- [ ] Did you restart dev server?
- [ ] Is the syntax correct?
- [ ] Are you using the right class names?

```js
// Config
borderRadius: { 'card': '1.25rem' }

// Usage (correct)
className="rounded-card"

// Usage (wrong)
className="border-radius-card"  // ❌
```

---

### Issue 3: Fonts not loading

1. Check `index.html` has `<link>` tags
2. Verify font names match exactly
3. Check browser Network tab for font loading
4. Try fallback fonts to test

---

## Testing Checklist

- [ ] Dev server runs without errors
- [ ] All custom colors work
- [ ] Custom spacing values apply
- [ ] Fonts load and display
- [ ] Custom shadows and borders work
- [ ] Hot reload works (change file → see update)

---

## Extension Ideas

1. **Add color shades:**
```js
primary: {
  50: '#faf5ff',
  100: '#f3e8ff',
  500: '#7c3aed',
  900: '#581c87',
}
```

2. **Add breakpoints:**
```js
screens: {
  'tablet': '768px',
  'desktop': '1024px',
}
```

3. **Create a theme object:**
```js
const theme = {
  colors: { /* ... */ },
  spacing: { /* ... */ },
};

export default {
  theme: {
    extend: theme,
  },
};
```

---

**Remember:** Configuration changes require a dev server restart!

Good luck! 🎨

