# Exercise 4: Component with BEM 📦

**Time:** 75-90 minutes
**Difficulty:** Intermediate
**Focus:** BEM methodology + Sass nesting

---

## Learning Objectives

- ✅ Apply BEM naming convention
- ✅ Use Sass nesting with `&` for BEM
- ✅ Keep nesting shallow (max 2-3 levels)
- ✅ Create modifiers and element variants
- ✅ Build a production-ready component

---

## The Challenge

Build a complete Card component using BEM naming conventions and Sass. The card must have multiple variants and be fully responsive.

---

## BEM Quick Refresher

```
.block { }              /* Component */
.block__element { }     /* Part of component */
.block--modifier { }    /* Variation */
```

With Sass:
```scss
.block {
  &__element { }   // .block__element
  &--modifier { }  // .block--modifier
}
```

---

## Requirements

### **Card Structure**

```html
<article class="card card--featured">
  <img src="..." alt="..." class="card__image">
  <div class="card__content">
    <span class="card__category">Technology</span>
    <h2 class="card__title">Article Title</h2>
    <p class="card__description">
      Short description of the article...
    </p>
    <div class="card__meta">
      <span class="card__date">Nov 30, 2025</span>
      <span class="card__read-time">5 min read</span>
    </div>
  </div>
  <div class="card__footer">
    <button class="card__button card__button--primary">Read More</button>
    <button class="card__button card__button--secondary">Save</button>
  </div>
</article>
```

### **Part 1: Base Card Styles**

```scss
.card {
  // Base styles:
  // - White background
  // - Rounded corners
  // - Shadow
  // - Overflow hidden
  // - Transition on hover

  &:hover {
    // Lift effect (increase shadow)
    // Smooth transition
  }
}
```

### **Part 2: Elements**

```scss
.card {
  // ... base styles

  &__image {
    // Full width
    // Aspect ratio 16:9
    // Object-fit: cover
  }

  &__content {
    // Padding
  }

  &__category {
    // Small caps
    // Primary color
    // Spacing below
  }

  &__title {
    // Large, bold
    // Spacing
    // Color
  }

  &__description {
    // Muted text
    // Line height
    // Margin
  }

  &__meta {
    // Flex layout
    // Small text
    // Gap between items
  }

  &__date,
  &__read-time {
    // Muted color
    // Small size
  }

  &__footer {
    // Padding
    // Border top
    // Button layout
  }

  &__button {
    // Base button styles
    // Spacing

    &--primary {
      // Primary color
      // White text
    }

    &--secondary {
      // Ghost/outline style
    }
  }
}
```

### **Part 3: Modifiers**

```scss
.card {
  // ... base + elements

  &--featured {
    // Larger shadow
    // Border (accent color)
    // Slightly larger
  }

  &--horizontal {
    // Flex layout
    // Image on left
    // Content on right
    // Responsive: stack on mobile
  }

  &--compact {
    // Smaller padding
    // Smaller title
    // No description
  }

  &--dark {
    // Dark background
    // Light text
    // Adjusted shadows
  }
}
```

### **Part 4: Responsive Behavior**

```scss
@use 'breakpoints' as bp;

.card {
  // Mobile-first base styles

  @include bp.up(md) {
    // Tablet adjustments
  }

  @include bp.up(lg) {
    // Desktop adjustments
  }

  &--horizontal {
    flex-direction: column;  // Mobile: stack

    @include bp.up(md) {
      flex-direction: row;  // Tablet+: side-by-side
    }
  }
}
```

---

## Testing

Create HTML with:
1. **Standard card** (no modifiers)
2. **Featured card** (--featured)
3. **Horizontal card** (--horizontal)
4. **Compact card** (--compact)
5. **Dark card** (--dark)

Test at multiple viewport sizes!

---

## Deliverables

- [ ] `_card.scss` with complete BEM structure
- [ ] All elements styled
- [ ] All modifiers working
- [ ] Responsive behavior
- [ ] Test HTML with all variants
- [ ] **Maximum nesting depth: 2-3 levels!**

---

## Evaluation Criteria

- **BEM Naming (25%):** Correct use of block, element, modifier
- **Nesting Depth (20%):** Kept shallow, no specificity wars
- **Modifiers (25%):** All variants work correctly
- **Responsive (20%):** Mobile-first, works at all sizes
- **Code Quality (10%):** Clean, organized, commented

---

## Bonus Challenges

1. **Loading State:** `card--loading` with skeleton screens
2. **Interactive States:** Hover, focus, active for all clickable elements
3. **Accessibility:** ARIA labels, keyboard navigation
4. **Animation:** Smooth transitions and micro-interactions
5. **Grid Layout:** Create a card grid that's responsive

---

## Common Mistakes

❌ **Too deep nesting:**
```scss
.card {
  &__content {
    &__title {
      &__text {  // Way too deep!
        span { }
      }
    }
  }
}
```

✅ **Flat BEM:**
```scss
.card {
  &__content { }
  &__title { }    // Flat!
  &__text { }     // All at same level
}
```

❌ **Mixing BEM and descendant selectors:**
```scss
.card {
  .title { }  // Not BEM!
}
```

✅ **Pure BEM:**
```scss
.card {
  &__title { }  // BEM element
}
```

---

**Good luck!** 📦

