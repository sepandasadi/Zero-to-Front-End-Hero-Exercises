# Challenge Project: Design System Foundation

## Difficulty
⭐⭐⭐⭐ Expert

## Time Estimate
8-12 hours

## Overview

Build a complete design system foundation using the winning combination: **ITCSS + BEM + OOCSS**.

This is a professional, production-ready design system that could be used by a real company. Take your time and do it right!

---

## The Mission

Create "DesignOps UI" - a complete design system with:
- Full token architecture
- Reusable OOCSS patterns
- Complete component library
- Light + dark themes
- Excellent accessibility
- Professional documentation

---

## Requirements

### 1. Architecture (ITCSS)

Complete 7-layer structure with proper import order:

```
designops-ui/
├── src/
│   └── styles/
│       ├── 01-settings/
│       ├── 02-tools/
│       ├── 03-generic/
│       ├── 04-elements/
│       ├── 05-objects/
│       ├── 06-components/
│       ├── 07-utilities/
│       └── main.scss
├── dist/
│   └── designops-ui.css
├── docs/
│   └── index.html
└── README.md
```

---

### 2. Design Tokens (Comprehensive)

**Colors:**
```scss
// Semantic colors
$colors: (
  primary: #3b82f6,
  secondary: #8b5cf6,
  success: #10b981,
  warning: #f59e0b,
  danger: #ef4444,

  // Neutrals
  gray-50: #f9fafb,
  gray-100: #f3f4f6,
  // ... up to gray-900

  // Surface colors
  surface: white,
  surface-muted: #f9fafb,
  text: #111827,
  text-muted: #6b7280,
);
```

**Spacing (4px/8px baseline):**
```scss
$spacing: (
  0: 0,
  1: 4px,
  2: 8px,
  3: 12px,
  4: 16px,
  5: 20px,
  6: 24px,
  8: 32px,
  10: 40px,
  12: 48px,
  16: 64px,
);
```

**Typography:**
```scss
$font-family: (
  sans: ('Inter', system-ui, sans-serif),
  mono: ('Fira Code', monospace),
);

$font-size: (
  xs: 0.75rem,    // 12px
  sm: 0.875rem,   // 14px
  base: 1rem,     // 16px
  lg: 1.125rem,   // 18px
  xl: 1.25rem,    // 20px
  2xl: 1.5rem,    // 24px
  3xl: 2rem,      // 32px
  4xl: 2.5rem,    // 40px
);

$font-weight: (
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
);

$line-height: (
  tight: 1.25,
  normal: 1.5,
  relaxed: 1.75,
);
```

**Border Radius:**
```scss
$radius: (
  none: 0,
  sm: 4px,
  base: 8px,
  md: 12px,
  lg: 16px,
  full: 9999px,
);
```

**Shadows:**
```scss
$shadow: (
  sm: 0 1px 2px rgba(0,0,0,0.05),
  base: 0 2px 8px rgba(0,0,0,0.1),
  md: 0 4px 12px rgba(0,0,0,0.1),
  lg: 0 8px 24px rgba(0,0,0,0.15),
  xl: 0 12px 32px rgba(0,0,0,0.2),
);
```

**Breakpoints:**
```scss
$breakpoints: (
  sm: 640px,
  md: 768px,
  lg: 1024px,
  xl: 1280px,
  2xl: 1536px,
);
```

**Z-Index:**
```scss
$z-index: (
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modal-backdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
);
```

---

### 3. Objects (OOCSS Patterns)

Build these layout primitives:

1. **Container** (responsive max-width)
   - `.o-container`
   - `.o-container--narrow`
   - `.o-container--wide`

2. **Grid** (flexible grid system)
   - `.o-grid`
   - `.o-grid--2col`, `.o-grid--3col`, `.o-grid--4col`
   - `.o-grid--auto` (auto-fit)

3. **Media Object** (image + content)
   - `.o-media`
   - `.o-media__figure`, `.o-media__body`
   - `.o-media--reverse`, `.o-media--stack`

4. **Stack** (vertical spacing)
   - `.o-stack`
   - `.o-stack--sm`, `.o-stack--md`, `.o-stack--lg`

5. **Flex utilities**
   - `.o-flex`
   - `.o-flex--column`, `.o-flex--center`, `.o-flex--between`

---

### 4. Components (BEM Naming)

Build at least 8 components:

#### Core Components (Required)

1. **Button**
   - Variants: primary, secondary, ghost, danger
   - Sizes: small, base, large
   - States: hover, active, disabled, loading
   - Icon support

2. **Card**
   - Sections: header, body, footer
   - Variants: default, featured, bordered
   - Hover effects

3. **Modal**
   - Backdrop overlay
   - Content container
   - Close button
   - Scrollable body
   - Centered positioning

4. **Navigation**
   - Horizontal and vertical
   - Active states
   - Dropdown support
   - Mobile responsive

5. **Form**
   - Input, select, textarea
   - Labels and helper text
   - Error states
   - Success states
   - Disabled states

