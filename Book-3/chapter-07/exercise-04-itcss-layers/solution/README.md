# Exercise 04: ITCSS Layers - Solution

## Overview

This solution demonstrates a complete ITCSS (Inverted Triangle CSS) architecture with all 7 layers properly organized.

---

## The ITCSS Triangle

```
      GENERIC
         ↓
    [LOW SPECIFICITY]
         ↓
  1. Settings      ← Variables
  2. Tools         ← Mixins/Functions
  3. Generic       ← Reset
  4. Elements      ← Bare HTML
  5. Objects       ← Layout patterns
  6. Components    ← UI components
  7. Utilities     ← Helpers
         ↓
    [HIGH SPECIFICITY]
         ↓
      SPECIFIC
```

---

## Architecture

```
solution/
├── package.json
├── index.html
├── dist/
│   └── css/
│       └── main.css      # Compiled output
└── scss/
    ├── 1-settings/
    │   ├── _colors.scss
    │   ├── _typography.scss
    │   └── _spacing.scss
    ├── 2-tools/
    │   ├── _mixins.scss
    │   └── _functions.scss
    ├── 3-generic/
    │   └── _reset.scss
    ├── 4-elements/
    │   ├── _page.scss
    │   └── _typography.scss
    ├── 5-objects/
    │   ├── _container.scss
    │   ├── _media.scss
    │   └── _grid.scss
    ├── 6-components/
    │   ├── _button.scss
    │   ├── _card.scss
    │   └── _navigation.scss
    ├── 7-utilities/
    │   ├── _spacing.scss
    │   ├── _display.scss
    │   └── _text.scss
    └── main.scss          # Import orchestration
```

---

## Layer-by-Layer Breakdown

### Layer 1: Settings (Variables Only)

**Purpose:** Define design tokens
**Specificity:** None (variables only)
**Output CSS:** None

```scss
// 1-settings/_colors.scss
$color-primary: #6366f1;
$color-secondary: #8b5cf6;

// 1-settings/_spacing.scss
$spacing-unit: 0.25rem;
$spacing-md: $spacing-unit * 4;
```

**Key Points:**
- No CSS output
- Only variables/maps
- Used by all other layers
- Foundation of design system

---

### Layer 2: Tools (Mixins & Functions)

**Purpose:** Reusable code generators
**Specificity:** None (tools only)
**Output CSS:** None

```scss
// 2-tools/_functions.scss
@function spacing($multiplier) {
  @return $spacing-unit * $multiplier;
}

// 2-tools/_mixins.scss
@mixin respond-to($breakpoint) {
  @if $breakpoint == 'md' {
    @media (min-width: 768px) { @content; }
  }
}
```

**Key Points:**
- No CSS output
- Used throughout later layers
- Keep generic and reusable

---

### Layer 3: Generic (Reset/Normalize)

**Purpose:** Browser defaults
**Specificity:** Very low (element selectors)
**Output CSS:** Yes

```scss
// 3-generic/_reset.scss
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

**Key Points:**
- First layer to output CSS
- Element selectors only
- No classes or IDs
- Foundation for consistent styling

---

### Layer 4: Elements (Bare HTML)

**Purpose:** Style HTML elements
**Specificity:** Low (element selectors)
**Output CSS:** Yes

```scss
// 4-elements/_page.scss
body {
  font-family: $font-family-base;
  line-height: 1.6;
  color: $color-gray-900;
}

// 4-elements/_typography.scss
h1 { font-size: 2.5rem; }
h2 { font-size: 2rem; }
```

**Key Points:**
- Element selectors only
- No classes yet
- Use variables from settings
- Establish baseline styles

---

### Layer 5: Objects (Layout Patterns)

**Purpose:** OOCSS layout patterns
**Specificity:** Low (single class)
**Prefix:** `o-`

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

  &__image { flex-shrink: 0; }
  &__body { flex: 1; }
}
```

**Key Points:**
- Use `o-` prefix
- Layout patterns only
- No visual styling
- Highly reusable
- OOCSS principles

---

### Layer 6: Components (UI Components)

**Purpose:** Specific UI components
**Specificity:** Medium (BEM)
**Prefix:** `c-`

```scss
// 6-components/_button.scss
.c-button {
  display: inline-block;
  padding: $spacing-sm $spacing-md;
  border: 2px solid transparent;
  border-radius: 0.5rem;

  &--primary {
    background: $color-primary;
    color: white;
  }

  &--lg {
    padding: $spacing-md $spacing-lg;
  }
}
```

**Key Points:**
- Use `c-` prefix
- BEM naming within components
- Use variables and mixins
- Most specific layer before utilities
- Where most UI CSS lives

