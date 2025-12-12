# Chapter 4: Sass & Preprocessors - Quiz

## Instructions

- **15 multiple-choice questions**
- **Each question has one best answer**
- **Explanations provided after each answer**
- **Estimated time:** 20-30 minutes

Take this quiz after completing the chapter and exercises to test your Sass mastery!

---

## Questions

### **1. What is the main difference between Sass variables and CSS custom properties?**

A) Sass variables are faster
B) Sass compiles at build time, CSS variables update at runtime
C) CSS variables are deprecated
D) They are exactly the same

<details>
<summary><strong>Answer</strong></summary>

**B) Sass compiles at build time, CSS variables update at runtime**

**Explanation:** This is the critical distinction:

**Sass variables:**
- Preprocessed during compilation
- Gone after CSS is generated
- Can't change at runtime
- Can use in calculations, color functions
- Perfect for structure and DRY code

**CSS custom properties:**
- Live in the browser
- Can change dynamically with JavaScript
- Perfect for theming (dark mode, user preferences)
- Can't use in all Sass functions

**Best practice:** Use both! Sass for organization, CSS variables for runtime theming.

```scss
// Sass variable - compile time
$primary: #3b82f6;

:root {
  // CSS variable - runtime
  --color-primary: #{$primary};
}

// Can change this at runtime!
[data-theme="dark"] {
  --color-primary: #60a5fa;
}
```
</details>

---

### **2. Why is `@import` deprecated in favor of `@use`?**

A) `@use` is faster
B) `@import` causes global namespace pollution
C) `@import` doesn't work anymore
D) `@use` is shorter to type

<details>
<summary><strong>Answer</strong></summary>

**B) `@import` causes global namespace pollution**

**Explanation:** `@import` has major problems:

**Problems with `@import`:**
```scss
// file1.scss
$primary: #3b82f6;

// file2.scss
$primary: #ef4444;  // Oops, accidentally overrode!

@import "file1";
@import "file2";
// Last one wins - unpredictable!
```

**Solution with `@use`:**
```scss
@use "file1";
@use "file2";

.button {
  background: file1.$primary;  // Explicit, namespaced
  color: file2.$primary;       // No conflicts!
}
```

**Benefits of `@use`:**
- ✅ Namespaced - no global pollution
- ✅ Each file loaded only once
- ✅ Clear where variables come from
- ✅ Can't accidentally override

**Always use `@use` and `@forward` in modern Sass!**
</details>

---

### **3. What's the maximum recommended nesting depth in Sass?**

A) No nesting allowed
B) 1 level
C) 2-3 levels
D) Unlimited

<details>
<summary><strong>Answer</strong></summary>

**C) 2-3 levels**

**Explanation:** Nesting is powerful but dangerous:

**❌ BAD (too deep):**
```scss
.page {
  .container {
    .sidebar {
      .widget {
        .title {
          a { color: blue; }  // 6 levels! Specificity: (0,1,6)
        }
      }
    }
  }
}
```

**Problems:**
- Impossible to override (specificity war)
- Tightly coupled to HTML structure
- Breaks if HTML changes
- Unreadable

**✅ GOOD (BEM with shallow nesting):**
```scss
.widget {
  padding: 1rem;

  &__title {
    font-weight: 600;  // Only 1 level
  }

  &__link {
    color: blue;

    &:hover {  // 2 levels for pseudo-classes is OK
      color: darkblue;
    }
  }
}
```

**Rule:** Keep nesting shallow! Maximum 2-3 levels.
</details>

---

### **4. When should you use a mixin instead of a function?**

A) Mixins are always better
B) When you need to output multiple CSS properties
C) When you need to return a single value
D) Functions are deprecated

<details>
<summary><strong>Answer</strong></summary>

**B) When you need to output multiple CSS properties**

**Explanation:**

**Use MIXINS for:** Outputting CSS blocks
```scss
@mixin button-reset {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
}

.icon-button {
  @include button-reset;  // Outputs all properties
  color: blue;
}
```

**Use FUNCTIONS for:** Returning single values
```scss
@function px-to-rem($px) {
  @return ($px / 16) * 1rem;
}

.title {
  font-size: px-to-rem(24);  // Returns: 1.5rem
}
```

**Key difference:**
- **Mixins** = CSS output (multiple properties)
- **Functions** = Value return (single calculation)

