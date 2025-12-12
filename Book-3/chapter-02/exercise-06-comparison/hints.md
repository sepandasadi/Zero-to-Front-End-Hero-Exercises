# Exercise 06: State Management Comparison - Hints

## Overview

This exercise helps you compare **4 different state management approaches** by implementing the same counter in each:

1. **Context API** - React's built-in solution
2. **Redux Toolkit** - Industry standard
3. **Zustand** - Minimal and fast
4. **Jotai** - Atomic state management

---

## Context API Implementation

### Hint 1: Creating Context
```javascript
import { createContext, useContext, useState } from 'react'

const CounterContext = createContext()

export function CounterProvider({ children }) {
  const [count, setCount] = useState(0)

  const increment = () => setCount(c => c + 1)
  const decrement = () => setCount(c => c - 1)
  const reset = () => setCount(0)

  return (
    <CounterContext.Provider value={{ count, increment, decrement, reset }}>
      {children}
    </CounterContext.Provider>
  )
}

export function useCounter() {
  return useContext(CounterContext)
}
```

### Hint 2: Using Context
```javascript
function ContextCounter() {
  const { count, increment, decrement, reset } = useCounter()

  return (
    <div>
      <div>{count}</div>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
      <button onClick={increment}>+</button>
    </div>
  )
}
```

---

## Redux Toolkit Implementation

### Hint 3: Creating a Slice
```javascript
import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    reset: (state) => {
      state.value = 0
    },
  },
})

export const { increment, decrement, reset } = counterSlice.actions
export default counterSlice.reducer
```

### Hint 4: Configuring Store
```javascript
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})
```

### Hint 5: Using Redux
```javascript
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, reset } from '../redux/counterSlice'

function ReduxCounter() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <div>{count}</div>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
      <button onClick={() => dispatch(increment())}>+</button>
    </div>
  )
}
```

---

## Zustand Implementation

### Hint 6: Creating Zustand Store
```javascript
import { create } from 'zustand'

export const useCounterStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}))
```

### Hint 7: Using Zustand
```javascript
import { useCounterStore } from '../zustand/counterStore'

function ZustandCounter() {
  const { count, increment, decrement, reset } = useCounterStore()

  return (
    <div>
      <div>{count}</div>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
      <button onClick={increment}>+</button>
    </div>
  )
}
```

---

## Jotai Implementation

### Hint 8: Creating Atoms
```javascript
import { atom } from 'jotai'

export const countAtom = atom(0)

export const incrementAtom = atom(
  null,
  (get, set) => set(countAtom, get(countAtom) + 1)
)

export const decrementAtom = atom(
  null,
  (get, set) => set(countAtom, get(countAtom) - 1)
)

export const resetAtom = atom(
  null,
  (get, set) => set(countAtom, 0)
)
```

### Hint 9: Using Jotai
```javascript
import { useAtom, useSetAtom } from 'jotai'
import { countAtom, incrementAtom, decrementAtom, resetAtom } from '../jotai/counterAtoms'

function JotaiCounter() {
  const [count] = useAtom(countAtom)
  const increment = useSetAtom(incrementAtom)
  const decrement = useSetAtom(decrementAtom)
  const reset = useSetAtom(resetAtom)

  return (
    <div>
      <div>{count}</div>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
      <button onClick={increment}>+</button>
    </div>
  )
}
```

---

## Comparison

### When to Use Each?

#### Context API ✅
**Pros:**
- Built into React
- No extra dependencies
- Simple API
- Good for themes, auth, simple state

**Cons:**
- Can cause unnecessary re-renders
- Verbose for complex state
- No built-in persistence

**Use when:** Sharing simple state across a few components

---

#### Redux Toolkit ✅
**Pros:**
- Industry standard
- Excellent DevTools
- Middleware ecosystem
- Great for large apps
- Time-travel debugging

**Cons:**
- More boilerplate
- Steeper learning curve
- Heavier bundle size

**Use when:** Building large apps with complex state and team collaboration

---

#### Zustand ✅
**Pros:**
- Minimal API
- Fast performance
- No providers needed
- Built-in persistence
- Small bundle size

**Cons:**
- Smaller ecosystem
- Less tooling
- Newer library

**Use when:** Medium apps that need simple, fast state management

---

#### Jotai ✅
**Pros:**
- Atomic design
- React Suspense support
- Minimal re-renders
- Composable
- TypeScript-first

**Cons:**
- Newer paradigm
- Different mental model
- Smaller community

**Use when:** Modern React apps using Suspense or need fine-grained reactivity

---

## Performance Comparison

### Hint 10: Render Optimization

**Context API:**
```javascript
// Every consumer re-renders when context changes
// Use useMemo and split contexts to optimize
```

**Redux:**
```javascript
// Selectors prevent unnecessary re-renders
const count = useSelector((state) => state.counter.value)
```

**Zustand:**
```javascript
// Selective subscription prevents re-renders
const count = useCounterStore((state) => state.count)
```

**Jotai:**
```javascript
// Only components using specific atoms re-render
const [count] = useAtom(countAtom)
```

---

## Common Patterns

### Hint 11: Comparing Store Sizes

**Context API:** ~20 lines (provider + hook)
**Redux:** ~30 lines (slice + store + provider)
**Zustand:** ~10 lines (store only)
**Jotai:** ~15 lines (atoms only)

---

## Testing Checklist

Test ALL four counters:
- [ ] Context counter increments
- [ ] Context counter decrements
- [ ] Context counter resets
- [ ] Redux counter increments
- [ ] Redux counter decrements
- [ ] Redux counter resets
- [ ] Zustand counter increments
- [ ] Zustand counter decrements
- [ ] Zustand counter resets
- [ ] Jotai counter increments
- [ ] Jotai counter decrements
- [ ] Jotai counter resets
- [ ] All counters are independent

---

## What You're Learning

1. **Multiple Paradigms** - Different approaches to state
2. **Trade-offs** - When to use each solution
3. **API Differences** - How each library works
4. **Performance** - Understanding re-renders
5. **Decision Making** - Choosing the right tool

**There's no "best" solution - choose what fits your needs!** 🎯

