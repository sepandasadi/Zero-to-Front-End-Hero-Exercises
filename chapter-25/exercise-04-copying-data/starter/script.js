/**
 * Exercise 04: Copying Data
 *
 * Practice shallow vs deep copying and immutable updates
 */

console.log("=== Exercise 04: Copying Data ===\n");

// ========================================
// TASK 1: Understanding the Problem
// ========================================

console.log("TASK 1: Understanding the Problem");

// TODO: Demonstrate reference problem with arrays


// TODO: Demonstrate reference problem with objects


// TODO: Explain what happens and why


// ========================================
// TASK 2: Primitives vs Objects
// ========================================

console.log("\nTASK 2: Primitives vs Objects");

// TODO: Test primitives (by value)


// TODO: Test objects (by reference)


// TODO: Write testCopying(value) function


// ========================================
// TASK 3: Shallow Copy - Arrays
// ========================================

console.log("\nTASK 3: Shallow Copy - Arrays");

const originalArray = [1, 2, 3, 4, 5];

// TODO: Copy using spread operator


// TODO: Copy using Array.from()


// TODO: Copy using slice()


// TODO: Copy using concat()


// TODO: Modify each copy and verify original unchanged


// ========================================
// TASK 4: Shallow Copy - Objects
// ========================================

console.log("\nTASK 4: Shallow Copy - Objects");

const originalObject = {
  name: "Alice",
  age: 28,
  email: "alice@example.com"
};

// TODO: Copy using spread operator


// TODO: Copy using Object.assign()


// TODO: Modify copies and verify original unchanged


// ========================================
// TASK 5: The Nested Object Problem
// ========================================

console.log("\nTASK 5: The Nested Object Problem");

const user = {
  name: "Alice",
  address: {
    city: "NYC",
    country: "USA"
  }
};

// TODO: Create shallow copy
// TODO: Modify nested property
// TODO: Observe the problem
// TODO: Explain why this happens


// ========================================
// TASK 6: Deep Copy Solutions
// ========================================

console.log("\nTASK 6: Deep Copy Solutions");

// Method 1: JSON.parse/stringify
// TODO: Test with nested object
// TODO: Document limitations


// Method 2: Recursive deep clone
// TODO: Implement deepClone function
function deepClone(obj) {
  // Your implementation
}


// TODO: Test deepClone with various structures


// ========================================
// TASK 7: Real-World Scenario - Shopping Cart
// ========================================

console.log("\nTASK 7: Shopping Cart");

const cart = {
  items: [
    { id: 1, name: "Laptop", price: 999, quantity: 1 },
    { id: 2, name: "Mouse", price: 25, quantity: 2 }
  ],
  user: {
    id: 101,
    name: "Alice"
  },
  totals: {
    subtotal: 0,
    tax: 0,
    total: 0
  }
};

// TODO: Implement cloneCart(cart)


// TODO: Implement updateQuantity(cart, itemId, quantity)


// TODO: Test that original cart never changes


// ========================================
// TASK 8: Immutable Update Patterns
// ========================================

console.log("\nTASK 8: Immutable Update Patterns");

// Update array item immutably
const users = [
  { id: 1, name: "Alice", active: true },
  { id: 2, name: "Bob", active: false }
];

// TODO: Change Bob's active status WITHOUT mutating


// Update nested object immutably
const state = {
  user: {
    profile: {
      name: "Alice",
      settings: {
        theme: "dark"
      }
    }
  }
};

// TODO: Change theme to "light" WITHOUT mutating


// ========================================
// TASK 9: Performance Considerations
// ========================================

console.log("\nTASK 9: Performance Considerations");

// TODO: Create large test array


// TODO: Measure performance of different copying methods


// ========================================
// TASK 10: When to Use Each Approach
// ========================================

console.log("\nTASK 10: When to Use Each Approach");

// TODO: Create examples for:
// - Flat array/object → spread operator
// - Nested data, no functions → JSON method
// - Complex nested with functions → deep clone
// - Performance critical → shallow + careful updates
// - Read-only → reference


// ========================================
// BONUS CHALLENGES
// ========================================

console.log("\nBONUS CHALLENGES:");

// Bonus 1: Handle special types (Date, RegExp, Set, Map)


// Bonus 2: Handle circular references


// Bonus 3: Structural sharing


// Bonus 4: Immer-like API


console.log("\n✅ Exercise Complete!");

