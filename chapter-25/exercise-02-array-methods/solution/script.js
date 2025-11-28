/**
 * Exercise 02: Array Methods - SOLUTION
 *
 * Complete solutions for map, filter, reduce, and method chaining
 */

console.log("=== Exercise 02: Array Methods - SOLUTION ===\n");

// ========================================
// TASK 1: Using map() - Transform Data
// ========================================

console.log("TASK 1: Using map()");

// 1. Double numbers
const numbers1 = [1, 2, 3, 4, 5];
const doubled = numbers1.map(num => num * 2);
console.log("Doubled:", doubled);  // [2, 4, 6, 8, 10]

// 2. Format prices
const prices = [19.99, 29.99, 49.99, 99.99];
const formattedPrices = prices.map(price => `$${price.toFixed(2)}`);
console.log("Formatted prices:", formattedPrices);

// 3. Extract names from users
const users1 = [
  { name: "Alice", age: 28 },
  { name: "Bob", age: 35 },
  { name: "Charlie", age: 22 }
];
const userNames = users1.map(user => user.name);
console.log("User names:", userNames);  // ["Alice", "Bob", "Charlie"]

// 4. Apply discount
const prices2 = [100, 200, 300, 400];
const discounted = prices2.map(price => price * 0.8);
console.log("Discounted prices:", discounted);  // [80, 160, 240, 320]

// ========================================
// TASK 2: Using filter() - Select Items
// ========================================

console.log("\nTASK 2: Using filter()");

// 1. Get even numbers
const numbers2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evenNumbers = numbers2.filter(num => num % 2 === 0);
console.log("Even numbers:", evenNumbers);  // [2, 4, 6, 8, 10]

// 2. Filter by price
const products1 = [
  { name: "Laptop", price: 999 },
  { name: "Mouse", price: 25 },
  { name: "Keyboard", price: 75 },
  { name: "Monitor", price: 350 }
];
const affordableProducts = products1.filter(product => product.price < 100);
console.log("Products under $100:", affordableProducts);

// 3. Get active users
const users2 = [
  { name: "Alice", active: true },
  { name: "Bob", active: false },
  { name: "Charlie", active: true }
];
const activeUsers = users2.filter(user => user.active);
console.log("Active users:", activeUsers);

// 4. Filter by length
const words = ["hi", "hello", "hey", "goodbye"];
const longWords = words.filter(word => word.length > 3);
console.log("Words longer than 3 chars:", longWords);  // ["hello", "goodbye"]

// ========================================
// TASK 3: Using reduce() - Aggregate Data
// ========================================

console.log("\nTASK 3: Using reduce()");

// 1. Sum numbers
const numbers3 = [1, 2, 3, 4, 5];
const sum = numbers3.reduce((total, num) => total + num, 0);
console.log("Sum:", sum);  // 15

// 2. Calculate shopping cart total
const cart = [
  { item: "Laptop", price: 999, quantity: 1 },
  { item: "Mouse", price: 25, quantity: 2 },
  { item: "Keyboard", price: 75, quantity: 1 }
];
const cartTotal = cart.reduce((total, item) => {
  return total + (item.price * item.quantity);
}, 0);
console.log("Cart total:", cartTotal);  // 1124

// 3. Find maximum number
const numbers4 = [10, 45, 23, 89, 12, 67];
const max = numbers4.reduce((maximum, num) => {
  return num > maximum ? num : maximum;
}, numbers4[0]);
console.log("Maximum:", max);  // 89

// Alternative using Math.max
const max2 = numbers4.reduce((maximum, num) => Math.max(maximum, num));
console.log("Maximum (alternative):", max2);

// 4. Count occurrences
const fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];
const fruitCounts = fruits.reduce((counts, fruit) => {
  counts[fruit] = (counts[fruit] || 0) + 1;
  return counts;
}, {});
console.log("Fruit counts:", fruitCounts);  // { apple: 3, banana: 2, orange: 1 }

// ========================================
// TASK 4: Method Chaining
// ========================================

console.log("\nTASK 4: Method Chaining");

// 1. Get total of even numbers
const numbers5 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evenSum = numbers5
  .filter(num => num % 2 === 0)
  .reduce((total, num) => total + num, 0);
console.log("Sum of even numbers:", evenSum);  // 30

// 2. E-commerce filter and total
const products2 = [
  { name: "Laptop", category: "electronics", price: 999 },
  { name: "Shirt", category: "clothing", price: 29 },
  { name: "Phone", category: "electronics", price: 699 },
  { name: "Shoes", category: "clothing", price: 89 }
];
const electronicsTotal = products2
  .filter(product => product.category === "electronics")
  .reduce((total, product) => total + product.price, 0);
console.log("Electronics total:", electronicsTotal);  // 1698

// 3. Format active user names
const users3 = [
  { name: "alice", active: true },
  { name: "bob", active: false },
  { name: "charlie", active: true }
];
const activeUserNames = users3
  .filter(user => user.active)
  .map(user => user.name.toUpperCase());
