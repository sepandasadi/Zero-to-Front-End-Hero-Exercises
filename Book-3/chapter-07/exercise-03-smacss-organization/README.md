# Exercise 3: SMACSS File Organization

## Difficulty
⭐⭐ Intermediate

## Time Estimate
1-2 hours

## Learning Objectives
- Master SMACSS's 5 categories
- Practice file organization
- Use appropriate prefixes (`.l-`, `.is-`, etc.)
- Create proper import order
- Categorize styles by intent

---

## The Challenge

You've inherited a mess! There's a pile of CSS files with no organization. Your job is to reorganize them using SMACSS's 5-category system.

---

## The 5 SMACSS Categories

### 1. Base
Element defaults (no classes)
- Reset/normalize
- Typography
- Form elements

### 2. Layout
Major page regions (prefix: `.l-`)
- Header, sidebar, footer
- Grid systems
- Containers

### 3. Module
Reusable components
- Buttons, cards, modals
- Navigation, tabs
- Forms (as components)

### 4. State
Temporary conditions (prefix: `.is-`, `.has-`)
- `.is-active`
- `.is-hidden`
- `.is-loading`
- `.has-error`

### 5. Theme
Visual variations
- Light/dark themes
- Brand colors
- Seasonal themes

---

## Requirements

### Folder Structure to Create

```
styles/
├── base/
│   ├── _reset.scss
│   ├── _typography.scss
│   └── _forms.scss
├── layout/
│   ├── _header.scss       (.l-header)
│   ├── _sidebar.scss      (.l-sidebar)
│   ├── _main.scss         (.l-main)
│   └── _footer.scss       (.l-footer)
├── modules/
│   ├── _button.scss       (.button)
│   ├── _card.scss         (.card)
│   ├── _modal.scss        (.modal)
│   └── _navigation.scss   (.nav)
├── state/
│   └── _states.scss       (.is-*, .has-*)
├── theme/
│   ├── _default.scss
│   └── _dark.scss
└── main.scss              (imports everything)
```

### Tasks

1. **Categorize existing styles**
   - Read through provided messy CSS
   - Identify what category each style belongs to
   - Move to appropriate files

2. **Add prefixes**
   - Layout: `.l-header`, `.l-sidebar`
   - State: `.is-active`, `.is-hidden`

3. **Create main.scss**
   - Import in correct order
   - Base → Layout → Module → State → Theme

4. **Refactor as needed**
   - Fix any location dependencies
   - Make modules standalone

---

## Starter Code

The `starter/` directory contains:
- `messy-styles.css` - All styles in one file (chaos!)
- `components.html` - HTML that uses these styles
- Instructions on what to categorize

---

## Success Criteria

✅ All styles properly categorized
✅ Correct file structure created
✅ Appropriate prefixes used
✅ Import order is correct
✅ No location dependencies
✅ Easy to find any style

---

## Decision Guide

**Where does X go?**

- Element selector (`h1`, `a`, `button`) → **Base**
- Page region (`.header`, `.sidebar`) → **Layout** (add `l-` prefix)
- Reusable component (`.card`, `.button`) → **Module**
- JavaScript toggle (`.active`, `.hidden`) → **State** (add `is-` prefix)
- Color scheme (`.dark-theme`) → **Theme**

---

**Let's organize this chaos!** 📁

