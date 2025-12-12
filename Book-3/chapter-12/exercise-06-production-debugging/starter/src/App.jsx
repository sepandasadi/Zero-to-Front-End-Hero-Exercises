import { useState } from 'react'
import * as Sentry from "@sentry/react"
import ErrorBoundaryDemo from './components/ErrorBoundaryDemo'
import BreadcrumbsDemo from './components/BreadcrumbsDemo'
import UserContextDemo from './components/UserContextDemo'
import ErrorScenarios from './components/ErrorScenarios'
import './App.css'

function App() {
  const [sentryConfigured, setSentryConfigured] = useState(!!import.meta.env.VITE_SENTRY_DSN)

  const testSentry = () => {
    try {
      Sentry.captureMessage('Test message from Production Debugging App!', 'info')
      alert('Test message sent to Sentry! Check your dashboard.')
    } catch (error) {
      alert('Sentry not configured. Add VITE_SENTRY_DSN to .env.local')
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🚀 Production Debugging</h1>
        <p>Learn to debug production apps with Sentry & Source Maps</p>
        <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
          Sentry Status:
          {sentryConfigured ? (
            <span className="status success">✅ Configured</span>
          ) : (
            <span className="status error">❌ Not Configured</span>
          )}
        </p>
      </header>

      <main className="main">
        {!sentryConfigured && (
          <section className="section" style={{ background: '#fff3cd', borderLeftColor: '#ffc107' }}>
            <h2>⚠️ Setup Required</h2>
            <p>Follow these steps to configure Sentry:</p>
            <ol style={{ marginLeft: '1.5rem', marginTop: '1rem' }}>
              <li>Go to <a href="https://sentry.io" target="_blank" rel="noopener noreferrer">sentry.io</a> and create a free account</li>
              <li>Create a new React project</li>
              <li>Copy your DSN (Data Source Name)</li>
              <li>Create <code>.env.local</code> file in this directory</li>
              <li>Add: <code>VITE_SENTRY_DSN=your-dsn-here</code></li>
              <li>Restart dev server</li>
            </ol>
          </section>
        )}

        <section className="section">
          <h2>1. Test Sentry Connection</h2>
          <button onClick={testSentry}>
            Send Test Message to Sentry
          </button>
          <p className="info">
            Click the button, then check your Sentry dashboard for the message.
          </p>
        </section>

        <ErrorScenarios />
        <BreadcrumbsDemo />
        <UserContextDemo />
        <ErrorBoundaryDemo />

        <section className="section">
          <h2>📚 Additional Resources</h2>
          <ul style={{ marginLeft: '1.5rem' }}>
            <li><a href="https://docs.sentry.io/platforms/javascript/guides/react/" target="_blank" rel="noopener noreferrer">Sentry React Docs</a></li>
            <li><a href="https://docs.sentry.io/platforms/javascript/sourcemaps/" target="_blank" rel="noopener noreferrer">Source Maps Guide</a></li>
            <li><a href="https://docs.sentry.io/platforms/javascript/guides/react/features/error-boundary/" target="_blank" rel="noopener noreferrer">Error Boundaries</a></li>
          </ul>
        </section>
      </main>
    </div>
  )
}

export default App


