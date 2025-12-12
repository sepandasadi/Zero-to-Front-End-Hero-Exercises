# Exercise 3: Memory Leak Detection & Fix

**Difficulty:** ⭐⭐⭐ Advanced

**Estimated Time:** 90-120 minutes

---

## 🎯 Learning Objectives

By completing this exercise, you will:
- Detect memory leaks using Chrome DevTools Memory Profiler
- Understand common React memory leak patterns
- Fix memory leaks with proper cleanup functions
- Use heap snapshots to identify detached DOM nodes
- Monitor memory usage over time
- Implement abort controllers for fetch requests

---

## 📋 Scenario

The Dashboard component has multiple intentional memory leaks. After 10 minutes of usage, it consumes 500MB+ of memory and becomes sluggish. Users report:
- "Browser freezes after 20 minutes"
- "Page crashes when left open"
- "Scrolling becomes janky over time"

Your task: Find and fix ALL memory leaks using Chrome DevTools.

---

## 🔧 Setup

### Prerequisites
- Chrome or Edge browser (for Memory Profiler)
- Understanding of useEffect cleanup functions
- Knowledge of event listeners, timers, and subscriptions

### Installation

```bash
# Navigate to exercise directory
cd exercise-03-memory-leak-detection

# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:5173 in your browser.

---

## 🐛 The Leaky Dashboard

The starter code has **4 intentional memory leaks**:

1. ❌ WebSocket connection never closed
2. ❌ Interval never cleared
3. ❌ Event listener never removed
4. ❌ Subscription never unsubscribed
5. ❌ Data array grows indefinitely

---

## 🔍 Detection Process

### Task 1: Take Baseline Heap Snapshot

**Steps:**

1. Open Chrome DevTools (F12)
2. Go to **Memory** tab
3. Select **Heap snapshot**
4. Click **Take snapshot**
5. Label it "Baseline"

This captures memory state BEFORE the Dashboard component mounts.

---

### Task 2: Let the Leaks Accumulate

1. Navigate to the Dashboard page
2. Let it run for **1 minute** (watch the time update)
3. Perform these actions:
   - Resize the browser window a few times
   - Navigate away from Dashboard and back (3 times)
4. Wait another minute

**What's happening:**
- WebSocket keeps accumulating data
- Intervals keep running
- Event listeners keep multiplying
- Memory keeps growing

---

### Task 3: Force Garbage Collection

1. In Memory tab, click the **trash can icon** (🗑️ Collect garbage)
2. This clears temporary objects
3. Any growth after this is a real leak!

---

### Task 4: Take Second Snapshot

1. Click **Take snapshot** again
2. Label it "After Leaks"
3. In the dropdown (top-left), select **Comparison**
4. Compare "After Leaks" vs "Baseline"

---

### Task 5: Analyze the Leaks

In the Comparison view, look for:

**🔴 Detached DOM Nodes:**
```
HTMLDivElement: +50
```
Means 50 div elements are removed from the page but still in memory!

**🔴 Growing Arrays:**
```
Array: 1.2MB → 5.4MB (+350%)
```
Arrays growing = data accumulating without cleanup

**🔴 Event Listeners:**
```
EventListener: +25
```
Event listeners multiplying = not being removed

---

## 🛠️ Fixing the Leaks

### Leak 1: WebSocket Not Closed

**Problematic Code:**

```javascript
useEffect(() => {
  const ws = new WebSocket('wss://api.example.com');
  ws.onmessage = (event) => {
    setData(prev => [...prev, JSON.parse(event.data)]);
  };
  // NO CLEANUP! ❌
}, []);
```

**Problem:** WebSocket stays open even after component unmounts. Each time Dashboard mounts, a new WebSocket is created!

**Fix:**

```javascript
useEffect(() => {
  const ws = new WebSocket('wss://api.example.com');
  ws.onmessage = (event) => {
    setData(prev => [...prev, JSON.parse(event.data)]);
  };

  // Cleanup: close WebSocket on unmount ✅
  return () => {
    ws.close();
  };
}, []);
```

---

### Leak 2: Interval Not Cleared

**Problematic Code:**

```javascript
useEffect(() => {
  const interval = setInterval(() => {
    setTime(new Date());
  }, 1000);
  // NO CLEANUP! ❌
}, []);
```

**Problem:** Interval keeps running even after unmount. CPU keeps executing code for a component that's gone!

**Fix:**

```javascript
useEffect(() => {
  const interval = setInterval(() => {
    setTime(new Date());
  }, 1000);

  // Cleanup: clear interval on unmount ✅
  return () => {
    clearInterval(interval);
  };
}, []);
```

---

### Leak 3: Event Listener Not Removed

**Problematic Code:**

```javascript
useEffect(() => {
  const handleResize = () => {
    console.log('Window resized');
  };
  window.addEventListener('resize', handleResize);
  // NO CLEANUP! ❌
}, []);
```

**Problem:** Event listener stays attached to window object. Every mount adds another listener!

**Fix:**

```javascript
useEffect(() => {
  const handleResize = () => {
    console.log('Window resized');
  };
  window.addEventListener('resize', handleResize);

  // Cleanup: remove event listener on unmount ✅
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
```

---

### Leak 4: Subscription Not Unsubscribed

**Problematic Code:**

```javascript
useEffect(() => {
  const subscription = dataService.subscribe(newData => {
    setData(prev => [...prev, newData]);
  });
  // NO CLEANUP! ❌
}, []);
```

**Problem:** Subscription keeps receiving data even after unmount.

**Fix:**

```javascript
useEffect(() => {
  const subscription = dataService.subscribe(newData => {
    setData(prev => [...prev, newData]);
  });

  // Cleanup: unsubscribe on unmount ✅
  return () => {
    subscription.unsubscribe();
  };
}, []);
```

---

### Leak 5: Array Growing Indefinitely

**Problematic Code:**

```javascript
useEffect(() => {
  const subscription = dataService.subscribe(newData => {
    setData(prev => [...prev, newData]); // Grows forever! ❌
  });

  return () => subscription.unsubscribe();
}, []);
```

**Problem:** Data array keeps growing without limit. After 10 minutes with 1 update/second = 600 items!

**Fix: Limit array size**

```javascript
useEffect(() => {
  const subscription = dataService.subscribe(newData => {
    setData(prev => {
      const updated = [...prev, newData];
      return updated.slice(-100); // Keep only last 100 items ✅
    });
  });

  return () => subscription.unsubscribe();
}, []);
```

---

## 🎯 Task 6: Verify Fixes

After fixing all leaks, repeat the detection process:

1. **Clear all snapshots** (click X on each)
2. **Take new baseline snapshot**
3. **Let Dashboard run for 2 minutes**
4. **Navigate away and back 5 times**
5. **Force garbage collection**
6. **Take second snapshot**
7. **Compare snapshots**

**Expected results:**
- ✅ No detached DOM nodes
- ✅ Memory growth < 20MB
- ✅ Event listener count stable
- ✅ Data array capped at 100 items

---

## 📊 Measurement Comparison

### Before Fixes

| Metric | Value |
|--------|-------|
| Memory after 1 min | 150MB |
| Memory after 10 min | 500MB |
| Detached DOM nodes | 200+ |
| Event listeners | Growing (+10 per mount) |
| Data array size | Unlimited (600+ items) |

### After Fixes

| Metric | Value |
|--------|-------|
| Memory after 1 min | 50MB |
| Memory after 10 min | 65MB |
| Detached DOM nodes | 0 |
| Event listeners | Stable |
| Data array size | Capped at 100 |

**Memory improvement: 90% reduction! 🎉**

---

## ✅ Success Criteria

Your fixed Dashboard should achieve:

- ✅ Memory stable after 10 minutes (< 100MB)
- ✅ Zero detached DOM nodes in heap snapshots
- ✅ Event listener count doesn't increase on remount
- ✅ Data array size capped at 100 items
- ✅ WebSocket closes on unmount
- ✅ Intervals cleared on unmount
- ✅ All subscriptions unsubscribed on unmount

---

## 🎁 Bonus Challenges

### Bonus 1: Abort Fetch Requests

**Problem:** Fetch requests continue even after unmount.

```javascript
useEffect(() => {
  const controller = new AbortController();

  fetch('/api/data', { signal: controller.signal })
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => {
      if (err.name === 'AbortError') {
        console.log('Fetch aborted');
        return; // Expected, component unmounted
      }
      console.error('Fetch failed:', err);
    });

  return () => {
    controller.abort(); // Cancel request on unmount ✅
  };
}, []);
```

---

### Bonus 2: Memory Monitoring in Production

Set up Sentry Performance Monitoring:

```bash
npm install @sentry/react
```

```javascript
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'your-dsn',
  integrations: [
    new Sentry.BrowserTracing(),
  ],
  tracesSampleRate: 0.1,
});

