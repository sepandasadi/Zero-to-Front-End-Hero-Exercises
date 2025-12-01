# Exercise 6: Real-World Production Architecture

## Difficulty
⭐⭐⭐ Advanced

## Time Estimate
4-6 hours

## Learning Objectives
- Build production-ready structure
- Mix methodologies effectively (ITCSS + BEM + OOCSS)
- Create scalable component library
- Practice enterprise-level organization
- Master the winning combination

---

## The Challenge

Build a complete component library using **ITCSS + BEM + OOCSS patterns** - the methodology combination used by Shopify, BBC, and GOV.UK.

This is what you'd actually use in production!

---

## Architecture: ITCSS + BEM + OOCSS

### ITCSS (Structure)
7 layers for file organization

### BEM (Naming)
Clear component naming

### OOCSS (Patterns)
Reusable layout objects

---

## Requirements

### Complete Folder Structure

```
src/styles/
├── 01-settings/
│   ├── _tokens.scss           (Design tokens)
│   ├── _colors.scss
│   ├── _spacing.scss
│   ├── _typography.scss
│   └── _breakpoints.scss
├── 02-tools/
│   ├── _mixins.scss
│   ├── _functions.scss
│   └── _breakpoints.scss
├── 03-generic/
│   ├── _normalize.scss
│   └── _box-sizing.scss
├── 04-elements/
│   ├── _page.scss
│   ├── _typography.scss
│   ├── _links.scss
│   └── _forms.scss
├── 05-objects/                (OOCSS patterns)
│   ├── _container.scss        (.o-container)
│   ├── _grid.scss             (.o-grid)
│   ├── _media.scss            (.o-media)
│   └── _stack.scss            (.o-stack)
├── 06-components/             (BEM naming)
│   ├── _button.scss           (.button, .button--primary)
│   ├── _card.scss             (.card, .card__header)
│   ├── _modal.scss            (.modal, .modal__backdrop)
│   ├── _navigation.scss       (.nav, .nav__link)
│   └── _form.scss             (.form, .form__input)
├── 07-utilities/
│   ├── _text.scss             (.u-text-center)
│   ├── _spacing.scss          (.u-mt-sm, .u-mb-lg)
│   └── _display.scss          (.u-hidden, .u-sr-only)
└── main.scss
```

---

## Components to Build

### 1. Design Tokens (Settings Layer)

```scss
// _tokens.scss
$colors: (
  primary: #3b82f6,
  secondary: #8b5cf6,
  success: #10b981,
  danger: #ef4444,
  // ... more
);

$spacing: (
  xs: 4px,
  sm: 8px,
  md: 16px,
  lg: 24px,
  xl: 32px,
);

$font-sizes: (
  sm: 0.875rem,
  base: 1rem,
  lg: 1.125rem,
  xl: 1.25rem,
  // ... more
);
```

### 2. OOCSS Objects

**Container:**
```scss
.o-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 $spacing-lg;
}
```

**Grid:**
```scss
.o-grid {
  display: grid;
  gap: $spacing-lg;
}

.o-grid--2col { grid-template-columns: repeat(2, 1fr); }
.o-grid--3col { grid-template-columns: repeat(3, 1fr); }
```

**Media Object:**
```scss
.o-media {
  display: flex;
  gap: $spacing-md;
}

.o-media__figure { flex-shrink: 0; }
.o-media__body { flex: 1; }
```

### 3. BEM Components

**Button (3+ variants):**
```scss
.button { /* structure */ }
.button--primary { /* skin */ }
.button--secondary { /* skin */ }
.button--ghost { /* skin */ }
.button--large { /* size */ }
.button--small { /* size */ }
```

**Card:**
```scss
.card { }
.card__header { }
.card__body { }
.card__footer { }
.card--featured { }
```

**Modal:**
```scss
.modal { }
.modal__backdrop { }
.modal__content { }
.modal__header { }
.modal__body { }
.modal__footer { }
```

**Navigation:**
```scss
.nav { }
.nav__list { }
.nav__item { }
.nav__link { }
.nav__link--active { }
```

**Form:**
```scss
.form { }
.form__group { }
.form__label { }
.form__input { }
.form__error { }
```

### 4. Utilities

```scss
// Text
.u-text-center { text-align: center !important; }
.u-text-left { text-align: left !important; }

// Spacing
.u-mt-sm { margin-top: $spacing-sm !important; }
.u-mb-md { margin-bottom: $spacing-md !important; }

// Display
.u-hidden { display: none !important; }
.u-sr-only { @include visually-hidden; }
```

---

## Example Usage

```html
<!-- ITCSS Layer 5: Objects (layout) -->
<div class="o-container">
  <div class="o-grid o-grid--3col">

    <!-- ITCSS Layer 6: Components (UI) with BEM -->
    <div class="card card--featured">
      <div class="card__header">
        <!-- ITCSS Layer 7: Utilities (overrides) -->
        <h3 class="u-text-center u-mt-0">Title</h3>
      </div>
      <div class="card__body">
        <!-- OOCSS Media Object -->
        <div class="o-media">
          <div class="o-media__figure">
            <img src="avatar.jpg" alt="User">
          </div>
          <div class="o-media__body">
            <p>Content here</p>
            <!-- BEM Component -->
            <button class="button button--primary">
              Action
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>
```

**See how they all work together?** 🎯

---

## Success Criteria

✅ Complete 7-layer ITCSS structure
✅ All components use BEM naming
✅ OOCSS patterns for layout
✅ Design token system
✅ 5+ working components
✅ Utilities for overrides
✅ Dark mode support
✅ Production-quality code

---

## Deliverables

1. **Complete file structure**
2. **Compiled CSS < 75KB** (unminified)
3. **Demo page** showing all components
4. **Documentation** explaining architecture decisions

---

## Going Further

### Bonus Challenges

1. **Add Storybook** for component documentation
2. **TypeScript types** for theme
3. **CSS Variables** for theming
4. **Responsive system** with breakpoint mixins
5. **npm package** setup for distribution

---

**This is production-ready architecture!** 🏗️

**Companies use this exact pattern. Master it!** ⭐

