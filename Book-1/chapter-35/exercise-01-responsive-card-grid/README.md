# Exercise 1: Responsive Card Grid ⭐

## 🎯 Objective

Build a responsive product card grid that adapts beautifully from mobile to desktop using mobile-first CSS.

## 📝 Instructions

Create a responsive grid of product cards that rearranges itself based on screen size.

### Requirements

1. **Mobile-first approach** - Start with mobile styles, add breakpoints for larger screens
2. **Responsive grid layout:**
   - Mobile (< 768px): 1 column
   - Tablet (768px - 1024px): 2 columns
   - Desktop (> 1024px): 3-4 columns
3. **Product cards** with:
   - Image
   - Title
   - Description
   - Price
   - "Add to Cart" button
4. **Responsive images** that scale properly
5. **Touch-friendly** buttons (min 44px × 44px)
6. **Flexible units** - Use rem, %, vw instead of fixed px

### Design Specifications

**Spacing:**
- Use consistent spacing with rem units
- Mobile: 1rem padding, 1rem gap
- Desktop: 1.5rem padding, 1.5rem gap

**Typography:**
- Use fluid typography with `clamp()`
- Ensure readable font sizes on all devices

**Breakpoints:**
```css
/* Mobile first - no media query */
/* Tablet */
@media (min-width: 768px) { }
/* Desktop */
@media (min-width: 1024px) { }
/* Large desktop */
@media (min-width: 1440px) { }
```

## 🎯 Tasks

1. Set up HTML structure with semantic markup
2. Add viewport meta tag
3. Create mobile styles first (320px width)
4. Add responsive grid using CSS Grid or Flexbox
5. Implement media queries for larger screens
6. Test on multiple screen sizes
7. Ensure images are responsive

## 🎁 Bonus Challenges

1. Add CSS Grid with `auto-fit` and `minmax()`
2. Implement lazy loading for images
3. Add hover effects for desktop
4. Create skeleton loading states
5. Add price formatting
6. Implement "Sale" badge
7. Add quantity selector
8. Create filter/sort functionality

## ✅ Success Criteria

- Works on screens from 320px to 1920px+ wide
- No horizontal scrolling on any device
- Images don't overflow containers
- Touch targets are ≥ 44px × 44px on mobile
- Text is readable on all screen sizes
- Layout looks intentional at every breakpoint
- Uses relative units (rem, %, vw)
- Passes responsive design test in DevTools

## ⏱️ Estimated Time

45-60 minutes

## 💡 Tips

- **Always start mobile-first!** It's easier to add complexity than remove it
- Use Chrome DevTools device mode (Ctrl+Shift+M)
- Test on real devices if possible
- Use `rem` for spacing (1rem = 16px by default)
- Use `%` for widths
- Use `max-width` instead of `width` for flexibility
- Don't forget the viewport meta tag!

## 📚 Key Concepts

- Mobile-first methodology
- CSS Grid / Flexbox
- Media queries
- Responsive units (rem, em, %, vw, vh)
- `clamp()` for fluid typography
- Responsive images
- Touch target sizing