// Monitor memory usage
setInterval(() => {
  if (performance.memory) {
    const { usedJSHeapSize, totalJSHeapSize } = performance.memory;
    const usageMB = (usedJSHeapSize / 1048576).toFixed(2);

    if (usageMB > 200) {
      Sentry.captureMessage(`High memory usage: ${usageMB}MB`, 'warning');
    }
  }
}, 60000); // Check every minute
```

---

### Bonus 3: Allocation Timeline

For real-time leak detection:

1. DevTools → Memory → **Allocation instrumentation on timeline**
2. Click **Start**
3. Interact with app
4. Click **Stop**

**Look for:**
- Blue bars going up = memory allocated
- Blue bars staying up = memory NOT freed (leak!)

**Healthy pattern:** ↗↘↗↘↗↘ (allocate, free, allocate, free)
**Leak pattern:** ↗↗↗↗↗ (only allocating, never freeing)

---

## 🔍 Common Leak Patterns

### Pattern 1: Event Listeners on Window/Document

```javascript
// ❌ Leak
window.addEventListener('scroll', handleScroll);

// ✅ Fixed
useEffect(() => {
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

### Pattern 2: Timers (setTimeout/setInterval)

```javascript
// ❌ Leak
setTimeout(() => doSomething(), 5000);
setInterval(() => update(), 1000);

// ✅ Fixed
useEffect(() => {
  const timeout = setTimeout(() => doSomething(), 5000);
  const interval = setInterval(() => update(), 1000);

  return () => {
    clearTimeout(timeout);
    clearInterval(interval);
  };
}, []);
```

### Pattern 3: Third-Party Libraries

```javascript
// ❌ Leak
useEffect(() => {
  const chart = new Chart(canvasRef.current, config);
}, []);

// ✅ Fixed
useEffect(() => {
  const chart = new Chart(canvasRef.current, config);
  return () => chart.destroy(); // Cleanup
}, []);
```

---

## 📚 Key Takeaways

- **Always return cleanup functions from useEffect**
- **Event listeners on window/document must be removed**
- **Clear ALL timers (setTimeout, setInterval)**
- **Close connections (WebSocket, Server-Sent Events)**
- **Unsubscribe from observables/subscriptions**
- **Limit array/object growth in state**
- **Abort fetch requests on unmount**
- **Use heap snapshots to verify fixes**

---

## 🎓 Debugging Tips

**Tip 1:** Search for "Detached" in heap snapshot to find detached DOM nodes

**Tip 2:** Filter by "EventListener" to count event listeners

**Tip 3:** Look for growing Constructors (Array, Object, etc.)

**Tip 4:** Use Allocation Timeline for real-time leak detection

**Tip 5:** Test by mounting/unmounting component 10+ times

---

## 📖 Further Reading

- [Chrome DevTools Memory Profiler](https://developer.chrome.com/docs/devtools/memory-problems/)
- [React useEffect Cleanup](https://react.dev/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development)
- [MDN: Memory Management](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
- [Fixing Memory Leaks in React](https://react.dev/learn/synchronizing-with-effects#cleanup-function)

---

## 🎉 Congratulations!

You've successfully detected and fixed all memory leaks! Memory leaks are subtle but devastating bugs. The skills you've learned here will help you build robust, production-ready applications.

**Final Task:** Move on to the Challenge Project - Performance Audit & Optimization Sprint!

