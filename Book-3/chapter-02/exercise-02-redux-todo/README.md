# Exercise 2: Redux Toolkit Todo App

## 🎯 Objective

Build a feature-rich todo application using Redux Toolkit. Master slices, actions, reducers, and the modern Redux approach.

## 📚 Concepts Covered

- Redux Toolkit setup with `configureStore`
- Creating slices with `createSlice`
- Actions and reducers
- `useSelector` and `useDispatch` hooks
- Immutable updates with Immer
- Redux DevTools integration

## 🎨 What You'll Build

A complete todo app with:
- ✅ Add/remove todos
- ✅ Toggle completion
- ✅ Filter (all/active/completed)
- ✅ Statistics (total, active, completed)
- ✅ Clear completed
- ✅ Edit todo text
- ✅ Redux DevTools support

## 📋 Requirements

**Redux Setup:**
- Create store with `configureStore`
- Create `todosSlice` with initial state
- Export actions and reducer

**Actions:**
- `addTodo(text)` - Add new todo
- `toggleTodo(id)` - Toggle completion
- `removeTodo(id)` - Delete todo
- `editTodo(id, text)` - Edit text
- `clearCompleted()` - Remove completed
- `setFilter(filter)` - Set active filter

**Selectors:**
- `selectAllTodos` - All todos
- `selectFilteredTodos` - Based on current filter
- `selectStats` - Todo statistics

**Components:**
- TodoList - Display filtered todos
- TodoItem - Single todo with actions
- AddTodoForm - Input to add todos
- FilterButtons - All/Active/Completed
- TodoStats - Show statistics

## 💡 Key Implementation

```jsx
// store/todosSlice.js
import { createSlice } from '@reduxjs/toolkit';

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    filter: 'all'
  },
  reducers: {
    addTodo(state, action) {
      // Immer allows "mutations"!
      state.items.push({
        id: Date.now(),
        text: action.payload,
        completed: false
      });
    },
    toggleTodo(state, action) {
      const todo = state.items.find(t => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    }
    // ... more reducers
  }
});
```

**Estimated Time:** 60-90 minutes

[View Hints](./hints.md) | [← Back](../README.md)

