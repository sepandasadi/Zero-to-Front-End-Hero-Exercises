# Exercise 4: Naming Conventions - Hints

## 🔍 Hint 1: Identifying Bad Names

<details>
<summary>Click to reveal</summary>

Look for these naming red flags:

### **Single Letters (except loop counters)**
```jsx
// BAD
const x = calculateTotal()
const y = user.name
const z = filterActiveUsers()

// GOOD
const totalPrice = calculateTotal()
const userName = user.name
const activeUsers = filterActiveUsers()
```

### **Generic Names**
```jsx
// BAD
const data = fetch('/api/users')
const temp = processUser(user)
const result = calculateDiscount()

// GOOD
const usersPromise = fetch('/api/users')
const processedUser = processUser(user)
const discountAmount = calculateDiscount()
```

### **Abbreviations**
```jsx
// BAD
const usr = getUser()
const btn = document.querySelector('button')
const msg = 'Hello'

// GOOD
const user = getUser()
const button = document.querySelector('button')
const message = 'Hello'
```

**Exception:** Well-known abbreviations are OK:
- `id`, `url`, `api`, `html`, `css`, `db`, `ui`, `ux`
</details>

---

## 🔍 Hint 2: Variable Naming Patterns

<details>
<summary>Click to reveal</summary>

### **camelCase for Variables**
```jsx
// Use nouns or noun phrases
const userName = 'John'
const userList = []
const activeUserCount = 5
const shoppingCartTotal = 99.99
```

### **Be Specific, Not Generic**
```jsx
// BAD
const data = ...
const array = ...
const object = ...
const value = ...

// GOOD
const users = ...
const productIds = ...
const userProfile = ...
const totalPrice = ...
```

### **Use Full Words**
```jsx
// BAD
const num = 5
const str = 'hello'
const arr = []
const obj = {}

// GOOD
const itemCount = 5
const greetingMessage = 'hello'
const usersList = []
const userSettings = {}
```

### **Avoid Type in Name (unless necessary)**
```jsx
// BAD (redundant)
const userObject = {}
const usersArray = []
const isActiveBoolean = true

// GOOD
const user = {}
const users = []
const isActive = true

// OK (when clarifying)
const userIdsSet = new Set()  // vs usersArray
const userDataMap = new Map()  // vs userObject
```
</details>

---

## 🔍 Hint 3: Function Naming Patterns

<details>
<summary>Click to reveal</summary>

### **Use Verb + Noun**
```jsx
// BAD
function user() { ... }
function data() { ... }
function process() { ... }

// GOOD
function getUser() { ... }
function fetchUserData() { ... }
function processPayment() { ... }
```

### **Common Verb Patterns**

**Getting/Fetching:**
```jsx
function getUserById(id) { ... }
function fetchProducts() { ... }
function getActiveUsers() { ... }
function retrieveSettings() { ... }
```

**Setting/Updating:**
```jsx
function setUserName(name) { ... }
function updateUserProfile(data) { ... }
function modifySettings(settings) { ... }
```

**Creating/Adding:**
```jsx
function createUser(data) { ... }
function addToCart(item) { ... }
function generateReport() { ... }
```

**Deleting/Removing:**
```jsx
function deleteUser(id) { ... }
function removeFromCart(itemId) { ... }
function clearCache() { ... }
```

**Validating/Checking:**
```jsx
function validateEmail(email) { ... }
function checkPermission(user) { ... }
function verifyToken(token) { ... }
```

**Calculating:**
```jsx
function calculateTotal(items) { ... }
function computeDiscount(price) { ... }
function sumValues(numbers) { ... }
```

**Formatting:**
```jsx
function formatCurrency(amount) { ... }
function formatDate(date) { ... }
function parseJSON(string) { ... }
```
</details>

---

## 🔍 Hint 4: Boolean Naming

<details>
<summary>Click to reveal</summary>

### **Use Question-Like Prefixes**

**is - State/Condition:**
```jsx
const isLoading = true
const isActive = user.status === 'active'
const isValid = validateInput(input)
const isEmpty = array.length === 0
```

**has - Possession:**
```jsx
const hasPermission = user.permissions.includes('write')
const hasError = errors.length > 0
const hasChildren = node.children.length > 0
const hasData = data !== null
```

**can - Ability/Permission:**
```jsx
const canEdit = isOwner || isAdmin
const canDelete = hasPermission('delete')
const canAccess = checkAccess(user, resource)
const canSubmit = isValid && !isLoading
```

**should - Recommendation:**
```jsx
const shouldUpdate = hasChanges && isOnline
const shouldShowModal = !hasSeenBefore
const shouldRetry = retryCount < MAX_RETRIES
```

### **Boolean Functions**
```jsx
// Return value is boolean
function isValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function hasPermission(user, action) {
  return user.permissions.includes(action)
}

function canEditPost(user, post) {
  return user.id === post.authorId || user.isAdmin
}
```

### **Avoid Negative Booleans**
```jsx
// BAD (double negative is confusing)
const isNotDisabled = true
if (!isNotDisabled) { ... }

// GOOD
const isEnabled = true
if (!isEnabled) { ... }
```
</details>

---

## 🔍 Hint 5: Event Handler Naming

<details>
<summary>Click to reveal</summary>

### **handle Prefix (for component methods)**
```jsx
function UserForm() {
  function handleSubmit(e) {
    e.preventDefault()
    // handle form submission
  }

  function handleInputChange(e) {
    setValue(e.target.value)
  }

  function handleUserDelete(userId) {
    deleteUser(userId)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleInputChange} />
      <button onClick={() => handleUserDelete(user.id)}>Delete</button>
    </form>
  )
}
```

