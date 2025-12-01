# Challenge: Design System Foundation - Hints

## Overview

Build a **production-ready design system foundation** using all methodologies combined:
- **ITCSS** for architecture
- **BEM** for component naming
- **OOCSS** for reusable patterns
- **SMACSS** principles for organization

---

## Design System Structure

```
design-system/
├── scss/
│   ├── 1-settings/
│   │   ├── _colors.scss           # Color tokens
│   │   ├── _typography.scss       # Font tokens
│   │   ├── _spacing.scss          # Spacing scale
│   │   ├── _shadows.scss          # Shadow tokens
│   │   └── _borders.scss          # Border/radius tokens
│   │
│   ├── 2-tools/
│   │   ├── _mixins.scss           # Reusable mixins
│   │   ├── _functions.scss        # Helper functions
│   │   └── _bem-helpers.scss      # BEM shortcuts
│   │
│   ├── 3-generic/
│   │   ├── _reset.scss            # CSS reset
│   │   └── _normalize.scss        # Normalize.css
│   │
│   ├── 4-elements/
│   │   ├── _page.scss             # html, body
│   │   ├── _typography.scss       # h1-h6, p
│   │   ├── _links.scss            # a tags
│   │   └── _lists.scss            # ul, ol
│   │
│   ├── 5-objects/
│   │   ├── _container.scss        # Max-width container
│   │   ├── _media.scss            # Media object
│   │   ├── _grid.scss             # Grid system
│   │   ├── _flex.scss             # Flex utilities
│   │   └── _wrapper.scss          # Generic wrappers
│   │
│   ├── 6-components/
│   │   ├── _button.scss           # Button system
│   │   ├── _card.scss             # Card component
│   │   ├── _form.scss             # Form elements
│   │   ├── _input.scss            # Input fields
│   │   ├── _navigation.scss       # Navigation bar
│   │   ├── _modal.scss            # Modal dialogs
│   │   ├── _alert.scss            # Alert messages
│   │   ├── _badge.scss            # Badges
│   │   └── _dropdown.scss         # Dropdown menus
│   │
│   ├── 7-utilities/
│   │   ├── _spacing.scss          # Margin/padding
│   │   ├── _display.scss          # Display utilities
│   │   ├── _text.scss             # Text utilities
│   │   ├── _colors.scss           # Color utilities
│   │   └── _responsive.scss       # Responsive helpers
│   │
│   └── main.scss                  # Main import file
│
├── index.html                     # Component showcase
├── package.json                   # Node dependencies
└── README.md                      # Documentation
```

---

## Design Tokens (Settings Layer)

### Colors

```scss
// 1-settings/_colors.scss

// Brand Colors
$colors: (
  // Primary scale
  'primary-50': #eef2ff,
  'primary-100': #e0e7ff,
  'primary-200': #c7d2fe,
  'primary-300': #a5b4fc,
  'primary-400': #818cf8,
  'primary-500': #6366f1,  // Main primary
  'primary-600': #4f46e5,
  'primary-700': #4338ca,
  'primary-800': #3730a3,
  'primary-900': #312e81,

  // Secondary scale
  'secondary-500': #8b5cf6,
  'secondary-600': #7c3aed,

  // Semantic colors
  'success': #10b981,
  'danger': #ef4444,
  'warning': #f59e0b,
  'info': #3b82f6,

  // Neutral scale
  'gray-50': #f9fafb,
  'gray-100': #f3f4f6,
  'gray-200': #e5e7eb,
  'gray-300': #d1d5db,
  'gray-400': #9ca3af,
  'gray-500': #6b7280,
  'gray-600': #4b5563,
  'gray-700': #374151,
  'gray-800': #1f2937,
  'gray-900': #111827,
);

// Helper function
@function color($name) {
  @return map-get($colors, $name);
}
```

### Typography

```scss
// 1-settings/_typography.scss

// Font families
$font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
$font-family-heading: 'Inter', sans-serif;
$font-family-mono: 'Fira Code', monospace;

// Font sizes
$font-sizes: (
  'xs': 0.75rem,    // 12px
  'sm': 0.875rem,   // 14px
  'base': 1rem,     // 16px
  'lg': 1.125rem,   // 18px
  'xl': 1.25rem,    // 20px
  '2xl': 1.5rem,    // 24px
  '3xl': 1.875rem,  // 30px
  '4xl': 2.25rem,   // 36px
  '5xl': 3rem,      // 48px
);

@function font-size($name) {
  @return map-get($font-sizes, $name);
}

// Font weights
$font-weights: (
  'normal': 400,
  'medium': 500,
  'semibold': 600,
  'bold': 700,
);
```

### Spacing

```scss
// 1-settings/_spacing.scss

$spacing-base: 0.25rem; // 4px

$spacing: (
  '0': 0,
  '1': $spacing-base,      // 4px
  '2': $spacing-base * 2,  // 8px
  '3': $spacing-base * 3,  // 12px
  '4': $spacing-base * 4,  // 16px
  '5': $spacing-base * 5,  // 20px
  '6': $spacing-base * 6,  // 24px
  '8': $spacing-base * 8,  // 32px
  '10': $spacing-base * 10, // 40px
  '12': $spacing-base * 12, // 48px
  '16': $spacing-base * 16, // 64px
);

@function spacing($key) {
  @return map-get($spacing, $key);
}
```

---

## Tools Layer

### BEM Helpers

```scss
// 2-tools/_bem-helpers.scss

// Element
@mixin e($name) {
  &__#{$name} {
    @content;
  }
}

// Modifier
@mixin m($name) {
  &--#{$name} {
    @content;
  }
}

// Usage:
// .c-button {
//   @include m('primary') { ... }
//   @include e('icon') { ... }
// }
```

