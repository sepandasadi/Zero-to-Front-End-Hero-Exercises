# Exercise 04: ITCSS Layers - Getting Started

## Objective

Build a complete ITCSS (Inverted Triangle CSS) architecture from scratch with all 7 layers.

---

## The ITCSS Triangle

```
    Generic (low specificity)
         ▼
  1. Settings
  2. Tools
  3. Generic
  4. Elements
  5. Objects
  6. Components
  7. Utilities
         ▼
    Specific (high specificity)
```

---

## What You'll Build

A complete SCSS architecture that demonstrates:
- Proper layer organization
- Increasing specificity
- Reusable patterns
- Scalable structure

---

## File Structure to Create

```
starter/
├── package.json        # For Sass compilation
├── index.html          # Component showcase
└── scss/
    ├── 1-settings/
    │   ├── _colors.scss
    │   ├── _typography.scss
    │   └── _spacing.scss
    │
    ├── 2-tools/
    │   ├── _mixins.scss
    │   └── _functions.scss
    │
    ├── 3-generic/
    │   └── _reset.scss
    │
    ├── 4-elements/
    │   ├── _page.scss
    │   └── _typography.scss
    │
    ├── 5-objects/
    │   ├── _container.scss
    │   ├── _media.scss
    │   └── _grid.scss
    │
    ├── 6-components/
    │   ├── _button.scss
    │   ├── _card.scss
    │   └── _navigation.scss
    │
    ├── 7-utilities/
    │   ├── _spacing.scss
    │   ├── _display.scss
    │   └── _text.scss
    │
    └── main.scss        # Main import file
```

---

## Step-by-Step Guide

### Step 1: Setup package.json

```json
{
  "name": "itcss-exercise",
  "version": "1.0.0",
  "scripts": {
    "sass": "sass --watch scss/main.scss:dist/css/main.css",
    "build": "sass scss/main.scss:dist/css/main.css"
  },
  "devDependencies": {
    "sass": "^1.69.0"
  }
}
```

Run: `npm install` then `npm run sass`

---

### Step 2: Layer 1 - Settings (Variables)

```scss
// 1-settings/_colors.scss
$color-primary: #6366f1;
$color-secondary: #8b5cf6;
$color-success: #10b981;
$color-danger: #ef4444;

$color-gray-50: #f9fafb;
$color-gray-900: #111827;

// 1-settings/_typography.scss
$font-family-base: -apple-system, sans-serif;
$font-size-base: 1rem;
$font-size-lg: 1.25rem;
$line-height-base: 1.6;

// 1-settings/_spacing.scss
$spacing-unit: 0.25rem;

$spacing-sm: $spacing-unit * 2;  // 8px
$spacing-md: $spacing-unit * 4;  // 16px
$spacing-lg: $spacing-unit * 6;  // 24px
```

---

### Step 3: Layer 2 - Tools (Mixins/Functions)

```scss
// 2-tools/_functions.scss
@function spacing($multiplier) {
  @return $spacing-unit * $multiplier;
}

// 2-tools/_mixins.scss
@mixin respond-to($breakpoint) {
  @if $breakpoint == 'md' {
    @media (min-width: 768px) {
      @content;
    }
  }
  @if $breakpoint == 'lg' {
    @media (min-width: 1024px) {
      @content;
    }
  }
}
```

---

### Step 4: Layer 3 - Generic (Reset)

```scss
// 3-generic/_reset.scss
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

---

### Step 5: Layer 4 - Elements (Bare HTML)

```scss
// 4-elements/_page.scss
html {
  font-size: 16px;
}

body {
  font-family: $font-family-base;
  line-height: $line-height-base;
  color: $color-gray-900;
  background: $color-gray-50;
}

// 4-elements/_typography.scss
h1, h2, h3 {
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: 0.5em;
}

h1 { font-size: 2.5rem; }
h2 { font-size: 2rem; }
h3 { font-size: 1.5rem; }
```

---

### Step 6: Layer 5 - Objects (Layout Patterns)

Use `o-` prefix:

```scss
// 5-objects/_container.scss
.o-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 $spacing-md;
}

