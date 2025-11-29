# Challenge: Build a Safe API Caller ⭐⭐⭐⭐

## 🎯 Objective

Create a production-ready API calling function with comprehensive error handling, retry logic, and timeout management.

## 📝 Instructions

Build a `safeAPICall` function that handles all the edge cases of calling external APIs.

### Requirements

**Core Features:**
1. **Try/catch for network errors**
   - Catch and handle fetch errors
   - Return error object with details

2. **Timeout handling**
   - Abort request if it takes too long
   - Default timeout: 5 seconds
   - Configurable timeout

3. **Retry logic**
   - Retry failed requests (default: 3 attempts)
   - Exponential backoff between retries
   - Don't retry on 4xx errors (client errors)

4. **Loading state management**
   - Call loading callbacks
   - Update UI during request

5. **User-friendly error messages**
   - Transform technical errors into readable messages
   - Categorize errors (network, timeout, server, etc.)

### Function Signature

```js
async function safeAPICall(url, options = {}) {
  // Returns: { success: boolean, data: any, error: string }
}
```

### Usage Examples

```js
// Basic call
const result = await safeAPICall('https://api.example.com/users');
if (result.success) {
  console.log('Data:', result.data);
} else {
  console.error('Error:', result.error);
}

// With options
const result = await safeAPICall('https://api.example.com/users', {
  timeout: 3000,
  retries: 5,
  onLoading: (isLoading) => showSpinner(isLoading),
  headers: { 'Authorization': 'Bearer token' }
});
```

### Expected Behavior

| Scenario | Behavior |
|----------|----------|
| Successful request | Return `{ success: true, data: response }` |
| Network error | Retry 3 times, then return error |
| Timeout | Abort and return timeout error |
| 404 error | Don't retry, return not found error |
| 500 error | Retry, then return server error |

## 💡 Implementation Hints

### 1. Timeout with AbortController

```js
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), timeout);

try {
  const response = await fetch(url, { signal: controller.signal });
  clearTimeout(timeoutId);
} catch (error) {
  if (error.name === 'AbortError') {
    // Timeout occurred
  }
}
```

### 2. Retry with Exponential Backoff

```js
for (let attempt = 1; attempt <= maxRetries; attempt++) {
  try {
    // Try the request
    return result;
  } catch (error) {
    if (attempt === maxRetries) throw error;

    // Wait before retry (exponential backoff)
    await sleep(Math.pow(2, attempt) * 1000);
  }
}
```

### 3. Categorize Errors

```js
function getErrorMessage(error, response) {
  if (error.name === 'AbortError') {
    return 'Request timed out. Please try again.';
  }

  if (!response) {
    return 'Network error. Check your connection.';
  }

  if (response.status >= 500) {
    return 'Server error. Please try again later.';
  }

  if (response.status === 404) {
    return 'Resource not found.';
  }

  return 'An error occurred. Please try again.';
}
```

## 🏆 Success Criteria

Your function should:
- ✅ Handle all error types gracefully
- ✅ Never crash or throw unhandled errors
- ✅ Retry appropriately (not on client errors)
- ✅ Respect timeout limits
- ✅ Return consistent response format
- ✅ Call loading callbacks
- ✅ Log errors for debugging

## 🧪 Test Cases

```js
// Test 1: Successful call
const test1 = await safeAPICall('https://jsonplaceholder.typicode.com/users/1');
// Expected: { success: true, data: {...} }

// Test 2: 404 Error
const test2 = await safeAPICall('https://jsonplaceholder.typicode.com/users/99999');
// Expected: { success: false, error: 'Resource not found.' }

// Test 3: Invalid URL (network error)
const test3 = await safeAPICall('https://invalid-url-that-does-not-exist.com');
// Expected: { success: false, error: 'Network error...' }

// Test 4: With timeout
const test4 = await safeAPICall('https://httpbin.org/delay/10', { timeout: 2000 });
// Expected: { success: false, error: 'Request timed out...' }
```

## 💡 Testing Strategy

1. Start with a simple successful call
2. Add timeout handling
3. Add retry logic
4. Add error categorization
5. Add loading callbacks
6. Test with real APIs (jsonplaceholder.typicode.com, httpbin.org)

## ✅ Solution

Check `solution.js` for a complete, production-ready implementation.


