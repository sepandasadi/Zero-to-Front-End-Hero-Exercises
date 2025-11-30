/**
 * Exercise 04: Copying Data - SOLUTION
 *
 * Complete solutions for shallow vs deep copying and immutable updates
 */

console.log("=== Exercise 04: Copying Data - SOLUTION ===\n");

// ========================================
// TASK 1: Understanding the Problem
// ========================================

console.log("TASK 1: Understanding the Problem");

// Arrays - reference problem
const numbers1 = [1, 2, 3];
const numbers2 = numbers1;  // This creates a REFERENCE, not a copy!
numbers2.push(4);

console.log("numbers1:", numbers1);  // [1, 2, 3, 4] - AFFECTED!
console.log("numbers2:", numbers2);  // [1, 2, 3, 4]
console.log("Same array?", numbers1 === numbers2);  // true

// Objects - reference problem
const user1 = { name: "Alice", age: 25 };
const user2 = user1;  // Reference again!
user2.age = 30;

console.log("user1.age:", user1.age);  // 30 - AFFECTED!
console.log("user2.age:", user2.age);  // 30
console.log("Same object?", user1 === user2);  // true

// ========================================
// TASK 2: Primitives vs Objects
// ========================================

console.log("\nTASK 2: Primitives vs Objects");

// Primitives (by value) - NO reference problem
let a = 5;
let b = a;
b = 10;
console.log("a:", a, "b:", b);  // a: 5, b: 10 (independent)

let str1 = "hello";
let str2 = str1;
str2 = "world";
console.log("str1:", str1, "str2:", str2);  // Independent

// Objects (by reference) - HAS reference problem
let obj1 = { value: 5 };
let obj2 = obj1;
obj2.value = 10;
console.log("obj1.value:", obj1.value);  // 10 (affected!)

// Test function
function testCopying(value) {
  const copy = value;
  const isPrimitive = typeof value !== 'object' || value === null;

  console.log("Type:", typeof value);
  console.log("Is Primitive:", isPrimitive);
  console.log("Copies independently:", isPrimitive);
}

testCopying(5);
testCopying({ name: "test" });

// ========================================
// TASK 3: Shallow Copy - Arrays
// ========================================

console.log("\nTASK 3: Shallow Copy - Arrays");

const originalArray = [1, 2, 3, 4, 5];

// Method 1: Spread operator
const copy1 = [...originalArray];
copy1.push(6);
console.log("Original:", originalArray);  // [1, 2, 3, 4, 5] - unchanged!
console.log("Copy 1:", copy1);  // [1, 2, 3, 4, 5, 6]

// Method 2: Array.from()
const copy2 = Array.from(originalArray);
copy2.push(7);
console.log("Copy 2:", copy2);  // [1, 2, 3, 4, 5, 7]

// Method 3: slice()
const copy3 = originalArray.slice();
copy3.push(8);
console.log("Copy 3:", copy3);

// Method 4: concat()
const copy4 = [].concat(originalArray);
copy4.push(9);
console.log("Copy 4:", copy4);

// Verify all are independent
console.log("All copies independent?",
  originalArray.length === 5 &&
  copy1.length === 6 &&
  copy2.length === 6 &&
  copy3.length === 6 &&
  copy4.length === 6
);

// ========================================
// TASK 4: Shallow Copy - Objects
// ========================================

console.log("\nTASK 4: Shallow Copy - Objects");

const originalObject = {
  name: "Alice",
  age: 28,
  email: "alice@example.com"
};

// Method 1: Spread operator
const objCopy1 = { ...originalObject };
objCopy1.name = "Bob";
console.log("Original name:", originalObject.name);  // Alice - unchanged!
console.log("Copy name:", objCopy1.name);  // Bob

// Method 2: Object.assign()
const objCopy2 = Object.assign({}, originalObject);
objCopy2.age = 30;
console.log("Original age:", originalObject.age);  // 28 - unchanged!
console.log("Copy age:", objCopy2.age);  // 30

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

const shallowCopy = { ...user };

// Modify top-level property - works fine
shallowCopy.name = "Bob";
console.log("Original name:", user.name);  // Alice - unchanged
console.log("Copy name:", shallowCopy.name);  // Bob

// Modify nested property - PROBLEM!
shallowCopy.address.city = "LA";
console.log("Original city:", user.address.city);  // LA - CHANGED!
console.log("Copy city:", shallowCopy.address.city);  // LA

// Why? Because nested objects are still referenced
console.log("Same address object?", user.address === shallowCopy.address);  // true!

