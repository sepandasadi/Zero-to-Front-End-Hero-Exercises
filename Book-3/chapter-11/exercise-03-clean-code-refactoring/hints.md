# Exercise 3: Clean Code Refactoring - Hints

## 🔍 Hint 1: Identifying Code Smells

<details>
<summary>Click to reveal</summary>

Look for these common code smells:

### **1. Duplicated Code (DRY violation)**
```jsx
// SMELL: Same calculation in multiple places
const total1 = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
const total2 = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

// FIX: Extract to function
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}
```

### **2. Magic Numbers**
```jsx
// SMELL: What does 0.1 mean?
const discounted = price * 0.1

// FIX: Named constant
const DISCOUNT_RATE = 0.1
const discounted = price * DISCOUNT_RATE
```

### **3. Long Functions (SRP violation)**
```jsx
// SMELL: Function does too many things
function processOrder() {
  // validate (responsibility 1)
  // calculate (responsibility 2)
  // save (responsibility 3)
  // email (responsibility 4)
}

// FIX: Split into smaller functions
function validateOrder() { ... }
function calculateTotal() { ... }
function saveOrder() { ... }
function sendConfirmation() { ... }
```

### **4. Complex Conditionals**
```jsx
// SMELL: Hard to understand
if (user && user.age >= 18 && user.verified && !user.banned) { ... }

// FIX: Extract to well-named function
function canAccessContent(user) {
  return user?.age >= 18 && user?.verified && !user?.banned
}

if (canAccessContent(user)) { ... }
```
</details>

---

## 🔍 Hint 2: Applying DRY (Don't Repeat Yourself)

<details>
<summary>Click to reveal</summary>

**Step 1: Find Duplicated Code**

Look for:
- Same calculations in multiple places
- Similar API call patterns
- Repeated validation logic
- Duplicated UI rendering

**Step 2: Extract to Functions**

```jsx
// BEFORE: Duplicated
function ComponentA() {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  return <div>{total}</div>
}

function ComponentB() {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  return <span>{total}</span>
}

// AFTER: Extracted
function calculateCartTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

function ComponentA() {
  const total = calculateCartTotal(items)
  return <div>{total}</div>
}

function ComponentB() {
  const total = calculateCartTotal(items)
  return <span>{total}</span>
}
```

**Step 3: Extract to Custom Hooks** (for React-specific logic)

```jsx
// BEFORE: Duplicated useEffect
function ComponentA() {
  const [data, setData] = useState(null)
  useEffect(() => {
    fetch('/api/data').then(r => r.json()).then(setData)
  }, [])
}

function ComponentB() {
  const [data, setData] = useState(null)
  useEffect(() => {
    fetch('/api/data').then(r => r.json()).then(setData)
  }, [])
}

// AFTER: Custom hook
function useData() {
  const [data, setData] = useState(null)
  useEffect(() => {
    fetch('/api/data').then(r => r.json()).then(setData)
  }, [])
  return data
}

function ComponentA() {
  const data = useData()
}

function ComponentB() {
  const data = useData()
}
```
</details>

---

## 🔍 Hint 3: Applying KISS (Keep It Simple)

<details>
<summary>Click to reveal</summary>

**Simplification Techniques:**

### **1. Early Returns**
```jsx
// COMPLEX
function getDiscount(user) {
  if (user) {
    if (user.isPremium) {
      return 0.2
    } else {
      if (user.orders > 10) {
        return 0.1
      } else {
        return 0
      }
    }
  } else {
    return 0
  }
}

// SIMPLE
function getDiscount(user) {
  if (!user) return 0
  if (user.isPremium) return 0.2
  if (user.orders > 10) return 0.1
  return 0
}
```

### **2. Extract Complex Logic**
```jsx
// COMPLEX
const result = data && data.items && data.items.length > 0
  ? data.items.filter(item => item.active).map(item => ({
      ...item,
      price: item.onSale ? item.price * 0.8 : item.price
    }))
  : []

// SIMPLE
function getActiveItems(data) {
  if (!data?.items?.length) return []
  return data.items.filter(item => item.active)
}

function applyDiscounts(items) {
  return items.map(item => ({
    ...item,
    price: item.onSale ? item.price * 0.8 : item.price
  }))
}

const result = applyDiscounts(getActiveItems(data))
```

### **3. Use Guard Clauses**
```jsx
// COMPLEX
function processUser(user) {
  if (user !== null) {
    if (user.active) {
      if (user.verified) {
        // do work
      }
    }
  }
}

// SIMPLE
function processUser(user) {
  if (!user) return
  if (!user.active) return
  if (!user.verified) return

  // do work
}
```
</details>

---

## 🔍 Hint 4: Applying SRP (Single Responsibility Principle)

<details>
<summary>Click to reveal</summary>

**Each function should do ONE thing**

### **Breaking Down Functions:**

