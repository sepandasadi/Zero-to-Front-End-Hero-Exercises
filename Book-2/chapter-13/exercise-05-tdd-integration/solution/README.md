# Exercise 05 Solution: TDD Workflow - Shopping Cart

This solution demonstrates **Test-Driven Development (TDD)** with a shopping cart feature.

---

## 🎯 What Was Built

A fully functional shopping cart with:
- ✅ Add products to cart
- ✅ Increase/decrease quantity
- ✅ Remove products
- ✅ Calculate total price
- ✅ Clear cart
- ✅ Display item count

**All built using TDD!** 🔴🟢🔵

---

## 🔴🟢🔵 TDD Workflow Demonstrated

### The Process:

1. **🔴 RED** - Tests were written first (all failing)
2. **🟢 GREEN** - Code was written to pass each test
3. **🔵 REFACTOR** - Code was improved while keeping tests green

### Test Coverage: 15 tests

**Empty Cart** (2 tests)
- Shows empty message
- Displays $0.00 total

**Adding Products** (4 tests)
- Adds product to cart
- Displays price
- Shows item count
- Handles multiple products

**Quantity Management** (4 tests)
- Increases quantity
- Decreases quantity
- Shows quantity display
- Removes when quantity hits zero

**Removing Products** (1 test)
- Remove button works

**Total Calculation** (3 tests)
- Single item total
- Multiple items total
- Updates when quantity changes

**Clear Cart** (1 test)
- Clears all items

---

## 🏗️ Implementation Details

### Cart Component Features:

```javascript
// State management
const [cartItems, setCartItems] = useState([]);

// Key functions (all test-driven!)
- addToCart(product)      // Add or increase quantity
- increaseQuantity(id)    // +1 to quantity
- decreaseQuantity(id)    // -1 to quantity (remove if 0)
- removeFromCart(id)      // Remove item
- clearCart()             // Empty cart
- calculateTotal()        // Sum all prices
- getTotalItems()         // Count all items
```

---

## 🧪 Running Tests

```bash
# Install dependencies
npm install

# Run all tests
npm test

# Watch mode (for TDD)
npm run test:watch
```

**All 15 tests pass! ✅**

---

## 💡 TDD Principles Applied

### 1. Write Test First
Every feature started with a failing test:
```javascript
it('adds product to cart', async () => {
  // Test written BEFORE implementation
});
```

### 2. Minimal Code
Only enough code to pass the current test:
```javascript
// Not this (overengineered):
const addToCart = (product, quantity, options) => { ... }

// This (just enough):
const addToCart = (product) => { ... }
```

### 3. Refactor Safely
Tests protect you during refactoring:
```javascript
// Before refactor
const total = cartItems.reduce((sum, item) => {
  return sum + item.price * item.quantity;
}, 0);

// After refactor (tests still pass!)
const calculateTotal = () => {
  return cartItems.reduce((total, item) =>
    total + (item.price * item.quantity), 0
  );
};
```

### 4. YAGNI (You Aren't Gonna Need It)
No features were added that weren't tested:
- ❌ No wishlist
- ❌ No product images
- ❌ No coupon codes
- ✅ Only what tests required

---

## 📊 Test Structure

```
src/
├── features/
│   └── cart/
│       ├── Cart.jsx       # Component (built with TDD)
│       └── Cart.css       # Styles
└── __tests__/
    └── Cart.test.jsx      # 15 tests (written FIRST)
```

---

## 🎓 Key Learnings

### 1. TDD Benefits:
- ✅ Tests guide design
- ✅ Confidence in refactoring
- ✅ No over-engineering
- ✅ Living documentation
- ✅ Fewer bugs

### 2. RTL Best Practices:
- Test user behavior, not implementation
- Use accessible queries (getByRole, getByLabelText)
- Async user interactions with userEvent

### 3. Test Organization:
- Describe blocks for features
- Clear test names
- Setup common data in beforeEach (when needed)

---

## 🚀 Try It Out

```bash
# Start dev server
npm run dev

# Open browser and test manually
# Compare with automated tests!
```

---

## ✅ Success Criteria Met

- [x] All 15 tests pass
- [x] Code written AFTER tests (TDD)
- [x] No unnecessary features (YAGNI)
- [x] Clean, refactored code
- [x] Well-organized test suite

---

## 📝 TDD Workflow Recap

```
1. 🔴 Write failing test
2. 🟢 Write minimal code to pass
3. 🔵 Refactor while keeping green
4. ➡️ Repeat for next feature
```

---

**This solution demonstrates professional TDD practices!** 🎉

The cart was built entirely test-first, proving that TDD leads to clean, well-tested code.

