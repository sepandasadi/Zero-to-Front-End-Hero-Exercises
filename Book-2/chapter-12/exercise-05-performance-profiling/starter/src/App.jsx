import { useState } from 'react'
import LongTaskDemo from './components/LongTaskDemo'
import UnnecessaryRenders from './components/UnnecessaryRenders'
import MemoryLeakDemo from './components/MemoryLeakDemo'
import HeavyBundleDemo from './components/HeavyBundleDemo'
import NPlusOneDemo from './components/NPlusOneDemo'
import UnoptimizedImages from './components/UnoptimizedImages'
import './App.css'

function App() {
  const [activeDemo, setActiveDemo] = useState(null)

  return (
    <div className="app">
      <header className="header">
        <h1>⚡ Performance Profiling Lab</h1>
        <p>Find and fix 6 performance bottlenecks!</p>
        <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
          F12 → Performance tab → Record → Interact → Stop → Analyze
        </p>
      </header>

      <main className="main">
        <section className="section">
          <h2>Select Performance Issue to Debug:</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
            <button onClick={() => setActiveDemo('long-task')}>
              Issue 1: Long Task
            </button>
            <button onClick={() => setActiveDemo('renders')}>
              Issue 2: Unnecessary Renders
            </button>
            <button onClick={() => setActiveDemo('memory')}>
              Issue 3: Memory Leak
            </button>
            <button onClick={() => setActiveDemo('bundle')}>
              Issue 4: Large Bundle
            </button>
            <button onClick={() => setActiveDemo('nplus1')}>
              Issue 5: N+1 Rendering
            </button>
            <button onClick={() => setActiveDemo('images')}>
              Issue 6: Unoptimized Images
            </button>
            <button onClick={() => setActiveDemo(null)} style={{
              background: '#6c757d'
            }}>
              Clear
            </button>
          </div>
        </section>

        {activeDemo === 'long-task' && <LongTaskDemo />}
        {activeDemo === 'renders' && <UnnecessaryRenders />}
        {activeDemo === 'memory' && <MemoryLeakDemo />}
        {activeDemo === 'bundle' && <HeavyBundleDemo />}
        {activeDemo === 'nplus1' && <NPlusOneDemo />}
        {activeDemo === 'images' && <UnoptimizedImages />}

        {!activeDemo && (
          <section className="section">
            <h2>Instructions:</h2>
            <ol style={{ marginLeft: '1.5rem', lineHeight: '2' }}>
              <li>Click a demo button above to activate an issue</li>
              <li>Open Performance tab (F12 → Performance)</li>
              <li>Click ⏺️ Record</li>
              <li>Interact with the demo</li>
              <li>Click ⏹️ Stop recording</li>
              <li>Analyze the performance profile</li>
              <li>Identify the bottleneck</li>
              <li>Fix the code</li>
              <li>Re-test to verify improvement</li>
            </ol>
            <p className="info">
              💡 Tip: Also open React DevTools → Profiler for React-specific issues
            </p>
          </section>
        )}
      </main>
    </div>
  )
}

export default App


