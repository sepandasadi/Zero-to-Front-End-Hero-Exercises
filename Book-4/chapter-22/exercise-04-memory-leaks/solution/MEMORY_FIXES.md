# Memory Leak Fixes Documentation

## Overview

This document explains all memory leaks found in the starter app and how they were fixed.

---

## Leak #1: Detached DOM Nodes in Array

### Problem

```javascript
// ❌ Leaky version
const widgets = [];

function createWidget() {
  const widget = document.createElement('div');
  // ...
  widgets.push({
    id,
    element: widget,  // DOM reference stored
    data: largeData
  });

  document.body.appendChild(widget);
}

function deleteWidget(id) {
  const widgetElement = document.getElementById(`widget-${id}`);
  widgetElement.remove();  // Removed from DOM

  // ❌ But widgets array still has reference!
  // Element can't be garbage collected
}
```

### Why It Leaks

- DOM element removed from DOM tree (detached)
- But `widgets` array still references it
- Garbage collector can't free the element
- Each delete creates a "detached" node
- Memory grows with each create/delete cycle

### Detection in DevTools

```
1. Take heap snapshot
2. Search for "Detached"
3. Find "Detached HTMLDivElement"
4. Click to see retaining path
5. Path shows: Window → widgets array → element
```

### Fix

```javascript
// ✅ Fixed version
const widgets = new Map();  // Using Map for easy cleanup

function createWidget() {
  const widget = document.createElement('div');
  // ...
  widgets.set(id, {
    element: widget,
    // other data
  });
}

function deleteWidget(id) {
  const widgetData = widgets.get(id);

  if (widgetData) {
    // Remove from DOM
    widgetData.element.remove();

    // ✅ Remove reference from Map
    widgets.delete(id);

    // Now element can be garbage collected!
  }
}
```

### Verification

```
After fix:
- Search "Detached" in heap snapshot
- Should find 0 or very few detached nodes
- Memory returns to baseline after delete + GC
```

---

## Leak #2: Event Listeners Not Removed

### Problem

```javascript
// ❌ Leaky version
function createWidget() {
  const widget = document.createElement('div');
  const button = widget.querySelector('button');

  // Large data in closure
  const largeData = new Array(100000).fill('data');

  const clickHandler = function() {
    console.log('Clicked');
    // Closure captures largeData even if not used!
    console.log(largeData.length > 0);
  };

  button.addEventListener('click', clickHandler);

  // When widget is deleted:
  widget.remove();

  // ❌ Event listener still exists!
  // ❌ Closure still holds largeData
  // ❌ Memory can't be freed
}
```

### Why It Leaks

- Event listeners create strong references
- Even when element is removed from DOM, listener persists
- Closure captures entire scope (including largeData)
- Element, listener, and captured data all leak

### Detection in DevTools

```
1. Take snapshot
2. Compare with previous snapshot
3. Filter by "Listener" or "EventListener"
4. See listeners growing
5. Check retaining path - shows event listener chain
```

### Fix

```javascript
// ✅ Fixed version
function createWidget() {
  const widget = document.createElement('div');
  const button = widget.querySelector('button');

  // Only keep minimal data
  const necessaryData = { id: widgetId };

  const clickHandler = function() {
    console.log('Clicked', necessaryData.id);
    // Only captures necessaryData, not largeData
  };

  button.addEventListener('click', clickHandler);

  // Store handler reference for cleanup
  widgets.set(id, {
    element: widget,
    button,
    clickHandler
  });
}

function deleteWidget(id) {
  const widgetData = widgets.get(id);

  if (widgetData) {
    // ✅ Remove event listener first!
    widgetData.button.removeEventListener('click', widgetData.clickHandler);

    // Then remove element
    widgetData.element.remove();

    // Remove from Map
    widgets.delete(id);
  }
}
```

### Alternative: Event Delegation

```javascript
// ✅ Even better: Use event delegation
container.addEventListener('click', (e) => {
  if (e.target.matches('.widget-button')) {
    const widgetId = e.target.closest('.widget').dataset.id;
    handleWidgetClick(widgetId);
  }
});

// Only ONE listener for entire container
// No need to add/remove listeners for each widget
```

### Verification

