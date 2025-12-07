# Debugging Dashboard - Complete Implementation Guide

This guide provides the complete implementation of a production-ready debugging dashboard.

---

## Overview

The Debugging Dashboard combines all debugging techniques from Chapter 12:
- Error tracking and reporting
- Performance monitoring
- Network debugging
- User session tracking
- Real-time analytics

---

## Phase 1: Error Tracking System

### Error Tracking Service

```javascript
// src/services/errorTracking.js
class ErrorTracker {
  constructor(config) {
    this.apiUrl = config.apiUrl;
    this.appVersion = config.appVersion;
    this.environment = config.environment;
    this.errors = [];

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
        stack: event.reason?.stack
      });
    });
  }

  trackError(error) {
    const errorData = {
      id: crypto.randomUUID(),
      ...error,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      appVersion: this.appVersion,
      environment: this.environment,
      user: this.getUserContext(),
      breadcrumbs: this.getBreadcrumbs(),
      performance: this.getPerformanceMetrics()
    };

    // Store locally
    this.errors.push(errorData);
    this.persistErrors();

    // Log to console in development
    if (this.environment === 'development') {
      console.group('🔴 Error Tracked');
      console.error('Message:', errorData.message);
      console.error('Stack:', errorData.stack);
      console.log('Context:', {
        user: errorData.user,
        url: errorData.url,
        breadcrumbs: errorData.breadcrumbs
      });
      console.groupEnd();
    }

    // Send to backend
    this.sendToBackend(errorData);

    return errorData;
  }

  getUserContext() {
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) return null;

      const user = JSON.parse(userStr);
      return {
        id: user.id,
        email: user.email,
        name: user.name
      };
    } catch {
      return null;
    }
  }

  getBreadcrumbs() {
    return window.__breadcrumbs__ || [];
  }

  getPerformanceMetrics() {
    if (!window.performance) return null;

    const navigation = performance.getEntriesByType('navigation')[0];
    return {
      loadTime: navigation?.loadEventEnd - navigation?.fetchStart,
      domContentLoaded: navigation?.domContentLoadedEventEnd - navigation?.fetchStart
    };
  }

  async sendToBackend(errorData) {
    if (!this.apiUrl) return;

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

  persistErrors() {
    try {
      const recentErrors = this.errors.slice(-100); // Keep last 100
      localStorage.setItem('debug_errors', JSON.stringify(recentErrors));
    } catch {
      // Storage full or unavailable
    }
  }

  getErrors() {
    return this.errors;
  }

  clearErrors() {
    this.errors = [];
    localStorage.removeItem('debug_errors');
  }
}

// Initialize
export const errorTracker = new ErrorTracker({
  apiUrl: import.meta.env.VITE_ERROR_API_URL || null,
  appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
  environment: import.meta.env.MODE || 'development'
});

// Expose globally for access
window.__errorTracker__ = errorTracker;
```

### React Error Boundary

```jsx
// src/components/ErrorBoundary.jsx
import React from 'react';
import { errorTracker } from '../services/errorTracking';
import './ErrorBoundary.css';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    const trackedError = errorTracker.trackError({
      type: 'react_error',
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack
    });

    this.setState({
      errorInfo,
      errorId: trackedError.id
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-boundary-content">
            <h1>😕 Oops! Something went wrong</h1>
            <p>We've been notified and are looking into it.</p>

            {this.state.errorId && (
              <p className="error-id">
                Error ID: <code>{this.state.errorId}</code>
              </p>
            )}

            {import.meta.env.MODE === 'development' && (
              <details className="error-details">
                <summary>Error details (development only)</summary>
                <div className="error-content">
                  <h3>Error Message:</h3>
                  <pre>{this.state.error?.message}</pre>

                  <h3>Stack Trace:</h3>
                  <pre>{this.state.error?.stack}</pre>

                  <h3>Component Stack:</h3>
                  <pre>{this.state.errorInfo?.componentStack}</pre>
                </div>
              </details>
            )}

            <div className="error-actions">
              <button onClick={this.handleReset} className="btn-primary">
                Try Again
              </button>
              <button onClick={() => window.location.href = '/'} className="btn-secondary">
                Go Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

```css
/* src/components/ErrorBoundary.css */
.error-boundary {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
}

