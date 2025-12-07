# Exercise 5: TDD & Integration Testing

**Difficulty:** Intermediate-Advanced
**Time:** 90-120 minutes
**Focus:** Test-Driven Development, integration tests, feature workflows

---

## 🎯 Objectives

In this exercise, you'll learn:
- Test-Driven Development (TDD) workflow
- Writing tests before code (Red-Green-Refactor)
- Integration testing across components
- Testing complete user workflows
- Testing state management with components

---

## 📝 Scenario

You're building a shopping cart feature using TDD. You'll write tests first, then implement the functionality to make them pass.

---

## ✅ Tasks

### Task 1: TDD - Product List (20%)
Build a product list component using TDD:
1. 🔴 Write failing test
2. 🟢 Write minimal code to pass
3. 🔵 Refactor

### Task 2: TDD - Shopping Cart (25%)
Build cart functionality (add, remove, update quantity) using TDD.

### Task 3: Integration - Cart Workflow (25%)
Test complete user workflow: browse → add to cart → update → checkout.

### Task 4: Integration - State Management (15%)
Test cart state persistence and updates across components.

### Task 5: Integration - Authentication Flow (15%)
Test login → protected route → logout workflow.

---

## 🎓 Key Concepts

### TDD Workflow (Red-Green-Refactor)

```javascript
// 🔴 RED: Write failing test first
test('adds product to cart', async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole('button', { name: /add to cart/i }));

  expect(screen.getByText(/1 item in cart/i)).toBeInTheDocument();
});

// This test fails because addToCart doesn't exist yet

// 🟢 GREEN: Write minimal code to pass
function addToCart(product) {
  setCartItems([...cartItems, product]);
}

// Test now passes!

// 🔵 REFACTOR: Improve code quality
function addToCart(product) {
  setCartItems(prev => [...prev, { ...product, quantity: 1 }]);
}

// Test still passes, code is better!
```

### Integration Testing

```javascript
test('complete shopping workflow', async () => {
  const user = userEvent.setup();

  // Render entire app
  render(<App />);

  // Browse products
  expect(screen.getByText(/products/i)).toBeInTheDocument();

  // Add to cart
  await user.click(screen.getAllByRole('button', { name: /add to cart/i })[0]);

  // View cart
  await user.click(screen.getByRole('link', { name: /cart/i }));
  expect(screen.getByText(/1 item/i)).toBeInTheDocument();

  // Update quantity
  await user.click(screen.getByRole('button', { name: /\+/i }));
  expect(screen.getByText(/2 items/i)).toBeInTheDocument();

  // Checkout
  await user.click(screen.getByRole('button', { name: /checkout/i }));
  expect(screen.getByText(/order confirmed/i)).toBeInTheDocument();
});
```

### Testing State Management

```javascript
test('cart state persists across navigation', async () => {
  const user = userEvent.setup();
  render(<App />);

  // Add item on products page
  await user.click(screen.getByRole('button', { name: /add to cart/i }));

  // Navigate to about page
  await user.click(screen.getByRole('link', { name: /about/i }));

  // Cart still shows 1 item
  expect(screen.getByText(/1 item/i)).toBeInTheDocument();

  // Navigate back to products
  await user.click(screen.getByRole('link', { name: /products/i }));

  // Item still in cart
  expect(screen.getByText(/1 item/i)).toBeInTheDocument();
});
```

---

## 🚀 Bonus Challenges

1. **TDD a Feature** ⭐⭐
   - Build entire wishlist feature using TDD
   - Never write code before tests

2. **Complex Workflow** ⭐⭐⭐
   - Test multi-step checkout process
   - Include validation, payment, confirmation

3. **State Debugging** ⭐⭐
   - Use React DevTools in tests
   - Verify state updates

---

## 📚 Resources

- [TDD with React](https://kentcdodds.com/blog/test-driven-development)
- [Integration Testing](https://testing-library.com/docs/react-testing-library/example-intro)
- [Red-Green-Refactor](https://www.codecademy.com/article/tdd-red-green-refactor)

---

**Happy Testing!** 🧪🔴🟢🔵

