# Exercise 03: SMACSS Organization - Hints

## Overview

SMACSS (Scalable and Modular Architecture for CSS) organizes CSS into **5 categories**:

1. **Base** - Element defaults (no classes)
2. **Layout** - Major page sections
3. **Module** - Reusable components
4. **State** - How things look in different states
5. **Theme** - Color schemes and typography

---

## SMACSS File Structure

```
css/
├── base.css         # Element defaults
├── layout.css       # Page structure
├── module/
│   ├── buttons.css
│   ├── cards.css
│   ├── forms.css
│   └── navigation.css
├── state.css        # State rules
└── theme.css        # Theme variables
```

---

## 1. Base Rules

**No classes** - style elements directly:

```css
/* base.css */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, sans-serif;
  line-height: 1.6;
  color: #333;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: 0.5em;
}

a {
  color: #007bff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
```

---

## 2. Layout Rules

Use **`l-` prefix** for layout containers:

```css
/* layout.css */
.l-header {
  padding: 1rem 0;
  border-bottom: 1px solid #ddd;
}

.l-sidebar {
  width: 250px;
  padding: 1rem;
}

.l-main {
  flex: 1;
  padding: 2rem;
}

.l-footer {
  padding: 2rem 0;
  border-top: 1px solid #ddd;
}

/* Layout composition */
.l-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.l-grid {
  display: grid;
  gap: 2rem;
}

.l-grid--2col {
  grid-template-columns: repeat(2, 1fr);
}
```

---

## 3. Module Rules

Reusable components - most of your CSS:

```css
/* module/buttons.css */
.button {
  display: inline-block;
  padding: 0.5rem 1rem;
  border: 2px solid transparent;
  border-radius: 0.25rem;
  cursor: pointer;
}

.button-primary {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.button-secondary {
  background: #6c757d;
  color: white;
  border-color: #6c757d;
}

/* module/cards.css */
.card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.card-header {
  padding: 1rem;
  border-bottom: 1px solid #ddd;
  font-weight: 600;
}

.card-body {
  padding: 1rem;
}

.card-footer {
  padding: 1rem;
  border-top: 1px solid #ddd;
  background: #f8f9fa;
}
```

---

## 4. State Rules

Use **`is-` prefix** for states:

```css
/* state.css */
.is-hidden {
  display: none !important;
}

.is-visible {
  display: block !important;
}

.is-active {
  font-weight: bold;
  color: #007bff;
}

.is-disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}

.is-loading {
  position: relative;
  pointer-events: none;
}

.is-loading::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.8);
}

.is-error {
  border-color: #dc3545 !important;
  color: #dc3545;
}

.is-success {
  border-color: #28a745 !important;
  color: #28a745;
}
```

---

## 5. Theme Rules

Use **`theme-` prefix** for theme variations:

```css
/* theme.css */
:root {
  --color-primary: #007bff;
  --color-secondary: #6c757d;
  --color-success: #28a745;
  --color-danger: #dc3545;
  --color-background: #ffffff;
  --color-text: #333333;
}

[data-theme="dark"] {
  --color-background: #1a1a1a;
  --color-text: #f5f5f5;
  --color-primary: #4dabf7;
}

.theme-dark {
  background: var(--color-background);
  color: var(--color-text);
}

.theme-primary {
  color: var(--color-primary);
}
```

---

## Import Order (Critical!)

```css
/* main.css */
@import 'base.css';      /* 1. Element defaults */
@import 'layout.css';    /* 2. Page structure */
@import 'module/*.css';  /* 3. Components */
@import 'state.css';     /* 4. State overrides */
@import 'theme.css';     /* 5. Theme variables */
```

**Why this order?**
- Base styles apply first
- Layout sets structure
- Modules add components
- States override when needed
- Theme can override everything

---

## Naming Conventions

### Layout: `l-name`
```css
.l-header
.l-sidebar
.l-main
.l-footer
```

### Modules: descriptive names
```css
.card
.button
.navigation
.form
```

### Sub-elements: `module-element`
```css
.card-header
.card-body
.button-icon
```

### States: `is-state`
```css
.is-active
.is-hidden
.is-loading
```

### Themes: `theme-name`
```css
.theme-dark
.theme-primary
```

---

## Key SMACSS Principles

1. **Categorization is king** - Know which category your CSS belongs to
2. **Shallow depth** - Keep specificity low
3. **Consistent prefixes** - Easy to identify category
4. **Minimize nesting** - Avoid deep Sass nesting
5. **State overrides** - States can use !important sparingly

---

## Example: Organizing Messy CSS

**Before (messy):**
```css
/* All in one file, no organization */
body { margin: 0; }
.sidebar { width: 250px; }
.card { background: white; }
.card.active { border: 2px solid blue; }
.dark .card { background: black; }
```

**After (SMACSS):**
```css
/* base.css */
body {
  margin: 0;
  padding: 0;
}

/* layout.css */
.l-sidebar {
  width: 250px;
}

/* module/cards.css */
.card {
  background: white;
  border-radius: 8px;
}

/* state.css */
.card.is-active {
  border: 2px solid blue;
}

/* theme.css */
[data-theme="dark"] .card {
  background: black;
}
```

---

## Success Criteria

Your organized codebase should:
- [ ] Have 5 clear categories
- [ ] Use consistent prefixes
- [ ] Have proper import order
- [ ] Be easy to navigate
- [ ] Have shallow specificity

Good luck organizing with SMACSS! 📁

