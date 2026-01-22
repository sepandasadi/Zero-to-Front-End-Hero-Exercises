# Chapter 23: Testing Your JavaScript - Exercises

Learn to write tests that give you confidence! Master Jest, TDD, and modern testing practices.

## 📚 What You'll Practice

- Jest test framework
- Unit testing functions
- Testing async code
- Mocking and spies
- DOM testing with Testing Library
- Test-Driven Development (TDD)
- Code coverage
- Integration tests

## 🎯 Learning Objectives

- Set up Jest in projects
- Write effective unit tests
- Test async/await code
- Mock external dependencies
- Test user interactions
- Practice TDD workflow
- Achieve good coverage
- Write maintainable tests

---

## 📂 Exercises

### Exercise 1: Jest Setup ⭐
**Time:** 20-25 minutes | **[Start](./exercise-01-jest-setup/)**

Install Jest, write first test, understand matchers, run tests.

### Exercise 2: Unit Testing ⭐⭐
**Time:** 35-45 minutes | **[Start](./exercise-02-unit-testing/)**

Test pure functions, edge cases, error conditions, parameterized tests.

### Exercise 3: Async Testing ⭐⭐⭐
**Time:** 40-50 minutes | **[Start](./exercise-03-async-testing/)**

Test Promises, async/await, mock API calls, handle timeouts.

### Exercise 4: Mocking & Spies ⭐⭐⭐
**Time:** 45-55 minutes | **[Start](./exercise-04-mocking/)**

jest.fn(), module mocking, spy on methods, mock implementations.

### Exercise 5: DOM Testing ⭐⭐⭐
**Time:** 50-60 minutes | **[Start](./exercise-05-dom-testing/)**

Testing Library setup, query elements, simulate clicks, accessibility tests.

### Exercise 6: Test-Driven Development ⭐⭐⭐
**Time:** 40-50 minutes | **[Start](./exercise-06-tdd/)**

Red-Green-Refactor cycle, write tests first, refactor with confidence.

### Challenge: Full Test Suite ⭐⭐⭐⭐
**Time:** 4-5 hours | **[Start](./challenge-test-suite/)**

Test complete app with 80%+ coverage, unit + integration tests, CI/CD.

---

## 📝 Quiz
**[Take the Quiz](./quiz.md)**

---

## 📖 Quick Reference

```js
// Jest basics
describe('Calculator', () => {
  test('adds two numbers', () => {
    expect(add(2, 3)).toBe(5);
  });
  
  test('handles edge cases', () => {
    expect(add(0, 0)).toBe(0);
    expect(add(-1, 1)).toBe(0);
  });
});

// Async testing
test('fetches user', async () => {
  const user = await fetchUser(1);
  expect(user.name).toBe('Alice');
});

// Mocking
const mockFn = jest.fn();
mockFn.mockReturnValue(42);
expect(mockFn()).toBe(42);

// DOM testing
import { render, screen, fireEvent } from '@testing-library/react';

test('button click', () => {
  render(<Button />);
  fireEvent.click(screen.getByText('Click me'));
  expect(screen.getByText('Clicked!')).toBeInTheDocument();
});

// Matchers
expect(value).toBe(expected);
expect(value).toEqual(expected);
expect(value).toBeTruthy();
expect(array).toContain(item);
expect(fn).toThrow();
expect(mock).toHaveBeenCalled();
```

**package.json:**
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

---

**Ready to test?** [Start Exercise 1 →](./exercise-01-jest-setup/)

*Chapter 23 • Testing • Edition 2*
