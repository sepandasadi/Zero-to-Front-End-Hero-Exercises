# Challenge: Design System Foundation - Getting Started

## Objective

Build a **complete, production-ready design system foundation** that rivals professional component libraries like Bootstrap or Tailwind.

This is a **portfolio-worthy** project! 🎨

---

## What You're Building

A comprehensive design system with:
- **Complete design tokens** (colors, typography, spacing, shadows)
- **ITCSS architecture** (all 7 layers)
- **Reusable components** (buttons, cards, forms, modals, alerts, badges)
- **OOCSS layout objects** (container, grid, media, flex)
- **Utility classes** (spacing, colors, display, text)
- **Component showcase** (interactive demo page)
- **Documentation** (usage examples)

---

## Project Scope

### Time Estimate
8-12 hours

### Difficulty
⭐⭐⭐⭐ Expert

### What Makes This Different
- Production-quality code
- Complete documentation
- All methodologies combined
- Portfolio-ready
- Scalable for real projects

---

## File Structure

```
challenge-design-system/
├── package.json
├── README.md                    # Documentation
├── index.html                   # Component showcase
└── scss/
    ├── 1-settings/
    │   ├── _colors.scss         # Complete color system
    │   ├── _typography.scss     # Font system
    │   ├── _spacing.scss        # Spacing scale
    │   ├── _shadows.scss        # Shadow tokens
    │   └── _borders.scss        # Border/radius tokens
    │
    ├── 2-tools/
    │   ├── _mixins.scss         # Utility mixins
    │   ├── _functions.scss      # Helper functions
    │   └── _bem-helpers.scss    # BEM shortcuts
    │
    ├── 3-generic/
    │   ├── _reset.scss          # CSS reset
    │   └── _normalize.scss      # Normalize.css
    │
    ├── 4-elements/
    │   ├── _page.scss           # html, body
    │   ├── _typography.scss     # h1-h6, p
    │   ├── _links.scss          # a tags
    │   └── _lists.scss          # ul, ol
    │
    ├── 5-objects/
    │   ├── _container.scss      # Max-width containers
    │   ├── _media.scss          # Media object
    │   ├── _grid.scss           # Grid system
    │   ├── _flex.scss           # Flex utilities
    │   └── _wrapper.scss        # Generic wrappers
    │
    ├── 6-components/
    │   ├── _button.scss         # Complete button system
    │   ├── _card.scss           # Card component
    │   ├── _form.scss           # Form container
    │   ├── _input.scss          # Input fields
    │   ├── _navigation.scss     # Navigation bar
    │   ├── _modal.scss          # Modal dialogs
    │   ├── _alert.scss          # Alert messages
    │   ├── _badge.scss          # Badges
    │   └── _dropdown.scss       # Dropdown menus
    │
    ├── 7-utilities/
    │   ├── _spacing.scss        # Margin/padding utilities
    │   ├── _display.scss        # Display utilities
    │   ├── _text.scss           # Text utilities
    │   ├── _colors.scss         # Color utilities
    │   └── _responsive.scss     # Responsive helpers
    │
    └── main.scss                # Main import orchestration
```

---

## Design Token System

### Color Scale (Settings)

```scss
// 1-settings/_colors.scss

// Primary color scale (9 shades)
$colors: (
  'primary-50': #eef2ff,
  'primary-100': #e0e7ff,
  'primary-200': #c7d2fe,
  'primary-300': #a5b4fc,
  'primary-400': #818cf8,
  'primary-500': #6366f1,  // Main
  'primary-600': #4f46e5,
  'primary-700': #4338ca,
  'primary-800': #3730a3,
  'primary-900': #312e81,

  // Secondary scale
  'secondary-50': #faf5ff,
  'secondary-500': #8b5cf6,
  'secondary-900': #4c1d95,

  // Semantic colors
  'success': #10b981,
  'danger': #ef4444,
  'warning': #f59e0b,
  'info': #3b82f6,

  // Neutral scale (11 shades)
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
  'gray-950': #030712,
);

@function color($name) {
  @if not map-has-key($colors, $name) {
    @warn "Color `#{$name}` not found in $colors map.";
  }
  @return map-get($colors, $name);
}
```

### Typography Scale

```scss
// 1-settings/_typography.scss

// Font families
$font-families: (
  'base': (-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif),
  'heading': ('Inter', -apple-system, sans-serif),
  'mono': ('Fira Code', 'Courier New', monospace)
);

// Font sizes (using modular scale)
$font-sizes: (
  'xs': 0.75rem,      // 12px
  'sm': 0.875rem,     // 14px
  'base': 1rem,       // 16px
  'lg': 1.125rem,     // 18px
  'xl': 1.25rem,      // 20px
  '2xl': 1.5rem,      // 24px
  '3xl': 1.875rem,    // 30px
  '4xl': 2.25rem,     // 36px
  '5xl': 3rem,        // 48px
  '6xl': 3.75rem,     // 60px
  '7xl': 4.5rem,      // 72px
);

// Font weights
$font-weights: (
  'light': 300,
  'normal': 400,
  'medium': 500,
  'semibold': 600,
  'bold': 700,
  'extrabold': 800,
);

// Line heights
$line-heights: (
  'none': 1,
  'tight': 1.25,
  'snug': 1.375,
  'normal': 1.5,
  'relaxed': 1.625,
  'loose': 2,
);
```

### Spacing Scale

```scss
// 1-settings/_spacing.scss

$spacing-base: 0.25rem; // 4px

