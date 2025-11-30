# Chapter 24: Functions and Scope - Exercises

Welcome to Chapter 24 exercises! Functions are the backbone of JavaScript—they're how you write organized, reusable, maintainable code. These exercises will take you from basic functions to advanced concepts like closures and the `this` keyword.

## 🎯 Learning Objectives

By completing these exercises, you will:

- Write functions with parameters and return values
- Use arrow functions effectively
- Understand and work with scope (global, function, block)
- Master closures for private state
- Use default and rest parameters
- Understand the `this` keyword in different contexts
- Write clean, reusable functions

---

## 📚 Exercise Overview

### Exercise 1: Basic Functions ⭐
**Difficulty:** Beginner
**Time:** 30-40 minutes
**Focus:** Function declarations, parameters, return values

Build a solid foundation by creating functions that accept parameters and return values. Learn the difference between logging and returning.

**Skills practiced:**
- Function declarations
- Parameters and arguments
- Return values vs console.log
- Calling functions
- Basic function composition

---

### Exercise 2: Arrow Functions ⭐⭐
**Difficulty:** Beginner-Intermediate
**Time:** 30-40 minutes
**Focus:** Modern ES6+ arrow function syntax

Master the modern way to write functions. Learn when to use arrow functions vs regular functions, and practice implicit returns.

**Skills practiced:**
- Arrow function syntax
- Implicit vs explicit returns
- Single vs multiple parameters
- When to use arrow functions
- Converting between function styles

---

### Exercise 3: Scope Practice ⭐⭐
**Difficulty:** Intermediate
**Time:** 40-50 minutes
**Focus:** Understanding variable scope

Explore global, function, and block scope. Learn why variables are accessible in some places but not others, and practice writing code that respects scope boundaries.

**Skills practiced:**
- Global vs local scope
- Function scope
- Block scope with let and const
- Variable shadowing
- Scope chain

---

### Exercise 4: Closures ⭐⭐⭐
**Difficulty:** Intermediate-Advanced
**Time:** 50-60 minutes
**Focus:** Functions that remember

Master one of JavaScript's most powerful features. Create functions that maintain private state, build function factories, and understand how closures work under the hood.

**Skills practiced:**
- Creating closures
- Private variables
- Function factories
- Counter patterns
- Practical closure applications

---

### Challenge: Advanced Function Patterns ⭐⭐⭐⭐
**Difficulty:** Advanced
**Time:** 1-2 hours
**Focus:** Combining all concepts

Build a complete module using everything you've learned. Create a shopping cart with private state, helper functions, and clean public API.

**Skills practiced:**
- Module pattern with closures
- Public vs private methods
- Default and rest parameters
- Arrow functions in context
- The `this` keyword
- Clean API design

---

## 🚀 Getting Started

### Prerequisites

Make sure you've completed:
- Chapter 23 exercises (JavaScript Fundamentals)
- Understand variables, data types, and conditionals
- Know how to use console.log() for testing

### How to Work Through These Exercises

1. **Read the instructions carefully** - Each exercise builds on previous concepts
2. **Start with the starter code** - Templates are provided to guide you
3. **Test frequently** - Run your code after each function
4. **Try before looking at solutions** - Struggle is part of learning
5. **Study the solutions** - Compare approaches and learn new techniques

### Testing Your Code

**For all exercises:**
1. Create an HTML file that links to your JavaScript
2. Open the HTML in a browser
3. Open the console (F12 or Cmd+Option+I)
4. Watch for output and errors
5. Fix issues and re-test

**Or use Node.js:**
```bash
node script.js
```

---

## 💡 Functions Quick Reference

### Function Declaration

```js
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet("Alice"));  // Hello, Alice!
```

### Function Expression

```js
const greet = function(name) {
  return `Hello, ${name}!`;
};
```

### Arrow Function

```js
// Full syntax
const greet = (name) => {
  return `Hello, ${name}!`;
};

// Concise syntax (implicit return)
const greet = name => `Hello, ${name}!`;
```

### Parameters and Arguments

```js
// Parameters: defined when creating function
function add(a, b) {
  return a + b;
}

// Arguments: actual values passed when calling
add(5, 3);  // 5 and 3 are arguments
```

### Default Parameters

```js
function greet(name = "Guest") {
  return `Hello, ${name}!`;
}

greet();         // Hello, Guest!
greet("Alice");  // Hello, Alice!
```

### Rest Parameters

```js
function sum(...numbers) {
  let total = 0;
  for (const num of numbers) {
    total += num;
  }
  return total;
}

sum(1, 2, 3);     // 6
sum(1, 2, 3, 4);  // 10
```

### Return vs Console.log

```js
// Console.log just prints - no value returned
function addAndLog(a, b) {
  console.log(a + b);  // Prints but returns undefined
}

const result = addAndLog(5, 3);
console.log(result);  // undefined

// Return sends value back
function addAndReturn(a, b) {
  return a + b;  // Returns the value
}

const result2 = addAndReturn(5, 3);
console.log(result2);  // 8
```

---

## 🔍 Scope Quick Reference

### Global Scope

```js
const name = "Alice";  // Global - accessible everywhere

function greet() {
  console.log(name);  // Can access global
}
```

### Function Scope

```js
function test() {
  const age = 25;  // Function scope
  console.log(age);  // Works here
}

console.log(age);  // Error! Not accessible outside
```

### Block Scope

```js
if (true) {
  const message = "Hello";  // Block scope
  console.log(message);     // Works here
}

console.log(message);  // Error! Not accessible outside
```

### Variable Shadowing

```js
const x = 10;  // Outer

function test() {
  const x = 20;  // Inner (shadows outer)
  console.log(x);  // 20
}

test();  // 20
console.log(x);  // 10 (outer unchanged)
```

