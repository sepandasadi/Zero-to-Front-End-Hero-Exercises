# Exercise 1: React Counter App

**Difficulty:** Beginner
**Estimated Time:** 20-30 minutes
**Concepts:** useState, event handling, JSX, conditional rendering

---

## 🎯 Learning Objectives

By completing this exercise, you will:
- Set up a basic React component
- Use the `useState` hook to manage state
- Handle button click events
- Update the UI reactively based on state
- Use conditional rendering

---

## 📋 Requirements

Create a counter application with the following features:

### Must Have:
1. ✅ Display the current count (starts at 0)
2. ✅ **Increment button** (+1)
3. ✅ **Decrement button** (-1)
4. ✅ **Reset button** (back to 0)
5. ✅ **Add 5 button** (+5)
6. ✅ **Subtract 5 button** (-5)
7. ✅ Display status message:
   - "Positive" when count > 0
   - "Negative" when count < 0
   - "Zero" when count === 0

---

## 🚀 Setup

### Option 1: Start from Scratch

```bash
# Create a new React app with Vite
npm create vite@latest react-counter -- --template react

# Navigate into the project
cd react-counter

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Option 2: Use This Starter

Create the following file structure:

```
react-counter/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    └── Counter.jsx  ← Your component here
```

---

## 💻 Starter Code

### Counter.jsx

```jsx
import { useState } from 'react';
import './Counter.css';

function Counter() {
  // TODO: Add state here

  // TODO: Add functions to handle button clicks

  return (
    <div className="counter">
      <h1>Counter App</h1>

      {/* TODO: Display count */}

      {/* TODO: Display status */}

      {/* TODO: Add buttons */}
    </div>
  );
}

export default Counter;
```

### Counter.css (Optional Styling)

```css
.counter {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  text-align: center;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.count {
  font-size: 4rem;
  font-weight: bold;
  margin: 1rem 0;
}

.status {
  font-size: 1.5rem;
  margin: 1rem 0;
  padding: 0.5rem;
  border-radius: 8px;
}

.status.positive {
  color: #10b981;
  background: #d1fae5;
}

.status.negative {
  color: #ef4444;
  background: #fee2e2;
}

.status.zero {
  color: #6b7280;
  background: #e5e7eb;
}

.buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 1.5rem;
}

button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s;
}

button:hover {
  transform: translateY(-2px);
}

button:active {
  transform: translateY(0);
}

.btn-increment {
  background: #3b82f6;
  color: white;
}

.btn-increment:hover {
  background: #2563eb;
}

.btn-decrement {
  background: #ef4444;
  color: white;
}

.btn-decrement:hover {
  background: #dc2626;
}

.btn-reset {
  background: #6b7280;
  color: white;
}

.btn-reset:hover {
  background: #4b5563;
}

.btn-add5, .btn-sub5 {
  background: #8b5cf6;
  color: white;
}

.btn-add5:hover, .btn-sub5:hover {
  background: #7c3aed;
}
```

---

## 📝 Implementation Steps

### Step 1: Add State

```jsx
const [count, setCount] = useState(0);
```

### Step 2: Create Handler Functions

```jsx
function increment() {
  setCount(count + 1);
}

function decrement() {
  setCount(count - 1);
}

// Add more functions...
```

### Step 3: Display the Count

```jsx
<div className="count">{count}</div>
```

### Step 4: Add Conditional Status

```jsx
<div className={`status ${/* determine class */}`}>
  {/* Show appropriate message */}
</div>
```

### Step 5: Add Buttons

```jsx
<button onClick={increment} className="btn-increment">
  +1
</button>
```

---

## ✅ Expected Output

Your finished app should look like this:

```
┌─────────────────────────────┐
│      Counter App             │
│                              │
│          5                   │
│                              │
│      [ Positive ]            │
│                              │
│  [+1]  [-1]  [+5]  [-5]     │
│         [Reset]              │
└─────────────────────────────┘
```

### Behavior:
- Clicking **+1** increases count by 1
- Clicking **-1** decreases count by 1
- Clicking **+5** increases count by 5
- Clicking **-5** decreases count by 5
- Clicking **Reset** sets count back to 0
- Status updates automatically based on count value
- Status has different styling (color) based on positive/negative/zero

---

## 🌟 Bonus Challenges

Once you have the basic version working:

### Bonus 1: Prevent Negative Numbers
Disable the decrement and -5 buttons when count is 0 or would go negative.

```jsx
<button
  onClick={decrement}
  disabled={count === 0}
>
  -1