$spacing: (
  '0': 0,
  '0.5': $spacing-base * 0.5,  // 2px
  '1': $spacing-base,           // 4px
  '1.5': $spacing-base * 1.5,   // 6px
  '2': $spacing-base * 2,       // 8px
  '2.5': $spacing-base * 2.5,   // 10px
  '3': $spacing-base * 3,       // 12px
  '4': $spacing-base * 4,       // 16px
  '5': $spacing-base * 5,       // 20px
  '6': $spacing-base * 6,       // 24px
  '7': $spacing-base * 7,       // 28px
  '8': $spacing-base * 8,       // 32px
  '10': $spacing-base * 10,     // 40px
  '12': $spacing-base * 12,     // 48px
  '16': $spacing-base * 16,     // 64px
  '20': $spacing-base * 20,     // 80px
  '24': $spacing-base * 24,     // 96px
);

@function spacing($key) {
  @return map-get($spacing, $key);
}
```

---

## Component Requirements

### 1. Button Component

Must include:
- **Sizes:** xs, sm, md (default), lg, xl
- **Variants:** primary, secondary, success, danger, warning, info
- **Styles:** solid, outline, ghost
- **States:** hover, active, disabled, loading
- **Features:** icon support, full-width option, button groups

### 2. Card Component

Must include:
- **Parts:** header, body, footer
- **Variants:** default, bordered, shadowed, featured
- **Features:** image support, overlay content

### 3. Form Components

Must include:
- Input fields (text, email, password, etc.)
- Textareas
- Select dropdowns
- Checkboxes & radios
- Error/success states
- Labels & help text

### 4. Navigation

Must include:
- Horizontal nav bar
- Logo placement
- Link styles (active state)
- Responsive (mobile menu)

### 5. Modal

Must include:
- Overlay/backdrop
- Close button
- Header, body, footer
- Sizes (sm, md, lg, xl)
- Animations (fade in/out)

### 6. Alert

Must include:
- Variants: success, danger, warning, info
- Dismissible option
- Icon support

### 7. Badge

Must include:
- Sizes: sm, md, lg
- Variants: all semantic colors
- Pill variant (fully rounded)

---

## Utility System

Generate utilities for:

### Spacing
```scss
// For each spacing value, generate:
.u-m-{key}    // margin
.u-mt-{key}   // margin-top
.u-mr-{key}   // margin-right
.u-mb-{key}   // margin-bottom
.u-ml-{key}   // margin-left
.u-mx-{key}   // margin left/right
.u-my-{key}   // margin top/bottom

// Same for padding (.u-p-, .u-pt-, etc.)
```

### Colors
```scss
.u-text-{color}      // text color
.u-bg-{color}        // background color
.u-border-{color}    // border color
```

### Display
```scss
.u-hidden
.u-block
.u-inline
.u-inline-block
.u-flex
.u-grid
```

### Text
```scss
.u-text-left
.u-text-center
.u-text-right
.u-text-xs through .u-text-7xl
.u-font-light through .u-font-extrabold
```

---

## Component Showcase (index.html)

Your showcase should include:

1. **Hero Section** - Design system title
2. **Colors** - Show full color palette
3. **Typography** - All font sizes and weights
4. **Spacing** - Visual spacing scale
5. **Buttons** - All variants and sizes
6. **Cards** - Different card types
7. **Forms** - Complete form example
8. **Navigation** - Working nav bar
9. **Modals** - Modal trigger demo
10. **Alerts** - All alert types
11. **Badges** - Badge examples

---

## Documentation (README.md)

Must include:

### Installation
```bash
npm install
npm run sass
```

### Usage Examples
```html
<!-- Button -->
<button class="c-button c-button--primary c-button--lg">
  Click Me
</button>

<!-- Card -->
<div class="c-card c-card--bordered">
  <div class="c-card__header">Title</div>
  <div class="c-card__body">Content</div>
</div>
```

### Naming Conventions
- Objects: `o-*`
- Components: `c-*`
- Utilities: `u-*`

### Architecture
- Based on ITCSS
- BEM naming for components
- OOCSS patterns for layouts

---

## Success Criteria

- [ ] Complete ITCSS 7-layer architecture
- [ ] All 9 components built
- [ ] Complete utility system
- [ ] Comprehensive design tokens
- [ ] Working component showcase
- [ ] Professional documentation
- [ ] Responsive design
- [ ] Accessible (ARIA when needed)
- [ ] Production-quality code
- [ ] Portfolio-ready

---

## Tips for Success

1. **Start with tokens** - Colors, typography, spacing first
2. **Build incrementally** - One component at a time
3. **Test as you go** - Update showcase page continuously
4. **Document everything** - Comments in code, examples in README
5. **Think reusability** - Every component should be flexible
6. **Consider accessibility** - Use semantic HTML, ARIA labels
7. **Be consistent** - Follow naming conventions throughout

---

## Stretch Goals

Want to go further?

- [ ] Dark mode support
- [ ] Animation system
- [ ] Icon system integration
- [ ] Table component
- [ ] Pagination component
- [ ] Toast notifications
- [ ] Tabs component
- [ ] Accordion component
- [ ] Tooltip component
- [ ] Progress bars

---

## Deliverables

1. ✅ Complete SCSS architecture (30+ files)
2. ✅ Compiled CSS
3. ✅ Component showcase HTML
4. ✅ Comprehensive README
5. ✅ package.json for build

---

This is your chance to build something **portfolio-worthy** that demonstrates mastery of CSS architecture! 🚀

Good luck building your design system!

