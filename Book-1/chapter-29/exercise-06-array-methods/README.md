# Exercise 6: Array Higher-Order Functions ⭐⭐

## 🎯 Objective

Master the "Big Three" array methods: `map`, `filter`, and `reduce`.

## 📝 Instructions

Given the array:

```js
const nums = [1, 2, 3, 4, 5];
```

Complete these tasks:

### Task 1: Map
Create a new array of squares using `map`.

**Expected:** `[1, 4, 9, 16, 25]`

### Task 2: Filter
Create a new array of even numbers using `filter`.

**Expected:** `[2, 4]`

### Task 3: Reduce
Compute the sum of all numbers using `reduce`.

**Expected:** `15`

### Task 4: Method Chaining
Combine all three: Filter even numbers, square them, then sum them.

**Expected:** `20` (2² + 4² = 4 + 16 = 20)

## 💡 Hints

1. **map:** Transforms each element → `arr.map(num => num * num)`
2. **filter:** Keeps elements that pass a test → `arr.filter(num => num % 2 === 0)`
3. **reduce:** Combines all elements into one value → `arr.reduce((sum, num) => sum + num, 0)`
4. **Chaining:** Call methods one after another → `arr.filter(...).map(...).reduce(...)`

## 🏆 Bonus Challenges

1. **Double and Sum:** Double all numbers and sum them
2. **Remove Odds, Triple:** Filter out odd numbers, triple the rest
3. **Find Max:** Use reduce to find the largest number
4. **Average:** Calculate the average of all numbers
5. **Real Data:** Work with an array of objects (users, products, etc.)

## ✅ Solution

Check `solution.js` for detailed solutions and explanations.


