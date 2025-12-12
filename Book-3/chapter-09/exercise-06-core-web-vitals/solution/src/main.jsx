import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { initWebVitals } from './web-vitals-tracker.js'

// ✅ Initialize Web Vitals tracking
initWebVitals({
  enableConsoleLogging: true,
  enableAnalytics: false // Set to true in production
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

