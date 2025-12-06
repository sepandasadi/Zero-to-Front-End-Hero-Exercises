# Getting Started - Naming Conventions

## 🎯 Your Task

Refactor code with terrible naming to use proper naming conventions.

**Time estimate:** 1 hour

---

## 🚨 Current Naming Problems

You have **3 files** with TERRIBLE naming:

### **1. UserManagement.jsx**
**Problems:**
- ❌ Cryptic variables: `x`, `y`, `z`, `temp`, `data`
- ❌ Unclear functions: `do()`, `get()`, `handle()`
- ❌ Inconsistent booleans: `active`, `loggedIn`, `has`
- ❌ Poor event handlers: `click()`, `submit()`

### **2. ProductCatalog.jsx**
**Problems:**
- ❌ Single-letter variables everywhere
- ❌ Generic names: `data`, `result`, `value`
- ❌ Abbreviations: `usr`, `prod`, `btn`
- ❌ Magic numbers (no constants)

### **3. utils.js**
**Problems:**
- ❌ Vague function names: `process()`, `check()`
- ❌ Inconsistent patterns
- ❌ Poor parameter names: `x`, `y`, `obj`

---

## 📐 Naming Conventions Reference

### **Variables**
```jsx
// BAD
const x = 5
const temp = user.name
const data = []

// GOOD
const maxRetries = 5
const userName = user.name
const activeUsers = []
```
**Pattern:** camelCase, descriptive nouns

### **Constants**
```jsx
// BAD
const taxRate = 0.08
const max = 100

// GOOD
const TAX_RATE = 0.08
const MAX_RETRY_ATTEMPTS = 100
```
**Pattern:** SCREAMING_SNAKE_CASE

### **Functions**
```jsx
// BAD
function process() { ... }
function data() { ... }

// GOOD
function processUserData() { ... }
function fetchProductData() { ... }
```
**Pattern:** camelCase, verb + noun

### **Booleans**
```jsx
// BAD
const active = true
const admin = false

// GOOD
const isActive = true
const hasPermission = false
const canEdit = true
const shouldShow = false
```
**Pattern:** is/has/can/should + adjective/noun

### **Event Handlers**
```jsx
// BAD
function click() { ... }
function change() { ... }

// GOOD
function handleButtonClick() { ... }
function handleInputChange() { ... }
```
**Pattern:** handle + Noun + Event

### **Components**
```jsx
// BAD
function usercard() { ... }
function button() { ... }

// GOOD
function UserCard() { ... }
function Button() { ... }
```
**Pattern:** PascalCase, descriptive nouns

---

## 🔨 Refactoring Steps

### **For Each File:**

**Step 1: Identify Bad Names** (10 min)
- Mark all single-letter variables
- Find generic names (data, temp, value)
- Note unclear functions
- Spot inconsistent booleans

**Step 2: Rename Variables** (15 min)
- Replace cryptic names with descriptive nouns
- Use camelCase
- Extract magic numbers to constants (SCREAMING_SNAKE_CASE)

**Step 3: Rename Functions** (15 min)
- Use verb + noun pattern
- Be specific about what function does
- Use proper prefixes for booleans (is, has, can)

**Step 4: Fix Event Handlers** (10 min)
- Use handle prefix for component methods
- Use on prefix for props
- Be specific about action

**Step 5: Final Check** (10 min)
- Consistent patterns
- No abbreviations
- Self-documenting names
- Test still works

---

## ✅ Success Criteria

After refactoring:

**UserManagement.jsx:**
- [ ] No cryptic variables (x, y, z, temp)
- [ ] All booleans use is/has/can/should
- [ ] Event handlers use handle/on prefix
- [ ] Descriptive function names

**ProductCatalog.jsx:**
- [ ] No single-letter variables
- [ ] No generic names (data, value, result)
- [ ] Constants in SCREAMING_SNAKE_CASE
- [ ] Full words (no abbreviations)

**utils.js:**
- [ ] All functions have verb + noun
- [ ] Descriptive parameter names
- [ ] Consistent naming patterns

**Overall:**
- [ ] App still works exactly the same
- [ ] Code is self-documenting
- [ ] Easy to understand at a glance

---

## 📏 Naming Rules Checklist

Use this for every name you write:

- [ ] **Descriptive** - Explains what it is/does
- [ ] **Consistent** - Follows same pattern as related names
- [ ] **Accurate** - Name matches behavior
- [ ] **Not too short** - Avoids x, y, temp, data
- [ ] **Not too long** - Max 3-4 words
- [ ] **Proper case** - camelCase, PascalCase, or SCREAMING_SNAKE_CASE
- [ ] **Proper prefix** - is/has/can, handle/on

---

## 💡 Tips

1. **Ask "What is this?"** - If you can't explain in 2-3 words, rename it
2. **Be specific** - `activeUsers` not `users`, `totalPrice` not `price`
3. **Use full words** - `user` not `usr`, `button` not `btn`
4. **Stay consistent** - If you use `isActive`, don't use `enabled`
5. **Test after renaming** - Make sure app still works

---

## 🧪 Verification

```bash
npm install
npm run dev
```

**Before refactoring:**
- App works but code is unreadable

**After refactoring:**
- App still works
- Code is self-documenting
- Anyone can understand it!

---

**Need help?** Check `../hints.md`

**Estimated time:** 1 hour

Let's make this code readable! 📝

