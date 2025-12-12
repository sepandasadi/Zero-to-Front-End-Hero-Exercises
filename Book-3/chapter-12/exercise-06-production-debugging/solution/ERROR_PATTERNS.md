# Error Handling Patterns

## Production-Ready Error Handling

---

## Pattern 1: Try/Catch with Context

```javascript
async function loadUserData(userId) {
  try {
    const user = await api.getUser(userId);
    return user;
  } catch (error) {
    logger.error('Failed to load user', error, { userId });
    throw error;  // Re-throw after logging
  }
}
```

---

## Pattern 2: Error Boundary

```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    Sentry.captureException(error, {
      contexts: { react: errorInfo },
    });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

---

## Pattern 3: Async Error Handling

```javascript
// ❌ Bad: Unhandled promise
fetchData();

// ✅ Good: Handled
fetchData().catch(error => {
  logger.error('Fetch failed', error);
});

// ✅ Better: With user feedback
fetchData()
  .catch(error => {
    logger.error('Fetch failed', error);
    showNotification('Failed to load data');
  });
```

---

## Pattern 4: Global Error Handlers

```javascript
// Unhandled promise rejections
window.addEventListener('unhandledrejection', event => {
  logger.error('Unhandled promise rejection', event.reason);
  event.preventDefault();
});

// Uncaught errors
window.addEventListener('error', event => {
  logger.error('Uncaught error', event.error);
});
```

---

## Pattern 5: Network Error Handling

```javascript
async function apiCall(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      const error = new Error(`HTTP ${response.status}`);
      error.response = response;
      throw error;
    }

    return await response.json();
  } catch (error) {
    if (error.name === 'TypeError') {
      // Network error
      logger.error('Network error', error, { url });
      throw new Error('Network connection failed');
    }
    throw error;
  }
}
```

---

## Pattern 6: User-Friendly Messages

```javascript
function getErrorMessage(error) {
  // Don't show technical errors to users
  const userMessages = {
    NetworkError: 'Please check your internet connection',
    AuthError: 'Please log in again',
    ValidationError: 'Please check your input',
    ServerError: 'Something went wrong. Please try again',
  };

  return userMessages[error.name] || 'An error occurred';
}
```

---

## Best Practices

✅ Always handle errors
✅ Log with context
✅ Show user-friendly messages
✅ Don't swallow errors
✅ Re-throw after logging
✅ Use error boundaries
✅ Monitor in production

**Result:** Robust error handling that helps users and developers!


