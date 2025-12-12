# Exercise 2: Component Testing with React Testing Library

**Difficulty:** Beginner-Intermediate
**Time:** 60-90 minutes
**Focus:** React Testing Library, user interactions, queries, assertions

---

## 🎯 Objectives

In this exercise, you'll learn:
- How to render and test React components
- Using React Testing Library queries (getBy, findBy, queryBy)
- Simulating user interactions (clicks, typing, form submission)
- Testing conditional rendering
- Testing props and state changes
- Snapshot testing best practices

---

## 📝 Scenario

You're building a task management application. You need to write comprehensive tests for various UI components including buttons, forms, lists, and interactive elements.

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
cd exercise-02-component-testing/starter
npm install
```

### 2. Run Tests

```bash
# Run all tests
npm test

# Watch mode
npm test -- --watch

# With coverage
npm test -- --coverage

# UI mode (visual test runner)
npm test:ui
```

### 3. Explore the Files

```
starter/
├── package.json
├── vitest.config.js
├── index.html
├── src/
│   ├── components/
│   │   ├── Button.jsx           # Simple button component
│   │   ├── Counter.jsx          # Counter with increment/decrement
│   │   ├── LoginForm.jsx        # Login form with validation
│   │   ├── TodoList.jsx         # Todo list component
│   │   └── UserCard.jsx         # User profile card
│   └── __tests__/
│       ├── Button.test.jsx      # Tests for Button (INCOMPLETE)
│       ├── Counter.test.jsx     # Tests for Counter (INCOMPLETE)
│       ├── LoginForm.test.jsx   # Tests for LoginForm (INCOMPLETE)
│       ├── TodoList.test.jsx    # Tests for TodoList (INCOMPLETE)
│       └── UserCard.test.jsx    # Tests for UserCard (INCOMPLETE)
```

---

## ✅ Tasks

### Task 1: Test Button Component (20%)

Complete the tests in `src/__tests__/Button.test.jsx`

**Component features:**
- Renders with custom text
- Handles click events
- Supports variants (primary, secondary, danger)
- Can be disabled

**Test cases to cover:**
- ✅ Renders button text correctly
- ✅ Calls onClick handler when clicked
- ✅ Applies correct CSS classes for variants
- ✅ Does not call onClick when disabled
- ✅ Shows correct disabled state

---

### Task 2: Test Counter Component (20%)

Complete the tests in `src/__tests__/Counter.test.jsx`

**Component features:**
- Displays current count
- Increment and decrement buttons
- Reset button
- Min/max constraints

**Test cases to cover:**
- ✅ Renders initial count
- ✅ Increments count on button click
- ✅ Decrements count on button click
- ✅ Resets to initial value
- ✅ Respects min/max limits
- ✅ Disables buttons at boundaries

---

### Task 3: Test LoginForm Component (20%)

Complete the tests in `src/__tests__/LoginForm.test.jsx`

**Component features:**
- Email and password inputs
- Form validation
- Submit handler
- Loading state
- Error messages

**Test cases to cover:**
- ✅ Renders form elements
- ✅ Updates input values on typing
- ✅ Shows validation errors
- ✅ Calls onSubmit with form data
- ✅ Prevents submit with invalid data
- ✅ Shows loading state
- ✅ Displays error message

---

### Task 4: Test TodoList Component (20%)

Complete the tests in `src/__tests__/TodoList.test.jsx`

**Component features:**
- Displays list of todos
- Add new todo
- Toggle todo completion
- Delete todo
- Filter todos (all/active/completed)

**Test cases to cover:**
- ✅ Renders list of todos
- ✅ Adds new todo
- ✅ Toggles todo completion
- ✅ Deletes todo
- ✅ Filters todos correctly
- ✅ Shows empty state

---

### Task 5: Test UserCard Component (20%)

Complete the tests in `src/__tests__/UserCard.test.jsx`

**Component features:**
- Displays user information
- Avatar image with fallback
- Conditional rendering (verified badge)
- Action buttons (edit, delete)

**Test cases to cover:**
- ✅ Renders user information
- ✅ Shows avatar image
- ✅ Shows fallback when no avatar
- ✅ Shows verified badge conditionally
- ✅ Calls action handlers
- ✅ Snapshot test

---

## 🎓 Key Concepts

### React Testing Library Queries

```javascript
import { render, screen } from '@testing-library/react';