Both are useful! Choose based on what you need.
</details>

---

### **5. What does `@forward` do in the module system?**

A) Deletes files
B) Re-exports modules to create barrel files
C) Speeds up compilation
D) Same as `@import`

<details>
<summary><strong>Answer</strong></summary>

**B) Re-exports modules to create barrel files**

**Explanation:** `@forward` creates index files:

**Without `@forward` (tedious):**
```scss
// main.scss
@use "abstracts/colors";
@use "abstracts/spacing";
@use "abstracts/mixins";
@use "abstracts/functions";

.button {
  background: colors.$primary;
  padding: spacing.$md;
}
```

**With `@forward` (clean):**
```scss
// abstracts/_index.scss
@forward "colors";
@forward "spacing";
@forward "mixins";
@forward "functions";

// main.scss
@use "abstracts" as abs;  // One import!

.button {
  background: abs.$primary;
  padding: abs.$md;
}
```

**This is the "barrel file" pattern** - group related modules!
</details>

---

### **6. What's wrong with this Sass code?**

```scss
:root {
  --color-primary: $primary;
}
```

A) Nothing, it's correct
B) Sass variables disappear after compilation
C) Should use `@use` first
D) CSS variables can't be in `:root`

<details>
<summary><strong>Answer</strong></summary>

**B) Sass variables disappear after compilation**

**Explanation:** Sass variables don't exist at runtime!

**❌ WRONG:**
```scss
$primary: #3b82f6;

:root {
  --color-primary: $primary;  // Error! $primary doesn't exist in CSS
}
```

**✅ CORRECT (interpolation):**
```scss
$primary: #3b82f6;

:root {
  --color-primary: #{$primary};  // Interpolate with #{}
}
```

**Compiles to:**
```css
:root {
  --color-primary: #3b82f6;  /* Value inserted at compile time */
}
```

**Rule:** Use `#{}` to interpolate Sass variables into CSS strings!
</details>

---

### **7. Why do professionals avoid `@extend`?**

A) It's slower
B) It causes unexpected selector merging
C) It's deprecated
D) Mixins don't exist

<details>
<summary><strong>Answer</strong></summary>

**B) It causes unexpected selector merging**

**Explanation:** `@extend` can create bloated, unpredictable CSS:

**The problem:**
```scss
%card { padding: 1rem; }

.product-card { @extend %card; }
.user-card { @extend %card; }

// Specific selector
.featured .product-card { color: blue; }
```

**Compiles to:**
```css
.product-card, .user-card { padding: 1rem; }

/* Oops! Extended to both, even though we only wanted product-card */
.featured .product-card, .featured .user-card { color: blue; }
```

**Better with mixins:**
```scss
@mixin card { padding: 1rem; }

.product-card { @include card; }
.user-card { @include card; }

.featured .product-card { color: blue; }  // Only affects product-card!
```

**Professional advice:** Use mixins 99% of the time!
</details>

---

### **8. How do you generate utility classes for all spacing values?**

A) Write them manually
B) Use `@each` to loop over a map
C) Copy-paste
D) Use `@extend`

<details>
<summary><strong>Answer</strong></summary>

**B) Use `@each` to loop over a map**

**Explanation:** This is the power of Sass automation!

**Manual (tedious):**
```scss
.m-1 { margin: 0.25rem; }
.m-2 { margin: 0.5rem; }
.m-3 { margin: 0.75rem; }
// ... 47 more ...
```

**Automated (DRY):**
```scss
$spacing: (
  1: 0.25rem,
  2: 0.5rem,
  3: 0.75rem,
  4: 1rem,
  6: 1.5rem,
  8: 2rem
);

@each $name, $value in $spacing {
  .m-#{$name}  { margin: $value; }
  .mt-#{$name} { margin-top: $value; }
  .mb-#{$name} { margin-bottom: $value; }
  .p-#{$name}  { padding: $value; }
}
```

**Result:** 24 utility classes from 6 tokens!

**Change the scale?** Update the map once, regenerates everything!
</details>

---

### **9. In the 7-1 architecture, which folder should depend on nothing?**

A) components/
B) abstracts/
C) layout/
D) All folders depend on each other

<details>
<summary><strong>Answer</strong></summary>

