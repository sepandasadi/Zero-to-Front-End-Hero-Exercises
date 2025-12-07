# Getting Started - Performance Profiling

## 🎯 Your Mission

Identify and fix **6 performance bottlenecks** using Chrome DevTools Performance tab and React Profiler.

**Time Estimate:** 2-3 hours
**Difficulty:** Advanced

---

## 🚀 Setup

### **1. Install Dependencies**
```bash
npm install
```

### **2. Start Development Server**
```bash
npm run dev
```

### **3. Open in Browser**
Navigate to `http://localhost:5173`

### **4. Install React DevTools (if not already)**
Chrome: [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)

---

## 🐛 The 6 Performance Issues

| # | Issue | Symptom | Tool |
|---|-------|---------|------|
| 1 | Long Task | UI freezes when loading | Performance → Main thread |
| 2 | Unnecessary Re-renders | Component flashes constantly | React Profiler + Highlight |
| 3 | Memory Leak | RAM usage grows continuously | Memory tab → Heap snapshot |
| 4 | Large Bundle | Slow initial load | Network tab → JS bundle size |
| 5 | N+1 Rendering | List renders item-by-item | React Profiler → Flamegraph |
| 6 | Unoptimized Images | Slow image loading | Network → Images |

---

## 🔍 Debugging Steps

### **Part 1: Performance Tab (Chrome DevTools)**

#### **Record a Performance Profile:**
1. Open DevTools → Performance tab
2. Click ⏺️ Record
3. Interact with the app (click buttons, scroll)
4. Click ⏹️ Stop
5. Analyze the results

#### **What to Look For:**
- **Long tasks** (red flags in timeline) - Tasks > 50ms
- **Main thread activity** - Yellow = JavaScript, Purple = Rendering
- **FPS drops** - Green bars should be tall (60 FPS)
- **Memory usage** - Should be stable, not growing

---

### **Part 2: React Profiler**

#### **Enable Profiler:**
1. Open React DevTools
2. Click "Profiler" tab
3. Click ⏺️ Record
4. Interact with app
5. Click ⏹️ Stop

#### **What to Look For:**
- **Flamegraph view:** Shows component render times
- **Ranked view:** Shows slowest components
- **Why did this render?** - Click component to see reason
- **Wasted renders** - Components that rendered but didn't change

---

### **Part 3: Memory Profiling**

#### **Take Heap Snapshots:**
1. DevTools → Memory tab
2. Select "Heap snapshot"
3. Click "Take snapshot"
4. Interact with app
5. Take another snapshot
6. Compare snapshots

#### **What to Look For:**
- Growing object counts
- Detached DOM nodes
- Event listeners not removed
- Large objects retained in memory

---

## 📝 Required Deliverables

### **1. PERFORMANCE_REPORT.md**
Document each performance issue:

```markdown
## Issue #1: Long Task Blocking Main Thread

**Component:** ProductList

**How I Found It:**
1. Opened Performance tab
2. Recorded profile while clicking "Load Products"
3. Saw red flag: Task took 850ms
4. Identified expensive operation in Main thread

**Performance Tab Screenshot:**
[Screenshot showing long task]

**Problem:**
Synchronous loop processing 10,000 items blocks UI

**Code Before:**
```jsx
const processProducts = () => {
  const processed = [];
  for (let i = 0; i < 10000; i++) {
    processed.push(expensiveCalculation(i));
  }
  setProducts(processed);
};
```

**Solution:**
Use web worker or batch processing with requestIdleCallback

**Code After:**
```jsx
const processProducts = async () => {
  const processed = [];
  const batchSize = 100;

  for (let i = 0; i < 10000; i += batchSize) {
    await new Promise(resolve => requestIdleCallback(resolve));
    const batch = items.slice(i, i + batchSize);
    processed.push(...batch.map(expensiveCalculation));
  }

  setProducts(processed);
};
```

**Metrics:**
- Before: 850ms blocking time, UI frozen
- After: 50ms max blocking, UI responsive
- Improvement: 94% faster
```

### **2. Screenshots Folder**
Create `/screenshots/` with:
- Performance tab (before/after)
- React Profiler flamegraph
- Memory heap snapshots
- Network waterfall (bundle size)

---

## ✅ Completion Checklist

### **Performance Tab:**
- [ ] Recorded performance profile
- [ ] Identified long tasks (>50ms)
- [ ] Checked FPS (should be 60)
- [ ] Analyzed main thread activity
- [ ] Measured First Contentful Paint (FCP)
- [ ] Measured Time to Interactive (TTI)

### **React Profiler:**
- [ ] Used Profiler to record interactions
- [ ] Viewed Flamegraph
- [ ] Checked Ranked view
- [ ] Identified unnecessary renders
- [ ] Used "Why did this render?"

### **Memory Profiling:**
- [ ] Took heap snapshots
- [ ] Compared snapshots
- [ ] Identified memory leaks
- [ ] Checked detached DOM nodes

### **Issues Fixed:**
- [ ] Issue 1: Long task (split into chunks)
- [ ] Issue 2: Unnecessary renders (React.memo)
- [ ] Issue 3: Memory leak (cleanup functions)
- [ ] Issue 4: Large bundle (code splitting)
- [ ] Issue 5: N+1 rendering (batch updates)
- [ ] Issue 6: Unoptimized images (lazy loading)

---

## 💡 Performance Optimization Patterns

### **1. Code Splitting:**
```jsx
// Before: Import everything upfront
import HeavyComponent from './HeavyComponent';

// After: Lazy load
const HeavyComponent = lazy(() => import('./HeavyComponent'));
```

### **2. Memoization:**
```jsx
// Prevent re-renders
const MemoizedComponent = memo(MyComponent);

// Memoize expensive calculations
const result = useMemo(() => expensiveCalc(data), [data]);

// Memoize callbacks
const handleClick = useCallback(() => {}, []);
```

### **3. Virtual Scrolling:**
```jsx
// For long lists, render only visible items
import { FixedSizeList } from 'react-window';
```

### **4. Image Optimization:**
```jsx
// Lazy load images
<img loading="lazy" src="image.jpg" />

// Use modern formats
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="fallback">
</picture>
```

---

## 🎯 Performance Budget

Your app should meet these metrics:

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| First Contentful Paint | < 1.5s | ? | ❌ |
| Time to Interactive | < 3.5s | ? | ❌ |
| Total Bundle Size | < 200KB | ? | ❌ |
| Main Thread Blocking | < 50ms | ? | ❌ |
| Memory Usage | Stable | ? | ❌ |
| Frame Rate | 60 FPS | ? | ❌ |

---

## 🎯 Success Criteria

You've mastered performance profiling when you:
- ✅ Can record and analyze performance profiles
- ✅ Identify long tasks and optimize them
- ✅ Use React Profiler effectively
- ✅ Find and fix memory leaks
- ✅ Optimize bundle size
- ✅ Achieve performance budget targets

---

**Time Estimate:** 2-3 hours
**Next:** Exercise 06 - Production Debugging

**Master performance profiling and build lightning-fast apps!** ⚡🚀


