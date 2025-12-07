# Challenge: Build a Debugging Dashboard

**Difficulty:** Advanced
**Time:** 8-10 hours
**Goal:** Create a comprehensive debugging and monitoring system for production applications

## 🎯 Project Overview

Build a production-ready debugging dashboard that tracks errors, monitors performance, logs user sessions, and provides real-time insights into your application's health.

**What you're building:**
- Real-time error tracking and reporting
- Performance monitoring (Core Web Vitals, API timing)
- User session replay (breadcrumb trail)
- Network request logging and analysis
- Console log capture (only in development)
- Custom error boundaries with fallback UI
- Automatic bug reports (with context)
- Analytics integration

**Real-world value:** This is what tools like Sentry, LogRocket, and Datadog do. You'll build a simplified version!

---

## 🛠️ Phase 1: Error Tracking System (2-3 hours)

**Tasks:**
- [ ] Set up error tracking service (use Sentry free tier or build custom)
- [ ] Implement global error handlers
- [ ] Create React Error Boundaries
- [ ] Add error context (user, URL, timestamp, browser)
- [ ] Send errors to tracking service
- [ ] Create error dashboard view

**Implementation:**

### 1.1 Global Error Handler

```javascript
// src/services/errorTracking.js
class ErrorTracker {
  constructor(config) {
    this.apiUrl = config.apiUrl;
    this.appVersion = config.appVersion;
    this.environment = config.environment;

    this.setupGlobalHandlers();
  }

  setupGlobalHandlers() {
    // Catch unhandled errors
    window.addEventListener('error', (event) => {
      this.trackError({
        type: 'unhandled_error',
        message: event.error?.message || 'Unknown error',
        stack: event.error?.stack,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      });
    });

    // Catch unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.trackError({
        type: 'unhandled_rejection',
        message: event.reason?.message || 'Promise rejected',
        stack: event.reason?.stack,
        promise: event.promise
      });
    });
  }

  trackError(error) {
    const errorData = {
      ...error,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      appVersion: this.appVersion,
      environment: this.environment,
      user: this.getUserContext(),
      breadcrumbs: this.getBreadcrumbs()
    };

    // Log to console in development
    if (this.environment === 'development') {
      console.error('Error tracked:', errorData);
    }

    // Send to backend
    this.sendToBackend(errorData);
  }

  getUserContext() {
    // Get current user info from your auth system
    const user = getCurrentUser(); // Your auth function
    return user ? {
      id: user.id,
      email: user.email,
      name: user.name
    } : null;
  }

  getBreadcrumbs() {
    return window.__breadcrumbs__ || [];
  }

  async sendToBackend(errorData) {
    try {
      await fetch(`${this.apiUrl}/errors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(errorData)
      });
    } catch (err) {
      console.error('Failed to send error to backend:', err);
    }
  }
}

// Initialize
export const errorTracker = new ErrorTracker({
  apiUrl: process.env.REACT_APP_ERROR_API_URL,
  appVersion: process.env.REACT_APP_VERSION,
  environment: process.env.NODE_ENV
});
```

### 1.2 React Error Boundary

```jsx
// src/components/ErrorBoundary.jsx
import React from 'react';
import { errorTracker } from '../services/errorTracking';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    errorTracker.trackError({
      type: 'react_error',
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack
    });

    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h1>Oops! Something went wrong</h1>
          <p>We've been notified and are looking into it.</p>

          {process.env.NODE_ENV === 'development' && (
            <details>
              <summary>Error details (dev only)</summary>
              <pre>{this.state.error?.message}</pre>
              <pre>{this.state.error?.stack}</pre>
              <pre>{this.state.errorInfo?.componentStack}</pre>
            </details>
          )}

          <button onClick={this.handleReset}>Try Again</button>
          <button onClick={() => window.location.href = '/'}>
            Go Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

**Acceptance Criteria:**
- [ ] All unhandled errors are caught and logged
- [ ] Error reports include user context
- [ ] Error Boundary shows user-friendly fallback UI
- [ ] Errors sent to backend/Sentry
- [ ] Development shows detailed error info

---

## 🔍 Phase 2: Breadcrumb System (1-2 hours)

**Tasks:**
- [ ] Track user interactions (clicks, navigation)
- [ ] Track API calls (request/response)
- [ ] Track state changes
- [ ] Store breadcrumbs in memory (circular buffer)
- [ ] Include breadcrumbs in error reports

**Implementation:**

