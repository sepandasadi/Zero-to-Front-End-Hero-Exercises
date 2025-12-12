# Exercise 03: SMACSS Organization - Solution

## Overview

This solution demonstrates how to organize messy, single-file CSS into SMACSS's 5-category system.

---

## File Structure

```
solution/
├── index.html
└── css/
    ├── base.css           # Element defaults
    ├── layout.css         # Page structure (l-*)
    ├── module/
    │   ├── buttons.css    # Button component
    │   ├── cards.css      # Card component
    │   ├── navigation.css # Navigation component
    │   ├── alerts.css     # Alert component
    │   ├── forms.css      # Form component
    │   └── badges.css     # Badge component
    ├── state.css          # State rules (is-*)
    ├── theme.css          # Theme variables
    └── main.css           # Import orchestration
```

---

## What's Different from Starter?

### Before (Messy)
- ❌ All CSS in one file
- ❌ No organization
- ❌ Mixed concerns
- ❌ Hard to find things
- ❌ Difficult to maintain

### After (SMACSS)
- ✅ 5 clear categories
- ✅ Logical organization
- ✅ Consistent prefixes
- ✅ Easy to navigate
- ✅ Scalable structure

---

## Category Breakdown

### 1. Base (base.css)

**What goes here:** Element defaults with no classes

```css
* { box-sizing: border-box; }
body { font-family: ...; }
h1, h2, h3 { font-weight: 600; }
a { color: ...; }
```

**Rules:**
- No classes
- No IDs
- Only element selectors
- Reset/normalize code

---

### 2. Layout (layout.css)

**What goes here:** Major page sections with `l-` prefix

```css
.l-header { ... }
.l-container { ... }
.l-sidebar { ... }
.l-main { ... }
```

**Rules:**
- Use `l-` prefix
- Page structure only
- Not visual styles
- Reusable containers

---

### 3. Modules (module/*.css)

**What goes here:** Reusable components in separate files

```css
/* module/buttons.css */
.button { ... }
.button-primary { ... }

/* module/cards.css */
.card { ... }
.card-header { ... }
```

**Rules:**
- Descriptive names (no prefix needed)
- Sub-elements use module-element
- One file per component
- Most of your CSS lives here

---

### 4. State (state.css)

**What goes here:** UI state changes with `is-` prefix

```css
.is-hidden { display: none !important; }
.is-active { font-weight: bold; }
.is-disabled { opacity: 0.6; }
.is-loading { ... }
```

**Rules:**
- Use `is-` prefix
- Can use !important
- Override module styles
- Represent state changes

---

### 5. Theme (theme.css)

**What goes here:** Color schemes and theme variations

```css
:root {
  --color-primary: #007bff;
  --color-background: #ffffff;
}

[data-theme="dark"] {
  --color-background: #1a1a1a;
}
```

**Rules:**
- CSS custom properties
- Theme variants
- Can override anything
- Late in import order

---

## Import Order

**Critical:** Import in this specific order

```css
/* css/main.css */
@import 'base.css';           /* 1. Element defaults */
@import 'layout.css';         /* 2. Page structure */
@import 'module/buttons.css'; /* 3. Components */
@import 'module/cards.css';
@import 'module/navigation.css';
@import 'module/alerts.css';
@import 'module/forms.css';
@import 'module/badges.css';
@import 'state.css';          /* 4. State overrides */
@import 'theme.css';          /* 5. Theme variables */
```

**Why this order?**
1. Base styles first (lowest specificity)
2. Layout sets structure
3. Modules add components
4. States override when needed
5. Themes can override everything

---

## Naming Patterns

| Type | Pattern | Example |
|------|---------|---------|
| Layout | `l-name` | `.l-header`, `.l-sidebar` |
| Module | `name` | `.card`, `.button` |
| Sub-element | `module-element` | `.card-header`, `.button-icon` |
| State | `is-state` | `.is-active`, `.is-hidden` |
| Theme | `theme-name` or custom properties | `[data-theme="dark"]` |

---

## HTML Updates

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Changed from messy.css to organized main.css -->
  <link rel="stylesheet" href="css/main.css">
</head>
<body>
  <!-- Layout classes use l- prefix -->
  <div class="l-container">
    <header class="l-header">
      <nav>
        <!-- State classes use is- prefix -->
        <a href="#" class="navigation-link is-active">Home</a>
      </nav>
    </header>

    <main class="l-main">
      <!-- Modules use descriptive names -->
      <button class="button button-primary">Click</button>

      <div class="card">
        <div class="card-header">Title</div>
        <div class="card-body">Content</div>
      </div>
    </main>
  </div>
</body>
</html>
```

---

## Key Takeaways

### ✅ Organization
- Clear categories make code easy to navigate
- Know exactly where to find/add CSS
- Scales well for large projects

### ✅ Naming
- Prefixes indicate category at a glance
- Consistent patterns throughout
- No naming collisions

### ✅ Maintainability
- Easy to modify components
- Safe to delete unused code
- Clear dependencies

### ✅ Team-Friendly
- Anyone can understand structure
- Onboarding is easier
- Reduces "where does this go?" questions

---

## Metrics

| Metric | Before | After |
|--------|--------|-------|
| Files | 1 | 11 |
| Lines per file | 250+ | 20-50 |
| Find component | Search entire file | Go to specific file |
| Add new component | Anywhere | Create new module file |
| Specificity | Mixed | Consistent per category |

---

## Common SMACSS Mistakes to Avoid

❌ **Wrong:** Mixing categories
```css
/* base.css */
.button { ... }  /* This is a module, not base! */
```

✅ **Right:** Keep categories pure
```css
/* base.css */
button { ... }  /* Element only */

/* module/buttons.css */
.button { ... }  /* Class-based module */
```

❌ **Wrong:** Missing prefixes
```css
.header { ... }  /* Is this layout or module? */
```

✅ **Right:** Use consistent prefixes
```css
.l-header { ... }  /* Clearly layout */
```

---

## Real-World Usage

SMACSS is used by:
- Yahoo!
- Salesforce
- Many enterprise applications
- Large teams needing clear organization

**Best for:**
- Large codebases
- Multiple developers
- Long-term projects
- Clear file structure needs

---

## Further Reading

- [SMACSS Official](https://smacss.com/)
- Import order matters!
- Combine with BEM for component naming
- Works great with Sass partials

---

This solution demonstrates **production-ready CSS organization** used by major companies! 📁

