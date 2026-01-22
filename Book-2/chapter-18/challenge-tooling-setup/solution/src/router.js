class Router {
  constructor() {
    this.routes = {}
    this.currentRoute = null
    this.listeners = {}
  }

  // Register a route with lazy loading
  register(path, loader) {
    this.routes[path] = loader
  }

  // Navigate to a route
  async navigate(path) {
    if (!this.routes[path]) {
      path = '/404'
    }

    this.currentRoute = path
    window.location.hash = path

    const app = document.querySelector('#app')
    app.innerHTML = '<div class="loading">Loading...</div>'

    try {
      // Lazy load the page module
      const pageModule = await this.routes[path]()
      app.innerHTML = pageModule.default()

      // Execute page-specific logic if exists
      if (pageModule.init) {
        pageModule.init()
      }

      this.emit('route-changed', path)
    } catch (error) {
      console.error('Route loading error:', error)
      app.innerHTML = '<div class="error">Failed to load page</div>'
    }
  }

  // Simple event emitter
  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event].push(callback)
  }

  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((cb) => cb(data))
    }
  }
}

export const router = new Router()

// Register routes with dynamic imports (code splitting!)
router.register('/', () => import('./pages/home.js'))
router.register('/about', () => import('./pages/about.js'))
router.register('/dashboard', () => import('./pages/dashboard.js'))
router.register('/404', () => import('./pages/404.js'))
