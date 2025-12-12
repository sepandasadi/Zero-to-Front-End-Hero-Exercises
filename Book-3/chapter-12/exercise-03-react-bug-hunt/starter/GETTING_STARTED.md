# Getting Started - React Bug Hunt

## 🎯 Your Mission

Find and fix **10 common React bugs** in this application using React DevTools and debugger.

**Time Estimate:** 2-3 hours
**Difficulty:** Intermediate

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

### **4. Install React DevTools**
- Chrome: [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- Firefox: Search for "React Developer Tools" in Firefox Add-ons

---

## 🐛 The 10 React Bugs

| # | Component | Bug Type | Symptom |
|---|-----------|----------|---------|
| 1 | Counter | Infinite re-render | Page freezes, "Maximum update depth exceeded" |
| 2 | UserProfile | Missing dependency | Data doesn't update when userId changes |
| 3 | Timer | Stale closure | Timer always shows 1 |
| 4 | WindowSize | Memory leak | Performance degrades over time |
| 5 | Clock | Memory leak | Multiple intervals running |
| 6 | TodoList | Object identity | Todos don't re-render |
| 7 | ShoppingCart | Array mutation | Cart doesn't update |
| 8 | LiveData | Unmounted update | Warning in console |
| 9 | SearchBar | Async state | Shows old search results |
| 10 | ExpensiveList | Unnecessary renders | List re-renders on every keystroke |

---

## 🔍 Debugging Steps

### **Enable React DevTools Highlights:**
1. Open React DevTools
2. Click ⚙️ (Settings)
3. Check "Highlight updates when components render"
4. Components flash when they render

### **For Each Bug:**

#### **Step 1: Identify**
- Navigate to the buggy component
- Observe the symptoms
- Check console for errors/warnings

#### **Step 2: Use React DevTools**
- Components tab: Inspect props, state, hooks
- Profiler tab: Record interactions, see what rendered
- Check "Why did this render?"

#### **Step 3: Set Breakpoints**
- Open Sources tab
- Find component file
- Set breakpoints in useEffect, useState, event handlers

#### **Step 4: Analyze**
- Watch state values
- Check effect dependencies
- Verify cleanup functions

#### **Step 5: Fix**
- Apply the fix
- Test thoroughly
- Verify no console warnings

#### **Step 6: Document**
- Explain what was wrong
- Show before/after code
- Screenshot React DevTools

---

## 📝 Required Documentation

Create `BUG_REPORT.md` with this format for EACH bug:

```markdown
## Bug #1: Infinite Re-render Loop

**Component:** Counter.jsx

**Symptoms:**
- Page freezes immediately
- Error: "Maximum update depth exceeded"
- React DevTools shows thousands of renders

**How I Found It:**
1. Opened React DevTools
2. Enabled "Highlight updates"
3. Saw Counter component flashing continuously
4. Checked Profiler: 1000+ renders per second

**Root Cause:**
setState called during render phase, causing infinite loop

**Code Before:**
```jsx
function Counter() {
  const [count, setCount] = useState(0);
  setCount(count + 1);  // ❌ Called during render!
  return <div>{count}</div>;
}
```

**Code After:**
```jsx
function Counter() {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);  // ✅ In event handler
  return <button onClick={increment}>{count}</button>;
}
```

**React DevTools Screenshot:**
[Insert screenshot showing render count]

**What I Learned:**
Never call setState during render. Only in:
- Event handlers
- useEffect
- Callbacks
```

---

## ✅ Completion Checklist

### **React DevTools:**
- [ ] Installed React DevTools extension
- [ ] Used Components tab to inspect props/state
- [ ] Used Profiler to record interactions
- [ ] Enabled "Highlight updates"
- [ ] Checked "Why did this render?"

### **Bugs Fixed:**
- [ ] Bug 1: Infinite re-render (setState in render)
- [ ] Bug 2: Missing dependencies (useEffect)
- [ ] Bug 3: Stale closure (captured old state)
- [ ] Bug 4: Event listener leak (no cleanup)
- [ ] Bug 5: Interval leak (setInterval not cleared)
- [ ] Bug 6: Object identity (same reference)
- [ ] Bug 7: Array mutation (mutating state)
- [ ] Bug 8: Unmounted update (setState after unmount)
- [ ] Bug 9: Async setState (race condition)
- [ ] Bug 10: useCallback deps (unnecessary renders)

### **Documentation:**
- [ ] Created BUG_REPORT.md
- [ ] Documented all 10 bugs
- [ ] Included React DevTools screenshots
- [ ] Explained root cause
- [ ] Showed before/after code

---

## 💡 Pro Tips

### **Common React Patterns:**

**Functional setState:**
```jsx
// ❌ Might be stale
setCount(count + 1);

// ✅ Always current
setCount(c => c + 1);
```

**Proper useEffect:**
```jsx
// ❌ Missing dependency
useEffect(() => {
  fetchUser(userId);
}, []);

// ✅ All dependencies listed
useEffect(() => {
  fetchUser(userId);
}, [userId]);
```

**Cleanup:**
```jsx
// ✅ Always cleanup!
useEffect(() => {
  const id = setInterval(() => {}, 1000);
  return () => clearInterval(id);
}, []);
```

**Immutable Updates:**
```jsx
// ❌ Mutation
items.push(newItem);
setItems(items);

// ✅ Immutable
setItems([...items, newItem]);
```

---

## 🎯 Success Criteria

You've mastered React debugging when you:
- ✅ Can identify infinite loops
- ✅ Know how to fix stale closures
- ✅ Always add cleanup functions
- ✅ Never mutate state directly
- ✅ Use React DevTools effectively
- ✅ Understand React rendering

---

**Time Estimate:** 2-3 hours
**Next:** Exercise 04 - Network Debugging

**Master React debugging and you'll save hours of frustration!** ⚛️🐛


