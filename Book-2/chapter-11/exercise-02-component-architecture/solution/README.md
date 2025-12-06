# Solution: Component Architecture (Container/Presentational Pattern)

This solution demonstrates the Container/Presentational pattern for separating business logic from UI.

## 🎯 What Changed

### **Refactoring Summary:**

1. **TodoList** → `TodoListContainer` + `TodoList`
2. **ProductCatalog** → `ProductCatalogContainer` + `ProductCatalog`
3. **UserProfile** → `UserProfileContainer` + `UserProfile`

Each component was split into:
- **Container** (Smart): Handles state, effects, business logic
- **Presentational** (Dumb): Receives props, renders UI

---

## 📁 File Structure

```
src/
├── containers/
│   ├── TodoListContainer.jsx         ← State & logic
│   ├── ProductCatalogContainer.jsx   ← State & logic
│   └── UserProfileContainer.jsx      ← State & logic
├── components/
│   ├── TodoList.jsx                  ← Pure UI
│   ├── TodoList.css
│   ├── ProductCatalog.jsx            ← Pure UI
│   ├── ProductCatalog.css
│   ├── UserProfile.jsx               ← Pure UI
│   └── UserProfile.css
└── App.jsx
```

---

## 🔄 Refactoring 1: TodoList

### **Container (Smart):**
```jsx
// containers/TodoListContainer.jsx
function TodoListContainer() {
  // All state
  const [todos, setTodos] = useState([...])
  const [newTodo, setNewTodo] = useState('')

  // All handlers
  const handleAdd = (e) => { ... }
  const handleToggle = (id) => { ... }
  const handleDelete = (id) => { ... }

  // Render presentational component
  return (
    <TodoList
      todos={todos}
      newTodo={newTodo}
      onNewTodoChange={setNewTodo}
      onAdd={handleAdd}
      onToggle={handleToggle}
      onDelete={handleDelete}
    />
  )
}
```

