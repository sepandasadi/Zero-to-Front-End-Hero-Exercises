# Exercise 1: Closure Counter ⭐

## 🎯 Objective

Learn how closures work by creating a counter with private state.

## 📝 Instructions

Create a function `makeCounter()` that:
1. Returns a function
2. Each time the returned function is called, it increments a private count
3. Logs the current count
4. The count should NOT be accessible from outside

### Requirements

- Use closures to create private state
- The count starts at 0
- Each call increments by 1
- Log the count each time

### Expected Behavior

```js
const counter = makeCounter();
counter(); // 1
counter(); // 2
counter(); // 3

// This should NOT work:
console.log(counter.count); // undefined
```

## 💡 Hints

1. Create a local variable inside `makeCounter()`
2. Return a function that can access that variable
3. The returned function will "remember" the variable (closure!)
4. Remember to increment THEN log

## 🏆 Bonus Challenges

1. Add a `reset()` method that sets count back to 0
2. Add a `getValue()` method that returns the current count
3. Add `increment(amount)` to increase by custom amounts
4. Create `makeCounter(start)` that begins at a custom value

## ✅ Solution

Once you've attempted the exercise, check the solution in `solution.js`.


