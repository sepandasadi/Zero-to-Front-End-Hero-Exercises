// Exercise 01: Pure Functions - STARTER

console.log("=== Exercise 1: Pure Functions ===\n");

// Task 1: Identify Pure vs Impure
console.log("--- Task 1: Identify Pure vs Impure ---");

function add(a, b) {
  return a + b;
}

let total = 0;
function addToTotal(n) {
  total += n;
  return total;
}

function double(arr) {
  return arr.map(x => x * 2);
}

function doubleInPlace(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] *= 2;
  }
  return arr;
}

// TODO: Classify each function as PURE or IMPURE
console.log("add() is:", /* PURE or IMPURE? */);
console.log("addToTotal() is:", /* PURE or IMPURE? */);
console.log("double() is:", /* PURE or IMPURE? */);
console.log("doubleInPlace() is:", /* PURE or IMPURE? */);

// Task 2: Convert Impure to Pure
console.log("\n--- Task 2: Convert Impure to Pure ---");

// TODO: Make this pure (don't modify global count)
let count = 0;
function increment() {
  count++;
  return count;
}

// Pure version:
function pureIncrement(/* what parameter? */) {
  // TODO: Implement without side effects
}

// TODO: Make this pure (don't mutate input)
function addTax(product) {
  product.price = product.price * 1.08;
  return product;
}

// Pure version:
function pureAddTax(/* what parameter? */) {
  // TODO: Return new object without mutating
}

// Test it
const product = { name: 'Laptop', price: 1000 };
console.log("Original:", product);
console.log("With tax:", pureAddTax(product));
console.log("Original unchanged:", product); // Should still be 1000

// Task 3: Write Pure Functions
console.log("\n--- Task 3: Write Pure Functions ---");

// TODO: Calculate area of rectangle
function calculateArea(/* parameters */) {
  // TODO: Implement
}

// TODO: Filter even numbers
function filterEven(/* parameters */) {
  // TODO: Implement
}

// TODO: Capitalize first letter
function capitalize(/* parameters */) {
  // TODO: Implement
}

// TODO: Get full name from object
function getFullName(/* parameters */) {
  // TODO: Implement (given {firstName, lastName})
}

// TODO: Calculate discount price
function applyDiscount(/* parameters */) {
  // TODO: Implement (price, discountPercent)
}

// Test your functions
console.log("Area:", calculateArea(5, 10));
console.log("Even numbers:", filterEven([1, 2, 3, 4, 5, 6]));
console.log("Capitalized:", capitalize("hello"));
console.log("Full name:", getFullName({ firstName: 'John', lastName: 'Doe' }));
console.log("Discounted:", applyDiscount(100, 20));

// Task 4: Test Pure Functions
console.log("\n--- Task 4: Test Purity ---");

// TODO: Prove calculateArea is pure by calling it multiple times
// Same input should ALWAYS give same output

console.log("\n✅ Exercise complete!");
