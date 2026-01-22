// Exercise 01: Destructuring Deep Dive - STARTER CODE
// Complete each task using destructuring

console.log("=== Exercise 1: Destructuring Deep Dive ===\n");

// ========================================
// Task 1: Basic Array Destructuring
// ========================================
console.log("--- Task 1: Basic Array Destructuring ---");

const userData = ['Alice', 'Johnson', 28, 'alice@example.com'];

// TODO: Destructure userData to extract firstName, lastName, age, email


// TODO: Log each variable


// TODO: Destructure again to get only firstName and age (skip lastName and email)


// TODO: Log a message: "Alice is 28 years old"


// ========================================
// Task 2: Array Destructuring with Rest
// ========================================
console.log("\n--- Task 2: Array Destructuring with Rest ---");

const scores = [95, 87, 92, 78, 85, 90, 88];

// TODO: Extract first score, second score, and collect the rest


// TODO: Log first score, second score, and other scores array


// TODO: Calculate the average of otherScores
// Hint: Use reduce or calculate sum / length


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

// TODO: Destructure to extract username, email, and role


// TODO: Log: "Username: [username], Email: [email], Role: [role]"


// TODO: Destructure again but rename username to displayName


// TODO: Log displayName


// ========================================
// Task 4: Destructuring with Default Values
// ========================================
console.log("\n--- Task 4: Destructuring with Default Values ---");

const config = {
  host: 'localhost',
  port: 3000
};

// TODO: Destructure host, port, and protocol (provide default 'http' for protocol)
// Also provide a default 'localhost' for host (won't be used since it exists)


// TODO: Log the server URL: "http://localhost:3000"


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

// TODO: Destructure to extract:
// - name from top level
// - email from contact
// - city and state from address
// - theme from preferences


// TODO: Log: "Sarah Chen lives in San Francisco, CA and prefers dark theme"


// ========================================
// Task 6: Destructuring in Function Parameters
// ========================================
console.log("\n--- Task 6: Destructuring in Function Parameters ---");

// TODO: Create displayUser function that destructures name and age from parameter
function displayUser(/* destructure here */) {
  // Log: "Name: [name], Age: [age]"
}

// TODO: Create calculateArea function that destructures width and height
function calculateArea(/* destructure here */) {
  // Return width * height
}

// TODO: Create greetUser function that destructures name and country (default to 'USA')
function greetUser(/* destructure here */) {
  // Return: "Hello [name] from [country]!"
}

// Test your functions:
displayUser({ name: 'Bob', age: 35, city: 'NYC' });
console.log(calculateArea({ width: 10, height: 20 }));
console.log(greetUser({ name: 'Alice', country: 'Canada' }));
console.log(greetUser({ name: 'Tom' }));

// ========================================
// Task 7: Swapping Variables
// ========================================
console.log("\n--- Task 7: Swapping Variables ---");

let a = 5;
let b = 10;

console.log(`Before: a = ${a}, b = ${b}`);

// TODO: Swap a and b using array destructuring


console.log(`After: a = ${a}, b = ${b}`);

// ========================================
// Task 8: Destructuring Arrays of Objects
// ========================================
console.log("\n--- Task 8: Destructuring Arrays of Objects ---");

const products = [
  { id: 1, name: 'Laptop', price: 999, category: 'Electronics' },
  { id: 2, name: 'Phone', price: 699, category: 'Electronics' },
  { id: 3, name: 'Desk', price: 299, category: 'Furniture' }
];

// TODO: Destructure the first product to get its name and price


// TODO: Log: "First product: Laptop costs $999"


// TODO: Loop through products and destructure name and category from each
console.log("\nAll products:");
for (const product of products) {
  // TODO: Destructure name and category here
  
}

// TODO: Use array destructuring to get first and third products, skip second


// TODO: Log their names


console.log("\n✅ Exercise complete! Check your results above.");
