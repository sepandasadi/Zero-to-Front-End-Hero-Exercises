/**
 * Exercise 02: Arrow Functions - SOLUTION
 *
 * Master modern arrow function syntax
 */

// ======================
// TASK 1: BASIC ARROW FUNCTIONS
// ======================

// Full syntax (with braces and return)
const greetFull = (name) => {
  return `Hello, ${name}!`;
};

const doubleFull = (num) => {
  return num * 2;
};

const addFull = (a, b) => {
  return a + b;
};

// Concise syntax (implicit return)
const greet = name => `Hello, ${name}!`;
const double = num => num * 2;
const add = (a, b) => a + b;

// Test Task 1
console.log("=== TASK 1: BASIC ARROW FUNCTIONS ===");
console.log(greet("Alice"));  // Hello, Alice!
console.log(double(5));       // 10
console.log(add(3, 7));       // 10


// ======================
// TASK 2: IMPLICIT RETURNS
// ======================

const square = num => num * num;
const isPositive = num => num > 0;
const getFirstChar = str => str[0];
const multiply = (a, b) => a * b;

// Test Task 2
console.log("\n=== TASK 2: IMPLICIT RETURNS ===");
console.log(square(5));                 // 25
console.log(isPositive(-3));            // false
console.log(isPositive(10));            // true
console.log(getFirstChar("JavaScript")); // J
console.log(multiply(4, 5));            // 20


// ======================
// TASK 3: ARRAY METHODS WITH ARROW FUNCTIONS
// ======================

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Double each number
const doubled = numbers.map(num => num * 2);

// Get only even numbers
const evens = numbers.filter(num => num % 2 === 0);

// Get numbers greater than 5
const greaterThanFive = numbers.filter(num => num > 5);

// Square each number
const squared = numbers.map(num => num * num);

// Sum all numbers
const sum = numbers.reduce((total, num) => total + num, 0);

// Test Task 3
console.log("\n=== TASK 3: ARRAY METHODS ===");
console.log("Doubled:", doubled);               // [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
console.log("Evens:", evens);                   // [2, 4, 6, 8, 10]
console.log("Greater than 5:", greaterThanFive); // [6, 7, 8, 9, 10]
console.log("Squared:", squared);               // [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
console.log("Sum:", sum);                       // 55


// ======================
// TASK 4: OBJECTS AND ARROW FUNCTIONS
// ======================

const users = [
  { name: "Alice", age: 25, active: true },
  { name: "Bob", age: 30, active: false },
  { name: "Charlie", age: 35, active: true },
  { name: "David", age: 28, active: true }
];

// Get array of names
const names = users.map(user => user.name);

// Get only active users
const activeUsers = users.filter(user => user.active);

// Get users 30 or older
const thirtyPlus = users.filter(user => user.age >= 30);

// Find user named "Bob"
const bob = users.find(user => user.name === "Bob");

// Check if any user is inactive
const hasInactive = users.some(user => !user.active);

// Check if all users are 18+
const allAdults = users.every(user => user.age >= 18);

// Test Task 4
console.log("\n=== TASK 4: OBJECTS ===");
console.log("Names:", names);           // ["Alice", "Bob", "Charlie", "David"]
console.log("Active Users:", activeUsers); // [Alice, Charlie, David]
console.log("30+:", thirtyPlus);        // [Bob, Charlie]
console.log("Bob:", bob);               // { name: "Bob", age: 30, active: false }
console.log("Has Inactive?", hasInactive); // true
console.log("All Adults?", allAdults);  // true


// ======================
// TASK 5: RETURNING OBJECTS
// ======================

// Important: Wrap objects in parentheses for implicit return!
const createUser = (name, age) => ({ name, age });

const createProduct = (name, price) => ({ name, price, inStock: true });

const formatUser = user => ({ fullName: user.name, years: user.age });

// Test Task 5
console.log("\n=== TASK 5: RETURNING OBJECTS ===");
console.log(createUser("Alice", 25));
// { name: "Alice", age: 25 }

console.log(createProduct("Laptop", 999));
// { name: "Laptop", price: 999, inStock: true }

