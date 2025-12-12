# Chapter 17: CSS Variables — Quiz

Test your understanding of CSS Custom Properties!

---

## 📝 Instructions

**Passing Score:** 12/15 (80%)

---

## Questions

### 1. How do you define a CSS Variable?

A) `variable-name: value;`
B) `--variable-name: value;`
C) `var-variable-name: value;`
D) `$variable-name: value;`

<details>
<summary>Show Answer</summary>

**B) `--variable-name: value;`**

CSS Variables must start with two dashes (`--`).

</details>

---

### 2. How do you use a CSS Variable?

A) `color: --primary-color;`
B) `color: variable(--primary-color);`
C) `color: var(--primary-color);`
D) `color: get(--primary-color);`

<details>
<summary>Show Answer</summary>

**C) `color: var(--primary-color);`**

Use the `var()` function to reference a CSS Variable.

</details>

---

### 3. Where should you define global CSS Variables?

A) In `body {}`
B) In `:root {}`
C) In `html {}`
D) In `* {}`

<details>
<summary>Show Answer</summary>

**B) In `:root {}`**

`:root` is the standard location for global variables, giving them the highest level scope.

</details>

---

### 4. Can CSS Variables be changed with JavaScript?

A) No, never
B) Yes, using `setProperty()`
C) Only with jQuery
D) Only at compile time

<details>
<summary>Show Answer</summary>

**B) Yes, using `setProperty()`**

Example: `document.documentElement.style.setProperty('--color', 'blue');`

</details>

---

### 5. What's the syntax for a fallback value?

A) `var(--color fallback blue)`
B) `var(--color || blue)`
C) `var(--color, blue)`
D) `var(--color default blue)`

<details>
<summary>Show Answer</summary>

**C) `var(--color, blue)`**

Use a comma to separate the variable from its fallback value.

</details>

---

### 6. Do CSS Variables inherit?

A) No, never
B) Yes, they follow the CSS cascade
C) Only if specified with `inherit`
D) Only global variables

<details>
<summary>Show Answer</summary>

**B) Yes, they follow the CSS cascade**

CSS Variables inherit just like other CSS properties, making them powerful for theming.

</details>

---

### 7. Can you scope CSS Variables locally?

A) No, they're always global
B) Yes, define them in any selector
C) Only in classes
D) Only with JavaScript

<details>
<summary>Show Answer</summary>

**B) Yes, define them in any selector**

Variables can be scoped to specific elements: `.card { --card-bg: white; }`

</details>

---

### 8. What's the main advantage of CSS Variables over Sass variables?

A) Faster compilation
B) Better syntax
C) Can be updated at runtime
D) Work in older browsers

<details>
<summary>Show Answer</summary>

**C) Can be updated at runtime**

CSS Variables work at runtime and can be changed dynamically with JavaScript, while Sass variables are compiled to static values.

</details>

---

### 9. Which is a good variable naming convention?

A) `--1`, `--2`, `--3`
B) `--x`, `--y`, `--z`
C) `--color-primary`, `--spacing-md`
D) `--a`, `--b`, `--c`

<details>
<summary>Show Answer</summary>

**C) `--color-primary`, `--spacing-md`**

Use descriptive names that clearly indicate the variable's purpose.

</details>

---

### 10. Can CSS Variables be used in `calc()`?

A) No
B) Yes
C) Only with pixels
D) Only with percentages

<details>
<summary>Show Answer</summary>

**B) Yes**

Example: `calc(var(--base-size) * 2)`

</details>

---

### 11. How do you create a dark theme with CSS Variables?

A) Define new variables for dark colors
B) Override existing variables in a theme class
C) Use JavaScript only
D) Can't be done with CSS Variables

<details>
<summary>Show Answer</summary>

**B) Override existing variables in a theme class**

Example:
```css
:root { --bg: white; }
.dark-theme { --bg: black; }
```

</details>

---

### 12. Are CSS Variable names case-sensitive?

A) No
B) Yes
C) Only in JavaScript
D) Only for global variables

<details>
<summary>Show Answer</summary>

**B) Yes**

`--Color` and `--color` are different variables.

</details>

---

### 13. What's the best way to save a user's theme preference?

A) CSS only
B) JavaScript with localStorage
C) Cookies only
D) Can't be saved

<details>
<summary>Show Answer</summary>

**B) JavaScript with localStorage**

Save the theme choice and load it on page load for persistence.

</details>

---

### 14. Can you use media queries to change CSS Variables?

A) No
B) Yes, redefine them in @media blocks
C) Only with JavaScript
D) Only for colors

<details>
<summary>Show Answer</summary>

**B) Yes, redefine them in @media blocks**

Example:
```css
@media (max-width: 768px) {
  :root { --spacing: 0.5rem; }
}
```

</details>

---

### 15. What's the difference between `:root` and `html` for defining variables?

A) No difference
B) `:root` has higher specificity
C) `html` is better
D) `:root` only works in modern browsers

<details>
<summary>Show Answer</summary>

**B) `:root` has higher specificity**

While both target the same element, `:root` (being a pseudo-class) has higher specificity than the `html` element selector.

</details>

---

## 📊 Scoring

- **13-15 correct:** 🌟 Excellent!
- **10-12 correct:** 👍 Good!
- **7-9 correct:** 📚 Review the chapter
- **0-6 correct:** 🎯 Time to re-read!

---

**Great job!** 🎉

