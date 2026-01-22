// Exercise 01: Pure Functions - SOLUTION

console.log("=== Exercise 1: Pure Functions ===\n");

// Task 1: Identify Pure vs Impure
console.log("--- Task 1: Identify Pure vs Impure ---");

// PURE: same input → same output, no side effects
function add(a, b) {
  return a + b;
}

// IMPURE: modifies external state (total variable)
let total = 0;
function addToTotal(n) {
  total += n;  // Side effect!
  return total;
}

// PURE: creates new array, doesn't modify input
function double(arr) {
  return arr.map(x => x * 2);
}

// IMPURE: mutates input array
function doubleInPlace(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] *= 2;  // Mutation!
  }
  return arr;
}

console.log("add() is: PURE");
console.log("addToTotal() is: IMPURE (modifies global state)");
console.log("double() is: PURE (creates new array)");
console.log("doubleInPlace() is: IMPURE (mutates input)");

// Task 2: Convert Impure to Pure
console.log("\n--- Task 2: Convert Impure to Pure ---");

// Pure version: take current value as parameter
function pureIncrement(currentCount) {
  return currentCount + 1;
}

// Test it - always predictable
console.log("pureIncrement(5):", pureIncrement(5)); // Always 6
console.log("pureIncrement(5):", pureIncrement(5)); // Always 6

// Pure version: return new object
function pureAddTax(product) {
  // Use spread to create new object
  return {
    ...product,
    price: product.price * 1.08
  };
}

// Proof it doesn't mutate
const product = { name: 'Laptop', price: 1000 };
const withTax = pureAddTax(product);
console.log("Original:", product);      // { name: 'Laptop', price: 1000 }
console.log("With tax:", withTax);      // { name: 'Laptop', price: 1080 }
console.log("Original unchanged:", product.price === 1000); // true

// Task 3: Write Pure Functions
console.log("\n--- Task 3: Write Pure Functions ---");

// Pure: same inputs always give same output
function calculateArea(length, width) {
  return length * width;
}

// Pure: creates new array
function filterEven(numbers) {
  return numbers.filter(n => n % 2 === 0);
}

// Pure: returns new string
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Pure: extracts data without mutation
function getFullName(person) {
  return `${person.firstName} ${person.lastName}`;
}

// Pure: calculation without side effects
function applyDiscount(price, discountPercent) {
  return price * (1 - discountPercent / 100);
}

// Test all functions
console.log("Area 5x10:", calculateArea(5, 10));  // 50
console.log("Even:", filterEven([1, 2, 3, 4, 5, 6]));  // [2, 4, 6]
console.log("Capitalized:", capitalize("hello"));  // "Hello"
console.log("Full name:", getFullName({ firstName: 'John', lastName: 'Doe' }));  // "John Doe"
console.log("20% off $100:", applyDiscount(100, 20));  // 80

// Task 4: Test Purity
console.log("\n--- Task 4: Test Purity ---");

// Pure functions are deterministic - same input ALWAYS gives same output
console.log("Testing calculateArea purity:");
console.log("Call 1:", calculateArea(5, 10)); // 50
console.log("Call 2:", calculateArea(5, 10)); // 50
console.log("Call 3:", calculateArea(5, 10)); // 50
console.log("✓ Always 50!");

// Pure functions don't affect each other
console.log("\nTesting isolation:");
const arr1 = [1, 2, 3];
const doubled = filterEven(arr1);
console.log("Original array:", arr1);     // [1, 2, 3] - unchanged
console.log("Filtered:", doubled);        // []

// BONUS: Benefits of Pure Functions
console.log("\n--- Bonus: Why Pure Functions? ---");

// 1. Easy to Test
function testPureFunction() {
  // No setup needed - just call and assert
  console.assert(add(2, 3) === 5, "add(2, 3) should be 5");
  console.assert(add(-1, 1) === 0, "add(-1, 1) should be 0");
  console.log("✓ Tests pass!");
}
testPureFunction();

// 2. Easy to Reason About
// You don't need to know what happened before
// Just look at inputs → output

// 3. Can Be Cached (Memoized)
function memoize(fn) {
  const cache = {};
  return function(...args) {
    const key = JSON.stringify(args);
    if (key in cache) {
      console.log("From cache!");
      return cache[key];
    }
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

const memoizedArea = memoize(calculateArea);
console.log("\nMemoization demo:");
console.log(memoizedArea(5, 10));  // Calculates
console.log(memoizedArea(5, 10));  // From cache!

// 4. Can Be Composed
const process = (x) => applyDiscount(calculateArea(x, x), 10);
console.log("\nComposed functions:", process(10)); // 90

console.log("\n✅ Exercise complete!");
console.log("\n💡 Key Takeaways:");
console.log("- Pure function: same input → same output");
console.log("- No side effects (no mutations, no external changes)");
console.log("- Benefits: testable, predictable, composable, cacheable");
console.log("- Use const, avoid let/var when possible");
console.log("- Return new values instead of mutating");
console.log("- Makes code easier to understand and maintain");