// Preferred: getByRole (accessibility-focused)
screen.getByRole('button', { name: /submit/i });
screen.getByRole('textbox', { name: /email/i });

// By label text
screen.getByLabelText(/password/i);

// By placeholder
screen.getByPlaceholderText(/enter email/i);

// By text content
screen.getByText(/welcome/i);

// By test ID (use sparingly)
screen.getByTestId('user-card');

// Query variants:
// - getBy: Returns element, throws if not found
// - queryBy: Returns element or null (for asserting non-existence)
// - findBy: Returns promise, waits for element (async)

// Multiple elements:
screen.getAllByRole('listitem');
```

### User Interactions

```javascript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('handles user interaction', async () => {
  const user = userEvent.setup();
  render(<MyComponent />);

  // Click
  await user.click(screen.getByRole('button'));

  // Type
  await user.type(screen.getByRole('textbox'), 'Hello');

  // Clear
  await user.clear(screen.getByRole('textbox'));

  // Keyboard
  await user.keyboard('{Enter}');

  // Select (dropdown)
  await user.selectOptions(screen.getByRole('combobox'), 'option1');

  // Upload file
  await user.upload(screen.getByLabelText(/upload/i), file);
});
```

### Testing Component Rendering

```javascript
test('renders component correctly', () => {
  render(<Button>Click me</Button>);

  // Assert element exists
  expect(screen.getByText(/click me/i)).toBeInTheDocument();

  // Assert element doesn't exist
  expect(screen.queryByText(/not here/i)).not.toBeInTheDocument();
});
```

### Testing User Events

```javascript
test('handles button click', async () => {
  const user = userEvent.setup();
  const handleClick = vi.fn();

  render(<Button onClick={handleClick}>Click</Button>);

  await user.click(screen.getByRole('button'));

  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### Testing Forms

```javascript
test('submits form with data', async () => {
  const user = userEvent.setup();
  const handleSubmit = vi.fn();

  render(<LoginForm onSubmit={handleSubmit} />);

  // Fill form
  await user.type(screen.getByLabelText(/email/i), 'test@example.com');
  await user.type(screen.getByLabelText(/password/i), 'password123');

  // Submit
  await user.click(screen.getByRole('button', { name: /submit/i }));

  // Assert
  expect(handleSubmit).toHaveBeenCalledWith({
    email: 'test@example.com',
    password: 'password123',
  });
});
```

### Testing Async Updates

```javascript
test('shows loading state', async () => {
  render(<AsyncComponent />);

  // Initially loading
  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  // Wait for data to load
  expect(await screen.findByText(/data loaded/i)).toBeInTheDocument();

  // Loading is gone
  expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
});
```

---

## 🎯 Success Criteria

Your tests pass when:
- [ ] All Button tests pass (5+ tests)
- [ ] All Counter tests pass (8+ tests)
- [ ] All LoginForm tests pass (10+ tests)
- [ ] All TodoList tests pass (8+ tests)
- [ ] All UserCard tests pass (6+ tests)
- [ ] Coverage is >80% for all components
- [ ] Tests use accessibility queries (getByRole, getByLabelText)
- [ ] User interactions use userEvent (not fireEvent)
- [ ] Async tests use findBy or waitFor

---

## 🚀 Bonus Challenges

1. **Add Custom Matchers** ⭐
   - Use `toBeInTheDocument()`, `toHaveValue()`, `toBeDisabled()`

2. **Test Accessibility** ⭐⭐
   - Verify ARIA attributes
   - Test keyboard navigation
   - Check focus management

3. **Add Integration Tests** ⭐⭐
   - Test multiple components together
   - Test real user workflows

4. **Visual Regression Tests** ⭐⭐⭐
   - Add snapshot tests for UI structure
   - Test different component states

5. **Test Error Boundaries** ⭐⭐⭐
   - Test component error handling
   - Verify error messages display

---

## 💡 Hints

See [hints.md](./hints.md) for progressive hints on each task.

---

## 📚 Resources

- [React Testing Library Docs](https://testing-library.com/react)
- [User Event Docs](https://testing-library.com/docs/user-event/intro)
- [Common Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Testing Playground](https://testing-playground.com/)

---

## ✅ Completion

When you finish:
1. Run `npm test -- --coverage` to check coverage
2. Ensure all tests pass
3. Compare with the solution folder
4. Review any differences
5. Move on to Exercise 3!

---

**Happy Testing!** 🧪⚛️

