import { useState, useEffect } from 'react'

// BUG #3: Stale Closure
// SYMPTOM: Timer increments once then stops (always shows 1)

function Timer() {
  const [count, setCount] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      // ❌ BUG: Stale closure! 'count' is captured from when effect ran
      // It always sees the initial value (0), so count never goes past 1
      setCount(count + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning])  // ❌ Missing 'count' in deps (but shouldn't add it!)

  return (
    <div className="component-box">
      <h3>Timer (Bug: Stale Closure)</h3>
      <div className="timer-display">{count}s</div>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
      <button onClick={() => setCount(0)}>Reset</button>
      <p className="info-text">
        Bug: Timer only increments to 1, then stops. Why?
      </p>
    </div>
  )
}

export default Timer