---

## 🎒 Closures Quick Reference

### Basic Closure

```js
function createCounter() {
  let count = 0;  // Private variable

  return function() {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter());  // 1
console.log(counter());  // 2
console.log(counter());  // 3
```

### Closure with Multiple Functions

```js
function createWallet() {
  let balance = 0;  // Private

  return {
    deposit: function(amount) {
      balance += amount;
      return balance;
    },
    withdraw: function(amount) {
      balance -= amount;
      return balance;
    },
    getBalance: function() {
      return balance;
    }
  };
}

const wallet = createWallet();
wallet.deposit(100);  // 100
wallet.withdraw(30);  // 70
```

---

## 🐛 Common Mistakes and Solutions

### 1. Forgetting to Return

```js
// ❌ Wrong
function double(num) {
  num * 2;  // No return!
}

// ✅ Correct
function double(num) {
  return num * 2;
}
```

### 2. Calling Function vs. Referencing It

```js
function sayHi() {
  return "Hi!";
}

console.log(sayHi);    // [Function: sayHi] (reference)
console.log(sayHi());  // Hi! (calling it)
```

### 3. Arrow Function Braces

```js
// ❌ Wrong - forgot return
const double = num => { num * 2 };

// ✅ Correct - implicit return (no braces)
const double = num => num * 2;

// ✅ Correct - explicit return (with braces)
const double = num => { return num * 2; };
```

### 4. Modifying Global State

```js
// ⚠️ Bad - modifies global
let total = 0;
function addToTotal(num) {
  total += num;  // Side effect
}

// ✅ Better - pure function
function add(a, b) {
  return a + b;  // No side effects
}
```

### 5. `this` Context Loss

```js
const user = {
  name: "Alice",
  greet: function() {
    console.log(`Hi, ${this.name}`);
  }
};

user.greet();  // Hi, Alice (this = user)

const greet = user.greet;
greet();  // Hi, undefined (this is lost!)

// Fix with arrow function or bind
const greetBound = user.greet.bind(user);
greetBound();  // Hi, Alice
```

---

## 📊 When to Use Each Function Type

### Use Regular Functions When:

- Creating object methods that use `this`
- Need function hoisting
- Writing functions that will be called as constructors
- Prefer explicit syntax for learning

```js
const user = {
  name: "Alice",
  greet: function() {
    console.log(`Hi, ${this.name}`);  // this = user
  }
};
```

### Use Arrow Functions When:

- Writing short, simple functions
- Using as callbacks (array methods, setTimeout)
- Need `this` to be inherited from parent scope
- Want concise syntax

```js
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);  // Clean!
```

---

## ✅ Completion Checklist

Track your progress:

- [ ] Complete Exercise 1: Basic Functions
- [ ] Complete Exercise 2: Arrow Functions
- [ ] Complete Exercise 3: Scope Practice
- [ ] Complete Exercise 4: Closures
- [ ] Complete the Challenge
- [ ] Finish the chapter quiz
- [ ] Review all solutions
- [ ] Build your own function examples

---

## 🎓 Best Practices

### 1. One Function, One Purpose

```js
// ❌ Function does too much
function processUser(user) {
  // validate
  // save
  // send email
  // update UI
}

// ✅ Each function does one thing
function validateUser(user) { ... }
function saveUser(user) { ... }
function sendEmail(user) { ... }
```

### 2. Descriptive Function Names

```js
// ❌ Unclear
function calc(x, y) { return x * y * 0.08; }

// ✅ Clear
function calculateSalesTax(price, quantity) {
  return price * quantity * 0.08;
}
```

### 3. Limit Parameters

```js
// ❌ Too many parameters
function createUser(name, email, age, role, active, verified) { ... }

// ✅ Use an object
function createUser({ name, email, age, role }) { ... }

createUser({
  name: "Alice",
  email: "alice@example.com",
  age: 25,
  role: "admin"
});
```

### 4. Return Early

```js
function divide(a, b) {
  // Handle edge case first
  if (b === 0) {
    return "Cannot divide by zero";
  }

  // Main logic
  return a / b;
}
```

### 5. Write Pure Functions When Possible

```js
// ✅ Pure - same input always gives same output
function add(a, b) {
  return a + b;
}

// ⚠️ Impure - depends on external state
let total = 0;
function addToTotal(num) {
  total += num;  // Side effect
  return total;
}
```

---

## 🌟 After Completing These Exercises

### You'll Be Able To:

- Write functions that solve real problems
- Organize code into reusable chunks
- Understand how scope and closures work
- Use arrow functions confidently
- Create modules with private state
- Debug function-related issues
- Write clean, maintainable code

### Next Steps:

1. **Build your own functions library** - Utilities you use often
2. **Refactor old code** - Turn repeated code into functions
3. **Explore array methods** - map, filter, reduce (all use functions!)
4. **Practice closures** - Build counters, timers, caches
5. **Read other people's code** - See how they structure functions

---

## 📖 Additional Resources

**Documentation:**
- [MDN: Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)
- [MDN: Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
- [MDN: Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)

**Practice:**
- [JavaScript.info: Functions](https://javascript.info/function-basics)
- [Eloquent JavaScript: Functions](https://eloquentjavascript.net/03_functions.html)

---

## 💪 You're Ready!

Functions are what separate people who know some JavaScript from people who can actually build things with it. By mastering functions, you're joining the ranks of real developers.

**Every line of code you write from now on will use functions.** They're not optional—they're essential.

**Start with Exercise 1 and let's build!** 🚀

---

**Questions?** Review Chapter 24, check the quick reference above, or dive into the exercises and learn by doing! Remember: struggling is learning!

