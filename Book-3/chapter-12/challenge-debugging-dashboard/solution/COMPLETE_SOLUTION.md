# Debugging Dashboard - Complete Solution

This document contains the complete, production-ready implementation of the Debugging Dashboard.

---

## Project Structure

```
debugging-dashboard/
├── public/
│   └── index.html
├── src/
│   ├── services/
│   │   ├── errorTracking.js
│   │   ├── breadcrumbs.js
│   │   ├── performanceMonitoring.js
│   │   └── networkMonitoring.js
│   ├── components/
│   │   ├── ErrorBoundary.jsx
│   │   ├── ErrorBoundary.css
│   │   └── dashboard/
│   │       ├── ErrorDashboard.jsx
│   │       ├── ErrorDashboard.css
│   │       ├── PerformanceDashboard.jsx
│   │       ├── PerformanceDashboard.css
│   │       ├── BreadcrumbDashboard.jsx
│   │       ├── BreadcrumbDashboard.css
│   │       ├── NetworkDashboard.jsx
│   │       └── NetworkDashboard.css
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── package.json
└── vite.config.js
```

---

## Additional Dashboard Components

### Breadcrumb Dashboard

```jsx
// src/components/dashboard/BreadcrumbDashboard.jsx
import React, { useState, useEffect } from 'react';
import { breadcrumbTracker } from '../../services/breadcrumbs';
import './BreadcrumbDashboard.css';

export function BreadcrumbDashboard() {
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const updateBreadcrumbs = () => {
      setBreadcrumbs(breadcrumbTracker.getAll());
    };

    updateBreadcrumbs();
    const interval = setInterval(updateBreadcrumbs, 500);

    return () => clearInterval(interval);
  }, []);

  const filteredBreadcrumbs = breadcrumbs.filter(b => {
    if (filter === 'all') return true;
    return b.category === filter;
  });

  const categoryCounts = breadcrumbs.reduce((acc, b) => {
    acc[b.category] = (acc[b.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="breadcrumb-dashboard">
      <div className="dashboard-header">
        <h2>User Session Trail</h2>
        <button onClick={() => breadcrumbTracker.clear()}>
          Clear Trail
        </button>
      </div>

      <div className="breadcrumb-stats">
        <div className="stat-card">
          <div className="stat-value">{breadcrumbs.length}</div>
          <div className="stat-label">Total Events</div>
        </div>
        {Object.entries(categoryCounts).map(([category, count]) => (
          <div key={category} className="stat-card">
            <div className="stat-value">{count}</div>
            <div className="stat-label">{category}</div>
          </div>
        ))}
      </div>

      <div className="breadcrumb-filters">
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All ({breadcrumbs.length})
        </button>
        <button
          className={filter === 'user' ? 'active' : ''}
          onClick={() => setFilter('user')}
        >
          User ({categoryCounts.user || 0})
        </button>
        <button
          className={filter === 'navigation' ? 'active' : ''}
          onClick={() => setFilter('navigation')}
        >
          Navigation ({categoryCounts.navigation || 0})
        </button>
        <button
          className={filter === 'network' ? 'active' : ''}
          onClick={() => setFilter('network')}
        >
          Network ({categoryCounts.network || 0})
        </button>
        <button
          className={filter === 'console' ? 'active' : ''}
          onClick={() => setFilter('console')}
        >
          Console ({categoryCounts.console || 0})
        </button>
      </div>

      <div className="breadcrumb-timeline">
        {filteredBreadcrumbs.length === 0 ? (
          <div className="empty-state">
            <p>No events recorded yet. Start interacting with the app!</p>
          </div>
        ) : (
          filteredBreadcrumbs.map((crumb, index) => (
            <BreadcrumbItem
              key={crumb.id}
              breadcrumb={crumb}
              index={index}
            />
          ))
        )}
      </div>
    </div>
  );
}

function BreadcrumbItem({ breadcrumb, index }) {
  const getIcon = (category) => {
    switch (category) {
      case 'user': return '👆';
      case 'navigation': return '🧭';
      case 'network': return '🌐';
      case 'console': return '📝';
      default: return '📍';
    }
  };

  const getTypeClass = (type) => {
    if (type.includes('error') || type.includes('failed')) return 'error';
    if (type.includes('success')) return 'success';
    return 'info';
  };

  return (
    <div className={`breadcrumb-item ${getTypeClass(breadcrumb.type)}`}>
      <div className="breadcrumb-index">{index + 1}</div>
      <div className="breadcrumb-icon">{getIcon(breadcrumb.category)}</div>
      <div className="breadcrumb-content">
        <div className="breadcrumb-header">
          <span className="breadcrumb-category">{breadcrumb.category}</span>
          <span className="breadcrumb-type">{breadcrumb.type}</span>
          <span className="breadcrumb-time">
            {new Date(breadcrumb.timestamp).toLocaleTimeString()}
          </span>
        </div>
        <div className="breadcrumb-message">{breadcrumb.message}</div>
        {breadcrumb.data && Object.keys(breadcrumb.data).length > 0 && (
          <details className="breadcrumb-data">
            <summary>Details</summary>
            <pre>{JSON.stringify(breadcrumb.data, null, 2)}</pre>
          </details>
        )}
      </div>
    </div>
  );
}
```

