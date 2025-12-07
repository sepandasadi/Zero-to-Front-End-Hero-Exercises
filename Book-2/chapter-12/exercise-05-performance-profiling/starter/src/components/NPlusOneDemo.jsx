import { useState } from 'react'

// ❌ Component that logs every render
function ListItem({ item, index }) {
  console.log(`ListItem ${index} rendered`)

  return (
    <div className="list-item">
      <h4>{item.name}</h4>
      <p>Price: ${item.price}</p>
    </div>
  )
}

// PERFORMANCE ISSUE #5: N+1 Rendering Problem
function NPlusOneDemo() {
  const [items, setItems] = useState([])

  // ❌ ISSUE: Adding items one by one causes N separate renders
  const loadItemsSlowly = () => {
    console.log('Loading items one by one...')

    // Clear first
    setItems([])

    // Add items one at a time - causes N state updates!
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const newItem = {
          id: i,
          name: `Product ${i}`,
          price: Math.floor(Math.random() * 100) + 10
        }

        // ❌ Each setState triggers a re-render!
        setItems(prev => [...prev, newItem])
      }, i * 100) // Stagger to see effect
    }
  }

  return (
    <section className="section">
      <h2>➕ Issue 5: N+1 Rendering</h2>
      <p>Watch console - each item added triggers a separate render!</p>

      <button onClick={loadItemsSlowly}>
        Load Items (One by One - SLOW!)
      </button>

      <button onClick={() => setItems([])}>
        Clear
      </button>

      <div style={{ marginTop: '1rem', maxHeight: '300px', overflowY: 'auto' }}>
        {items.map((item, index) => (
          <ListItem key={item.id} item={item} index={index} />
        ))}
      </div>

      <div className="metrics">
        <h3>Problem:</h3>
        <p>Adding 20 items = 20 separate renders = slow!</p>

        <h3 style={{ marginTop: '1rem' }}>How to Detect:</h3>
        <ol style={{ marginLeft: '1.5rem' }}>
          <li>Open React DevTools → Profiler</li>
          <li>Record</li>
          <li>Click "Load Items"</li>
          <li>Stop recording</li>
          <li>See 20 separate render commits in timeline</li>
        </ol>

        <h3 style={{ marginTop: '1rem' }}>Fixes:</h3>
        <ol style={{ marginLeft: '1.5rem' }}>
          <li><strong>Batch Updates:</strong> Wait for all data, then setState once</li>
          <li><strong>React 18:</strong> Automatic batching helps</li>
          <li><strong>Virtual Scrolling:</strong> For very long lists (react-window)</li>
        </ol>
      </div>
    </section>
  )
}

export default NPlusOneDemo


