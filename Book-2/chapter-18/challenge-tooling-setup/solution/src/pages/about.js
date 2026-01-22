export default function () {
  return `
    <div class="page about-page">
      <h1>📖 About This Project</h1>
      
      <div class="content-section">
        <h2>Architecture</h2>
        <p>This application demonstrates a production-ready setup with:</p>
        <ul>
          <li><strong>Routing:</strong> Custom hash-based router with lazy loading</li>
          <li><strong>State:</strong> Simple state management pattern</li>
          <li><strong>Build:</strong> Optimized Vite configuration</li>
          <li><strong>Quality:</strong> ESLint + Prettier + pre-commit hooks</li>
        </ul>
      </div>

      <div class="content-section">
        <h2>Technologies Used</h2>
        <div class="tech-grid">
          <div class="tech-item">Vite 5</div>
          <div class="tech-item">ESLint</div>
          <div class="tech-item">Prettier</div>
          <div class="tech-item">Husky</div>
          <div class="tech-item">Rollup</div>
          <div class="tech-item">Modern JS</div>
        </div>
      </div>

      <div class="content-section">
        <h2>Performance</h2>
        <p>Optimizations applied:</p>
        <ul>
          <li>Code splitting per route</li>
          <li>Manual chunk configuration</li>
          <li>Compression (gzip + brotli)</li>
          <li>Lazy loading for pages</li>
          <li>Optimized asset handling</li>
        </ul>
      </div>
    </div>
  `
}
