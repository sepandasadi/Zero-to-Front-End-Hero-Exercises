# Sentry Setup Guide

## Complete Production Error Tracking Setup

---

## 1. Installation

```bash
npm install @sentry/react @sentry/tracing
```

---

## 2. Basic Configuration

```javascript
// src/index.jsx
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

Sentry.init({
  dsn: "YOUR_SENTRY_DSN_HERE",
  environment: process.env.NODE_ENV,

  integrations: [
    new BrowserTracing(),
    new Sentry.Replay({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],

  // Performance Monitoring
  tracesSampleRate: 1.0,  // 100% in dev, lower in prod

  // Session Replay
  replaysSessionSampleRate: 0.1,  // 10% of sessions
  replaysOnErrorSampleRate: 1.0,  // 100% when error occurs

  // Filter errors
  beforeSend(event, hint) {
    // Don't send in development
    if (process.env.NODE_ENV === 'development') {
      console.error(hint.originalException || hint.syntheticException);
      return null;
    }

    // Filter out known issues
    if (event.exception) {
      const error = event.exception.values[0];
      if (error.value.includes('ResizeObserver loop')) {
        return null;  // Ignore this specific error
      }
    }

    return event;
  },
});
```

---

## 3. Error Boundary

```javascript
// src/components/ErrorBoundary.jsx
import { ErrorBoundary as SentryErrorBoundary } from '@sentry/react';

function ErrorFallback({ error, resetError }) {
  return (
    <div className="error-container">
      <h1>Something went wrong</h1>
      <p>{error.message}</p>
      <button onClick={resetError}>Try again</button>
    </div>
  );
}

export function AppErrorBoundary({ children }) {
  return (
    <SentryErrorBoundary
      fallback={ErrorFallback}
      showDialog
    >
      {children}
    </SentryErrorBoundary>
  );
}

// Usage in App.jsx
<AppErrorBoundary>
  <App />
</AppErrorBoundary>
```

---

## 4. Source Maps Configuration

### Vite
```javascript
// vite.config.js
import { sentryVitePlugin } from "@sentry/vite-plugin";

export default {
  build: {
    sourcemap: true,
  },
  plugins: [
    sentryVitePlugin({
      org: "your-org",
      project: "your-project",
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
  ],
};
```

### Webpack
```javascript
// webpack.config.js
const SentryWebpackPlugin = require("@sentry/webpack-plugin");

module.exports = {
  devtool: 'source-map',
  plugins: [
    new SentryWebpackPlugin({
      authToken: process.env.SENTRY_AUTH_TOKEN,
      org: "your-org",
      project: "your-project",
      include: "./dist",
      ignore: ["node_modules", "webpack.config.js"],
    }),
  ],
};
```

---

## 5. Custom Logger

```javascript
// src/utils/logger.js
import * as Sentry from '@sentry/react';

const isDev = process.env.NODE_ENV === 'development';

export const logger = {
  debug(message, data = {}) {
    if (isDev) {
      console.debug(message, data);
    }
    Sentry.addBreadcrumb({
      category: 'debug',
      message,
      level: 'debug',
      data,
    });
  },

  info(message, data = {}) {
    if (isDev) {
      console.info(message, data);
    }
    Sentry.addBreadcrumb({
      category: 'info',
      message,
      level: 'info',
      data,
    });
  },

  warn(message, data = {}) {
    if (isDev) {
      console.warn(message, data);
    }
    Sentry.captureMessage(message, {
      level: 'warning',
      extra: data,
    });
  },

  error(message, error, data = {}) {
    if (isDev) {
      console.error(message, error, data);
    }
    Sentry.captureException(error, {
      contexts: {
        details: { message, ...data },
      },
    });
  },
};
```

---

## 6. User Context

```javascript
// src/utils/sentry.js
import * as Sentry from '@sentry/react';

export function setUser(user) {
  Sentry.setUser({
    id: user.id,
    email: user.email,
    username: user.name,
    subscription: user.plan,
  });
}

export function clearUser() {
  Sentry.setUser(null);
}

// Usage after login
auth.login(credentials).then(user => {
  setUser(user);
});

// Usage after logout
auth.logout().then(() => {
  clearUser();
});
```

---

## 7. Breadcrumbs

```javascript
// Track user actions
Sentry.addBreadcrumb({
  category: 'auth',
  message: 'User logged in',
  level: 'info',
});

Sentry.addBreadcrumb({
  category: 'navigation',
  message: 'Navigated to dashboard',
  level: 'info',
  data: { from: '/home', to: '/dashboard' },
});

Sentry.addBreadcrumb({
  category: 'ui',
  message: 'Button clicked',
  level: 'info',
  data: { button: 'submit-form' },
});
```

---

## 8. Performance Monitoring

```javascript
import * as Sentry from '@sentry/react';

// Custom transaction
const transaction = Sentry.startTransaction({
  name: 'Load Dashboard',
  op: 'navigation',
});

loadDashboardData().then(() => {
  transaction.finish();
});

// React component profiling
const ProfiledApp = Sentry.withProfiler(App);
```

---

## 9. Testing Error Tracking

```javascript
// Test errors are captured
function testSentry() {
  try {
    throw new Error('Test error from frontend');
  } catch (e) {
    Sentry.captureException(e);
  }
}

// Test with error boundary
function BuggyComponent() {
  const [crash, setCrash] = useState(false);

  if (crash) {
    throw new Error('Component crashed!');
  }

  return <button onClick={() => setCrash(true)}>Crash</button>;
}
```

---

## 10. Environment Variables

```bash
# .env.production
VITE_SENTRY_DSN=https://...@sentry.io/...
SENTRY_AUTH_TOKEN=your_auth_token_here
SENTRY_ORG=your-org
SENTRY_PROJECT=your-project
```

---

## Verification Checklist

- [ ] Sentry SDK installed
- [ ] DSN configured
- [ ] Error boundary wrapping app
- [ ] Source maps uploading
- [ ] Custom logger implemented
- [ ] User context set on login
- [ ] Breadcrumbs tracking actions
- [ ] Test error appears in Sentry dashboard
- [ ] Stack trace shows original code (source maps working)
- [ ] Session replay captures user actions

---

## Result

✅ Complete production error tracking system
✅ All errors captured with full context
✅ Source maps showing original code
✅ Session replay for debugging
✅ Performance monitoring active

**Production debugging is now professional-grade!**


