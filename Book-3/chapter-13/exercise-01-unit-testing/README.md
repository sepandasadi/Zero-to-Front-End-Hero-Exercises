# Exercise 1: Unit Testing Basics

**Difficulty:** Beginner
**Time:** 45-60 minutes
**Focus:** Jest/Vitest fundamentals, test structure, matchers, async testing

---

## 🎯 Objectives

In this exercise, you'll learn:
- How to structure unit tests (AAA pattern)
- Using Vitest matchers and assertions
- Testing pure functions
- Testing async functions
- Testing error handling
- Testing edge cases and boundaries

---

## 📝 Scenario

You're building a utility library for a todo application. You need to write comprehensive unit tests for various utility functions including:
- String validation and formatting
- Number calculations
- Async data operations
- Error handling

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
cd exercise-01-unit-testing/starter
npm install
```

### 2. Run Tests

```bash
# Run all tests
npm test

# Watch mode (re-runs on file changes)
npm test -- --watch

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test utils.test.js
```

### 3. Explore the Files

```
starter/
├── package.json
├── vitest.config.js
├── src/
│   ├── utils/
│   │   ├── string-utils.js      # String utility functions
│   │   ├── math-utils.js        # Math utility functions
│   │   ├── validation.js        # Validation functions
│   │   └── async-utils.js       # Async utility functions
│   └── __tests__/
│       ├── string-utils.test.js # Tests for string utils (INCOMPLETE)
│       ├── math-utils.test.js   # Tests for math utils (INCOMPLETE)
│       ├── validation.test.js   # Tests for validation (INCOMPLETE)
│       └── async-utils.test.js  # Tests for async utils (INCOMPLETE)
```

---

## ✅ Tasks

### Task 1: Test String Utilities (25%)

Complete the tests in `src/__tests__/string-utils.test.js`

**Functions to test:**
- `capitalize(str)` - Capitalizes first letter
- `slugify(str)` - Converts to URL-friendly slug
- `truncate(str, maxLength)` - Truncates with ellipsis
- `reverseString(str)` - Reverses a string

**Test cases to cover:**
- ✅ Normal inputs
- ✅ Empty strings
- ✅ Special characters
- ✅ Edge cases (very long strings, null, undefined)

**Example:**
```javascript
describe('capitalize', () => {
  it('capitalizes the first letter of a string', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  it('handles empty strings', () => {
    expect(capitalize('')).toBe('');
  });

  // Add more tests...
});
```

---

### Task 2: Test Math Utilities (25%)

Complete the tests in `src/__tests__/math-utils.test.js`

**Functions to test:**
- `sum(numbers)` - Sums array of numbers
- `average(numbers)` - Calculates average
- `clamp(value, min, max)` - Clamps value between min and max
- `percentage(value, total)` - Calculates percentage

**Test cases to cover:**
- ✅ Positive numbers
- ✅ Negative numbers
- ✅ Zero values
- ✅ Empty arrays
- ✅ Floating point precision
- ✅ Edge cases (division by zero, invalid inputs)

---

### Task 3: Test Validation Functions (25%)

Complete the tests in `src/__tests__/validation.test.js`

**Functions to test:**
- `isValidEmail(email)` - Email validation
- `isValidPassword(password)` - Password strength validation
- `isValidUsername(username)` - Username validation
- `isValidURL(url)` - URL validation

**Test cases to cover:**
- ✅ Valid inputs
- ✅ Invalid inputs
- ✅ Edge cases (empty, special characters, length limits)
- ✅ Common invalid patterns

**Example:**
```javascript
describe('isValidEmail', () => {
  it('returns true for valid emails', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
    expect(isValidEmail('john.doe@company.co.uk')).toBe(true);
  });

  it('returns false for invalid emails', () => {
    expect(isValidEmail('invalid')).toBe(false);
    expect(isValidEmail('@example.com')).toBe(false);
    expect(isValidEmail('user@')).toBe(false);
  });
});
```

---

### Task 4: Test Async Functions (25%)

Complete the tests in `src/__tests__/async-utils.test.js`

**Functions to test:**
- `fetchUser(id)` - Async user fetch (simulated)
- `delay(ms)` - Promise-based delay
- `retryOperation(operation, maxRetries)` - Retry logic
- `fetchWithTimeout(url, timeout)` - Fetch with timeout

**Test cases to cover:**
- ✅ Successful async operations
- ✅ Error handling
- ✅ Timeouts
- ✅ Retry logic

**Example:**
```javascript
describe('fetchUser', () => {
  it('fetches user data successfully', async () => {
    const user = await fetchUser(1);
    expect(user).toHaveProperty('id', 1);
    expect(user).toHaveProperty('name');
  });

  it('throws error for invalid user ID', async () => {
    await expect(fetchUser(-1)).rejects.toThrow('Invalid user ID');
  });
});
```

---

## 🎓 Key Concepts

### AAA Pattern
Every test should follow **Arrange, Act, Assert**:

```javascript
it('calculates sum correctly', () => {
  // ARRANGE - Set up test data
  const numbers = [1, 2, 3, 4, 5];

  // ACT - Execute the function
  const result = sum(numbers);

  // ASSERT - Verify the result
  expect(result).toBe(15);
});
```

### Common Matchers

```javascript
// Equality
expect(value).toBe(5);                    // Strict equality (===)
expect(value).toEqual({ a: 1 });          // Deep equality

