# Exercise 6: Error Handling with APIs ⭐⭐⭐

## 🎯 Objective

Master error handling for API calls, network failures, and edge cases.

## 📝 Instructions

Build a robust API client that handles all types of errors gracefully.

### Types of Errors to Handle

1. **Network Errors**
   - No internet connection
   - Timeout
   - DNS failure

2. **HTTP Errors**
   - 404 Not Found
   - 500 Server Error
   - 401 Unauthorized
   - 429 Too Many Requests

3. **Data Errors**
   - Invalid JSON
   - Missing required fields
   - Unexpected data format

4. **Client Errors**
   - Invalid input
   - Empty responses

### Required Features

1. **fetchWithErrorHandling(url, options)**
   - Wraps fetch with comprehensive error handling
   - Returns standardized error objects
   - Handles timeouts
   - Retries on failure (configurable)

2. **Error Types**
   ```javascript
   class NetworkError extends Error { }
   class HTTPError extends Error { }
   class ValidationError extends Error { }
   ```

3. **User Feedback**
   - Show appropriate error messages
   - Loading states
   - Retry buttons
   - Error details (in dev mode)

## 🎯 Tasks

1. Create custom error classes
2. Implement fetch wrapper with error handling
3. Add timeout functionality
4. Implement retry logic
5. Create UI to test different error scenarios
6. Add error logging

## 🎁 Bonus Challenges

1. Implement exponential backoff for retries
2. Add request cancellation (AbortController)
3. Create error recovery strategies
4. Add offline detection
5. Implement request queue for failed requests

## 💡 Error Handling Patterns

### Basic Pattern
```javascript
try {
  const response = await fetch(url);
  if (!response.ok) {
    throw new HTTPError(response.status);
  }
  const data = await response.json();
  return data;
} catch (error) {
  if (error instanceof TypeError) {
    // Network error
  } else if (error instanceof HTTPError) {
    // HTTP error
  }
  throw error;
}
```

### With Timeout
```javascript
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 5000);

try {
  const response = await fetch(url, {
    signal: controller.signal
  });
} catch (error) {
  if (error.name === 'AbortError') {
    // Request timed out
  }
} finally {
  clearTimeout(timeout);
}
```

### With Retry
```javascript
async function fetchWithRetry(url, options, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetch(url, options);
    } catch (error) {
      if (i === retries - 1) throw error;
      await delay(1000 * Math.pow(2, i)); // Exponential backoff
    }
  }
}
```

## ✅ Success Criteria

- Handles network errors
- Handles HTTP errors (4xx, 5xx)
- Implements timeout
- Implements retry logic
- Provides clear error messages
- Has proper error logging

## ⏱️ Estimated Time

40-50 minutes

