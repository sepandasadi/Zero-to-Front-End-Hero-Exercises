# Exercise 05: Methodology Comparison - Getting Started

## Objective

Build the **same product card component** using three different methodologies and compare the results.

---

## What You'll Build

A product card with:
- Product image
- Title
- Rating (stars + count)
- Price (current + original)
- "Add to Cart" button
- "Wishlist" button

Plus variations:
- Featured card (highlighted)
- Sale card (shows discount badge)
- Sold out state (greyed out)

---

## File Structure to Create

```
starter/
├── index.html              # All 3 implementations side-by-side
├── css/
│   ├── bem.css             # BEM implementation
│   ├── oocss.css           # OOCSS implementation
│   ├── smacss.css          # SMACSS implementation
│   └── comparison.md       # Your analysis
└── screenshots/
    ├── bem-example.png
    ├── oocss-example.png
    └── smacss-example.png
```

---

## Product Card Requirements

### Features
- Product image (200px height)
- Product title (h3)
- Star rating + review count
- Current price (large, bold)
- Original price (struck through)
- Add to Cart button (primary)
- Wishlist button (secondary/icon)

### Variations
1. **Standard** - Default card
2. **Featured** - Highlighted with border/shadow
3. **On Sale** - Shows sale badge
4. **Sold Out** - Overlay/disabled state

---

## Implementation 1: BEM

### File: css/bem.css

```scss
/* BEM: Block__Element--Modifier */

.product-card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;

  /* Modifiers */
  &--featured {
    border-color: #fbbf24;
    box-shadow: 0 4px 12px rgba(251, 191, 36, 0.3);
  }

  &--sale::before {
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

  /* Elements */
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
  }

  &__actions {
    display: flex;
    gap: 0.5rem;
  }

  &__button {
    padding: 0.75rem;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;

    &--primary {
      flex: 1;
      background: #6366f1;
      color: white;
    }

    &--secondary {
      background: #f3f4f6;
      color: #6b7280;
    }
  }
}
```

### HTML:
```html
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

---

## Implementation 2: OOCSS

### File: css/oocss.css

```css
/* OOCSS: Separate Structure from Skin, Compose Objects */

/* Box Object (structure) */
.box {
  padding: 1rem;
}

.box--bordered {
  border: 1px solid #ddd;
  border-radius: 8px;
}

.box--shadowed {
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.box--warning {
  border-color: #fbbf24;
  box-shadow: 0 4px 12px rgba(251, 191, 36, 0.3);
}

/* Media Object (layout) */
.media {
  display: flex;
  gap: 0.5rem;
}

.media--small {
  font-size: 0.875rem;
}

/* Button Object (structure + skins) */
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
  flex: 1;
  font-size: 1rem;
}

/* Product Module (specific styles) */
.product {
  background: white;
  overflow: hidden;
}

.product__image {
  width: 100%;
  height: 200px;
  object-fit: cover;
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

### HTML (composing objects):
```html
<div class="box box--bordered box--shadowed box--warning product">
  <img src="product.jpg" class="product__image" alt="Product">
  <div class="box">
    <h3>Awesome Product</h3>
    <div class="media media--small">
      <span style="color: #fbbf24;">★★★★★</span>
      <span style="color: #6b7280;">(24)</span>
    </div>
    <div style="margin-bottom: 1rem;">
      <span class="price__current">$99.99</span>
      <span class="price__old">$129.99</span>
    </div>
    <div class="button-group">
      <button class="btn btn--primary btn--lg">Add to Cart</button>
      <button class="btn btn--secondary">♥</button>
    </div>
  </div>
</div>
```

---

## Implementation 3: SMACSS

### File: css/smacss.css

```css
/* SMACSS: Organized by Category */

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
}

.price-old {
  text-decoration: line-through;
  color: #9ca3af;
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
  flex: 1;
}

.button-secondary {
  background: #f3f4f6;
  color: #6b7280;
}

.button-group {
  display: flex;
  gap: 0.5rem;
}

/* State */
.card.is-sold-out {
  opacity: 0.6;
}
```

### HTML:
```html
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
      <button class="button button-primary">Add to Cart</button>
      <button class="button button-secondary">♥</button>
    </div>
  </div>
</div>
```

---

## Comparison Framework

Create `css/comparison.md` and answer:

### 1. HTML Classes
- **BEM:** How many classes per element?
- **OOCSS:** How many classes per element?
- **SMACSS:** How many classes per element?

### 2. CSS Reusability
- Which has the most reusable CSS?
- Which required the most unique CSS?

### 3. Readability
- Which HTML is easiest to read?
- Which CSS is easiest to navigate?

### 4. Maintainability
- Which would be easiest to modify?
- Which would scale best in a large app?

### 5. Learning Curve
- Which was easiest to write?
- Which required the most thinking?

### 6. Real-World Usage
- Which would you choose for a small project?
- Which would you choose for a large project?
- Can you mix methodologies?

---

## Deliverables

- [ ] BEM implementation (CSS + HTML)
- [ ] OOCSS implementation (CSS + HTML)
- [ ] SMACSS implementation (CSS + HTML)
- [ ] index.html showing all 3 side-by-side
- [ ] comparison.md with your analysis

---

## Tips

- Keep the visual design identical
- Focus on methodology differences
- Test all variations (featured, sale, sold out)
- Be honest in your comparison
- There's no "wrong" methodology!

Good luck comparing! 🔍

