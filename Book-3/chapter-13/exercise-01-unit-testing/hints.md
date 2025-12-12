# Exercise 1: Unit Testing Basics - Hints

Stuck? Here are progressive hints to help you complete this exercise.

---

## General Testing Hints

<details>
<summary>💡 Hint: Test Structure</summary>

Every test should follow the AAA pattern:

```javascript
describe('functionName', () => {
  it('describes what it should do', () => {
    // ARRANGE - Set up test data
    const input = 'test';

    // ACT - Call the function
    const result = functionName(input);

    // ASSERT - Verify the result
    expect(result).toBe('expected');
  });
});
```
</details>

<details>
<summary>💡 Hint: Descriptive Test Names</summary>

Good test names describe the behavior:

❌ `it('test 1', ...)`
❌ `it('works', ...)`
✅ `it('returns empty string when input is null', ...)`
✅ `it('capitalizes first letter of lowercase string', ...)`
</details>

---

## Task 1: String Utilities Hints

<details>
<summary>💡 Hint: Testing capitalize</summary>

Test cases to cover:
```javascript
describe('capitalize', () => {
  it('capitalizes first letter of lowercase string', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  it('preserves already capitalized strings', () => {
    expect(capitalize('Hello')).toBe('Hello');
  });

  it('handles empty strings', () => {
    expect(capitalize('')).toBe('');
  });

  it('handles single character strings', () => {
    expect(capitalize('a')).toBe('A');
  });

  it('handles strings with numbers', () => {
    expect(capitalize('123abc')).toBe('123abc');
  });
});
```
</details>

<details>
<summary>💡 Hint: Testing slugify</summary>

Test cases:
```javascript
describe('slugify', () => {
  it('converts spaces to hyphens', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('removes special characters', () => {
    expect(slugify('Hello@World!')).toBe('hello-world');
  });

  it('converts to lowercase', () => {
    expect(slugify('HELLO')).toBe('hello');
  });

  it('handles multiple consecutive spaces', () => {
    expect(slugify('hello   world')).toBe('hello-world');
  });

  it('handles empty strings', () => {
    expect(slugify('')).toBe('');
  });
});
```
</details>

<details>
<summary>💡 Hint: Testing truncate</summary>

```javascript
describe('truncate', () => {
  it('does not truncate short strings', () => {
    expect(truncate('Hello', 10)).toBe('Hello');
  });

  it('truncates long strings and adds ellipsis', () => {
    expect(truncate('Hello World', 8)).toBe('Hello...');
  });

  it('handles exact length strings', () => {
    expect(truncate('Hello', 5)).toBe('Hello');
  });

  it('handles maxLength of 0', () => {
    expect(truncate('Hello', 0)).toBe('...');
  });
});
```
</details>

---

## Task 2: Math Utilities Hints

<details>
<summary>💡 Hint: Testing sum</summary>

```javascript
describe('sum', () => {
  it('sums positive numbers', () => {
    expect(sum([1, 2, 3, 4, 5])).toBe(15);
  });

  it('sums negative numbers', () => {
    expect(sum([-1, -2, -3])).toBe(-6);
  });

  it('handles empty array', () => {
    expect(sum([])).toBe(0);
  });

  it('handles single element', () => {
    expect(sum([5])).toBe(5);
  });

  it('handles mixed positive and negative', () => {
    expect(sum([10, -5, 3])).toBe(8);
  });
});
```
</details>

<details>
<summary>💡 Hint: Testing average with floating point</summary>

Use `toBeCloseTo` for floating point comparisons:

```javascript
describe('average', () => {
  it('calculates average of integers', () => {
    expect(average([1, 2, 3])).toBe(2);
  });

  it('calculates average with floating point', () => {
    expect(average([1, 2, 3, 4])).toBeCloseTo(2.5);
  });

  it('handles empty array', () => {
    expect(average([])).toBe(0);
  });

  it('handles single element', () => {
    expect(average([5])).toBe(5);
  });
});
```
</details>

<details>
<summary>💡 Hint: Testing clamp</summary>

```javascript
describe('clamp', () => {
  it('returns value when within range', () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it('returns min when value is below range', () => {
    expect(clamp(-5, 0, 10)).toBe(0);
  });

  it('returns max when value is above range', () => {
    expect(clamp(15, 0, 10)).toBe(10);
  });

  it('handles value equal to min', () => {
    expect(clamp(0, 0, 10)).toBe(0);
  });

  it('handles value equal to max', () => {
    expect(clamp(10, 0, 10)).toBe(10);
  });
});
```
</details>

---

## Task 3: Validation Hints

<details>
<summary>💡 Hint: Testing isValidEmail</summary>

```javascript
describe('isValidEmail', () => {
  // Valid emails
  it('accepts standard email', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
  });

  it('accepts email with subdomain', () => {
    expect(isValidEmail('user@mail.example.com')).toBe(true);
  });

  it('accepts email with dots', () => {
    expect(isValidEmail('john.doe@example.com')).toBe(true);
  });

  // Invalid emails
  it('rejects email without @', () => {
    expect(isValidEmail('userexample.com')).toBe(false);
  });

  it('rejects email without domain', () => {
    expect(isValidEmail('user@')).toBe(false);
  });

  it('rejects empty string', () => {
    expect(isValidEmail('')).toBe(false);
  });

  it('rejects email with spaces', () => {
    expect(isValidEmail('user @example.com')).toBe(false);
  });
});
```
</details>

<details>
<summary>💡 Hint: Testing isValidPassword</summary>

Password requirements (example):
- At least 8 characters
- Contains uppercase and lowercase
- Contains number
- Contains special character

