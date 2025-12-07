# Exercise 3: Custom Hooks & Forms - Hints

## Testing Custom Hooks

<details>
<summary>💡 Hint: Basic hook testing</summary>

```javascript
import { renderHook, act } from '@testing-library/react';

test('useToggle switches state', () => {
  const { result } = renderHook(() => useToggle());

  expect(result.current.value).toBe(false);

  act(() => {
    result.current.toggle();
  });

  expect(result.current.value).toBe(true);
});
```
</details>

<details>
<summary>💡 Hint: Testing async hooks</summary>

```javascript
test('useFetch loads data', async () => {
  const { result } = renderHook(() => useFetch('/api/data'));

  expect(result.current.loading).toBe(true);

  await waitFor(() => {
    expect(result.current.loading).toBe(false);
  });

  expect(result.current.data).toEqual(expectedData);
});
```
</details>

<details>
<summary>💡 Hint: Testing form validation</summary>

```javascript
test('validates email field', async () => {
  const user = userEvent.setup();
  render(<RegistrationForm />);

  const emailInput = screen.getByLabelText(/email/i);

  // Invalid email
  await user.type(emailInput, 'invalid');
  await user.tab(); // Trigger blur/validation

  expect(await screen.findByText(/invalid email/i)).toBeInTheDocument();

  // Valid email
  await user.clear(emailInput);
  await user.type(emailInput, 'valid@example.com');

  expect(screen.queryByText(/invalid email/i)).not.toBeInTheDocument();
});
```
</details>

---

**Check the solution folder for complete examples!**

