import { useState } from 'react'

// PERFORMANCE ISSUE #1: Long Task Blocking Main Thread
// This will show up as a red flag in Performance tab

function LongTaskDemo() {
  const [products, setProducts] = useState([])
  const [processing, setProcessing] = useState(false)

  // ❌ PERFORMANCE ISSUE: Synchronous heavy computation blocks UI
  const processProducts = () => {
    setProcessing(true)

    // Simulate expensive computation - blocks main thread!
    const startTime = performance.now()
    const result = []

    for (let i = 0; i < 10000; i++) {
      // Expensive calculation
      result.push({
        id: i,
        name: `Product ${i}`,
        price: Math.floor(Math.random() * 100) + 10,
        // Expensive: JSON parse/stringify simulation
        computed: JSON.parse(JSON.stringify({ value: i * 2 }))
      })
    }

    const endTime = performance.now()
    console.log(`Processing took ${endTime - startTime}ms (blocking!)`)

    setProducts(result)
    setProcessing(false)
  }

  return (
    <section className="section warning">
      <h2>🐌 Issue 1: Long Task (UI Freeze)</h2>
      <p>Click the button and try to interact with the page - it will freeze!</p>

      <button onClick={processProducts} disabled={processing}>
        {processing ? 'Processing...' : 'Load 10,000 Products (SLOW!)'}
      </button>

      <p className="info">
        💡 Open Performance tab, record, then click button. Look for red flags (long tasks).
      </p>

      <div className="metrics">
        <h3>Loaded: {products.length} products</h3>
        <p>Expected: Should not freeze UI</p>
        <p>Actual: UI freezes for ~800-1000ms</p>
        <p>Fix: Split into chunks with requestIdleCallback or use Web Worker</p>
      </div>
    </section>
  )
}

export default LongTaskDemo


