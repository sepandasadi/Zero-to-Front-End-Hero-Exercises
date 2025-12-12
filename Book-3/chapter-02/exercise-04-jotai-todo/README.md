# Exercise 4: Jotai Todo with Derived State

## 🎯 Objective

Build a todo list using Jotai's atomic state management. Master atoms, derived atoms, and fine-grained reactivity.

## 📚 Concepts Covered

- Creating atoms with `atom()`
- Derived/computed atoms
- `useAtom` hook
- Atom families
- Optimized re-renders

## 🎨 What You'll Build

A todo app demonstrating Jotai's power:
- 📝 Base atoms for todos
- 📊 Derived atoms for stats
- 🔍 Computed filtered lists
- ⚡ Ultra-fast re-renders
- 🎯 Granular subscriptions

## 📋 Atom Structure

```jsx
// Base atoms
const todosAtom = atom([]);
const filterAtom = atom('all'); // 'all' | 'active' | 'completed'

// Derived atoms
const filteredTodosAtom = atom((get) => {
  const todos = get(todosAtom);
  const filter = get(filterAtom);
  // Compute filtered list
});

const statsAtom = atom((get) => {
  const todos = get(todosAtom);
  return {
    total: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length
  };
});
```

## 💡 Key Benefits

**Granular Updates:**
- Only components using specific atoms re-render
- No Context re-render storms
- Better performance than Context

**Composability:**
```jsx
// Atoms can depend on other atoms!
const doubledAtom = atom((get) => get(countAtom) * 2);
```

**Estimated Time:** 45-60 minutes

[View Hints](./hints.md) | [← Back](../README.md)

