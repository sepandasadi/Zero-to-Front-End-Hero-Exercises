# Chapter 11: Code Organization & Clean Code - Quiz

Test your knowledge of clean code and organization!

**Instructions:**
- Answer all 15 questions
- Each question has one correct answer
- Explanations provided after each question
- Passing score: 13/15 (87%)

---

## Questions

### 1. What is the main advantage of feature-first file organization over type-first?

**A)** Smaller file sizes
**B)** Related code is grouped together, easier to maintain
**C)** Faster performance
**D)** Better browser compatibility

<details>
<summary>Show Answer</summary>

**Correct Answer: B) Related code is grouped together, easier to maintain**

**Explanation:**
Feature-first organization groups all files related to a feature in one folder:

```
features/
  products/
    components/
    hooks/
    api/
    utils/
```

**Benefits:**
- Easy to find related files
- Delete feature = delete one folder
- Clear boundaries (less coupling)
- Scales to any size

**Type-first becomes unmanageable:**
```
components/  (100+ files in one folder)
hooks/       (scattered across features)
utils/       (what feature does this belong to?)
```

**Rule:** Use feature-first for projects with 3+ features.
</details>

---

### 2. What does DRY stand for?

**A)** Do Repeat Yourself
**B)** Don't Repeat Yourself
**C)** Debug Rapidly Yourself
**D)** Data Reusability Yearly

<details>
<summary>Show Answer</summary>

**Correct Answer: B) Don't Repeat Yourself**

**Explanation:**
DRY means avoiding code duplication by extracting shared logic:

**❌ Bad (repetition):**
```javascript
function processAdmin(user) {
  const fullName = user.firstName + ' ' + user.lastName;
  const email = user.email.toLowerCase();
  return { fullName, email };
}

function processRegular(user) {
  const fullName = user.firstName + ' ' + user.lastName;
  const email = user.email.toLowerCase();
  return { fullName, email };
}
```

**✅ Good (DRY):**
```javascript
function formatUser(user) {
  const fullName = `${user.firstName} ${user.lastName}`;
  const email = user.email.toLowerCase();
  return { fullName, email };
}

function processAdmin(user) {
  return { ...formatUser(user), role: 'admin' };
}

function processRegular(user) {
  return { ...formatUser(user), role: 'user' };
}
```

**Benefits:** Change formatting logic once, applies everywhere.
</details>

---

### 3. Which naming convention should be used for React components?

**A)** camelCase
**B)** PascalCase
**C)** snake_case
**D)** SCREAMING_SNAKE_CASE

<details>
<summary>Show Answer</summary>

**Correct Answer: B) PascalCase**

**Explanation:**
React components use PascalCase:

```jsx
// ✅ Good
function ProductCard() {}
function UserProfile() {}
function CheckoutSummary() {}

// ❌ Bad
function productCard() {}      // camelCase (for regular functions)
function product_card() {}     // snake_case (not JavaScript convention)
function PRODUCT_CARD() {}     // SCREAMING_SNAKE_CASE (for constants)
```

**Other naming conventions:**
- Variables/functions: camelCase (`calculateTotal`, `userEmail`)
- Constants: SCREAMING_SNAKE_CASE (`API_KEY`, `MAX_RETRIES`)
- Files: Match export (ProductCard.jsx, useAuth.js)
</details>

---

### 4. What does KISS stand for in clean code principles?

**A)** Keep It Short and Simple
**B)** Keep It Simple, Stupid
**C)** Keep Iterating Simple Solutions
**D)** Keep Internal State Separate

<details>
<summary>Show Answer</summary>

**Correct Answer: B) Keep It Simple, Stupid**

**Explanation:**
KISS means don't over-engineer solutions. Simple is better:

**❌ Bad (over-engineered):**
```javascript
function getUserStatus(user) {
  const statusFactory = new StatusFactory();
  const statusStrategy = statusFactory.createStrategy(user.status);
  return statusStrategy.execute();
}
```

**✅ Good (simple):**
```javascript
function getUserStatusColor(status) {
  if (status === 'ACTIVE') return 'green';
  if (status === 'SUSPENDED') return 'red';
  return 'gray';
}
```

**When to add complexity:** Only when it actually simplifies the code or adds real value.
</details>