```
After fix:
- Event listener count stays low
- Only active UI elements have listeners
- Memory doesn't grow with create/delete cycles
```

---

## Leak #3: Timers Not Cleared

### Problem

```javascript
// ❌ Leaky version
let animationTimer;

function openAnimationModal() {
  const box = document.getElementById('animatedBox');
  let hue = 0;

  animationTimer = setInterval(() => {
    hue = (hue + 1) % 360;
    box.style.background = `hsl(${hue}, 70%, 60%)`;
  }, 16);
}

function closeAnimationModal() {
  modal.classList.remove('active');

  // ❌ Timer still running!
  // ❌ Callback still executes 60 times per second
  // ❌ Keeps references alive
}
```

### Why It Leaks

- `setInterval` returns a timer ID but it's never cleared
- Callback continues executing forever
- Callback references (box element, hue variable) can't be freed
- CPU cycles wasted
- Memory held unnecessarily

### Detection in DevTools

```
1. Open animation modal
2. Close it
3. Take heap snapshot
4. Look for interval/timer objects
5. Check CPU usage (should drop to 0 but doesn't)
6. Console: Timer callbacks still logging
```

### Fix

```javascript
// ✅ Fixed version
let animationTimer = null;

function openAnimationModal() {
  const box = document.getElementById('animatedBox');
  let hue = 0;

  // Clear any existing timer first
  if (animationTimer) {
    clearInterval(animationTimer);
  }

  animationTimer = setInterval(() => {
    hue = (hue + 1) % 360;
    box.style.background = `hsl(${hue}, 70%, 60%)`;
  }, 16);
}

function closeAnimationModal() {
  modal.classList.remove('active');

  // ✅ Clear the timer!
  if (animationTimer) {
    clearInterval(animationTimer);
    animationTimer = null;
  }
}
```

### Best Practice

```javascript
// ✅ Even better: Track all timers
const timers = new Set();

function setTrackedInterval(callback, delay) {
  const id = setInterval(callback, delay);
  timers.add(id);
  return id;
}

function clearTrackedInterval(id) {
  clearInterval(id);
  timers.delete(id);
}

// Clean up all timers on unload
window.addEventListener('beforeunload', () => {
  timers.forEach(id => clearInterval(id));
  timers.clear();
});
```

### Verification

```
After fix:
- Close modal
- CPU usage drops to near 0
- No callbacks running in background
- Memory stable
```

---

## Leak #4: Unbounded Cache Growth

### Problem

```javascript
// ❌ Leaky version
const cache = {};

function createWidget() {
  const largeData = new Array(100000).fill('data');

  cache[`widget_${id}`] = {
    data: largeData,
    metadata: new Array(50000).fill('metadata')
  };

  // Cache grows forever!
  // Never removes old entries
}

function startHeavyTask() {
  for (let i = 0; i < 100; i++) {
    cache[`heavy_${Date.now()}_${i}`] = {
      data: new Array(100000).fill('heavy data')
    };
  }
  // Adds 100+ entries every time
  // Old entries never removed
}
```

### Why It Leaks

- Cache has no size limit
- Old entries never removed
- Grows indefinitely over time
- Each entry can be large (arrays, objects)
- Eventually causes out-of-memory errors

### Detection in DevTools

```
1. Take snapshot
2. Use app for a while
3. Take another snapshot
4. Compare: Object size increase
5. Look for large arrays or objects
6. Check retaining path - leads to 'cache' object
```

### Fix: LRU Cache Implementation

```javascript
// ✅ Fixed version: LRU (Least Recently Used) Cache
class LRUCache {
  constructor(maxSize = 100) {
    this.maxSize = maxSize;
    this.cache = new Map();  // Maintains insertion order
  }

  set(key, value) {
    // Remove oldest entry if at limit
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }

  get(key) {
    const value = this.cache.get(key);
    if (value !== undefined) {
      // Move to end (most recently used)
      this.cache.delete(key);
      this.cache.set(key, value);
    }
    return value;
  }

  delete(key) {
    return this.cache.delete(key);
  }

  clear() {
    this.cache.clear();
  }

  get size() {
    return this.cache.size;
  }
}

const cache = new LRUCache(100);  // Max 100 items

// Now cache automatically stays under 100 items
// Old entries removed when new ones added
```

