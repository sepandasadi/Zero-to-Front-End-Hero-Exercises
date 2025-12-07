# Challenge: Testing Suite - Hints

## Getting Started

<details>
<summary>💡 Hint: Project setup order</summary>

1. Set up Vite project
2. Configure Vitest and React Testing Library
3. Set up MSW for API mocking
4. Configure Playwright
5. Set up GitHub Actions
6. Build features one at a time with tests

Start simple, add complexity gradually!
</details>

<details>
<summary>💡 Hint: TDD workflow for a feature</summary>

Example: Building "Create Todo" feature

```javascript
// 1. Write unit test for validation
test('validates todo text is not empty', () => {
  expect(validateTodoText('')).toBe(false);
  expect(validateTodoText('Buy milk')).toBe(true);
});

// 2. Write component test
test('shows error when submitting empty todo', async () => {
  const user = userEvent.setup();
  render(<TodoForm />);

  await user.click(screen.getByRole('button', { name: /add/i }));

  expect(screen.getByText(/todo cannot be empty/i)).toBeInTheDocument();
});

// 3. Write integration test
test('adds new todo to list', async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.type(screen.getByLabelText(/new todo/i), 'Buy milk');
  await user.click(screen.getByRole('button', { name: /add/i }));

  expect(screen.getByText('Buy milk')).toBeInTheDocument();
});

// 4. Write E2E test
test('user can create todo', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel(/new todo/i).fill('Buy milk');
  await page.getByRole('button', { name: /add/i }).click();

  await expect(page.getByText('Buy milk')).toBeVisible();
});
```
</details>

---

## Testing Strategy

<details>
<summary>💡 Hint: Test organization</summary>

Organize tests by feature:

```
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   │   ├── LoginForm.jsx
│   │   │   └── LoginForm.test.jsx
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   └── useAuth.test.js
│   │   └── __tests__/
│   │       └── auth-integration.test.jsx
│   └── todos/
│       ├── components/
│       ├── hooks/
│       └── __tests__/
```

Co-locate tests with code!
</details>

<details>
<summary>💡 Hint: MSW setup</summary>

```javascript
// src/mocks/handlers.js
import { http, HttpResponse } from 'msw';

export const handlers = [
  // Get todos
  http.get('/api/todos', () => {
    return HttpResponse.json([
      { id: 1, text: 'Test todo', completed: false }
    ]);
  }),

  // Create todo
  http.post('/api/todos', async ({ request }) => {
    const newTodo = await request.json();
    return HttpResponse.json(
      { id: Date.now(), ...newTodo },
      { status: 201 }
    );
  }),

  // Update todo
  http.put('/api/todos/:id', async ({ params, request }) => {
    const updates = await request.json();
    return HttpResponse.json({ id: params.id, ...updates });
  }),

  // Delete todo
  http.delete('/api/todos/:id', () => {
    return new HttpResponse(null, { status: 204 });
  }),
];
```
</details>

---

## Common Challenges

<details>
<summary>❓ Challenge: Testing authentication state</summary>

**Solution:** Create a test wrapper with auth context

```javascript
function renderWithAuth(ui, { initialAuth = null } = {}) {
  const Wrapper = ({ children }) => (
    <AuthProvider initialValue={initialAuth}>
      {children}
    </AuthProvider>
  );

  return render(ui, { wrapper: Wrapper });
}

test('shows user menu when logged in', () => {
  renderWithAuth(<Header />, {
    initialAuth: { user: { name: 'John' } }
  });

  expect(screen.getByText('John')).toBeInTheDocument();
});
```
</details>

<details>
<summary>❓ Challenge: Testing async data loading</summary>

**Solution:** Use findBy queries

```javascript
test('loads and displays todos', async () => {
  render(<TodoList />);

  // Wait for loading to finish and todos to appear
  expect(await screen.findByText('Test todo')).toBeInTheDocument();

  // Loading indicator should be gone
  expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
});
```
</details>

<details>
<summary>❓ Challenge: Testing form validation</summary>

**Solution:** Test each validation rule

```javascript
describe('LoginForm validation', () => {
  it('shows error for invalid email', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText(/email/i), 'invalid');
    await user.tab(); // Trigger validation

    expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
  });

  it('shows error for short password', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText(/password/i), '123');
    await user.tab();

    expect(screen.getByText(/password must be at least/i)).toBeInTheDocument();
  });
});
```
</details>

---

## CI/CD Setup

<details>
<summary>💡 Hint: GitHub Actions workflow</summary>

```yaml
# .github/workflows/test.yml
name: Test Suite

on:
  pull_request:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run unit tests
        run: npm test -- --coverage

      - name: Install Playwright
        run: npx playwright install --with-deps

      - name: Run E2E tests
        run: npx playwright test

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        if: always()
```
</details>

---

## Debugging Tips

<details>
<summary>💡 Tip: Debug failing tests</summary>

```javascript
// Use screen.debug() to see current DOM
test('my test', () => {
  render(<Component />);
  screen.debug(); // Prints entire DOM
  screen.debug(screen.getByRole('button')); // Prints specific element
});

// Use logRoles to see all available roles
import { logRoles } from '@testing-library/react';

test('find roles', () => {
  const { container } = render(<Component />);
  logRoles(container);
});
```
</details>

<details>
<summary>💡 Tip: Debug E2E tests</summary>

```bash
# Run Playwright in headed mode
npx playwright test --headed

# Run with debugger
npx playwright test --debug

# Generate trace
npx playwright test --trace on
npx playwright show-trace trace.zip
```
</details>

---

## Need More Help?

1. Check the solution folder (after attempting!)
2. Review the 6 exercises in this chapter
3. Read the chapter README
4. Ask in the community Discord
5. Review official documentation

**You've got this!** Take it one feature at a time. 🚀