---

### 5. What is the Container/Presentational pattern?

**A)** Separating logic (Container) from UI (Presentational)
**B)** Using containers for layout
**C)** Presenting data in containers
**D)** Containerizing apps with Docker

<details>
<summary>Show Answer</summary>

**Correct Answer: A) Separating logic (Container) from UI (Presentational)**

**Explanation:**

**Presentational Component (dumb):**
```jsx
// ProductCard.jsx - Just UI
export function ProductCard({ product, onAddToCart }) {
  return (
    <div>
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={() => onAddToCart(product)}>Add</button>
    </div>
  );
}
```

**Container Component (smart):**
```jsx
// ProductCardContainer.jsx - Logic
import { useCart } from '../cart/hooks/useCart';
import { ProductCard } from './ProductCard';

export function ProductCardContainer({ product }) {
  const { addItem } = useCart();

  const handleAdd = (product) => {
    addItem({ id: product.id, quantity: 1 });
  };

  return <ProductCard product={product} onAddToCart={handleAdd} />;
}
```

**Benefits:**
- Easy to test presentational components (pure functions)
- Easy to reuse (same UI, different logic)
- Clear separation of concerns
</details>

---

### 6. What does YAGNI stand for?

**A)** You Always Get New Ideas
**B)** You Aren't Gonna Need It
**C)** Your Application Goes Near Infinity
**D)** Yes And Go Now Implement

<details>
<summary>Show Answer</summary>

**Correct Answer: B) You Aren't Gonna Need It**

**Explanation:**
YAGNI means don't build features you don't need yet:

**❌ Bad (building for imaginary future):**
```javascript
class User {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    // Not used anywhere yet...
    this.preferences = data.preferences || {};
    this.settings = data.settings || {};
    this.metadata = data.metadata || {};
  }

  // Might need someday...
  updatePreferences() {}
  clearCache() {}
}
```

**✅ Good (only what you need):**
```javascript
class User {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
  }
}

// Add features when actually needed
```

**Why?** Code you write has maintenance cost. Only write what you need today.
</details>

---

### 7. Which is the best name for a function that validates an email?

**A)** `check()`
**B)** `validateEmail()`
**C)** `email()`
**D)** `doValidation()`

<details>
<summary>Show Answer</summary>

**Correct Answer: B) `validateEmail()`**

**Explanation:**
Function names should be verb + noun, clear and specific:

```javascript
// ❌ Bad: Vague
check()              // Check what?
email()             // Do what with email?
doValidation()      // Validate what?
process()           // Process what?

// ✅ Good: Clear, specific
validateEmail(email)
calculateTotal(items)
formatCurrency(amount)
fetchUserData(id)
```

**Boolean functions:** Use `is`, `has`, `should` prefix
```javascript
isAuthenticated()
hasPermission(role)
shouldShowModal()
```
</details>

---

### 8. What is the Single Responsibility Principle (SRP)?

**A)** Functions should only be called once
**B)** Each function/class should do one thing only
**C)** Only one person should write each function
**D)** Functions should return only one value

<details>
<summary>Show Answer</summary>

**Correct Answer: B) Each function/class should do one thing only**

**Explanation:**

**❌ Bad (multiple responsibilities):**
```javascript
function processOrder(order) {
  // Validate
  if (!order.items) throw new Error('No items');
  // Calculate
  const total = order.items.reduce((sum, i) => sum + i.price, 0);
  // Save
  database.save(order);
  // Email
  emailService.send(order.email, 'Confirmation');
  return total;
}
```

**✅ Good (single responsibility):**
```javascript
function validateOrder(order) {
  if (!order.items) throw new Error('No items');
}

function calculateTotal(items) {
  return items.reduce((sum, i) => sum + i.price, 0);
}

function saveOrder(order) {
  return database.save(order);
}

function sendConfirmation(email) {
  emailService.send(email, 'Confirmation');
}

// Orchestrate
function processOrder(order) {
  validateOrder(order);
  const total = calculateTotal(order.items);
  saveOrder({ ...order, total });
  sendConfirmation(order.email);
  return total;
}
```

**Benefits:** Easy to test, reuse, modify, and understand.
</details>

---

### 9. When should you add code comments?

