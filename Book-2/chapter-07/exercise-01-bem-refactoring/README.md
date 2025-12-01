# Exercise 1: BEM Component Refactoring

## Difficulty
⭐ Beginner

## Time Estimate
30-45 minutes

## Learning Objectives
- Master BEM naming conventions
- Understand Block, Element, and Modifier relationships
- Practice flat specificity (avoid descendant selectors)
- Use Sass `&` syntax for BEM
- Create a maintainable component structure

---

## The Challenge

You've inherited a product card component with messy, inconsistent naming. Your task is to refactor it using proper BEM methodology.

### Current Problems
❌ Inconsistent class names
❌ Generic names that could conflict
❌ Unclear component boundaries
❌ No modifiers for variants
❌ Poor Sass organization

### Your Goals
✅ Apply proper BEM naming
✅ Use clear Block/Element/Modifier structure
✅ Keep specificity flat
✅ Write clean Sass with `&` syntax
✅ Make variants with modifiers

---

## Requirements

### 1. Refactor HTML
Convert the messy HTML to proper BEM structure:

**Elements to rename:**
- Container → `.product-card` (Block)
- Image wrapper → `.product-card__media`
- Image → `.product-card__image`
- Badge → `.product-card__badge`
- Content section → `.product-card__content`
- Title → `.product-card__title`
- Description → `.product-card__description`
- Price section → `.product-card__price-wrapper`
- Current price → `.product-card__price`
- Old price → `.product-card__price-old`
- Button → `.product-card__button`

**Modifiers to add:**
- Featured card → `.product-card--featured`
- Large card → `.product-card--large`
- Primary button → `.product-card__button--primary`

### 2. Write BEM Sass
Structure your Sass file properly:

```scss
.product-card {
  // Base block styles

  &__media {
    // Element styles
  }

  &__image {
    // Element styles
  }

  // ... more elements

  &--featured {
    // Modifier styles
  }

  &--large {
    // Modifier styles
  }
}
```

### 3. Avoid These Mistakes

**❌ Don't nest selectors:**
```scss
// BAD
.product-card {
  .product-card__title {  // Creates .product-card .product-card__title
    // ...
  }
}
```

**✅ Use & instead:**
```scss
// GOOD
.product-card {
  &__title {  // Creates .product-card__title
    // ...
  }
}
```

**❌ Don't go too deep:**
```scss
// BAD
.product-card__media__image__container  // Too nested!
```

**✅ Keep it flat:**
```scss
// GOOD
.product-card__media
.product-card__image
```

### 4. Create Variants

Add these modifier variations:

**Featured card:**
- Blue border (2px solid)
- Slight shadow
- Badge shows "Featured"

**Large card:**
- More padding
- Larger fonts
- Bigger image

**Primary button:**
- Blue background
- White text
- Hover effect

---

## Starter Code

See `starter/` directory for:
- `index.html` - HTML with messy class names
- `styles.scss` - Unorganized CSS
- `preview.html` - Visual preview page

---

## Steps to Complete

### Step 1: Analyze the Current Code (5 min)
- Open `starter/index.html`
- Identify the component structure
- Note what needs to be renamed

### Step 2: Refactor HTML (10 min)
- Replace all class names with BEM naming
- Add modifier classes where needed
- Keep the HTML structure the same

### Step 3: Refactor Sass (15 min)
- Reorganize styles using BEM structure
- Use `&` for elements and modifiers
- Remove any descendant selectors

### Step 4: Add Variants (10 min)
- Implement `--featured` modifier
- Implement `--large` modifier
- Implement `__button--primary` modifier

### Step 5: Test (5 min)
- Open `preview.html` in browser
- Check all variants look correct
- Verify no console errors

---

## Expected Output

### HTML Structure
```html
<div class="product-card product-card--featured">
  <div class="product-card__media">
    <img src="product.jpg" class="product-card__image" alt="Product">
    <span class="product-card__badge">New</span>
  </div>
  <div class="product-card__content">
    <h3 class="product-card__title">Product Name</h3>
    <p class="product-card__description">Description text...</p>
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

### Sass Structure
```scss
.product-card {
  // Base styles
  background: white;
  border-radius: 12px;
  overflow: hidden;

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
  }

  // ... more elements

  &--featured {
    border: 2px solid #3b82f6;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
  }
}
```

---

## Success Criteria

✅ All classes follow BEM naming convention
✅ No descendant selectors (flat specificity)
✅ Sass uses `&` syntax correctly
✅ Three modifiers work correctly
✅ Visual appearance matches design
✅ Code is clean and maintainable

---

## Hints

Need help? Check [`hints.md`](./hints.md) for progressive hints!

---

## Solution

Once you've completed the exercise, compare with the solution in `solution/` directory.

**Don't peek until you've tried it yourself!** 🙈

---

## Going Further

### Bonus Challenges

1. **Add more variants:**
   - `--compact` (smaller padding)
   - `--horizontal` (image on left, content on right)
   - `--on-sale` (red accent)

2. **Add more button variants:**
   - `--secondary` (gray background)
   - `--ghost` (transparent with border)

3. **Add responsive behavior:**
   - Stack horizontally on mobile
   - Show full description on hover

4. **Add states:**
   - `.product-card__button.is-loading`
   - `.product-card.is-sold-out`

---

## Key Takeaways

1. **BEM creates clear boundaries:** Each component is self-contained
2. **Flat specificity is powerful:** No fighting with cascades
3. **Modifiers enable variants:** One component, many appearances
4. **Sass & BEM work great together:** The `&` syntax is perfect for BEM
5. **Maintainability matters:** Future developers will thank you!

---

**Ready? Open the starter code and begin! Good luck!** 🚀

