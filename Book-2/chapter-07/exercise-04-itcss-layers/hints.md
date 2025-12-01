# Exercise 04: ITCSS Layers - Hints

## Overview

ITCSS (Inverted Triangle CSS) organizes CSS in **7 layers** ordered from generic to specific, low to high specificity.

```
         Generic
           ▼
    1. Settings      (Variables)
    2. Tools         (Mixins/Functions)
    3. Generic       (Reset/Normalize)
    4. Elements      (Bare HTML)
    5. Objects       (Layout patterns)
    6. Components    (UI pieces)
    7. Utilities     (Helpers)
           ▼
        Specific
```

---

## The 7 Layers

### 1. Settings (Variables Only)

```scss
// 1-settings/_colors.scss
$color-primary: #6366f1;
$color-secondary: #8b5cf6;
$color-success: #10b981;
$color-danger: #ef4444;

// 1-settings/_typography.scss
$font-family-base: 'Inter', sans-serif;
$font-family-heading: 'Poppins', sans-serif;

$font-size-sm: 0.875rem;
$font-size-base: 1rem;
$font-size-lg: 1.125rem;

// 1-settings/_spacing.scss
$spacing-xs: 0.25rem;
$spacing-sm: 0.5rem;
$spacing-md: 1rem;
$spacing-lg: 1.5rem;
$spacing-xl: 2rem;
```

### 2. Tools (Mixins & Functions)

```scss
// 2-tools/_mixins.scss
@mixin respond-to($breakpoint) {
  @if $breakpoint == 'small' {
    @media (min-width: 640px) { @content; }
  }
  @if $breakpoint == 'medium' {
    @media (min-width: 768px) { @content; }
  }
  @if $breakpoint == 'large' {
    @media (min-width: 1024px) { @content; }
  }
}

@mixin button-size($padding, $font-size) {
  padding: $padding;
  font-size: $font-size;
}

// 2-tools/_functions.scss
@function spacing($multiplier) {
  @return $spacing-md * $multiplier;
}
```

### 3. Generic (Reset/Normalize)

```scss
// 3-generic/_reset.scss
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

*::before,
*::after {
  box-sizing: inherit;
}
```

### 4. Elements (Bare HTML)

```scss
// 4-elements/_page.scss
html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
}

body {
  font-family: $font-family-base;
  line-height: 1.6;
  color: #333;
  background: #f9fafb;
}

// 4-elements/_typography.scss
h1, h2, h3, h4, h5, h6 {
  font-family: $font-family-heading;
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: 0.5em;
}

h1 { font-size: 2.5rem; }
h2 { font-size: 2rem; }
h3 { font-size: 1.75rem; }

a {
  color: $color-primary;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
```

### 5. Objects (Layout Patterns)

Prefix with `o-`:

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

// 5-objects/_wrapper.scss
.o-wrapper {
  padding: $spacing-lg;
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

### 6. Components (UI Components)

Prefix with `c-`:

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
  }

  &--secondary {
    background: $color-secondary;
    color: white;
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

  &__footer {
    padding: $spacing-md;
    border-top: 1px solid #e5e7eb;
    background: #f9fafb;
  }
}
```

### 7. Utilities (Helpers)

Prefix with `u-`:

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
.u-text-left { text-align: left; }
.u-text-right { text-align: right; }

.u-text-primary { color: $color-primary; }
.u-text-secondary { color: $color-secondary; }
```

---

## Main Import File

```scss
// main.scss
// Import order is CRITICAL - follows specificity triangle

// 1. Settings (variables)
@import '1-settings/colors';
@import '1-settings/typography';
@import '1-settings/spacing';

// 2. Tools (mixins/functions)
@import '2-tools/mixins';
@import '2-tools/functions';

// 3. Generic (reset)
@import '3-generic/reset';
@import '3-generic/normalize';

// 4. Elements (bare HTML)
@import '4-elements/page';
@import '4-elements/typography';
@import '4-elements/links';

// 5. Objects (layout patterns)
@import '5-objects/container';
@import '5-objects/media';
@import '5-objects/grid';
@import '5-objects/wrapper';

// 6. Components (UI pieces)
@import '6-components/button';
@import '6-components/card';
@import '6-components/form';
@import '6-components/navigation';

// 7. Utilities (helpers)
@import '7-utilities/spacing';
@import '7-utilities/display';
@import '7-utilities/text';
```

---

## HTML Usage Example

```html
<!-- Layout (o-) + Component (c-) + Utility (u-) -->
<div class="o-container">
  <header class="l-header">
    <nav class="c-navigation">...</nav>
  </header>

  <div class="o-grid o-grid--2col">
    <div class="c-card is-active">
      <div class="c-card__header">
        Title
      </div>
      <div class="c-card__body">
        Content
      </div>
    </div>
  </div>

  <button class="c-button c-button--primary c-button--lg u-mt-md">
    Submit
  </button>
</div>
```

---

## Key ITCSS Benefits

1. **Specificity managed** - Goes from low to high naturally
2. **No specificity wars** - Clear hierarchy
3. **Easy to scale** - Add to appropriate layer
4. **Easy to find** - Know which layer by prefix
5. **Easy to delete** - Remove entire layers if needed

---

## Common Mistakes

### ❌ Wrong import order
```scss
// Bad - utilities before components
@import 'utilities';
@import 'components';
```

### ❌ Wrong layer placement
```scss
// Bad - utility class in components
// 6-components/_button.scss
.u-text-center { text-align: center; }  // Should be in utilities!
```

### ❌ Breaking the triangle
```scss
// Bad - ID in components (too specific)
// 6-components/_card.scss
#special-card { ... }  // Don't use IDs!
```

---

## Success Criteria

Your ITCSS implementation should:
- [ ] Have all 7 layers
- [ ] Follow correct import order
- [ ] Use consistent prefixes (l-, o-, c-, u-)
- [ ] Have increasing specificity
- [ ] Be easy to navigate
- [ ] Scale without conflicts

Good luck building your ITCSS architecture! 🏗️

