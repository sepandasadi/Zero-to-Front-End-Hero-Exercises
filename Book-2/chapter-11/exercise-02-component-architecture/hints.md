# Exercise 2: Component Architecture - Hints

## 🔍 Hint 1: Identifying What Goes Where

<details>
<summary>Click to reveal</summary>

**Container Component (Smart) should handle:**
- ✅ `useState`, `useReducer`
- ✅ `useEffect` for data fetching
- ✅ API calls
- ✅ Event handlers with business logic
- ✅ Data transformation

**Presentational Component (Dumb) should handle:**
- ✅ Receiving props
- ✅ Rendering UI
- ✅ Calling prop callbacks (e.g., `onClick={onDelete}`)
- ✅ Local UI state only (e.g., form inputs, modals)

**Example:**
```jsx
// Container
function TodoListContainer() {
  const [todos, setTodos] = useState([])  // ← State

  useEffect(() => {                       // ← Data fetching
    fetchTodos().then(setTodos)
  }, [])

  const handleComplete = (id) => {        // ← Business logic
    updateTodo(id, { completed: true })
  }

  return <TodoList todos={todos} onComplete={handleComplete} />
}

// Presentational
function TodoList({ todos, onComplete }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.text}
          <button onClick={() => onComplete(todo.id)}>Done</button>
        </li>
      ))}
    </ul>
  )
}
```
</details>

---

## 🔍 Hint 2: Refactoring Step-by-Step

<details>
<summary>Click to reveal</summary>

Follow these steps for each component:

**Step 1: Create Container Component**
```jsx
// TodoListContainer.jsx
import { useState, useEffect } from 'react'
import TodoList from './TodoList'
import { fetchTodos, updateTodo, deleteTodo } from './api'

export function TodoListContainer() {
  // Move all state here
  // Move all useEffect here
  // Move all event handlers here

  return <TodoList /* pass props */ />
}
```

**Step 2: Update Presentational Component**
```jsx
// TodoList.jsx (was doing everything, now just UI)
export function TodoList({ todos, onComplete, onDelete }) {
  return (
    // Just render UI, call callbacks
  )
}
```

**Step 3: Connect them**
```jsx
// App.jsx
import { TodoListContainer } from './TodoListContainer'

<TodoListContainer />  // Not <TodoList />
```
</details>

---

## 🔍 Hint 3: Props Interface Design

<details>
<summary>Click to reveal</summary>

Design clean prop interfaces for presentational components:

**Before (Mixed):**
```jsx
function ProductCatalog() {
  const [products, setProducts] = useState([])
  const [filter, setFilter] = useState('')

  // ... lots of logic ...
}
```

**After (Clean Interface):**
```jsx
// Presentational
function ProductCatalog({
  products,      // Data
  filter,        // State values
  onFilterChange,// Callbacks
  onAddToCart,
  loading,       // UI states
  error
}) {
  return (...)
}

// Container passes everything
<ProductCatalog
  products={products}
  filter={filter}
  onFilterChange={setFilter}
  onAddToCart={handleAddToCart}
  loading={loading}
  error={error}
/>
```

**Prop Naming Conventions:**
- Data: `users`, `products`, `todo`
- Callbacks: `onDelete`, `onSubmit`, `onChange`
- State: `loading`, `error`, `isOpen`
</details>

---

## 🔍 Hint 4: Handling Multiple Callbacks

<details>
<summary>Click to reveal</summary>

When you have many actions, group them or pass them separately:

**Option 1: Multiple Props**
```jsx
<UserProfile
  user={user}
  onEdit={handleEdit}
  onDelete={handleDelete}
  onFollow={handleFollow}
/>
```

**Option 2: Actions Object**
```jsx
const actions = {
  onEdit: handleEdit,
  onDelete: handleDelete,
  onFollow: handleFollow
}

<UserProfile user={user} actions={actions} />
```

**Option 3: Custom Hook (Advanced)**
```jsx
// useUserActions.js
export function useUserActions(user) {
  const handleEdit = () => { /* ... */ }
  const handleDelete = () => { /* ... */ }
  return { handleEdit, handleDelete }
}

// Container
function UserProfileContainer() {
  const user = useUser()
  const actions = useUserActions(user)

  return <UserProfile user={user} {...actions} />
}
```
</details>

---

## 🔍 Hint 5: Local UI State is OK

<details>
<summary>Click to reveal</summary>

Presentational components CAN have local UI state:

```jsx
function TodoList({ todos, onComplete }) {
  const [showCompleted, setShowCompleted] = useState(true)  // ✅ OK!

  const filtered = showCompleted
    ? todos
    : todos.filter(t => !t.completed)

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={showCompleted}
          onChange={e => setShowCompleted(e.target.checked)}
        />
        Show completed
      </label>

      {filtered.map(todo => (
        <TodoItem key={todo.id} todo={todo} onComplete={onComplete} />
      ))}
    </div>
  )
}
```

**Rule:** UI-only state (toggles, modals, form inputs) can stay in presentational components
</details>

---

## 🔍 Hint 6: Testing Made Easy

<details>
<summary>Click to reveal</summary>

Presentational components are super easy to test:

```jsx
// TodoList.test.jsx
import { render, screen } from '@testing-library/react'
import { TodoList } from './TodoList'

test('renders todos', () => {
  const todos = [
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build app', completed: true }
  ]

  render(<TodoList todos={todos} onComplete={() => {}} />)

  expect(screen.getByText('Learn React')).toBeInTheDocument()
  expect(screen.getByText('Build app')).toBeInTheDocument()
})

test('calls onComplete when button clicked', () => {
  const onComplete = jest.fn()
  const todos = [{ id: 1, text: 'Test', completed: false }]

  render(<TodoList todos={todos} onComplete={onComplete} />)

  fireEvent.click(screen.getByText('Done'))
  expect(onComplete).toHaveBeenCalledWith(1)
})
```

**No mocking APIs, no mocking state - just pure function testing!**
</details>

---

## 🐛 Common Issues

### Issue: Too many props

**Problem:**
```jsx
<TodoList
  todos={todos}
  onAdd={onAdd}
  onEdit={onEdit}
  onDelete={onDelete}
  onComplete={onComplete}
  onFilter={onFilter}
  filter={filter}
  loading={loading}
  error={error}
/>
```

**Solutions:**
1. Split into smaller components
2. Group related props into objects
3. Use composition:
```jsx
<TodoListContainer>
  <TodoFilters />
  <TodoList />
  <AddTodo />
</TodoListContainer>
```

### Issue: Presentational component needs data

**Problem:** Presentational component wants to fetch its own data

**Solution:** Always fetch in container, pass as prop

### Issue: Where do transformations go?

**Simple transformations:** Presentational component
```jsx
function UserList({ users }) {
  const sorted = [...users].sort((a, b) => a.name.localeCompare(b.name))
  return <div>{sorted.map(...)}</div>
}
```

**Complex transformations:** Container or custom hook
```jsx
function UserListContainer() {
  const users = useUsers()
  const enrichedUsers = useEnrichedUsers(users)  // Complex logic
  return <UserList users={enrichedUsers} />
}
```

---

## 📚 Resources

- [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
- [React Component Patterns](https://www.patterns.dev/posts/presentational-container-pattern/)
- [When to Use Container/Presentational Pattern](https://kentcdodds.com/blog/

container-components)

---

**Still stuck?** Check the solution folder!

