# Chapter 22: Functional Programming Patterns - Exercises

Learn functional programming principles that make code more predictable, testable, and maintainable.

## 📚 What You'll Practice

- Pure functions and side effects
- Immutability patterns
- Function composition
- Higher-order functions
- Recursion
- Declarative vs imperative code
- Data transformation pipelines

## 🎯 Learning Objectives

- Write pure, testable functions
- Avoid mutations for safer code
- Compose small functions into larger ones
- Use HOFs like map, filter, reduce effectively
- Solve problems recursively
- Think in transformations, not loops

---

## 📂 Exercises

### Exercise 1: Pure Functions ⭐⭐
**Time:** 30-40 minutes | **[Start](./exercise-01-pure-functions/)**

Identify pure vs impure, write pure functions, understand testability benefits.

### Exercise 2: Immutability Patterns ⭐⭐⭐
**Time:** 40-50 minutes | **[Start](./exercise-02-immutability/)**

Avoid mutations, use array methods, object spreading, immutable updates.

### Exercise 3: Function Composition ⭐⭐⭐
**Time:** 45-55 minutes | **[Start](./exercise-03-composition/)**

Build compose/pipe utilities, partial application, currying patterns.

### Exercise 4: Higher-Order Functions ⭐⭐
**Time:** 35-45 minutes | **[Start](./exercise-04-higher-order/)**

Functions returning functions, custom HOFs, mastering map/filter/reduce.

### Exercise 5: Recursion ⭐⭐⭐
**Time:** 40-50 minutes | **[Start](./exercise-05-recursion/)**

Base cases, recursive patterns, tree traversal, tail call optimization.

### Exercise 6: Declarative Programming ⭐⭐
**Time:** 30-40 minutes | **[Start](./exercise-06-declarative/)**

Imperative vs declarative, reduce patterns, data pipelines.

### Challenge: Data Pipeline ⭐⭐⭐⭐
**Time:** 3-4 hours | **[Start](./challenge-data-pipeline/)**

Build composable data processing library with lazy evaluation.

---

## 📝 Quiz
**[Take the Quiz](./quiz.md)**

---

## 📖 Quick Reference

```js
// Pure Function
const pure = (a, b) => a + b; // Always same output for same input

// Immutable Update
const newArr = [...arr, newItem];
const newObj = { ...obj, prop: newValue };

// Composition
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

// Higher-Order Function
const withLogging = (fn) => (...args) => {
  console.log('Calling', fn.name);
  return fn(...args);
};

// Recursion
const factorial = n => n <= 1 ? 1 : n * factorial(n - 1);
```

---

**Ready for FP?** [Start Exercise 1 →](./exercise-01-pure-functions/)

*Chapter 22 • Functional Programming • Edition 2*