### **Presentational (Dumb):**
```jsx
// components/TodoList.jsx
function TodoList({
  todos,
  newTodo,
  onNewTodoChange,
  onAdd,
  onToggle,
  onDelete
}) {
  const activeTodos = todos.filter(t => !t.completed).length

  return (
    <div className="todo-list">
      <form onSubmit={onAdd}>
        <input
          value={newTodo}
          onChange={(e) => onNewTodoChange(e.target.value)}
        />
        <button>Add</button>
      </form>

      <div>{activeTodos} active • {todos.length} total</div>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
            />
            <span>{todo.text}</span>
            <button onClick={() => onDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

**Benefits:**
- ✅ Can test TodoList UI by passing props
- ✅ Can reuse TodoList with different data sources
- ✅ Clear separation of concerns

---

## 🔄 Refactoring 2: ProductCatalog

### **Container (Smart):**
```jsx
// containers/ProductCatalogContainer.jsx
function ProductCatalogContainer() {
  const [products, setProducts] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts().then(data => {
      setProducts(data)
      setLoading(false)
    })
  }, [])

  const filteredProducts = filter === 'all'
    ? products
    : products.filter(p => p.category === filter)

  const handleAddToCart = (product) => {
    alert(`Added ${product.name} to cart!`)
  }

  return (
    <ProductCatalog
      products={filteredProducts}
      totalProducts={products.length}
      filter={filter}
      onFilterChange={setFilter}
      onAddToCart={handleAddToCart}
      loading={loading}
    />
  )
}
```

### **Presentational (Dumb):**
```jsx
// components/ProductCatalog.jsx
function ProductCatalog({
  products,
  totalProducts,
  filter,
  onFilterChange,
  onAddToCart,
  loading
}) {
  if (loading) return <div>Loading...</div>

  return (
    <div>
      <div>
        {['all', 'electronics', 'home', 'sports'].map(cat => (
          <button
            key={cat}
            onClick={() => onFilterChange(cat)}
            className={filter === cat ? 'active' : ''}
          >
            {cat}
          </button>
        ))}
      </div>

      <div>Showing {products.length} of {totalProducts}</div>

      <div>
        {products.map(product => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button
              onClick={() => onAddToCart(product)}
              disabled={!product.inStock}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
```

**Benefits:**
- ✅ ProductCatalog can be tested with mock data
- ✅ Filtering logic isolated in container
- ✅ Easy to add different filters

---

## 🔄 Refactoring 3: UserProfile

### **Container (Smart):**
```jsx
// containers/UserProfileContainer.jsx
function UserProfileContainer() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', bio: '' })

  useEffect(() => {
    fetchUser().then(data => {
      setUser(data)
      setFormData({ name: data.name, email: data.email, bio: data.bio })
      setLoading(false)
    })
  }, [])

  const handleEdit = () => setIsEditing(true)

  const handleCancel = () => {
    setIsEditing(false)
    setFormData({ name: user.name, email: user.email, bio: user.bio })
  }

  const handleSave = (e) => {
    e.preventDefault()
    setUser({ ...user, ...formData })
    setIsEditing(false)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <UserProfile
      user={user}
      loading={loading}
      isEditing={isEditing}
      formData={formData}
      onEdit={handleEdit}
      onCancel={handleCancel}
      onSave={handleSave}
      onChange={handleChange}
    />
  )
}
```

### **Presentational (Dumb):**
```jsx
// components/UserProfile.jsx
function UserProfile({
  user,
  loading,
  isEditing,
  formData,
  onEdit,
  onCancel,
  onSave,
  onChange
}) {
  if (loading) return <div>Loading...</div>
  if (!user) return <div>User not found</div>

  return (
    <div>
      <div>
        <img src={user.avatar} alt={user.name} />
        {!isEditing && <button onClick={onEdit}>Edit</button>}
      </div>

      {isEditing ? (
        <form onSubmit={onSave}>
          <input name="name" value={formData.name} onChange={onChange} />
          <input name="email" value={formData.email} onChange={onChange} />
          <textarea name="bio" value={formData.bio} onChange={onChange} />
          <button type="submit">Save</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </form>
      ) : (
        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <p>{user.bio}</p>
        </div>
      )}
    </div>
  )
}
```

**Benefits:**
- ✅ Form logic separated from UI
- ✅ Easy to test edit/view modes
- ✅ Reusable profile display

---

## 📊 Comparison

### **Before:**
```jsx
// Mixed component
function TodoList() {
  const [todos, setTodos] = useState([])  // State
  const handleAdd = () => { ... }         // Logic
  return <div>...</div>                   // UI
}
```

**Problems:**
- ❌ Hard to test (need to mock state)
- ❌ Can't reuse UI with different data
- ❌ Too many responsibilities

### **After:**
```jsx
// Container
function TodoListContainer() {
  const [todos, setTodos] = useState([])
  const handleAdd = () => { ... }
  return <TodoList todos={todos} onAdd={handleAdd} />
}

// Presentational
function TodoList({ todos, onAdd }) {
  return <div>...</div>
}
```

**Benefits:**
- ✅ Easy to test (just pass props)
- ✅ Reusable UI
- ✅ Clear separation

---

## 🧪 Testing Made Easy

```jsx
// Testing presentational component
test('TodoList renders todos', () => {
  const todos = [{ id: 1, text: 'Test', completed: false }]
  render(<TodoList todos={todos} onAdd={() => {}} onToggle={() => {}} />)
  expect(screen.getByText('Test')).toBeInTheDocument()
})

// No need to mock API, state, or complex logic!
```

---

## 💡 When to Use

**Use Container/Presentational when:**
- ✅ Component has both complex logic AND complex UI
- ✅ Want to reuse UI with different data
- ✅ Need to test logic separately from UI

**Skip it when:**
- ⚠️ Component is simple (< 50 lines)
- ⚠️ Logic and UI are tightly coupled
- ⚠️ Would be overkill

---

## 🚀 Next Level: Custom Hooks

Extract container logic further:

```jsx
// useUserProfile.js
function useUserProfile() {
  const [user, setUser] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  // ... all logic

  return { user, isEditing, handleEdit, handleSave, ... }
}

// Container becomes simpler
function UserProfileContainer() {
  const profileState = useUserProfile()
  return <UserProfile {...profileState} />
}
```

---

**Time to Refactor:** ~1.5 hours
**Difficulty:** Intermediate
**Testability Improvement:** 300%+

