import * as Sentry from "@sentry/react"

function ErrorScenarios() {
  // Scenario 1: Simple Error
  const triggerSimpleError = () => {
    throw new Error('This is a test error sent to Sentry!')
  }

  // Scenario 2: TypeError (most common)
  const triggerTypeError = () => {
    const user = null
    console.log(user.name.toUpperCase()) // Will throw TypeError
  }

  // Scenario 3: Async Error
  const triggerAsyncError = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    throw new Error('Async error after 1 second delay')
  }

  // Scenario 4: Network Error
  const triggerNetworkError = async () => {
    try {
      const response = await fetch('https://api.example.com/nonexistent')
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
    } catch (error) {
      Sentry.captureException(error)
      throw error
    }
  }

  // Scenario 5: Custom Error with Context
  const triggerCustomError = () => {
    Sentry.captureException(new Error('Payment processing failed'), {
      tags: {
        section: 'checkout',
        priority: 'high'
      },
      contexts: {
        payment: {
          amount: 99.99,
          currency: 'USD',
          method: 'credit_card'
        }
      }
    })
    alert('Error sent with custom context! Check Sentry dashboard.')
  }

  return (
    <section className="section">
      <h2>2. Error Scenarios</h2>
      <p>Test different error types and see how they appear in Sentry:</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
        <button className="danger" onClick={triggerSimpleError}>
          Throw Simple Error
        </button>
        <button className="danger" onClick={triggerTypeError}>
          Throw TypeError
        </button>
        <button className="danger" onClick={triggerAsyncError}>
          Throw Async Error
        </button>
        <button className="danger" onClick={triggerNetworkError}>
          Trigger Network Error
        </button>
        <button onClick={triggerCustomError}>
          Error with Context
        </button>
      </div>

      <p className="info">
        💡 After clicking, check Sentry dashboard → Issues. Click the error to see:
        <br />• Stack trace (with source maps!)
        <br />• Breadcrumbs (user actions before error)
        <br />• Device/browser info
        <br />• Custom context
      </p>
    </section>
  )
}

export default ErrorScenarios