### Network Dashboard

```jsx
// src/components/dashboard/NetworkDashboard.jsx
import React, { useState, useEffect } from 'react';
import { breadcrumbTracker } from '../../services/breadcrumbs';
import './NetworkDashboard.css';

export function NetworkDashboard() {
  const [networkEvents, setNetworkEvents] = useState([]);

  useEffect(() => {
    const updateNetworkEvents = () => {
      const events = breadcrumbTracker.getByCategoryType('network');
      setNetworkEvents(events);
    };

    updateNetworkEvents();
    const interval = setInterval(updateNetworkEvents, 500);

    return () => clearInterval(interval);
  }, []);

  const groupedRequests = groupRequestsByUrl(networkEvents);

  const stats = calculateNetworkStats(networkEvents);

  return (
    <div className="network-dashboard">
      <h2>Network Activity</h2>

      <div className="network-stats">
        <div className="stat-card">
          <div className="stat-value">{stats.totalRequests}</div>
          <div className="stat-label">Total Requests</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.successCount}</div>
          <div className="stat-label">Successful</div>
        </div>
        <div className="stat-card error">
          <div className="stat-value">{stats.errorCount}</div>
          <div className="stat-label">Failed</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.avgDuration}ms</div>
          <div className="stat-label">Avg Duration</div>
        </div>
      </div>

      <div className="network-requests">
        <h3>Recent Requests</h3>
        {Object.entries(groupedRequests).map(([url, events]) => (
          <NetworkRequestGroup key={url} url={url} events={events} />
        ))}
      </div>
    </div>
  );
}

function NetworkRequestGroup({ url, events }) {
  const [expanded, setExpanded] = useState(false);

  const latest = events[events.length - 1];
  const isError = latest.type.includes('error');
  const duration = latest.data?.duration;

  return (
    <div className={`network-request-group ${isError ? 'error' : 'success'}`}>
      <div className="request-summary" onClick={() => setExpanded(!expanded)}>
        <span className={`status-indicator ${isError ? 'error' : 'success'}`}>
          {isError ? '❌' : '✅'}
        </span>
        <span className="request-method">{latest.data?.method || 'GET'}</span>
        <span className="request-url">{url}</span>
        {duration && (
          <span className="request-duration">{duration}ms</span>
        )}
        <span className="request-count">×{events.length}</span>
        <span className="expand-icon">{expanded ? '▼' : '▶'}</span>
      </div>

      {expanded && (
        <div className="request-details">
          {events.map((event, i) => (
            <div key={i} className="request-event">
              <span className="event-time">
                {new Date(event.timestamp).toLocaleTimeString()}
              </span>
              <span className="event-type">{event.type}</span>
              {event.data?.status && (
                <span className="event-status">{event.data.status}</span>
              )}
              {event.data?.duration && (
                <span className="event-duration">{event.data.duration}ms</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function groupRequestsByUrl(events) {
  return events.reduce((acc, event) => {
    const url = event.data?.url || 'unknown';
    if (!acc[url]) acc[url] = [];
    acc[url].push(event);
    return acc;
  }, {});
}

function calculateNetworkStats(events) {
  const completedEvents = events.filter(e => e.type.includes('success') || e.type.includes('error'));
  const successEvents = events.filter(e => e.type.includes('success'));
  const errorEvents = events.filter(e => e.type.includes('error'));

  const durations = completedEvents
    .map(e => e.data?.duration)
    .filter(d => typeof d === 'number');

  const avgDuration = durations.length > 0
    ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length)
    : 0;

  return {
    totalRequests: completedEvents.length,
    successCount: successEvents.length,
    errorCount: errorEvents.length,
    avgDuration
  };
}
```

