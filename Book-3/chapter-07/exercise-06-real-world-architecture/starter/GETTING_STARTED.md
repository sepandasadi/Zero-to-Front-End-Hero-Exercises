# Exercise 06: Real-World Architecture - Getting Started

## Objective

Build a production-ready component library using **ITCSS + BEM + OOCSS** - the methodology mix used by top companies.

---

## Why Mix Methodologies?

| Methodology | What It Provides | Used For |
|-------------|-----------------|----------|
| **ITCSS** | Architecture | Overall file structure |
| **BEM** | Naming | Component classes |
| **OOCSS** | Reusability | Layout objects |

**Result:** Best of all worlds! 🎯

---

## Project Structure

```
starter/
├── package.json
├── index.html
└── scss/
    ├── 1-settings/
    │   ├── _colors.scss
    │   ├── _typography.scss
    │   └── _spacing.scss
    │
    ├── 2-tools/
    │   ├── _mixins.scss
    │   ├── _functions.scss
    │   └── _bem-helpers.scss
    │
    ├── 3-generic/
    │   └── _reset.scss
    │
    ├── 4-elements/
    │   ├── _page.scss
    │   └── _typography.scss
    │
    ├── 5-objects/          ← OOCSS patterns
    │   ├── _container.scss
    │   ├── _media.scss
    │   └── _grid.scss
    │
    ├── 6-components/       ← BEM components
    │   ├── _button.scss
    │   ├── _card.scss
    │   ├── _form.scss
    │   └── _navigation.scss
    │
    ├── 7-utilities/
    │   ├── _spacing.scss
    │   ├── _display.scss
    │   └── _text.scss
    │
    └── main.scss
```

---

## Setup

### 1. package.json

```json
{
  "name": "real-world-architecture",
  "version": "1.0.0",
  "scripts": {
    "sass": "sass --watch scss/main.scss:dist/css/main.css",
    "build": "sass scss/main.scss:dist/css/main.css --style compressed"
  },
  "devDependencies": {
    "sass": "^1.69.0"
  }
}
```

Run:
```bash
npm install
npm run sass
```

---

## Layer-by-Layer Guide

### Settings (Variables)

```scss
// 1-settings/_colors.scss
$colors: (
  'primary': #6366f1,
  'secondary': #8b5cf6,
  'success': #10b981,
  'danger': #ef4444,
  'gray-50': #f9fafb,
  'gray-900': #111827
);

@function color($name) {
  @return map-get($colors, $name);
}

// 1-settings/_spacing.scss
$spacing: (
  '1': 0.25rem,
  '2': 0.5rem,
  '3': 0.75rem,
  '4': 1rem,
  '6': 1.5rem,
  '8': 2rem
);

@function spacing($key) {
  @return map-get($spacing, $key);
}
```

---

### Tools (BEM Helpers)

```scss
// 2-tools/_bem-helpers.scss

// Element helper
@mixin e($name) {
  &__#{$name} {
    @content;
  }
}

// Modifier helper
@mixin m($name) {
  &--#{$name} {
    @content;
  }
}

// Usage:
// .c-button {
//   @include e('icon') { ... }     // .c-button__icon
//   @include m('primary') { ... }  // .c-button--primary
// }

// 2-tools/_mixins.scss
$breakpoints: (
  'sm': 640px,
  'md': 768px,
  'lg': 1024px
);

@mixin respond-to($bp) {
  @media (min-width: map-get($breakpoints, $bp)) {
    @content;
  }
}
```

---

### Objects (OOCSS - Layout)

Use **`o-` prefix** for OOCSS objects:

```scss
// 5-objects/_container.scss
.o-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 spacing('4');

  @include respond-to('md') {
    padding: 0 spacing('8');
  }
}

.o-container--narrow {
  max-width: 800px;
}

// 5-objects/_media.scss (classic OOCSS pattern)
.o-media {
  display: flex;
  align-items: flex-start;
  gap: spacing('4');

  &__image {
    flex-shrink: 0;
  }

  &__body {
    flex: 1;
  }
}

// 5-objects/_grid.scss
.o-grid {
  display: grid;
  gap: spacing('4');
}

.o-grid--2col {
  grid-template-columns: repeat(2, 1fr);
}

.o-grid--3col {
  grid-template-columns: repeat(3, 1fr);

  @include respond-to('md') {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

### Components (BEM - UI)

Use **`c-` prefix + BEM** for components:

```scss
// 6-components/_button.scss
.c-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: spacing('2') spacing('4');
  border: 2px solid transparent;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  // Elements using BEM helper
  @include e('icon') {
    margin-right: spacing('2');
  }

  @include e('text') {
    display: inline-block;
  }

  // Modifiers - Sizes
  @include m('sm') {
    padding: spacing('1') spacing('3');
    font-size: 0.875rem;
  }

  @include m('lg') {
    padding: spacing('3') spacing('6');
    font-size: 1.125rem;
  }

  // Modifiers - Colors
  @include m('primary') {
    background: color('primary');
    color: white;
    border-color: color('primary');

    &:hover {
      background: darken(color('primary'), 10%);
    }
  }

  @include m('secondary') {
    background: color('secondary');
    color: white;
    border-color: color('secondary');
  }

  @include m('outline') {
    background: transparent;
    color: color('primary');
    border-color: color('primary');

    &:hover {
      background: color('primary');
      color: white;
    }
  }

  @include m('block') {
    display: flex;
    width: 100%;
  }
}

