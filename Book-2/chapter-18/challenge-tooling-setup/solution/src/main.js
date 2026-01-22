import './style.css'
import { router } from './router.js'
import { initNavigation } from './components/navigation.js'
import { initFooter } from './components/footer.js'
import { trackPageView } from './utils.js'

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  console.log(`🚀 App starting in ${import.meta.env.MODE} mode`)
  console.log(`📍 API URL: ${import.meta.env.VITE_API_URL}`)

  // Initialize navigation
  initNavigation()

  // Initialize footer
  initFooter()

  // Handle route changes
  router.on('route-changed', (route) => {
    console.log(`📄 Navigated to: ${route}`)
    trackPageView(route)
  })

  // Load initial route
  router.navigate(window.location.hash.slice(1) || '/')

  // Handle browser back/forward
  window.addEventListener('hashchange', () => {
    router.navigate(window.location.hash.slice(1))
  })
})

// Performance monitoring
if (import.meta.env.PROD) {
  window.addEventListener('load', () => {
    const perfData = window.performance.timing
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart
    console.log(`⚡ Page load time: ${pageLoadTime}ms`)
  })
}

console.log('✅ App initialized successfully')
