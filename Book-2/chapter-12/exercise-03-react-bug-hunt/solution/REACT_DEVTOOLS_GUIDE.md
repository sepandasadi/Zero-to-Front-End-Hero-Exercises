# React DevTools Guide

## How I Used React DevTools to Find Bugs

---

## Installation

1. Install React DevTools browser extension
2. Open app in development mode
3. DevTools → Components tab / Profiler tab appear

---

## Components Tab

### Finding Bug #1 (Infinite Loop)

**Enable "Highlight updates when components render":**
- ⚙️ Settings → Highlight updates
- Counter component flashes constantly
- Indicates infinite re-render

**Component tree shows:**
```
App
  └── Counter [flashing rapidly]
```

**Props & State:**
- State updates thousands of times per second
- Confirms render loop

---

### Finding Bug #2 (Missing Dependencies)

**Inspect UserProfile component:**
- Props show `userId: 123`
- Change to `userId: 456`
- Component doesn't re-render
- State still shows old user

**How to test:**
1. Select component in tree
2. Edit props in right panel
3. Watch for re-render
4. No update = missing dependency

---

### Finding Bug #6 (Object Identity)

**Watch state updates:**
1. Click "Add Todo"
2. State panel shows array updated
3. But component doesn't flash (no render)
4. Indicates same reference

**Verification:**
```javascript
// In console while paused
$r.state.todos === $r.state.todos  // Same ref = no render
```

---

## Profiler Tab

### Finding Unnecessary Renders (Bug #10)

**Record session:**
1. Click Record
2. Interact with app
3. Stop recording
4. Analyze flamegraph

**Findings:**
- ExpensiveList renders on every keystroke
- Should be memoized
- Profiler shows "why did this render?"
- Answer: "Props changed" (but shouldn't have)

**Flamegraph colors:**
- Yellow/Red: Slow renders
- Green: Fast renders
- Gray: Didn't render

---

### Finding Bug #3 (Stale Closure)

**Profiler shows:**
- Timer component renders once
- State never updates again
- No subsequent renders

**Investigation:**
1. Select Timer in Components tab
2. Watch state value
3. See it stuck at 1
4. Check useEffect deps
5. Find empty array causing stale closure

---

## Memory Profiling (Bugs #4, #5, #8)

### Finding Event Listener Leak (Bug #4)

**Steps:**
1. Chrome DevTools → Memory tab
2. Take heap snapshot
3. Mount WindowSize component
4. Unmount component
5. Take another snapshot
6. Compare snapshots
7. Look for "Detached" event listeners

**Evidence:**
- Listeners count increases with each mount
- Memory doesn't get freed
- Indicates missing cleanup

---

### Finding Interval Leak (Bug #5)

**Steps:**
1. Take heap snapshot
2. Mount Clock component 10 times
3. Take another snapshot
4. Compare
5. Search for "setInterval"

**Evidence:**
- 10 intervals running
- Memory growing
- Timers not being cleared

---

## React DevTools Features Used

### 1. Highlight Updates
**Purpose:** See which components re-render
**Use case:** Found Bug #1 (infinite loop) immediately

### 2. Component Tree
**Purpose:** Inspect props, state, hooks
**Use case:** Debugged all bugs by inspecting state

### 3. Profiler
**Purpose:** Find performance issues
**Use case:** Bug #10 (unnecessary renders)

### 4. Edit Props/State
**Purpose:** Test component with different values
**Use case:** Bug #2 (missing dependencies)

### 5. Suspend/Resume
**Purpose:** Pause React rendering
**Use case:** Debug rapid state changes

---

## Tips & Tricks

### Tip 1: Use $r in Console
```javascript
// While component selected in Components tab
$r  // Access component instance
$r.props  // See props
$r.state  // See state (class components)
```

### Tip 2: Search Components
- Click 🔍 in Components tab
- Search by name: "Counter"
- Find component quickly

### Tip 3: Filter Components
- ⚙️ Settings → Components
- Filter by HOC, hooks, etc.
- Reduce noise

### Tip 4: Break on Warnings
- ⚙️ Settings → Console
- "Break on all exceptions"
- Pause on React warnings

---

## Conclusion

React DevTools was essential for finding all 10 bugs. The combination of Components tab (for state inspection) and Profiler tab (for performance) provided everything needed to debug React applications professionally.

**Most useful feature:** Highlight updates - instantly showed which bugs caused rendering issues.


