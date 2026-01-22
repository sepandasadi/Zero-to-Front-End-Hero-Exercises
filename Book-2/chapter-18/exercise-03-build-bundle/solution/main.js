import './style.css'

const output = document.querySelector('#output')
const stats = document.querySelector('#stats')

// Track loaded modules
const loadedModules = new Set()

// Dynamic import for heavy module (code splitting)
document.querySelector('#load-module').addEventListener('click', async () => {
  output.innerHTML = '<p class="loading">⏳ Loading heavy module...</p>'
  
  try {
    const startTime = performance.now()
    
    // This creates a separate chunk that's only loaded when needed
    const { processData, analyzeData } = await import('./heavy-module.js')
    
    const loadTime = (performance.now() - startTime).toFixed(2)
    
    const result = processData([1, 2, 3, 4, 5])
    const analysis = analyzeData(result)
    
    output.innerHTML = `
      <div class="success">
        <h3>✅ Heavy Module Loaded</h3>
        <p><strong>Load time:</strong> ${loadTime}ms</p>
        <p><strong>Result:</strong> ${JSON.stringify(result)}</p>
        <p><strong>Analysis:</strong> ${JSON.stringify(analysis)}</p>
        <p class="note">This module was loaded dynamically and is in a separate chunk!</p>
      </div>
    `
    
    loadedModules.add('heavy-module')
  } catch (error) {
    output.innerHTML = `<p class="error">❌ Error: ${error.message}</p>`
  }
})

// Dynamic import for chart module
document.querySelector('#load-chart').addEventListener('click', async () => {
  output.innerHTML = '<p class="loading">⏳ Loading chart module...</p>'
  
  try {
    const startTime = performance.now()
    
    // Another separate chunk
    const { createChart } = await import('./chart-module.js')
    
    const loadTime = (performance.now() - startTime).toFixed(2)
    
    const chartData = createChart([10, 25, 15, 40, 30])
    
    output.innerHTML = `
      <div class="success">
        <h3>📊 Chart Module Loaded</h3>
        <p><strong>Load time:</strong> ${loadTime}ms</p>
        <div class="chart">${chartData}</div>
        <p class="note">This is also a separate chunk, loaded on demand!</p>
      </div>
    `
    
    loadedModules.add('chart-module')
  } catch (error) {
    output.innerHTML = `<p class="error">❌ Error: ${error.message}</p>`
  }
})

// Show bundle statistics
document.querySelector('#show-stats').addEventListener('click', () => {
  stats.innerHTML = `
    <div class="stats-box">
      <h3>📊 Bundle Statistics</h3>
      <ul>
        <li>Main bundle: Always loaded (small)</li>
        <li>Heavy module: ${loadedModules.has('heavy-module') ? '✅ Loaded' : '⬜ Not loaded yet'}</li>
        <li>Chart module: ${loadedModules.has('chart-module') ? '✅ Loaded' : '⬜ Not loaded yet'}</li>
      </ul>
      <p class="note">
        Run <code>npm run build</code> to see actual chunk sizes in dist/ folder.
        Check dist/stats.html for visual bundle analysis!
      </p>
    </div>
  `
})

console.log('✅ Main app loaded (small bundle)')
console.log('Heavy modules will be loaded dynamically when needed')
