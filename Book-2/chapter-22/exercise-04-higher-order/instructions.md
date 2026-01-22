# Exercise 04: Higher-Order Functions

## 🎯 Objective

Master functions that take or return other functions - a fundamental FP concept.

## 📋 Tasks

### Task 1: Functions Returning Functions
```js
const createMultiplier = factor => number => number * factor;
const double = createMultiplier(2);
const triple = createMultiplier(3);
```

### Task 2: Functions Taking Functions
```js
const withLogging = fn => (...args) => {
  console.log('Calling:', fn.name);
  return fn(...args);
};
```

### Task 3: Array HOFs Mastery
Deep dive into map, filter, reduce:
- Chain multiple operations
- Build object from array
- Group by property
- Find patterns

### Task 4: Custom HOFs
Build your own:
- `retry(fn, times)` - Retry failed operations
- `memoize(fn)` - Cache function results
- `debounce(fn, ms)` - Delay execution
- `throttle(fn, ms)` - Limit call rate

### Task 5: Compose HOFs
Combine multiple HOFs:
```js
const loggedAndMemoized = compose(withLogging, memoize);
```

## ⏱️ Estimated Time: 35-45 minutes

**[Start Coding →](./starter/script.js)**
