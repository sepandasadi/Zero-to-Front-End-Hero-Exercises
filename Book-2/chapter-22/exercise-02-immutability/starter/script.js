// Exercise 02: Immutability Patterns - STARTER

console.log("=== Exercise 2: Immutability ===\n");

// Task 1: Identify which operations are mutable vs immutable
console.log("--- Task 1: Mutable vs Immutable ---");

const arr1 = [1, 2, 3];
// TODO: Try push (mutable) vs spread operator (immutable)

const obj1 = { a: 1 };
// TODO: Direct property assignment vs spread operator

// Task 2: Immutable Array Updates
console.log("\n--- Task 2: Immutable Array Updates ---");

const numbers = [1, 2, 3, 4, 5];

// TODO: Add item without mutating
// TODO: Remove item at index without mutating
// TODO: Update item at index without mutating
// TODO: Sort without mutating
// TODO: Reverse without mutating

// Task 3: Immutable Object Updates
console.log("\n--- Task 3: Immutable Object Updates ---");

const user = { name: 'Alice', age: 25, city: 'NYC' };

// TODO: Add property without mutating
// TODO: Remove property without mutating
// TODO: Update nested property without mutating

// Task 4: State Updates (React-style)
console.log("\n--- Task 4: State Updates ---");

const state = {
  user: { name: 'Alice', age: 25 },
  cart: [{ id: 1, qty: 2 }],
  settings: { theme: 'dark' }
};

// TODO: Update user age immutably
// TODO: Add cart item immutably
// TODO: Change theme immutably

// Task 5: Array Methods (All should be immutable!)
console.log("\n--- Task 5: Array Methods ---");

const nums = [1, 2, 3, 4, 5];

// TODO: Use map to double all numbers
// TODO: Use filter and map to get even numbers squared
// TODO: Use reduce to convert array to object
// TODO: Flatten nested arrays with reduce
