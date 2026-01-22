// Exercise 03: Function Composition - STARTER

console.log("=== Exercise 3: Function Composition ===\n");

// Task 1: Manual Composition
console.log("--- Task 1: Manual Composition ---");

const add5 = x => x + 5;
const multiply2 = x => x * 2;
const square = x => x ** 2;

// TODO: Compose manually - multiply2(add5(10))
// TODO: Multiple levels - square(multiply2(add5(3)))

// Task 2: Build compose() Utility
console.log("\n--- Task 2: compose() Utility ---");

// TODO: Create compose function that applies functions right-to-left
// const compose = (...fns) => x => ???

// Task 3: Build pipe() Utility
console.log("\n--- Task 3: pipe() Utility ---");

// TODO: Create pipe function that applies functions left-to-right
// const pipe = (...fns) => x => ???

// Task 4: Point-Free Style
console.log("\n--- Task 4: Point-Free Style ---");

const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 }
];

// TODO: Rewrite in point-free style
// const map = fn => arr => ???
// const prop = key => obj => ???

// Task 5: Data Pipeline
console.log("\n--- Task 5: Data Pipeline ---");

const products = [
  { name: 'Laptop', price: 1000, category: 'electronics' },
  { name: 'Phone', price: 500, category: 'electronics' },
  { name: 'Desk', price: 300, category: 'furniture' },
  { name: 'Chair', price: 200, category: 'furniture' }
];

// TODO: Build pipeline to:
// 1. Filter electronics
// 2. Map to prices
// 3. Sum total

// Task 6: Currying
console.log("\n--- Task 6: Currying ---");

// TODO: Create curried multiply function
// const multiply = a => ???

// TODO: Create curry utility function
// function curry(fn) { ??? }
