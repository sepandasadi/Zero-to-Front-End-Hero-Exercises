# Exercise 5: Image Gallery

**Difficulty:** ⭐⭐⭐ Advanced
**Time:** 40-50 minutes

## 🎯 Objective

Create a responsive image gallery using Grid's `auto-fit` feature.

## 📚 Concepts Practiced

- Using `repeat(auto-fit, minmax())` for responsive grids
- Image sizing with `object-fit`
- Grid without media queries
- Creating featured items with spanning

## 📋 Requirements

1. Responsive grid (no manual media queries!)
2. Images fill cells with `object-fit: cover`
3. Minimum image size: 250px
4. Featured image spans 2x2
5. Smooth hover effects

## ✅ Success Criteria

- [ ] Grid adapts to any screen size automatically
- [ ] Images don't distort
- [ ] Featured image is prominent
- [ ] Hover effects work smoothly
- [ ] No horizontal scroll

## 🎨 The Magic Pattern

```css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.featured {
  grid-column: span 2;
  grid-row: span 2;
}
```

---

**This is the power of Grid! Check starter folder.**

