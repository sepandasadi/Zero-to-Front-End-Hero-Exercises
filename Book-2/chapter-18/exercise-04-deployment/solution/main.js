import './style.css'

// Environment detection
const env = import.meta.env

console.log('🚀 App initialized in', env.MODE, 'mode')

// Display environment information
const envDisplay = document.querySelector('#env-display')
envDisplay.innerHTML = `
  <div class="env-card">
    <p><strong>Mode:</strong> <span class="badge ${env.MODE}">${env.MODE}</span></p>
    <p><strong>Base URL:</strong> ${env.BASE_URL}</p>
    ${env.VITE_API_URL ? `<p><strong>API URL:</strong> ${env.VITE_API_URL}</p>` : ''}
    ${env.VITE_APP_TITLE ? `<p><strong>App Title:</strong> ${env.VITE_APP_TITLE}</p>` : ''}
    <p class="note">
      ${env.MODE === 'production' 
        ? '✅ Running in production mode with optimizations' 
        : '🔧 Running in development mode'}
    </p>
  </div>
`

// Deployment verification
const checklist = document.querySelector('#checklist')
const checks = [
  { text: 'Production build created', status: env.MODE === 'production' },
  { text: 'Environment variables configured', status: !!env.VITE_API_URL },
  { text: 'Assets optimized', status: env.MODE === 'production' },
  { text: 'HTTPS enabled', status: window.location.protocol === 'https:' },
  { text: 'Deployed successfully', status: env.MODE === 'production' },
]

checklist.innerHTML = checks.map(check => `
  <li class="${check.status ? 'completed' : 'pending'}">
    <span class="check-icon">${check.status ? '✅' : '⏳'}</span>
    ${check.text}
  </li>
`).join('')

// Analytics placeholder (would integrate real analytics in production)
if (env.MODE === 'production') {
  console.log('📊 Analytics would be tracked here')
  // Example: Google Analytics, Plausible, etc.
}

// Error tracking placeholder
if (env.MODE === 'production') {
  window.addEventListener('error', (event) => {
    console.error('Production error caught:', event.error)
    // In real app: Send to error tracking service (Sentry, etc.)
  })
}

// Service Worker registration (PWA - optional)
if (env.MODE === 'production' && 'serviceWorker' in navigator) {
  console.log('Service Worker support detected (PWA ready)')
  // navigator.serviceWorker.register('/sw.js')
}

console.log('✅ App fully initialized and running!')
