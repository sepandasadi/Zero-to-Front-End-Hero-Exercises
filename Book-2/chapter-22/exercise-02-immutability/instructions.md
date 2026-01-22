# Exercise 02: Immutability Patterns

## 🎯 Objective

Learn to write code that never mutates data. Master immutable updates using modern JavaScript methods.

## 📋 Tasks

### Task 1: Identify Mutations
Classify as mutable or immutable:
```js
arr.push(item)           // ?
arr = [...arr, item]     // ?
obj.prop = value         // ?
obj = { ...obj, prop }   // ?
```

### Task 2: Immutable Array Updates
Without mutation, implement:
- Add item to array
- Remove item at index
- Update item at index
- Sort array
- Reverse array

### Task 3: Immutable Object Updates
Without mutation:
- Add/update property
- Remove property
- Update nested property
- Merge objects

### Task 4: Immutable State Updates (React-style)
```js
const state = {
  user: { name: 'Alice', age: 25 },
  cart: [{ id: 1, qty: 2 }],
  settings: { theme: 'dark' }
};
```

Update user age, add cart item, change theme - all immutably!

### Task 5: Using Array Methods
Use map, filter, reduce (all return new arrays):
- Transform array of numbers
- Filter and transform
- Build object from array
- Flatten nested arrays

### Task 6: Why Immutability?
- Predictable state changes
- Time-travel debugging
- Performance optimization (React)
- Easier testing
- Prevents bugs

## ✅ Success Criteria
- Never use mutating methods
- Create new arrays/objects
- Understand shallow vs deep copy
- Apply to real scenarios

## ⏱️ Estimated Time: 40-50 minutes

**[Start Coding →](./starter/script.js)**
