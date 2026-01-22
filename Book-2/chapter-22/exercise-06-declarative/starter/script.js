// Exercise 06: Declarative Programming - STARTER

console.log("=== Exercise 6: Declarative Programming ===\n");

// Task 1: Imperative vs Declarative
console.log("--- Task 1: Imperative vs Declarative ---");

const numbers = [1, 2, 3, 4, 5];

// Imperative (HOW)
let doubled = [];
for (let i = 0; i < numbers.length; i++) {
  doubled.push(numbers[i] * 2);
}
console.log('Imperative:', doubled);

// TODO: Rewrite declaratively (WHAT)
// const doubled = ???

// Task 2: Reduce Patterns
console.log("\n--- Task 2: Reduce Patterns ---");

const nums = [1, 2, 3, 4, 5];

// TODO: Calculate sum with reduce
// TODO: Calculate average with reduce
// TODO: Count occurrences: [1, 2, 2, 3, 3, 3] => {1: 1, 2: 2, 3: 3}
// TODO: Group by even/odd
// TODO: Flatten nested arrays

// Task 3: Data Transformation Pipelines
console.log("\n--- Task 3: Data Transformation Pipelines ---");

const users = [
  { name: 'Alice', age: 17, active: true },
  { name: 'Bob', age: 25, active: false },
  { name: 'Charlie', age: 30, active: true }
];

// TODO: Build pipeline: filter adults → filter active → map names → sort

// Task 4: Declarative DOM (bonus)
console.log("\n--- Task 4: Declarative DOM ---");

// TODO: Build createElement helper function
// const createElement = (tag, attrs, children) => { ??? };
