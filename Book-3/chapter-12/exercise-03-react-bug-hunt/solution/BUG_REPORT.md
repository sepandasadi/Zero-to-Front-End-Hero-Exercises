# React Bug Hunt - Bug Report

## Exercise 03: All 10 React Bugs Fixed

**Date:** [Current Date]
**Status:** All bugs resolved ✅

---

## Bug #1: Infinite Re-render Loop (Counter.jsx)

### Symptom
Page freezes, browser becomes unresponsive, error: "Maximum update depth exceeded"

### Buggy Code
```jsx
function Counter() {
  const [count, setCount] = useState(0);
  setCount(count + 1);  // ❌ setState during render!
  return <div>{count}</div>;
}
```

### Root Cause
`setState` called during render phase causes immediate re-render, which calls `setState` again, creating infinite loop.

### Fix
```jsx
function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);  // ✅ In event handler

  return (
    <div>
      <p>{count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
```

### How to Detect
- React DevTools "Highlight updates" shows constant flashing
- Profiler shows thousands of renders per second
- Browser tab freezes

---

## Bug #2: Missing useEffect Dependencies (UserProfile.jsx)

### Symptom
Component doesn't update when props change, stale data displayed

### Buggy Code
```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, []);  // ❌ Missing userId dependency

  return <div>{user?.name}</div>;
}
```

### Root Cause
Empty dependency array `[]` means effect only runs once on mount. When `userId` prop changes, effect doesn't re-run.

### Fix
```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);  // ✅ Include userId dependency

  return <div>{user?.name}</div>;
}
```

### How to Detect
- ESLint warning: "React Hook useEffect has a missing dependency"
- React DevTools shows component not re-rendering when props change
- Manual testing: change prop, component doesn't update

---

## Bug #3: Stale Closure (Timer.jsx)

### Symptom
Timer increments once then stops, always shows 1

### Buggy Code
```jsx
function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 1);  // ❌ Closure captures initial count (0)
    }, 1000);
    return () => clearInterval(interval);
  }, []);  // Empty deps = count never updates in closure

  return <div>{count}</div>;
}
```

### Root Cause
Closure captures `count` value at time of creation (0). With empty deps, closure never updates, so always does `0 + 1`.

### Fix
```jsx
function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(c => c + 1);  // ✅ Functional update uses latest value
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <div>{count}</div>;
}
```

### How to Detect
- Count stops incrementing after first tick
- Console.log inside interval shows same value repeatedly
- React DevTools shows state not updating

---

## Bug #4: Memory Leak - Event Listener (WindowSize.jsx)

### Symptom
Performance degrades over time, memory usage increases

### Buggy Code
```jsx
function WindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    // ❌ Missing cleanup!
  }, []);

  return <div>{size.width} x {size.height}</div>;
}
```

### Root Cause
Event listener added but never removed. When component unmounts, listener persists, still trying to update unmounted component.

### Fix
```jsx
function WindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);  // ✅ Cleanup
  }, []);

  return <div>{size.width} x {size.height}</div>;
}
```

### How to Detect
- Chrome DevTools → Memory → Take heap snapshot
- Mount/unmount component multiple times
- Detached DOM nodes increase
- Event listeners count increases

---

## Bug #5: Memory Leak - setInterval (Clock.jsx)

### Symptom
Multiple intervals running, time updates too fast

### Buggy Code
```jsx
function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 1000);
    // ❌ Interval not cleared!
  }, []);

  return <div>{time.toLocaleTimeString()}</div>;
}
```

### Root Cause
Each time component re-mounts, new interval starts but old ones never stop. Multiple intervals updating state.

### Fix
```jsx
function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);  // ✅ Clear interval
  }, []);

  return <div>{time.toLocaleTimeString()}</div>;
}
```

### How to Detect
- Time updates faster than expected
- Console.log in interval shows multiple logs per second
- React StrictMode shows warning

---

## Bug #6: Object Identity Issue (TodoList.jsx)

### Symptom
Todos don't re-render when updated

### Buggy Code
```jsx
function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    const newTodo = { id: Date.now(), text };
    todos.push(newTodo);  // ❌ Mutating array!
    setTodos(todos);  // ❌ Same reference!
  };

  return <ul>{todos.map(t => <li key={t.id}>{t.text}</li>)}</ul>;
}
```

### Root Cause
React uses shallow comparison. `todos` array reference is same before and after `.push()`, so React thinks nothing changed.

### Fix
```jsx
function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    const newTodo = { id: Date.now(), text };
    setTodos([...todos, newTodo]);  // ✅ New array reference
  };

  return <ul>{todos.map(t => <li key={t.id}>{t.text}</li>)}</ul>;
}
```