---

### Layer 7: Utilities (Helpers)

**Purpose:** Single-purpose helpers
**Specificity:** High (!important allowed)
**Prefix:** `u-`

```scss
// 7-utilities/_spacing.scss
.u-mt-sm { margin-top: $spacing-sm !important; }
.u-mt-md { margin-top: $spacing-md !important; }

// 7-utilities/_display.scss
.u-hidden { display: none !important; }
.u-flex { display: flex !important; }
```

**Key Points:**
- Use `u-` prefix
- Single purpose
- Can use !important (last layer)
- Override anything
- Trump card utilities

---

## Import Order (CRITICAL!)

```scss
// scss/main.scss

// 1. Settings (no output)
@import '1-settings/colors';
@import '1-settings/typography';
@import '1-settings/spacing';

// 2. Tools (no output)
@import '2-tools/functions';
@import '2-tools/mixins';

// 3. Generic (first CSS output)
@import '3-generic/reset';

// 4. Elements
@import '4-elements/page';
@import '4-elements/typography';

// 5. Objects (OOCSS)
@import '5-objects/container';
@import '5-objects/media';
@import '5-objects/grid';

// 6. Components (BEM)
@import '6-components/button';
@import '6-components/card';
@import '6-components/navigation';

// 7. Utilities (highest specificity)
@import '7-utilities/spacing';
@import '7-utilities/display';
@import '7-utilities/text';
```

**Never break this order!** It's the core of ITCSS.

---

## HTML Usage

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <link rel="stylesheet" href="dist/css/main.css">
</head>
<body>
  <!-- Layer 5: Object -->
  <div class="o-container">

    <!-- Layer 6: Component + Layer 7: Utility -->
    <header class="u-mb-8">
      <h1>ITCSS Demo</h1>  <!-- Layer 4: Element -->
    </header>

    <!-- Layer 5: Object -->
    <div class="o-grid o-grid--2col">

      <!-- Layer 6: Component -->
      <div class="c-card">
        <div class="c-card__header">
          Card Title
        </div>
        <div class="c-card__body">
          <p>Content</p>

          <!-- Layer 6: Component + Layer 7: Utility -->
          <button class="c-button c-button--primary u-mt-4">
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

## Key Benefits

### ✅ Specificity Management
- Naturally increases from top to bottom
- No specificity wars
- Predictable cascade

### ✅ Scalability
- Add to appropriate layer
- Clear structure
- Easy to find code

### ✅ Reusability
- Objects are generic
- Components are specific
- Utilities override everything

### ✅ Team-Friendly
- Clear naming conventions
- Easy to understand
- Consistent organization

---

## Specificity Graph

```
High │                              ▲
     │                          ▲▲▲▲  (Utilities)
     │                      ▲▲▲▲▲▲▲▲  (Components)
     │                  ▲▲▲▲▲▲▲▲▲▲▲▲  (Objects)
     │              ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲  (Elements)
     │          ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲  (Generic)
Low  └──────────────────────────────────────────
        1   2   3   4   5   6   7
```

**Perfect triangle:** Specificity increases gradually, no jumps!

---

## Naming Conventions

| Layer | Prefix | Example |
|-------|--------|---------|
| Settings | `$` | `$color-primary` |
| Tools | `@` | `@mixin respond-to()` |
| Generic | None | `*`, `body` |
| Elements | None | `h1`, `p`, `a` |
| Objects | `o-` | `.o-container`, `.o-media` |
| Components | `c-` | `.c-button`, `.c-card` |
| Utilities | `u-` | `.u-mt-4`, `.u-hidden` |

---

## Common Mistakes

### ❌ Wrong Import Order
```scss
@import 'utilities';  // Too early!
@import 'components';
```

### ❌ Wrong Layer Placement
```scss
// 5-objects/_container.scss
.o-container {
  background: blue;  // No! Objects shouldn't have visual styles
}
```

### ❌ Breaking the Triangle
```scss
// 6-components/_button.scss
#special-button { ... }  // No IDs! Too specific!
```

---

## Real-World Usage

ITCSS is used by:
- BBC
- FT (Financial Times)
- Sky
- Many UK agencies

**Best for:**
- Large-scale projects
- Teams needing structure
- Projects requiring specificity control
- Scalable architectures

---

## Further Reading

- [ITCSS by Harry Roberts](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/)
- Works perfectly with Sass
- Combine with BEM for components
- Combine with OOCSS for objects

---

This solution demonstrates **production-grade CSS architecture** used by major companies worldwide! 🏗️