**B) abstracts/**

**Explanation:** Dependency flow is critical:

**Dependency Rules:**
```
abstracts/     ← No dependencies (pure helpers)
    ↑
base/          ← Depends on: abstracts
layout/        ← Depends on: abstracts
components/    ← Depends on: abstracts, base
    ↑
pages/         ← Depends on: abstracts, components, layout
```

**Why `abstracts/` is dependency-free:**
- Contains tokens, mixins, functions
- Pure helpers, no actual CSS output
- Everyone imports it, it imports nothing
- Changes here affect everything

**If abstracts depends on components = Circular dependency hell!**

**Keep the dependency flow one-directional!**
</details>

---

### **10. What's the best way to handle responsive breakpoints in Sass?**

A) Hardcode media queries everywhere
B) Create responsive mixins
C) Don't use media queries
D) Use JavaScript

<details>
<summary><strong>Answer</strong></summary>

**B) Create responsive mixins**

**Explanation:** Centralize breakpoints for maintainability:

**❌ BAD (hardcoded):**
```scss
.nav {
  @media (min-width: 768px) { display: flex; }
}
.grid {
  @media (min-width: 768px) { grid-template-columns: repeat(2, 1fr); }
}
// Easy to make typos! What if we want to change 768px?
```

**✅ GOOD (mixin):**
```scss
// breakpoints.scss
$breakpoints: (
  sm: 640px,
  md: 768px,
  lg: 1024px
);

@mixin up($size) {
  @media (min-width: map-get($breakpoints, $size)) {
    @content;
  }
}

// Usage
.nav {
  @include up(md) { display: flex; }
}
.grid {
  @include up(md) { grid-template-columns: repeat(2, 1fr); }
}
```

**Benefits:**
- Change breakpoint once, updates everywhere
- Semantic naming
- No typos
- Cleaner code
</details>

---

### **11. Which Sass feature allows you to manipulate colors?**

A) Only CSS can manipulate colors
B) Built-in color functions like `darken()`, `lighten()`, `mix()`
C) You need JavaScript
D) Mixins only

<details>
<summary><strong>Answer</strong></summary>

**B) Built-in color functions like `darken()`, `lighten()`, `mix()`**

**Explanation:** Sass has powerful color math:

```scss
$primary: #3b82f6;

.button {
  background: $primary;

  &:hover {
    background: darken($primary, 10%);  // 10% darker
  }

  &:active {
    background: darken($primary, 15%);  // 15% darker
  }
}

.button-light {
  background: lighten($primary, 30%);  // Lighter variant
}

.button-muted {
  background: desaturate($primary, 40%);  // Less vibrant
}

.button-blend {
  background: mix($primary, #ef4444, 50%);  // 50/50 blend with red
}
```

**Auto-contrast function:**
```scss
@function contrast-on($bg) {
  @if (lightness($bg) > 50) {
    @return #111;  // Dark text on light bg
  } @else {
    @return #fff;  // Light text on dark bg
  }
}
```

**CSS custom properties can't do this!**
</details>

---

### **12. What's the purpose of the `!default` flag?**

A) Sets default browser styles
B) Allows variables to be overridden before they're defined
C) Deletes variables
D) Required for all variables

<details>
<summary><strong>Answer</strong></summary>

**B) Allows variables to be overridden before they're defined**

**Explanation:** `!default` makes libraries themeable:

**Library code:**
```scss
// _tokens.scss (your library)
$primary: #3b82f6 !default;
$spacing: 1rem !default;

.button {
  background: $primary;
  padding: $spacing;
}
```

**Consumer code:**
```scss
// main.scss (consumer overrides BEFORE importing)
$primary: #ef4444;  // Custom red
$spacing: 0.75rem;  // Tighter spacing

@use "tokens";  // Now uses consumer's values!
```

**Without `!default`:**
- Consumer can't override
- Would have to edit library source (bad!)

**With `!default`:**
- Consumers can customize
- Library has sensible defaults
- No source modification needed

**This is how Bootstrap, Material UI, etc. allow theming!**
</details>

---

### **13. What's wrong with this nesting?**

```scss
.button {
  .icon {
    .svg {
      .path { fill: blue; }
    }
  }
}
```

A) Nothing
B) Too deep - creates high specificity
C) Should use IDs
D) Missing semicolons

<details>
<summary><strong>Answer</strong></summary>

**B) Too deep - creates high specificity**

**Explanation:**

**Compiles to:**
```css
.button .icon .svg .path { fill: blue; }
/* Specificity: (0,4,0) - Way too high! */
```

**Problems:**
- Impossible to override without !important
- Tightly coupled to HTML structure
- Breaks if you reorganize HTML
- Violates encapsulation

**Better approach (BEM):**
```scss
.button {
  &__icon {
    fill: blue;
  }
}