.error-boundary-content {
  background: white;
  border-radius: 12px;
  padding: 3rem;
  max-width: 600px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.error-boundary h1 {
  margin: 0 0 1rem;
  color: #333;
  font-size: 2rem;
}

.error-boundary p {
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.error-id {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
}

.error-id code {
  color: #e74c3c;
  font-family: 'Monaco', monospace;
}

.error-details {
  margin: 2rem 0;
  background: #f8f9fa;
  border-radius: 6px;
  overflow: hidden;
}

.error-details summary {
  padding: 1rem;
  cursor: pointer;
  font-weight: 600;
  user-select: none;
}

.error-details summary:hover {
  background: #e9ecef;
}

.error-content {
  padding: 1rem;
  max-height: 400px;
  overflow-y: auto;
}

.error-content pre {
  background: #2d2d2d;
  color: #f8f8f2;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 0.85rem;
  line-height: 1.4;
}

.error-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.error-actions button {
  flex: 1;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-primary:hover {
  background: #5568d3;
  transform: translateY(-1px);
}

.btn-secondary {
  background: #e9ecef;
  color: #333;
}

.btn-secondary:hover {
  background: #dee2e6;
}
```

---

## Phase 2: Breadcrumb System

### Breadcrumb Tracker

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
      timestamp: new Date().toISOString(),
      id: crypto.randomUUID()
    });

    // Keep only last N breadcrumbs (circular buffer)
    if (this.breadcrumbs.length > this.maxBreadcrumbs) {
      this.breadcrumbs.shift();
    }

    // Store globally for error tracker
    window.__breadcrumbs__ = this.breadcrumbs;
  }

  setupTracking() {
    // Track all clicks
    document.addEventListener('click', (e) => {
      const target = e.target;
      this.add({
        category: 'user',
        type: 'click',
        message: this.getClickMessage(target),
        data: {
          tagName: target.tagName,
          className: target.className,
          id: target.id,
          textContent: target.textContent?.slice(0, 50)
        }
      });
    }, true); // Use capture phase

    // Track navigation
    this.setupNavigationTracking();

    // Track fetch requests
    this.setupFetchTracking();

    // Track console errors
    this.setupConsoleTracking();
  }

  getClickMessage(element) {
    if (element.id) return `Clicked #${element.id}`;
    if (element.className) return `Clicked .${element.className.split(' ')[0]}`;
    return `Clicked ${element.tagName.toLowerCase()}`;
  }

  setupNavigationTracking() {
    // Track pushState
    const originalPushState = history.pushState;
    const tracker = this;

    history.pushState = function(...args) {
      tracker.add({
        category: 'navigation',
        type: 'route_change',
        message: `Navigated to: ${args[2] || window.location.pathname}`,
        data: {
          url: args[2] || window.location.pathname,
          state: args[0]
        }
      });
      return originalPushState.apply(this, args);
    };

    // Track replaceState
    const originalReplaceState = history.replaceState;
    history.replaceState = function(...args) {
      tracker.add({
        category: 'navigation',
        type: 'route_replace',
        message: `Replaced route: ${args[2] || window.location.pathname}`,
        data: { url: args[2] || window.location.pathname }
      });
      return originalReplaceState.apply(this, args);
    };

    // Track popstate (back/forward)
    window.addEventListener('popstate', () => {
      tracker.add({
        category: 'navigation',
        type: 'navigation_back_forward',
        message: `Navigated back/forward to: ${window.location.pathname}`,
        data: { url: window.location.pathname }
      });
    });
  }

  setupFetchTracking() {
    const originalFetch = window.fetch;
    const tracker = this;

    window.fetch = async function(...args) {
      const url = typeof args[0] === 'string' ? args[0] : args[0].url;
      const method = args[1]?.method || 'GET';
      const startTime = performance.now();

      tracker.add({
        category: 'network',
        type: 'fetch_start',
        message: `${method} ${url}`,
        data: {
          url,
          method,
          headers: args[1]?.headers
        }
      });

      try {
        const response = await originalFetch(...args);
        const duration = performance.now() - startTime;

        tracker.add({
          category: 'network',
          type: response.ok ? 'fetch_success' : 'fetch_error',
          message: `${method} ${url} → ${response.status} (${Math.round(duration)}ms)`,
          data: {
            url,
            method,
            status: response.status,
            statusText: response.statusText,
            duration: Math.round(duration)
          }
        });

        return response;
      } catch (error) {
        const duration = performance.now() - startTime;

        tracker.add({
          category: 'network',
          type: 'fetch_error',
          message: `${method} ${url} → Failed (${error.message})`,
          data: {
            url,
            method,
            error: error.message,
            duration: Math.round(duration)
          }
        });

        throw error;
      }
    };
  }

  setupConsoleTracking() {
    const methods = ['log', 'warn', 'error', 'info'];
    const tracker = this;

    methods.forEach(method => {
      const original = console[method];
      console[method] = function(...args) {
        tracker.add({
          category: 'console',
          type: method,
          message: args.map(arg =>
            typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
          ).join(' ').slice(0, 200),
          data: { args }
        });
        return original.apply(console, args);
      };
    });
  }

  getAll() {
    return this.breadcrumbs;
  }

  clear() {
    this.breadcrumbs = [];
    window.__breadcrumbs__ = [];
  }

  getByCategoryType(category, type) {
    return this.breadcrumbs.filter(b =>
      b.category === category && (!type || b.type === type)
    );
  }
}

export const breadcrumbTracker = new BreadcrumbTracker();

// Expose for debugging
if (import.meta.env.MODE === 'development') {
  window.__getBreadcrumbs__ = () => breadcrumbTracker.getAll();
  window.__clearBreadcrumbs__ = () => breadcrumbTracker.clear();
}
```

---

## Phase 3: Performance Monitoring

### Performance Monitor

```javascript
// src/services/performanceMonitoring.js
class PerformanceMonitor {
  constructor() {
    this.metrics = [];
    this.setupObservers();
  }

  setupObservers() {
    // Core Web Vitals
    this.observeLCP();
    this.observeFID();
    this.observeCLS();

    // Custom metrics
    this.observeNavigationTiming();
    this.observeResourceTiming();
  }

  observeLCP() {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];

        this.recordMetric({
          name: 'LCP',
          value: lastEntry.renderTime || lastEntry.loadTime,
          rating: this.rateLCP(lastEntry.renderTime || lastEntry.loadTime),
          timestamp: new Date().toISOString()
        });
      });

      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.warn('LCP observation not supported');
    }
  }

  observeFID() {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          this.recordMetric({
            name: 'FID',
            value: entry.processingStart - entry.startTime,
            rating: this.rateFID(entry.processingStart - entry.startTime),
            timestamp: new Date().toISOString()
          });
        });
      });

      observer.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      console.warn('FID observation not supported');
    }
  }

  observeCLS() {
    try {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }

        this.recordMetric({
          name: 'CLS',
          value: clsValue,
          rating: this.rateCLS(clsValue),
          timestamp: new Date().toISOString()
        });
      });

      observer.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.warn('CLS observation not supported');
    }
  }

  observeNavigationTiming() {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0];

        if (navigation) {
          this.recordMetric({
            name: 'Page Load',
            value: navigation.loadEventEnd - navigation.fetchStart,
            timestamp: new Date().toISOString()
          });

          this.recordMetric({
            name: 'DOM Content Loaded',
            value: navigation.domContentLoadedEventEnd - navigation.fetchStart,
            timestamp: new Date().toISOString()
          });

          this.recordMetric({
            name: 'Time to Interactive',
            value: navigation.domInteractive - navigation.fetchStart,
            timestamp: new Date().toISOString()
          });
        }
      }, 0);
    });
  }

  observeResourceTiming() {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        if (entry.initiatorType === 'fetch' || entry.initiatorType === 'xmlhttprequest') {
          this.recordMetric({
            name: 'API Call',
            value: entry.duration,
            url: entry.name,
            timestamp: new Date().toISOString()
          });
        }
      });
    });

    observer.observe({ entryTypes: ['resource'] });
  }

  recordMetric(metric) {
    this.metrics.push(metric);

    // Keep last 1000 metrics
    if (this.metrics.length > 1000) {
      this.metrics.shift();
    }

    if (import.meta.env.MODE === 'development') {
      console.log('📊 Performance Metric:', metric);
    }
  }

  rateLCP(value) {
    if (value <= 2500) return 'good';
    if (value <= 4000) return 'needs-improvement';
    return 'poor';
  }

  rateFID(value) {
    if (value <= 100) return 'good';
    if (value <= 300) return 'needs-improvement';
    return 'poor';
  }

  rateCLS(value) {
    if (value <= 0.1) return 'good';
    if (value <= 0.25) return 'needs-improvement';
    return 'poor';
  }

  getMetrics() {
    return this.metrics;
  }

  getMetricsByName(name) {
    return this.metrics.filter(m => m.name === name);
  }

  getCoreWebVitals() {
    return {
      lcp: this.metrics.filter(m => m.name === 'LCP').slice(-1)[0],
      fid: this.metrics.filter(m => m.name === 'FID').slice(-1)[0],
      cls: this.metrics.filter(m => m.name === 'CLS').slice(-1)[0]
    };
  }

  clear() {
    this.metrics = [];
  }
}

