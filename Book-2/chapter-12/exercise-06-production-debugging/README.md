# Exercise 06: Production Debugging

**Difficulty:** Advanced | **Time:** 3-4 hours | **Focus:** Error tracking & monitoring

## 🎯 Objectives
- Set up error tracking (Sentry)
- Configure source maps
- Create error boundaries
- Implement logging
- Monitor production errors

## 🛠️ Setup Tasks

### **1. Install Sentry**
```bash
npm install @sentry/react
```

### **2. Configure Sentry**
```javascript
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: "YOUR_DSN_HERE",
  environment: process.env.NODE_ENV,
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay()
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
```

### **3. Error Boundaries**
```jsx
import { ErrorBoundary } from '@sentry/react';

<ErrorBoundary fallback={<ErrorFallback />}>
  <App />
</ErrorBoundary>
```

### **4. Custom Logger**
```javascript
const logger = {
  debug: (msg, data) => console.debug(msg, data),
  info: (msg, data) => console.info(msg, data),
  warn: (msg, data) => console.warn(msg, data),
  error: (msg, data) => {
    console.error(msg, data);
    Sentry.captureException(new Error(msg), { extra: data });
  }
};
```

## 📋 Implementation Tasks

### **Error Handling:**
1. Wrap components in error boundaries
2. Catch async errors
3. Handle promise rejections
4. Log network failures
5. Track user actions (breadcrumbs)

### **Source Maps:**
```javascript
// vite.config.js
export default {
  build: {
    sourcemap: true  // Generate source maps
  }
}

// Upload to Sentry
sentry-cli releases files VERSION upload-sourcemaps ./dist
```

### **Breadcrumbs:**
```javascript
Sentry.addBreadcrumb({
  category: 'auth',
  message: 'User logged in',
  level: 'info'
});
```

### **User Context:**
```javascript
Sentry.setUser({
  id: user.id,
  email: user.email,
  username: user.name
});
```

## 🐛 Test Error Scenarios

Create intentional errors to test tracking:

1. **Uncaught Exception**
2. **Promise Rejection**
3. **Network Failure**
4. **Runtime Error**
5. **Async Error**
6. **Component Error**

## 📝 Deliverables

### **1. Error Tracking Setup** (`SETUP_GUIDE.md`)
- Sentry configuration
- Error boundary setup
- Source map configuration
- Environment setup

### **2. Error Dashboard** (Screenshots)
- Sentry dashboard showing errors
- Error details with stack traces
- Source maps working (showing original code)
- Breadcrumbs leading to error
- User context information

### **3. Logging Strategy** (`LOGGING_STRATEGY.md`)
```javascript
// Different log levels for different environments
const config = {
  development: {
    level: 'debug',
    console: true,
    sentry: false
  },
  production: {
    level: 'error',
    console: false,
    sentry: true
  }
};
```

### **4. Error Handling Patterns** (`ERROR_PATTERNS.md`)
- Try/catch patterns
- Promise error handling
- Error boundary usage
- Network error handling
- User-friendly error messages

## ✅ Acceptance Criteria
- [ ] Sentry configured and working
- [ ] Source maps uploaded
- [ ] Error boundaries implemented
- [ ] Custom logger created
- [ ] Breadcrumbs tracking user actions
- [ ] User context attached to errors
- [ ] Tested with intentional errors
- [ ] Dashboard showing captured errors
- [ ] Stack traces point to original code

## 💡 Tips

**Environment-Specific Logging:**
```javascript
const isDev = process.env.NODE_ENV === 'development';

const log = isDev
  ? console.log
  : (msg) => Sentry.captureMessage(msg);
```

**Error Boundaries:**
```jsx
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    Sentry.captureException(error, {
      contexts: { react: errorInfo }
    });
  }
}
```

**Global Error Handler:**
```javascript
window.addEventListener('error', (event) => {
  Sentry.captureException(event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  Sentry.captureException(event.reason);
});
```

## 🎓 Resources
- [Sentry Documentation](https://docs.sentry.io/)
- [Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
- [Source Maps](https://web.dev/source-maps/)

---
**Next:** Challenge: Debugging Dashboard

**Remember:** Good error tracking prevents user frustration and helps you fix bugs faster! 🐛→📊


