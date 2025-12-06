# Exercise 4: Naming Conventions

**Difficulty:** Beginner-Intermediate
**Time:** 1 hour
**Focus:** Variable, function, and component naming best practices

## 🎯 Learning Objectives

- Master variable naming conventions
- Write self-documenting function names
- Use proper component naming patterns
- Apply consistent naming across your codebase
- Make code more readable through better names

## 📋 Problem

You have code with terrible naming:
- Cryptic variable names: `x`, `temp`, `data`, `arr`
- Unclear functions: `process()`, `handle()`, `do()`
- Inconsistent casing: `UserCard`, `user_profile`, `GETDATA`
- Misleading names: `get()` that actually saves data

Bad naming makes code impossible to understand and maintain!

## 🎯 Naming Conventions Guide

### **1. Variables - camelCase, Descriptive Nouns**

```jsx
// ❌ BAD
const x = 5
const temp = user.name
const arr = users.filter(u => u.active)
const data = fetch('/api/users')

// ✅ GOOD
const maxRetries = 5
const userName = user.name
const activeUsers = users.filter(u => u.active)
const userDataPromise = fetch('/api/users')
```

**Rules:**
- Use `camelCase`
- Use descriptive nouns
- Avoid abbreviations (unless very common: `id`, `url`, `api`)
- Be specific: `users` not `data`, `userName` not `name`

---

### **2. Constants - SCREAMING_SNAKE_CASE**

```jsx
// ❌ BAD
const taxRate = 0.08
const maxLength = 100
const apiUrl = 'https://api.example.com'

// ✅ GOOD
const TAX_RATE = 0.08
const MAX_LENGTH = 100
const API_URL = 'https://api.example.com'
```

**Rules:**
- Use `SCREAMING_SNAKE_CASE` for true constants
- Define at module/file top level
- Group related constants together

---

### **3. Functions - camelCase, Verb + Noun**

```jsx
// ❌ BAD
function process(user) { ... }
function data() { ... }
function user() { ... }

// ✅ GOOD
function processUserData(user) { ... }
function fetchUserData() { ... }
function validateUserInput(user) { ... }
```

**Common Verbs:**
- **Get/Fetch:** `getUserById`, `fetchProducts`
- **Set/Update:** `setUserName`, `updateProfile`
- **Create/Add:** `createUser`, `addToCart`
- **Delete/Remove:** `deleteUser`, `removeFromCart`
- **Calculate:** `calculateTotal`, `calculateDiscount`
- **Validate:** `validateEmail`, `validateInput`
- **Format:** `formatCurrency`, `formatDate`
- **Check/Verify:** `checkPermission`, `verifyToken`

---

### **4. Boolean Variables/Functions**

```jsx
// ❌ BAD
const active = user.status === 'active'
const admin = user.role === 'admin'
function valid(email) { ... }

// ✅ GOOD
const isActive = user.status === 'active'
const isAdmin = user.role === 'admin'
const hasPermission = user.permissions.includes('write')
const canEdit = isAdmin || hasPermission
const shouldShowModal = isLoggedIn && !hasSeenModal

function isValid(email) { ... }
function hasAccess(user) { ... }
function canDelete(user, item) { ... }
```

**Prefixes:**
- `is` - state/condition: `isLoading`, `isActive`, `isValid`
- `has` - possession: `hasPermission`, `hasData`, `hasError`
- `can` - ability: `canEdit`, `canDelete`, `canAccess`
- `should` - recommendation: `shouldUpdate`, `shouldShow`

---

### **5. Event Handlers**

```jsx
// ❌ BAD
function click() { ... }
function submit() { ... }
const change = () => { ... }

// ✅ GOOD - handleX pattern
function handleClick() { ... }
function handleSubmit() { ... }
function handleInputChange() { ... }
function handleUserDelete(userId) { ... }

// ✅ ALSO GOOD - onX pattern (for props)
<Button onClick={handleClick} />
<Form onSubmit={handleFormSubmit} />
```

**Patterns:**
- Component methods: `handleClick`, `handleSubmit`, `handleChange`
- Props passed to children: `onClick`, `onSubmit`, `onChange`
- Be specific: `handleUserDelete` not `handleDelete`

---

### **6. Components - PascalCase, Descriptive Nouns**

```jsx
// ❌ BAD
function usercard() { ... }
function BUTTON() { ... }
function item() { ... }

// ✅ GOOD
function UserCard() { ... }
function Button() { ... }
function ProductListItem() { ... }
function ShoppingCartSummary() { ... }
```

**Rules:**
- Use `PascalCase`
- Noun or noun phrase
- Be descriptive: `UserProfileCard` not `Card`
- Group related: `UserCard`, `UserList`, `UserProfile`

---

### **7. Custom Hooks - use + Noun**

```jsx
// ❌ BAD
function userData() { ... }
function fetchUser() { ... }
function user() { ... }

// ✅ GOOD
function useUserData() { ... }
function useFetch() { ... }
function useLocalStorage() { ... }
function useWindowSize() { ... }
```

---

### **8. Files - Match component/export name**

```
// ❌ BAD
components/
  usercard.jsx
  BUTTON.jsx
  list-item.jsx

// ✅ GOOD
components/
  UserCard.jsx
  Button.jsx
  ProductListItem.jsx

utils/
  formatters.js
  validators.js
  apiClient.js
```

---

## ✅ Requirements

Refactor the provided code with terrible naming:

1. **UserManagement Component**
   - [ ] Fix cryptic variable names
   - [ ] Rename unclear functions
   - [ ] Use proper boolean naming
   - [ ] Consistent event handler naming

2. **ProductCatalog Component**
   - [ ] Descriptive variable names
   - [ ] Verb + noun function names
   - [ ] Extract constants with proper naming
   - [ ] Clear prop names

3. **Utility Functions**
   - [ ] Self-documenting function names
   - [ ] Proper parameter names
   - [ ] Boolean function naming

## ✅ Acceptance Criteria

- [ ] All variables use `camelCase` with descriptive nouns
- [ ] All constants use `SCREAMING_SNAKE_CASE`
- [ ] All functions use `camelCase` with verb + noun
- [ ] All components use `PascalCase`
- [ ] Boolean variables/functions use `is`, `has`, `can`, `should`
- [ ] Event handlers use `handle` or `on` prefix
- [ ] No cryptic names: `x`, `temp`, `data`, `arr`
- [ ] No abbreviations (except common: `id`, `url`, `api`)

## 💡 Naming Anti-Patterns to Avoid

1. **Single letters:** `x`, `y`, `i` (except loop counters)
2. **Generic names:** `data`, `temp`, `result`, `value`
3. **Abbreviations:** `usr`, `btn`, `msg` (use full words)
4. **Redundant:** `userObject`, `arrayOfUsers` (type in name)
5. **Misleading:** `getData()` that saves, `isActive()` that changes state
6. **Too short:** `get()`, `set()`, `do()`
7. **Too long:** `getUserDataFromDatabaseAndReturnFormattedResult()`

## 🎁 Bonus Challenges

1. Create a naming conventions guide for your team
2. Set up ESLint rules for naming conventions
3. Refactor a real project with better naming
4. Document naming patterns in your codebase

---

**Time Estimate:** 1 hour
**Difficulty:** Beginner-Intermediate

Ready to make your code self-documenting? Check the starter code!

