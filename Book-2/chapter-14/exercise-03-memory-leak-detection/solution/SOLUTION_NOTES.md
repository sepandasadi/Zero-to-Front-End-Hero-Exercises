# Solution Notes - Exercise 3: Memory Leak Detection & Fix

## All Leaks Fixed! ✅

### Fix 1: WebSocket Connection

**Problem:**
```javascript
useEffect(() => {
  const ws = new WebSocket('wss://api.example.com');
  ws.onmessage = (event) => {
    setData(prev => [...prev, JSON.parse(event.data)]);
  };
  // NO CLEANUP! ❌
}, []);
```

**Solution:**
```javascript
useEffect(() => {
  const ws = new WebSocket('wss://api.example.com');
  ws.onmessage = (event) => {
    setData(prev => [...prev, JSON.parse(event.data)]);
  };

  // ✅ CLEANUP: Close WebSocket on unmount
  return () => {
    ws.close();
  };
}, []);
```

**Impact:** WebSocket properly closes when component unmounts. No more orphaned connections!

---

### Fix 2: Interval Timer

**Problem:**
```javascript
useEffect(() => {
  const interval = setInterval(() => {
    setTime(new Date());
  }, 1000);
  // NO CLEANUP! ❌
}, []);
```

**Solution:**
```javascript
useEffect(() => {
  const interval = setInterval(() => {
    setTime(new Date());
  }, 1000);

  // ✅ CLEANUP: Clear interval on unmount
  return () => {
    clearInterval(interval);
  };
}, []);
```

**Impact:** Interval stops running when component unmounts. No more CPU waste!

---

### Fix 3: Event Listener

**Problem:**
```javascript
useEffect(() => {
  const handleResize = () => {
    console.log('Window resized');
  };
  window.addEventListener('resize', handleResize);
  // NO CLEANUP! ❌
}, []);
```

**Solution:**
```javascript
useEffect(() => {
  const handleResize = () => {
    console.log('Window resized');
  };
  window.addEventListener('resize', handleResize);

  // ✅ CLEANUP: Remove event listener on unmount
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
```

**Impact:** Event listener properly removed. No more event listener accumulation!

---

### Fix 4: Subscription

**Problem:**
```javascript
useEffect(() => {
  const subscription = dataService.subscribe(newData => {
    setData(prev => [...prev, newData]);
  });
  // NO CLEANUP! ❌
}, []);
```

**Solution:**
```javascript
useEffect(() => {
  const subscription = dataService.subscribe(newData => {
    setData(prev => [...prev, newData]);
  });

  // ✅ CLEANUP: Unsubscribe on unmount
  return () => {
    subscription.unsubscribe();
  };
}, []);
```

**Impact:** Subscription properly ended. No more data flowing to unmounted component!

---

### Fix 5: Array Growth

**Problem:**
```javascript
useEffect(() => {
  const subscription = dataService.subscribe(newData => {
    setData(prev => [...prev, newData]); // Grows forever! ❌
  });

  return () => subscription.unsubscribe();
}, []);
```

**Solution:**
```javascript
useEffect(() => {
  const subscription = dataService.subscribe(newData => {
    setData(prev => {
      const updated = [...prev, newData];
      return updated.slice(-100); // ✅ Keep only last 100 items
    });
  });

  return () => subscription.unsubscribe();
}, []);
```

**Impact:** Array size capped at 100 items. No more unbounded growth!

---

## Memory Comparison

### Before Fixes

```
After 10 minutes:
- Memory usage: 500MB+
- Detached DOM nodes: 200+
- Event listeners: Growing (+10 per mount/unmount)
- Data array size: 600+ items (unlimited)
- WebSocket connections: Multiple orphaned connections
- Intervals running: 10+ (one per mount)

Browser behavior:
- Sluggish after 20 minutes
- Crashes after prolonged usage
- High CPU usage
```

### After Fixes

```
After 10 minutes:
- Memory usage: 65MB (stable)
- Detached DOM nodes: 0
- Event listeners: 1 (stable)
- Data array size: 100 items (capped)
- WebSocket connections: 1 (or 0 when unmounted)
- Intervals running: 1 (or 0 when unmounted)

Browser behavior:
- Smooth and responsive
- No crashes
- Normal CPU usage
```

**Memory improvement: 90% reduction! 🎉**

---

## Key Learnings

### Always Return Cleanup from useEffect

**Rule:** If useEffect creates a resource, return a cleanup function.

**Resources that need cleanup:**
- Timers (setTimeout, setInterval)
- Event listeners (addEventListener)
- WebSockets / Server-Sent Events
- Subscriptions (RxJS, etc.)
- Fetch requests (AbortController)
- Third-party libraries (charts, maps, etc.)

### Pattern for Cleanup

```javascript
useEffect(() => {
  // 1. Create resource
  const resource = createResource();

  // 2. Use resource
  resource.doSomething();

  // 3. Return cleanup function
  return () => {
    resource.cleanup();
  };
}, [dependencies]);
```

