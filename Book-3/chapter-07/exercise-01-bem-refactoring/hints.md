# Hints for Exercise 1: BEM Refactoring

Try to solve the exercise on your own first! If you get stuck, reveal hints progressively.

---

## Hint 1: Understanding BEM Structure
<details>
<summary>Click to reveal</summary>

**BEM = Block Element Modifier**

- **Block:** The component itself (`.product-card`)
- **Element:** Parts of the component (`.product-card__title`)
- **Modifier:** Variations (`.product-card--featured`)

**Naming format:**
- Block: `.block`
- Element: `.block__element`
- Modifier: `.block--modifier` or `.block__element--modifier`

</details>

---

## Hint 2: Identifying the Block
<details>
<summary>Click to reveal</summary>

The **Block** is the main component: **`product-card`**

Everything else is either:
- An **Element** (part of product-card)
- A **Modifier** (variation of product-card)

Current: `<div class="product-card featured">`
Should be: `<div class="product-card product-card--featured">`

</details>

---

## Hint 3: Converting Elements
<details>
<summary>Click to reveal</summary>

**Element naming pattern:** `.block__element`

Convert these:
- `image-wrapper` → `.product-card__media`
- `img` → `.product-card__image`
- `badge` → `.product-card__badge`
- `content` → `.product-card__content`
- `title` → `.product-card__title`
- `description` → `.product-card__description`
- `price-section` → `.product-card__price-wrapper`
- `price` → `.product-card__price`
- `old-price` → `.product-card__price-old`
- `buy-button` → `.product-card__button`

</details>

---

## Hint 4: Converting Modifiers
<details>
<summary>Click to reveal</summary>

**Modifier naming pattern:** `.block--modifier`

Convert these:
- `featured` → `.product-card--featured`
- `large` → `.product-card--large`
- `primary` (on button) → `.product-card__button--primary`

**Remember:** Use modifiers WITH the base class:
```html
<!-- ❌ Wrong -->
<div class="product-card--featured">

<!-- ✅ Correct -->
<div class="product-card product-card--featured">
```

</details>

---

## Hint 5: Sass with & Syntax
<details>
<summary>Click to reveal</summary>

**Use `&` to avoid descendant selectors:**

```scss
// ❌ BAD
.product-card {
  .product-card__title {  // Creates: .product-card .product-card__title
    font-size: 20px;
  }
}

// ✅ GOOD
.product-card {
  &__title {  // Creates: .product-card__title
    font-size: 20px;
  }

  &--featured {  // Creates: .product-card--featured
    border: 2px solid blue;
  }
}
```

</details>

---

## Hint 6: Organizing Sass Structure
<details>
<summary>Click to reveal</summary>

**Recommended structure:**

```scss
.product-card {
  // 1. Block base styles
  background: white;
  border-radius: 12px;
  // ...

  // 2. Elements (use & syntax)
  &__media { /* ... */ }
  &__image { /* ... */ }
  &__badge { /* ... */ }
  &__content { /* ... */ }
  &__title { /* ... */ }
  &__description { /* ... */ }
  &__price-wrapper { /* ... */ }
  &__price { /* ... */ }
  &__price-old { /* ... */ }
  &__button { /* ... */ }

  // 3. Element modifiers
  &__button--primary { /* ... */ }

  // 4. Block modifiers (at the end)
  &--featured { /* ... */ }
  &--large { /* ... */ }
}
```

</details>

---

## Hint 7: Fixing the Large Variant
<details>
<summary>Click to reveal</summary>

**Problem:** Current code uses descendant selectors

```scss
// ❌ BAD
.large .content {
  padding: 24px;
}
```

**Solution:** Use modifier to change element styles directly

```scss
// ✅ GOOD
.product-card {
  &__content {
    padding: 16px;  // Default
  }

  &--large {
    border: 2px solid #8b5cf6;
  }

  // When card is large, content gets more padding
  &--large &__content {
    padding: 24px;
  }

  // Or even better, use a modifier on content itself:
  &--large {
    .product-card__content {
      padding: 24px;
    }
    .product-card__title {
      font-size: 24px;
    }
  }
}
```

</details>

---

## Hint 8: Complete HTML Example
<details>
<summary>Click to reveal</summary>

**Here's what one card should look like:**

```html
<div class="product-card product-card--featured">
  <div class="product-card__media">
    <img
      src="https://via.placeholder.com/300x300"
      alt="Product"
      class="product-card__image"
    >
    <span class="product-card__badge">New</span>
  </div>
  <div class="product-card__content">
    <h3 class="product-card__title">Wireless Headphones</h3>
    <p class="product-card__description">
      Premium noise-cancelling headphones with 30-hour battery life
    </p>
    <div class="product-card__price-wrapper">
      <span class="product-card__price">$29.99</span>
      <span class="product-card__price-old">$39.99</span>
    </div>
    <button class="product-card__button product-card__button--primary">
      Add to Cart
    </button>
  </div>
</div>
```

</details>

---

## Hint 9: Complete Sass Structure
<details>
<summary>Click to reveal</summary>

**Here's the complete structure you're aiming for:**

```scss
.product-card {
  // Block styles
  max-width: 400px;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  // Elements
  &__media {
    position: relative;
  }

  &__image {
    width: 100%;
    display: block;
  }

  &__badge {
    position: absolute;
    top: 12px;
    right: 12px;
    background: #ef4444;
    color: white;
    padding: 4px 12px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 600;
  }

  &__content {
    padding: 16px;
  }

  &__title {
    font-size: 20px;
    font-weight: 700;
    margin: 0 0 8px;
    color: #111827;
  }

  &__description {
    font-size: 14px;
    color: #6b7280;
    margin: 0 0 16px;
  }

  &__price-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
  }

  &__price {
    font-size: 24px;
    font-weight: 700;
    color: #111827;
  }

  &__price-old {
    font-size: 16px;
    color: #9ca3af;
    text-decoration: line-through;
  }

  &__button {
    width: 100%;
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;

    &--primary {
      background: #3b82f6;
      color: white;

      &:hover {
        background: #2563eb;
      }
    }
  }

  // Block modifiers
  &--featured {
    border: 2px solid #3b82f6;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
  }

  &--large {
    border: 2px solid #8b5cf6;

    .product-card__content {
      padding: 24px;
    }

    .product-card__title {
      font-size: 24px;
    }

    .product-card__description {
      font-size: 16px;
    }
  }
}
```

</details>

---

## Hint 10: Common Mistakes to Avoid
<details>
<summary>Click to reveal</summary>

**1. Forgetting the base class:**
```html
<!-- ❌ Wrong -->
<div class="product-card--featured">

<!-- ✅ Correct -->
<div class="product-card product-card--featured">
```

**2. Using descendant selectors:**
```scss
// ❌ Wrong
.product-card {
  .product-card__title { }  // Creates .product-card .product-card__title
}

// ✅ Correct
.product-card {
  &__title { }  // Creates .product-card__title
}
```

**3. Going too deep:**
```scss
// ❌ Wrong
.product-card__content__title__icon  // Way too nested!

// ✅ Correct
.product-card__title-icon  // Flat
```

**4. Inconsistent naming:**
```html
<!-- ❌ Wrong - mixing styles -->
<div class="product-card">
  <h3 class="title">  <!-- Not BEM! -->
</div>

<!-- ✅ Correct - consistent BEM -->
<div class="product-card">
  <h3 class="product-card__title">  <!-- BEM! -->
</div>
```

</details>

---

**Still stuck? Check the solution in the `solution/` directory, but try to understand WHY the solution works, not just copy it!**

