# Exercise 06 Starter: E2E Testing with Playwright

Learn End-to-End testing by writing tests for a todo application!

---

## 🎯 Learning Goals

- Understand E2E testing concepts
- Learn Playwright fundamentals
- Write user-centric tests
- Test real browser interactions
- Debug failing tests

---

## 📚 What You'll Learn

### Playwright Basics:
- Navigating pages (`page.goto()`)
- Finding elements (`page.getByTestId()`, `page.locator()`)
- User interactions (`click()`, `fill()`, `check()`)
- Assertions (`expect().toBeVisible()`, `expect().toContainText()`)

### E2E Testing Concepts:
- Testing from user's perspective
- Waiting for elements
- Handling async operations
- Cross-browser testing

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Install Playwright Browsers

```bash
npx playwright install
```

### 3. Start the App

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and play with the app manually first!

### 4. Run E2E Tests

```bash
# Run tests in headless mode
npm run test:e2e

# Run with UI (recommended!)
npm run test:e2e:ui

# Run in headed mode (see the browser)
npm run test:e2e:headed

# Debug mode
npm run test:e2e:debug
```

---

## 📝 Your Tasks

### Task 1: Complete `e2e/todos.spec.js`

Write tests for:
- ✅ Adding a new todo
- ✅ Marking todo as complete
- ✅ Deleting a todo
- ✅ Adding multiple todos

### Task 2: Complete `e2e/filters.spec.js`

Write tests for:
- ✅ Filtering to "Active" todos
- ✅ Filtering to "Completed" todos
- ✅ Showing "All" todos

### Task 3: Bonus - Write Additional Tests

Ideas:
- Clear completed functionality
- Empty states
- Input validation
- Keyboard navigation

---

## 💡 Playwright Tips

### Finding Elements

```javascript
// By test ID (recommended!)
await page.getByTestId('todo-input')

// By role
await page.getByRole('button', { name: 'Add' })

// By text
await page.getByText('Todo App')

// By CSS selector
await page.locator('.todo-item')
```

### User Interactions

```javascript
// Type in input
await page.fill('[data-testid="todo-input"]', 'Buy milk')

// Click button
await page.click('[data-testid="add-button"]')

// Check checkbox
await page.check('[type="checkbox"]')
```

### Assertions

```javascript
// Element is visible
await expect(page.getByText('Buy milk')).toBeVisible()

// Element contains text
await expect(page.locator('h1')).toContainText('Todo App')

// Count elements
await expect(page.getByTestId('todo-item')).toHaveCount(3)
```

---

## 🎓 Example Test

```javascript
test('should add a new todo', async ({ page }) => {
  // Navigate to the app
  await page.goto('/');

  // Fill in the input
  await page.fill('[data-testid="todo-input"]', 'Buy milk');

  // Click add button
  await page.click('[data-testid="add-button"]');

  // Verify todo appears
  await expect(page.getByText('Buy milk')).toBeVisible();
});
```

---

## 🐛 Debugging Tips

1. **Use UI Mode:**
   ```bash
   npm run test:e2e:ui
   ```
   - See tests run visually
   - Time travel through test steps
   - Inspect DOM at each step

2. **Use Headed Mode:**
   ```bash
   npm run test:e2e:headed
   ```
   - Watch the browser as tests run

3. **Use Debug Mode:**
   ```bash
   npm run test:e2e:debug
   ```
   - Step through tests line by line
   - Inspect elements interactively

4. **Screenshots & Videos:**
   - Failed tests automatically capture screenshots
   - Check `test-results/` folder

---

## ✅ Success Criteria

- [ ] All example tests pass
- [ ] Todo CRUD tests complete (4+ tests)
- [ ] Filter tests complete (3+ tests)
- [ ] Tests run in headless mode
- [ ] You understand Playwright basics

---

## 📖 Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Test Selectors](https://playwright.dev/docs/selectors)

---

**Have fun testing! 🎭**

