# Exercise 06: Production Debugging - Hints

## 🔍 Quick Setup Guide

### Sentry Setup (5 minutes)

**1. Create Sentry Account:**
- Go to sentry.io
- Create free account
- Create new project (React)
- Copy DSN

**2. Install & Configure:**
```bash
npm install @sentry/react
```

```javascript
// main.jsx
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: "https://xxx@sentry.io/xxx",
  environment: import.meta.env.MODE,
  beforeSend(event) {
    // Don't send in development
    if (import.meta.env.DEV) return null;
    return event;
  }
});
```

### Error Boundary Template

```jsx
import { ErrorBoundary } from '@sentry/react';

function ErrorFallback({ error }) {
  return (
    <div style={{ padding: '20px', background: '#fee' }}>
      <h1>❌ Something went wrong</h1>
      <pre>{error.message}</pre>
      <button onClick={() => window.location.reload()}>
        Reload Page
      </button>
    </div>
  );
}

// Wrap your app
<ErrorBoundary fallback={ErrorFallback}>
  <App />
</ErrorBoundary>
```

### Custom Logger

```javascript
// utils/logger.js
import * as Sentry from '@sentry/react';

const isDev = import.meta.env.DEV;

export const logger = {
  debug: (msg, data) => {
    if (isDev) console.debug(msg, data);
  },

  info: (msg, data) => {
    if (isDev) console.info(msg, data);
    Sentry.captureMessage(msg, { level: 'info', extra: data });
  },

  warn: (msg, data) => {
    console.warn(msg, data);
    Sentry.captureMessage(msg, { level: 'warning', extra: data });
  },

  error: (msg, data) => {
    console.error(msg, data);
    Sentry.captureException(
      new Error(msg),
      { extra: data }
    );
  }
};

// Usage:
logger.info('User logged in', { userId: 123 });
logger.error('API failed', { endpoint: '/api/users' });
```

### Source Maps

```javascript
// vite.config.js
export default {
  build: {
    sourcemap: true  // Enable source maps
  }
}
```

### Test Errors

```javascript
// Create test button
<button onClick={() => {
  throw new Error('Test error!');
}}>
  Trigger Error
</button>

// Test async error
<button onClick={async () => {
  await fetch('/non-existent');
}}>
  Test Network Error
</button>

// Test promise rejection
<button onClick={() => {
  Promise.reject('Promise failed!');
}}>
  Test Promise
</button>
```

### Breadcrumbs

```javascript
// Track user actions
Sentry.addBreadcrumb({
  message: 'Button clicked',
  category: 'ui',
  data: { buttonId: 'submit' }
});

// Track navigation
Sentry.addBreadcrumb({
  message: 'Navigated to /dashboard',
  category: 'navigation'
});

// Track API calls
Sentry.addBreadcrumb({
  message: 'API call',
  category: 'api',
  data: { url: '/api/users', method: 'GET' }
});
```

### User Context

```javascript
// After login
Sentry.setUser({
  id: user.id,
  email: user.email,
  username: user.name
});

// After logout
Sentry.setUser(null);
```

---
**Track errors before users report them!** 📊


