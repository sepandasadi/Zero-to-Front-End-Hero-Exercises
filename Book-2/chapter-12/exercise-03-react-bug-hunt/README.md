# Exercise 03: React Bug Hunt

**Difficulty:** Intermediate
**Time Estimate:** 2-3 hours
**Focus:** React-specific debugging

---

## 🎯 Learning Objectives

After completing this exercise, you'll be able to:

- ✅ Debug infinite re-render loops
- ✅ Fix missing useEffect dependencies
- ✅ Identify and fix stale closures
- ✅ Fix memory leaks (event listeners, intervals, timers)
- ✅ Debug object/array identity issues
- ✅ Add proper cleanup functions
- ✅ Use React DevTools effectively
- ✅ Understand React's rendering behavior

---

## 📋 Your Task

You're given a React application with **10 intentional bugs** - all common React pitfalls that developers encounter. Find and fix each bug using React DevTools and debugger.

---

## 🐛 The 10 React Bugs

### **1. Infinite Re-render Loop**
**Component:** `Counter.jsx`
**Symptom:** Page freezes, "Maximum update depth exceeded" error
**Hint:** Check state updates in render

### **2. Missing useEffect Dependencies**
**Component:** `UserProfile.jsx`
**Symptom:** Data doesn't update when props change
**Hint:** ESLint warning about dependencies

### **3. Stale Closure**
**Component:** `Timer.jsx`
**Symptom:** Timer shows wrong count
**Hint:** Function captures old state value

### **4. Memory Leak - Event Listener**
**Component:** `WindowSize.jsx`
**Symptom:** Performance degrades, memory increases
**Hint:** Missing cleanup in useEffect

### **5. Memory Leak - setInterval**
**Component:** `Clock.jsx`
**Symptom:** Multiple intervals running
**Hint:** Interval not cleared on unmount

### **6. Object Identity Issue**
**Component:** `TodoList.jsx`
**Symptom:** Todos don't re-render when updated
**Hint:** Same object reference

### **7. Array Identity Issue**
**Component:** `ShoppingCart.jsx`
**Symptom:** Cart doesn't update
**Hint:** Mutating array directly

### **8. Missing Cleanup - Subscription**
**Component:** `LiveData.jsx`
**Symptom:** Component updates after unmount
**Hint:** Can't perform state update on unmounted component

### **9. Async setState Issue**
**Component:** `SearchBar.jsx`
**Symptom:** Search shows old results
**Hint:** setState is asynchronous

### **10. useCallback Dependency**
**Component:** `ExpensiveList.jsx`
**Symptom:** List re-renders unnecessarily
**Hint:** useCallback without proper dependencies

---

## 🔍 Part 1: Using React DevTools

### **Installation:**
- Install React DevTools extension
- Open DevTools → Components tab
- Open DevTools → Profiler tab

### **Features to Use:**

1. **Components Tab:**
   - Inspect component tree
   - View props and state
   - Edit props/state in real-time
   - See which component rendered
   - Highlight updates when components render

2. **Profiler Tab:**
   - Record component renders
   - See which components rendered
   - See why they rendered
   - Identify unnecessary renders
   - Measure render performance

### **Tasks:**
- Enable "Highlight updates when components render"
- Record a profiling session
- Find components that render too often
- Inspect props/state causing renders

---

## 🔍 Part 2: Debugging Infinite Loops

### **Common Causes:**

```jsx
// ❌ BAD: setState in render
function Counter() {
  const [count, setCount] = useState(0);
  setCount(count + 1);  // Infinite loop!
  return <div>{count}</div>;
}

// ❌ BAD: useEffect without dependencies
function Component() {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData([...data, 'new']);  // Infinite loop!
  });  // Missing dependency array
}

// ❌ BAD: Object created in dependency array
function Component({ userId }) {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetchData(userId);
  }, [{ userId }]);  // New object every render!
}
```

### **How to Debug:**
1. Open React DevTools
2. Enable "Highlight updates"
3. See component flashing continuously
4. Check render count in Profiler
5. Find what's causing re-render

---

## 🔍 Part 3: Fixing Memory Leaks

### **Common Memory Leaks:**

```jsx
// ❌ Leak: Event listener not removed
useEffect(() => {
  window.addEventListener('resize', handleResize);
  // Missing cleanup!
}, []);

// ✅ Fixed: Cleanup function
useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

// ❌ Leak: Interval not cleared
useEffect(() => {
  const interval = setInterval(() => {
    setCount(c => c + 1);
  }, 1000);
  // Missing cleanup!
}, []);

// ✅ Fixed: Clear interval
useEffect(() => {
  const interval = setInterval(() => {
    setCount(c => c + 1);
  }, 1000);
  return () => clearInterval(interval);
}, []);

// ❌ Leak: Subscription not unsubscribed
useEffect(() => {
  const subscription = api.subscribe(handleData);
  // Missing cleanup!
}, []);

// ✅ Fixed: Unsubscribe
useEffect(() => {
  const subscription = api.subscribe(handleData);
  return () => subscription.unsubscribe();
}, []);
```

