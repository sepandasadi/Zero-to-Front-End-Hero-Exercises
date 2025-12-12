# Exercise 03: React Bug Hunt - Hints

## 💡 Quick Reference for Common React Bugs

---

## 🔍 Bug 1: Infinite Re-render Loop

<details>
<summary>Click to reveal</summary>

**Problem:**
```jsx
function Counter() {
  const [count, setCount] = useState(0);
  setCount(count + 1);  // ❌ Causes infinite loop
  return <div>{count}</div>;
}
```

**Why It Breaks:**
- setState during render causes re-render
- Re-render calls setState again
- Infinite loop!

**Fix:**
```jsx
function Counter() {
  const [count, setCount] = useState(0);
  // ✅ Only update in event handler
  const increment = () => setCount(count + 1);
  return <button onClick={increment}>{count}</button>;
}
```

</details>

---

## 🔍 Bug 2: Missing useEffect Dependencies

<details>
<summary>Click to reveal</summary>

**Problem:**
```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, []);  // ❌ Missing userId dependency
}
```

**Why It Breaks:**
- Effect runs once on mount
- When userId changes, effect doesn't re-run
- Shows stale data

**Fix:**
```jsx
useEffect(() => {
  fetchUser(userId).then(setUser);
}, [userId]);  // ✅ Re-run when userId changes
```

</details>

---

## 🔍 Bug 3: Stale Closure

<details>
<summary>Click to reveal</summary>

**Problem:**
```jsx
function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 1);  // ❌ 'count' is always 0
    }, 1000);
    return () => clearInterval(interval);
  }, []);
}
```

**Why It Breaks:**
- `count` captured when effect runs
- Interval always sees initial value (0)
- Never increments past 1

**Fix:**
```jsx
useEffect(() => {
  const interval = setInterval(() => {
    setCount(c => c + 1);  // ✅ Use functional update
  }, 1000);
  return () => clearInterval(interval);
}, []);
```

</details>

---

## 🔍 Bug 4-5: Memory Leaks

<details>
<summary>Click to reveal</summary>

**Event Listener Leak:**
```jsx
// ❌ Leak
useEffect(() => {
  window.addEventListener('resize', handleResize);
}, []);

// ✅ Fixed
useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

**Interval Leak:**
```jsx
// ❌ Leak
useEffect(() => {
  setInterval(() => setTime(new Date()), 1000);
}, []);

// ✅ Fixed
useEffect(() => {
  const id = setInterval(() => setTime(new Date()), 1000);
  return () => clearInterval(id);
}, []);
```

</details>

---

## 🔍 Bug 6-7: Object/Array Identity

<details>
<summary>Click to reveal</summary>

**Array Mutation:**
```jsx
// ❌ Wrong
const addTodo = (text) => {
  todos.push({ text });
  setTodos(todos);  // Same reference!
};

// ✅ Correct
const addTodo = (text) => {
  setTodos([...todos, { text }]);  // New array
};
```

**Object Mutation:**
```jsx
// ❌ Wrong
user.name = 'New Name';
setUser(user);  // Same reference!

// ✅ Correct
setUser({ ...user, name: 'New Name' });  // New object
```

</details>

---

## 🔍 React DevTools Usage

<details>
<summary>Click to reveal</summary>

**Enable Highlight Updates:**
1. Open React DevTools
2. Click gear icon (settings)
3. Check "Highlight updates when components render"
4. See flashing rectangles when components render

**Using Profiler:**
1. Click "Profiler" tab
2. Click record button (circle)
3. Interact with app
4. Click stop
5. See which components rendered and why

**Inspecting Components:**
1. Click "Components" tab
2. Select component in tree
3. See props, state, hooks on right
4. Edit values to test

</details>

---

## 💡 Quick Fixes Cheat Sheet

| Bug Type | Quick Fix |
|----------|-----------|
| Infinite loop | Move setState to event handler |
| Missing deps | Add to dependency array |
| Stale closure | Use functional setState |
| Event leak | Return cleanup function |
| Interval leak | Clear interval in cleanup |
| Array mutation | Use spread operator |
| Object mutation | Use spread operator |
| Subscription leak | Unsubscribe in cleanup |

---

**Remember:** Most React bugs are about understanding when things run and what they capture! 🐛→✅