// Or even flatter:
.button-icon {
  fill: blue;
}
```

**Compiles to:**
```css
.button__icon { fill: blue; }
/* Specificity: (0,1,0) - Perfect! */
```

**Remember:** Maximum 2-3 levels of nesting!
</details>

---

### **14. How should you combine Sass and CSS custom properties?**

A) Never use them together
B) Use Sass for structure, CSS variables for runtime theming
C) Only use Sass
D) Only use CSS variables

<details>
<summary><strong>Answer</strong></summary>

**B) Use Sass for structure, CSS variables for runtime theming**

**Explanation:** This is the professional hybrid approach:

**Best of both worlds:**
```scss
// Sass: Generate the token system
$colors: (
  blue-400: #60a5fa,
  blue-500: #3b82f6,
  blue-600: #2563eb
);

// Generate CSS variables from Sass
:root {
  --color-primary: #{map-get($colors, blue-500)};
  --color-primary-hover: #{map-get($colors, blue-600)};
}

// Dark mode - just change CSS variables!
[data-theme="dark"] {
  --color-primary: #{map-get($colors, blue-400)};
  --color-primary-hover: #{map-get($colors, blue-500)};
}

// Components use CSS variables
.button {
  // Sass mixin for DRY code
  @include button-base;

  // CSS variable for runtime theming
  background: var(--color-primary);

  &:hover {
    background: var(--color-primary-hover);
  }
}
```

**Why this works:**
- Sass: Organization, DRY, calculations
- CSS vars: Dynamic theming without recompilation
- Change `data-theme` attribute = instant theme switch!
</details>

---

### **15. Which files should start with an underscore `_`?**

A) All files
B) No files
C) Partials that will be imported
D) Only variables

<details>
<summary><strong>Answer</strong></summary>

**C) Partials that will be imported**

**Explanation:** Sass naming conventions:

**Files WITH underscore (partials):**
```
scss/
├── abstracts/
│   ├── _tokens.scss     ← Will be @used
│   ├── _mixins.scss     ← Will be @used
│   └── _functions.scss  ← Will be @used
├── components/
│   ├── _button.scss     ← Will be @used
│   └── _card.scss       ← Will be @used
```

**Files WITHOUT underscore (entry points):**
```
└── main.scss            ← Compiles to CSS!
```

**Why?**
- `_file.scss` = Partial (won't compile on its own)
- `file.scss` = Entry point (compiles to CSS)

**When you compile:**
```bash
sass main.scss output.css
# Only main.scss compiles
# Partials (_*.scss) are imported but don't create separate CSS files
```

**Rule:** Entry points = no underscore, everything else = underscore!
</details>

---

## Scoring Guide

- **13-15 correct:** 🏆 **Sass Master!** You deeply understand Sass architecture and best practices.
- **10-12 correct:** ⭐ **Strong foundation!** Review the questions you missed.
- **7-9 correct:** 📚 **Getting there!** Re-read Chapter 4, especially modules and architecture.
- **4-6 correct:** 🔄 **Need more practice.** Do the exercises and review the chapter.
- **0-3 correct:** 📖 **Start over.** Work through Chapter 4 again carefully.

---

## Key Takeaways

If you remember nothing else, remember these:

1. **Sass variables** (compile-time) + **CSS custom properties** (runtime) = Perfect combination

2. **Always use `@use`/`@forward`**, never `@import`

3. **Keep nesting shallow** - maximum 2-3 levels

4. **Mixins output CSS, functions return values** - use appropriately

5. **Generate utilities with loops** - DRY principle in action

6. **The 7-1 architecture** scales from small to enterprise

7. **`!default`** makes libraries themeable

8. **Avoid `@extend`** - prefer mixins for predictability

---

**Ready for Chapter 5 (Tailwind)?** You'll see a completely different approach to styling! 🚀

