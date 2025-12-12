# Exercise 06 Solution: E2E Testing with Playwright

Complete E2E test suite for a todo application using Playwright!

---

## 🎯 What Was Built

A comprehensive E2E test suite covering:
- ✅ Todo CRUD operations (8 tests)
- ✅ Filtering functionality (7 tests)
- ✅ Clear completed (5 tests)
- ✅ User workflows (4 tests)

**Total: 24 E2E tests across 3 browsers!**

---

## 🧪 Test Coverage

### 1. Todo CRUD Operations (`e2e/todos.spec.js`) - 8 tests

- ✅ Add new todo
- ✅ Add multiple todos
- ✅ Mark todo as complete
- ✅ Unmark completed todo
- ✅ Delete todo
- ✅ Prevent empty todos
- ✅ Prevent whitespace-only todos
- ✅ Show empty state

### 2. Filtering (`e2e/filters.spec.js`) - 7 tests

- ✅ Show all todos by default
- ✅ Filter to active todos
- ✅ Filter to completed todos
- ✅ Switch between filters
- ✅ Show correct counts
- ✅ Update counts dynamically
- ✅ Empty state for filters

### 3. Clear Completed (`e2e/clear-completed.spec.js`) - 5 tests

- ✅ Hide button when no completed
- ✅ Show button with completed todos
- ✅ Clear all completed
- ✅ Show correct count
- ✅ Hide after clearing

### 4. User Workflows (`e2e/user-workflows.spec.js`) - 4 tests

- ✅ Complete workflow (add → complete → filter → delete)
- ✅ Bulk operations
- ✅ Interactive state changes
- ✅ Keyboard navigation

---

## 🚀 Running Tests

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Run all tests (headless)
npm run test:e2e

# Run with UI (recommended!)
npm run test:e2e:ui

# Run in headed mode
npm run test:e2e:headed

# Debug mode
npm run test:e2e:debug

# Run specific browser
npm run test:e2e:chromium
npm run test:e2e:firefox
npm run test:e2e:webkit
```

---

## 📊 Test Results

**All 24 tests pass across 3 browsers:**
- ✅ Chromium (24/24)
- ✅ Firefox (24/24)
- ✅ WebKit (24/24)

**Total: 72 test runs!** (24 tests × 3 browsers)

---

## 💡 Key Playwright Patterns Used

### 1. Element Selection

```javascript
// By test ID (most reliable)
page.getByTestId('todo-input')

// By role
page.getByRole('button', { name: 'Delete' })

// By text
page.getByText('Buy groceries')

// By CSS selector
page.locator('[type="checkbox"]')
```

### 2. User Interactions

```javascript
// Fill input
await page.fill('[data-testid="todo-input"]', 'New todo')

// Click button
await page.click('[data-testid="add-button"]')

// Check checkbox
await page.locator('[type="checkbox"]').first().check()

// Keyboard
await page.keyboard.type('Text')
await page.keyboard.press('Enter')
```

### 3. Assertions

```javascript
// Visibility
await expect(page.getByText('Todo')).toBeVisible()

// Count
await expect(page.getByTestId('todo-item')).toHaveCount(3)

// Text content
await expect(page.locator('h1')).toContainText('Todo App')

// Value
await expect(page.getByTestId('input')).toHaveValue('')

// Class
await expect(element).toHaveClass(/active/)
```

### 4. Test Organization

```javascript
test.describe('Feature', () => {
  test.beforeEach(async ({ page }) => {
    // Setup for each test
  });

  test('specific behavior', async ({ page }) => {
    // Test logic
  });
});
```

---

## 🎓 Best Practices Demonstrated

### 1. Use Data-testid Attributes
```javascript
// Reliable and doesn't break with style changes
<input data-testid="todo-input" />
await page.getByTestId('todo-input')
```

### 2. Test User Behavior, Not Implementation
```javascript
// Good: Test what user sees
await expect(page.getByText('Buy milk')).toBeVisible()

// Avoid: Testing implementation details
// await expect(state.todos[0].text).toBe('Buy milk')
```

### 3. Setup State in beforeEach
```javascript
test.beforeEach(async ({ page }) => {
  // Common setup
  await page.goto('/');
  // Add test data
});
```

### 4. Test Complete User Flows
```javascript
// Not just isolated actions, but complete workflows
test('complete workflow', async ({ page }) => {
  // Add → Complete → Filter → Delete
});
```

### 5. Cross-Browser Testing
```javascript
// Configure multiple browsers
projects: [
  { name: 'chromium' },
  { name: 'firefox' },
  { name: 'webkit' },
]
```

---

## 🐛 Debugging Features Used

1. **Screenshots on Failure**
   - Automatic screenshots saved to `test-results/`

2. **Trace Viewer**
   - Visual timeline of test execution
   - DOM snapshots at each step

3. **UI Mode**
   - Interactive test runner
   - Time-travel debugging

4. **Debug Mode**
   - Step through tests
   - Playwright Inspector

---

## 📁 Project Structure

```
solution/
├── e2e/
│   ├── todos.spec.js          # CRUD tests
│   ├── filters.spec.js        # Filtering tests
│   ├── clear-completed.spec.js # Clear tests
│   └── user-workflows.spec.js # Integration tests
├── src/
│   ├── App.jsx               # Todo app
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── playwright.config.js       # Playwright config
└── package.json
```

---

## ✅ Success Criteria Met

- [x] 24 comprehensive E2E tests
- [x] Tests pass in 3 browsers
- [x] All user workflows covered
- [x] Best practices followed
- [x] Well-organized test suite
- [x] Comprehensive documentation

---

## 🎯 Key Learnings

### E2E Testing Benefits:
- ✅ Tests real user experience
- ✅ Catches integration bugs
- ✅ Cross-browser compatibility
- ✅ Confidence in deployments

### Playwright Advantages:
- ✅ Fast and reliable
- ✅ Excellent debugging tools
- ✅ Cross-browser support
- ✅ Auto-waiting for elements
- ✅ Great documentation

---

## 🚀 Try It Yourself

```bash
# Start the app
npm run dev

# In another terminal, run tests with UI
npm run test:e2e:ui
```

Watch the tests run and explore the Playwright UI!

---

**This solution demonstrates professional E2E testing with Playwright!** 🎭

All tests are reliable, fast, and test real user behavior across multiple browsers.

