# Exercise 04: Jotai Todo App - Hints

## Getting Started

### Hint 1: What is Jotai?
Jotai uses atomic state - each piece of state is an atom:

```javascript
import { atom } from 'jotai'

const countAtom = atom(0)
```

### Hint 2: Using Atoms
Use `useAtom` hook (like `useState`):

```javascript
import { useAtom } from 'jotai'

function Counter() {
  const [count, setCount] = useAtom(countAtom)

  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

---

## Creating Atoms

### Hint 3: Base Todos Atom
Create a primitive atom for the todos array:

```javascript
import { atom } from 'jotai'

export const todosAtom = atom([])
```

### Hint 4: Filter Atom
Another primitive atom for the filter:

```javascript
export const filterAtom = atom('all')
```

### Hint 5: Derived Atoms (Read-Only)
Create atoms that compute values from other atoms:

```javascript
export const filteredTodosAtom = atom((get) => {
  const todos = get(todosAtom)
  const filter = get(filterAtom)

  if (filter === 'active') {
    return todos.filter(todo => !todo.completed)
  }
  if (filter === 'completed') {
    return todos.filter(todo => todo.completed)
  }
  return todos // 'all'
})
```

### Hint 6: More Derived Atoms
```javascript
export const completedCountAtom = atom((get) => {
  const todos = get(todosAtom)
  return todos.filter(todo => todo.completed).length
})

export const activeCountAtom = atom((get) => {
  const todos = get(todosAtom)
  return todos.filter(todo => !todo.completed).length
})
```

---

## Using Atoms in Components

### Hint 7: Reading and Writing
Use `useAtom` for both:

```javascript
import { useAtom } from 'jotai'
import { todosAtom } from '../atoms/todoAtoms'

function TodoForm() {
  const [todos, setTodos] = useAtom(todosAtom)

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }])
  }
}
```

### Hint 8: Read-Only Atoms
Use `useAtomValue` for derived atoms:

```javascript
import { useAtomValue } from 'jotai'
import { filteredTodosAtom } from '../atoms/todoAtoms'

function TodoList() {
  const filteredTodos = useAtomValue(filteredTodosAtom)

  return (
    <ul>
      {filteredTodos.map(todo => <li key={todo.id}>{todo.text}</li>)}
    </ul>
  )
}
```

### Hint 9: Write-Only Hooks
Use `useSetAtom` when you only need the setter:

```javascript
import { useSetAtom } from 'jotai'

function TodoForm() {
  const setTodos = useSetAtom(todosAtom)

  // Now you only get the setter, not the value
}
```

---

## Todo Operations

### Hint 10: Adding Todos
```javascript
const [todos, setTodos] = useAtom(todosAtom)

const addTodo = (text) => {
  setTodos((prevTodos) => [
    ...prevTodos,
    { id: Date.now(), text: text.trim(), completed: false }
  ])
}
```

### Hint 11: Toggling Todos
```javascript
const [todos, setTodos] = useAtom(todosAtom)

const toggleTodo = (id) => {
  setTodos((prevTodos) =>
    prevTodos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  )
}
```

### Hint 12: Deleting Todos
```javascript
const deleteTodo = (id) => {
  setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id))
}
```

---

## Filters

### Hint 13: Filter Buttons
```javascript
import { useAtom } from 'jotai'
import { filterAtom } from '../atoms/todoAtoms'

function TodoFilters() {
  const [filter, setFilter] = useAtom(filterAtom)

  return (
    <div>
      <button
        onClick={() => setFilter('all')}
        className={filter === 'all' ? 'active' : ''}
      >
        All
      </button>
      <button
        onClick={() => setFilter('active')}
        className={filter === 'active' ? 'active' : ''}
      >
        Active
      </button>
      <button
        onClick={() => setFilter('completed')}
        className={filter === 'completed' ? 'active' : ''}
      >
        Completed
      </button>
    </div>
  )
}
```

---

## Stats

### Hint 14: Displaying Stats
```javascript
import { useAtomValue } from 'jotai'
import { todosAtom, completedCountAtom, activeCountAtom } from '../atoms/todoAtoms'

function TodoStats() {
  const todos = useAtomValue(todosAtom)
  const completedCount = useAtomValue(completedCountAtom)
  const activeCount = useAtomValue(activeCountAtom)

  return (
    <div>
      <span>Total: {todos.length}</span>
      <span>Active: {activeCount}</span>
      <span>Completed: {completedCount}</span>
    </div>
  )
}
```

---

## Advanced Patterns

### Hint 15: Write-Only Atoms
Create atoms specifically for actions:

```javascript
export const incrementTodoAtom = atom(
  null, // No read function
  (get, set, id) => {
    const todos = get(todosAtom)
    set(todosAtom, todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }
)
```

---

## Common Mistakes

### ❌ Mistake 1: Using Hooks Outside Components
```javascript
// WRONG:
const todos = useAtom(todosAtom) // Outside component!

function TodoList() { /* ... */ }

// CORRECT:
function TodoList() {
  const [todos] = useAtom(todosAtom) // Inside component
}
```

### ❌ Mistake 2: Direct Mutation
```javascript
// WRONG:
const toggleTodo = (id) => {
  todos.find(t => t.id === id).completed = true // Mutation!
  setTodos(todos)
}

// CORRECT:
const toggleTodo = (id) => {
  setTodos(todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  ))
}
```

### ❌ Mistake 3: Forgetting Dependencies in Derived Atoms
```javascript
// WRONG:
const filteredTodosAtom = atom((get) => {
  return todos.filter(...) // Using outer scope todos!
})

// CORRECT:
const filteredTodosAtom = atom((get) => {
  const todos = get(todosAtom) // Get from atom
  return todos.filter(...)
})
```

---

## Testing Checklist

- [ ] Can add todos
- [ ] Can toggle todo completion
- [ ] Can delete todos
- [ ] Filter "all" shows all todos
- [ ] Filter "active" shows only incomplete
- [ ] Filter "completed" shows only complete
- [ ] Stats display correctly
- [ ] No console errors

---

## What You're Learning

1. **Atomic State** - Small, independent pieces
2. **Derived Atoms** - Computed values
3. **useAtom** - Read and write
4. **useAtomValue** - Read only
5. **useSetAtom** - Write only
6. **Composition** - Building complex state from atoms

**Jotai is perfect for React Suspense and modern patterns!** ⚛️