</button>
```

### Bonus 2: Color-Coded Count
Change the count number's color:
- Green when positive
- Red when negative
- Gray when zero

### Bonus 3: Operation History
Keep track of all operations performed:

```jsx
const [history, setHistory] = useState([]);

// When incrementing:
setHistory([...history, '+1']);

// Display:
<div className="history">
  History: {history.join(', ')}
</div>
```

### Bonus 4: Double and Triple
Add buttons that multiply the count by 2 or 3.

### Bonus 5: Keyboard Shortcuts
- Arrow Up: Increment
- Arrow Down: Decrement
- R key: Reset

```jsx
useEffect(() => {
  function handleKeyDown(e) {
    if (e.key === 'ArrowUp') increment();
    if (e.key === 'ArrowDown') decrement();
    if (e.key === 'r' || e.key === 'R') reset();
  }

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [count]); // Include count in dependencies
```

### Bonus 6: Animations
Add smooth transitions when the count changes (CSS transitions or Framer Motion).

---

## 🐛 Common Mistakes

### ❌ Mutating State Directly
```jsx
// WRONG:
count = count + 1;
// or
count++;
```

### ✅ Using setState
```jsx
// CORRECT:
setCount(count + 1);
```

---

### ❌ Not Using Functional Updates
```jsx
// RISKY (can cause bugs with rapid clicks):
setCount(count + 1);
setCount(count + 1); // This won't add 2!
```

### ✅ Using Functional Form
```jsx
// SAFE:
setCount(c => c + 1);
setCount(c => c + 1); // This WILL add 2!
```

---

### ❌ Inline Anonymous Functions (Performance)
```jsx
// Works but creates new function on every render:
<button onClick={() => setCount(count + 1)}>+1</button>
```

### ✅ Named Functions
```jsx
// Better (but both work fine for this simple case):
function increment() {
  setCount(count + 1);
}

<button onClick={increment}>+1</button>
```

---

## 🧪 Testing Your App

### Manual Testing Checklist:
- [ ] Counter starts at 0
- [ ] +1 button increases count
- [ ] -1 button decreases count
- [ ] +5 button increases by 5
- [ ] -5 button decreases by 5
- [ ] Reset button returns to 0
- [ ] Status shows "Positive" when count > 0
- [ ] Status shows "Negative" when count < 0
- [ ] Status shows "Zero" when count === 0
- [ ] Status styling changes appropriately
- [ ] No console errors

---

## 💡 Hints

### Hint 1: Determining Status
```jsx
let status = 'Zero';
if (count > 0) status = 'Positive';
if (count < 0) status = 'Negative';

// Or using ternary:
const status = count > 0 ? 'Positive' : count < 0 ? 'Negative' : 'Zero';
```

### Hint 2: Dynamic Class Names
```jsx
<div className={`status ${count > 0 ? 'positive' : count < 0 ? 'negative' : 'zero'}`}>
  {status}
</div>
```

### Hint 3: Shorter Functions
```jsx
// Instead of separate functions:
<button onClick={() => setCount(count + 1)}>+1</button>
<button onClick={() => setCount(count - 1)}>-1</button>
<button onClick={() => setCount(0)}>Reset</button>
```

---

## 📚 What You'll Learn

### Key Concepts:
1. **React State** - `useState` hook for reactive data
2. **Event Handling** - `onClick` and other event handlers
3. **JSX Syntax** - Writing HTML-like code in JavaScript
4. **Conditional Rendering** - Showing different UI based on state
5. **Component Re-rendering** - How React updates the UI automatically

### React Patterns:
- State management with hooks
- Event handler functions
- Conditional styling
- Functional updates
- Clean component structure

---

## 🎓 Next Steps

After completing this exercise:
1. ✅ Experiment with the code - try breaking it to understand it better
2. ✅ Add your own features (min/max values, step size control, etc.)
3. ✅ Move on to Exercise 2 (Vue Todo List)
4. ✅ Compare React's approach with Vue's approach

---

## 🆘 Need Help?

**Stuck?** That's normal! Try:
1. Re-read the React useState documentation
2. Check the browser console for errors
3. Use `console.log(count)` to see the current value
4. Review the chapter examples
5. Take a break and come back with fresh eyes

**Still stuck?** Check out:
- [React useState docs](https://react.dev/reference/react/useState)
- [React events docs](https://react.dev/learn/responding-to-events)

---

## ✨ Congratulations!

Once you complete this exercise, you've built your first React app with state management! This is a huge milestone. The concepts you learned here (useState, events, conditional rendering) are the foundation of every React application.

**Keep going!** 🚀