```javascript
// src/services/breadcrumbs.js
class BreadcrumbTracker {
  constructor(maxBreadcrumbs = 50) {
    this.breadcrumbs = [];
    this.maxBreadcrumbs = maxBreadcrumbs;
    this.setupTracking();
  }

  add(breadcrumb) {
    this.breadcrumbs.push({
      ...breadcrumb,
      timestamp: new Date().toISOString()
    });

    // Keep only last N breadcrumbs
    if (this.breadcrumbs.length > this.maxBreadcrumbs) {
      this.breadcrumbs.shift();
    }

    // Store globally for error tracker
    window.__breadcrumbs__ = this.breadcrumbs;
  }

  setupTracking() {
    // Track clicks
    document.addEventListener('click', (e) => {
      const target = e.target;
      this.add({
        category: 'user',
        type: 'click',
        message: `Clicked: ${target.tagName}`,
        data: {
          tagName: target.tagName,
          className: target.className,
          id: target.id,
          textContent: target.textContent?.slice(0, 50)
        }
      });
    });

    // Track navigation
    const originalPushState = history.pushState;
    history.pushState = function(...args) {
      breadcrumbTracker.add({
        category: 'navigation',
        type: 'route_change',
        message: `Navigated to: ${args[2]}`,
        data: { url: args[2] }
      });
      return originalPushState.apply(this, args);
    };

    // Track fetch requests
    const originalFetch = window.fetch;
    window.fetch = async function(...args) {
      const url = args[0];
      const startTime = performance.now();

      breadcrumbTracker.add({
        category: 'network',
        type: 'fetch_start',
        message: `Fetching: ${url}`,
        data: { url, method: args[1]?.method || 'GET' }
      });

      try {
        const response = await originalFetch(...args);
        const duration = performance.now() - startTime;

        breadcrumbTracker.add({
          category: 'network',
          type: 'fetch_success',
          message: `Fetch ${response.status}: ${url}`,
          data: {
            url,
            status: response.status,
            duration: Math.round(duration)
          }
        });

        return response;
      } catch (error) {
        breadcrumbTracker.add({
          category: 'network',
          type: 'fetch_error',
          message: `Fetch failed: ${url}`,
          data: { url, error: error.message }
        });
        throw error;
      }
    };
  }

  getAll() {
    return this.breadcrumbs;
  }

  clear() {
    this.breadcrumbs = [];
    window.__breadcrumbs__ = [];
  }
}

export const breadcrumbTracker = new BreadcrumbTracker();

// Expose for debugging
if (process.env.NODE_ENV === 'development') {
  window.__getBreadcrumbs__ = () => breadcrumbTracker.getAll();
}
```

**Acceptance Criteria:**
- [ ] Clicks are tracked with element info
- [ ] Navigation changes are tracked
- [ ] API calls are tracked (start, success, error)
- [ ] Breadcrumbs limited to last 50 events
- [ ] Breadcrumbs included in error reports

---

## 📊 Phase 3: Performance Monitoring (2-3 hours)

**Tasks:**
- [ ] Track Core Web Vitals (LCP, FID/INP, CLS)
- [ ] Track API response times
- [ ] Track page load time
- [ ] Track component render time
- [ ] Send performance data to backend
- [ ] Create performance dashboard

**Implementation:**

```javascript
// src/services/performanceMonitoring.js
class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.setupCoreWebVitals();
    this.setupPerformanceObserver();
  }

  setupCoreWebVitals() {
    // LCP (Largest Contentful Paint)
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];

      this.trackMetric({
        name: 'LCP',
        value: lastEntry.renderTime || lastEntry.loadTime,
        rating: this.getRating('LCP', lastEntry.renderTime || lastEntry.loadTime)
      });
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // FID (First Input Delay) - Use INP in newer browsers
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        this.trackMetric({
          name: 'FID',
          value: entry.processingStart - entry.startTime,
          rating: this.getRating('FID', entry.processingStart - entry.startTime)
        });
      }
    }).observe({ entryTypes: ['first-input'] });

    // CLS (Cumulative Layout Shift)
    let clsValue = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }

      this.trackMetric({
        name: 'CLS',
        value: clsValue,
        rating: this.getRating('CLS', clsValue)
      });
    }).observe({ entryTypes: ['layout-shift'] });
  }

  setupPerformanceObserver() {
    // Track navigation timing
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0];

      this.trackMetric({
        name: 'TTFB',
        value: navigation.responseStart - navigation.requestStart
      });

      this.trackMetric({
        name: 'DOMContentLoaded',
        value: navigation.domContentLoadedEventEnd - navigation.fetchStart
      });

      this.trackMetric({
        name: 'Load',
        value: navigation.loadEventEnd - navigation.fetchStart
      });
    });
  }

  getRating(metric, value) {
    const thresholds = {
      LCP: { good: 2500, poor: 4000 },
      FID: { good: 100, poor: 300 },
      CLS: { good: 0.1, poor: 0.25 },
      TTFB: { good: 800, poor: 1800 }
    };

    const t = thresholds[metric];
    if (!t) return 'unknown';

    if (value <= t.good) return 'good';
    if (value <= t.poor) return 'needs-improvement';
    return 'poor';
  }

  trackMetric(metric) {
    this.metrics[metric.name] = metric;

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Performance] ${metric.name}:`, metric);
    }

    // Send to backend
    this.sendMetric(metric);
  }

  async sendMetric(metric) {
    try {
      await fetch('/api/performance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...metric,
          url: window.location.href,
          timestamp: new Date().toISOString()
        })
      });
    } catch (err) {
      console.error('Failed to send performance metric:', err);
    }
  }

  getMetrics() {
    return this.metrics;
  }
}