```javascript
describe('isValidPassword', () => {
  it('accepts strong password', () => {
    expect(isValidPassword('SecurePass123!')).toBe(true);
  });

  it('rejects password too short', () => {
    expect(isValidPassword('Abc12!')).toBe(false);
  });

  it('rejects password without uppercase', () => {
    expect(isValidPassword('securepass123!')).toBe(false);
  });

  it('rejects password without lowercase', () => {
    expect(isValidPassword('SECUREPASS123!')).toBe(false);
  });

  it('rejects password without number', () => {
    expect(isValidPassword('SecurePass!')).toBe(false);
  });

  it('rejects password without special character', () => {
    expect(isValidPassword('SecurePass123')).toBe(false);
  });
});
```
</details>

---

## Task 4: Async Testing Hints

<details>
<summary>💡 Hint: Testing fetchUser</summary>

Always use `async/await`:

```javascript
describe('fetchUser', () => {
  it('fetches user successfully', async () => {
    const user = await fetchUser(1);

    expect(user).toBeDefined();
    expect(user).toHaveProperty('id', 1);
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
  });

  it('throws error for invalid ID', async () => {
    await expect(fetchUser(-1)).rejects.toThrow('Invalid user ID');
  });

  it('throws error for non-existent user', async () => {
    await expect(fetchUser(9999)).rejects.toThrow('User not found');
  });
});
```
</details>

<details>
<summary>💡 Hint: Testing delay</summary>

```javascript
describe('delay', () => {
  it('resolves after specified time', async () => {
    const start = Date.now();
    await delay(100);
    const elapsed = Date.now() - start;

    expect(elapsed).toBeGreaterThanOrEqual(100);
    expect(elapsed).toBeLessThan(150); // Some tolerance
  });

  it('resolves immediately for 0ms', async () => {
    const start = Date.now();
    await delay(0);
    const elapsed = Date.now() - start;

    expect(elapsed).toBeLessThan(10);
  });
});
```

Or use Vitest's timer mocks:

```javascript
import { vi } from 'vitest';

describe('delay', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('resolves after specified time', async () => {
    const promise = delay(1000);
    vi.advanceTimersByTime(1000);
    await expect(promise).resolves.toBeUndefined();
  });
});
```
</details>

<details>
<summary>💡 Hint: Testing retryOperation</summary>

```javascript
describe('retryOperation', () => {
  it('succeeds on first try', async () => {
    const operation = vi.fn().mockResolvedValue('success');
    const result = await retryOperation(operation, 3);

    expect(result).toBe('success');
    expect(operation).toHaveBeenCalledTimes(1);
  });

  it('retries on failure and eventually succeeds', async () => {
    const operation = vi
      .fn()
      .mockRejectedValueOnce(new Error('fail'))
      .mockRejectedValueOnce(new Error('fail'))
      .mockResolvedValueOnce('success');

    const result = await retryOperation(operation, 3);

    expect(result).toBe('success');
    expect(operation).toHaveBeenCalledTimes(3);
  });

  it('throws after max retries', async () => {
    const operation = vi.fn().mockRejectedValue(new Error('fail'));

    await expect(retryOperation(operation, 3)).rejects.toThrow('fail');
    expect(operation).toHaveBeenCalledTimes(3);
  });
});
```
</details>

---

## Common Mistakes

<details>
<summary>❌ Mistake: Not using async/await</summary>

```javascript
// ❌ Wrong - test finishes before promise resolves
it('fetches user', () => {
  fetchUser(1).then(user => {
    expect(user).toBeDefined(); // Never runs!
  });
});

// ✅ Correct
it('fetches user', async () => {
  const user = await fetchUser(1);
  expect(user).toBeDefined();
});
```
</details>

<details>
<summary>❌ Mistake: Using toBe for objects/arrays</summary>

```javascript
// ❌ Wrong - compares references, not values
expect(user).toBe({ id: 1, name: 'John' });

// ✅ Correct - deep equality
expect(user).toEqual({ id: 1, name: 'John' });
```
</details>

<details>
<summary>❌ Mistake: Not wrapping throws in arrow function</summary>

```javascript
// ❌ Wrong - throws immediately, test fails
expect(divide(10, 0)).toThrow();

// ✅ Correct - wrapped in arrow function
expect(() => divide(10, 0)).toThrow();
```
</details>

<details>
<summary>❌ Mistake: Testing implementation instead of behavior</summary>

```javascript
// ❌ Wrong - tests internal variable
it('sets internal counter', () => {
  const obj = new MyClass();
  obj.increment();
  expect(obj._counter).toBe(1); // Testing private implementation
});

// ✅ Correct - tests public behavior
it('returns incremented value', () => {
  const obj = new MyClass();
  const result = obj.increment();
  expect(result).toBe(1);
});
```
</details>

---

## Debugging Tips

1. **Use `console.log` in tests:**
   ```javascript
   it('test', () => {
     const result = myFunction();
     console.log('Result:', result);
     expect(result).toBe(expected);
   });
   ```

2. **Use `it.only` to run one test:**
   ```javascript
   it.only('this test only', () => {
     // Only this test runs
   });
   ```

3. **Use `it.skip` to skip failing tests:**
   ```javascript
   it.skip('todo: fix this', () => {
     // Skipped
   });
   ```

4. **Check coverage to find untested code:**
   ```bash
   npm test -- --coverage
   ```

---

## Need More Help?

1. Check the solution folder for complete examples
2. Review [Vitest documentation](https://vitest.dev/)
3. Look at [Jest matchers guide](https://jestjs.io/docs/expect)
4. Ask in the community Discord/forum

**You've got this!** 🧪✨