// ========================================
// TASK 6: Deep Copy Solutions
// ========================================

console.log("\nTASK 6: Deep Copy Solutions");

// Method 1: JSON.parse/stringify (simple but limited)
const nestedObj = {
  name: "Alice",
  scores: [95, 87, 92],
  address: {
    city: "NYC",
    coords: [40.7, -74.0]
  }
};

const jsonCopy = JSON.parse(JSON.stringify(nestedObj));
jsonCopy.address.city = "LA";
jsonCopy.scores.push(88);

console.log("Original city:", nestedObj.address.city);  // NYC - unchanged!
console.log("Original scores:", nestedObj.scores.length);  // 3 - unchanged!
console.log("Copy city:", jsonCopy.address.city);  // LA
console.log("Copy scores:", jsonCopy.scores.length);  // 4

// JSON limitations
const objWithFunction = {
  name: "Alice",
  greet: function() { return "Hi!"; },
  date: new Date(),
  undef: undefined
};

const jsonLimited = JSON.parse(JSON.stringify(objWithFunction));
console.log("\nJSON Limitations:");
console.log("Original has greet:", typeof objWithFunction.greet);  // function
console.log("Copy has greet:", typeof jsonLimited.greet);  // undefined - LOST!
console.log("Date preserved?", jsonLimited.date instanceof Date);  // false - becomes string!

// Method 2: Recursive deep clone
function deepClone(obj) {
  // Handle null and primitives
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // Handle Date
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }

  // Handle Array
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item));
  }

  // Handle Object
  const cloned = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }

  return cloned;
}

// Test deep clone
const complex = {
  name: "Alice",
  scores: [95, 87, 92],
  address: {
    city: "NYC",
    coords: [40.7, -74.0]
  },
  registered: new Date()
};

const deepCopied = deepClone(complex);
deepCopied.address.city = "LA";
deepCopied.scores.push(88);
deepCopied.address.coords[0] = 34.0;

console.log("\nDeep Clone Test:");
console.log("Original city:", complex.address.city);  // NYC - unchanged!
console.log("Original scores:", complex.scores.length);  // 3 - unchanged!
console.log("Original coords:", complex.address.coords[0]);  // 40.7 - unchanged!
console.log("Copy city:", deepCopied.address.city);  // LA
console.log("All independent?", complex.address !== deepCopied.address);  // true

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

function cloneCart(cart) {
  return deepClone(cart);
}

function calculateTotals(cart) {
  const subtotal = cart.items.reduce((sum, item) =>
    sum + (item.price * item.quantity), 0
  );
  const tax = subtotal * 0.1;  // 10% tax
  const total = subtotal + tax;

  return { subtotal, tax, total };
}

function updateQuantity(cart, itemId, newQuantity) {
  // Clone the cart
  const newCart = cloneCart(cart);

  // Find and update the item
  const item = newCart.items.find(i => i.id === itemId);
  if (item) {
    item.quantity = newQuantity;
  }

  // Recalculate totals
  newCart.totals = calculateTotals(newCart);

  return newCart;
}

// Test
console.log("Original cart items:", cart.items[1].quantity);  // 2
const updatedCart = updateQuantity(cart, 2, 5);
console.log("Original after update:", cart.items[1].quantity);  // 2 - unchanged!
console.log("Updated cart:", updatedCart.items[1].quantity);  // 5
console.log("Updated totals:", updatedCart.totals);

// ========================================
// TASK 8: Immutable Update Patterns
// ========================================

console.log("\nTASK 8: Immutable Update Patterns");

// Update array item immutably
const users = [
  { id: 1, name: "Alice", active: true },
  { id: 2, name: "Bob", active: false }
];

// Method 1: Using map
const updatedUsers = users.map(user =>
  user.id === 2
    ? { ...user, active: true }
    : user
);

console.log("Original Bob:", users[1].active);  // false - unchanged!
console.log("Updated Bob:", updatedUsers[1].active);  // true

// Method 2: Using slice and spread
const index = 1;
const updatedUsers2 = [
  ...users.slice(0, index),
  { ...users[index], active: true },
  ...users.slice(index + 1)
];

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

const newState = {
  ...state,
  user: {
    ...state.user,
    profile: {
      ...state.user.profile,
      settings: {
        ...state.user.profile.settings,
        theme: "light"
      }
    }
  }
};

console.log("Original theme:", state.user.profile.settings.theme);  // dark - unchanged!
console.log("New theme:", newState.user.profile.settings.theme);  // light

