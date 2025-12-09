# DevTools Mastery Challenge - Starter

## 🐛 The Broken E-commerce Site

Welcome to **ShopBug** - an intentionally broken e-commerce website with bugs, performance issues, memory leaks, and poor accessibility.

Your mission: Use all your DevTools skills to find and fix every issue!

---

## Current State

### Lighthouse Scores (Expected)
```
Performance:      20-30  ❌
Accessibility:    55-65  ❌
Best Practices:   70-75  ⚠️
SEO:             50-60  ❌
```

### Known Issues (15+)

#### Bugs (7+)
1. Race condition in product loading
2. Cart calculation uses assignment (=) instead of equality (===)
3. Total calculation off-by-one error
4. Remove from cart deletes wrong number of items
5. Checkout condition uses assignment instead of equality
6. Cart count increments incorrectly
7. Timeout may fire before data loads

#### Memory Leaks (4+)
1. Event listeners not removed when re-rendering
2. Timer in toggleCart() never cleared
3. Scroll handler creates closures
4. Image cache grows unbounded

#### Performance Issues (6+)
1. Render-blocking CSS/JS
2. Expensive CSS animations (filter, transform, scale, rotate)
3. No lazy loading for images
4. Expensive synchronous hash generation on checkout
5. Un-throttled scroll handler
6. No image optimization

#### Accessibility Issues (8+)
1. Missing alt text on images
2. Low contrast text in header
3. Tap targets too small
4. No focus indicators
5. Missing heading hierarchy
6. No ARIA labels
7. Non-semantic HTML
8. No form labels

#### SEO Issues (5+)
1. Missing meta description
2. Missing viewport meta tag
3. Missing Open Graph tags
4. Improper heading hierarchy
5. No structured data

---

## Your Tasks

### Part 1: Bug Hunting (2-3 hours)

Use **Sources panel** to debug:
- [ ] Fix race condition in loadProducts()
- [ ] Fix cart item matching (= vs ===)
- [ ] Fix calculateTotal() off-by-one
- [ ] Fix removeFromCart() splice count
- [ ] Fix checkout condition
- [ ] Fix cart count logic
- [ ] Fix timing issues

**DevTools to use:**
- Breakpoints
- Step through code
- Watch expressions
- Console errors

### Part 2: Memory Leak Hunting (1-2 hours)

Use **Memory panel** to find and fix:
- [ ] Event listener accumulation
- [ ] Uncleaned timers
- [ ] Growing cache
- [ ] Closure memory leaks

**DevTools to use:**
- Heap snapshots
- 3-snapshot technique
- Detached nodes search
- Retaining paths

### Part 3: Performance Optimization (2-3 hours)

Use **Network & Performance panels** to optimize:
- [ ] Eliminate render-blocking resources
- [ ] Optimize images (lazy load, dimensions)
- [ ] Remove expensive animations
- [ ] Throttle scroll handler
- [ ] Optimize checkout process
- [ ] Remove unused CSS

**DevTools to use:**
- Network waterfall
- Performance recording
- Coverage tool
- Lighthouse opportunities

### Part 4: Accessibility Fixes (1-2 hours)

Use **Elements panel & Lighthouse** to fix:
- [ ] Add alt text to all images
- [ ] Fix color contrast
- [ ] Increase tap target sizes
- [ ] Add focus indicators
- [ ] Fix heading hierarchy
- [ ] Add ARIA labels
- [ ] Use semantic HTML

**DevTools to use:**
- Elements panel
- Color contrast checker
- Lighthouse accessibility audit
- :hov state forcing

### Part 5: SEO & Best Practices (1 hour)

Add:
- [ ] Meta tags (description, viewport)
- [ ] Open Graph tags
- [ ] Structured data
- [ ] Proper document structure
- [ ] Fix heading hierarchy

**DevTools to use:**
- Lighthouse SEO audit
- Elements panel

---

## Success Criteria

Your site is fully optimized when:

### Lighthouse Scores
- [ ] Performance: 90+
- [ ] Accessibility: 95+
- [ ] Best Practices: 90+
- [ ] SEO: 90+

### Core Web Vitals
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1

### Bugs
- [ ] All 7+ bugs fixed
- [ ] No console errors
- [ ] Cart works correctly
- [ ] Checkout works

### Memory
- [ ] No detached DOM nodes
- [ ] Timers properly cleared
- [ ] Event listeners cleaned up
- [ ] Cache has size limit

### Performance
- [ ] Images optimized
- [ ] No render-blocking resources
- [ ] Efficient animations
- [ ] Throttled scroll handler

### Accessibility
- [ ] All images have alt text
- [ ] Sufficient color contrast
- [ ] Proper tap target sizes
- [ ] Focus indicators visible
- [ ] Correct heading hierarchy

---

## Testing Checklist

- [ ] Add 10 products to cart, remove all - memory should return to baseline
- [ ] Scroll page - should be smooth 60 FPS
- [ ] Navigate with keyboard only - should work perfectly
- [ ] Check contrast of all text - should pass AA
- [ ] Run 3-snapshot technique - minimal memory growth
- [ ] Load site on slow 3G - should load reasonably fast
- [ ] Check Lighthouse scores - all 90+

---

## Time Estimate

- **Beginner:** 10-12 hours
- **Intermediate:** 6-8 hours
- **Advanced:** 4-6 hours
- **Expert:** 3-4 hours

---

## Resources

- Check the solution folder after attempting
- Review exercises 1-5 for specific techniques
- Chrome DevTools Documentation
- Lighthouse Documentation

---

**Good luck! Use everything you've learned in exercises 1-5!** 🔧🐛🚀

