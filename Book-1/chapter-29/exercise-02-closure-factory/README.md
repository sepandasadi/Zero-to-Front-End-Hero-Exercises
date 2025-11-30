# Exercise 2: Closure Factory ⭐

## 🎯 Objective

Build a function that creates preconfigured functions using closures.

## 📝 Instructions

Create a function called `createGreeter` that takes a greeting prefix and returns a new function that greets people with that prefix.

### Requirements

```js
const sayHello = createGreeter('Hello');
const sayHi = createGreeter('Hi');
const sayHowdy = createGreeter('Howdy');

console.log(sayHello('Alice'));  // "Hello, Alice!"
console.log(sayHi('Bob'));       // "Hi, Bob!"
console.log(sayHowdy('Charlie')); // "Howdy, Charlie!"
```

## 🎁 Bonus Challenges

1. Create a `createMultiplier` function that returns a function that multiplies by a specific number
2. Create a `createCounter` that creates independent counters with custom starting values
3. Create a `createValidator` that creates custom validation functions

## 💡 Hints

- The outer function receives and remembers the configuration
- The inner function uses the remembered configuration
- Each call to the factory creates a new closure with its own data

## ✅ Success Criteria

- `createGreeter` returns a new function
- Each greeter remembers its own prefix
- Multiple greeters work independently

## 📚 Concepts Practiced

- Function factories
- Closures
- Private variables
- Higher-order functions

## ⏱️ Estimated Time

10-15 minutes

