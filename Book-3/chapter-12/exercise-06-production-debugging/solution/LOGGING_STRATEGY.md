# Logging Strategy

## Environment-Specific Logging

---

## Development Logging

```javascript
const devLogger = {
  debug: console.debug,
  info: console.info,
  warn: console.warn,
  error: console.error,
};
```

**Benefits:**
- Immediate feedback
- Full details in console
- No external dependencies

---

## Production Logging

```javascript
const prodLogger = {
  debug: () => {},  // Silent in production
  info: (msg, data) => Sentry.addBreadcrumb({ message: msg, data }),
  warn: (msg, data) => Sentry.captureMessage(msg, { level: 'warning', extra: data }),
  error: (msg, error, data) => Sentry.captureException(error, { extra: { msg, ...data } }),
};
```

**Benefits:**
- Centralized error tracking
- User context attached
- Search and filter in Sentry

---

## Combined Logger

```javascript
const isDev = process.env.NODE_ENV === 'development';

export const logger = {
  debug(msg, data) {
    if (isDev) console.debug(msg, data);
  },

  info(msg, data) {
    if (isDev) {
      console.info(msg, data);
    } else {
      Sentry.addBreadcrumb({ message: msg, data, level: 'info' });
    }
  },

  warn(msg, data) {
    if (isDev) {
      console.warn(msg, data);
    } else {
      Sentry.captureMessage(msg, { level: 'warning', extra: data });
    }
  },

  error(msg, error, data) {
    if (isDev) {
      console.error(msg, error, data);
    } else {
      Sentry.captureException(error, { extra: { msg, ...data } });
    }
  },
};
```

---

## Usage Examples

```javascript
// Log user actions
logger.info('User logged in', { userId: user.id });

// Log warnings
logger.warn('API slow response', { duration: 3000 });

// Log errors with context
try {
  await dangerousOperation();
} catch (error) {
  logger.error('Operation failed', error, {
    userId: user.id,
    operation: 'dangerousOperation',
    timestamp: Date.now(),
  });
}
```

---

## Best Practices

✅ Log at appropriate levels
✅ Include context
✅ Don't log sensitive data
✅ Use structured logging
✅ Different strategies per environment

**Result:** Effective logging that helps debug production issues!


