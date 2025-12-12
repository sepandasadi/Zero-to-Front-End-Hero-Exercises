/**
 * Exercise 02: Array Methods - SOLUTION
 *
 * Master map, filter, reduce, and method chaining
 */

// ======================
// TASK 1: USING MAP() - TRANSFORM DATA
// ======================

console.log("=== TASK 1: MAP() - TRANSFORM DATA ===");

// Double numbers
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);
console.log("Doubled:", doubled);  // [2, 4, 6, 8, 10]

// Format prices
const prices = [19.99, 29.99, 49.99, 99.99];
const formattedPrices = prices.map(price => `$${price.toFixed(2)}`);
console.log("Formatted:", formattedPrices);
// ["$19.99", "$29.99", "$49.99", "$99.99"]

// Extract names from users
const users = [
  { name: "Alice", age: 28 },
  { name: "Bob", age: 35 },
  { name: "Charlie", age: 22 }
];
const names = users.map(user => user.name);
console.log("Names:", names);  // ["Alice", "Bob", "Charlie"]

// Apply 20% discount
const originalPrices = [100, 200, 300, 400];
const discounted = originalPrices.map(price => price * 0.8);
console.log("Discounted:", discounted);  // [80, 160, 240, 320]


// ======================
// TASK 2: USING FILTER() - SELECT ITEMS
// ======================

console.log("\n=== TASK 2: FILTER() - SELECT ITEMS ===");

// Get even numbers
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evens = nums.filter(num => num % 2 === 0);
console.log("Even numbers:", evens);  // [2, 4, 6, 8, 10]

// Filter products under $100
const products = [
  { name: "Laptop", price: 999 },
  { name: "Mouse", price: 25 },
  { name: "Keyboard", price: 75 },
  { name: "Monitor", price: 350 }
];
const affordable = products.filter(product => product.price < 100);
console.log("Affordable products:", affordable);
// [{ name: "Mouse", price: 25 }, { name: "Keyboard", price: 75 }]

// Get active users
const allUsers = [
  { name: "Alice", active: true },
  { name: "Bob", active: false },
  { name: "Charlie", active: true }
];
const activeUsers = allUsers.filter(user => user.active);
console.log("Active users:", activeUsers);
// [{ name: "Alice", active: true }, { name: "Charlie", active: true }]

// Filter by length
const words = ["hi", "hello", "hey", "goodbye"];
const longWords = words.filter(word => word.length > 3);
console.log("Long words:", longWords);  // ["hello", "goodbye"]


// ======================
// TASK 3: USING REDUCE() - AGGREGATE DATA
// ======================

console.log("\n=== TASK 3: REDUCE() - AGGREGATE DATA ===");

// Sum numbers
const sumNumbers = [1, 2, 3, 4, 5];
const sum = sumNumbers.reduce((total, num) => total + num, 0);
console.log("Sum:", sum);  // 15

// Calculate shopping cart total
const cart = [
  { item: "Laptop", price: 999, quantity: 1 },
  { item: "Mouse", price: 25, quantity: 2 },
  { item: "Keyboard", price: 75, quantity: 1 }
];
const cartTotal = cart.reduce((total, item) => {
  return total + (item.price * item.quantity);
}, 0);
console.log("Cart total:", cartTotal);  // 1124 (999 + 50 + 75)

// Find maximum number
const nums2 = [10, 45, 23, 89, 12, 67];
const max = nums2.reduce((maximum, num) => {
  return num > maximum ? num : maximum;
});
console.log("Maximum:", max);  // 89

// Count occurrences
const fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];
const fruitCounts = fruits.reduce((counts, fruit) => {
  counts[fruit] = (counts[fruit] || 0) + 1;
  return counts;
}, {});
console.log("Fruit counts:", fruitCounts);
// { apple: 3, banana: 2, orange: 1 }


// ======================
// TASK 4: METHOD CHAINING
// ======================

console.log("\n=== TASK 4: METHOD CHAINING ===");

// Get total of even numbers
const nums3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evenTotal = nums3
  .filter(num => num % 2 === 0)           // [2, 4, 6, 8, 10]
  .reduce((sum, num) => sum + num, 0);    // 30