// 6-components/_card.scss
.c-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;

  @include e('header') {
    padding: spacing('4');
    border-bottom: 1px solid #e5e7eb;
    font-weight: 600;
  }

  @include e('body') {
    padding: spacing('4');
  }

  @include e('footer') {
    padding: spacing('4');
    border-top: 1px solid #e5e7eb;
    background: color('gray-50');
  }

  // Modifiers
  @include m('featured') {
    border-color: color('primary');
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
  }
}
```

---

### Utilities (Helpers)

Use **`u-` prefix**:

```scss
// 7-utilities/_spacing.scss

// Generate utilities from spacing map
@each $key, $value in $spacing {
  .u-mt-#{$key} { margin-top: $value !important; }
  .u-mb-#{$key} { margin-bottom: $value !important; }
  .u-ml-#{$key} { margin-left: $value !important; }
  .u-mr-#{$key} { margin-right: $value !important; }

  .u-pt-#{$key} { padding-top: $value !important; }
  .u-pb-#{$key} { padding-bottom: $value !important; }
}

// 7-utilities/_display.scss
.u-hidden { display: none !important; }
.u-block { display: block !important; }
.u-flex { display: flex !important; }

// 7-utilities/_text.scss
.u-text-center { text-align: center !important; }
.u-text-left { text-align: left !important; }
.u-text-right { text-align: right !important; }
```

---

### Main Import File

```scss
// scss/main.scss

// 1. Settings
@import '1-settings/colors';
@import '1-settings/typography';
@import '1-settings/spacing';

// 2. Tools
@import '2-tools/functions';
@import '2-tools/mixins';
@import '2-tools/bem-helpers';

// 3. Generic
@import '3-generic/reset';

// 4. Elements
@import '4-elements/page';
@import '4-elements/typography';

// 5. Objects (OOCSS patterns)
@import '5-objects/container';
@import '5-objects/media';
@import '5-objects/grid';

// 6. Components (BEM components)
@import '6-components/button';
@import '6-components/card';
@import '6-components/form';
@import '6-components/navigation';

// 7. Utilities
@import '7-utilities/spacing';
@import '7-utilities/display';
@import '7-utilities/text';
```

---

## HTML Usage Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Real-World Architecture</title>
  <link rel="stylesheet" href="dist/css/main.css">
</head>
<body>
  <!-- OOCSS Object: Container -->
  <div class="o-container">

    <!-- Utility: Spacing -->
    <header class="u-mb-8">
      <h1>Component Library</h1>
      <p>ITCSS + BEM + OOCSS</p>
    </header>

    <!-- OOCSS Object: Grid -->
    <div class="o-grid o-grid--3col">

      <!-- BEM Component: Card -->
      <div class="c-card c-card--featured">

        <!-- BEM Element -->
        <div class="c-card__header">
          Card Title
        </div>

        <!-- BEM Element -->
        <div class="c-card__body">
          <p>This architecture combines ITCSS structure, BEM naming, and OOCSS patterns.</p>

          <!-- BEM Component + Modifiers + Utility -->
          <button class="c-button c-button--primary c-button--lg u-mt-4">
            Learn More
          </button>
        </div>

        <!-- BEM Element -->
        <div class="c-card__footer">
          <button class="c-button c-button--outline c-button--sm">
            Share
          </button>
        </div>

      </div>

    </div>
  </div>
</body>
</html>
```

---

## Components to Build

1. **Button** - All sizes and colors
2. **Card** - With header, body, footer
3. **Form** - Input, label, error states
4. **Navigation** - Header nav with links

---

## Success Criteria

- [ ] ITCSS 7-layer structure
- [ ] OOCSS objects use `o-` prefix
- [ ] BEM components use `c-` prefix
- [ ] Utilities use `u-` prefix
- [ ] BEM mixins used in components
- [ ] Sass compiles successfully
- [ ] HTML showcases all components
- [ ] Production-ready quality

---

## Benefits of This Approach

**From ITCSS:**
- ✅ Clear file organization
- ✅ Specificity management
- ✅ Scalable architecture

**From BEM:**
- ✅ Component isolation
- ✅ Predictable naming
- ✅ Easy to understand

**From OOCSS:**
- ✅ Reusable patterns
- ✅ Composable layouts
- ✅ DRY CSS

**This is how real companies build CSS!** 🚀

