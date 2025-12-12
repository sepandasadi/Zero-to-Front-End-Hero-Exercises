# Exercise 4: Function as Argument ⭐

## 🎯 Objective

Create a function that accepts and calls another function.

## 📝 Instructions

Build a `repeat` function that takes a function and a number, then calls that function that many times.

### Requirements

```js
function repeat(fn, times) {
  // Your code here
}

repeat(() => console.log('Hello'), 3);
// Prints:
// Hello
// Hello
// Hello

repeat(() => console.log('*'.repeat(10)), 5);
// Prints 5 lines of asterisks
```

## 🎁 Bonus Challenges

1. Create a `forEach` function that mimics `Array.prototype.forEach`
2. Create a `filter` function that mimics `Array.prototype.filter`
3. Create a `map` function that mimics `Array.prototype.map`

## 💡 Hints

- Functions are just values in JavaScript
- You can pass them as arguments like any other value
- Call the function using `fn()` or `fn(argument)`

## ✅ Success Criteria

- `repeat` accepts a function and number
- Calls the function the correct number of times
- Works with any function

## 📚 Concepts Practiced

- Functions as first-class citizens
- Higher-order functions
- Callbacks

## ⏱️ Estimated Time

10 minutes

