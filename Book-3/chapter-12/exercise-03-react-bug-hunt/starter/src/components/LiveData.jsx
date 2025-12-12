import { useState, useEffect } from 'react'

// BUG #8: setState on Unmounted Component
// SYMPTOM: Warning "Can't perform a React state update on an unmounted component"

function LiveData() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)

    // Simulate slow API call
    setTimeout(() => {
      setData({ value: Math.random(), timestamp: Date.now() })
      setLoading(false)
    }, 2000)

    // ❌ BUG: No cleanup! If component unmounts during timeout,
    // setState will be called on unmounted component
    // Missing: cleanup flag to prevent setState after unmount
  }, [])

  if (loading) {
    return (
      <div className="component-box">
        <h3>Live Data (Bug: Unmounted Update)</h3>
        <p className="loading">Loading data...</p>
        <p className="info-text">
          Bug: Navigate away before data loads. Check console for warning!
        </p>
      </div>
    )
  }

  return (
    <div className="component-box">
      <h3>Live Data</h3>
      <p>Value: {data?.value.toFixed(4)}</p>
      <p>Timestamp: {data?.timestamp}</p>
    </div>
  )
}

export default LiveData


