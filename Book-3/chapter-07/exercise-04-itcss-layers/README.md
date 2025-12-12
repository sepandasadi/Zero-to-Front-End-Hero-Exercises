# Exercise 4: ITCSS Layer Implementation

## Difficulty
⭐⭐⭐ Advanced

## Time Estimate
2-3 hours

## Learning Objectives
- Master all 7 ITCSS layers
- Understand specificity progression
- Practice proper import order
- Use layer-specific prefixes
- Build a complete ITCSS architecture

---

## The Challenge

Build a complete ITCSS architecture from scratch with all 7 layers. This is the gold standard for preventing specificity wars!

---

## The 7 ITCSS Layers

### Layer 1: Settings
**Variables, no CSS output**
- Colors, spacing, typography
- Breakpoints, z-index
- Design tokens

### Layer 2: Tools
**Mixins/functions, no CSS output**
- Breakpoint mixins
- Utility functions
- Helper mixins

### Layer 3: Generic
**Resets, very low specificity**
- Normalize.css
- Box-sizing
- Reset margins

### Layer 4: Elements
**Bare HTML elements**
- `h1`, `h2`, `h3`
- `a`, `button`
- `p`, `ul`, `ol`

### Layer 5: Objects
**Layout primitives** (prefix: `.o-`)
- `.o-container`
- `.o-grid`
- `.o-media`

### Layer 6: Components
**UI modules** (prefix: `.c-`)
- `.c-button`
- `.c-card`
- `.c-modal`

### Layer 7: Utilities
**Overrides** (prefix: `.u-`)
- `.u-text-center`
- `.u-hidden`
- `.u-mt-lg`

---

## Requirements

### Complete Folder Structure

```
scss/
├── 01-settings/
│   ├── _colors.scss
│   ├── _spacing.scss
│   ├── _typography.scss
│   └── _breakpoints.scss
├── 02-tools/
│   ├── _mixins.scss
│   └── _functions.scss
├── 03-generic/
│   ├── _box-sizing.scss
│   └── _reset.scss
├── 04-elements/
│   ├── _typography.scss
│   ├── _links.scss
│   └── _forms.scss
├── 05-objects/
│   ├── _container.scss    (.o-container)
│   ├── _grid.scss         (.o-grid)
│   └── _media.scss        (.o-media)
├── 06-components/
│   ├── _button.scss       (.c-button)
│   ├── _card.scss         (.c-card)
│   └── _modal.scss        (.c-modal)
├── 07-utilities/
│   ├── _text.scss         (.u-text-*)
│   ├── _spacing.scss      (.u-m-*, .u-p-*)
│   └── _display.scss      (.u-hidden, etc.)
└── main.scss
```

### Components to Build

**Objects (Layout):**
1. Container (responsive max-width)
2. Grid (2-col, 3-col, 4-col)
3. Media Object

**Components (UI):**
1. Button (primary, secondary, ghost)
2. Card (with header, body, footer)
3. Modal (backdrop, content)

**Utilities:**
1. Text alignment
2. Spacing helpers
3. Display utilities

---

## Critical: Import Order

**This MUST be the order in main.scss:**

```scss
// 1. Settings (variables)
@import '01-settings/colors';
@import '01-settings/spacing';
@import '01-settings/typography';
@import '01-settings/breakpoints';

// 2. Tools (mixins/functions)
@import '02-tools/mixins';
@import '02-tools/functions';

// 3. Generic (resets)
@import '03-generic/box-sizing';
@import '03-generic/reset';

// 4. Elements (HTML elements)
@import '04-elements/typography';
@import '04-elements/links';
@import '04-elements/forms';

// 5. Objects (layout)
@import '05-objects/container';
@import '05-objects/grid';
@import '05-objects/media';

// 6. Components (UI)
@import '06-components/button';
@import '06-components/card';
@import '06-components/modal';

// 7. Utilities (overrides)
@import '07-utilities/text';
@import '07-utilities/spacing';
@import '07-utilities/display';
```

**Order matters!** Wrong order = specificity chaos.

---

## Success Criteria

✅ All 7 layers created
✅ Correct import order
✅ Appropriate prefixes (`.o-`, `.c-`, `.u-`)
✅ Specificity increases gradually
✅ No specificity wars
✅ Components work perfectly

---

## Specificity Progression

```
Settings:    No output
Tools:       No output
Generic:     *, html (0,0,0 - 0,0,1)
Elements:    h1, a    (0,0,1)
Objects:     .o-grid  (0,1,0)
Components:  .c-button (0,1,0)
Utilities:   .u-hidden !important (0,1,0 + !important)
```

**This is the power of ITCSS!** 🎯

---

**Build your architecture!** 🏗️

