import { useState } from 'react'

// Child component WITHOUT memo - re-renders every time parent updates
function ExpensiveChild({ data }) {
  console.log('ExpensiveChild rendered!')

  // Simulate expensive render
  let sum = 0
  for (let i = 0; i < 100000; i++) {
    sum += i
  }

  return (
    <div className="list-item">
      <h4>Expensive Component</h4>
      <p>Data: {data}</p>
      <p>Computation result: {sum}</p>
      <p style={{ color: '#fc466b', fontSize: '0.85rem' }}>
        ⚠️ This component re-renders even when its props don't change!
      </p>
    </div>
  )
}

// PERFORMANCE ISSUE #2: Unnecessary Re-renders
function UnnecessaryRenders() {
  const [count, setCount] = useState(0)
  const [text, setText] = useState('')

  return (
    <section className="section">
      <h2>🔄 Issue 2: Unnecessary Re-renders</h2>
      <p>Type in the input - watch console. ExpensiveChild renders on every keystroke!</p>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type here..."
        />
        <button onClick={() => setCount(count + 1)}>
          Count: {count}
        </button>
      </div>

      {/* ❌ ISSUE: This re-renders even when 'data' prop hasn't changed */}
      <ExpensiveChild data="Static data - never changes" />

      <div className="metrics">
        <h3>Debugging Steps:</h3>
        <ol style={{ marginLeft: '1.5rem' }}>
          <li>Open React DevTools → Profiler</li>
          <li>Click ⏺️ Record</li>
          <li>Type in the input above</li>
          <li>Stop recording</li>
          <li>See ExpensiveChild in flamegraph (it renders every keystroke!)</li>
          <li>Fix: Wrap ExpensiveChild with React.memo()</li>
        </ol>
      </div>
    </section>
  )
}

export default UnnecessaryRenders