6. **Badge**
   - Colors: primary, success, warning, danger
   - Sizes: small, base, large

7. **Alert**
   - Types: success, error, warning, info
   - Dismissible
   - Icon support

8. **Table**
   - Striped rows
   - Hoverable rows
   - Responsive (scroll on mobile)

---

### 5. Utilities

Essential overrides:

**Text:**
- `.u-text-center`, `.u-text-left`, `.u-text-right`
- `.u-text-uppercase`, `.u-text-lowercase`
- `.u-text-bold`, `.u-text-normal`
- `.u-truncate`

**Spacing:**
- `.u-m-{size}`, `.u-mt-{size}`, `.u-mb-{size}`, etc.
- `.u-p-{size}`, `.u-pt-{size}`, `.u-pb-{size}`, etc.

**Display:**
- `.u-block`, `.u-inline`, `.u-inline-block`, `.u-flex`, `.u-grid`
- `.u-hidden`
- `.u-sr-only` (visually hidden, accessible)

**Colors:**
- `.u-text-primary`, `.u-text-success`, `.u-text-danger`
- `.u-bg-primary`, `.u-bg-gray`

---

### 6. Themes

**Light theme (default):**
```scss
:root {
  --color-primary: #3b82f6;
  --color-surface: #ffffff;
  --color-text: #111827;
  --shadow-base: 0 2px 8px rgba(0,0,0,0.1);
}
```

**Dark theme:**
```scss
[data-theme="dark"] {
  --color-primary: #60a5fa;  // Lighter for dark bg
  --color-surface: #1f2937;
  --color-text: #f9fafb;
  --shadow-base: 0 2px 8px rgba(0,0,0,0.3);
}
```

**Theme switcher:**
```javascript
function toggleTheme() {
  const html = document.documentElement;
  const current = html.dataset.theme || 'light';
  html.dataset.theme = current === 'light' ? 'dark' : 'light';
  localStorage.setItem('theme', html.dataset.theme);
}
```

---

### 7. Documentation

**README.md:**
```markdown
# DesignOps UI

A production-ready design system built with ITCSS + BEM + OOCSS.

## Installation
## Usage
## Components
## Theming
## Architecture
## Contributing
```

**Demo page (`docs/index.html`):**
- Show all components
- Interactive examples
- Dark mode toggle
- Responsive demo

---

## Evaluation Criteria

### Code Quality (40 points)
- ✅ Proper ITCSS layer organization (10 pts)
- ✅ Consistent BEM naming (10 pts)
- ✅ Reusable OOCSS patterns (10 pts)
- ✅ Low specificity (mostly 0,1,0) (10 pts)

### Completeness (30 points)
- ✅ All tokens defined (5 pts)
- ✅ All objects built (5 pts)
- ✅ 8+ components (10 pts)
- ✅ Utilities implemented (5 pts)
- ✅ Dark mode works (5 pts)

### Quality (20 points)
- ✅ Compiled CSS < 75KB (5 pts)
- ✅ All components accessible (5 pts)
- ✅ Responsive on all screens (5 pts)
- ✅ No console errors/warnings (5 pts)

### Documentation (10 points)
- ✅ README with clear instructions (5 pts)
- ✅ Demo page with all components (5 pts)

**Total: 100 points**

**90+ = Exceptional** ⭐⭐⭐
**75-89 = Excellent** ⭐⭐
**60-74 = Good** ⭐
**< 60 = Needs improvement**

---

## Bonus Points (+20 max)

- **+5** Storybook integration
- **+5** TypeScript theme types
- **+5** Automated visual regression tests
- **+5** npm package setup
- **+5** CI/CD pipeline
- **+5** Additional 5+ components

---

## Deliverables

1. **Complete codebase**
   - All 7 ITCSS layers
   - All components
   - Compiled CSS

2. **Demo page**
   - Shows all components
   - Interactive
   - Responsive
   - Dark mode toggle

3. **Documentation**
   - README.md
   - Architecture explanation
   - Usage guide

4. **Optional: Deploy it!**
   - Host on GitHub Pages
   - Share the link

---

## Timeline

**Suggested breakdown:**

- **Day 1 (2-3 hours):** Architecture + Tokens + Objects
- **Day 2 (3-4 hours):** Core Components (Button, Card, Modal)
- **Day 3 (2-3 hours):** More Components (Nav, Form, Alert)
- **Day 4 (1-2 hours):** Theming + Utilities + Polish
- **Day 5 (1 hour):** Documentation + Demo page

---

## Success Tips

1. **Start with tokens** - Everything flows from here
2. **Build objects first** - Layout before components
3. **One component at a time** - Don't rush
4. **Test responsiveness early** - Don't leave it to the end
5. **Document as you go** - Don't save it all for last

---

**This is your masterpiece. Take your time. Make it professional.**

**When you're done, you'll have a portfolio piece that shows real expertise!** 🏆

---

**Ready? Let's build a design system!** 🚀

