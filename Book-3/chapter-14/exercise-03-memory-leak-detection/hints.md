# Hints - Exercise 3: Memory Leak Detection & Fix

## Stuck Finding or Fixing Leaks? Try These Hints!

### Hint 1: Taking Heap Snapshots

**Question:** How do I take a heap snapshot?

**Answer:**
1. Open Chrome DevTools (F12 or Cmd+Option+I on Mac)
2. Click **Memory** tab
3. Select **Heap snapshot** radio button
4. Click **Take snapshot** button
5. Name it (e.g., "Baseline", "After Leaks")

**Tip:** Always take baseline BEFORE navigating to leaky component!

---

### Hint 2: Comparing Snapshots

**Question:** How do I compare two snapshots?

**Answer:**
1. Take two snapshots (baseline and after)
2. Click on the second snapshot
3. In dropdown (top-left, says "Summary"), select **Comparison**
4. Choose baseline snapshot to compare against

**Look for:**
- `+` in red = New objects (memory leak!)
- Large deltas in Size column
- "Detached" DOM nodes
- Growing arrays/objects

---

### Hint 3: Force Garbage Collection

**Question:** How do I force garbage collection?

**Answer:**
1. In Memory tab, look for trash can icon (🗑️)
2. Click it to trigger garbage collection
3. Wait a moment
4. Take snapshot after GC

**Why:** This clears temporary objects, so you only see real leaks!

---

### Hint 4: Identifying the 5 Leaks

**Checklist - Find these in Dashboard.jsx:**

1. **WebSocket leak:**
   ```javascript
   useEffect(() => {
     const ws = ...;
     // Where's the cleanup? ❌
   }, []);
   ```

2. **Interval leak:**
   ```javascript
   useEffect(() => {
     const interval = setInterval(...);
     // Where's the cleanup? ❌
   }, []);
   ```

3. **Event listener leak:**
   ```javascript
   useEffect(() => {
     window.addEventListener('resize', ...);
     // Where's the cleanup? ❌
   }, []);
   ```

4. **Subscription leak:**
   ```javascript
   useEffect(() => {
     const subscription = dataService.subscribe(...);
     // Where's the cleanup? ❌
   }, []);
   ```

5. **Array growth leak:**
   ```javascript
   setData(prev => [...prev, newData]); // Grows forever! ❌
   ```

---

### Hint 5: Fixing WebSocket Leak

**Problem:**
```javascript
useEffect(() => {
  const ws = new WebSocket('...');
  ws.onmessage = handleMessage;
  // ❌ NO CLEANUP!
}, []);
```

**Solution:**
```javascript
useEffect(() => {
  const ws = new WebSocket('...');
  ws.onmessage = handleMessage;

  // ✅ Return cleanup function
  return () => {
    ws.close();
    console.log('WebSocket closed');
  };
}, []);
```

---

### Hint 6: Fixing Interval Leak

**Problem:**
```javascript
useEffect(() => {
  const interval = setInterval(() => {
    setTime(new Date());
  }, 1000);
  // ❌ NO CLEANUP!
}, []);
```

**Solution:**
```javascript
useEffect(() => {
  const interval = setInterval(() => {
    setTime(new Date());
  }, 1000);

  // ✅ Return cleanup function
  return () => {
    clearInterval(interval);
    console.log('Interval cleared');
  };
}, []);
```

---

### Hint 7: Fixing Event Listener Leak

**Problem:**
```javascript
useEffect(() => {
  const handleResize = () => { /* ... */ };
  window.addEventListener('resize', handleResize);
  // ❌ NO CLEANUP!
}, []);
```

**Solution:**
```javascript
useEffect(() => {
  const handleResize = () => { /* ... */ };
  window.addEventListener('resize', handleResize);

  // ✅ Return cleanup function
  return () => {
    window.removeEventListener('resize', handleResize);
    console.log('Event listener removed');
  };
}, []);
```

**Important:** Must remove the SAME function reference!

---

### Hint 8: Fixing Subscription Leak

**Problem:**
```javascript
useEffect(() => {
  const subscription = dataService.subscribe(newData => {
    setData(prev => [...prev, newData]);
  });
  // ❌ NO CLEANUP!
}, []);
```

**Solution:**
```javascript
useEffect(() => {
  const subscription = dataService.subscribe(newData => {
    setData(prev => [...prev, newData]);
  });

  // ✅ Return cleanup function
  return () => {
    subscription.unsubscribe();
    console.log('Unsubscribed');
  };
}, []);
```

---

### Hint 9: Fixing Array Growth Leak

**Problem:**
```javascript
setData(prev => [...prev, newData]); // Grows forever!
```

After 10 minutes with 1 update/second = 600+ items in memory!

**Solution:**
```javascript
setData(prev => {
  const updated = [...prev, newData];
  return updated.slice(-100); // ✅ Keep only last 100 items
});
```

**Apply this to BOTH:**
- `wsData` state
- `data` state

---

### Hint 10: useEffect Cleanup Pattern

**General pattern for ALL useEffects:**

