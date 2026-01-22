export default function () {
  return `
    <div class="page home-page">
      <header class="hero">
        <h1>🚀 Welcome to the Full Tooling Challenge!</h1>
        <p class="subtitle">A production-ready Vite application with modern tooling</p>
      </header>

      <section class="features">
        <div class="feature-card">
          <span class="icon">⚡</span>
          <h3>Lightning Fast</h3>
          <p>Vite's HMR provides instant feedback</p>
        </div>
        <div class="feature-card">
          <span class="icon">📦</span>
          <h3>Optimized Bundles</h3>
          <p>Code splitting and tree shaking</p>
        </div>
        <div class="feature-card">
          <span class="icon">🔧</span>
          <h3>Modern Tooling</h3>
          <p>ESLint, Prettier, Husky</p>
        </div>
        <div class="feature-card">
          <span class="icon">🚀</span>
          <h3>Auto Deploy</h3>
          <p>CI/CD with Netlify/Vercel</p>
        </div>
      </section>

      <section class="info">
        <h2>✅ Features Implemented</h2>
        <ul>
          <li>Multi-page routing with code splitting</li>
          <li>Multiple environments (dev, staging, prod)</li>
          <li>ESLint + Prettier for code quality</li>
          <li>Husky + lint-staged for pre-commit checks</li>
          <li>Gzip & Brotli compression</li>
          <li>Bundle analysis tools</li>
          <li>Performance monitoring</li>
          <li>Deployment-ready configuration</li>
        </ul>
      </section>
    </div>
  `
}