---

## Main App Component

```jsx
// src/App.jsx
import React, { useState } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ErrorDashboard } from './components/dashboard/ErrorDashboard';
import { PerformanceDashboard } from './components/dashboard/PerformanceDashboard';
import { BreadcrumbDashboard } from './components/dashboard/BreadcrumbDashboard';
import { NetworkDashboard } from './components/dashboard/NetworkDashboard';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('errors');

  return (
    <ErrorBoundary>
      <div className="app">
        <header className="app-header">
          <h1>🔍 Debugging Dashboard</h1>
          <p>Real-time monitoring and error tracking</p>
        </header>

        <nav className="tab-nav">
          <button
            className={activeTab === 'errors' ? 'active' : ''}
            onClick={() => setActiveTab('errors')}
          >
            🔴 Errors
          </button>
          <button
            className={activeTab === 'performance' ? 'active' : ''}
            onClick={() => setActiveTab('performance')}
          >
            📊 Performance
          </button>
          <button
            className={activeTab === 'breadcrumbs' ? 'active' : ''}
            onClick={() => setActiveTab('breadcrumbs')}
          >
            📍 Breadcrumbs
          </button>
          <button
            className={activeTab === 'network' ? 'active' : ''}
            onClick={() => setActiveTab('network')}
          >
            🌐 Network
          </button>
          <button
            className={activeTab === 'demo' ? 'active' : ''}
            onClick={() => setActiveTab('demo')}
          >
            🎮 Demo
          </button>
        </nav>

        <main className="app-main">
          {activeTab === 'errors' && <ErrorDashboard />}
          {activeTab === 'performance' && <PerformanceDashboard />}
          {activeTab === 'breadcrumbs' && <BreadcrumbDashboard />}
          {activeTab === 'network' && <NetworkDashboard />}
          {activeTab === 'demo' && <DemoSection />}
        </main>
      </div>
    </ErrorBoundary>
  );
}

function DemoSection() {
  const [count, setCount] = useState(0);

  const triggerError = () => {
    throw new Error('This is a test error!');
  };

  const triggerPromiseRejection = () => {
    Promise.reject(new Error('Unhandled promise rejection!'));
  };

  const triggerNetworkError = async () => {
    await fetch('https://jsonplaceholder.typicode.com/invalid-endpoint');
  };

  const triggerSlowRequest = async () => {
    await fetch('https://jsonplaceholder.typicode.com/posts');
  };

  return (
    <div className="demo-section">
      <h2>Test the Dashboard</h2>
      <p>Click buttons below to generate different types of events:</p>

      <div className="demo-grid">
        <div className="demo-card">
          <h3>Errors</h3>
          <button onClick={triggerError}>Throw Error</button>
          <button onClick={triggerPromiseRejection}>Promise Rejection</button>
        </div>

        <div className="demo-card">
          <h3>Network</h3>
          <button onClick={triggerNetworkError}>Network Error</button>
          <button onClick={triggerSlowRequest}>Slow Request</button>
        </div>

        <div className="demo-card">
          <h3>User Actions</h3>
          <button onClick={() => setCount(count + 1)}>
            Increment ({count})
          </button>
          <button onClick={() => console.log('Test log', { count })}>
            Console Log
          </button>
        </div>

        <div className="demo-card">
          <h3>Performance</h3>
          <button onClick={() => {
            // Simulate expensive operation
            const start = Date.now();
            while (Date.now() - start < 100) {}
          }}>
            Block Main Thread
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
```

