# Chapter 21 Quiz: Sass & SCSS

Test your understanding of Sass basics! This quiz covers the essential concepts introduced in Chapter 21. Advanced features will be covered in Part 3, Chapter 37.

---

## Questions

### 1. What's the main difference between Sass and SCSS syntax?

**A)** Sass is newer than SCSS
**B)** SCSS uses braces and semicolons (CSS-like), Sass uses indentation
**C)** Sass is faster than SCSS
**D)** They're exactly the same

<details>
<summary>Show Answer</summary>

**Answer: B**

**SCSS (.scss):**
```scss
.button {
  background: blue;
  &:hover {
    background: darkblue;
  }
}
```

**Sass (.sass):**
```sass
.button
  background: blue
  &:hover
    background: darkblue
```

SCSS is more popular because it looks like regular CSS!

</details>

---

### 2. How do you define a variable in Sass?

**A)** `var primary-color = blue;`
**B)** `--primary-color: blue;`
**C)** `$primary-color: blue;`
**D)** `@primary-color: blue;`

<details>
<summary>Show Answer</summary>

**Answer: C**

```scss
// Define variables with $
$primary-color: #007bff;
$spacing: 1rem;
$font-family: system-ui, sans-serif;

// Use them
.button {
  background: $primary-color;
  padding: $spacing;
  font-family: $font-family;
}
```

</details>

---

### 3. What does `&` represent in Sass?

**A)** And operator
**B)** Parent selector
**C)** Variable prefix
**D)** Comment symbol

<details>
<summary>Show Answer</summary>

**Answer: B**

`&` refers to the **parent selector**:

```scss
.button {
  background: blue;

  // & = .button
  &:hover {           // .button:hover
    background: darkblue;
  }

  &--primary {        // .button--primary
    background: #007bff;
  }

  .card & {           // .card .button
    width: 100%;
  }
}
```

</details>

---

### 4. What's wrong with this nesting?

```scss
.header {
  .nav {
    .menu {
      .list {
        .item {
          .link {
            color: blue;
          }
        }
      }
    }
  }
}
```

**A)** Nothing, it's fine
**B)** Too deeply nested, creates overly specific selectors
**C)** Missing semicolons
**D)** Wrong syntax

<details>
<summary>Show Answer</summary>

**Answer: B**

This compiles to: `.header .nav .menu .list .item .link { color: blue; }`

**Problems:**
- Extremely high specificity
- Hard to override
- Difficult to maintain

**Better approach:**
```scss
.nav__link {
  color: blue;
}
```

**Rule:** Maximum 3 levels of nesting!

</details>

---

### 5. How do you create a mixin?

**A)** `@function mixin-name { }`
**B)** `@mixin mixin-name { }`
**C)** `$mixin mixin-name { }`
**D)** `mixin mixin-name { }`

<details>
<summary>Show Answer</summary>

**Answer: B**

```scss
// Define with @mixin
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

// Use with @include
.modal {
  @include flex-center;
  height: 100vh;
}
```

</details>

---

### 6. What's the purpose of files starting with `_` (underscore)?

**A)** They're hidden files
**B)** They're partial files that won't compile directly
**C)** They're temporary files
**D)** They're backup files

<details>
<summary>Show Answer</summary>

**Answer: B**

**Partials** start with `_` and are imported by other files:

```
scss/
  _variables.scss  ← Partial (won't compile)
  _mixins.scss     ← Partial
  main.scss        ← Entry point (will compile)
```

```scss
// main.scss
@use 'variables';  // Imports _variables.scss
@use 'mixins';     // Imports _mixins.scss
```

Only `main.scss` compiles to `main.css`.

</details>

---

### 7. What does this Sass compile to?

```scss
$primary: #007bff;

.button {
  background: $primary;
  &:hover {
    background: darken($primary, 10%);
  }
}
```

**A)** Error, invalid syntax
**B)** `.button { background: #007bff; }` only
**C)** Correct CSS with hover state using darkened color
**D)** Variables don't work this way

<details>
<summary>Show Answer</summary>

**Answer: C**

Compiles to:
```css
.button {
  background: #007bff;
}

.button:hover {
  background: #0056b3; /* Automatically darkened */
}
```

`darken()` is a built-in Sass function that makes colors darker!

</details>

---

### 8. Which is the modern way to import Sass files?

**A)** `@import 'variables';`
**B)** `@use 'variables';`
**C)** `@require 'variables';`
**D)** `import 'variables';`