console.log("Even total:", evenTotal);  // 30

// E-commerce filter and total
const allProducts = [
  { name: "Laptop", category: "electronics", price: 999 },
  { name: "Shirt", category: "clothing", price: 29 },
  { name: "Phone", category: "electronics", price: 699 },
  { name: "Shoes", category: "clothing", price: 89 }
];
const electronicsTotal = allProducts
  .filter(p => p.category === "electronics")
  .reduce((sum, p) => sum + p.price, 0);
console.log("Electronics total:", electronicsTotal);  // 1698

// Format active user names
const usersList = [
  { name: "alice", active: true },
  { name: "bob", active: false },
  { name: "charlie", active: true }
];
const activeUserNames = usersList
  .filter(user => user.active)
  .map(user => user.name.toUpperCase());
console.log("Active user names:", activeUserNames);
// ["ALICE", "CHARLIE"]


// ======================
// TASK 5: OTHER USEFUL METHODS
// ======================

console.log("\n=== TASK 5: OTHER USEFUL METHODS ===");

// find() - Get user with name "Bob"
const findUsers = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" }
];
const bob = findUsers.find(user => user.name === "Bob");
console.log("Found Bob:", bob);  // { id: 2, name: "Bob" }

// some() - Check if array has any even numbers
const nums4 = [1, 3, 5, 7, 8, 9];
const hasEven = nums4.some(num => num % 2 === 0);
console.log("Has even numbers?", hasEven);  // true

// every() - Check if all numbers are even
const nums5 = [2, 4, 6, 8, 10];
const allEven = nums5.every(num => num % 2 === 0);
console.log("All even?", allEven);  // true

// includes() - Check if array includes "banana"
const fruits2 = ["apple", "banana", "mango"];
const hasBanana = fruits2.includes("banana");
console.log("Has banana?", hasBanana);  // true

// findIndex() - Get index of 30
const nums6 = [10, 20, 30, 40, 50];
const index = nums6.findIndex(num => num === 30);
console.log("Index of 30:", index);  // 2


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

// 1. Get all product names
const productNames = catalog.map(p => p.name);
console.log("1. All product names:", productNames);
// ["Laptop", "Phone", "Tablet", "Shirt", "Shoes", "Watch"]

// 2. Get in-stock products
const inStock = catalog.filter(p => p.inStock);
console.log("2. In-stock products:", inStock.length);  // 5

// 3. Get affordable products (under $100)
const affordableProducts = catalog.filter(p => p.price < 100);
console.log("3. Affordable products:", affordableProducts.map(p => p.name));
// ["Shirt", "Shoes"]

// 4. Calculate total inventory value
const totalValue = catalog.reduce((sum, p) => sum + p.price, 0);
console.log("4. Total inventory value:", totalValue);  // 2414

// 5. Get average product price
const avgPrice = totalValue / catalog.length;
console.log("5. Average price:", avgPrice.toFixed(2));  // 402.33

// 6. Get electronics in stock (chain filters, map to names)
const electronicsInStock = catalog
  .filter(p => p.category === "electronics")
  .filter(p => p.inStock)
  .map(p => p.name);
console.log("6. Electronics in stock:", electronicsInStock);
// ["Laptop", "Phone"]

// 7. Get most expensive product
const mostExpensive = catalog.reduce((max, p) => {
  return p.price > max.price ? p : max;
});
console.log("7. Most expensive:", mostExpensive.name);  // Laptop

// 8. Check if any product is out of stock
const hasOutOfStock = catalog.some(p => !p.inStock);
console.log("8. Any out of stock?", hasOutOfStock);  // true

// 9. Check if all products are affordable (under $1000)
const allAffordable = catalog.every(p => p.price < 1000);
console.log("9. All under $1000?", allAffordable);  // true


// ======================
// BONUS CHALLENGES
// ======================

console.log("\n=== BONUS CHALLENGES ===");

// Bonus 1: Advanced transformations
console.log("\nBonus 1: Advanced Transformations");