### How to Detect
- Component doesn't re-render after setState
- React DevTools shows state changing but UI not updating
- console.log shows array has new item but UI doesn't

---

## Bug #7: Array Mutation (ShoppingCart.jsx)

### Symptom
Cart doesn't update when items added/removed

### Buggy Code
```jsx
function ShoppingCart() {
  const [items, setItems] = useState([]);

  const addItem = (item) => {
    items.push(item);  // ❌ Direct mutation!
    setItems(items);  // ❌ Same reference!
  };

  const removeItem = (id) => {
    const index = items.findIndex(i => i.id === id);
    items.splice(index, 1);  // ❌ Mutates array!
    setItems(items);
  };
}
```

### Root Cause
Same as Bug #6: mutating array doesn't create new reference.

### Fix
```jsx
function ShoppingCart() {
  const [items, setItems] = useState([]);

  const addItem = (item) => {
    setItems([...items, item]);  // ✅ New array
  };

  const removeItem = (id) => {
    setItems(items.filter(i => i.id !== id));  // ✅ New array
  };
}
```

### How to Detect
- Same as Bug #6
- React DevTools shows state not triggering render

---

## Bug #8: Missing Cleanup - Subscription (LiveData.jsx)

### Symptom
Warning: "Can't perform React state update on unmounted component"

### Buggy Code
```jsx
function LiveData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const subscription = dataStream.subscribe(data => {
      setData(data);  // ❌ Continues after unmount!
    });
    // Missing: cleanup!
  }, []);
}
```

### Root Cause
Subscription continues pushing data after component unmounts, trying to call `setData` on unmounted component.

### Fix
```jsx
function LiveData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const subscription = dataStream.subscribe(data => {
      setData(data);
    });
    return () => subscription.unsubscribe();  // ✅ Cleanup
  }, []);
}
```

### How to Detect
- Console warning about setState on unmounted component
- Memory leaks
- Unexpected state updates

---

## Bug #9: Async setState Issue (SearchBar.jsx)

### Symptom
Search shows old results, race condition

### Buggy Code
```jsx
function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    searchAPI(query).then(data => {
      setResults(data);  // ❌ Old query may resolve after new one!
    });
  }, [query]);
}
```

### Root Cause
If user types "a" then "ab" quickly, "ab" request may finish before "a" request, showing wrong results.

### Fix
```jsx
function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    let cancelled = false;

    searchAPI(query).then(data => {
      if (!cancelled) {  // ✅ Only update if not cancelled
        setResults(data);
      }
    });

    return () => { cancelled = true; };  // ✅ Cancel on cleanup
  }, [query]);
}
```

### How to Detect
- Fast typing shows wrong results
- Network tab shows requests finishing out of order
- Add delays to API to make race condition obvious

---

## Bug #10: useCallback Dependency (ExpensiveList.jsx)

### Symptom
List re-renders unnecessarily, performance issue

### Buggy Code
```jsx
function ExpensiveList({ items }) {
  const [filter, setFilter] = useState('');

  const handleClick = useCallback((id) => {
    console.log('Clicked:', id, filter);
  }, []);  // ❌ Missing filter dependency!

  return items.map(item => (
    <ExpensiveItem key={item.id} onClick={() => handleClick(item.id)} />
  ));
}
```

### Root Cause
`useCallback` without proper dependencies captures stale `filter` value, causing bugs.

### Fix
```jsx
function ExpensiveList({ items }) {
  const [filter, setFilter] = useState('');

  const handleClick = useCallback((id) => {
    console.log('Clicked:', id, filter);
  }, [filter]);  // ✅ Include filter

  return items.map(item => (
    <ExpensiveItem key={item.id} onClick={() => handleClick(item.id)} />
  ));
}
```

### How to Detect
- ESLint warning
- Stale values in callback
- React DevTools Profiler shows unnecessary renders

---

## Summary

| Bug | Issue | Fix |
|-----|-------|-----|
| #1 | Infinite loop | Move setState to event handler |
| #2 | Missing deps | Add all dependencies to useEffect |
| #3 | Stale closure | Use functional setState |
| #4 | Event leak | Return cleanup from useEffect |
| #5 | Interval leak | clearInterval in cleanup |
| #6 | Object identity | Create new object reference |
| #7 | Array mutation | Use immutable array methods |
| #8 | Subscription leak | Unsubscribe in cleanup |
| #9 | Race condition | Cancel async in cleanup |
| #10 | Missing callback deps | Include all dependencies |

**All bugs fixed! Application now works correctly with no memory leaks, no unnecessary renders, and no stale data.**