### Common Cleanup Examples

```javascript
// Timers
useEffect(() => {
  const timeout = setTimeout(() => {}, 1000);
  return () => clearTimeout(timeout);
}, []);

// Intervals
useEffect(() => {
  const interval = setInterval(() => {}, 1000);
  return () => clearInterval(interval);
}, []);

// Event Listeners
useEffect(() => {
  const handler = () => {};
  window.addEventListener('resize', handler);
  return () => window.removeEventListener('resize', handler);
}, []);

// Fetch with AbortController
useEffect(() => {
  const controller = new AbortController();
  fetch(url, { signal: controller.signal });
  return () => controller.abort();
}, [url]);

// Third-party libraries
useEffect(() => {
  const chart = new Chart(ref.current);
  return () => chart.destroy();
}, []);
```

---

## Detecting Memory Leaks

### Chrome DevTools Memory Profiler

**Step 1: Baseline**
- Memory tab → Heap snapshot → Take snapshot

**Step 2: Use App**
- Interact with app
- Mount/unmount components
- Let run for a few minutes

**Step 3: Force GC**
- Click trash can icon (garbage collection)

**Step 4: Compare**
- Take another snapshot
- Select "Comparison" view
- Look for:
  - Detached DOM nodes
  - Growing arrays/objects
  - Increasing event listeners

### Allocation Timeline

For real-time detection:

1. Memory tab → Allocation instrumentation on timeline
2. Start recording
3. Interact with app
4. Stop recording
5. Look for patterns:
   - ↗↘↗↘ = Healthy (allocate, free, allocate, free)
   - ↗↗↗↗ = Leak (only allocating, never freeing)

---

## Common Leak Patterns

### Pattern 1: Global Event Listeners

```javascript
// ❌ Leak
window.addEventListener('scroll', handleScroll);
document.addEventListener('click', handleClick);

// ✅ Fixed
useEffect(() => {
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

### Pattern 2: Timers

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

### Pattern 3: Subscriptions

```javascript
// ❌ Leak
const sub = observable.subscribe(handler);

// ✅ Fixed
useEffect(() => {
  const sub = observable.subscribe(handler);
  return () => sub.unsubscribe();
}, []);
```

### Pattern 4: Unbounded Arrays

```javascript
// ❌ Leak
setData(prev => [...prev, newItem]); // Grows forever

// ✅ Fixed
setData(prev => {
  const updated = [...prev, newItem];
  return updated.slice(-100); // Keep last 100
});
```

### Pattern 5: Third-Party Libraries

```javascript
// ❌ Leak
const chart = new Chart(canvas, config);

// ✅ Fixed
useEffect(() => {
  const chart = new Chart(canvas, config);
  return () => chart.destroy();
}, []);
```

---

## Testing Your Fixes

### Checklist

- [ ] Console logs show cleanup functions running
- [ ] Memory stable after 10 minutes
- [ ] No detached DOM nodes in heap snapshot
- [ ] Event listener count doesn't grow
- [ ] Data arrays have maximum size
- [ ] Mount/unmount 10+ times - no issues

### Manual Test

1. Open app with DevTools Memory tab
2. Take baseline snapshot
3. Navigate to leaky page
4. Wait 2 minutes
5. Navigate away and back (repeat 10 times)
6. Force garbage collection
7. Take second snapshot
8. Compare - should show minimal growth

### Automated Test

```javascript
describe('Dashboard memory leaks', () => {
  it('cleans up on unmount', () => {
    const { unmount } = render(<Dashboard />);

    // Verify resources created
    expect(mockInterval).toHaveBeenCalled();
    expect(mockEventListener).toHaveBeenCalled();

    // Unmount
    unmount();

    // Verify cleanup
    expect(mockClearInterval).toHaveBeenCalled();
    expect(mockRemoveEventListener).toHaveBeenCalled();
  });
});
```

---

## Production Monitoring

### Sentry Integration

```javascript
import * as Sentry from '@sentry/react';

// Monitor memory usage
setInterval(() => {
  if (performance.memory) {
    const { usedJSHeapSize } = performance.memory;
    const usageMB = (usedJSHeapSize / 1048576).toFixed(2);

    if (usageMB > 200) {
      Sentry.captureMessage(`High memory: ${usageMB}MB`, 'warning');
    }
  }
}, 60000); // Check every minute
```

### Performance Observer

```javascript
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.entryType === 'memory') {
      console.log('Memory:', entry.usedJSHeapSize);
    }
  }
});

observer.observe({ entryTypes: ['memory'] });
```

---

## Congratulations! 🎉

You've successfully:
- ✅ Detected memory leaks with Chrome DevTools
- ✅ Fixed all 5 types of memory leaks
- ✅ Reduced memory usage by 90%
- ✅ Learned patterns for preventing future leaks

Memory leaks are subtle but devastating. These skills are essential for building production-ready applications!

