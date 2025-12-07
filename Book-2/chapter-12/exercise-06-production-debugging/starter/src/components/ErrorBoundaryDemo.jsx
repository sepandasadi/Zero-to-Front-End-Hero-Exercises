import { Component, useState } from 'react'
import * as Sentry from "@sentry/react"

// Error Boundary Component
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // Log error to Sentry
    Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack,
        },
      },
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>🛑 Oops! Something went wrong</h2>
          <p>The application encountered an error.</p>
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '1rem' }}>
            Error: {this.state.error?.message}
          </p>
          <button onClick={() => this.setState({ hasError: false, error: null })}>
            Try Again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

// Component that can throw errors
function BuggyComponent({ shouldCrash }) {
  if (shouldCrash) {
    throw new Error('Component crashed! (Caught by Error Boundary)')
  }

  return (
    <div className="demo-box">
      <h4>✅ Component Working Normally</h4>
      <p>This component is rendered successfully.</p>
    </div>
  )
}

function ErrorBoundaryDemo() {
  const [crash, setCrash] = useState(false)

  return (
    <section className="section">
      <h2>5. Error Boundary</h2>
      <p>Catch React component errors gracefully and log to Sentry:</p>

      <div style={{ marginTop: '1rem' }}>
        <button className="danger" onClick={() => setCrash(true)}>
          Crash Component
        </button>
        <button onClick={() => setCrash(false)}>
          Reset Component
        </button>
      </div>

      <ErrorBoundary>
        <BuggyComponent shouldCrash={crash} />
      </ErrorBoundary>

      <p className="info">
        💡 Error Boundaries:
        <br />• Catch errors in child components
        <br />• Display fallback UI
        <br />• Log errors to Sentry
        <br />• Prevent entire app from crashing
        <br />• Only work in production builds (not strict mode dev)
      </p>
    </section>
  )
}

export default ErrorBoundaryDemo


