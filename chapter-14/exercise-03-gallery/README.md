# Exercise 3: Image Gallery with Filters

**Difficulty:** ⭐⭐ Intermediate
**Time:** 30-40 minutes

## 🎯 Objective

Create an image gallery with hover effects using CSS filters.

## 📚 Concepts Practiced

- Applying CSS filters (grayscale, blur, brightness)
- Combining multiple filters
- Creating smooth hover transitions
- Using `object-fit` for consistent image sizing
- Grid layout for gallery

## 📋 Requirements

1. 6-9 images in a grid layout
2. All images same size using `object-fit: cover`
3. Default state: Slightly grayscale
4. Hover: Full color + brightness increase + scale
5. Smooth transitions
6. Click to view full size (optional bonus)

## ✅ Success Criteria

- [ ] Images arranged in neat grid
- [ ] All images same dimensions
- [ ] Smooth hover effects
- [ ] Filters applied correctly
- [ ] No layout shift on hover

## 🎨 Filter Specifications

```css
/* Default state */
filter: grayscale(30%) brightness(0.95);

/* Hover state */
filter: grayscale(0%) brightness(1.1);
transform: scale(1.05);
```

---

**See `starter/` for HTML structure and `solution/` for complete code.**

