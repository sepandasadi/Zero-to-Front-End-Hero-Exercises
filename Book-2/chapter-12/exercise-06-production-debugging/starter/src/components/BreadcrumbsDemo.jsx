import { useState } from 'react'
import * as Sentry from "@sentry/react"

function BreadcrumbsDemo() {
  const [breadcrumbs, setBreadcrumbs] = useState([])

  const addBreadcrumb = (category, message, level = 'info') => {
    const timestamp = new Date().toLocaleTimeString()

    // Add to Sentry
    Sentry.addBreadcrumb({
      category,
      message,
      level,
      timestamp: Date.now() / 1000,
    })

    // Display in UI
    setBreadcrumbs(prev => [...prev, { category, message, level, timestamp }])
  }

  const simulateUserJourney = () => {
    setBreadcrumbs([])

    setTimeout(() => addBreadcrumb('navigation', 'User visited homepage', 'info'), 0)
    setTimeout(() => addBreadcrumb('ui.click', 'Clicked "Login" button', 'info'), 500)
    setTimeout(() => addBreadcrumb('http', 'POST /api/auth/login → 200 OK', 'info'), 1000)
    setTimeout(() => addBreadcrumb('auth', 'User logged in successfully', 'info'), 1500)
    setTimeout(() => addBreadcrumb('navigation', 'Navigated to /dashboard', 'info'), 2000)
    setTimeout(() => addBreadcrumb('ui.click', 'Clicked "Load Data" button', 'info'), 2500)
    setTimeout(() => addBreadcrumb('http', 'GET /api/data → 500 Error', 'error'), 3000)
    setTimeout(() => {
      addBreadcrumb('error', 'Failed to load dashboard data', 'error')
      // Trigger error to see breadcrumbs in Sentry
      Sentry.captureException(new Error('Dashboard data load failed'))
      alert('Error triggered! Check Sentry to see the breadcrumb trail.')
    }, 3500)
  }

  return (
    <section className="section">
      <h2>3. Breadcrumbs</h2>
      <p>Breadcrumbs show the user's journey before an error occurred:</p>

      <div style={{ marginTop: '1rem' }}>
        <button onClick={simulateUserJourney}>
          Simulate User Journey → Error
        </button>
        <button onClick={() => setBreadcrumbs([])}>
          Clear Breadcrumbs
        </button>
      </div>

      {breadcrumbs.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <h3>Breadcrumb Trail:</h3>
          {breadcrumbs.map((crumb, i) => (
            <div key={i} className="breadcrumb">
              <span className="time">{crumb.timestamp}</span>
              <span className="category">[{crumb.category}]</span>
              {crumb.message}
            </div>
          ))}
        </div>
      )}

      <p className="info">
        💡 In Sentry, breadcrumbs are automatically captured for:
        <br />• Console logs
        <br />• Navigation events
        <br />• Click events
        <br />• Network requests
        <br />• You can also add custom breadcrumbs (like above)
      </p>
    </section>
  )
}

export default BreadcrumbsDemo


