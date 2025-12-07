import { useState, useEffect } from 'react'

// BUG #4: Memory Leak - Event Listener Not Removed
// SYMPTOM: Performance degrades, memory increases over time

function WindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    // ❌ BUG: Event listener added but never removed!
    // Each time component re-renders, a new listener is added
    window.addEventListener('resize', handleResize)

    // ❌ MISSING: return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="component-box">
      <h3>Window Size (Bug: Memory Leak)</h3>
      <p>Width: {size.width}px</p>
      <p>Height: {size.height}px</p>
      <p className="info-text">
        Bug: Resize your window multiple times. Event listeners pile up (memory leak)!
      </p>
    </div>
  )
}

export default WindowSize


