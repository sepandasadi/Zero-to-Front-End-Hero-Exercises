import { useState, useEffect } from 'react'

// BUG #5: Memory Leak - setInterval Not Cleared
// SYMPTOM: Multiple intervals running, clock speeds up

function Clock() {
  const [time, setTime] = useState(new Date())
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (isRunning) {
      // ❌ BUG: Interval created but never cleared!
      // Each time isRunning changes, a new interval is created
      setInterval(() => {
        setTime(new Date())
      }, 1000)

      // ❌ MISSING: return () => clearInterval(intervalId)
    }
  }, [isRunning])

  return (
    <div className="component-box">
      <h3>Clock (Bug: Interval Leak)</h3>
      <div className="timer-display">
        {time.toLocaleTimeString()}
      </div>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
      <p className="info-text">
        Bug: Toggle start/stop multiple times. Clock speeds up (multiple intervals)!
      </p>
    </div>
  )
}

export default Clock


