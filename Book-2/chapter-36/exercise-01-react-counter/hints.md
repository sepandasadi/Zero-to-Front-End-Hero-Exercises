# Exercise 1: React Counter App - Hints

## Getting Started

### Hint 1: Setting Up State
The counter needs to track one piece of information: the current count value.

```jsx
const [count, setCount] = useState(0);
```

Start with 0 as the initial value.

---

## Implementation Hints

### Hint 2: Creating Handler Functions
Create separate functions for each button action:

```jsx
function increment() {
  setCount(count + 1);
}

function decrement() {
  setCount(count - 1);
}
```

**Why separate functions?**
- More readable
- Easier to test
- Can add logic later (like preventing negative numbers)

---

### Hint 3: Displaying the Count
Simply show the state value:

```jsx
<div className="count">{count}</div>
```

React automatically updates this when `count` changes!

---

### Hint 4: Determining Status
You need to check the count value and show different messages:

**Option 1: Using if statements**
```jsx
let status = 'Zero';
if (count > 0) status = 'Positive';
if (count < 0) status = 'Negative';
```

**Option 2: Using ternary operator**
```jsx
const status = count > 0 ? 'Positive' : count < 0 ? 'Negative' : 'Zero';
```

Both work! Choose what feels more readable to you.

---

### Hint 5: Dynamic Class Names
You want the status to have different colors based on the value:

```jsx
<div className={`status ${count > 0 ? 'positive' : count < 0 ? 'negative' : 'zero'}`}>
  {status}
</div>
```

The CSS classes `.positive`, `.negative`, and `.zero` are already defined in Counter.css!

---

### Hint 6: Connecting Buttons
Use the `onClick` prop to connect your functions:

```jsx
<button onClick={increment} className="btn-increment">
  +1
</button>
```

**Important:** Write `onClick={increment}`, NOT `onClick={increment()}`
- `increment` passes the function
- `increment()` calls it immediately (wrong!)

---

## Common Mistakes

### ❌ Mistake 1: Mutating State Directly
```jsx
// WRONG:
count = count + 1;  // This won't trigger a re-render!

// CORRECT:
setCount(count + 1);  // This updates state and re-renders
```

### ❌ Mistake 2: Calling Functions Instead of Passing Them
```jsx
// WRONG:
<button onClick={increment()}>+1</button>  // Runs on render!

// CORRECT:
<button onClick={increment}>+1</button>  // Runs on click
```

### ❌ Mistake 3: Using Separate States for Derived Data
```jsx
// WRONG (unnecessary):
const [count, setCount] = useState(0);
const [status, setStatus] = useState('Zero');  // Don't do this!

// CORRECT:
const [count, setCount] = useState(0);
// Calculate status directly from count
const status = count > 0 ? 'Positive' : count < 0 ? 'Negative' : 'Zero';
```

**Why?** The status is derived from count, so you don't need separate state for it!

---

## Step-by-Step Checklist

- [ ] Import `useState` from 'react'
- [ ] Create state with `const [count, setCount] = useState(0)`
- [ ] Create `increment()` function that calls `setCount(count + 1)`
- [ ] Create `decrement()` function that calls `setCount(count - 1)`
- [ ] Create `reset()` function that calls `setCount(0)`
- [ ] Create `add5()` and `subtract5()` functions
- [ ] Display count with `<div className="count">{count}</div>`
- [ ] Calculate status based on count value
- [ ] Display status with dynamic class name
- [ ] Add 5 buttons with onClick handlers

---

## Testing Your Implementation

### Test 1: Basic Functionality
1. Click +1 → count should increase
2. Click -1 → count should decrease
3. Click Reset → count should return to 0

### Test 2: Status Updates
1. Click +1 → status should show "Positive" with green background
2. Click Reset → status should show "Zero" with gray background
3. Click -1 → status should show "Negative" with red background

### Test 3: Larger Increments
1. Click +5 five times → count should be 25
2. Click -5 five times → count should be 0

---

## Debugging Tips

### Problem: Nothing happens when clicking buttons
**Check:**
- Did you use `onClick={increment}` not `onClick={increment()}`?
- Did you import `useState`?
- Are there any console errors?

### Problem: Status not updating
**Check:**
- Is your status calculation using the current `count`?
- Did you put it inside the component function?
- Is the className being applied correctly?

### Problem: Wrong colors showing
**Check:**
- Are you using the correct class names? (`positive`, `negative`, `zero`)
- Did you import Counter.css?
- Check the browser DevTools to see what classes are applied

---

## Bonus Challenges Hints

### Bonus 1: Prevent Negative Numbers
```jsx
function decrement() {
  if (count > 0) {
    setCount(count - 1);
  }
}

// In JSX:
<button onClick={decrement} disabled={count === 0}>
  -1
</button>
```

### Bonus 2: Color-Coded Count
```jsx
<div className={`count count-${statusClass}`}>
  {count}
</div>
```

Then add CSS:
```css
.count-positive { color: #10b981; }
.count-negative { color: #ef4444; }
.count-zero { color: #6b7280; }
```

### Bonus 3: Operation History
```jsx
const [history, setHistory] = useState([]);

function increment() {
  setCount(count + 1);
  setHistory([...history, '+1']);
}
```

---

## Still Stuck?

1. **Read the error message** - React errors are very helpful!
2. **Check the console** - Use `console.log(count)` to see current value
3. **Use React DevTools** - Install the browser extension to inspect state
4. **Compare with the README** - The README has complete examples
5. **Take a break** - Sometimes you just need fresh eyes!

---

## Next Steps

Once you have the basic version working:
1. Try the bonus challenges
2. Experiment with your own features
3. Break it and fix it to understand it better
4. Move on to Exercise 2 (Vue Todo List)

**Remember:** The goal is learning, not perfection! 🚀

