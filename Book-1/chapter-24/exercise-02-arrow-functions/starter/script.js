/**
 * Exercise 02: Arrow Functions
 *
 * Master modern arrow function syntax
 */

// ======================
// TASK 1: BASIC ARROW FUNCTIONS
// ======================

// TODO: Convert these to arrow functions (full syntax with braces)


// TODO: Convert these to arrow functions (concise syntax - implicit return)


// Test Task 1
console.log("=== TASK 1: BASIC ARROW FUNCTIONS ===");
// console.log(greet("Alice"));
// console.log(double(5));
// console.log(add(3, 7));


// ======================
// TASK 2: IMPLICIT RETURNS
// ======================

// TODO: Create these arrow functions with implicit returns (one-liners!)

// square(num) - Returns num squared


// isPositive(num) - Returns true if num > 0


// getFirstChar(str) - Returns first character


// multiply(a, b) - Returns product


// Test Task 2
console.log("\n=== TASK 2: IMPLICIT RETURNS ===");
// console.log(square(5));
// console.log(isPositive(-3));
// console.log(isPositive(10));
// console.log(getFirstChar("JavaScript"));
// console.log(multiply(4, 5));


// ======================
// TASK 3: ARRAY METHODS WITH ARROW FUNCTIONS
// ======================

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// TODO: Use map() to double each number
const doubled = null;

// TODO: Use filter() to get only even numbers
const evens = null;

// TODO: Use filter() to get numbers greater than 5
const greaterThanFive = null;

// TODO: Use map() to square each number
const squared = null;

// TODO: Use reduce() to sum all numbers
const sum = null;

// Test Task 3
console.log("\n=== TASK 3: ARRAY METHODS ===");
// console.log("Doubled:", doubled);
// console.log("Evens:", evens);
// console.log("Greater than 5:", greaterThanFive);
// console.log("Squared:", squared);
// console.log("Sum:", sum);


// ======================
// TASK 4: OBJECTS AND ARROW FUNCTIONS
// ======================

const users = [
  { name: "Alice", age: 25, active: true },
  { name: "Bob", age: 30, active: false },
  { name: "Charlie", age: 35, active: true },
  { name: "David", age: 28, active: true }
];

// TODO: Use map() to get array of names
const names = null;

// TODO: Use filter() to get only active users
const activeUsers = null;

// TODO: Use filter() to get users 30 or older
const thirtyPlus = null;

// TODO: Use find() to get user named "Bob"
const bob = null;

// TODO: Use some() to check if any user is inactive
const hasInactive = null;

// TODO: Use every() to check if all users are 18+
const allAdults = null;

// Test Task 4
console.log("\n=== TASK 4: OBJECTS ===");
// console.log("Names:", names);
// console.log("Active Users:", activeUsers);
// console.log("30+:", thirtyPlus);
// console.log("Bob:", bob);
// console.log("Has Inactive?", hasInactive);
// console.log("All Adults?", allAdults);


// ======================
// TASK 5: RETURNING OBJECTS
// ======================

// TODO: createUser(name, age)
// Returns { name, age }
// Use implicit return - wrap object in parentheses!


// TODO: createProduct(name, price)
// Returns { name, price, inStock: true }


// TODO: formatUser(user)
// Returns { fullName: user.name, years: user.age }


// Test Task 5
console.log("\n=== TASK 5: RETURNING OBJECTS ===");
// console.log(createUser("Alice", 25));
// console.log(createProduct("Laptop", 999));
// console.log(formatUser({ name: "Bob", age: 30 }));


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

// TODO: Get expensive electronics (electronics with price > 600)
// Filter electronics, filter price > 600, map to names
const expensiveElectronics = null;

// TODO: Calculate clothing total
// Filter clothing, map to prices, reduce to sum
const clothingTotal = null;

// TODO: Format all products
// Map to { name, formattedPrice: "$XXX.XX" }
const formattedProducts = null;

// Test Task 6
console.log("\n=== TASK 6: CHAINING ===");
// console.log("Expensive Electronics:", expensiveElectronics);
// console.log("Clothing Total:", clothingTotal);
// console.log("Formatted Products:", formattedProducts);


// ======================
// BONUS CHALLENGES (Optional)
// ======================

// Bonus 1: Advanced Transformations
const employees = [
  { name: "Alice", dept: "Engineering", salary: 90000 },
  { name: "Bob", dept: "Sales", salary: 70000 },
  { name: "Charlie", dept: "Engineering", salary: 95000 }
];

// TODO: Get average engineering salary
// TODO: Get employee with highest salary
// TODO: Give everyone 10% raise


// Bonus 2: Shopping Cart
const cart = [
  { item: "Laptop", price: 1000, qty: 1 },
  { item: "Mouse", price: 25, qty: 2 },
  { item: "Keyboard", price: 75, qty: 1 }
];

// TODO: Calculate total (price * qty)
// TODO: Apply 10% discount if total > 100
// TODO: Add $10 shipping if total < 50
// TODO: Format as "$XXX.XX"

