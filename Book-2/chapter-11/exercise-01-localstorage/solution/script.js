// Exercise 01: localStorage Basics - SOLUTION

console.log("=== Exercise 1: localStorage Basics ===\n");

// ========================================
// Task 1: Basic String Storage
// ========================================
console.log("--- Task 1: Basic String Storage ---");

// Store string values directly
localStorage.setItem('userName', 'Alice');
localStorage.setItem('favoriteColor', 'blue');

// Retrieve and log
const userName = localStorage.getItem('userName');
const favoriteColor = localStorage.getItem('favoriteColor');

console.log('User Name:', userName);
console.log('Favorite Color:', favoriteColor);
console.log("✓ Data persists after page refresh!");

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

// Objects must be stringified before storage
localStorage.setItem('user', JSON.stringify(user));

// Retrieve and parse
const storedUser = JSON.parse(localStorage.getItem('user'));
console.log('User Email:', storedUser.email);

// Update nested property
storedUser.preferences.theme = 'light';
localStorage.setItem('user', JSON.stringify(storedUser));
console.log('Updated theme to:', storedUser.preferences.theme);

// ========================================
// Task 3: Array Storage
// ========================================
console.log("\n--- Task 3: Array Storage ---");

let cart = [
  { id: 1, name: 'Laptop', price: 999, quantity: 1 },
  { id: 2, name: 'Mouse', price: 29, quantity: 2 }
];

// Store array
localStorage.setItem('cart', JSON.stringify(cart));

// Retrieve and calculate total
cart = JSON.parse(localStorage.getItem('cart'));
const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
console.log('Cart Total: $' + total);

// Add new item
cart.push({ id: 3, name: 'Keyboard', price: 89, quantity: 1 });
localStorage.setItem('cart', JSON.stringify(cart));
console.log('Updated cart items:', cart.length);

// ========================================
// Task 4: Remove and Clear
// ========================================
console.log("\n--- Task 4: Remove and Clear ---");

// Store multiple items
localStorage.setItem('item1', 'value1');
localStorage.setItem('item2', 'value2');
localStorage.setItem('item3', 'value3');
localStorage.setItem('item4', 'value4');
localStorage.setItem('item5', 'value5');

console.log('Stored 5 items');

// Remove specific items
localStorage.removeItem('item2');
localStorage.removeItem('item4');
console.log('Removed item2 and item4');

// Log remaining keys
const remainingKeys = Object.keys(localStorage);
console.log('Remaining keys:', remainingKeys);

// Note: localStorage.clear() would remove EVERYTHING
// Only use when you're sure!
// localStorage.clear();

// ========================================
// Task 5: Check if Key Exists
// ========================================
console.log("\n--- Task 5: Check if Key Exists ---");

function hasItem(key) {
  // getItem returns null if key doesn't exist
  return localStorage.getItem(key) !== null;
}

// Alternative using 'in' operator (checks keys only)
function hasItemAlt(key) {
  return key in localStorage;
}

console.log("Has 'userName'?", hasItem('userName'));  // true
console.log("Has 'nonexistent'?", hasItem('nonexistent'));  // false

// ========================================
// Task 6: Storage Wrapper
// ========================================
console.log("\n--- Task 6: Storage Wrapper ---");

// Intelligent setItem that handles any type
function setItem(key, value) {
  try {
    // If value is object/array, stringify it
    const valueToStore = typeof value === 'object' 
      ? JSON.stringify(value) 
      : value;
    localStorage.setItem(key, valueToStore);
  } catch (error) {
    console.error('Error storing item:', error);
    // Handle QuotaExceededError
    if (error.name === 'QuotaExceededError') {
      console.error('Storage quota exceeded!');
    }
  }
}

// Intelligent getItem that parses JSON if needed
function getItem(key) {
  try {
    const value = localStorage.getItem(key);
    
    if (value === null) {
      return null;
    }
    
    // Try to parse as JSON
    try {
      return JSON.parse(value);
    } catch {
      // If parse fails, return as string
      return value;
    }
  } catch (error) {
    console.error('Error retrieving item:', error);
    return null;
  }
}

// Simple wrapper for remove
function removeItem(key) {
  localStorage.removeItem(key);
}

// Get all keys as array
function getAllKeys() {
  return Object.keys(localStorage);
}

// Test the wrapper
console.log("\nTesting storage wrapper:");

setItem('testString', 'Hello World');
setItem('testNumber', 42);
setItem('testObject', { name: 'Bob', age: 30 });
setItem('testArray', [1, 2, 3]);

console.log('String:', getItem('testString'));
console.log('Number:', getItem('testNumber'));
console.log('Object:', getItem('testObject'));
console.log('Array:', getItem('testArray'));
console.log('All keys:', getAllKeys());

// ========================================
// BONUS: Advanced Patterns
// ========================================
console.log("\n--- Bonus: Advanced Patterns ---");

// 1. Storage with TTL (Time To Live)
function setItemWithTTL(key, value, ttlMs) {
  const item = {
    value: value,
    expiry: Date.now() + ttlMs
  };
  localStorage.setItem(key, JSON.stringify(item));
}

function getItemWithTTL(key) {
  const itemStr = localStorage.getItem(key);
  
  if (!itemStr) {
    return null;
  }
  
  const item = JSON.parse(itemStr);
  
  // Check if expired
  if (Date.now() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  
  return item.value;
}

// Store item that expires in 5 seconds
setItemWithTTL('tempData', 'This expires soon', 5000);
console.log('Temp data:', getItemWithTTL('tempData'));

// 2. Namespaced storage (avoid key collisions)
function createNamespacedStorage(namespace) {
  return {
    setItem(key, value) {
      const namespacedKey = `${namespace}_${key}`;
      setItem(namespacedKey, value);
    },
    getItem(key) {
      const namespacedKey = `${namespace}_${key}`;
      return getItem(namespacedKey);
    },
    removeItem(key) {
      const namespacedKey = `${namespace}_${key}`;
      localStorage.removeItem(namespacedKey);
    }
  };
}

const myAppStorage = createNamespacedStorage('myApp');
myAppStorage.setItem('setting', { theme: 'dark' });
console.log('Namespaced setting:', myAppStorage.getItem('setting'));

// 3. Calculate storage usage
function getStorageSize() {
  let total = 0;
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      total += localStorage[key].length + key.length;
    }
  }
  return (total / 1024).toFixed(2) + ' KB';
}

console.log('Storage usage:', getStorageSize());

console.log("\n✅ Exercise complete! Master of localStorage!");
console.log("\n💡 Key Takeaways:");
console.log("- localStorage stores strings only");
console.log("- Use JSON.stringify/parse for objects/arrays");
console.log("- Data persists across browser sessions");
console.log("- Has ~5-10MB storage limit per origin");
console.log("- Always handle errors (QuotaExceededError)");
console.log("- Check DevTools → Application → Local Storage to inspect");
