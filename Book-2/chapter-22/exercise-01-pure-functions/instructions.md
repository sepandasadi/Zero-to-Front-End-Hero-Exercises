# Exercise 01: Pure Functions

## 🎯 Objective

Understand and write pure functions - the foundation of functional programming.

## 📚 What You'll Learn

- What makes a function pure
- Identify pure vs impure functions
- Benefits of purity (testability, predictability)
- Avoid side effects
- Referential transparency

## 📋 Tasks

### Task 1: Identify Pure vs Impure

Classify these functions as pure or impure:

```js
function add(a, b) {
  return a + b;
}

let total = 0;
function addToTotal(n) {
  total += n;
  return total;
}

function double(arr) {
  return arr.map(x => x * 2);
}

function doubleInPlace(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] *= 2;
  }
  return arr;
}
```

### Task 2: Convert Impure to Pure

Refactor these impure functions to be pure:

```js
// Impure: modifies global
let count = 0;
function increment() {
  count++;
  return count;
}

// Impure: mutates input
function addTax(product) {
  product.price = product.price * 1.08;
  return product;
}
```

### Task 3: Write Pure Functions

Create pure functions for:
1. Calculate area of rectangle
2. Filter even numbers from array
3. Capitalize first letter of string
4. Get full name from object
5. Calculate discount price

### Task 4: Test Pure Functions

Write simple tests proving functions are pure (same input always gives same output).

## ✅ Success Criteria

- Identify pure vs impure correctly
- Convert impure functions to pure
- Write testable pure functions
- Understand benefits of purity

## 💡 Hints

**Pure Function Rules:**
1. Same input → same output (deterministic)
2. No side effects (no mutations, no external state changes)
3. No reliance on external state

**[Start Coding →](./starter/script.js)**
