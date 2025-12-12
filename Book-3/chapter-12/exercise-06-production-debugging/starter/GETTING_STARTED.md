# Getting Started - Production Debugging

## 🎯 Your Mission

Set up production debugging tools and learn how to debug issues in production environments.

**Time Estimate:** 2-3 hours
**Difficulty:** Advanced

---

## 🚀 Setup

### **1. Install Dependencies**
```bash
npm install
```

### **2. Create Sentry Account (Free)**
1. Go to [sentry.io](https://sentry.io)
2. Sign up for free account
3. Create a new project (React)
4. Copy your DSN (Data Source Name)

### **3. Configure Sentry**
Create `.env.local` file:
```bash
VITE_SENTRY_DSN=your-sentry-dsn-here
```

### **4. Start Development Server**
```bash
npm run dev
```

### **5. Build for Production**
```bash
npm run build
npm run preview
```

---

## 📋 Production Debugging Challenges

| # | Challenge | Tool | Difficulty |
|---|-----------|------|------------|
| 1 | Error Tracking | Sentry | Medium |
| 2 | Source Maps | Vite + Sentry | Medium |
| 3 | Error Boundaries | React | Easy |
| 4 | Breadcrumbs | Sentry | Medium |
| 5 | User Context | Sentry | Easy |
| 6 | Environment Logging | Custom | Medium |

---

## 🔧 Part 1: Error Tracking with Sentry

### **Setup Sentry:**

**src/main.jsx:**
```jsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay()
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
```

### **Test Error Tracking:**
1. Click "Trigger Error" button
2. Go to Sentry dashboard
3. See error appear with stack trace
4. Click error to see details
5. View breadcrumbs (user actions before error)

---

## 🗺️ Part 2: Source Maps

### **Why Source Maps?**
Production code is minified:
```javascript
// Before minification (readable)
function fetchUserData(userId) {
  const data = await fetch(`/api/users/${userId}`);
  return data.json();
}

// After minification (unreadable)
function a(b){const c=await fetch(`/api/users/${b}`);return c.json()}
```

Source maps allow you to debug minified code by mapping it back to original source.

### **Enable Source Maps:**

**vite.config.js:**
```javascript
export default defineConfig({
  build: {
    sourcemap: true, // Generate source maps
  },
})
```

### **Upload Source Maps to Sentry:**
```bash
npm install --save-dev @sentry/vite-plugin

# Update vite.config.js to upload source maps
```

---

## 🛡️ Part 3: Error Boundaries

### **Create Error Boundary:**
```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    Sentry.captureException(error, { contexts: { react: errorInfo } });
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```

### **Wrap Components:**
```jsx
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

---

## 🍞 Part 4: Breadcrumbs

Breadcrumbs show user actions before an error:

```javascript
// Manual breadcrumb
Sentry.addBreadcrumb({
  category: 'auth',
  message: 'User logged in',
  level: 'info',
});

// Automatic breadcrumbs (clicks, navigation, console logs)
// Already tracked by Sentry!
```

**Example Timeline:**
```
1. User clicked "Login" button
2. API call to /auth/login
3. Response: 200 OK
4. Navigated to /dashboard
5. Clicked "Load Data"
6. ❌ Error: Cannot read property 'map' of undefined
```

---

## 👤 Part 5: User Context

### **Set User Information:**
```javascript
Sentry.setUser({
  id: user.id,
  email: user.email,
  username: user.username,
});

// Or for anonymous users:
Sentry.setUser({
  id: 'anonymous',
  ip_address: '{{auto}}',
});
```

### **Add Custom Context:**
```javascript
Sentry.setContext("character", {
  name: "Mighty Fighter",
  level: 19,
  guild: "Warriors",
});
```

---

## 📊 Part 6: Environment-Based Logging

### **Conditional Logging:**
```javascript
const logger = {
  log: (...args) => {
    if (import.meta.env.DEV) {
      console.log(...args);
    }
  },

  error: (...args) => {
    if (import.meta.env.DEV) {
      console.error(...args);
    } else {
      Sentry.captureException(new Error(args.join(' ')));
    }
  },

  warn: (...args) => {
    if (import.meta.env.DEV) {
      console.warn(...args);
    }
  },
};

export default logger;
```

### **Usage:**
```javascript
import logger from './utils/logger';

logger.log('User logged in'); // Only in dev
logger.error('API failed'); // Console in dev, Sentry in prod
```

---

## ✅ Completion Checklist

### **Sentry Setup:**
- [ ] Created Sentry account
- [ ] Created React project in Sentry
- [ ] Configured DSN in `.env.local`
- [ ] Initialized Sentry in app
- [ ] Triggered test error
- [ ] Verified error in Sentry dashboard

### **Source Maps:**
- [ ] Enabled source maps in build
- [ ] Uploaded source maps to Sentry
- [ ] Verified readable stack traces in Sentry

### **Error Boundaries:**
- [ ] Created ErrorBoundary component
- [ ] Wrapped app in ErrorBoundary
- [ ] Tested error catching
- [ ] Displayed fallback UI

### **Breadcrumbs:**
- [ ] Added manual breadcrumbs
- [ ] Verified breadcrumbs in Sentry
- [ ] Tracked user actions before errors

### **User Context:**
- [ ] Set user information
- [ ] Added custom context
- [ ] Verified context in error reports

### **Production Features:**
- [ ] Environment-based logging
- [ ] Performance monitoring
- [ ] Session replay (optional)

---

## 📝 Required Deliverables

### **1. PRODUCTION_SETUP.md**
Document your setup:
```markdown
## Sentry Configuration

**DSN:** [redacted]

**Features Enabled:**
- ✅ Error tracking
- ✅ Source maps
- ✅ Breadcrumbs
- ✅ User context
- ✅ Performance monitoring

**Test Results:**
1. Triggered error in development
2. Triggered error in production build
3. Source maps working: ✅
4. Breadcrumbs captured: ✅
5. User context attached: ✅

[Screenshot of Sentry dashboard showing error]
```

### **2. ERROR_SCENARIOS.md**
Test and document these scenarios:
1. Unhandled Promise Rejection
2. TypeError (undefined property)
3. Network Error
4. Component Error (caught by boundary)
5. Async Error

For each: Screenshot, stack trace, breadcrumbs

---

## 💡 Pro Tips

### **Sampling:**
Don't send every error in production (costs $):
```javascript
Sentry.init({
  dsn: '...',
  sampleRate: 0.5, // Send 50% of errors
  tracesSampleRate: 0.1, // 10% of transactions
});
```

### **Filtering:**
Ignore expected errors:
```javascript
Sentry.init({
  dsn: '...',
  ignoreErrors: [
    'ResizeObserver loop limit exceeded',
    'Non-Error promise rejection captured',
  ],
});
```

### **Release Tracking:**
```javascript
Sentry.init({
  dsn: '...',
  release: 'my-app@1.0.0',
  environment: 'production',
});
```

---

## 🎯 Success Criteria

You've mastered production debugging when you:
- ✅ Can set up error tracking
- ✅ Generate and upload source maps
- ✅ Implement error boundaries
- ✅ Track user context and breadcrumbs
- ✅ Debug production issues remotely
- ✅ Distinguish dev/prod logging

---

**Time Estimate:** 2-3 hours
**Next:** Challenge - Build a complete debugging dashboard!

**Production debugging skills = confidence deploying to production!** 🚀🔍


