// Exercise 6: Array Higher-Order Functions - SOLUTION

const nums = [1, 2, 3, 4, 5];

// ========================================
// Task 1: Map - Square each number
// ========================================

const squared = nums.map(num => num * num);
console.log('Squared:', squared);
// [1, 4, 9, 16, 25]

// ========================================
// Task 2: Filter - Keep even numbers
// ========================================

const evens = nums.filter(num => num % 2 === 0);
console.log('Evens:', evens);
// [2, 4]

// ========================================
// Task 3: Reduce - Sum all numbers
// ========================================

const sum = nums.reduce((total, num) => total + num, 0);
console.log('Sum:', sum);
// 15

// ========================================
// Task 4: Method Chaining
// ========================================

const result = nums
  .filter(num => num % 2 === 0)  // [2, 4]
  .map(num => num * num)         // [4, 16]
  .reduce((sum, num) => sum + num, 0); // 20

console.log('Chained result:', result);
// 20

// ========================================
// BONUS 1: Double and Sum
// ========================================

const doubledSum = nums
  .map(num => num * 2)
  .reduce((sum, num) => sum + num, 0);

console.log('\n=== Bonus 1: Double and Sum ===');
console.log(doubledSum); // 30

// ========================================
// BONUS 2: Remove Odds, Triple
// ========================================

const tripled = nums
  .filter(num => num % 2 === 0)
  .map(num => num * 3);

console.log('\n=== Bonus 2: Remove Odds, Triple ===');
console.log(tripled); // [6, 12]

// ========================================
// BONUS 3: Find Max with Reduce
// ========================================

const max = nums.reduce((largest, num) => {
  return num > largest ? num : largest;
}, nums[0]);

console.log('\n=== Bonus 3: Find Max ===');
console.log(max); // 5

// Alternative using Math.max
const max2 = nums.reduce((largest, num) => Math.max(largest, num));
console.log(max2); // 5

// ========================================
// BONUS 4: Calculate Average
// ========================================

const average = nums.reduce((sum, num) => sum + num, 0) / nums.length;
console.log('\n=== Bonus 4: Average ===');
console.log(average); // 3

// ========================================
// BONUS 5: Real-World Example with Objects
// ========================================

const products = [
  { name: 'Laptop', price: 1000, inStock: true },
  { name: 'Mouse', price: 25, inStock: true },
  { name: 'Keyboard', price: 75, inStock: false },
  { name: 'Monitor', price: 300, inStock: true },
  { name: 'Webcam', price: 80, inStock: false }
];

console.log('\n=== Bonus 5: Real-World Data ===');

// Get names of in-stock products
const inStockNames = products
  .filter(p => p.inStock)
  .map(p => p.name);

console.log('In stock:', inStockNames);
// ['Laptop', 'Mouse', 'Monitor']

// Calculate total value of in-stock items
const totalValue = products
  .filter(p => p.inStock)
  .reduce((total, p) => total + p.price, 0);

console.log('Total in-stock value: $' + totalValue);
// $1325

// Apply 20% discount to all products
const discounted = products.map(p => ({
  ...p,
  price: p.price * 0.8,
  originalPrice: p.price
}));

console.log('Discounted products:', discounted);

// Find most expensive product
const mostExpensive = products.reduce((max, p) => {
  return p.price > max.price ? p : max;
});

console.log('Most expensive:', mostExpensive.name, '-', '$' + mostExpensive.price);

// ========================================
// Comparison: Imperative vs Declarative
// ========================================

console.log('\n=== Imperative vs Declarative ===');

// Imperative (old way)
const squaredImperative = [];
for (let i = 0; i < nums.length; i++) {
  squaredImperative.push(nums[i] * nums[i]);
}
console.log('Imperative:', squaredImperative);

// Declarative (modern way)
const squaredDeclarative = nums.map(n => n * n);
console.log('Declarative:', squaredDeclarative);

// The declarative way is:
// - Shorter
// - Clearer (says WHAT you want, not HOW)
// - Less error-prone (no index bugs)
// - More functional (no mutation)