<details>
<summary>Show Answer</summary>

**Answer: B**

```scss
// ✅ Modern: Use @use
@use 'variables' as v;

.button {
  background: v.$primary;
}

// ❌ Old (deprecated): @import
@import 'variables';  // Avoid this!
```

`@use` is better because:
- Prevents duplication
- Supports namespacing
- Clearer dependencies

</details>

---

### 9. How do you create a mixin with parameters?

**A)** `@mixin button($color) { }`
**B)** `@mixin button {color} { }`
**C)** `@mixin button[$color] { }`
**D)** `@mixin button<$color> { }`

<details>
<summary>Show Answer</summary>

**Answer: A**

```scss
// Define with parameters
@mixin button($bg-color, $text-color: white) {
  background: $bg-color;
  color: $text-color;
  padding: 0.5rem 1rem;

  &:hover {
    background: darken($bg-color, 10%);
  }
}

// Use with arguments
.btn-primary {
  @include button(#007bff);
}

.btn-success {
  @include button(#28a745);
}

.btn-custom {
  @include button(#ff6b6b, #000);  // Custom text color
}
```

</details>

---

### 10. What does Sass compile to?

**A)** JavaScript
**B)** Regular CSS
**C)** HTML
**D)** JSON

<details>
<summary>Show Answer</summary>

**Answer: B**

```
Your .scss files
       ↓
  Sass Compiler
       ↓
  Regular .css
       ↓
    Browser
```

Sass **must be compiled** to CSS before browsers can use it. Browsers don't understand Sass directly!

</details>

---

### 11. Which color function makes a color lighter?

**A)** `darken($color, 10%)`
**B)** `lighten($color, 10%)`
**C)** `brighten($color, 10%)`
**D)** `fade($color, 10%)`

<details>
<summary>Show Answer</summary>

**Answer: B**

```scss
$base: #007bff;

.light {
  background: lighten($base, 20%);  // Lighter blue
}

.dark {
  background: darken($base, 20%);   // Darker blue
}

.transparent {
  background: rgba($base, 0.5);     // 50% transparent
}
```

</details>

---

### 12. What's the maximum recommended nesting depth?

**A)** 1 level
**B)** 3 levels
**C)** 5 levels
**D)** Unlimited

<details>
<summary>Show Answer</summary>

**Answer: B**

**Maximum 3 levels** of nesting:

```scss
// ✅ Good: 2-3 levels
.card {
  padding: 1rem;

  &__title {
    font-size: 1.5rem;

    &:hover {
      color: blue;
    }
  }
}

// ❌ Bad: Too deep
.nav {
  .menu {
    .list {
      .item {
        .link {  // 5 levels!
          // Too specific, hard to override
        }
      }
    }
  }
}
```

</details>

---

### 13. What's the difference between Sass variables and CSS custom properties?

**A)** They're the same thing
**B)** Sass variables are compile-time, CSS variables are runtime
**C)** Sass variables are faster
**D)** CSS variables don't work

<details>
<summary>Show Answer</summary>

**Answer: B**

| Feature | Sass Variables | CSS Variables |
|---------|---------------|---------------|
| Syntax | `$variable` | `--variable` |
| When evaluated | **Compile time** | **Runtime** |
| Change with JS | No | Yes |
| In functions/loops | Yes | Limited |

**Best practice:** Use both!

```scss
// Sass variables
$primary: #007bff;

// Generate CSS variables
:root {
  --color-primary: #{$primary};
}

// Use CSS variables for runtime flexibility
.button {
  background: var(--color-primary);
}
```

</details>

---

### 14. How do you write a comment in Sass that won't appear in compiled CSS?

**A)** `/* comment */`
**B)** `// comment`
**C)** `<!-- comment -->`
**D)** `# comment`

<details>
<summary>Show Answer</summary>

**Answer: B**

```scss
// This comment won't appear in CSS
.button {
  background: blue;
}

/* This comment WILL appear in CSS */
.link {
  color: blue;
}
```

Compiled CSS:
```css
.button {
  background: blue;
}

/* This comment WILL appear in CSS */
.link {
  color: blue;
}
```

</details>

---

### 15. Can you do math operations in Sass?

**A)** No, Sass doesn't support math
**B)** Yes, with operators like +, -, *, /
**C)** Only with a special plugin
**D)** Only in mixins

