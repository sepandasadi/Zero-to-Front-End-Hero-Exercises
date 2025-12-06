# Getting Started - Component Architecture

## 🎯 Your Task

Refactor mixed components into Container/Presentational pattern.

**Time estimate:** 1.5 hours

---

## 🧩 What You'll Refactor

You have **3 components** that mix business logic with UI:

1. **TodoList** - Manages todos (add, complete, delete)
2. **ProductCatalog** - Shows products with filtering
3. **UserProfile** - Displays and edits user data

Each component currently does TOO MUCH!

---

## 📐 The Pattern

### **Container Component (Smart)**
- Handles state & effects
- Fetches data
- Contains business logic
- Passes data + callbacks to presentational

### **Presentational Component (Dumb)**
- Receives everything via props
- Renders UI
- Calls callbacks for user actions
- No business logic

---

## 🔨 Refactoring Steps

### **For Each Component:**

1. **Create Container Component**
   ```jsx
   // TodoListContainer.jsx
   export function TodoListContainer() {
     // Move ALL state here
     const [todos, setTodos] = useState([])

     // Move ALL effects here
     useEffect(() => { ... }, [])

     // Move ALL handlers here
     const handleAdd = () => { ... }

     // Render presentational component
     return <TodoList todos={todos} onAdd={handleAdd} />
   }
   ```

2. **Update Presentational Component**
   ```jsx
   // TodoList.jsx
   export function TodoList({ todos, onAdd, onComplete }) {
     // ONLY UI rendering
     // NO state, NO effects, NO API calls
     return (...)
   }
   ```

3. **Update Imports**
   ```jsx
   // App.jsx
   // Before:
   import { TodoList } from './TodoList'

   // After:
   import { TodoListContainer } from './TodoListContainer'

   // Use:
   <TodoListContainer />
   ```

---

## ✅ Success Criteria

After refactoring, you should have:

**For TodoList:**
- [ ] `TodoListContainer.jsx` - handles state & logic
- [ ] `TodoList.jsx` - pure UI component
- [ ] All props passed correctly
- [ ] App still works the same

**For ProductCatalog:**
- [ ] `ProductCatalogContainer.jsx` - handles state & logic
- [ ] `ProductCatalog.jsx` - pure UI component
- [ ] Filtering logic in container
- [ ] App still works the same

**For UserProfile:**
- [ ] `UserProfileContainer.jsx` - handles state & logic
- [ ] `UserProfile.jsx` - pure UI component
- [ ] Edit mode handled properly
- [ ] App still works the same

---

## 🎓 What Goes Where?

### **Container (Smart)**
- ✅ `useState` for data
- ✅ `useEffect` for fetching
- ✅ API calls
- ✅ Event handlers with logic
- ✅ Data transformations

### **Presentational (Dumb)**
- ✅ Props for data
- ✅ Callbacks for actions
- ✅ UI rendering
- ✅ Local UI state (modals, toggles)

---

## 🧪 Testing After Refactoring

**Before (Mixed component):**
```jsx
// Hard to test - need to mock API, state, etc.
test('TodoList', () => {
  // Mock API
  // Mock hooks
  // Complex setup
})
```

**After (Presentational component):**
```jsx
// Easy! Just pass props
test('TodoList renders todos', () => {
  render(<TodoList todos={mockTodos} onComplete={() => {}} />)
  expect(screen.getByText('Buy milk')).toBeInTheDocument()
})
```

---

## 💡 Tips

1. **Start with TodoList** (simplest)
2. **Test after each refactoring** - make sure it still works
3. **Use descriptive prop names** - `onComplete`, not `handleComplete`
4. **Keep presentational components pure** - same props should always render the same UI

---

## 🎁 Bonus Challenges

1. Extract container logic into custom hooks:
   ```jsx
   function useTodos() {
     const [todos, setTodos] = useState([])
     const handleAdd = () => { ... }
     return { todos, handleAdd, ... }
   }

   function TodoListContainer() {
     const todoState = useTodos()
     return <TodoList {...todoState} />
   }
   ```

2. Write tests for presentational components

3. Add PropTypes or TypeScript

4. Create multiple containers using same presentational component

---

## 🧪 Verification

```bash
npm install
npm run dev
```

**Before refactoring:**
- All 3 components should work
- Add/edit/delete functionality works

**After refactoring:**
- Everything should still work exactly the same!
- But now components are separated

---

**Need help?** Check `../hints.md`

**Estimated time:** 1.5 hours

Good luck refactoring! 🏗️

