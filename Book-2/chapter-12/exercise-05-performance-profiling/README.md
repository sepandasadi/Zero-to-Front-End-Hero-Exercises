# Exercise 05: Performance Profiling

**Difficulty:** Advanced | **Time:** 3-4 hours | **Focus:** Performance optimization

## 🎯 Objectives
- Profile app performance
- Identify long tasks
- Fix memory leaks
- Optimize re-renders
- Improve load time

## 🐌 Intentional Performance Issues

1. **Long Task** - Blocking main thread (> 100ms)
2. **Unnecessary Re-renders** - Component renders 100+ times
3. **Memory Leak** - Memory grows continuously
4. **Large Bundle** - JavaScript bundle > 5MB
5. **Slow Animation** - Janky at < 30 FPS
6. **Inefficient Algorithm** - O(n²) instead of O(n)
7. **Heavy DOM Updates** - Updating 1000+ elements
8. **Layout Thrashing** - Forced synchronous layout
9. **Large Images** - Unoptimized images > 2MB
10. **No Code Splitting** - Everything loaded upfront

## 📊 Profiling Tasks

### **Performance Tab:**
1. Open Performance tab
2. Click Record (or Ctrl+E)
3. Interact with app (5-10 seconds)
4. Stop recording
5. Analyze results

### **What to Look For:**

**FPS (Frames Per Second):**
- Green bars: 60 FPS (good)
- Yellow/Red: < 30 FPS (bad)

**Long Tasks:**
- Yellow blocks in Main thread
- Tasks > 50ms block UI
- Target: < 50ms per task

**Memory:**
- Heap size should be stable
- Growing heap = memory leak

## 🔧 Common Optimizations

**React Optimizations:**
```jsx
// Use memo for expensive components
const ExpensiveComponent = React.memo(({ data }) => {
  // ...
});

// Use useMemo for expensive calculations
const sorted = useMemo(() => {
  return data.sort((a, b) => a.value - b.value);
}, [data]);

// Use useCallback for functions
const handleClick = useCallback(() => {
  // ...
}, [dependencies]);
```

**Algorithm Optimization:**
```javascript
// ❌ O(n²) - Slow
for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < arr.length; j++) {
    // nested loops
  }
}

// ✅ O(n) - Fast
const map = new Map();
for (const item of arr) {
  map.set(item.id, item);
}
```

**Image Optimization:**
- Use WebP format
- Lazy load images
- Use srcset for responsive images
- Compress images

## 📝 Deliverables

1. **Performance Profile** (`PERFORMANCE_PROFILE.md`)
   - Before: Screenshots, FPS, load time
   - After: Screenshots, FPS, load time
   - Improvements documented

2. **Optimizations Report** (`OPTIMIZATIONS.md`)
   - Each issue found
   - Fix applied
   - Impact measured

3. **Metrics Comparison** (`METRICS.md`)
   ```
   Before:
   - Load Time: 5.2s
   - FPS: 25
   - Bundle Size: 5.2MB
   - Memory: 150MB

   After:
   - Load Time: 1.8s (65% faster)
   - FPS: 60 (140% better)
   - Bundle Size: 800KB (85% smaller)
   - Memory: 45MB (70% less)
   ```

## ✅ Acceptance Criteria
- [ ] All long tasks < 50ms
- [ ] FPS > 55 consistently
- [ ] No memory leaks
- [ ] Bundle size < 1MB
- [ ] Load time < 2s
- [ ] Documented all optimizations

## 💡 Tips
- Profile in production mode
- Use React DevTools Profiler
- Check bundle analyzer
- Test on slower devices
- Measure before and after

---
**Next:** Exercise 06: Production Debugging


