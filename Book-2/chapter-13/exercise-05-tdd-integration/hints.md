# Exercise 5: TDD & Integration - Hints

## TDD Workflow

<details>
<summary>💡 Hint: Red-Green-Refactor cycle</summary>

```javascript
// Step 1: 🔴 RED - Write failing test
test('increments cart count', async () => {
  const user = userEvent.setup();
  render(<Cart />);

  await user.click(screen.getByRole('button', { name: /\+/i }));

  expect(screen.getByText(/quantity: 2/i)).toBeInTheDocument();
});

// Step 2: 🟢 GREEN - Minimal code to pass
function handleIncrement() {
  setQuantity(quantity + 1);
}

// Step 3: 🔵 REFACTOR - Improve
function handleIncrement() {
  setQuantity(prev => prev + 1);
}
```
</details>

<details>
<summary>💡 Hint: Integration test structure</summary>

```javascript
test('user can complete purchase', async () => {
  const user = userEvent.setup();

  // 1. Setup
  render(<App />);

  // 2. Browse and add
  await user.click(screen.getByText('Product 1'));
  await user.click(screen.getByRole('button', { name: /add/i }));

  // 3. Checkout
  await user.click(screen.getByRole('link', { name: /cart/i }));
  await user.click(screen.getByRole('button', { name: /checkout/i }));

  // 4. Fill form
  await user.type(screen.getByLabelText(/name/i), 'John Doe');
  await user.click(screen.getByRole('button', { name: /submit/i }));

  // 5. Verify
  expect(await screen.findByText(/success/i)).toBeInTheDocument();
});
```
</details>

---

**Practice TDD! Write tests first!** 🔴🟢🔵