### **How to Detect:**
1. Open Chrome DevTools → Memory tab
2. Take heap snapshot
3. Interact with app
4. Take another snapshot
5. Compare: memory should not grow continuously

---

## 🔍 Part 4: Stale Closures

### **The Problem:**

```jsx
// ❌ Stale closure
function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 1);  // 'count' is stale!
    }, 1000);
    return () => clearInterval(interval);
  }, []);  // Empty deps: count never updates

  return <div>{count}</div>;  // Always shows 1
}

// ✅ Fixed: Use functional update
function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(c => c + 1);  // Use latest value
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <div>{count}</div>;  // Counts correctly
}
```

### **How to Debug:**
1. Add `console.log(count)` inside interval
2. See it logs same value repeatedly
3. Use functional setState to fix

---

## 🔍 Part 5: Object/Array Identity

### **The Problem:**

```jsx
// ❌ Object identity issue
function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    todos.push({ id: Date.now(), text });  // Mutating!
    setTodos(todos);  // Same reference
  };
}

// ✅ Fixed: Create new array
function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text }]);  // New array
  };
}

// ❌ Object mutation
const updateUser = () => {
  user.name = 'New Name';  // Mutating!
  setUser(user);  // Same reference
};

// ✅ Fixed: Create new object
const updateUser = () => {
  setUser({ ...user, name: 'New Name' });  // New object
};
```

---

## 📝 Deliverables

### **1. Bug Report**
Create `BUG_REPORT.md` documenting each bug:
```markdown
## Bug 1: Infinite Re-render Loop

**Component:** Counter.jsx

**Symptoms:**
- Page freezes
- Error: "Maximum update depth exceeded"
- React DevTools shows constant re-renders

**Root Cause:**
setState called during render phase

**Code:**
```jsx
// Before (buggy)
function Counter() {
  const [count, setCount] = useState(0);
  setCount(count + 1);  // ❌ During render!
}

// After (fixed)
function Counter() {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);  // ✅ In event handler
}
```

**How I Found It:**
1. Enabled "Highlight updates" in React DevTools
2. Saw Counter flashing continuously
3. Checked Profiler: 1000+ renders per second
4. Found setState in render

**Screenshot:** [React DevTools showing constant renders]
```

### **2. React DevTools Guide**
Create `REACT_DEVTOOLS_GUIDE.md` documenting:
- How you used Components tab
- How you used Profiler tab
- Screenshots of each
- Tips you learned

### **3. Memory Leak Analysis**
Create `MEMORY_LEAK_ANALYSIS.md` documenting:
- Heap snapshots taken
- Memory growth observed
- Leaks found and fixed
- Verification that memory is now stable

### **4. Lessons Learned**
Create `LESSONS_LEARNED.md` documenting:
- Common React mistakes
- How to avoid each bug
- Tools that helped
- Best practices learned

---

## ✅ Acceptance Criteria

- [ ] Fixed all 10 bugs
- [ ] Used React DevTools
- [ ] Used Chrome DevTools Profiler
- [ ] Documented each bug
- [ ] Included screenshots
- [ ] Explained root cause
- [ ] Verified fixes work
- [ ] No memory leaks
- [ ] No console errors
- [ ] App works correctly

---

## 💡 Tips

1. **Use React DevTools**
   - Install the extension
   - Enable "Highlight updates"
   - Use Profiler to find unnecessary renders

2. **Check Dependencies**
   - ESLint will warn about missing deps
   - Don't ignore the warning
   - Add missing dependencies or use functional updates

3. **Always Cleanup**
   - Return cleanup from useEffect
   - Clear intervals, timeouts
   - Remove event listeners
   - Unsubscribe from subscriptions

4. **Don't Mutate State**
   - Use spread operator for arrays
   - Use spread operator for objects
   - Create new references

5. **Use Functional Updates**
   - When setState depends on previous state
   - In closures (intervals, timeouts)
   - In event handlers that might be stale

---

## 🎓 Learning Resources

- [React DevTools](https://react.dev/learn/react-developer-tools)
- [Common Bugs](https://react.dev/learn/you-might-not-need-an-effect)
- [Memory Leaks](https://react.dev/learn/synchronizing-with-effects#cleanup)

---

## 🚀 Next Steps

After fixing all React bugs:
1. Review patterns that cause each bug
2. Apply learnings to your projects
3. Create a React debugging checklist
4. Move to Exercise 04: Network Debugging

---

**Remember:** Most React bugs come from misunderstanding the component lifecycle, state updates, and closures. Master these concepts! ⚛️🐛