const bonusProducts = catalog
  .filter(p => p.price > 50)
  .map(p => ({
    ...p,
    discountedPrice: (p.price * 0.9).toFixed(2),
    formattedPrice: `$${p.price.toFixed(2)}`
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

console.log("Transformed products:", bonusProducts);

// Bonus 2: Group by category
console.log("\nBonus 2: Group by Category");

const byCategory = catalog.reduce((groups, product) => {
  const category = product.category;
  if (!groups[category]) {
    groups[category] = [];
  }
  groups[category].push(product);
  return groups;
}, {});

console.log("Grouped by category:", byCategory);
// {
//   electronics: [laptop, phone, tablet],
//   clothing: [shirt, shoes],
//   accessories: [watch]
// }

// Bonus 3: Unique values
console.log("\nBonus 3: Unique Values");

const duplicates = [1, 2, 2, 3, 3, 3, 4, 5, 5];

// Method 1: Using Set
const unique1 = [...new Set(duplicates)];
console.log("Unique (Set):", unique1);  // [1, 2, 3, 4, 5]

// Method 2: Using filter
const unique2 = duplicates.filter((value, index, arr) => {
  return arr.indexOf(value) === index;
});
console.log("Unique (filter):", unique2);  // [1, 2, 3, 4, 5]

// Method 3: Using reduce
const unique3 = duplicates.reduce((acc, value) => {
  if (!acc.includes(value)) {
    acc.push(value);
  }
  return acc;
}, []);
console.log("Unique (reduce):", unique3);  // [1, 2, 3, 4, 5]

// Bonus 4: Flatten nested arrays
console.log("\nBonus 4: Flatten Nested Arrays");

const nested = [[1, 2], [3, 4], [5]];

// Method 1: Using flat()
const flattened1 = nested.flat();
console.log("Flattened (flat):", flattened1);  // [1, 2, 3, 4, 5]

// Method 2: Using reduce + concat
const flattened2 = nested.reduce((acc, arr) => acc.concat(arr), []);
console.log("Flattened (reduce):", flattened2);  // [1, 2, 3, 4, 5]

// Method 3: Using reduce + spread
const flattened3 = nested.reduce((acc, arr) => [...acc, ...arr], []);
console.log("Flattened (spread):", flattened3);  // [1, 2, 3, 4, 5]


// ======================
// KEY TAKEAWAYS
// ======================

console.log("\n=== KEY TAKEAWAYS ===");

/*
 * ARRAY METHODS:
 *
 * map() - Transform each item
 *   - Creates new array
 *   - Same length as original
 *   - Use for: transforming data, extracting properties
 *
 * filter() - Keep matching items
 *   - Creates new array
 *   - Usually shorter than original
 *   - Use for: selecting items based on condition
 *
 * reduce() - Combine into single value
 *   - Returns any type (number, string, object, array)
 *   - Use for: sums, counts, grouping, max/min
 *
 * find() - First matching item
 *   - Returns single item or undefined
 *   - Use for: finding specific record
 *
 * some() - Check if ANY match
 *   - Returns boolean
 *   - Use for: checking existence
 *
 * every() - Check if ALL match
 *   - Returns boolean
 *   - Use for: validation
 *
 * includes() - Check if value exists
 *   - Returns boolean
 *   - Use for: simple existence checks
 *
 * METHOD CHAINING:
 *   - Chain methods for elegant pipelines
 *   - Each method operates on the result of previous
 *   - Read left to right (or top to bottom)
 *
 * BEST PRACTICES:
 *   - Use implicit return for simple functions
 *   - Use explicit return for complex logic
 *   - Give meaningful names to variables
 *   - Break complex chains into steps
 *   - Methods don't mutate original array (immutable!)
 *
 * REAL-WORLD USES:
 *   - E-commerce product filtering
 *   - Shopping cart calculations
 *   - Data transformation for display
 *   - Search and filter features
 *   - Statistics and analytics
 */

console.log("\n✅ All tasks completed!");
console.log("You now master map, filter, and reduce!");
console.log("These are THE most important array methods in JavaScript! 🚀");
