# Challenge: Todo App with API 🏆

## 🎯 Objective

Build a full-featured todo app using ES6 modules and a REST API, incorporating all concepts from Chapter 31.

## 📋 Requirements

### Core Features

1. **CRUD Operations** via API
   - GET all todos
   - POST new todo
   - PUT update todo (complete/incomplete, edit text)
   - DELETE todo

2. **ES6 Modules**
   - Separate concerns into modules
   - Use proper import/export
   - Implement barrel pattern (index.js)

3. **Error Handling**
   - Network errors
   - HTTP errors
   - Loading states
   - User feedback

4. **Advanced Features**
   - Filter todos (all/active/completed)
   - Search todos
   - Bulk actions (complete all, delete completed)
   - Persist filters to localStorage
   - Todo count/statistics

### Module Structure

```
/challenge-todo-app-with-api/
  ├── index.html
  ├── styles.css
  ├── api.js           - API calls
  ├── storage.js       - localStorage wrapper
  ├── ui.js            - DOM manipulation
  ├── utils.js         - Helper functions
  ├── state.js         - State management
  ├── app.js           - Main app logic
  └── README.md
```

### API Endpoints

Use JSONPlaceholder: `https://jsonplaceholder.typicode.com/todos`

- GET /todos - Fetch all todos
- GET /todos/:id - Fetch single todo
- POST /todos - Create todo
- PUT /todos/:id - Update todo
- DELETE /todos/:id - Delete todo

**Note:** JSONPlaceholder is a fake API - changes aren't persisted. Use localStorage to maintain state across reloads.

### UI Requirements

- Clean, modern interface
- Responsive design
- Loading indicators
- Error messages
- Empty states
- Keyboard shortcuts
- Accessibility (ARIA labels, keyboard navigation)

## 🎁 Bonus Features

1. **Offline Support**
   - Detect online/offline status
   - Queue failed requests
   - Retry when back online

2. **Optimistic Updates**
   - Update UI before API confirms
   - Rollback on failure

3. **Advanced Filtering**
   - Filter by date
   - Sort options
   - Tags/categories

4. **Export/Import**
   - Export todos to JSON
   - Import from JSON file

5. **Dark Mode**
   - Toggle theme
   - Persist preference

## 💡 Tips

### State Management
```javascript
// state.js
let state = {
  todos: [],
  filter: 'all',
  loading: false,
  error: null
};

export function getTodos() {
  return state.todos;
}

export function setTodos(todos) {
  state.todos = todos;
  render();
}
```

### API Module
```javascript
// api.js
const BASE_URL = 'https://jsonplaceholder.typicode.com';

export async function fetchTodos() {
  const response = await fetch(`${BASE_URL}/todos?_limit=20`);
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
}

export async function createTodo(todo) {
  const response = await fetch(`${BASE_URL}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo)
  });
  return response.json();
}
```

### Error Handling
```javascript
try {
  setLoading(true);
  const todos = await api.fetchTodos();
  setTodos(todos);
} catch (error) {
  showError(error.message);
} finally {
  setLoading(false);
}
```

## ✅ Success Criteria

- [ ] All CRUD operations work
- [ ] Code is organized into logical modules
- [ ] Proper error handling throughout
- [ ] Loading states for async operations
- [ ] Filters work correctly
- [ ] Data persists across page reloads
- [ ] Clean, responsive UI
- [ ] Accessible (keyboard + screen reader)
- [ ] No console errors
- [ ] Code is well-commented

## 🏆 Evaluation

### Basic (Pass)
- CRUD operations via API
- Module organization
- Basic error handling
- Simple UI

### Advanced (Excellent)
- All bonus features
- Optimistic updates
- Comprehensive error handling
- Beautiful, responsive UI
- Full accessibility
- Clean, maintainable code

## ⏱️ Estimated Time

2-3 hours

## 🚀 Getting Started

1. Create the module structure
2. Set up basic HTML/CSS
3. Implement API functions
4. Build state management
5. Create UI functions
6. Wire everything together in app.js
7. Add error handling
8. Implement advanced features
9. Test thoroughly

Good luck! 🎉

