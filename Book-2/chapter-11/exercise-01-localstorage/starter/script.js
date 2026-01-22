// Exercise 01: localStorage Basics - STARTER CODE

console.log("=== Exercise 1: localStorage Basics ===\n");

// ========================================
// Task 1: Basic String Storage
// ========================================
console.log("--- Task 1: Basic String Storage ---");

// TODO: Store your name with key 'userName'


// TODO: Store your favorite color with key 'favoriteColor'


// TODO: Retrieve and log both values


console.log("Refresh the page - data should persist!");

// ========================================
// Task 2: Storing Objects
// ========================================
console.log("\n--- Task 2: Storing Objects ---");

const user = {
  id: 1,
  username: 'alice',
  email: 'alice@example.com',
  preferences: {
    theme: 'dark',
    notifications: true
  }
};

// TODO: Store user object in localStorage
// Hint: Use JSON.stringify()


// TODO: Retrieve user and log the email


// TODO: Update theme to 'light' and save again


// ========================================
// Task 3: Array Storage
// ========================================
console.log("\n--- Task 3: Array Storage ---");

const cart = [
  { id: 1, name: 'Laptop', price: 999, quantity: 1 },
  { id: 2, name: 'Mouse', price: 29, quantity: 2 }
];

// TODO: Store cart array


// TODO: Retrieve cart and calculate total price


// TODO: Add new item { id: 3, name: 'Keyboard', price: 89, quantity: 1 }
// Then update storage


// ========================================
// Task 4: Remove and Clear
// ========================================
console.log("\n--- Task 4: Remove and Clear ---");

// TODO: Store 5 different key-value pairs
localStorage.setItem('item1', 'value1');
// TODO: Add 4 more...


// TODO: Remove 2 specific items


// TODO: Log all remaining keys
console.log("Remaining keys:", Object.keys(localStorage));

// TODO: Clear all localStorage (uncomment when ready)
// localStorage.clear();

// ========================================
// Task 5: Check if Key Exists
// ========================================
console.log("\n--- Task 5: Check if Key Exists ---");

// TODO: Create hasItem function
function hasItem(key) {
  // Return true if key exists, false otherwise
}

// Test it
console.log("Has 'userName'?", hasItem('userName'));
console.log("Has 'nonexistent'?", hasItem('nonexistent'));

// ========================================
// Task 6: Storage Wrapper
// ========================================
console.log("\n--- Task 6: Storage Wrapper ---");

// TODO: Create setItem helper
function setItem(key, value) {
  // Store any type (automatically stringify objects/arrays)
}

// TODO: Create getItem helper
function getItem(key) {
  // Retrieve and parse if needed
}

// TODO: Create removeItem helper
function removeItem(key) {
  // Remove item
}

// TODO: Create getAllKeys helper
function getAllKeys() {
  // Return array of all storage keys
}

// Test the wrapper
console.log("\nTesting storage wrapper:");
setItem('testUser', { name: 'Bob', age: 30 });
console.log(getItem('testUser'));
console.log("All keys:", getAllKeys());

console.log("\n✅ Exercise complete! Check DevTools → Application → Local Storage");
