import React from 'react'
import ReactDOM from 'react-dom/client'
import * as Sentry from "@sentry/react"
import App from './App'
import './index.css'

// Initialize Sentry for production error tracking
// Only initialize if DSN is provided
if (import.meta.env.VITE_SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [
      new Sentry.BrowserTracing(),
      new Sentry.Replay({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, // Capture 100% of transactions in dev
    // Session Replay
    replaysSessionSampleRate: 0.1, // 10% of sessions
    replaysOnErrorSampleRate: 1.0, // 100% when error occurs
    // Environment
    environment: import.meta.env.MODE, // 'development' or 'production'
    // Release tracking
    release: `my-app@${import.meta.env.VITE_APP_VERSION || '1.0.0'}`,
  })

  console.log('🔍 Sentry initialized - production debugging enabled')
} else {
  console.warn('⚠️ Sentry DSN not found. Create .env.local with VITE_SENTRY_DSN')
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)


