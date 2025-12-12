# Exercise 05: Methodology Comparison - Hints

## Overview

Build the **same product card component** using three different methodologies:
1. BEM
2. OOCSS
3. SMACSS

Then compare the results!

---

## The Component to Build

A product card with:
- Product image
- Product title
- Price
- Rating (stars)
- "Add to Cart" button
- "Wishlist" button

Plus variations:
- Featured card (highlighted)
- Sale card (shows discount)
- Sold out card (greyed out)

---

## Implementation 1: BEM

```html
<!-- HTML -->
<div class="product-card product-card--featured">
  <img src="product.jpg" class="product-card__image" alt="Product">
  <div class="product-card__content">
    <h3 class="product-card__title">Awesome Product</h3>
    <div class="product-card__rating">
      <span class="product-card__stars">★★★★★</span>
      <span class="product-card__count">(24)</span>
    </div>
    <div class="product-card__price">
      <span class="product-card__amount">$99.99</span>
      <span class="product-card__original">$129.99</span>
    </div>
    <div class="product-card__actions">
      <button class="product-card__button product-card__button--primary">
        Add to Cart
      </button>
      <button class="product-card__button product-card__button--secondary">
        ♥
      </button>
    </div>
  </div>
</div>
```

```scss
// BEM CSS
.product-card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;

  &--featured {
    border-color: #fbbf24;
    box-shadow: 0 4px 12px rgba(251, 191, 36, 0.3);
  }

  &--sale {
    position: relative;

    &::before {
      content: 'SALE';
      position: absolute;
      top: 10px;
      right: 10px;
      background: #ef4444;
      color: white;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 700;
    }
  }

  &__image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  &__content {
    padding: 1rem;
  }

  &__title {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }

  &__rating {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  &__stars {
    color: #fbbf24;
  }

  &__count {
    color: #6b7280;
    font-size: 0.875rem;
  }

  &__price {
    margin-bottom: 1rem;
  }

  &__amount {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1f2937;
  }

  &__original {
    margin-left: 0.5rem;
    text-decoration: line-through;
    color: #9ca3af;
    font-size: 1rem;
  }

  &__actions {
    display: flex;
    gap: 0.5rem;
  }

  &__button {
    flex: 1;
    padding: 0.75rem;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;

    &--primary {
      background: #6366f1;
      color: white;

      &:hover {
        background: #4f46e5;
      }
    }

    &--secondary {
      background: #f3f4f6;
      color: #6b7280;

      &:hover {
        background: #e5e7eb;
      }
    }
  }
}
```

---

## Implementation 2: OOCSS

```html
<!-- HTML - Composing objects -->
<div class="box box--bordered box--shadowed product">
  <img src="product.jpg" class="product__image" alt="Product">
  <div class="box product__content">
    <h3>Awesome Product</h3>
    <div class="media media--small">
      <span class="media__image">★★★★★</span>
      <span class="media__body text-muted">(24)</span>
    </div>
    <div class="price">
      <span class="price__current">$99.99</span>
      <span class="price__old">$129.99</span>
    </div>
    <div class="button-group">
      <button class="btn btn--primary btn--lg">Add to Cart</button>
      <button class="btn btn--secondary">♥</button>
    </div>
  </div>
</div>

<!-- Featured variation - add more skins -->
<div class="box box--bordered box--shadowed box--warning product">
  <!-- Same structure -->
</div>
```

```css
/* OOCSS CSS - Separate objects */

/* Box Object (structure + skins) */
.box {
  padding: 1rem;
}

.box--bordered {
  border: 1px solid #ddd;
}

.box--shadowed {
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.box--warning {
  border-color: #fbbf24;
  box-shadow: 0 4px 12px rgba(251, 191, 36, 0.3);
}

/* Product (module-specific) */
.product {
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

.product__image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

/* Media Object */
.media {
  display: flex;
  gap: 0.5rem;
}

.media--small {
  font-size: 0.875rem;
}

/* Button Object */
.btn {
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.btn--primary {
  background: #6366f1;
  color: white;
}

.btn--secondary {
  background: #f3f4f6;
  color: #6b7280;
}

.btn--lg {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

/* Price Object */
.price__current {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
}

.price__old {
  text-decoration: line-through;
  color: #9ca3af;
  margin-left: 0.5rem;
}

/* Button Group Object */
.button-group {
  display: flex;
  gap: 0.5rem;
}
```

---

## Implementation 3: SMACSS

```html
<!-- HTML -->
<div class="card card-featured">
  <img src="product.jpg" class="card-image" alt="Product">
  <div class="card-content">
    <h3>Awesome Product</h3>
    <div class="rating">
      <span class="rating-stars">★★★★★</span>
      <span class="rating-count">(24)</span>
    </div>
    <div class="price">
      <span class="price-current">$99.99</span>
      <span class="price-old">$129.99</span>
    </div>
    <div class="button-group">
      <button class="button button-primary button-lg">Add to Cart</button>
      <button class="button button-secondary">♥</button>
    </div>
  </div>
</div>

<!-- With state -->
<div class="card is-sold-out">
  <!-- Same structure -->
</div>
```

```css
/* SMACSS CSS - Organized by category */

/* Module: Card */
.card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.card-featured {
  border-color: #fbbf24;
  box-shadow: 0 4px 12px rgba(251, 191, 36, 0.3);
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-content {
  padding: 1rem;
}

/* Module: Rating */
.rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.rating-stars {
  color: #fbbf24;
}

.rating-count {
  color: #6b7280;
  font-size: 0.875rem;
}

/* Module: Price */
.price {
  margin-bottom: 1rem;
}

.price-current {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
}

.price-old {
  text-decoration: line-through;
  color: #9ca3af;
  margin-left: 0.5rem;
}

/* Module: Button */
.button {
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.button-primary {
  background: #6366f1;
  color: white;
}

.button-secondary {
  background: #f3f4f6;
  color: #6b7280;
}

.button-lg {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

.button-group {
  display: flex;
  gap: 0.5rem;
}

/* State: Sold Out */
.card.is-sold-out {
  opacity: 0.6;
  position: relative;
}

.card.is-sold-out::after {
  content: 'SOLD OUT';
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.7);
  color: white;
  display: flex;
  align-items: center;
  justify-center;
  font-size: 2rem;
  font-weight: 700;
}
```

---

## Comparison Framework

| Aspect | BEM | OOCSS | SMACSS |
|--------|-----|-------|--------|
| **Naming** | Block__element--modifier | Descriptive | Category-based |
| **Structure** | All in component | Separate objects | Organized by category |
| **HTML Classes** | Single component class | Multiple object classes | Module + state classes |
| **Specificity** | Low, flat | Very low | Low with state overrides |
| **Reusability** | Component-focused | Object-focused | Module-focused |
| **Learning Curve** | Easy | Medium | Medium |
| **Best For** | Large components | Small, reusable patterns | Large projects |

---

## Questions to Answer

After implementing all 3:

1. **Which was easiest to write?**
2. **Which had the most reusable CSS?**
3. **Which had the cleanest HTML?**
4. **Which would scale best?**
5. **Which would you choose for a real project?**

---

## Key Insights

**BEM:**
- ⭐ Clear component boundaries
- ⭐ Easy to understand
- ⚠️ Verbose HTML classes

**OOCSS:**
- ⭐ Maximum reusability
- ⭐ DRY CSS
- ⚠️ Many classes in HTML

**SMACSS:**
- ⭐ Excellent organization
- ⭐ Easy to scale
- ⚠️ Requires discipline

---

**The winner? Mix them all!** Most production apps use BEM + OOCSS + SMACSS together. 🎯

