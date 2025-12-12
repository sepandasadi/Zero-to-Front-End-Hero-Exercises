# Exercise 02: Redux Toolkit Todo App - Hints

## Getting Started

### Hint 1: Redux Toolkit Setup
Redux Toolkit (RTK) simplifies Redux with less boilerplate:

```javascript
// store/store.js
import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './todoSlice'

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
})
```

### Hint 2: Creating a Slice
A slice contains reducer logic and actions for a feature:

```javascript
import { createSlice } from '@reduxjs/toolkit'

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    filter: 'all',
  },
  reducers: {
    addTodo: (state, action) => {
      // Immer allows "mutating" syntax
      state.todos.push({
        id: Date.now(),
        text: action.payload,
        completed: false,
      })
    },
  },
})
```

---

## Key Concepts

### Hint 3: Immer and Immutability
Redux Toolkit uses Immer under the hood, so you can write "mutating" logic:

```javascript
// This looks like mutation but Immer makes it immutable
toggleTodo: (state, action) => {
  const todo = state.todos.find(t => t.id === action.payload)
  if (todo) {
    todo.completed = !todo.completed
  }
}
```

### Hint 4: useSelector Hook
Get data from Redux store:

```javascript
import { useSelector } from 'react-redux'

function TodoList() {
  const todos = useSelector(state => state.todos.todos)
  const filter = useSelector(state => state.todos.filter)
}
```

### Hint 5: useDispatch Hook
Dispatch actions to update state:

```javascript
import { useDispatch } from 'react-redux'
import { addTodo } from '../store/todoSlice'

function TodoForm() {
  const dispatch = useDispatch()

  const handleSubmit = () => {
    dispatch(addTodo(text))
  }
}
```

---

## Implementation Steps

### Step 1: Create the Slice
```javascript
const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    filter: 'all',
  },
  reducers: {
    addTodo: (state, action) => { /* ... */ },
    toggleTodo: (state, action) => { /* ... */ },
    deleteTodo: (state, action) => { /* ... */ },
    setFilter: (state, action) => { /* ... */ },
    clearCompleted: (state) => { /* ... */ },
  },
})
```

### Step 2: Export Actions and Reducer
```javascript
export const { addTodo, toggleTodo, deleteTodo, setFilter, clearCompleted } = todoSlice.actions
export default todoSlice.reducer
```

### Step 3: Configure Store
```javascript
export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
})
```

### Step 4: Wrap App with Provider
```javascript
import { Provider } from 'react-redux'
import { store } from './store/store'

<Provider store={store}>
  <App />
</Provider>
```

---

## Common Mistakes

### ❌ Mistake 1: Forgetting to Export Actions
```javascript
// WRONG:
export default todoSlice.reducer
// Actions not exported!

// CORRECT:
export const { addTodo, toggleTodo } = todoSlice.actions
export default todoSlice.reducer
```

### ❌ Mistake 2: Direct State Mutation (Without Immer)
```javascript
// In regular Redux (not RTK):
return {
  ...state,
  todos: state.todos.filter(t => t.id !== action.payload)
}

// In RTK with Immer:
state.todos = state.todos.filter(t => t.id !== action.payload)
```

### ❌ Mistake 3: Incorrect Selector
```javascript
// WRONG:
const todos = useSelector(state => state.todos)
// Returns the whole slice including filter

// CORRECT:
const todos = useSelector(state => state.todos.todos)
// Returns just the todos array
```

---

## Filtering Logic

### Hint 6: Filtering Todos
```javascript
const filteredTodos = todos.filter(todo => {
  if (filter === 'active') return !todo.completed
  if (filter === 'completed') return todo.completed
  return true // 'all'
})
```

---

## Redux DevTools

### Hint 7: Using Redux DevTools
1. Install Redux DevTools Extension
2. `configureStore` automatically enables it
3. See actions dispatched in real-time
4. Time-travel debugging!

---

## Testing Checklist

- [ ] Can add new todos
- [ ] Can toggle todo completion
- [ ] Can delete todos
- [ ] Can filter (all/active/completed)
- [ ] Can clear completed
- [ ] Stats update correctly
- [ ] Redux DevTools shows actions

---

## What You're Learning

1. **Redux Toolkit** - Modern Redux approach
2. **createSlice** - Combines reducers and actions
3. **Immer** - Immutability made easy
4. **useSelector** - Reading from store
5. **useDispatch** - Updating store
6. **Redux DevTools** - Debugging state

**Redux Toolkit is the recommended way to write Redux today!** 🚀