// Add item to nested array immutably
const stateWithArray = {
  todos: [
    { id: 1, text: "Learn JS" }
  ]
};

const stateWithNewTodo = {
  ...stateWithArray,
  todos: [
    ...stateWithArray.todos,
    { id: 2, text: "Build app" }
  ]
};

console.log("Original todos:", stateWithArray.todos.length);  // 1 - unchanged!
console.log("New todos:", stateWithNewTodo.todos.length);  // 2

// Remove item from nested array immutably
const stateWithRemoved = {
  ...stateWithNewTodo,
  todos: stateWithNewTodo.todos.filter(todo => todo.id !== 1)
};

console.log("After removal:", stateWithRemoved.todos.length);  // 1

// ========================================
// TASK 9: Performance Considerations
// ========================================

console.log("\nTASK 9: Performance Considerations");

const largeArray = Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  value: Math.random(),
  nested: {
    data: [1, 2, 3]
  }
}));

// Test JSON method
console.time("JSON method");
const jsonClone = JSON.parse(JSON.stringify(largeArray));
console.timeEnd("JSON method");

// Test deepClone
console.time("Deep clone");
const deepCloned = deepClone(largeArray);
console.timeEnd("Deep clone");

// Test spread (shallow)
console.time("Spread (shallow)");
const spreadClone = [...largeArray];
console.timeEnd("Spread (shallow)");

// Test reference (no copy)
console.time("Reference");
const reference = largeArray;
console.timeEnd("Reference");

// ========================================
// TASK 10: When to Use Each Approach
// ========================================

console.log("\nTASK 10: When to Use Each Approach");

// 1. Flat array/object → spread operator
const flatObj = { name: "Alice", age: 28 };
const flatCopy = { ...flatObj };
console.log("Flat object copy:", flatCopy);

// 2. Nested data, no functions → JSON method
const apiData = {
  user: { name: "Alice", address: { city: "NYC" } }
};
const apiCopy = JSON.parse(JSON.stringify(apiData));
console.log("API data copy:", apiCopy);

// 3. Complex nested with functions → deep clone
const complexObj = {
  data: { nested: [1, 2, 3] },
  method: function() { return "Hi"; }
};
// Would need custom deep clone that preserves functions

// 4. Performance critical → shallow + careful updates
// Use shallow copies and immutable update patterns

// 5. Read-only → reference
const readOnly = apiData;  // No copy needed if just reading

// ========================================
// BONUS CHALLENGES
// ========================================

console.log("\nBONUS CHALLENGES:");

// Bonus 1: Handle special types
function deepCloneExtended(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags);
  if (obj instanceof Set) return new Set([...obj].map(item => deepCloneExtended(item)));
  if (obj instanceof Map) {
    const cloned = new Map();
    obj.forEach((value, key) => {
      cloned.set(key, deepCloneExtended(value));
    });
    return cloned;
  }
  if (Array.isArray(obj)) return obj.map(item => deepCloneExtended(item));

  const cloned = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepCloneExtended(obj[key]);
    }
  }
  return cloned;
}

const specialTypes = {
  date: new Date(),
  regex: /hello/gi,
  set: new Set([1, 2, 3]),
  map: new Map([['key', 'value']])
};

const specialClone = deepCloneExtended(specialTypes);
console.log("Bonus 1 - Special types cloned:", specialClone);

// Bonus 2: Circular references
function deepCloneWithCircular(obj, hash = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (hash.has(obj)) return hash.get(obj);  // Handle circular reference

  let cloned;
  if (Array.isArray(obj)) {
    cloned = [];
    hash.set(obj, cloned);
    obj.forEach(item => cloned.push(deepCloneWithCircular(item, hash)));
  } else {
    cloned = {};
    hash.set(obj, cloned);
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = deepCloneWithCircular(obj[key], hash);
      }
    }
  }

  return cloned;
}

const circular = { name: "Alice" };
circular.self = circular;  // Circular reference!

const circularClone = deepCloneWithCircular(circular);
console.log("Bonus 2 - Circular handled:", circularClone.self === circularClone);

console.log("\n✅ Exercise Complete!");

// ========================================
// Key Takeaways
// ========================================

console.log("\n📚 Key Takeaways:");
console.log("• Assignment (=) creates reference, not copy");
console.log("• Primitives copy by value, objects by reference");
console.log("• Spread operator creates shallow copy");
console.log("• JSON method works for simple nested data");
console.log("• Deep clone needed for complex nested structures");
console.log("• Immutable updates prevent bugs in state management");
console.log("• Choose copying method based on data structure");

