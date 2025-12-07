# TDD Instructions - Shopping Cart Feature

**Goal:** Build a shopping cart using Test-Driven Development (TDD)

---

## 🔴🟢🔵 The TDD Workflow

### Red-Green-Refactor Cycle:
1. 🔴 **RED** - Write a failing test
2. 🟢 **GREEN** - Write minimal code to make it pass
3. 🔵 **REFACTOR** - Improve the code quality

**Important:** ALWAYS write the test FIRST, then make it pass!

---

## 📝 Your Tasks

### Task 1: Build Cart Functionality (TDD)

**Step 1:** Read the failing test in `src/__tests__/Cart.test.jsx`
**Step 2:** Implement ONLY enough code in `src/features/cart/Cart.jsx` to make it pass
**Step 3:** Refactor if needed (while keeping tests green)
**Step 4:** Move to next test

**Features to Build (in order):**
1. ✅ Display empty cart message
2. ✅ Add product to cart
3. ✅ Display products in cart
4. ✅ Update product quantity
5. ✅ Remove product from cart
6. ✅ Calculate total price
7. ✅ Clear cart

---

## 🎯 TDD Example Workflow

### Example: Adding a Product to Cart

#### Step 1: 🔴 Write Failing Test
```javascript
it('adds product to cart', async () => {
  const user = userEvent.setup();
  render(<Cart />);

  await user.click(screen.getByRole('button', { name: /add to cart/i }));

  expect(screen.getByText(/1 item in cart/i)).toBeInTheDocument();
});
```

Run test → ❌ FAILS (code doesn't exist yet)

#### Step 2: 🟢 Write Minimal Code
```javascript
function Cart() {
  const [items, setItems] = useState([]);

  const addToCart = () => {
    setItems([...items, { id: 1, name: 'Product' }]);
  };

  return (
    <div>
      <button onClick={addToCart}>Add to Cart</button>
      <p>{items.length} item in cart</p>
    </div>
  );
}
```

Run test → ✅ PASSES

#### Step 3: 🔵 Refactor
```javascript
function Cart() {
  const [items, setItems] = useState([]);

  const addToCart = (product) => {
    setItems(prev => [...prev, product]);
  };

  return (
    <div>
      <button onClick={() => addToCart({ id: 1, name: 'Product' })}>
        Add to Cart
      </button>
      <p>{items.length} {items.length === 1 ? 'item' : 'items'} in cart</p>
    </div>
  );
}
```

Run test → ✅ STILL PASSES (refactoring successful!)

---

## 💡 TDD Tips

1. **Write smallest test first** - Start with simplest behavior
2. **One test at a time** - Don't write multiple failing tests
3. **Minimal code** - Write just enough to pass
4. **Refactor confidently** - Tests protect you from breaking changes
5. **Run tests frequently** - Use watch mode: `npm test -- --watch`

---

## 🎮 Getting Started

```bash
# Install dependencies
npm install

# Run tests in watch mode
npm test -- --watch

# Open the test file
# Read the first failing test
# Implement code to make it pass
# Move to next test
# Repeat!
```

---

## ✅ Success Criteria

- [ ] All cart tests pass (15+ tests)
- [ ] Code was written AFTER tests (TDD!)
- [ ] No extra features (YAGNI principle)
- [ ] Code is clean and refactored
- [ ] Integration tests pass

---

**Remember:** RED → GREEN → REFACTOR → REPEAT! 🔴🟢🔵

