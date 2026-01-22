# Exercise 03: Function Composition

## 🎯 Objective

Learn to build complex functionality by composing small, focused functions.

## 📋 Tasks

### Task 1: Manual Composition
Compose functions manually:
```js
const add5 = x => x + 5;
const multiply2 = x => x * 2;
const result = multiply2(add5(10)); // 30
```

### Task 2: Build compose() Utility
Create a compose function:
```js
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
const process = compose(multiply2, add5);
process(10); // 30
```

### Task 3: Build pipe() Utility
Like compose but left-to-right:
```js
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
const process = pipe(add5, multiply2);
process(10); // 30
```

### Task 4: Point-Free Style
Write functions without mentioning arguments:
```js
const getNames = users => users.map(u => u.name);
// vs point-free:
const getNames = map(prop('name'));
```

### Task 5: Build Data Pipeline
Process array through composition:
- Filter → Map → Reduce
- Reusable pipeline functions

### Task 6: Partial Application & Currying
```js
const multiply = a => b => a * b;
const double = multiply(2);
double(5); // 10
```

## ⏱️ Estimated Time: 45-55 minutes

**[Start Coding →](./starter/script.js)**
