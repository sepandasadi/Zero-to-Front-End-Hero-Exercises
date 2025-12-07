import { useState } from 'react'

// BUG #1: Infinite Re-render Loop
// SYMPTOM: Page freezes, "Maximum update depth exceeded" error

function Counter() {
  const [count, setCount] = useState(0)

  // ❌ BUG: setState called during render causes infinite loop!
  setCount(count + 1)

  return (
    <div className="component-box">
      <h3>Counter: {count}</h3>
      <p className="error-text">This causes infinite re-renders!</p>
    </div>
  )
}

export default Counter


