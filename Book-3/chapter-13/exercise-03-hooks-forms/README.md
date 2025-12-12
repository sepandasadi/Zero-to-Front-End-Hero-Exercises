# Exercise 3: Custom Hooks & Form Testing

**Difficulty:** Intermediate
**Time:** 60-90 minutes
**Focus:** Testing custom React hooks, form validation, multi-step forms

---

## 🎯 Objectives

In this exercise, you'll learn:
- How to test custom React hooks in isolation
- Testing hooks with `renderHook` from @testing-library/react
- Testing complex form validation logic
- Testing multi-step form workflows
- Testing form accessibility

---

## 📝 Scenario

You're building reusable hooks and form components for your application. You need to ensure they work correctly in isolation and when integrated into components.

---

## ✅ Tasks

### Task 1: Test useToggle Hook (20%)
Test a custom hook for toggle functionality.

### Task 2: Test useFetch Hook (20%)
Test a data fetching hook with loading, error, and success states.

### Task 3: Test useForm Hook (20%)
Test a form management hook with validation.

### Task 4: Test Multi-Step Form (20%)
Test a wizard-style multi-step form component.

### Task 5: Test Form Accessibility (20%)
Test ARIA attributes, labels, and error announcements.

---

## 🎓 Key Concepts

### Testing Custom Hooks

```javascript
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

test('increments counter', () => {
  const { result } = renderHook(() => useCounter());

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
});
```

### Testing Hooks with Props

```javascript
test('accepts initial value', () => {
  const { result } = renderHook(() => useCounter(10));
  expect(result.current.count).toBe(10);
});

test('updates when props change', () => {
  const { result, rerender } = renderHook(
    ({ initialCount }) => useCounter(initialCount),
    { initialProps: { initialCount: 0 } }
  );

  rerender({ initialCount: 5 });
  expect(result.current.count).toBe(5);
});
```

### Testing Async Hooks

```javascript
test('fetches data', async () => {
  const { result } = renderHook(() => useFetch('/api/users'));

  expect(result.current.loading).toBe(true);

  await waitFor(() => {
    expect(result.current.loading).toBe(false);
  });

  expect(result.current.data).toBeDefined();
});
```

---

## 🚀 Bonus Challenges

1. **Test Hook Cleanup** ⭐
   - Verify hooks clean up effects properly
   - Test unmounting scenarios

2. **Test Hook Dependencies** ⭐⭐
   - Verify hooks update when dependencies change
   - Test memoization

3. **Integration Tests** ⭐⭐
   - Test hooks within actual components
   - Test hook composition

---

## 📚 Resources

- [Testing React Hooks](https://react-hooks-testing-library.com/)
- [React Testing Library Hooks](https://testing-library.com/docs/react-testing-library/api#renderhook)
- [Form Testing Best Practices](https://kentcdodds.com/blog/test-isolation-with-react)

---

**Happy Testing!** 🧪🎣

