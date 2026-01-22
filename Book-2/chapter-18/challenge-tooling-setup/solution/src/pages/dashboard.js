import { config } from '../utils.js'

export default function () {
  return `
    <div class="page dashboard-page">
      <h1>📊 Dashboard</h1>
      
      <div class="dashboard-grid">
        <div class="dashboard-card">
          <h3>Environment</h3>
          <p class="stat">${config.mode}</p>
        </div>
        
        <div class="dashboard-card">
          <h3>API Endpoint</h3>
          <p class="stat-small">${config.apiUrl}</p>
        </div>
        
        <div class="dashboard-card">
          <h3>Dev Mode</h3>
          <p class="stat">${config.isDev ? 'Yes' : 'No'}</p>
        </div>
        
        <div class="dashboard-card">
          <h3>Analytics</h3>
          <p class="stat">${import.meta.env.VITE_ENABLE_ANALYTICS === 'true' ? 'Enabled' : 'Disabled'}</p>
        </div>
      </div>

      <div class="content-section">
        <h2>Performance Metrics</h2>
        <div id="performance-data">
          <p>Loading performance data...</p>
        </div>
      </div>

      <div class="content-section">
        <h2>Build Information</h2>
        <ul>
          <li><strong>Mode:</strong> ${import.meta.env.MODE}</li>
          <li><strong>Base URL:</strong> ${import.meta.env.BASE_URL}</li>
          <li><strong>Production:</strong> ${import.meta.env.PROD}</li>
        </ul>
      </div>
    </div>
  `
}

export function init() {
  // Page-specific initialization
  setTimeout(() => {
    const perfDiv = document.querySelector('#performance-data')
    if (perfDiv && window.performance) {
      const perfData = window.performance.timing
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart

      perfDiv.innerHTML = `
        <div class="perf-metrics">
          <p><strong>Page Load Time:</strong> ${pageLoadTime}ms</p>
          <p><strong>DOM Content Loaded:</strong> ${perfData.domContentLoadedEventEnd - perfData.navigationStart}ms</p>
          <p class="note">These metrics show the initial page load performance.</p>
        </div>
      `
    }
  }, 100)
}