**A)** For every line of code
**B)** To explain WHY, not WHAT
**C)** Never, code should be self-documenting
**D)** Only for functions

<details>
<summary>Show Answer</summary>

**Correct Answer: B) To explain WHY, not WHAT**

**Explanation:**

**✅ Good comments (explain WHY):**
```javascript
// We use exponential backoff to avoid overwhelming the API
// after a 429 (rate limit) response
async function fetchWithRetry(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fetch(url);
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await delay(Math.pow(2, i) * 1000); // 1s, 2s, 4s
    }
  }
}

// Calculate compound interest: A = P(1 + r/n)^(nt)
// P = principal, r = rate, n = compounds/year, t = years
function calculateCompoundInterest(principal, rate, years) {
  const n = 12;
  return principal * Math.pow((1 + rate / n), n * years);
}
```

**❌ Bad comments (state the obvious):**
```javascript
// Loop through users
users.forEach(user => {
  // Send email to user
  sendEmail(user);
});
```

**Rule:** If WHY isn't obvious, comment. If WHAT is obvious, don't.
</details>

---

### 10. What naming convention is best for constants?

**A)** camelCase
**B)** PascalCase
**C)** SCREAMING_SNAKE_CASE
**D)** kebab-case

<details>
<summary>Show Answer</summary>

**Correct Answer: C) SCREAMING_SNAKE_CASE**

**Explanation:**

```javascript
// ✅ Good: SCREAMING_SNAKE_CASE for constants
const API_KEY = 'abc123';
const MAX_RETRIES = 3;
const DEFAULT_PAGE_SIZE = 20;
const CACHE_DURATION_MS = 5 * 60 * 1000;

// ✅ Also good: For config objects
const API_CONFIG = {
  baseUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3
};

// ❌ Bad
const key = 'abc123';        // Unclear it's a constant
const maxRetries = 3;        // Looks like a variable
```

**Why?** SCREAMING_SNAKE_CASE makes it immediately obvious these are constants and shouldn't be modified.
</details>

---

### 11. What is "early return" refactoring?

**A)** Returning from functions as soon as possible
**B)** Exiting loops early
**C)** Returning early from async functions
**D)** Returning before all code executes

<details>
<summary>Show Answer</summary>

**Correct Answer: A) Returning from functions as soon as possible**

**Explanation:**
Early returns reduce nesting and make code clearer:

**❌ Bad (nested conditionals):**
```javascript
function processPayment(payment) {
  if (payment.amount > 0) {
    if (payment.method === 'card') {
      if (payment.cardNumber) {
        return charge(payment);
      } else {
        throw new Error('No card number');
      }
    } else {
      throw new Error('Invalid method');
    }
  } else {
    throw new Error('Invalid amount');
  }
}
```

**✅ Good (early returns):**
```javascript
function processPayment(payment) {
  if (payment.amount <= 0) {
    throw new Error('Invalid amount');
  }

  if (payment.method !== 'card') {
    throw new Error('Invalid method');
  }

  if (!payment.cardNumber) {
    throw new Error('No card number');
  }

  return charge(payment);
}
```

**Benefits:** Flatter code, easier to read, errors at the top.
</details>

---

### 12. In Atomic Design, what are the smallest building blocks called?

**A)** Molecules
**B)** Atoms
**C)** Cells
**D)** Elements

<details>
<summary>Show Answer</summary>

**Correct Answer: B) Atoms**

**Explanation:**
Atomic Design hierarchy (smallest to largest):

**1. Atoms** (smallest):
```jsx
function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>;
}

function Input({ label, ...props }) {
  return <input {...props} />;
}
```

**2. Molecules** (groups of atoms):
```jsx
function SearchBar() {
  return (
    <div>
      <Input placeholder="Search..." />
      <Button>Search</Button>
    </div>
  );
}
```

**3. Organisms** (complex components):
```jsx
function ProductGrid({ products }) {
  return (
    <div>
      <SearchBar />
      {products.map(p => <ProductCard key={p.id} {...p} />)}
    </div>
  );
}
```

**4. Templates** (page layouts)
**5. Pages** (specific instances)
</details>

---

### 13. What should you do when giving code review feedback?