export const performanceMonitor = new PerformanceMonitor();

// Expose for debugging
if (process.env.NODE_ENV === 'development') {
  window.__getPerformance__ = () => performanceMonitor.getMetrics();
}
```

**Acceptance Criteria:**
- [ ] Core Web Vitals tracked (LCP, FID, CLS)
- [ ] Page load metrics tracked (TTFB, DOMContentLoaded, Load)
- [ ] Metrics rated (good, needs-improvement, poor)
- [ ] Metrics sent to backend
- [ ] Performance data viewable in dashboard

---

## 📱 Phase 4: Dashboard UI (2-3 hours)

**Tasks:**
- [ ] Create dashboard page (/dashboard/debugging)
- [ ] Show error list with details
- [ ] Show performance metrics with charts
- [ ] Show breadcrumbs timeline
- [ ] Filter by date, user, error type
- [ ] Search functionality
- [ ] Export error reports

**Implementation:**

```jsx
// src/pages/DebuggingDashboard.jsx
import React, { useState, useEffect } from 'react';

export function DebuggingDashboard() {
  const [errors, setErrors] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [selectedError, setSelectedError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchErrors();
    fetchMetrics();
  }, []);

  const fetchErrors = async () => {
    const res = await fetch('/api/errors');
    const data = await res.json();
    setErrors(data);
  };

  const fetchMetrics = async () => {
    const res = await fetch('/api/performance');
    const data = await res.json();
    setMetrics(data);
  };

  return (
    <div className="debugging-dashboard">
      <h1>Debugging Dashboard</h1>

      {/* Performance Overview */}
      <section className="performance-overview">
        <h2>Core Web Vitals</h2>
        <div className="metrics-grid">
          <MetricCard
            name="LCP"
            value={metrics.LCP?.value}
            rating={metrics.LCP?.rating}
            unit="ms"
          />
          <MetricCard
            name="FID"
            value={metrics.FID?.value}
            rating={metrics.FID?.rating}
            unit="ms"
          />
          <MetricCard
            name="CLS"
            value={metrics.CLS?.value}
            rating={metrics.CLS?.rating}
          />
        </div>
      </section>

      {/* Error List */}
      <section className="error-list">
        <h2>Recent Errors ({errors.length})</h2>

        <div className="filters">
          <button onClick={() => setFilter('all')}>All</button>
          <button onClick={() => setFilter('unhandled_error')}>
            Unhandled Errors
          </button>
          <button onClick={() => setFilter('react_error')}>
            React Errors
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Message</th>
              <th>User</th>
              <th>URL</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {errors
              .filter(e => filter === 'all' || e.type === filter)
              .map(error => (
                <tr key={error.id}>
                  <td>{new Date(error.timestamp).toLocaleString()}</td>
                  <td>{error.message}</td>
                  <td>{error.user?.email || 'Anonymous'}</td>
                  <td>{error.url}</td>
                  <td>
                    <button onClick={() => setSelectedError(error)}>
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>

      {/* Error Details Modal */}
      {selectedError && (
        <ErrorDetailsModal
          error={selectedError}
          onClose={() => setSelectedError(null)}
        />
      )}
    </div>
  );
}

function MetricCard({ name, value, rating, unit = 'ms' }) {
  const ratingColor = {
    good: 'green',
    'needs-improvement': 'orange',
    poor: 'red'
  }[rating] || 'gray';

  return (
    <div className={`metric-card metric-${ratingColor}`}>
      <h3>{name}</h3>
      <div className="value">
        {value ? `${Math.round(value)}${unit}` : 'N/A'}
      </div>
      <div className="rating">{rating}</div>
    </div>
  );
}

function ErrorDetailsModal({ error, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Error Details</h2>

        <section>
          <h3>Message</h3>
          <pre>{error.message}</pre>
        </section>

        <section>
          <h3>Stack Trace</h3>
          <pre>{error.stack}</pre>
        </section>

        <section>
          <h3>User Context</h3>
          <pre>{JSON.stringify(error.user, null, 2)}</pre>
        </section>

        <section>
          <h3>Breadcrumbs</h3>
          <ul className="breadcrumbs">
            {error.breadcrumbs?.map((b, i) => (
              <li key={i}>
                <span className="timestamp">{b.timestamp}</span>
                <span className="category">{b.category}</span>
                <span className="message">{b.message}</span>
              </li>
            ))}
          </ul>
        </section>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
```

**Acceptance Criteria:**
- [ ] Dashboard shows error list
- [ ] Dashboard shows performance metrics
- [ ] Error details modal shows full context
- [ ] Filters work (by type, date, user)
- [ ] Breadcrumbs timeline visible
- [ ] Responsive design

---

## ✅ Final Acceptance Criteria

**Error Tracking:**
- [ ] All errors caught (unhandled, promises, React)
- [ ] Error reports include user context
- [ ] Error reports include breadcrumbs
- [ ] Errors sent to backend/Sentry
- [ ] Error Boundary shows fallback UI

**Performance Monitoring:**
- [ ] Core Web Vitals tracked (LCP, FID, CLS)
- [ ] Page load metrics tracked
- [ ] Metrics rated (good/needs-improvement/poor)
- [ ] Performance data sent to backend
- [ ] Dashboard shows performance overview

**Breadcrumb System:**
- [ ] User interactions tracked (clicks)
- [ ] Navigation tracked
- [ ] API calls tracked
- [ ] Limited to last 50 breadcrumbs
- [ ] Included in error reports

**Dashboard:**
- [ ] Error list with filtering
- [ ] Performance metrics visualization
- [ ] Error details modal
- [ ] Breadcrumb timeline
- [ ] Responsive design

**Code Quality:**
- [ ] Well-organized code structure
- [ ] TypeScript types (if using TS)
- [ ] Comments explaining complex logic
- [ ] Error handling for tracking failures
- [ ] Environment-based behavior (dev vs prod)

---

## 🎁 Bonus Challenges

1. **Session Replay**: Record and replay user sessions (like LogRocket)
2. **Network Waterfall**: Visualize API call timing
3. **Real-time Alerts**: Email/Slack notifications for critical errors
4. **Error Grouping**: Group similar errors together
5. **Source Maps**: Upload and use source maps to show original code
6. **A/B Testing**: Track errors by experiment variant
7. **User Journey**: Visualize user path before error
8. **Performance Budget**: Alert when metrics exceed budget
9. **Crash Reports**: Generate downloadable crash reports
10. **Integration**: Connect to GitHub Issues (auto-create issues)

---

## 📝 Deliverables

1. **Working debugging system** integrated in your app
2. **Dashboard UI** showing errors and performance
3. **Backend API** (or use Sentry)
4. **Documentation**:
   - How to integrate in new app
   - How to use the dashboard
   - How to configure tracking
5. **Test cases**: Intentionally trigger errors to test tracking
6. **Screenshots** of dashboard showing tracked errors

---

## 💡 Tips

1. **Start with Sentry**: Use Sentry free tier instead of building backend
2. **Test thoroughly**: Trigger errors intentionally to verify tracking
3. **Privacy matters**: Don't log sensitive data (passwords, credit cards)
4. **Sampling**: In production, sample data (10% of users) to reduce cost
5. **Performance**: Tracking shouldn't slow down the app
6. **Security**: Secure your error tracking API (authentication)
7. **GDPR**: Add opt-out for privacy-conscious users

---

## 🎓 Learning Outcomes

After completing this challenge:
- ✅ Build production debugging infrastructure
- ✅ Implement error tracking from scratch
- ✅ Monitor performance in real-time
- ✅ Track user journeys with breadcrumbs
- ✅ Create data visualization dashboards
- ✅ Understand how Sentry/LogRocket work
- ✅ **Portfolio-worthy project** demonstrating debugging expertise

---

**This is a professional skill!** Companies pay $100k+ for engineers who can build monitoring systems. 🚀

**Time estimate:** 8-10 hours
**Difficulty:** Advanced
**Portfolio-worthy:** ✅ Absolutely! This shows senior-level debugging knowledge

