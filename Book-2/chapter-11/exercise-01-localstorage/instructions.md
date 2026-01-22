# Exercise 01: localStorage Basics

## 🎯 Objective

Master the fundamentals of browser storage using localStorage. Learn to save, retrieve, and manage data that persists across browser sessions.

## 📚 What You'll Learn

- Store and retrieve string data
- Store objects using JSON
- Remove and clear items
- Handle storage limits
- Check available storage
- Understand localStorage vs sessionStorage

## 📋 Tasks

### Task 1: Basic String Storage

1. Store your name in localStorage with key 'userName'
2. Store your favorite color with key 'favoriteColor'
3. Retrieve and log both values
4. Verify they persist by refreshing the page

### Task 2: Storing Objects

Given this user object:
```js
const user = {
  id: 1,
  username: 'alice',
  email: 'alice@example.com',
  preferences: {
    theme: 'dark',
    notifications: true
  }
};
```

1. Store it in localStorage (hint: JSON.stringify)
2. Retrieve it and log the email
3. Update the theme to 'light' and save again

### Task 3: Array Storage

Given this shopping cart:
```js
const cart = [
  { id: 1, name: 'Laptop', price: 999, quantity: 1 },
  { id: 2, name: 'Mouse', price: 29, quantity: 2 }
];
```

1. Store the cart array
2. Retrieve it and calculate total price
3. Add a new item and update storage

### Task 4: Remove and Clear

1. Store 5 different key-value pairs
2. Remove 2 specific items
3. Log remaining items
4. Clear all localStorage (be careful in real apps!)

### Task 5: Check if Key Exists

Create a function `hasItem(key)` that:
- Returns true if key exists in localStorage
- Returns false otherwise
- Handles edge cases

### Task 6: Storage Wrapper

Create helper functions:
```js
function setItem(key, value) {
  // Store any type (string, object, array, etc.)
}

function getItem(key) {
  // Retrieve and parse if needed
}

function removeItem(key) {
  // Remove item
}

function getAllKeys() {
  // Return array of all keys
}
```

## ✅ Success Criteria

1. ✅ Store and retrieve strings correctly
2. ✅ Handle JSON serialization/deserialization
3. ✅ Remove items properly
4. ✅ Check for key existence
5. ✅ Create reusable helper functions

## 💡 Hints

### Hint 1: Basic Storage
```js
localStorage.setItem('key', 'value');
const value = localStorage.getItem('key');
```

### Hint 2: Objects and Arrays
```js
// Store
localStorage.setItem('user', JSON.stringify(userObj));

// Retrieve
const user = JSON.parse(localStorage.getItem('user'));
```

### Hint 3: Check Existence
```js
if (localStorage.getItem('key') !== null) {
  // Key exists
}
```

## 🧪 Testing

Open DevTools → Application tab → Local Storage → your domain
- Verify items appear
- Edit values manually
- Refresh page to test persistence

## ⏱️ Estimated Time
**25-30 minutes**

## 🎯 Bonus Challenges

1. **Storage Limit Test**: Try storing large data and catch QuotaExceededError
2. **Storage Size Calculator**: Calculate how much space your data uses
3. **Namespace Wrapper**: Create storage with prefixed keys (e.g., 'myApp_userName')
4. **TTL Storage**: Add expiration time to stored items

## 📖 Resources

- [MDN: Window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [MDN: Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)

---

**Ready to store?** Open the starter file and begin! 💾
