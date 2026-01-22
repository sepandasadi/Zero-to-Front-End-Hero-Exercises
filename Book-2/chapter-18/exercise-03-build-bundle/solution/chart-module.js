// Chart module - another separate chunk
// Simulates a charting library

export function createChart(data) {
  const max = Math.max(...data)
  const bars = data.map((value, index) => {
    const height = (value / max) * 100
    return `
      <div class="bar-container">
        <div class="bar" style="height: ${height}px; background: hsl(${index * 60}, 70%, 50%)">
          <span class="value">${value}</span>
        </div>
        <span class="label">Item ${index + 1}</span>
      </div>
    `
  }).join('')
  
  return `
    <div class="chart-container">
      ${bars}
    </div>
  `
}

export function createLineChart(data) {
  // Simulated line chart
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100
    const y = 100 - (value / Math.max(...data)) * 100
    return `${x},${y}`
  }).join(' ')
  
  return `
    <svg width="300" height="150" viewBox="0 0 100 100">
      <polyline points="${points}" fill="none" stroke="#667eea" stroke-width="2"/>
    </svg>
  `
}

export const chartDefaults = {
  width: 300,
  height: 200,
  colors: ['#667eea', '#764ba2', '#f093fb'],
}

console.log('Chart module loaded! This is another separate chunk.')