```jsx
// BAD: Function does everything
function handleSubmit(formData) {
  // Validate
  if (!formData.email) throw new Error('Email required')
  if (!formData.password) throw new Error('Password required')
  if (formData.password.length < 8) throw new Error('Password too short')

  // Transform
  const user = {
    email: formData.email.toLowerCase(),
    password: hashPassword(formData.password),
    createdAt: new Date()
  }

  // Save
  fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(user)
  })

  // Redirect
  window.location.href = '/dashboard'
}

// GOOD: Each function has one responsibility
function validateFormData(formData) {
  if (!formData.email) throw new Error('Email required')
  if (!formData.password) throw new Error('Password required')
  if (formData.password.length < 8) throw new Error('Password too short')
}

function transformToUser(formData) {
  return {
    email: formData.email.toLowerCase(),
    password: hashPassword(formData.password),
    createdAt: new Date()
  }
}

function saveUser(user) {
  return fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(user)
  })
}

function redirectToDashboard() {
  window.location.href = '/dashboard'
}

async function handleSubmit(formData) {
  validateFormData(formData)
  const user = transformToUser(formData)
  await saveUser(user)
  redirectToDashboard()
}
```

**Benefits:**
- ✅ Easy to test each function independently
- ✅ Easy to reuse functions
- ✅ Easy to understand what each does
- ✅ Easy to modify one without affecting others
</details>

---

## 🔍 Hint 5: Replacing Magic Numbers

<details>
<summary>Click to reveal</summary>

**Extract constants for clarity:**

```jsx
// BAD: What do these numbers mean?
function calculatePrice(price, quantity) {
  const subtotal = price * quantity
  const tax = subtotal * 0.08
  const shipping = quantity > 5 ? 0 : 9.99
  return subtotal + tax + shipping
}

// GOOD: Self-documenting
const TAX_RATE = 0.08
const FREE_SHIPPING_THRESHOLD = 5
const SHIPPING_COST = 9.99

function calculatePrice(price, quantity) {
  const subtotal = price * quantity
  const tax = subtotal * TAX_RATE
  const shipping = quantity > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  return subtotal + tax + shipping
}
```

**Where to define constants:**

```jsx
// Top of file for file-specific constants
const MAX_RETRY_ATTEMPTS = 3
const API_TIMEOUT_MS = 5000

// Separate constants file for shared values
// constants.js
export const TAX_RATE = 0.08
export const DISCOUNT_RATES = {
  PREMIUM: 0.2,
  REGULAR: 0.1,
  NEW_USER: 0.05
}
```
</details>

---

## 🔍 Hint 6: Improving Function Names

<details>
<summary>Click to reveal</summary>

**Good naming makes code self-documenting:**

### **Bad → Good Examples:**

```jsx
// BAD: Unclear what it does
function process(data) { ... }

// GOOD: Clear purpose
function validateUserInput(data) { ... }
function transformUserData(data) { ... }
```

```jsx
// BAD: Misleading name
function get() { ... } // Actually saves to database!

// GOOD: Accurate
function saveToDatabase() { ... }
```

```jsx
// BAD: Vague
function handle(x) { ... }

// GOOD: Specific
function handleCheckoutSubmit(formData) { ... }
```

**Naming Conventions:**

- **Boolean functions:** `isValid`, `hasPermission`, `canAccess`
- **Action functions:** `calculateTotal`, `fetchUsers`, `updateProfile`
- **Event handlers:** `handleClick`, `onSubmit`, `handleUserLogin`
- **Getters:** `getUserName`, `getActiveItems`, `getCurrentTheme`
</details>

---

## 🔍 Hint 7: Refactoring Strategy

<details>
<summary>Click to reveal</summary>

**Step-by-step refactoring:**

1. **Identify the worst code smell first**
   - Start with duplicated code (biggest win)
   - Then tackle long functions
   - Finally clean up naming

2. **Make one change at a time**
   - Refactor one function
   - Test that it still works
   - Commit
   - Move to next function

3. **Keep tests passing**
   - If you break functionality, revert
   - Small steps are safer

4. **Measure improvement**
   - Before: Function length, nesting depth
   - After: Compare metrics

**Example Workflow:**

```
1. Find duplicated calculation → Extract to function ✓
2. Test still passes ✓
3. Find magic number → Extract to constant ✓
4. Test still passes ✓
5. Find long function → Split into smaller functions ✓
6. Test still passes ✓
```
</details>

---

## 🐛 Common Refactoring Mistakes

### **Mistake 1: Over-engineering**
```jsx
// TOO MUCH for simple code
class PriceCalculator {
  constructor(strategy) {
    this.strategy = strategy
  }
  calculate() { ... }
}

// BETTER for simple cases
function calculatePrice(items) {
  return items.reduce((sum, item) => sum + item.price, 0)
}
```

### **Mistake 2: Breaking functionality**
- **Always test after each refactoring**
- **Keep changes small**
- **Use version control**

### **Mistake 3: Perfect is the enemy of good**
- Better code doesn't have to be perfect
- Refactor what matters most first
- Ship improvements incrementally

---

## ✅ Refactoring Checklist

Use this for each function you refactor:

- [ ] **DRY**: No duplicated code
- [ ] **KISS**: Simple, easy to understand
- [ ] **SRP**: Does one thing
- [ ] **Naming**: Clear, descriptive names
- [ ] **Length**: < 20 lines preferred
- [ ] **Nesting**: Max 2-3 levels
- [ ] **Constants**: No magic numbers
- [ ] **Tests**: Still passing

---

**Still stuck?** Check the solution folder for examples!