console.log("Active user names:", activeUserNames);  // ["ALICE", "CHARLIE"]

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
const bob = users4.find(user => user.name === "Bob");
console.log("Found Bob:", bob);  // { id: 2, name: "Bob" }

// 2. some() - Check if any match
const numbers6 = [1, 3, 5, 7, 8, 9];
const hasEven = numbers6.some(num => num % 2 === 0);
console.log("Has any even numbers:", hasEven);  // true

// 3. every() - Check if all match
const numbers7 = [2, 4, 6, 8, 10];
const allEven = numbers7.every(num => num % 2 === 0);
console.log("All numbers are even:", allEven);  // true

// 4. includes() - Check if value exists
const fruits2 = ["apple", "banana", "mango"];
const hasBanana = fruits2.includes("banana");
console.log("Includes banana:", hasBanana);  // true

// 5. findIndex() - Get position
const numbers8 = [10, 20, 30, 40, 50];
const indexOf30 = numbers8.findIndex(num => num === 30);
console.log("Index of 30:", indexOf30);  // 2

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
const productNames = products.map(p => p.name);
console.log("1. All product names:", productNames);

// 2. Get in-stock products
const inStockProducts = products.filter(p => p.inStock);
console.log("2. In-stock products:", inStockProducts.length, "items");

// 3. Get affordable products (under $100)
const affordableItems = products.filter(p => p.price < 100);
console.log("3. Affordable products:", affordableItems.map(p => p.name));

// 4. Calculate total inventory value
const totalValue = products.reduce((total, p) => total + p.price, 0);
console.log("4. Total inventory value:", totalValue);  // 2414

// 5. Get average product price
const avgPrice = products.reduce((total, p) => total + p.price, 0) / products.length;
console.log("5. Average price:", avgPrice.toFixed(2));  // 402.33

// 6. Get electronics in stock
const electronicsInStock = products
  .filter(p => p.category === "electronics")
  .filter(p => p.inStock)
  .map(p => p.name);
console.log("6. Electronics in stock:", electronicsInStock);  // ["Laptop", "Phone"]

// Alternative - single filter
const electronicsInStock2 = products
  .filter(p => p.category === "electronics" && p.inStock)
  .map(p => p.name);
console.log("   Alternative:", electronicsInStock2);

// 7. Get most expensive product
const mostExpensive = products.reduce((max, product) => {
  return product.price > max.price ? product : max;
});
console.log("7. Most expensive:", mostExpensive.name, `$${mostExpensive.price}`);

// 8. Check if any product is out of stock
const anyOutOfStock = products.some(p => !p.inStock);
console.log("8. Any out of stock:", anyOutOfStock);  // true

// 9. Check if all products are affordable (under $1000)
const allAffordable = products.every(p => p.price < 1000);
console.log("9. All under $1000:", allAffordable);  // true

// ========================================
// BONUS CHALLENGES
// ========================================

console.log("\nBONUS CHALLENGES:");

// Bonus 1: Advanced Transformations
const advancedPipeline = products
  .filter(p => p.price > 50)
  .map(p => ({ ...p, price: p.price * 0.9 }))  // 10% discount
  .map(p => ({ ...p, formattedPrice: `$${p.price.toFixed(2)}` }))
  .sort((a, b) => a.name.localeCompare(b.name));
console.log("Bonus 1 - Advanced pipeline:", advancedPipeline);

// Bonus 2: Group By
const groupedByCategory = products.reduce((groups, product) => {
  const category = product.category;
  if (!groups[category]) {
    groups[category] = [];
  }
  groups[category].push(product);
  return groups;
}, {});
console.log("Bonus 2 - Grouped by category:", groupedByCategory);

// Bonus 3: Unique Values
const duplicates = [1, 2, 2, 3, 3, 4, 1, 5, 2];
const unique = duplicates.filter((value, index, array) => {
  return array.indexOf(value) === index;
});
console.log("Bonus 3 - Unique values:", unique);

// Alternative with reduce
const uniqueWithReduce = duplicates.reduce((acc, value) => {
  if (!acc.includes(value)) {
    acc.push(value);
  }
  return acc;
}, []);
console.log("   Alternative with reduce:", uniqueWithReduce);

// Bonus 4: Flatten with reduce
const nested = [[1, 2], [3, 4], [5]];
const flattened = nested.reduce((flat, arr) => {
  return flat.concat(arr);
}, []);
console.log("Bonus 4 - Flattened:", flattened);  // [1, 2, 3, 4, 5]

// Alternative with flat() (modern approach)
const flattenedModern = nested.flat();
console.log("   Alternative with flat():", flattenedModern);

console.log("\n✅ Exercise Complete!");

// ========================================
// Key Takeaways
// ========================================

console.log("\n📚 Key Takeaways:");
console.log("• map() transforms each item → new array");
console.log("• filter() selects items that pass test → new array");
console.log("• reduce() combines all items → single value");
console.log("• Chain methods for powerful transformations");
console.log("• Original arrays are never modified (immutable)");
console.log("• Always return values in callbacks!");

