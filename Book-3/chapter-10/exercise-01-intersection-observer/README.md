# Exercise 1: Intersection Observer Lazy Loading

**Difficulty:** Intermediate
**Time:** 1.5 hours
**Focus:** Custom lazy loading with fade-in animations

## 🎯 Learning Objectives

- Implement Intersection Observer API
- Create custom lazy loading (better than native)
- Add fade-in animations
- Measure performance improvements

## 📋 Requirements

Create image gallery with Intersection Observer:

### **1. Basic Intersection Observer**
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
}, {
  rootMargin: '50px' // Load 50px before visible
});
```

### **2. Fade-In Animation**
```css
img[data-src] {
  opacity: 0;
  transition: opacity 0.3s ease-in;
}
img.loaded {
  opacity: 1;
}
```

### **3. Loading Placeholder**
- Show blur placeholder while loading
- Replace with actual image when loaded

## ✅ Acceptance Criteria

- [ ] At least 12 images in gallery
- [ ] Intersection Observer implemented
- [ ] Fade-in animation on load
- [ ] rootMargin: 50px (preload buffer)
- [ ] Images load only when near viewport
- [ ] Smooth scrolling experience

## 🎁 Bonus

- Progressive image loading (blur-up effect)
- Loading skeleton
- Error handling (broken images)
- Lazy load background images

