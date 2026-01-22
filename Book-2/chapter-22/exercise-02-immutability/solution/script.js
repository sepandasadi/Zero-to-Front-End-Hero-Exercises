// Exercise 02: Immutability Patterns - SOLUTION

console.log("=== Exercise 2: Immutability ===\n");

// Task 1: Identify Mutations
console.log("--- Task 1: Mutable vs Immutable ---");

const arr1 = [1, 2, 3];
arr1.push(4); // MUTABLE - modifies arr1
console.log('After push:', arr1); // [1, 2, 3, 4]

const arr2 = [1, 2, 3];
const arr3 = [...arr2, 4]; // IMMUTABLE - creates new array
console.log('Original:', arr2); // [1, 2, 3]
console.log('New:', arr3); // [1, 2, 3, 4]

const obj1 = { a: 1 };
obj1.b = 2; // MUTABLE - modifies obj1

const obj2 = { a: 1 };
const obj3 = { ...obj2, b: 2 }; // IMMUTABLE - creates new object

// Task 2: Immutable Array Updates
console.log("\n--- Task 2: Immutable Array Updates ---");

const numbers = [1, 2, 3, 4, 5];

// Add item
const withAdded = [...numbers, 6];
console.log('Added:', withAdded);

// Remove item at index 2
const withRemoved = numbers.filter((_, i) => i !== 2);
console.log('Removed index 2:', withRemoved);

// Update item at index 1
const withUpdated = numbers.map((num, i) => i === 1 ? 99 : num);
console.log('Updated index 1:', withUpdated);

// Sort (don't mutate!)
const sorted = [...numbers].sort((a, b) => b - a);
console.log('Sorted desc:', sorted);
console.log('Original unchanged:', numbers);

// Reverse
const reversed = [...numbers].reverse();
console.log('Reversed:', reversed);

// Task 3: Immutable Object Updates
console.log("\n--- Task 3: Immutable Object Updates ---");

const user = { name: 'Alice', age: 25, city: 'NYC' };

// Add/update property
const withProperty = { ...user, email: 'alice@example.com' };
console.log('Added property:', withProperty);

// Remove property
const { city, ...withoutCity } = user;
console.log('Removed city:', withoutCity);

// Update nested property
const userWithNested = {
  name: 'Alice',
  address: { city: 'NYC', zip: '10001' }
};

const updatedNested = {
  ...userWithNested,
  address: {
    ...userWithNested.address,
    city: 'Boston'
  }
};
console.log('Updated nested:', updatedNested);

// Task 4: State Updates (React-style)
console.log("\n--- Task 4: State Updates ---");

const state = {
  user: { name: 'Alice', age: 25 },
  cart: [{ id: 1, qty: 2 }],
  settings: { theme: 'dark' }
};

// Update user age
const newState1 = {
  ...state,
  user: { ...state.user, age: 26 }
};

// Add cart item
const newState2 = {
  ...newState1,
  cart: [...newState1.cart, { id: 2, qty: 1 }]
};

// Change theme
const newState3 = {
  ...newState2,
  settings: { ...newState2.settings, theme: 'light' }
};

console.log('Final state:', newState3);
console.log('Original unchanged:', state);

// Task 5: Array Methods (All Immutable!)
console.log("\n--- Task 5: Array Methods ---");

const nums = [1, 2, 3, 4, 5];

// Transform with map
const doubled = nums.map(n => n * 2);
console.log('Doubled:', doubled);

// Filter and transform
const evenSquared = nums.filter(n => n % 2 === 0).map(n => n ** 2);
console.log('Even squared:', evenSquared);

// Build object with reduce
const arrayToObject = nums.reduce((obj, num) => ({
  ...obj,
  [`key${num}`]: num * 10
}), {});
console.log('Array to object:', arrayToObject);

// Flatten nested arrays
const nested = [[1, 2], [3, 4], [5]];
const flat = nested.reduce((acc, arr) => [...acc, ...arr], []);
console.log('Flattened:', flat);

// Modern: flat() method
console.log('Using flat():', nested.flat());

console.log("\n✅ Exercise complete!");
console.log("\n💡 Benefits of Immutability:");
console.log("- Predictable state changes");
console.log("- Time-travel debugging (undo/redo)");
console.log("- React optimizations (shallow equality checks)");
console.log("- Prevents accidental mutations");
console.log("- Easier to reason about");
console.log("- Better for concurrent/parallel operations");
