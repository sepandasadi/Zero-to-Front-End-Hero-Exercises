# Exercise 3: Closures with Timers ⭐⭐

## 🎯 Objective

Master the classic closure pitfall with setTimeout and learn how to fix it.

## 📝 Instructions

### The Problem

This code has a bug. It should print 0, 1, 2, 3, 4 but doesn't:

```js
for (var i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}
// Prints: 5, 5, 5, 5, 5 (Wrong!)
```

### Your Tasks

1. **Explain the bug** - Why does it print 5 five times?
2. **Fix with IIFE** - Use an Immediately Invoked Function Expression
3. **Fix with let** - Use block scoping
4. **Fix with parameter** - Pass the value to setTimeout

## 🎁 Bonus Challenges

1. Create a countdown timer using closures
2. Build a function that schedules tasks with delays
3. Create a rate limiter using closures and setTimeout

## 💡 Hints

- The bug is about WHEN the console.log runs vs WHEN `i` is captured
- `var` has function scope, not block scope
- `let` creates a new binding for each iteration
- IIFEs create a new scope immediately

## ✅ Success Criteria

- Understand why the bug happens
- Fix it in at least 2 different ways
- Can explain the difference between `var` and `let` in loops

## 📚 Concepts Practiced

- Closures and scope
- Event loop and asynchronous code
- var vs let
- IIFEs

## ⏱️ Estimated Time

15-20 minutes