**A)** Be vague so the developer figures it out
**B)** Be specific and actionable with suggestions
**C)** Only point out errors
**D)** Rewrite the code yourself

<details>
<summary>Show Answer</summary>

**Correct Answer: B) Be specific and actionable with suggestions**

**Explanation:**

**✅ Good code review comments:**
```
"Consider extracting this calculation into a calculateDiscount()
function for better testability"

"What happens if user.email is undefined? Should we add a null check?"

"This could be simplified using array destructuring:
const [firstName, lastName] = fullName.split(' ');"

"This might cause a memory leak because the event listener isn't
cleaned up. Consider using useEffect with a cleanup function."
```

**❌ Bad code review comments:**
```
"This doesn't look right"           // Vague
"Why did you write it like this?"   // Personal
"Add a space here"                  // Nitpicky
"Change this"                       // Demanding
```

**Good reviews:**
- Specific and actionable
- Ask questions
- Suggest improvements
- Point out potential issues
- Educational, not judgmental
</details>

---

### 14. What does "extract function" refactoring mean?

**A)** Deleting unused functions
**B)** Taking repeated code and making it a reusable function
**C)** Removing functions from components
**D)** Importing functions from libraries

<details>
<summary>Show Answer</summary>

**Correct Answer: B) Taking repeated code and making it a reusable function**

**Explanation:**

**Before (repetition):**
```jsx
function OrderSummary({ order }) {
  const subtotal = order.items.reduce((s, i) => s + i.price * i.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div>
      <div>Subtotal: ${subtotal}</div>
      <div>Tax: ${tax}</div>
      <div>Total: ${total}</div>
    </div>
  );
}
```

**After (extracted functions):**
```javascript
function calculateSubtotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function calculateTax(subtotal) {
  return subtotal * 0.1;
}

function OrderSummary({ order }) {
  const subtotal = calculateSubtotal(order.items);
  const tax = calculateTax(subtotal);
  const total = subtotal + tax;

  return <OrderTotals subtotal={subtotal} tax={tax} total={total} />;
}
```

**Benefits:** Reusable, testable, readable.
</details>

---

### 15. What is the recommended maximum length for a function?

**A)** 10 lines
**B)** 50 lines
**C)** If it fits on your screen without scrolling
**D)** 200 lines

<details>
<summary>Show Answer</summary>

**Correct Answer: C) If it fits on your screen without scrolling**

**Explanation:**
If you can't see the entire function at once, it's probably too long:

**❌ Bad (200-line function):**
```javascript
function handleCheckout() {
  // Validate form (30 lines)
  // Calculate totals (40 lines)
  // Process payment (50 lines)
  // Create order (40 lines)
  // Send emails (40 lines)
  // Total: 200 lines, impossible to understand
}
```

**✅ Good (break into smaller functions):**
```javascript
function handleCheckout() {
  validateForm();
  const total = calculateTotal();
  processPayment(total);
  createOrder();
  sendConfirmation();
}

// Each function is 10-30 lines, easy to understand
```

**Rule of thumb:**
- Functions: 10-50 lines (ideally < 30)
- Components: < 100 lines (extract sub-components)
- If you can't name it clearly, it's doing too much

**Uncle Bob Martin:** "Functions should do one thing, do it well, and do it only."
</details>

---

## Scoring

- **15/15 (100%)**: Clean Code Master! 🏆
- **13-14/15 (87-93%)**: Excellent! You understand clean code principles. ⭐
- **11-12/15 (73-80%)**: Good! Review SOLID principles and naming.
- **9-10/15 (60-67%)**: Passing, but review file organization and refactoring.
- **< 9/15 (< 60%)**: Review the chapter and try again.

---

## Key Takeaways

If you remember nothing else, remember:

1. **Feature-first organization** for scalability (3+ features)
2. **DRY**: Don't repeat yourself (extract shared logic)
3. **KISS**: Keep it simple (don't over-engineer)
4. **Single Responsibility**: Each function does ONE thing
5. **Name clearly**: Code should be self-documenting
6. **Early returns**: Reduce nesting, improve readability
7. **Extract functions**: Long functions → multiple small functions
8. **Comment WHY**: Not what (code explains what)

**Write code others will enjoy reading!** 🎨✨