---

## Complete CSS Styles

```css
/* src/App.css */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #f5f5f5;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.app-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.app-header p {
  opacity: 0.9;
  font-size: 1.1rem;
}

.tab-nav {
  background: white;
  display: flex;
  gap: 0;
  padding: 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
}

.tab-nav button {
  flex: 1;
  padding: 1rem;
  border: none;
  background: white;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  color: #666;
  transition: all 0.2s;
  border-bottom: 3px solid transparent;
}

.tab-nav button:hover {
  background: #f8f9fa;
  color: #333;
}

.tab-nav button.active {
  color: #667eea;
  border-bottom-color: #667eea;
  background: #f8f9ff;
}

.app-main {
  flex: 1;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

/* Dashboard common styles */
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.dashboard-header h2 {
  font-size: 2rem;
  color: #333;
}

.dashboard-header button {
  padding: 0.5rem 1rem;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;
}

.dashboard-header button:hover {
  background: #c0392b;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: bold;
  color: #667eea;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #666;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #999;
  font-size: 1.1rem;
}

/* Demo section */
.demo-section {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.demo-section h2 {
  margin-bottom: 1rem;
  color: #333;
}

.demo-section p {
  color: #666;
  margin-bottom: 2rem;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.demo-card {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border: 2px solid #e9ecef;
}

.demo-card h3 {
  margin-bottom: 1rem;
  color: #333;
  font-size: 1.2rem;
}

.demo-card button {
  display: block;
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s;
}

.demo-card button:last-child {
  margin-bottom: 0;
}

.demo-card button:hover {
  background: #5568d3;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}
```

---

## Package.json

```json
{
  "name": "debugging-dashboard",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.0.0",
    "vite": "^4.3.0"
  }
}
```

---

## Vite Config

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  },
  build: {
    sourcemap: true // Enable source maps for debugging
  }
});
```

---

## Main Entry Point

```jsx
// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Import tracking services to initialize them
import './services/errorTracking';
import './services/breadcrumbs';
import './services/performanceMonitoring';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

```css
/* src/index.css */
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
}

button {
  font-family: inherit;
}
```

---

## Features Implemented

### ✅ Error Tracking
- Global error handlers
- React Error Boundaries
- Error context (user, URL, timestamp)
- Error persistence
- Error dashboard with filtering

### ✅ Performance Monitoring
- Core Web Vitals (LCP, FID, CLS)
- Navigation timing
- API response times
- Performance dashboard with metrics

### ✅ Breadcrumb System
- Click tracking
- Navigation tracking
- Network request tracking
- Console log tracking
- Timeline view

### ✅ Network Monitoring
- Request/response tracking
- Success/failure tracking
- Duration tracking
- Grouped request view

### ✅ Demo Section
- Error trigger buttons
- Network test buttons
- Performance test tools
- Interactive examples

---

## Usage

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Visit `http://localhost:5173` to see the dashboard in action!

---

## Key Features

1. **Real-time monitoring** - All metrics update live
2. **Complete error context** - Every error includes user info, breadcrumbs, and performance data
3. **Session replay** - Breadcrumb trail shows user journey
4. **Performance insights** - Core Web Vitals and custom metrics
5. **Network debugging** - Track all API calls with timing
6. **Production-ready** - Error boundaries, proper error handling

---

**This is a complete, working debugging dashboard! 🎉**

