# Exercise 4: Memory Leak Detection

**Difficulty:** ⭐⭐⭐ Advanced
**Time Required:** 60-90 minutes
**Prerequisites:** Exercises 1-3 completed

---

## 📚 Learning Objectives

By completing this exercise, you will:
- Master the Memory panel in Chrome DevTools
- Take and compare heap snapshots
- Use the 3-snapshot technique
- Find detached DOM nodes
- Identify event listener leaks
- Detect timer/interval leaks
- Fix memory leaks systematically
- Monitor memory usage over time

---

## 🎯 Exercise Overview

You'll debug a web application with multiple memory leaks that cause the browser to slow down and eventually crash. Use the Memory panel to identify and fix each leak.

---

## 📋 Part 1: Understanding Memory Leaks

### What is a Memory Leak?

A memory leak occurs when your application allocates memory but never releases it. Over time:
- Memory usage grows continuously
- Application slows down
- Browser may crash
- Poor user experience

### Common Causes

1. **Detached DOM nodes** - Removed from DOM but still referenced
2. **Event listeners** - Not removed when element is removed
3. **Timers** - `setInterval`/`setTimeout` not cleared
4. **Closures** - Capturing unnecessary scope
5. **Global variables** - Accumulating data
6. **Cache without limits** - Growing indefinitely

---

## 📝 Part 2: Setup & Initial Analysis

### Open the Leaky Application

1. Open `starter/leaky-app.html` in Chrome
2. Click around the interface:
   - Create widgets
   - Delete widgets
   - Navigate between views
   - Use the animation
3. **Notice:** After 1-2 minutes, the page becomes sluggish

### Initial Memory Check

1. Open DevTools → Memory panel
2. Take a **Heap snapshot** (Snapshot 1)
3. Note the heap size: _____ MB
4. Click "Create Widget" 10 times
5. Delete all widgets
6. Force garbage collection (🗑️ icon)
7. Take another snapshot (Snapshot 2)
8. **Compare:** Memory increased? Should have returned to baseline!

---

## 📝 Part 3: The 3-Snapshot Technique

This is the gold standard for finding memory leaks.

### Steps

```
1. Take Snapshot A (baseline)
2. Perform action (e.g., create/delete widget)
3. Take Snapshot B
4. Repeat the same action
5. Take Snapshot C
6. Compare: Objects allocated between Snapshot A and C
7. These objects shouldn't exist - they're leaks!
```

### Your Task

1. Take Snapshot 1
2. Create 5 widgets, then delete all 5
3. Click 🗑️ to force garbage collection
4. Take Snapshot 2
5. Create 5 MORE widgets, then delete all 5
6. Force garbage collection again
7. Take Snapshot 3
8. **Compare Snapshots 1 and 3:**
   - Switch to "Comparison" view
   - Look for objects that grew
   - Should be minimal growth, but there's significant growth!

---

## 📝 Part 4: Finding Specific Leaks

### Leak #1: Detached DOM Nodes

**Symptom:** Memory grows even after deleting widgets

**Debug Steps:**
1. Take a heap snapshot
2. In the search box, type: `Detached`
3. Expand "Detached HTMLDivElement" or similar
4. See the retained size
5. Click on an instance to see the retaining path

**What you'll find:**
- Widget DOM elements are detached but still referenced
- They're being held in an array or object
- Even though removed from DOM, they can't be garbage collected

**Fix:**
```javascript
// ❌ Bad: Keeping references to removed DOM nodes
widgets.push(widgetElement);

// ✅ Good: Remove reference when removing from DOM
function deleteWidget(id) {
  const widget = widgets.find(w => w.id === id);
  widget.element.remove();

  // Remove from array
  widgets = widgets.filter(w => w.id !== id);
}
```

### Leak #2: Event Listener Accumulation

**Symptom:** Event listeners multiply on each action

**Debug Steps:**
1. Take snapshot
2. Compare with previous snapshot
3. Filter by "Listener"
4. See event listeners growing
5. Click to see which elements have listeners

**What you'll find:**
- Event listeners added but never removed
- When widget is deleted, listeners remain
- Memory can't be freed

**Fix:**
```javascript
// ❌ Bad: Not removing listeners
element.addEventListener('click', handler);
// Element removed, but listener still exists

// ✅ Good: Remove listeners on cleanup
function deleteWidget(widget) {
  widget.element.removeEventListener('click', widget.clickHandler);
  widget.element.remove();
}

// ✅ Better: Use event delegation
container.addEventListener('click', (e) => {
  if (e.target.matches('.widget-button')) {
    // Handle click
  }
});
```

### Leak #3: Timer Not Cleared

**Symptom:** Animation continues even after closing modal

**Debug Steps:**
1. Open the Animation modal
2. Close it
3. Take heap snapshot
4. Search for "interval" or check allocated objects
5. See timer still running

**What you'll find:**
```javascript
// ❌ Bad: Timer keeps running
function startAnimation() {
  setInterval(() => {
    updateAnimation();
  }, 16);
}

// Timer never cleared!
```

**Fix:**
```javascript
// ✅ Good: Store reference and clear
let animationTimer;

function startAnimation() {
  animationTimer = setInterval(() => {
    updateAnimation();
  }, 16);
}

function stopAnimation() {
  if (animationTimer) {
    clearInterval(animationTimer);
    animationTimer = null;
  }
}
```

### Leak #4: Closure Capturing Too Much

**Symptom:** Old data remains in memory

