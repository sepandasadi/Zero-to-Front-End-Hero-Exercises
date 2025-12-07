import { useState, useEffect } from 'react'

// PERFORMANCE ISSUE #3: Memory Leak - Event Listeners Not Cleaned Up
function MemoryLeakDemo() {
  const [count, setCount] = useState(0)
  const [listeners, setListeners] = useState(0)

  useEffect(() => {
    // ❌ MEMORY LEAK: Event listener added but never removed!
    const handleResize = () => {
      console.log('Window resized')
    }

    const handleScroll = () => {
      console.log('Window scrolled')
    }

    const handleClick = () => {
      console.log('Document clicked')
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll)
    document.addEventListener('click', handleClick)

    setListeners(prev => prev + 3)

    // ❌ MISSING: cleanup function!
    // return () => {
    //   window.removeEventListener('resize', handleResize)
    //   window.removeEventListener('scroll', handleScroll)
    //   document.removeEventListener('click', handleClick)
    // }
  }, [count]) // Re-runs when count changes!

  return (
    <section className="section warning">
      <h2>💧 Issue 3: Memory Leak</h2>
      <p>Click the button multiple times, then scroll/resize. Check Memory tab!</p>

      <button onClick={() => setCount(count + 1)}>
        Add Event Listeners (Count: {count})
      </button>

      <div className="metrics">
        <h3>Event Listeners Added: {listeners}</h3>
        <p>⚠️ Each click adds 3 listeners that are NEVER removed!</p>

        <h3 style={{ marginTop: '1rem' }}>How to Detect:</h3>
        <ol style={{ marginLeft: '1.5rem' }}>
          <li>Open DevTools → Memory tab</li>
          <li>Take Heap Snapshot</li>
          <li>Click button 10 times</li>
          <li>Take another Heap Snapshot</li>
          <li>Compare snapshots</li>
          <li>Look for "Detached" event listeners growing</li>
        </ol>

        <h3 style={{ marginTop: '1rem' }}>Fix:</h3>
        <p>Add cleanup function to useEffect that removes listeners</p>
      </div>

      <p className="info">
        💡 Scroll/resize the page and watch console spam. Memory grows with each click!
      </p>
    </section>
  )
}

export default MemoryLeakDemo


