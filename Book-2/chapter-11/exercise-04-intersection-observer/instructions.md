# Exercise 04: Intersection Observer

## 🎯 Objective

Master the Intersection Observer API for performance-optimized scroll handling. Implement lazy loading, infinite scroll, and scroll animations.

## 📚 What You'll Learn

- What Intersection Observer is and why it's better than scroll events
- Lazy load images as they enter viewport
- Implement infinite scroll
- Trigger animations on scroll
- Configure intersection thresholds
- Optimize performance

## 📋 Tasks

### Task 1: Basic Intersection Observer

Create an observer that logs when elements enter viewport:
- Observe multiple elements
- Log when each becomes visible
- Unobserve after first intersection

### Task 2: Lazy Loading Images

Implement image lazy loading:
- Start with placeholder/low-res images
- Load full images when they enter viewport
- Show loading indicator
- Unobserve after loading

### Task 3: Infinite Scroll

Load more content when user scrolls to bottom:
- Observe a "sentinel" element at bottom
- Load next page of data when sentinel is visible
- Add loading spinner
- Handle no more data

### Task 4: Scroll Animations

Trigger CSS animations when elements come into view:
- Add class when visible
- Remove class when out of view
- Stagger animations
- Configure threshold

### Task 5: Intersection Ratio

Work with partial visibility:
- Log what percentage of element is visible
- Trigger at different thresholds (25%, 50%, 75%)
- Fade elements based on visibility percentage

### Task 6: Performance Comparison

Compare Intersection Observer vs scroll events:
- Measure performance
- Count callback executions
- Show why IO is superior

## ✅ Success Criteria

1. ✅ Images lazy load correctly
2. ✅ Infinite scroll works smoothly
3. ✅ Animations trigger on scroll
4. ✅ Understand threshold configuration
5. ✅ Code is performant
6. ✅ Proper cleanup (unobserve)

## 💡 Hints

### Hint 1: Basic Setup
```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Element is visible
      console.log('Element visible:', entry.target);
    }
  });
});

observer.observe(element);
```

### Hint 2: Lazy Loading
```html
<img data-src="actual-image.jpg" src="placeholder.jpg" class="lazy">
```

```js
if (entry.isIntersecting) {
  const img = entry.target;
  img.src = img.dataset.src;
  observer.unobserve(img); // Stop watching after loading
}
```

### Hint 3: Thresholds
```js
const observer = new IntersectionObserver(callback, {
  threshold: 0.5  // Trigger when 50% visible
  // Or multiple: threshold: [0, 0.25, 0.5, 0.75, 1]
});
```

### Hint 4: Root Margin
```js
const observer = new IntersectionObserver(callback, {
  rootMargin: '200px'  // Start loading 200px before visible
});
```

## 🧪 Testing

1. Open DevTools Performance tab
2. Scroll page and observe callback frequency
3. Check Network tab for lazy-loaded images
4. Verify images load only when visible
5. Test infinite scroll with throttled network

## ⏱️ Estimated Time

**40-50 minutes**
- Basic observer: 5 min
- Lazy loading: 15 min
- Infinite scroll: 15 min
- Animations: 10 min
- Thresholds: 5 min

## 🎯 Bonus Challenges

1. **Blur-Up Effect**: Start with blurred thumbnail, fade to full image
2. **Retry Logic**: Reload failed images
3. **Preload Next**: Load image ahead of time
4. **Video Lazy Load**: Same concept for videos
5. **Analytics**: Track which sections users actually see
6. **Progress Bar**: Show scroll progress

## 📖 Resources

- [MDN: Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [Web.dev: Lazy Loading](https://web.dev/lazy-loading-images/)
- [CSS-Tricks: Intersection Observer](https://css-tricks.com/a-few-functional-uses-for-intersection-observer/)

---

**Ready to optimize?** This API is a game-changer for performance! 🚀