**Debug Steps:**
1. Take snapshot
2. Search for large objects
3. Find objects that should have been freed
4. Check retaining path - often held by a closure

**What you'll find:**
```javascript
// ❌ Bad: Closure captures entire scope
function createWidget(largeData) {
  const element = document.createElement('div');

  element.addEventListener('click', () => {
    console.log('Clicked');
    // Closure captures largeData even though not used!
  });

  return element;
}

// ✅ Good: Don't capture unnecessary variables
function createWidget(largeData) {
  const element = document.createElement('div');
  const needed = largeData.smallPart;  // Extract only what's needed

  element.addEventListener('click', () => {
    console.log('Clicked', needed);
    // Only captures 'needed', not entire 'largeData'
  });

  return element;
}
```

### Leak #5: Global State Accumulation

**Symptom:** Global `cache` object grows indefinitely

**Debug Steps:**
1. Take snapshot
2. Search for "cache" or check global objects
3. See cache growing with each action
4. No mechanism to limit or clear it

**What you'll find:**
```javascript
// ❌ Bad: Unbounded cache
const cache = {};

function cacheData(id, data) {
  cache[id] = data;  // Grows forever!
}

// ✅ Good: LRU cache with size limit
class LRUCache {
  constructor(maxSize = 100) {
    this.maxSize = maxSize;
    this.cache = new Map();
  }

  set(key, value) {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }

  get(key) {
    const value = this.cache.get(key);
    if (value) {
      // Move to end (most recently used)
      this.cache.delete(key);
      this.cache.set(key, value);
    }
    return value;
  }
}
```

---

## 📝 Part 5: Memory Profiling

### Allocation Timeline

1. Memory panel → Allocation Timeline
2. Click **Record**
3. Perform actions (create/delete widgets)
4. Stop recording
5. **Analyze:**
   - Blue bars = allocations
   - Gray areas = garbage collected
   - Blue bars that stay = potential leaks

### Allocation Sampling

1. Memory panel → Allocation Sampling
2. Click **Start**
3. Use the app for 30 seconds
4. Stop
5. **See:** Which functions allocate most memory

---

## ✅ Verification Tasks

After fixing all leaks:

### Task 1: 3-Snapshot Test
- [ ] Take Snapshot A
- [ ] Create 10 widgets, delete all 10
- [ ] Force GC, take Snapshot B
- [ ] Repeat: Create 10, delete 10
- [ ] Force GC, take Snapshot C
- [ ] Compare A and C: Growth should be minimal (<1MB)

### Task 2: Detached Nodes
- [ ] Take snapshot
- [ ] Search for "Detached"
- [ ] Should find 0 or very few detached nodes

### Task 3: Event Listeners
- [ ] Create and delete 20 widgets
- [ ] Take snapshot
- [ ] Check listener count
- [ ] Should be low (only active elements)

### Task 4: Timers
- [ ] Open animation modal
- [ ] Close it
- [ ] Verify timer stopped (check console or snapshot)

### Task 5: Long-term Stability
- [ ] Use app for 5 minutes (create/delete widgets repeatedly)
- [ ] Memory should stay relatively stable
- [ ] No continuous growth

---

## 📊 Expected Results

### Before Fixes
```
Initial memory: 20MB
After 50 widget create/deletes: 150MB+ (growing)
Detached nodes: 50+
Event listeners: 100+
Active timers: 5+
App becomes sluggish after 2 minutes
```

### After Fixes
```
Initial memory: 20MB
After 50 widget create/deletes: 25-30MB (stable)
Detached nodes: 0-2
Event listeners: 5-10 (only active UI)
Active timers: 0 (when not animating)
App remains fast indefinitely
```

---

## 🎓 Bonus Challenges

1. **Create a Memory Monitor**
   ```javascript
   setInterval(() => {
     if (performance.memory) {
       console.log('Heap used:', (performance.memory.usedJSHeapSize / 1048576).toFixed(2), 'MB');
     }
   }, 5000);
   ```

2. **Add WeakMap for Caching**
   ```javascript
   // Automatically garbage collected when key is removed
   const cache = new WeakMap();
   cache.set(domElement, data);
   ```

3. **Implement Cleanup on Page Unload**
   ```javascript
   window.addEventListener('beforeunload', () => {
     // Clean up everything
     stopAllTimers();
     removeAllListeners();
     clearCache();
   });
   ```

---

## 📚 Key Takeaways

- **Memory leaks** accumulate over time, degrading performance
- **Detached DOM nodes** are a common leak source
- **Event listeners** must be removed with elements
- **Timers** must always be cleared
- **Closures** can capture more than needed
- **3-snapshot technique** reliably finds leaks
- **Heap snapshots** show what's in memory and why
- **Retaining paths** explain why objects can't be freed
- **Force GC** before comparing snapshots
- **Memory profiling** should be part of regular testing

---

## 🔧 DevTools Features Mastered

- ✅ Heap snapshots
- ✅ Snapshot comparison
- ✅ 3-snapshot technique
- ✅ Detached node detection
- ✅ Retaining path analysis
- ✅ Allocation timeline
- ✅ Allocation sampling
- ✅ Force garbage collection
- ✅ Memory monitoring
- ✅ Leak pattern recognition

---

**Estimated Completion Time:** 60-90 minutes
**Next Exercise:** Exercise 5 - Lighthouse Audit & Optimization

**Excellent debugging! You've mastered memory leak detection!** 🧠🔍