```javascript
useEffect(() => {
  // 1. Create resource
  const resource = createSomething();

  // 2. Use resource
  resource.doSomething();

  // 3. ALWAYS return cleanup function
  return () => {
    resource.cleanup();
    console.log('Cleaned up!');
  };
}, [dependencies]);
```

**Resources that need cleanup:**
- Timers (setTimeout, setInterval)
- Event listeners (addEventListener)
- Subscriptions (observables)
- WebSockets / SSE
- Third-party libraries (charts, maps)
- Fetch requests (AbortController)

---

### Hint 11: Testing Your Fixes

**Quick test - check console logs:**

1. Navigate to Dashboard
2. Watch console - should log "subscribed", "attached", etc.
3. Navigate away (back to Home)
4. **Console should log cleanup messages:**
   - "WebSocket closed"
   - "Interval cleared"
   - "Event listener removed"
   - "Unsubscribed"

If cleanup logs don't appear, cleanup isn't running!

---

### Hint 12: Memory Profiler Detective Work

**In heap snapshot comparison, search for:**

1. **"Detached"** - finds detached DOM nodes
   - Should be 0 after fixes!

2. **"EventListener"** - shows event listeners
   - Count should be stable (not growing)

3. **"Array"** - shows all arrays
   - Look for growing size deltas

4. **"setInterval"** - finds active intervals
   - Should only be ones from current mount

---

### Hint 13: Common Mistakes

**❌ Mistake 1: Forgetting return**
```javascript
useEffect(() => {
  const interval = setInterval(...);
  clearInterval(interval); // ❌ This runs immediately!
}, []);
```

**✅ Correct:**
```javascript
useEffect(() => {
  const interval = setInterval(...);
  return () => clearInterval(interval); // ✅ Runs on unmount
}, []);
```

**❌ Mistake 2: Wrong function reference**
```javascript
window.addEventListener('resize', () => handleResize());
return () => window.removeEventListener('resize', () => handleResize());
// ❌ Different function! Won't be removed!
```

**✅ Correct:**
```javascript
const handleResize = () => { /* ... */ };
window.addEventListener('resize', handleResize);
return () => window.removeEventListener('resize', handleResize);
// ✅ Same function reference
```

---

### Hint 14: Verification Checklist

After implementing all fixes, verify:

**Console Test:**
- [ ] Cleanup logs appear when navigating away
- [ ] No error messages
- [ ] Subscriber count goes down when unmounting

**Memory Test:**
- [ ] Take baseline snapshot
- [ ] Mount/unmount Dashboard 10 times
- [ ] Force GC
- [ ] Take second snapshot
- [ ] Compare: Should show minimal growth (<20MB)

**Visual Test:**
- [ ] Data arrays stay capped at 100 items
- [ ] Time updates (interval working)
- [ ] Window resize still tracked
- [ ] All features work correctly

---

### Hint 15: Debugging with Performance Tab

If you want to see memory over time:

1. DevTools → **Performance** tab
2. Check **Memory** checkbox
3. Click **Record**
4. Interact with app (mount/unmount several times)
5. Click **Stop**
6. Look at memory graph:
   - Should level off (not keep growing)
   - Should drop when forcing GC

---

### Hint 16: Understanding Detached DOM Nodes

**What are they?**
- DOM elements removed from page but still in memory
- Usually held by JavaScript references

**Common cause:**
```javascript
useEffect(() => {
  const element = document.createElement('div');
  document.body.appendChild(element);
  // ❌ Element not removed on unmount!
}, []);
```

**Fix:**
```javascript
useEffect(() => {
  const element = document.createElement('div');
  document.body.appendChild(element);

  return () => {
    document.body.removeChild(element); // ✅ Cleanup
  };
}, []);
```

---

### Hint 17: Real-World Examples

**setTimeout cleanup:**
```javascript
useEffect(() => {
  const timeout = setTimeout(() => {
    doSomething();
  }, 5000);

  return () => clearTimeout(timeout);
}, []);
```

**Fetch with AbortController:**
```javascript
useEffect(() => {
  const controller = new AbortController();

  fetch('/api/data', { signal: controller.signal })
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => {
      if (err.name === 'AbortError') return; // Expected
      console.error(err);
    });

  return () => controller.abort();
}, []);
```

**Third-party chart:**
```javascript
useEffect(() => {
  const chart = new Chart(canvasRef.current, config);
  return () => chart.destroy();
}, []);
```

---

### Still Stuck?

**Checklist:**

1. **Did you return a function from useEffect?**
   ```javascript
   return () => { /* cleanup */ };
   ```

2. **Are cleanup functions being called?**
   - Add console.log to verify

3. **Are arrays growing indefinitely?**
   - Use `.slice(-100)` to cap size

4. **Did you test by mounting/unmounting?**
   - Navigate away and back multiple times

5. **Check the solution folder!**
   - Compare your code with the fixed version

---

**Remember:** Every resource created in useEffect should be cleaned up in the return function!

Good luck fixing those leaks! 🐛🔧