// Truthiness
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toBeNull();
expect(value).toBeUndefined();
expect(value).toBeDefined();

// Numbers
expect(value).toBeGreaterThan(3);
expect(value).toBeLessThanOrEqual(10);
expect(value).toBeCloseTo(0.3, 5);        // Floating point

// Strings
expect(str).toMatch(/pattern/);
expect(str).toContain('substring');

// Arrays
expect(array).toContain(item);
expect(array).toHaveLength(3);

// Objects
expect(obj).toHaveProperty('key');
expect(obj).toMatchObject({ a: 1 });

// Exceptions
expect(() => fn()).toThrow();
expect(() => fn()).toThrow('Error message');

// Async
await expect(promise).resolves.toBe(value);
await expect(promise).rejects.toThrow();
```

### Testing Async Code

```javascript
// Using async/await (preferred)
it('fetches data', async () => {
  const data = await fetchData();
  expect(data).toBeDefined();
});

// Testing promises that resolve
it('resolves with data', async () => {
  await expect(fetchData()).resolves.toEqual({ id: 1 });
});

// Testing promises that reject
it('rejects with error', async () => {
  await expect(fetchData(-1)).rejects.toThrow('Invalid ID');
});

// Using .resolves and .rejects
it('handles errors', async () => {
  const promise = fetchData();
  await expect(promise).rejects.toThrow();
});
```

---

## 🎯 Success Criteria

Your tests pass when:
- [ ] All string utility tests pass (10+ tests)
- [ ] All math utility tests pass (12+ tests)
- [ ] All validation tests pass (15+ tests)
- [ ] All async utility tests pass (8+ tests)
- [ ] Coverage is >90% for all utility files
- [ ] All edge cases are tested
- [ ] No skipped or pending tests
- [ ] Tests follow AAA pattern
- [ ] Descriptive test names

---

## 🚀 Bonus Challenges

1. **Add Parameterized Tests** ⭐
   - Use `it.each()` for testing multiple inputs
   ```javascript
   it.each([
     ['hello', 'Hello'],
     ['world', 'World'],
     ['', ''],
   ])('capitalize(%s) returns %s', (input, expected) => {
     expect(capitalize(input)).toBe(expected);
   });
   ```

2. **Test Error Messages** ⭐
   - Verify exact error messages
   ```javascript
   expect(() => divide(10, 0)).toThrow('Division by zero');
   ```

3. **Add Setup/Teardown** ⭐⭐
   - Use `beforeEach`, `afterEach`, `beforeAll`, `afterAll`

4. **Test Coverage Report** ⭐⭐
   - Achieve 100% coverage
   - Generate HTML coverage report

5. **Add Custom Matchers** ⭐⭐⭐
   - Create custom matchers for domain-specific assertions

---

## 💡 Hints

<details>
<summary>Hint 1: Testing edge cases</summary>

Always test:
- Empty inputs (`''`, `[]`, `null`, `undefined`)
- Boundary values (0, -1, max values)
- Invalid types (string when number expected)
- Special characters
</details>

<details>
<summary>Hint 2: Async testing patterns</summary>

For async tests, always use `async/await`:
```javascript
it('async test', async () => {
  const result = await asyncFunction();
  expect(result).toBe(expected);
});
```

Don't forget to `await` your assertions!
</details>

<details>
<summary>Hint 3: Testing throws</summary>

To test that a function throws:
```javascript
// Synchronous
expect(() => fn()).toThrow();

// Async
await expect(asyncFn()).rejects.toThrow();
```

Note the arrow function wrapper for sync!
</details>

<details>
<summary>Hint 4: Floating point comparison</summary>

Never use `toBe()` for floating point:
```javascript
// ❌ Might fail due to precision
expect(0.1 + 0.2).toBe(0.3);

// ✅ Use toBeCloseTo
expect(0.1 + 0.2).toBeCloseTo(0.3, 5);
```
</details>

---

## 📚 Resources

- [Vitest Documentation](https://vitest.dev/)
- [Vitest API Reference](https://vitest.dev/api/)
- [Jest Matchers](https://jestjs.io/docs/expect) (compatible with Vitest)
- [Testing Best Practices](https://testingjavascript.com/)

---

## ✅ Completion

When you finish:
1. Run `npm test -- --coverage` to check coverage
2. Ensure all tests pass
3. Compare with the solution folder
4. Review any differences
5. Move on to Exercise 2!

---

**Happy Testing!** 🧪✨

