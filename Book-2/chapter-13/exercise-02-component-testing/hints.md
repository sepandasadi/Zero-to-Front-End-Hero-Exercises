# Exercise 2: Component Testing - Hints

Progressive hints for testing React components.

---

## General Hints

<details>
<summary>💡 Hint: Setting up user event</summary>

Always setup userEvent at the beginning of each test:

```javascript
import userEvent from '@testing-library/user-event';

test('my test', async () => {
  const user = userEvent.setup();
  render(<Component />);

  // Now use user.click(), user.type(), etc.
  await user.click(screen.getByRole('button'));
});
```
</details>

<details>
<summary>💡 Hint: Choosing the right query</summary>

Priority order:
1. `getByRole` - Best for accessibility
2. `getByLabelText` - For form inputs
3. `getByPlaceholderText` - When no label
4. `getByText` - For non-interactive elements
5. `getByTestId` - Last resort

```javascript
// ✅ Preferred
screen.getByRole('button', { name: /submit/i });

// ❌ Avoid
screen.getByTestId('submit-button');
```
</details>

---

## Task 1: Button Component

<details>
<summary>💡 Hint: Testing click handlers</summary>

```javascript
test('calls onClick when clicked', async () => {
  const user = userEvent.setup();
  const handleClick = vi.fn();

  render(<Button onClick={handleClick}>Click me</Button>);

  await user.click(screen.getByRole('button'));

  expect(handleClick).toHaveBeenCalledTimes(1);
});
```
</details>

<details>
<summary>💡 Hint: Testing disabled state</summary>

```javascript
test('does not call onClick when disabled', async () => {
  const user = userEvent.setup();
  const handleClick = vi.fn();

  render(<Button onClick={handleClick} disabled>Click</Button>);

  const button = screen.getByRole('button');
  expect(button).toBeDisabled();

  await user.click(button);
  expect(handleClick).not.toHaveBeenCalled();
});
```
</details>

---

## Task 2: Counter Component

<details>
<summary>💡 Hint: Testing state changes</summary>

```javascript
test('increments count', async () => {
  const user = userEvent.setup();
  render(<Counter initialCount={0} />);

  const incrementButton = screen.getByRole('button', { name: /increment/i });

  await user.click(incrementButton);

  expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
});
```
</details>

---

## Task 3: LoginForm Component

<details>
<summary>💡 Hint: Testing form inputs</summary>

```javascript
test('updates input values', async () => {
  const user = userEvent.setup();
  render(<LoginForm />);

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);

  await user.type(emailInput, 'test@example.com');
  await user.type(passwordInput, 'password123');

  expect(emailInput).toHaveValue('test@example.com');
  expect(passwordInput).toHaveValue('password123');
});
```
</details>

<details>
<summary>💡 Hint: Testing form submission</summary>

```javascript
test('calls onSubmit with form data', async () => {
  const user = userEvent.setup();
  const handleSubmit = vi.fn();

  render(<LoginForm onSubmit={handleSubmit} />);

  await user.type(screen.getByLabelText(/email/i), 'user@test.com');
  await user.type(screen.getByLabelText(/password/i), 'pass123');
  await user.click(screen.getByRole('button', { name: /submit/i }));

  expect(handleSubmit).toHaveBeenCalledWith({
    email: 'user@test.com',
    password: 'pass123'
  });
});
```
</details>

---

## Task 4: TodoList Component

<details>
<summary>💡 Hint: Testing lists</summary>

```javascript
test('renders list of todos', () => {
  const todos = [
    { id: 1, text: 'Task 1', completed: false },
    { id: 2, text: 'Task 2', completed: true },
  ];

  render(<TodoList todos={todos} />);

  expect(screen.getByText('Task 1')).toBeInTheDocument();
  expect(screen.getByText('Task 2')).toBeInTheDocument();
});
```
</details>

---

## Task 5: UserCard Component

<details>
<summary>💡 Hint: Testing conditional rendering</summary>

```javascript
test('shows verified badge when user is verified', () => {
  render(<UserCard user={{ name: 'John', verified: true }} />);
  expect(screen.getByText(/verified/i)).toBeInTheDocument();
});

test('hides verified badge when user is not verified', () => {
  render(<UserCard user={{ name: 'John', verified: false }} />);
  expect(screen.queryByText(/verified/i)).not.toBeInTheDocument();
});
```
</details>

---

## Common Mistakes

<details>
<summary>❌ Using fireEvent instead of userEvent</summary>

```javascript
// ❌ Don't use fireEvent
fireEvent.click(button);

// ✅ Use userEvent
const user = userEvent.setup();
await user.click(button);
```
</details>

<details>
<summary>❌ Not awaiting async operations</summary>

```javascript
// ❌ Missing await
user.click(button);
expect(something).toBe(true);

// ✅ Await user interactions
await user.click(button);
expect(something).toBe(true);
```
</details>

---

**Need more help?** Check the solution folder for complete examples!