console.log(formatUser({ name: "Bob", age: 30 }));
// { fullName: "Bob", years: 30 }


// ======================
// TASK 6: CHAINING ARRAY METHODS
// ======================

const products = [
  { name: "Laptop", price: 1000, category: "electronics" },
  { name: "Phone", price: 500, category: "electronics" },
  { name: "Shirt", price: 30, category: "clothing" },
  { name: "Shoes", price: 80, category: "clothing" },
  { name: "Watch", price: 200, category: "accessories" }
];

// Get expensive electronics (electronics with price > 600)
const expensiveElectronics = products
  .filter(p => p.category === "electronics")
  .filter(p => p.price > 600)
  .map(p => p.name);

// Calculate clothing total
const clothingTotal = products
  .filter(p => p.category === "clothing")
  .map(p => p.price)
  .reduce((sum, price) => sum + price, 0);

// Format all products
const formattedProducts = products.map(p => ({
  name: p.name,
  formattedPrice: `$${p.price.toFixed(2)}`
}));

// Test Task 6
console.log("\n=== TASK 6: CHAINING ===");
console.log("Expensive Electronics:", expensiveElectronics);  // ["Laptop"]
console.log("Clothing Total:", clothingTotal);                // 110
console.log("Formatted Products:", formattedProducts);


// ======================
// BONUS CHALLENGES
// ======================

console.log("\n=== BONUS CHALLENGES ===");

// Bonus 1: Advanced Transformations
const employees = [
  { name: "Alice", dept: "Engineering", salary: 90000 },
  { name: "Bob", dept: "Sales", salary: 70000 },
  { name: "Charlie", dept: "Engineering", salary: 95000 }
];

// Average engineering salary
const avgEngSalary = employees
  .filter(e => e.dept === "Engineering")
  .map(e => e.salary)
  .reduce((sum, salary, _, arr) => sum + salary / arr.length, 0);

console.log("Avg Engineering Salary:", avgEngSalary);  // 92500

// Employee with highest salary
const highestPaid = employees.reduce((max, emp) =>
  emp.salary > max.salary ? emp : max
);

console.log("Highest Paid:", highestPaid);  // Charlie

// Give everyone 10% raise
const raisedSalaries = employees.map(e => ({
  ...e,
  salary: e.salary * 1.10
}));

console.log("After Raises:", raisedSalaries);

// Group by department
const byDept = employees.reduce((acc, emp) => {
  if (!acc[emp.dept]) {
    acc[emp.dept] = [];
  }
  acc[emp.dept].push(emp);
  return acc;
}, {});

console.log("By Department:", byDept);


// Bonus 2: Shopping Cart
const cart = [
  { item: "Laptop", price: 1000, qty: 1 },
  { item: "Mouse", price: 25, qty: 2 },
  { item: "Keyboard", price: 75, qty: 1 }
];

const calculateTotal = cart => {
  // Calculate subtotal
  let total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  // Apply discount if > 100
  if (total > 100) {
    total *= 0.9;  // 10% off
  }

  // Add shipping if < 50
  if (total < 50) {
    total += 10;
  }

  return `$${total.toFixed(2)}`;
};

console.log("\nCart Total:", calculateTotal(cart));  // $981.00


// ======================
// KEY TAKEAWAYS
// ======================

/*
 * ARROW FUNCTION SYNTAX:
 *
 * No params:     () => value
 * One param:     param => value  (parens optional)
 * Multi params:  (a, b) => value
 *
 * Implicit return: param => value
 * Explicit return: param => { return value; }
 *
 * Returning object: param => ({ key: value })
 *                            ^parentheses needed!
 *
 * WHEN TO USE:
 * ✅ Array methods (map, filter, reduce)
 * ✅ Callbacks (setTimeout, event handlers)
 * ✅ Short utility functions
 * ✅ Functions that don't need 'this'
 *
 * WHEN NOT TO USE:
 * ❌ Object methods that use 'this'
 * ❌ Functions called with 'new'
 * ❌ When you need 'arguments' object
 */

