// Exercise 04: Higher-Order Functions - STARTER

console.log("=== Exercise 4: Higher-Order Functions ===\n");

// Task 1: Functions Returning Functions
console.log("--- Task 1: Functions Returning Functions ---");

// TODO: Create createMultiplier that returns a function
// const createMultiplier = factor => ???
// const double = createMultiplier(2);
// const triple = createMultiplier(3);

// Task 2: Functions Taking Functions
console.log("\n--- Task 2: Functions Taking Functions ---");

// TODO: Create withLogging that wraps a function with logging
// const withLogging = fn => (...args) => { ??? };

// Task 3: Array HOF Mastery
console.log("\n--- Task 3: Array HOF Mastery ---");

const users = [
  { name: 'Alice', age: 25, city: 'NYC', score: 85 },
  { name: 'Bob', age: 30, city: 'LA', score: 92 },
  { name: 'Charlie', age: 25, city: 'NYC', score: 78 }
];

// TODO: Chain map/filter/reduce
// TODO: Group users by city
// TODO: Calculate average score

// Task 4: Custom HOFs
console.log("\n--- Task 4: Custom HOFs ---");

// TODO: Build retry(fn, times) - retry failed operations
// TODO: Build memoize(fn) - cache function results
// TODO: Build debounce(fn, ms) - delay execution
// TODO: Build throttle(fn, ms) - limit call rate

// Task 5: Compose HOFs
console.log("\n--- Task 5: Compose HOFs ---");

// TODO: Combine multiple HOFs
