# Exercise 14: Hoisting Comparison ⭐⭐

## 🎯 Objective

Understand how JavaScript hoists `var`, `let`, and `const` differently.

## 📝 Instructions

### Part 1: Demonstrate var Hoisting

Write code that:
1. Logs a variable BEFORE it's declared
2. Then declares it with `var`
3. Explain why it logs `undefined` instead of crashing

### Part 2: Demonstrate let/const Hoisting

Write code that:
1. Tries to log a variable BEFORE it's declared
2. Declares it with `let` or `const`
3. Explain why it throws a ReferenceError

### Part 3: Compare and Contrast

Show the difference side-by-side with detailed comments explaining what JavaScript is actually doing.

## 💡 Hints

1. JavaScript moves declarations to the top (hoisting)
2. `var` is hoisted and initialized to `undefined`
3. `let`/`const` are hoisted but NOT initialized (Temporal Dead Zone)
4. Use try/catch to demonstrate errors without crashing

## Expected Output

```js
// var example
console.log(name); // undefined (no error!)
var name = 'Alice';

// let example
console.log(age); // ReferenceError!
let age = 25;
```

## 🏆 Bonus Challenges

1. Show function declaration hoisting
2. Show function expression hoisting
3. Demonstrate block scope differences
4. Show the Temporal Dead Zone in action

## ✅ Solution

Check `solution.js` for detailed explanations and examples.