export const performanceMonitor = new PerformanceMonitor();

// Expose for debugging
if (import.meta.env.MODE === 'development') {
  window.__performanceMonitor__ = performanceMonitor;
}
```

---

## Phase 4: Dashboard UI Components

### Error Dashboard Component

```jsx
// src/components/dashboard/ErrorDashboard.jsx
import React, { useState, useEffect } from 'react';
import { errorTracker } from '../../services/errorTracking';
import './ErrorDashboard.css';

export function ErrorDashboard() {
  const [errors, setErrors] = useState([]);
  const [selectedError, setSelectedError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const updateErrors = () => {
      setErrors(errorTracker.getErrors());
    };

    updateErrors();
    const interval = setInterval(updateErrors, 1000);

    return () => clearInterval(interval);
  }, []);

  const filteredErrors = errors.filter(err => {
    if (filter === 'all') return true;
    return err.type === filter;
  });

  const errorsByType = errors.reduce((acc, err) => {
    acc[err.type] = (acc[err.type] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="error-dashboard">
      <div className="dashboard-header">
        <h2>Error Tracking</h2>
        <button onClick={() => errorTracker.clearErrors()}>
          Clear All
        </button>
      </div>

      <div className="error-stats">
        <div className="stat-card">
          <div className="stat-value">{errors.length}</div>
          <div className="stat-label">Total Errors</div>
        </div>
        {Object.entries(errorsByType).map(([type, count]) => (
          <div key={type} className="stat-card">
            <div className="stat-value">{count}</div>
            <div className="stat-label">{type.replace(/_/g, ' ')}</div>
          </div>
        ))}
      </div>

      <div className="error-filters">
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={filter === 'react_error' ? 'active' : ''}
          onClick={() => setFilter('react_error')}
        >
          React Errors
        </button>
        <button
          className={filter === 'unhandled_error' ? 'active' : ''}
          onClick={() => setFilter('unhandled_error')}
        >
          Unhandled
        </button>
        <button
          className={filter === 'unhandled_rejection' ? 'active' : ''}
          onClick={() => setFilter('unhandled_rejection')}
        >
          Promises
        </button>
      </div>

      <div className="error-list">
        {filteredErrors.length === 0 ? (
          <div className="empty-state">
            <p>No errors recorded yet. That's good! ✨</p>
          </div>
        ) : (
          filteredErrors.reverse().map(error => (
            <div
              key={error.id}
              className="error-item"
              onClick={() => setSelectedError(error)}
            >
              <div className="error-item-header">
                <span className={`error-type ${error.type}`}>
                  {error.type}
                </span>
                <span className="error-time">
                  {new Date(error.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <div className="error-message">{error.message}</div>
              <div className="error-url">{error.url}</div>
            </div>
          ))
        )}
      </div>

      {selectedError && (
        <ErrorDetailModal
          error={selectedError}
          onClose={() => setSelectedError(null)}
        />
      )}
    </div>
  );
}

function ErrorDetailModal({ error, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Error Details</h3>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <section>
            <h4>Message</h4>
            <pre>{error.message}</pre>
          </section>

          <section>
            <h4>Stack Trace</h4>
            <pre>{error.stack}</pre>
          </section>

          <section>
            <h4>Context</h4>
            <pre>{JSON.stringify({
              url: error.url,
              timestamp: error.timestamp,
              user: error.user,
              appVersion: error.appVersion,
              environment: error.environment
            }, null, 2)}</pre>
          </section>

          {error.breadcrumbs && error.breadcrumbs.length > 0 && (
            <section>
              <h4>Breadcrumbs ({error.breadcrumbs.length})</h4>
              <div className="breadcrumbs-list">
                {error.breadcrumbs.map((b, i) => (
                  <div key={i} className="breadcrumb-item">
                    <span className="breadcrumb-category">{b.category}</span>
                    <span className="breadcrumb-message">{b.message}</span>
                    <span className="breadcrumb-time">
                      {new Date(b.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
```

### Performance Dashboard Component

```jsx
// src/components/dashboard/PerformanceDashboard.jsx
import React, { useState, useEffect } from 'react';
import { performanceMonitor } from '../../services/performanceMonitoring';
import './PerformanceDashboard.css';

export function PerformanceDashboard() {
  const [metrics, setMetrics] = useState([]);
  const [webVitals, setWebVitals] = useState({});

  useEffect(() => {
    const updateMetrics = () => {
      setMetrics(performanceMonitor.getMetrics());
      setWebVitals(performanceMonitor.getCoreWebVitals());
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="performance-dashboard">
      <h2>Performance Monitoring</h2>

      <div className="web-vitals">
        <h3>Core Web Vitals</h3>
        <div className="vitals-grid">
          <VitalCard
            name="LCP"
            description="Largest Contentful Paint"
            value={webVitals.lcp?.value}
            rating={webVitals.lcp?.rating}
            unit="ms"
          />
          <VitalCard
            name="FID"
            description="First Input Delay"
            value={webVitals.fid?.value}
            rating={webVitals.fid?.rating}
            unit="ms"
          />
          <VitalCard
            name="CLS"
            description="Cumulative Layout Shift"
            value={webVitals.cls?.value}
            rating={webVitals.cls?.rating}
            unit=""
          />
        </div>
      </div>

      <div className="metrics-section">
        <h3>Recent Metrics</h3>
        <div className="metrics-list">
          {metrics.slice(-20).reverse().map((metric, i) => (
            <div key={i} className="metric-item">
              <span className="metric-name">{metric.name}</span>
              <span className="metric-value">
                {typeof metric.value === 'number'
                  ? Math.round(metric.value)
                  : metric.value}
                ms
              </span>
              {metric.rating && (
                <span className={`metric-rating ${metric.rating}`}>
                  {metric.rating}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function VitalCard({ name, description, value, rating, unit }) {
  return (
    <div className={`vital-card ${rating || ''}`}>
      <div className="vital-name">{name}</div>
      <div className="vital-value">
        {value !== undefined ? Math.round(value) : '—'}
        {unit}
      </div>
      <div className="vital-description">{description}</div>
      {rating && <div className="vital-rating">{rating}</div>}
    </div>
  );
}
```

This implementation guide provides the core foundation. Would you like me to continue with:
1. Breadcrumb Dashboard component
2. Network monitoring dashboard
3. Main dashboard layout
4. Complete CSS styles
5. Integration guide

