/**
 * Exercise 02: Array Methods
 *
 * Practice map, filter, reduce, and method chaining
 */

console.log("=== Exercise 02: Array Methods ===\n");

// ========================================
// TASK 1: Using map() - Transform Data
// ========================================

console.log("TASK 1: Using map()");

// 1. Double numbers
const numbers1 = [1, 2, 3, 4, 5];
// TODO: Use map to double each number


// 2. Format prices
const prices = [19.99, 29.99, 49.99, 99.99];
// TODO: Use map to format as "$XX.XX" strings


// 3. Extract names from users
const users1 = [
  { name: "Alice", age: 28 },
  { name: "Bob", age: 35 },
  { name: "Charlie", age: 22 }
];
// TODO: Use map to get just the names


// 4. Apply discount
const prices2 = [100, 200, 300, 400];
// TODO: Use map to apply 20% discount (multiply by 0.8)


// ========================================
// TASK 2: Using filter() - Select Items
// ========================================

console.log("\nTASK 2: Using filter()");

// 1. Get even numbers
const numbers2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// TODO: Use filter to keep only even numbers


// 2. Filter by price
const products1 = [
  { name: "Laptop", price: 999 },
  { name: "Mouse", price: 25 },
  { name: "Keyboard", price: 75 },
  { name: "Monitor", price: 350 }
];
// TODO: Use filter to get products under $100


// 3. Get active users
const users2 = [
  { name: "Alice", active: true },
  { name: "Bob", active: false },
  { name: "Charlie", active: true }
];
// TODO: Use filter to get only active users


// 4. Filter by length
const words = ["hi", "hello", "hey", "goodbye"];
// TODO: Use filter to keep only words longer than 3 characters


// ========================================
// TASK 3: Using reduce() - Aggregate Data
// ========================================

console.log("\nTASK 3: Using reduce()");

// 1. Sum numbers
const numbers3 = [1, 2, 3, 4, 5];
// TODO: Use reduce to calculate sum


// 2. Calculate shopping cart total
const cart = [
  { item: "Laptop", price: 999, quantity: 1 },
  { item: "Mouse", price: 25, quantity: 2 },
  { item: "Keyboard", price: 75, quantity: 1 }
];
// TODO: Use reduce to calculate total cost


// 3. Find maximum number
const numbers4 = [10, 45, 23, 89, 12, 67];
// TODO: Use reduce to find largest number


// 4. Count occurrences
const fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];
// TODO: Use reduce to count each fruit
// Result should be: { apple: 3, banana: 2, orange: 1 }


// ========================================
// TASK 4: Method Chaining
// ========================================

console.log("\nTASK 4: Method Chaining");

// 1. Get total of even numbers
const numbers5 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// TODO: Filter even numbers, then sum them with reduce


// 2. E-commerce filter and total
const products2 = [
  { name: "Laptop", category: "electronics", price: 999 },
  { name: "Shirt", category: "clothing", price: 29 },
  { name: "Phone", category: "electronics", price: 699 },
  { name: "Shoes", category: "clothing", price: 89 }
];
// TODO: Filter electronics, then calculate total price


// 3. Format active user names
const users3 = [
  { name: "alice", active: true },
  { name: "bob", active: false },
  { name: "charlie", active: true }
];
// TODO: Filter active users, then map to get names in uppercase


// ========================================
// TASK 5: Other Useful Methods
// ========================================

console.log("\nTASK 5: Other Useful Methods");

// 1. find() - Get first match
const users4 = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" }
];
// TODO: Find user with name "Bob"


// 2. some() - Check if any match
const numbers6 = [1, 3, 5, 7, 8, 9];
// TODO: Check if array has any even numbers


// 3. every() - Check if all match
const numbers7 = [2, 4, 6, 8, 10];
// TODO: Check if all numbers are even


// 4. includes() - Check if value exists
const fruits2 = ["apple", "banana", "mango"];
// TODO: Check if array includes "banana"


// 5. findIndex() - Get position
const numbers8 = [10, 20, 30, 40, 50];
// TODO: Find index of 30


// ========================================
// TASK 6: Real-World Application - Product Catalog
// ========================================

console.log("\nTASK 6: Product Catalog");

const products = [
  { id: 1, name: "Laptop", category: "electronics", price: 999, inStock: true },
  { id: 2, name: "Phone", category: "electronics", price: 699, inStock: true },
  { id: 3, name: "Tablet", category: "electronics", price: 399, inStock: false },
  { id: 4, name: "Shirt", category: "clothing", price: 29, inStock: true },
  { id: 5, name: "Shoes", category: "clothing", price: 89, inStock: true },
  { id: 6, name: "Watch", category: "accessories", price: 199, inStock: true }
];

// 1. Get all product names
// TODO: Use map to extract names


// 2. Get in-stock products
// TODO: Use filter to get only inStock items


// 3. Get affordable products (under $100)
// TODO: Use filter


// 4. Calculate total inventory value
// TODO: Use reduce to sum all prices


// 5. Get average product price
// TODO: Use reduce to sum, then divide by length


// 6. Get electronics in stock
// TODO: Chain filter twice (electronics AND inStock), then map to get names


// 7. Get most expensive product
// TODO: Use reduce to find max price product


// 8. Check if any product is out of stock
// TODO: Use some()


// 9. Check if all products are affordable (under $1000)
// TODO: Use every()


// ========================================
// BONUS CHALLENGES
// ========================================

console.log("\nBONUS CHALLENGES:");

// Bonus 1: Advanced Transformations
// Filter products over $50, apply 10% discount, format as "$XX.XX", sort alphabetically


// Bonus 2: Group By
// Use reduce to group products by category


// Bonus 3: Unique Values
// Remove duplicates: [1, 2, 2, 3, 3, 4] → [1, 2, 3, 4]


// Bonus 4: Flatten with reduce
// Flatten: [[1, 2], [3, 4], [5]] → [1, 2, 3, 4, 5]


console.log("\n✅ Exercise Complete!");

