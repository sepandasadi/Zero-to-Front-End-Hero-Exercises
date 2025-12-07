import { useState } from 'react'

// PERFORMANCE ISSUE #4: Large Bundle - Everything Imported Upfront
// In a real app, these would be heavy libraries like moment.js, lodash, etc.

// Simulating heavy imports (in real app, these would be actual libraries)
const heavyLibrary1 = { size: '50KB', methods: Array.from({ length: 100 }, (_, i) => `method${i}`) }
const heavyLibrary2 = { size: '75KB', methods: Array.from({ length: 150 }, (_, i) => `method${i}`) }
const heavyLibrary3 = { size: '100KB', methods: Array.from({ length: 200 }, (_, i) => `method${i}`) }

function HeavyBundleDemo() {
  const [showData, setShowData] = useState(false)

  return (
    <section className="section">
      <h2>📦 Issue 4: Large Bundle Size</h2>
      <p>All heavy libraries loaded upfront, even if never used!</p>

      <button onClick={() => setShowData(!showData)}>
        {showData ? 'Hide' : 'Show'} Heavy Data
      </button>

      {showData && (
        <div className="metrics">
          <h3>Loaded Libraries (upfront):</h3>
          <p>Library 1: {heavyLibrary1.size} - {heavyLibrary1.methods.length} methods</p>
          <p>Library 2: {heavyLibrary2.size} - {heavyLibrary2.methods.length} methods</p>
          <p>Library 3: {heavyLibrary3.size} - {heavyLibrary3.methods.length} methods</p>
        </div>
      )}

      <div className="metrics">
        <h3>How to Detect:</h3>
        <ol style={{ marginLeft: '1.5rem' }}>
          <li>Open DevTools → Network tab</li>
          <li>Reload page</li>
          <li>Look for main JavaScript bundle</li>
          <li>Check size (should be under 200KB, might be 500KB+)</li>
          <li>Check "Coverage" tab to see unused code</li>
        </ol>

        <h3 style={{ marginTop: '1rem' }}>Fixes:</h3>
        <ol style={{ marginLeft: '1.5rem' }}>
          <li><strong>Code Splitting:</strong> Use React.lazy() for heavy components</li>
          <li><strong>Tree Shaking:</strong> Import only what you need</li>
          <li><strong>Dynamic Imports:</strong> Load on demand</li>
          <li><strong>Analyze Bundle:</strong> Use vite-bundle-visualizer</li>
        </ol>

        <p className="info">
          💡 In production, use lighthouse to audit bundle size
        </p>
      </div>
    </section>
  )
}

export default HeavyBundleDemo