// 5-objects/_media.scss
.o-media {
  display: flex;
  align-items: flex-start;

  &__image {
    margin-right: $spacing-md;
    flex-shrink: 0;
  }

  &__body {
    flex: 1;
  }
}

// 5-objects/_grid.scss
.o-grid {
  display: grid;
  gap: $spacing-md;
}

.o-grid--2col {
  grid-template-columns: repeat(2, 1fr);
}
```

---

### Step 7: Layer 6 - Components (UI)

Use `c-` prefix + BEM:

```scss
// 6-components/_button.scss
.c-button {
  display: inline-block;
  padding: $spacing-sm $spacing-md;
  border: 2px solid transparent;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &--primary {
    background: $color-primary;
    color: white;
    border-color: $color-primary;
  }

  &--lg {
    padding: $spacing-md $spacing-lg;
    font-size: $font-size-lg;
  }
}

// 6-components/_card.scss
.c-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;

  &__header {
    padding: $spacing-md;
    border-bottom: 1px solid #e5e7eb;
    font-weight: 600;
  }

  &__body {
    padding: $spacing-md;
  }
}
```

---

### Step 8: Layer 7 - Utilities (Helpers)

Use `u-` prefix:

```scss
// 7-utilities/_spacing.scss
.u-mt-sm { margin-top: $spacing-sm; }
.u-mt-md { margin-top: $spacing-md; }
.u-mt-lg { margin-top: $spacing-lg; }

.u-mb-sm { margin-bottom: $spacing-sm; }
.u-mb-md { margin-bottom: $spacing-md; }
.u-mb-lg { margin-bottom: $spacing-lg; }

// 7-utilities/_display.scss
.u-hidden { display: none; }
.u-block { display: block; }
.u-flex { display: flex; }

// 7-utilities/_text.scss
.u-text-center { text-align: center; }
```

---

### Step 9: Main Import File

**CRITICAL: Import order matters!**

```scss
// scss/main.scss

// 1. Settings (variables)
@import '1-settings/colors';
@import '1-settings/typography';
@import '1-settings/spacing';

// 2. Tools (mixins/functions)
@import '2-tools/functions';
@import '2-tools/mixins';

// 3. Generic (reset)
@import '3-generic/reset';

// 4. Elements (bare HTML)
@import '4-elements/page';
@import '4-elements/typography';

// 5. Objects (layout patterns)
@import '5-objects/container';
@import '5-objects/media';
@import '5-objects/grid';

// 6. Components (UI components)
@import '6-components/button';
@import '6-components/card';
@import '6-components/navigation';

// 7. Utilities (helpers)
@import '7-utilities/spacing';
@import '7-utilities/display';
@import '7-utilities/text';
```

---

### Step 10: HTML Demo

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>ITCSS Demo</title>
  <link rel="stylesheet" href="dist/css/main.css">
</head>
<body>
  <!-- Object -->
  <div class="o-container">

    <!-- Component + Utility -->
    <header class="u-mb-lg">
      <h1>ITCSS Architecture</h1>
    </header>

    <!-- Object: Grid -->
    <div class="o-grid o-grid--2col">

      <!-- Component: Card -->
      <div class="c-card">
        <div class="c-card__header">
          Card Title
        </div>
        <div class="c-card__body">
          <p>Card content here</p>

          <!-- Component: Button + Utility -->
          <button class="c-button c-button--primary u-mt-md">
            Action
          </button>
        </div>
      </div>

    </div>
  </div>
</body>
</html>
```

---

## Key Principles

1. **Specificity increases** from top to bottom
2. **Generic to specific** organization
3. **No jumping layers** - maintain order
4. **Consistent prefixes** for easy identification
5. **Variables first** - used throughout

---

## Deliverables

- [ ] All 7 ITCSS layers created
- [ ] Proper import order in main.scss
- [ ] Prefixes used correctly (o-, c-, u-)
- [ ] Sass compiles successfully
- [ ] HTML demo showcases components
- [ ] Increasing specificity maintained

---

## Tips

- Start with settings/tools first (needed by others)
- Use functions/mixins in later layers
- Keep objects generic and reusable
- Components are specific UI pieces
- Utilities can use !important (last layer)

Good luck building your ITCSS architecture! 🏗️

