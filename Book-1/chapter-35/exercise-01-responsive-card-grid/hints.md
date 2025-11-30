# Exercise 1 Hints: Responsive Card Grid

## Mobile-First Approach

**Why mobile-first?**
- Easier to add complexity than remove it
- Better performance on mobile devices
- Forces you to prioritize content

**How it works:**
1. Write base styles for mobile (no media query)
2. Add media queries for larger screens
3. Enhance progressively

## Step 1: Essential Viewport Meta Tag

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**Without this, your site won't be responsive!**

## Step 2: Mobile Base Styles

```css
/* Mobile first - starts at 320px */
.products-grid {
  display: grid;
  grid-template-columns: 1fr; /* 1 column on mobile */
  gap: 1.5rem;
  padding: 1.5rem 1rem;
}
```

## Step 3: Add Tablet Breakpoint

```css
@media (min-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr); /* 2 columns */
    gap: 2rem;
  }
}
```

## Step 4: Add Desktop Breakpoint

```css
@media (min-width: 1024px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr); /* 3 columns */
  }
}

@media (min-width: 1440px) {
  .products-grid {
    grid-template-columns: repeat(4, 1fr); /* 4 columns */
  }
}
```

## Responsive Units

### Use rem for spacing
```css
/* ✓ Good - scales with user's font size */
padding: 1.5rem;
margin-bottom: 1rem;

/* ✗ Bad - fixed size */
padding: 24px;
margin-bottom: 16px;
```

### Use % for widths
```css
/* ✓ Good */
width: 100%;
max-width: 1400px;

/* ✗ Bad */
width: 1400px;
```

### Use clamp() for fluid typography
```css
/* Fluid font size: min 1.5rem, preferred 4vw, max 2.5rem */
font-size: clamp(1.5rem, 4vw, 2.5rem);
```

## Responsive Images

```css
.product-image {
  width: 100%;
  height: auto;
  display: block;

  /* Maintain aspect ratio */
  aspect-ratio: 4 / 3;
  object-fit: cover;
}
```

**In HTML:**
```html
<img
  src="image.jpg"
  alt="Descriptive text"
  loading="lazy"
>
```

## Touch Target Sizing

**Minimum size: 44px × 44px**

```css
.btn-add-to-cart {
  min-height: 44px;
  padding: 0.875rem 1.5rem;

  /* Remove tap highlight on mobile */
  -webkit-tap-highlight-color: transparent;
}
```

## Grid with Auto-fit

**Advanced: Automatically responsive grid**

```css
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}
```

This automatically adjusts columns based on available space!

## Common Breakpoints

```css
/* Mobile (default) */
/* 320px - 767px */

/* Tablet */
@media (min-width: 768px) { }

/* Desktop */
@media (min-width: 1024px) { }

/* Large Desktop */
@media (min-width: 1440px) { }

/* Extra Large */
@media (min-width: 1920px) { }
```

## Testing Responsive Design

**Chrome DevTools:**
1. Press `Ctrl+Shift+M` (Windows) or `Cmd+Shift+M` (Mac)
2. Select device or enter custom dimensions
3. Test at different sizes

**Test these widths:**
- 320px (small phone)
- 375px (iPhone)
- 768px (tablet)
- 1024px (laptop)
- 1440px (desktop)
- 1920px (large desktop)

## Hover Effects for Desktop Only

```css
/* Base - no hover */
.product-card {
  transition: transform 0.3s;
}

/* Only on devices that support hover */
@media (hover: hover) {
  .product-card:hover {
    transform: translateY(-8px);
  }
}
```

Or use media query:
```css
@media (min-width: 768px) {
  .product-card:hover {
    transform: translateY(-8px);
  }
}
```

## Flexbox Alternative

```css
.products-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.product-card {
  flex: 1 1 100%; /* Mobile: full width */
}

@media (min-width: 768px) {
  .product-card {
    flex: 1 1 calc(50% - 1rem); /* Tablet: 2 columns */
  }
}

@media (min-width: 1024px) {
  .product-card {
    flex: 1 1 calc(33.333% - 1rem); /* Desktop: 3 columns */
  }
}
```

## Common Issues

### "Layout breaks at certain sizes"

**Problem:** No styles for mid-range sizes

**Solution:** Test at all breakpoints, add intermediate media queries if needed

### "Text too small on mobile"

**Solution:** Use clamp() for fluid typography
```css
font-size: clamp(1rem, 2.5vw, 1.25rem);
```

### "Buttons too small to tap"

**Solution:** Ensure min-height of 44px
```css
button {
  min-height: 44px;
  padding: 0.875rem 1.5rem;
}
```

### "Horizontal scrolling on mobile"

**Solutions:**
```css
/* Prevent overflow */
body {
  overflow-x: hidden;
}

/* Or fix wide elements */
.container {
  max-width: 100%;
  overflow-x: hidden;
}

img {
  max-width: 100%;
  height: auto;
}
```

## Quick Reference

```css
/* Mobile-first template */
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

**Remember: Start small, enhance progressively!** 📱➡️💻