### Alternative: WeakMap for Object Keys

```javascript
// ✅ For DOM element caching: Use WeakMap
const elementCache = new WeakMap();

// Automatically garbage collected when element is removed
elementCache.set(domElement, data);

// When domElement is removed from DOM and no other references:
// → Entry automatically removed from WeakMap
// → Memory freed
```

### Verification

```
After fix:
- Cache size never exceeds maxSize
- Memory remains stable
- Old entries automatically removed
- Can run indefinitely without memory growth
```

---

## Leak #5: Closures Capturing Unnecessary Scope

### Problem

```javascript
// ❌ Leaky version
function createWidget() {
  const id = widgetId++;

  // Large data defined
  const largeData = new Array(100000).fill(`Data for widget ${id}`);
  const metadata = {
    created: Date.now(),
    moreData: new Array(50000).fill('metadata')
  };

  const widget = document.createElement('div');
  const button = widget.querySelector('button');

  // Handler closure
  button.addEventListener('click', function() {
    console.log('Widget clicked:', id);
    // Closure captures ENTIRE scope:
    // - largeData (not used!)
    // - metadata (not used!)
    // - widget, button, etc.

    // Just checking if data exists captures it all!
    if (largeData.length > 0) {
      console.log('Has data');
    }
  });

  // Even if widget is removed, closure keeps all this in memory!
}
```

### Why It Leaks

- JavaScript closures capture entire outer scope
- Even if you only use `id`, closure holds everything
- Large arrays/objects held in memory
- Multiplied by number of widgets
- Memory grows significantly

### Detection in DevTools

```
1. Take heap snapshot
2. Find large arrays
3. Click to see retaining path
4. Path shows: Window → function scope → variables
5. Notice large data held by closures
```

### Fix: Minimize Closure Scope

```javascript
// ✅ Fixed version
function createWidget() {
  const id = widgetId++;

  // Extract only what's needed BEFORE creating closure
  const necessaryData = {
    id: id,
    timestamp: Date.now()
  };

  // Don't create large structures
  // Or create them separately and don't capture

  const widget = document.createElement('div');
  const button = widget.querySelector('button');

  button.addEventListener('click', function() {
    console.log('Widget clicked:', necessaryData.id);
    // Closure only captures necessaryData
    // Not large arrays or unused variables
  });
}
```

### Best Practice: Explicit Scope

```javascript
// ✅ Even better: Explicitly pass only what's needed
function createClickHandler(widgetId) {
  return function() {
    console.log('Clicked:', widgetId);
    // Only captures widgetId parameter
    // Nothing from outer scope
  };
}

function createWidget() {
  const id = widgetId++;
  const largeData = new Array(100000).fill('data');  // Not captured

  const widget = document.createElement('div');
  const button = widget.querySelector('button');

  const handler = createClickHandler(id);
  button.addEventListener('click', handler);

  // largeData can be garbage collected immediately
  // Handler only captures id
}
```

### Verification

```
After fix:
- Heap snapshot shows smaller closures
- Large arrays/objects not retained
- Memory per widget significantly reduced
- 10x or more reduction in memory usage
```

---

## Leak #6: Global Variables Accumulating

### Problem

```javascript
// ❌ Leaky version
// Global interval adding data every second
setInterval(() => {
  cache[`background_${Date.now()}`] = {
    timestamp: Date.now(),
    data: new Array(10000).fill('background task data')
  };

  // Runs every second, forever
  // Adds data indefinitely
  // No cleanup mechanism
}, 1000);
```

### Why It Leaks

- Background task runs continuously
- Accumulates data in global object
- Never stops or limits itself
- Memory grows over time
- Eventually causes OOM

### Fix

```javascript
// ✅ Fixed version: Limited background task
let backgroundDataCount = 0;
const MAX_BACKGROUND_DATA = 10;

const backgroundTask = setInterval(() => {
  if (backgroundDataCount < MAX_BACKGROUND_DATA) {
    cache.set(`background_${Date.now()}`, {
      timestamp: Date.now()
    });
    backgroundDataCount++;
  }
  // Stops accumulating after reaching limit
}, 5000);

// Clean up on page unload
window.addEventListener('beforeunload', () => {
  clearInterval(backgroundTask);
});
```

