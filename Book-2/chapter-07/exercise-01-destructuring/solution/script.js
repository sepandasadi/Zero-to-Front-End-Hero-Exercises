// Exercise 01: Destructuring Deep Dive - SOLUTION
// This solution demonstrates all destructuring patterns

console.log("=== Exercise 1: Destructuring Deep Dive ===\n");

// ========================================
// Task 1: Basic Array Destructuring
// ========================================
console.log("--- Task 1: Basic Array Destructuring ---");

const userData = ['Alice', 'Johnson', 28, 'alice@example.com'];

// Destructure array into named variables
// Arrays destructure by position (order matters!)
const [firstName, lastName, age, email] = userData;

// Log each extracted value
console.log(firstName);  // 'Alice'
console.log(lastName);   // 'Johnson'
console.log(age);        // 28
console.log(email);      // 'alice@example.com'

// Skip elements using empty slots (comma without variable name)
// This extracts only first and third elements
const [name, , userAge] = userData;
console.log(`${name} is ${userAge} years old`);

// ========================================
// Task 2: Array Destructuring with Rest
// ========================================
console.log("\n--- Task 2: Array Destructuring with Rest ---");

const scores = [95, 87, 92, 78, 85, 90, 88];

// Rest operator (...) collects remaining elements into an array
// Must be the last element in destructuring pattern
const [firstScore, secondScore, ...otherScores] = scores;

console.log(`First score: ${firstScore}`);
console.log(`Second score: ${secondScore}`);
console.log(`Other scores: [${otherScores.join(', ')}]`);

// Calculate average using reduce
const sum = otherScores.reduce((acc, score) => acc + score, 0);
const average = sum / otherScores.length;
console.log(`Average of other scores: ${average.toFixed(1)}`);

// ========================================
// Task 3: Basic Object Destructuring
// ========================================
console.log("\n--- Task 3: Basic Object Destructuring ---");

const user = {
  id: 101,
  username: 'coderAlice',
  email: 'alice@dev.com',
  isActive: true,
  role: 'developer'
};

// Object destructuring uses property names (order doesn't matter)
// Creates variables with the same names as properties
const { username, email, role } = user;

console.log(`Username: ${username}, Email: ${email}, Role: ${role}`);

// Renaming during destructuring using colon
// Syntax: { originalName: newName }
const { username: displayName } = user;
console.log(`Display Name: ${displayName}`);

// ========================================
// Task 4: Destructuring with Default Values
// ========================================
console.log("\n--- Task 4: Destructuring with Default Values ---");

const config = {
  host: 'localhost',
  port: 3000
  // Note: protocol is missing!
};

// Provide defaults with = operator
// Defaults are only used if property is undefined
const { 
  host: serverHost = '127.0.0.1',  // Won't use default (host exists)
  port = 8080,                      // Won't use default (port exists)
  protocol = 'http'                 // Will use default (protocol missing)
} = config;

console.log(`${protocol}://${serverHost}:${port}`);

// ========================================
// Task 5: Nested Object Destructuring
// ========================================
console.log("\n--- Task 5: Nested Object Destructuring ---");

const userProfile = {
  name: 'Sarah Chen',
  contact: {
    email: 'sarah@example.com',
    phone: '555-0123',
    address: {
      street: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      zip: '94102'
    }
  },
  preferences: {
    theme: 'dark',
    notifications: true
  }
};

// Nested destructuring: dig into nested objects
// Syntax: { outerProp: { innerProp } }
const {
  name,                                    // Top level
  contact: {                               // Go into contact
    email: userEmail,                      // Rename to avoid collision
    address: {                             // Go deeper into address
      city,
      state
    }
  },
  preferences: { theme }                   // Extract from preferences
} = userProfile;

console.log(`${name} lives in ${city}, ${state} and prefers ${theme} theme`);

// ========================================
// Task 6: Destructuring in Function Parameters
// ========================================
console.log("\n--- Task 6: Destructuring in Function Parameters ---");

// Destructure directly in the parameter list
// This is incredibly common in modern JavaScript!
function displayUser({ name, age }) {
  console.log(`Name: ${name}, Age: ${age}`);
}

// Destructure with calculation
function calculateArea({ width, height }) {
  return width * height;
}

// Destructure with default values in parameters
// Default value is used if property is missing OR if passed undefined
function greetUser({ name, country = 'USA' }) {
  return `Hello ${name} from ${country}!`;
}

// Test the functions
displayUser({ name: 'Bob', age: 35, city: 'NYC' });
// Note: 'city' is ignored - we only destructured name and age

console.log(calculateArea({ width: 10, height: 20 }));
console.log(greetUser({ name: 'Alice', country: 'Canada' }));
console.log(greetUser({ name: 'Tom' })); // Uses default 'USA'

// ========================================
// Task 7: Swapping Variables
// ========================================
console.log("\n--- Task 7: Swapping Variables ---");

let a = 5;
let b = 10;

console.log(`Before: a = ${a}, b = ${b}`);

// One-liner swap using array destructuring
// Right side creates array [10, 5], left side destructures it
[a, b] = [b, a];

console.log(`After: a = ${a}, b = ${b}`);

// This is much cleaner than the old way:
// let temp = a;
// a = b;
// b = temp;

// ========================================
// Task 8: Destructuring Arrays of Objects
// ========================================
console.log("\n--- Task 8: Destructuring Arrays of Objects ---");

const products = [
  { id: 1, name: 'Laptop', price: 999, category: 'Electronics' },
  { id: 2, name: 'Phone', price: 699, category: 'Electronics' },
  { id: 3, name: 'Desk', price: 299, category: 'Furniture' }
];

// Array destructuring to get first element, then object destructuring
// Syntax: const [{ prop1, prop2 }] = array;
const [{ name: productName, price }] = products;
console.log(`First product: ${productName} costs $${price}`);

// Destructuring in for...of loop - very common pattern!
console.log("\nAll products:");
for (const { name, category } of products) {
  console.log(`Product: ${name} - Category: ${category}`);
}

// Skip middle element(s) with empty slots
const [firstProduct, , thirdProduct] = products;
console.log(`\nFirst and third: ${firstProduct.name}, ${thirdProduct.name}`);

// ========================================
// BONUS: Additional Patterns
// ========================================
console.log("\n--- Bonus Patterns ---");

// 1. Destructuring with computed property names
const key = 'username';
const obj = { username: 'Alice', age: 25 };
const { [key]: value } = obj;
console.log(`Value of '${key}': ${value}`);

// 2. Complex nested array/object destructuring
const complex = {
  users: [
    { name: 'Alice', scores: [95, 87, 92] },
    { name: 'Bob', scores: [88, 90, 85] }
  ]
};

const { 
  users: [
    { name: aliceName, scores: [aliceFirstScore] }
  ] 
} = complex;
console.log(`${aliceName}'s first score: ${aliceFirstScore}`);

// 3. Destructuring API responses (common real-world pattern)
const apiResponse = {
  status: 200,
  data: {
    users: [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' }
    ],
    meta: { total: 2, page: 1 }
  }
};

const {
  status,
  data: {
    users,
    meta: { total }
  }
} = apiResponse;

console.log(`API returned ${total} users with status ${status}`);

console.log("\n✅ Exercise complete! You've mastered destructuring!");
console.log("\n💡 Key Takeaways:");
console.log("- Destructuring makes code cleaner and more readable");
console.log("- Arrays destructure by position, objects by property name");
console.log("- Use defaults to handle missing values gracefully");
console.log("- Nested destructuring helps with complex data structures");
console.log("- Destructuring in function parameters is a modern best practice");
