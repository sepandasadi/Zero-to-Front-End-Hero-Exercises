# Exercise 04: Mocking & Spies - Solution

## 🎯 What's Demonstrated

- ✅ Creating mock functions with `jest.fn()`
- ✅ Mocking return values and implementations
- ✅ Spying on methods with `jest.spyOn()`
- ✅ Mocking module dependencies
- ✅ Testing callbacks
- ✅ Using mock matchers
- ✅ Verifying function calls

## 🚀 Running Tests

```bash
npm install
npm test
```

## 📚 Key Concepts

### Creating Mocks

```javascript
// Simple mock function
const mockFn = jest.fn()

// Mock with return value
const mockFn = jest.fn().mockReturnValue(42)

// Mock with implementation
const mockFn = jest.fn((x) => x * 2)

// Mock async function
const mockFn = jest.fn().mockResolvedValue('success')
```

### Mock Return Values

```javascript
const mock = jest.fn()

// Always return same value
mock.mockReturnValue(10)

// Return different values
mock
  .mockReturnValueOnce(1)
  .mockReturnValueOnce(2)
  .mockReturnValue(3)

mock() // 1
mock() // 2
mock() // 3
mock() // 3
```

### Spying on Methods

```javascript
const obj = {
  method: () => 'original'
}

// Create spy
const spy = jest.spyOn(obj, 'method')

// Override implementation
spy.mockImplementation(() => 'mocked')

obj.method() // 'mocked'

// Restore original
spy.mockRestore()

obj.method() // 'original'
```

### Mocking Dependencies

```javascript
// Mock entire module
jest.mock('./database.js', () => ({
  query: jest.fn(),
  insert: jest.fn()
}))

// Partial mock (keep some real)
jest.mock('./utils.js', () => {
  const actual = jest.requireActual('./utils.js')
  return {
    ...actual,
    fetchUser: jest.fn()
  }
})
```

### Verification Matchers

```javascript
const mockFn = jest.fn()

mockFn('hello', 123)
mockFn('world', 456)

// Was it called?
expect(mockFn).toHaveBeenCalled()

// How many times?
expect(mockFn).toHaveBeenCalledTimes(2)

// With specific arguments?
expect(mockFn).toHaveBeenCalledWith('hello', 123)

// Last call?
expect(mockFn).toHaveBeenLastCalledWith('world', 456)

// What did it return?
expect(mockFn).toHaveReturnedWith(someValue)
```

## 💡 Best Practices

1. **Clear mocks between tests**: Use `jest.clearAllMocks()` in `beforeEach()`
2. **Restore spies**: Always call `spy.mockRestore()` after testing
3. **Mock at the right level**: Mock dependencies, not the code under test
4. **Verify behavior**: Check that mocks were called correctly
5. **Use descriptive names**: Name mocks clearly (e.g., `mockDatabase`)

## 🐛 Common Mistakes

```javascript
// ❌ BAD - Not clearing mocks
test('test 1', () => {
  mockFn()
  expect(mockFn).toHaveBeenCalledTimes(1)
})

test('test 2', () => {
  mockFn()
  expect(mockFn).toHaveBeenCalledTimes(1) // Fails! Still 2
})

// ✅ GOOD - Clear in beforeEach
beforeEach(() => {
  jest.clearAllMocks()
})

// ❌ BAD - Testing mock instead of real behavior
test('should add', () => {
  const mockAdd = jest.fn()
  expect(mockAdd).not.toHaveBeenCalled()
})

// ✅ GOOD - Test real function with mock dependencies
test('should add', () => {
  const result = add(2, 3) // Real function
  expect(result).toBe(5)
  expect(mockLogger).toHaveBeenCalled() // Verify side effect
})
```

## 🔍 When to Mock

**DO Mock:**
- External APIs and services
- Database connections
- File system operations
- Date/time functions
- Random number generators
- Third-party libraries

**DON'T Mock:**
- The code under test
- Simple utility functions
- Standard library (unless necessary)
- Everything (over-mocking makes tests brittle)

## 📖 Further Reading

- [Jest Mock Functions](https://jestjs.io/docs/mock-functions)
- [Jest Mock Implementations](https://jestjs.io/docs/mock-function-api)
- [ES6 Module Mocking](https://jestjs.io/docs/es6-class-mocks)