---

## Complete Cleanup Pattern

### Best Practice: Lifecycle Management

```javascript
class Widget {
  constructor(id) {
    this.id = id;
    this.timers = new Set();
    this.listeners = [];
    this.init();
  }

  init() {
    this.element = document.createElement('div');
    this.setupListeners();
  }

  setupListeners() {
    const handler = () => console.log('Clicked');
    this.element.addEventListener('click', handler);

    // Track for cleanup
    this.listeners.push({
      element: this.element,
      event: 'click',
      handler
    });
  }

  startTimer() {
    const id = setInterval(() => {
      console.log('Timer tick');
    }, 1000);

    this.timers.add(id);
  }

  // ✅ Cleanup method
  destroy() {
    // Clear all timers
    this.timers.forEach(id => clearInterval(id));
    this.timers.clear();

    // Remove all listeners
    this.listeners.forEach(({ element, event, handler }) => {
      element.removeEventListener(event, handler);
    });
    this.listeners = [];

    // Remove from DOM
    this.element.remove();

    // Clear references
    this.element = null;
  }
}

// Usage
const widget = new Widget(1);
// ...
widget.destroy();  // Fully cleaned up
```

---

## Testing for Memory Leaks

### The 3-Snapshot Technique

```
Step 1: Take Snapshot A (baseline)
Step 2: Perform action (create/delete widgets)
Step 3: Force GC (🗑️ button)
Step 4: Take Snapshot B
Step 5: Repeat same action again
Step 6: Force GC again
Step 7: Take Snapshot C
Step 8: Compare Snapshots A and C

Expected: Similar memory usage
If memory increased significantly → Leak!
```

### Automated Testing

```javascript
// Memory monitoring helper
function monitorMemory() {
  if (!performance.memory) {
    console.warn('Memory API not available');
    return;
  }

  const baseline = performance.memory.usedJSHeapSize;

  return {
    getIncrease() {
      const current = performance.memory.usedJSHeapSize;
      return ((current - baseline) / baseline * 100).toFixed(2);
    },

    check(maxIncreasePercent = 10) {
      const increase = parseFloat(this.getIncrease());
      if (increase > maxIncreasePercent) {
        console.error(`Memory leak detected! Increased by ${increase}%`);
        return false;
      }
      console.log(`Memory increase: ${increase}% (OK)`);
      return true;
    }
  };
}

// Usage
const monitor = monitorMemory();

// Perform test actions
for (let i = 0; i < 100; i++) {
  createWidget();
  deleteWidget();
}

// Check memory
monitor.check();  // Should be < 10% increase
```

---

## Summary of All Fixes

| Leak Type | Problem | Fix |
|-----------|---------|-----|
| Detached DOM | Element removed but referenced | Remove from data structures |
| Event Listeners | Not removed with element | `removeEventListener` before delete |
| Timers | `setInterval` not cleared | `clearInterval` in cleanup |
| Unbounded Cache | Grows indefinitely | LRU cache with size limit |
| Closures | Capture too much scope | Minimize captured variables |
| Background Tasks | Accumulate data | Add limits, clear on unload |

---

## DevTools Commands Reference

```javascript
// Force garbage collection (if --expose-gc flag set)
window.gc();

// Check memory (Chrome only)
console.log(performance.memory);

// Monitor memory over time
setInterval(() => {
  const mb = (performance.memory.usedJSHeapSize / 1048576).toFixed(2);
  console.log(`Memory: ${mb} MB`);
}, 5000);
```

---

## Key Takeaways

1. ✅ Always remove event listeners with elements
2. ✅ Always clear timers/intervals
3. ✅ Limit cache sizes (use LRU)
4. ✅ Minimize closure scope
5. ✅ Remove references from data structures
6. ✅ Use WeakMap for auto garbage collection
7. ✅ Implement cleanup/destroy methods
8. ✅ Test with 3-snapshot technique
9. ✅ Monitor memory in production
10. ✅ Clean up on page unload

---

**Congratulations!** You've mastered memory leak detection and prevention! 🎉🧠

