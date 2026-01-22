# Exercise 06: Declarative Programming

## 🎯 Objective

Learn to write declarative code that expresses WHAT you want, not HOW to do it.

## 📋 Tasks

### Task 1: Imperative vs Declarative
Rewrite imperative code declaratively:
```js
// Imperative
let doubled = [];
for (let i = 0; i < numbers.length; i++) {
  doubled.push(numbers[i] * 2);
}

// Declarative
const doubled = numbers.map(n => n * 2);
```

### Task 2: Reduce Patterns
Use reduce for:
- Sum/average
- Group by property
- Count occurrences
- Build lookup object
- Flatten arrays

### Task 3: Data Transformation Pipelines
Chain operations declaratively:
- Filter → Map → Reduce
- Multiple transformations
- Readable pipelines

### Task 4: Declarative DOM
```js
// Imperative
const div = document.createElement('div');
div.className = 'box';
div.textContent = 'Hello';

// Declarative
const createElement = (tag, attrs, children) => { ... };
```

## ⏱️ Estimated Time: 30-40 minutes

**[Start Coding →](./starter/script.js)**
