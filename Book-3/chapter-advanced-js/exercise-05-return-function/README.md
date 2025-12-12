# Exercise 5: Return a Function ⭐⭐

## 🎯 Objective

Build a power function factory that returns functions for specific powers.

## 📝 Instructions

Create a function called `createPower` that returns a new function that raises numbers to a specific power.

### Requirements

```js
const square = createPower(2);
const cube = createPower(3);
const toTheFourth = createPower(4);

console.log(square(5));      // 25 (5²)
console.log(cube(3));         // 27 (3³)
console.log(toTheFourth(2));  // 16 (2⁴)
```

## 🎁 Bonus Challenges

1. Create `createAdder(n)` that returns a function that adds n to any number
2. Create `createBetweenChecker(min, max)` that returns a function checking if a number is in range
3. Create `createFormatter(prefix, suffix)` that returns a formatting function

## 💡 Hints

- The outer function receives the configuration (power)
- The returned function uses that configuration
- This is a closure - the returned function remembers the power

## ✅ Success Criteria

- `createPower` returns a function
- Each returned function calculates the correct power
- Multiple power functions work independently

## 📚 Concepts Practiced

- Returning functions from functions
- Closures
- Function factories
- Higher-order functions

## ⏱️ Estimated Time

15 minutes