### Responsive Mixins

```scss
// 2-tools/_mixins.scss

$breakpoints: (
  'sm': 640px,
  'md': 768px,
  'lg': 1024px,
  'xl': 1280px,
  '2xl': 1536px,
);

@mixin respond-to($breakpoint) {
  @media (min-width: map-get($breakpoints, $breakpoint)) {
    @content;
  }
}
```

---

## Component Examples

### Button Component (BEM)

```scss
// 6-components/_button.scss

.c-button {
  // Base styles
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: spacing(2) spacing(4);
  font-family: $font-family-base;
  font-size: font-size('base');
  font-weight: map-get($font-weights, 'medium');
  line-height: 1.5;
  text-align: center;
  border: 2px solid transparent;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;

  // Elements
  @include e('icon') {
    margin-right: spacing(2);
    width: 1.25rem;
    height: 1.25rem;
  }

  @include e('text') {
    display: inline-block;
  }

  // Size modifiers
  @include m('sm') {
    padding: spacing(1) spacing(3);
    font-size: font-size('sm');
  }

  @include m('lg') {
    padding: spacing(3) spacing(6);
    font-size: font-size('lg');
  }

  @include m('xl') {
    padding: spacing(4) spacing(8);
    font-size: font-size('xl');
  }

  // Color modifiers
  @include m('primary') {
    background: color('primary-500');
    color: white;
    border-color: color('primary-500');

    &:hover {
      background: color('primary-600');
      border-color: color('primary-600');
    }

    &:active {
      background: color('primary-700');
      border-color: color('primary-700');
    }
  }

  @include m('secondary') {
    background: color('secondary-500');
    color: white;
    border-color: color('secondary-500');
  }

  @include m('outline') {
    background: transparent;
    color: color('primary-500');
    border-color: color('primary-500');

    &:hover {
      background: color('primary-50');
    }
  }

  @include m('ghost') {
    background: transparent;
    color: color('primary-500');
    border-color: transparent;

    &:hover {
      background: color('primary-50');
    }
  }

  // State modifiers
  @include m('disabled') {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }

  @include m('loading') {
    position: relative;
    color: transparent;

    &::after {
      content: '';
      position: absolute;
      width: 1rem;
      height: 1rem;
      border: 2px solid transparent;
      border-top-color: currentColor;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }
  }

  // Full width
  @include m('block') {
    display: flex;
    width: 100%;
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

---

## Utilities Layer

### Spacing Utilities

```scss
// 7-utilities/_spacing.scss

// Generate margin utilities
@each $key, $value in $spacing {
  .u-m-#{$key} { margin: $value !important; }
  .u-mt-#{$key} { margin-top: $value !important; }
  .u-mr-#{$key} { margin-right: $value !important; }
  .u-mb-#{$key} { margin-bottom: $value !important; }
  .u-ml-#{$key} { margin-left: $value !important; }
  .u-mx-#{$key} {
    margin-left: $value !important;
    margin-right: $value !important;
  }
  .u-my-#{$key} {
    margin-top: $value !important;
    margin-bottom: $value !important;
  }
}

// Generate padding utilities
@each $key, $value in $spacing {
  .u-p-#{$key} { padding: $value !important; }
  .u-pt-#{$key} { padding-top: $value !important; }
  .u-pr-#{$key} { padding-right: $value !important; }
  .u-pb-#{$key} { padding-bottom: $value !important; }
  .u-pl-#{$key} { padding-left: $value !important; }
  .u-px-#{$key} {
    padding-left: $value !important;
    padding-right: $value !important;
  }
  .u-py-#{$key} {
    padding-top: $value !important;
    padding-bottom: $value !important;
  }
}
```

---

## HTML Showcase

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Design System - Component Showcase</title>
  <link rel="stylesheet" href="dist/css/main.css">
</head>
<body>
  <div class="o-container">
    <header class="u-py-8">
      <h1>Design System</h1>
      <p>Production-ready component library</p>
    </header>

    <!-- Button System -->
    <section class="u-mb-12">
      <h2 class="u-mb-4">Buttons</h2>

      <h3 class="u-mb-2">Sizes</h3>
      <div class="u-mb-4">
        <button class="c-button c-button--primary c-button--sm">Small</button>
        <button class="c-button c-button--primary">Medium</button>
        <button class="c-button c-button--primary c-button--lg">Large</button>
      </div>

      <h3 class="u-mb-2">Variants</h3>
      <div class="u-mb-4">
        <button class="c-button c-button--primary">Primary</button>
        <button class="c-button c-button--secondary">Secondary</button>
        <button class="c-button c-button--outline">Outline</button>
        <button class="c-button c-button--ghost">Ghost</button>
      </div>
    </section>

    <!-- Card System -->
    <section class="u-mb-12">
      <h2 class="u-mb-4">Cards</h2>

      <div class="o-grid o-grid--3col">
        <div class="c-card">
          <div class="c-card__header">
            <h3>Card Title</h3>
          </div>
          <div class="c-card__body">
            <p>Card content goes here.</p>
          </div>
          <div class="c-card__footer">
            <button class="c-button c-button--primary">Action</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</body>
</html>
```

---

## Success Criteria

- [ ] Complete ITCSS 7-layer architecture
- [ ] All components use BEM naming
- [ ] OOCSS objects for layouts
- [ ] Comprehensive design tokens
- [ ] Responsive utilities
- [ ] Component showcase page
- [ ] Production-ready code quality
- [ ] Well-documented

This is a **portfolio-worthy** design system! 🎨

