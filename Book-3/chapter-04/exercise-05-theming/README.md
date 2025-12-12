# Exercise 5: Theming with Sass + CSS Variables 🌓

**Time:** 90-120 minutes
**Difficulty:** Intermediate-Advanced
**Focus:** Hybrid approach for runtime theming

---

## Learning Objectives

- ✅ Combine Sass variables with CSS custom properties
- ✅ Create semantic color tokens
- ✅ Implement light and dark themes
- ✅ Build theme toggle functionality
- ✅ Support system preferences

---

## The Challenge

Implement a complete theming system using the professional hybrid approach: **Sass for organization, CSS variables for runtime switching**.

---

## Requirements

### **Part 1: Sass Color Palette (20 minutes)**

Define your color primitives in Sass:

```scss
// _colors.scss
$colors: (
  // Blues
  blue-50: #eff6ff,
  blue-400: #60a5fa,
  blue-500: #3b82f6,
  blue-600: #2563eb,
  blue-900: #1e40af,

  // Grays
  gray-50: #f9fafb,
  gray-100: #f3f4f6,
  gray-200: #e5e7eb,
  gray-300: #d1d5db,
  gray-600: #4b5563,
  gray-700: #374151,
  gray-800: #1f2937,
  gray-900: #111827,

  // Others...
  green-500: #10b981,
  red-500: #ef4444,
  yellow-500: #f59e0b
);
```

### **Part 2: Generate CSS Variables (25 minutes)**

Use Sass to generate CSS custom properties:

```scss
:root {
  // Semantic tokens for light mode (default)
  --color-background: #{map-get($colors, gray-50)};
  --color-surface: #{map-get($colors, white)};
  --color-text: #{map-get($colors, gray-900)};
  --color-text-muted: #{map-get($colors, gray-600)};
  --color-border: #{map-get($colors, gray-200)};

  --color-primary: #{map-get($colors, blue-500)};
  --color-primary-hover: #{map-get($colors, blue-600)};

  --color-success: #{map-get($colors, green-500)};
  --color-danger: #{map-get($colors, red-500)};
  --color-warning: #{map-get($colors, yellow-500)};
}
```

### **Part 3: Dark Mode Theme (25 minutes)**

Override variables for dark mode:

```scss
[data-theme="dark"] {
  --color-background: #{map-get($colors, gray-900)};
  --color-surface: #{map-get($colors, gray-800)};
  --color-text: #{map-get($colors, gray-50)};
  --color-text-muted: #{map-get($colors, gray-300)};
  --color-border: #{map-get($colors, gray-700)};

  --color-primary: #{map-get($colors, blue-400)};  // Lighter in dark mode
  --color-primary-hover: #{map-get($colors, blue-500)};

  // Adjust other colors...
}
```

### **Part 4: System Preference Support (15 minutes)**

Respect user's OS preference:

```scss
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    // Apply dark mode if no explicit theme set
    --color-background: #{map-get($colors, gray-900)};
    // ... rest of dark theme
  }
}
```

### **Part 5: Components Using Variables (20 minutes)**

Build components that automatically adapt:

```scss
.card {
  background: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  // Sass for structure
  padding: token($spacing, 4);
  border-radius: token($radii, md);

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
}

.button {
  background: var(--color-primary);
  color: white;

  @include button-base;  // Sass mixin

  &:hover {
    background: var(--color-primary-hover);
  }
}
```

### **Part 6: Theme Toggle (15 minutes)**

JavaScript to toggle themes:

```html
<button id="theme-toggle" aria-label="Toggle dark mode">
  <span class="theme-toggle__icon theme-toggle__icon--sun">☀️</span>
  <span class="theme-toggle__icon theme-toggle__icon--moon">🌙</span>
</button>

<script>
const html = document.documentElement;
const toggle = document.getElementById('theme-toggle');

// Load saved preference
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

// Toggle
toggle.addEventListener('click', () => {
  const newTheme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});
</script>
```

---

## Testing Requirements

Create a page with:
1. **Cards** - should adapt to theme
2. **Buttons** - primary, secondary variants
3. **Form inputs** - text, textarea
4. **Navigation** - header with links
5. **Text content** - headings, paragraphs, lists

**Test:**
- Click toggle → instant theme switch
- Refresh page → theme persists
- System dark mode → auto-applies (if no saved preference)

---

## Deliverables

- [ ] `_colors.scss` - Sass color palette
- [ ] `_themes.scss` - CSS variable generation
- [ ] Components using CSS variables
- [ ] Working theme toggle
- [ ] LocalStorage persistence
- [ ] System preference support
- [ ] Test page with various components

---

## Evaluation Criteria

- **Color System (20%):** Comprehensive palette
- **CSS Variables (25%):** Proper semantic tokens
- **Dark Mode (25%):** Correct color mappings
- **Components (15%):** Use variables correctly
- **Toggle Functionality (10%):** Works perfectly
- **Code Quality (5%):** Clean, organized

---

## Bonus Challenges

1. **Multiple Themes:** Add "high-contrast" theme
2. **Smooth Transitions:** Animate theme changes
3. **Color Contrast:** Ensure WCAG AAA compliance
4. **Theme Previews:** Show theme before applying
5. **Per-Component Themes:** Override theme at component level

---

## Common Mistakes

❌ **Forgetting interpolation:**
```scss
:root {
  --color: $primary;  // Won't work! $primary gone after compilation
}
```

✅ **With interpolation:**
```scss
:root {
  --color: #{$primary};  // Inserts value at compile time
}
```

❌ **Hardcoding colors in components:**
```scss
.button {
  background: #3b82f6;  // Doesn't change with theme!
}
```

✅ **Using CSS variables:**
```scss
.button {
  background: var(--color-primary);  // Adapts to theme!
}
```

---

**Good luck!** 🌓

