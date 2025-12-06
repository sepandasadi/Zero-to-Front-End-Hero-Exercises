# Exercise 2: Component Architecture

**Difficulty:** Intermediate
**Time:** 1.5 hours
**Focus:** Container/Presentational pattern

## 🎯 Learning Objectives

- Understand Container vs Presentational components
- Separate business logic from UI
- Make components more reusable and testable
- Apply proper component composition

## 📋 Problem

You have components that mix business logic with UI, making them hard to:
- Test (logic + UI together)
- Reuse (tightly coupled to specific data)
- Understand (too many responsibilities)

You need to refactor them using the **Container/Presentational pattern**.

## 🧩 Pattern Explained

### **Container Components (Smart)**
- Handle business logic
- Manage state
- Fetch data
- Pass data to presentational components
- Usually named: `UserListContainer`, `ProductsContainer`

### **Presentational Components (Dumb)**
- Focus on UI/appearance
- Receive data via props
- Call callbacks for user actions
- No business logic
- Usually named: `UserList`, `ProductCard`

## 📝 Example Refactoring

### **Before (Mixed):**
```jsx
// UserList.jsx - Does everything!
function UserList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch logic
    fetchUsers().then(setUsers)
  }, [])

  const handleDelete = (id) => {
    // Business logic
    deleteUser(id).then(() => {
      setUsers(users.filter(u => u.id !== id))
    })
  }

  // UI rendering
  return (
    <div>
      {loading ? <Spinner /> : null}
      {users.map(user => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <button onClick={() => handleDelete(user.id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}
```

**Problems:**
- ❌ Hard to test UI separately from logic
- ❌ Can't reuse UI with different data source
- ❌ Too many responsibilities

### **After (Separated):**

**Container (Smart):**
```jsx
// UserListContainer.jsx - Handles logic
function UserListContainer() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers().then(data => {
      setUsers(data)
      setLoading(false)
    })
  }, [])

  const handleDelete = (id) => {
    deleteUser(id).then(() => {
      setUsers(users.filter(u => u.id !== id))
    })
  }

  return (
    <UserList
      users={users}
      loading={loading}
      onDelete={handleDelete}
    />
  )
}
```

**Presentational (Dumb):**
```jsx
// UserList.jsx - Pure UI
function UserList({ users, loading, onDelete }) {
  if (loading) return <Spinner />

  return (
    <div>
      {users.map(user => (
        <UserCard
          key={user.id}
          user={user}
          onDelete={() => onDelete(user.id)}
        />
      ))}
    </div>
  )
}
```

**Benefits:**
- ✅ Easy to test UI (just pass props)
- ✅ Reusable UI (works with any data)
- ✅ Clear separation of concerns

## ✅ Requirements

Refactor the following components using Container/Presentational pattern:

1. **TodoList** → `TodoListContainer` + `TodoList`
2. **ProductCatalog** → `ProductCatalogContainer` + `ProductCatalog`
3. **UserProfile** → `UserProfileContainer` + `UserProfile`

### Each refactoring should:
- [ ] Separate business logic into Container
- [ ] Keep UI in Presentational component
- [ ] Pass data/callbacks via props
- [ ] Make presentational components reusable

## ✅ Acceptance Criteria

- [ ] Container components handle all state & logic
- [ ] Presentational components receive everything via props
- [ ] No API calls or business logic in presentational components
- [ ] Presentational components are pure (same props = same output)
- [ ] Components are more testable

## 💡 When to Use This Pattern

**Use Container/Presentational when:**
- ✅ Component has both complex logic AND complex UI
- ✅ You want to reuse UI with different data
- ✅ Testing logic separately from UI
- ✅ Team splits: some focus on logic, others on UI

**Skip it when:**
- ⚠️ Component is simple (few lines)
- ⚠️ Logic and UI are tightly coupled
- ⚠️ Overkill for small components

## 🎁 Bonus Challenges

1. Write tests for presentational components (easy!)
2. Create multiple containers using same presentational component
3. Add PropTypes or TypeScript for type safety
4. Use custom hooks to extract container logic further

---

**Time Estimate:** 1.5 hours
**Difficulty:** Intermediate

Ready to separate your concerns? Check the starter code!

