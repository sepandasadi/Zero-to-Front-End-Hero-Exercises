# Exercise 06: Real-World Architecture - Hints

## Overview

Build a production-ready component library using **ITCSS + BEM + OOCSS** - the winning combination used by companies like GitHub, BBC, and Microsoft.

---

## The Winning Architecture

```
scss/
├── 1-settings/         # Variables (ITCSS Layer 1)
│   ├── _colors.scss
│   ├── _typography.scss
│   └── _spacing.scss
│
├── 2-tools/            # Mixins/Functions (ITCSS Layer 2)
│   ├── _mixins.scss
│   └── _functions.scss
│
├── 3-generic/          # Reset (ITCSS Layer 3)
│   └── _reset.scss
│
├── 4-elements/         # Bare HTML (ITCSS Layer 4)
│   ├── _page.scss
│   └── _typography.scss
│
├── 5-objects/          # Layout patterns - OOCSS (ITCSS Layer 5)
│   ├── _container.scss
│   ├── _media.scss
│   └── _grid.scss
│
├── 6-components/       # UI components - BEM (ITCSS Layer 6)
│   ├── _button.scss
│   ├── _card.scss
│   ├── _form.scss
│   └── _navigation.scss
│
├── 7-utilities/        # Helpers (ITCSS Layer 7)
│   ├── _spacing.scss
│   ├── _display.scss
│   └── _text.scss
│
└── main.scss           # Import orchestration
```

---

## Key Principles

### 1. ITCSS for Structure
- **7 layers** for organization
- **Specificity management** from low to high
- **Clear import order**

### 2. BEM for Components
- **Block__element--modifier** naming
- **Component isolation**
- **Predictable structure**

### 3. OOCSS for Objects
- **Separate structure from skin**
- **Reusable patterns**
- **Composability**

---

## Implementation Guide

### Settings Layer

```scss
// 1-settings/_colors.scss
$colors: (
  'primary': #6366f1,
  'secondary': #8b5cf6,
  'success': #10b981,
  'danger': #ef4444,
  'warning': #f59e0b,
  'gray-50': #f9fafb,
  'gray-100': #f3f4f6,
  'gray-900': #111827
);

// Function to get colors
@function color($name) {
  @return map-get($colors, $name);
}
```

### Tools Layer

```scss
// 2-tools/_mixins.scss

// BEM element helper
@mixin element($name) {
  &__#{$name} {
    @content;
  }
}

// BEM modifier helper
@mixin modifier($name) {
  &--#{$name} {
    @content;
  }
}

// Responsive breakpoints
@mixin respond-to($breakpoint) {
  @if $breakpoint == 'sm' {
    @media (min-width: 640px) { @content; }
  }
  @if $breakpoint == 'md' {
    @media (min-width: 768px) { @content; }
  }
  @if $breakpoint == 'lg' {
    @media (min-width: 1024px) { @content; }
  }
}
```

### Objects Layer (OOCSS)

```scss
// 5-objects/_container.scss
// Structure-only object

.o-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;

  @include respond-to('md') {
    padding: 0 2rem;
  }
}

.o-container--narrow {
  max-width: 800px;
}

// 5-objects/_media.scss
// Classic OOCSS media object

.o-media {
  display: flex;
  align-items: flex-start;
  gap: 1rem;

  &__image {
    flex-shrink: 0;
  }

  &__body {
    flex: 1;
  }
}
```

### Components Layer (BEM)

```scss
// 6-components/_button.scss
.c-button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 2px solid transparent;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;

  // Elements
  @include element('icon') {
    margin-right: 0.5rem;
  }

  @include element('text') {
    display: inline-block;
  }

  // Modifiers - sizes
  @include modifier('sm') {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }

  @include modifier('lg') {
    padding: 1rem 2rem;
    font-size: 1.125rem;
  }

  // Modifiers - colors
  @include modifier('primary') {
    background: color('primary');
    color: white;
    border-color: color('primary');

    &:hover {
      background: darken(color('primary'), 10%);
      border-color: darken(color('primary'), 10%);
    }
  }

  @include modifier('secondary') {
    background: color('secondary');
    color: white;
    border-color: color('secondary');
  }

  @include modifier('outline') {
    background: transparent;
    color: color('primary');
    border-color: color('primary');

    &:hover {
      background: color('primary');
      color: white;
    }
  }
}
```

---

## HTML Usage

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <link rel="stylesheet" href="css/main.css">
</head>
<body>
  <!-- ITCSS Structure + OOCSS Objects + BEM Components -->

  <!-- Object: Container (OOCSS - layout) -->
  <div class="o-container">

    <!-- Component: Navigation (BEM) -->
    <nav class="c-navigation">
      <a href="#" class="c-navigation__logo">Logo</a>
      <ul class="c-navigation__list">
        <li class="c-navigation__item">
          <a href="#" class="c-navigation__link c-navigation__link--active">
            Home
          </a>
        </li>
      </ul>
    </nav>

    <!-- Object: Grid (OOCSS - layout) -->
    <div class="o-grid o-grid--3col">

      <!-- Component: Card (BEM) -->
      <div class="c-card c-card--featured">
        <img src="..." class="c-card__image" alt="">
        <div class="c-card__content">
          <h3 class="c-card__title">Title</h3>
          <p class="c-card__text">Content</p>

          <!-- Component: Button (BEM) -->
          <button class="c-button c-button--primary c-button--lg">
            Click Me
          </button>
        </div>
      </div>

    </div>
  </div>

</body>
</html>
```

---

## Naming Conventions Summary

### ITCSS Layers
- **Settings:** Variables (`$color-primary`)
- **Tools:** Functions/Mixins (`@mixin`, `@function`)
- **Generic:** No classes (reset)
- **Elements:** No classes (h1, p, etc.)
- **Objects:** `o-` prefix (`o-container`, `o-media`)
- **Components:** `c-` prefix + BEM (`c-button`, `c-card__title`)
- **Utilities:** `u-` prefix (`u-mt-lg`, `u-text-center`)

### BEM Within Components
- **Block:** `.c-button`
- **Element:** `.c-button__icon`
- **Modifier:** `.c-button--primary`

---

## Benefits of This Approach

### ✅ From ITCSS
- Clear specificity management
- Organized file structure
- Easy to scale

### ✅ From BEM
- Component isolation
- Predictable naming
- Easy to understand

### ✅ From OOCSS
- Reusable patterns
- DRY CSS
- Composability

---

## Real-World Example Structure

```scss
// main.scss
@import '1-settings/colors';
@import '1-settings/typography';
@import '1-settings/spacing';

@import '2-tools/mixins';
@import '2-tools/functions';

@import '3-generic/reset';

@import '4-elements/page';
@import '4-elements/typography';

@import '5-objects/container';
@import '5-objects/media';
@import '5-objects/grid';

@import '6-components/button';
@import '6-components/card';
@import '6-components/form';
@import '6-components/navigation';

@import '7-utilities/spacing';
@import '7-utilities/display';
@import '7-utilities/text';
```

---

## Components to Build

1. **Button** - All sizes and colors
2. **Card** - With header, body, footer
3. **Form** - Input, textarea, select
4. **Navigation** - Header navigation bar

---

## Success Criteria

- [ ] ITCSS 7-layer structure
- [ ] BEM naming for components
- [ ] OOCSS objects for layout
- [ ] Low specificity throughout
- [ ] Reusable and composable
- [ ] Production-ready quality

This is the architecture used by **top companies**! 🚀

