/**
 * Exercise 02: Array Methods
 *
 * Master map, filter, reduce, and method chaining
 */

// ======================
// TASK 1: USING MAP() - TRANSFORM DATA
// ======================

console.log("=== TASK 1: MAP() - TRANSFORM DATA ===");

// TODO: Double numbers [1, 2, 3, 4, 5] → [2, 4, 6, 8, 10]


// TODO: Format prices [19.99, 29.99, 49.99, 99.99] → ["$19.99", "$29.99", "$49.99", "$99.99"]


// TODO: Extract names from users
const users = [
  { name: "Alice", age: 28 },
  { name: "Bob", age: 35 },
  { name: "Charlie", age: 22 }
];


// TODO: Apply 20% discount [100, 200, 300, 400] → [80, 160, 240, 320]


// ======================
// TASK 2: USING FILTER() - SELECT ITEMS
// ======================

console.log("\n=== TASK 2: FILTER() - SELECT ITEMS ===");

// TODO: Get even numbers [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] → [2, 4, 6, 8, 10]


// TODO: Filter products under $100
const products = [
  { name: "Laptop", price: 999 },
  { name: "Mouse", price: 25 },
  { name: "Keyboard", price: 75 },
  { name: "Monitor", price: 350 }
];


// TODO: Get active users
const activeUsers = [
  { name: "Alice", active: true },
  { name: "Bob", active: false },
  { name: "Charlie", active: true }
];


// TODO: Filter by length ["hi", "hello", "hey", "goodbye"] → ["hello", "goodbye"]


// ======================
// TASK 3: USING REDUCE() - AGGREGATE DATA
// ======================

console.log("\n=== TASK 3: REDUCE() - AGGREGATE DATA ===");

// TODO: Sum numbers [1, 2, 3, 4, 5] → 15


// TODO: Calculate shopping cart total
const cart = [
  { item: "Laptop", price: 999, quantity: 1 },
  { item: "Mouse", price: 25, quantity: 2 },
  { item: "Keyboard", price: 75, quantity: 1 }
];


// TODO: Find maximum number [10, 45, 23, 89, 12, 67] → 89


// TODO: Count occurrences ["apple", "banana", "apple", "orange", "banana", "apple"]
// → { apple: 3, banana: 2, orange: 1 }


// ======================
// TASK 4: METHOD CHAINING
// ======================

console.log("\n=== TASK 4: METHOD CHAINING ===");

// TODO: Get total of even numbers [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] → 30


// TODO: E-commerce filter and total
const allProducts = [
  { name: "Laptop", category: "electronics", price: 999 },
  { name: "Shirt", category: "clothing", price: 29 },
  { name: "Phone", category: "electronics", price: 699 },
  { name: "Shoes", category: "clothing", price: 89 }
];
// Filter electronics, calculate total → 1698


// TODO: Format active user names
const allUsers = [
  { name: "alice", active: true },
  { name: "bob", active: false },
  { name: "charlie", active: true }
];
// Filter active, map to uppercase → ["ALICE", "CHARLIE"]


// ======================
// TASK 5: OTHER USEFUL METHODS
// ======================

console.log("\n=== TASK 5: OTHER USEFUL METHODS ===");

// TODO: find() - Get user with name "Bob"
const findUsers = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" }
];


// TODO: some() - Check if array has any even numbers [1, 3, 5, 7, 8, 9]


// TODO: every() - Check if all numbers are even [2, 4, 6, 8, 10]


// TODO: includes() - Check if array includes "banana" ["apple", "banana", "mango"]


// TODO: findIndex() - Get index of 30 [10, 20, 30, 40, 50]


// ======================
// TASK 6: REAL-WORLD APPLICATION - PRODUCT CATALOG
// ======================

console.log("\n=== TASK 6: PRODUCT CATALOG ===");

const catalog = [
  { id: 1, name: "Laptop", category: "electronics", price: 999, inStock: true },
  { id: 2, name: "Phone", category: "electronics", price: 699, inStock: true },
  { id: 3, name: "Tablet", category: "electronics", price: 399, inStock: false },
  { id: 4, name: "Shirt", category: "clothing", price: 29, inStock: true },
  { id: 5, name: "Shoes", category: "clothing", price: 89, inStock: true },
  { id: 6, name: "Watch", category: "accessories", price: 199, inStock: true }
];

// TODO: 1. Get all product names


// TODO: 2. Get in-stock products


// TODO: 3. Get affordable products (under $100)


// TODO: 4. Calculate total inventory value


// TODO: 5. Get average product price


// TODO: 6. Get electronics in stock (chain filters, map to names)


// TODO: 7. Get most expensive product


// TODO: 8. Check if any product is out of stock


// TODO: 9. Check if all products are affordable (under $1000)


// ======================
// BONUS CHALLENGES (Optional)
// ======================

console.log("\n=== BONUS CHALLENGES ===");

// Bonus 1: Advanced transformations

// Bonus 2: Group by category

// Bonus 3: Unique values

// Bonus 4: Flatten nested arrays