### **on Prefix (for props)**
```jsx
function Button({ onClick, onHover }) {
  return <button onClick={onClick} onMouseEnter={onHover} />
}

// Usage
<Button
  onClick={handleButtonClick}
  onHover={handleButtonHover}
/>
```

### **Be Specific**
```jsx
// BAD (too generic)
function handleClick() { ... }

// GOOD (specific to action)
function handleDeleteClick() { ... }
function handleSaveClick() { ... }
function handleCancelClick() { ... }

// EVEN BETTER (include context)
function handleUserDeleteClick() { ... }
function handleFormSaveClick() { ... }
function handleModalCancelClick() { ... }
```
</details>

---

## 🔍 Hint 6: Constant Naming

<details>
<summary>Click to reveal</summary>

### **SCREAMING_SNAKE_CASE for Constants**
```jsx
// Configuration values
const API_BASE_URL = 'https://api.example.com'
const MAX_RETRY_ATTEMPTS = 3
const DEFAULT_TIMEOUT_MS = 5000

// Magic numbers
const TAX_RATE = 0.08
const DISCOUNT_THRESHOLD = 100
const FREE_SHIPPING_MINIMUM = 50

// Status values
const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
}

// Feature flags
const ENABLE_NEW_FEATURE = true
const DEBUG_MODE = process.env.NODE_ENV === 'development'
```

### **When NOT to Use SCREAMING_SNAKE_CASE**
```jsx
// DON'T use for regular variables
const userName = 'John'  // ✅ Good
const USER_NAME = 'John'  // ❌ Bad (not a constant)

// DON'T use for component props
function Button({ onClick }) { ... }  // ✅ Good
function Button({ ON_CLICK }) { ... }  // ❌ Bad
```
</details>

---

## 🔍 Hint 7: Component & File Naming

<details>
<summary>Click to reveal</summary>

### **PascalCase for Components**
```jsx
// ✅ GOOD
function UserCard() { ... }
function ProductList() { ... }
function ShoppingCartSummary() { ... }
function NavigationBar() { ... }

// ❌ BAD
function usercard() { ... }
function product_list() { ... }
function shoppingcartsummary() { ... }
```

### **File Names Match Component Names**
```
components/
  UserCard.jsx          ← exports UserCard component
  ProductList.jsx       ← exports ProductList component
  ShoppingCartSummary.jsx
```

### **Custom Hooks: use + Noun**
```jsx
// ✅ GOOD
function useUserData() { ... }
function useFetch(url) { ... }
function useLocalStorage(key) { ... }
function useWindowSize() { ... }

// ❌ BAD
function userDataHook() { ... }
function fetchHook() { ... }
function localStorage() { ... }
```

### **Utility Files: Descriptive Plurals**
```
utils/
  formatters.js     ← formatting functions
  validators.js     ← validation functions
  apiClient.js      ← API-related functions
  dateHelpers.js    ← date utilities
```
</details>

---

## 🔍 Hint 8: Refactoring Strategy

<details>
<summary>Click to reveal</summary>

### **Step-by-Step Approach**

**1. Start with the worst names:**
```jsx
// Find the most cryptic first
const x = ...  // What is this?
const temp = ...  // Temporary what?
const data = ...  // What kind of data?
```

**2. Ask: "What does this represent?"**
```jsx
// x represents the total price
const x = calculateTotal()  // Before
const totalPrice = calculateTotal()  // After
```

**3. Use Find & Replace (carefully)**
```
Find: const x =
Replace: const totalPrice =

// But check each occurrence!
```

**4. Rename one at a time, test after each**
```
1. Rename x → totalPrice ✓
2. Test still works ✓
3. Rename temp → processedUser ✓
4. Test still works ✓
```

**5. Check for consistency**
```jsx
// Make related names consistent
getUserById()
getUserByEmail()
getUserByUsername()

// Not:
getUserById()
fetchUserEmail()
findUserName()
```
</details>

---

## 🐛 Common Naming Mistakes

### **Mistake 1: Too Generic**
```jsx
// BAD
function process(data) {
  return data.map(item => item.value)
}

// GOOD
function extractUserIds(users) {
  return users.map(user => user.id)
}
```

### **Mistake 2: Inconsistent Patterns**
```jsx
// BAD (mixing patterns)
const isActive = true
const userLoggedIn = true  // should be isUserLoggedIn
const hasPermission = false
const canEdit = true
const enabled = true  // should be isEnabled

// GOOD (consistent)
const isActive = true
const isUserLoggedIn = true
const hasPermission = false
const canEdit = true
const isEnabled = true
```

### **Mistake 3: Misleading Names**
```jsx
// BAD (function name doesn't match behavior)
function getUser() {
  // Actually saves user to database!
  saveUserToDatabase()
}

// GOOD
function saveUser() {
  saveUserToDatabase()
}
```

---

## ✅ Naming Checklist

Before you submit, check each name:

- [ ] **Descriptive:** Can someone understand it without context?
- [ ] **Consistent:** Follows the same pattern as related names?
- [ ] **Accurate:** Name matches what it does/contains?
- [ ] **Not too short:** Avoids abbreviations and single letters?
- [ ] **Not too long:** Under 4-5 words?
- [ ] **Correct case:** camelCase, PascalCase, or SCREAMING_SNAKE_CASE?
- [ ] **Proper prefix:** is/has/can for booleans, handle/on for events?

---

**Still stuck?** Check the solution folder for examples!

