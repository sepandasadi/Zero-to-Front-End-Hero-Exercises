import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so next render shows fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console (in production, send to error tracking service)
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({ error });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <h2>⚠️ Oops! Something went wrong</h2>
          <p>We encountered an error while loading this page.</p>
          {this.state.error && (
            <details style={{ marginTop: '1rem', textAlign: 'left' }}>
              <summary style={{ cursor: 'pointer', color: '#667eea' }}>
                Error details
              </summary>
              <pre style={{
                background: '#f5f5f5',
                padding: '1rem',
                borderRadius: '4px',
                marginTop: '0.5rem',
                overflow: 'auto'
              }}>
                {this.state.error.toString()}
              </pre>
            </details>
          )}
          <button onClick={() => window.location.reload()}>
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

