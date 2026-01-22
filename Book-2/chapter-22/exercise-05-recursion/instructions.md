# Exercise 05: Recursion

## 🎯 Objective

Master recursive thinking - functions that call themselves to solve problems elegantly.

## 📋 Tasks

### Task 1: Basic Recursion
Implement:
- Factorial (n!)
- Fibonacci sequence
- Sum of array
- Count down from n

### Task 2: Base Cases
Understand why base cases prevent infinite loops:
```js
function factorial(n) {
  if (n <= 1) return 1;     // BASE CASE!
  return n * factorial(n-1); // RECURSIVE CASE
}
```

### Task 3: Array Recursion
Recursively:
- Find max in array
- Flatten nested arrays
- Reverse array
- Filter array

### Task 4: Object/Tree Traversal
Navigate nested structures:
- Deep clone object
- Find value in nested object
- Calculate total of nested numbers

### Task 5: String Recursion
- Reverse string
- Check palindrome
- Count vowels
- Generate permutations

### Task 6: Tail Call Optimization
Convert to tail-recursive:
```js
// Not tail recursive
const factorial = n => n <= 1 ? 1 : n * factorial(n - 1);

// Tail recursive
const factorial = (n, acc = 1) => 
  n <= 1 ? acc : factorial(n - 1, n * acc);
```

## ⏱️ Estimated Time: 40-50 minutes

**[Start Coding →](./starter/script.js)**