<details>
<summary>Show Answer</summary>

**Answer: B**

```scss
$base: 1rem;
$container: 1200px;
$sidebar: 300px;

.spacing-sm {
  margin: $base * 0.5;  // 0.5rem
}

.spacing-lg {
  margin: $base * 2;    // 2rem
}

.main-content {
  width: $container - $sidebar;  // 900px
}

.half {
  width: 100% / 2;  // 50%
}
```

</details>

---

### 16. When should you use Sass instead of plain CSS?

**A)** Always, for every project
**B)** Medium to large projects, team projects, need for organization
**C)** Never, CSS is always better
**D)** Only for simple one-page sites

<details>
<summary>Show Answer</summary>

**Answer: B**

**Use Sass when:**
✅ Medium to large projects
✅ Team projects
✅ Need consistent design tokens
✅ Want better organization
✅ Build process already exists

**Don't use Sass when:**
❌ Simple one-page sites
❌ Just learning CSS (master plain CSS first!)
❌ No build process
❌ CSS custom properties solve your needs

</details>

---

### 17. What's the file extension for SCSS files?

**A)** `.css`
**B)** `.sass`
**C)** `.scss`
**D)** `.s`

<details>
<summary>Show Answer</summary>

**Answer: C**

**File extensions:**
- `.scss` - SCSS syntax (CSS-like, most popular)
- `.sass` - Indented syntax (no braces/semicolons)
- `.css` - Regular CSS

```
project/
  scss/
    main.scss       ← SCSS file
    _variables.scss ← SCSS partial
  css/
    main.css        ← Compiled output
```

</details>

---

### 18. How do you use a variable from an imported file?

**A)** `@use 'file'; .btn { background: file.$variable; }`
**B)** `@import 'file'; .btn { background: $variable; }`
**C)** Both A and B work
**D)** Variables can't be imported

<details>
<summary>Show Answer</summary>

**Answer: C** (but A is modern/preferred)

```scss
// _variables.scss
$primary: #007bff;

// Modern way (@use with namespace)
@use 'variables' as v;

.button {
  background: v.$primary;  // Use namespace
}

// Old way (@import, direct access)
@import 'variables';

.button {
  background: $primary;  // Direct access
}
```

**Prefer `@use`** - it's the modern standard!

</details>

---

### 19. What will this Sass code do?

```scss
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  @include flex-center;
  height: 100vh;
}
```

**A)** Error
**B)** Creates flex-centered modal
**C)** Only sets height
**D)** Nothing

<details>
<summary>Show Answer</summary>

**Answer: B**

Compiles to:
```css
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
```

The mixin is **included** in `.modal`, adding all its styles!

</details>

---

### 20. Where will you learn advanced Sass features?

**A)** This chapter covers everything
**B)** Part 3, Chapter 37
**C)** Never, basics are enough
**D)** In the appendix

<details>
<summary>Show Answer</summary>

**Answer: B**

**Chapter 21 (this chapter)** covers:
- Variables
- Nesting
- Mixins (basic)
- Partials
- Core functions

**Part 3, Chapter 37** will cover:
- Control directives (@if, @for, @each, @while)
- Advanced mixins and functions
- Maps and lists
- @extend and placeholders
- Professional architecture patterns
- Build process integration
- Team workflows

**Practice the basics now, master advanced later!** 🚀

</details>

---

## Scoring Guide

- **18-20 correct**: 🏆 Sass Basics Master! Ready for Part 3!
- **15-17 correct**: 🌟 Great understanding! Review any missed concepts.
- **12-14 correct**: 📚 Good foundation! Practice more with exercises.
- **9-11 correct**: 💪 Keep learning! Review the chapter.
- **Below 9**: 📖 Re-read Chapter 21 and try the exercises!

---

## Key Takeaways

After this quiz, remember:

✅ **SCSS** is the most popular Sass syntax (CSS-like)
✅ Variables use **`$variable`** syntax
✅ **`&`** refers to the parent selector
✅ Maximum **3 levels** of nesting
✅ **`@mixin`** to define, **`@include`** to use
✅ **Partials** start with `_`
✅ **`@use`** is modern (prefer over `@import`)
✅ Sass **compiles to CSS**
✅ **Part 3, Chapter 37** covers advanced features

---

**Ready for more practice?** Complete the exercises to solidify your Sass basics! Then you'll be ready for Part 3's advanced topics! 🎨✨

