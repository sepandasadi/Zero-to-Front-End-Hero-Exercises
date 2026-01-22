# Exercise 03: Async Testing - Solution

## 🎯 What's Demonstrated

- ✅ Testing Promises with async/await
- ✅ Testing Promise rejection
- ✅ Using .then() syntax for assertions
- ✅ Testing concurrent async operations (Promise.all)
- ✅ Testing retry logic
- ✅ Using fake timers for timeouts
- ✅ Error handling in async code

## 🚀 Running Tests

```bash
# Install dependencies
npm install

# Run tests
npm test

# Watch mode
npm run test:watch

# With coverage
npm run test:coverage
```

## 📚 Key Concepts

### Testing Promises

**Method 1: async/await (Recommended)**
```javascript
test('should return user', async () => {
  const user = await fetchUser(1)
  expect(user.id).toBe(1)
})
```

**Method 2: return Promise**
```javascript
test('should return user', () => {
  return fetchUser(1).then(user => {
    expect(user.id).toBe(1)
  })
})
```

**Method 3: done callback (Legacy)**
```javascript
test('should return user', (done) => {
  fetchUser(1).then(user => {
    expect(user.id).toBe(1)
    done()
  })
})
```

### Testing Rejection

```javascript
// Using async/await
test('should reject', async () => {
  await expect(fetchUser()).rejects.toThrow('User ID is required')
})

// Using try/catch
test('should reject', async () => {
  try {
    await fetchUser()
    fail('Should have thrown')
  } catch (error) {
    expect(error.message).toBe('User ID is required')
  }
})
```

### Testing Concurrent Operations

```javascript
test('should fetch multiple users', async () => {
  const users = await fetchMultipleUsers([1, 2, 3])
  expect(users).toHaveLength(3)
})
```

### Using Fake Timers

```javascript
jest.useFakeTimers()

test('should timeout', async () => {
  const promise = fetchWithTimeout('url', 100)
  
  jest.advanceTimersByTime(150) // Fast-forward time
  
  await expect(promise).rejects.toThrow('timeout')
})
```

## 💡 Best Practices

1. **Always return or await**: Don't forget to return promises or use async/await
2. **Use expect().rejects**: Cleaner than try/catch for rejection testing
3. **Mock external APIs**: Don't make real network requests in tests
4. **Use fake timers**: Test timeout behavior without waiting
5. **Test error cases**: Both success and failure paths

## 🐛 Common Mistakes

```javascript
// ❌ BAD - Test finishes before Promise resolves
test('should work', () => {
  fetchUser(1).then(user => {
    expect(user.id).toBe(1)
  })
})

// ✅ GOOD - Return the promise
test('should work', () => {
  return fetchUser(1).then(user => {
    expect(user.id).toBe(1)
  })
})

// ✅ BETTER - Use async/await
test('should work', async () => {
  const user = await fetchUser(1)
  expect(user.id).toBe(1)
})
```

## 🔍 Testing Checklist

- [ ] Test successful Promise resolution
- [ ] Test Promise rejection
- [ ] Test async/await functions
- [ ] Test concurrent operations
- [ ] Test error handling
- [ ] Test timeouts with fake timers
- [ ] Test retry logic
- [ ] All tests pass independently

## 📖 Further Reading

- [Jest Async Testing](https://jestjs.io/docs/asynchronous)
- [Jest Fake Timers](https://jestjs.io/docs/timer-mocks)
- [Testing Promises](https://jestjs.io/docs/tutorial-async)
