# Challenge: Functional Data Pipeline

## 🎯 Objective

Build a comprehensive data processing library using all functional programming concepts.

## 📚 Requirements

### Core Library Functions

Build reusable, composable functions:

**Transformers:**
- `map(fn)` - Transform each item
- `filter(predicate)` - Keep items matching condition
- `reduce(reducer, initial)` - Combine items
- `take(n)` - Take first n items
- `skip(n)` - Skip first n items
- `uniq()` - Remove duplicates
- `sortBy(key)` - Sort by property

**Combinators:**
- `pipe(...fns)` - Compose left-to-right
- `compose(...fns)` - Compose right-to-left

**Utilities:**
- `prop(key)` - Get property
- `pluck(key)` - Extract property from all
- `groupBy(key)` - Group by property
- `keyBy(key)` - Index by property

### Example Usage

```js
const users = [
  { name: 'Alice', age: 25, city: 'NYC', active: true },
  { name: 'Bob', age: 30, city: 'LA', active: false },
  { name: 'Charlie', age: 25, city: 'NYC', active: true }
];

// Process with pipeline
const result = pipe(
  filter(u => u.active),
  filter(u => u.age >= 25),
  sortBy('name'),
  pluck('name')
)(users);

// ['Alice', 'Charlie']
```

### Advanced Features (Bonus)

- Lazy evaluation
- Transducers
- Async pipelines
- Error handling in pipelines
- Type checking

## ✅ Success Criteria

- All functions are pure
- Functions are curried appropriately
- Compose/pipe work correctly
- Library is reusable
- Comprehensive tests
- Real-world examples

## ⏱️ Estimated Time: 3-4 hours

**[Start Coding →](./starter/script.js)**
