import './style.css'
import { greet } from './utils.js'

console.log('✅ Webpack app loaded!');

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app');
  
  app.innerHTML = `
    <div class="container">
      <h1>🎯 Webpack Configured Successfully!</h1>
      <p>${greet('Webpack Developer')}</p>
      
      <div class="info-box">
        <h3>What Webpack Did:</h3>
        <ul>
          <li>✅ Bundled JavaScript modules</li>
          <li>✅ Processed CSS with loaders</li>
          <li>✅ Generated HTML with plugin</li>
          <li>✅ Created optimized output in dist/</li>
          <li>✅ Added hot module replacement</li>
        </ul>
      </div>

      <div class="comparison">
        <h3>Webpack vs Vite</h3>
        <div class="compare-grid">
          <div class="compare-item">
            <h4>Webpack</h4>
            <p>✅ Mature and battle-tested</p>
            <p>✅ Highly configurable</p>
            <p>✅ Huge plugin ecosystem</p>
            <p>⚠️ More complex configuration</p>
            <p>⚠️ Slower build times</p>
          </div>
          <div class="compare-item">
            <h4>Vite</h4>
            <p>✅ Lightning fast HMR</p>
            <p>✅ Minimal configuration</p>
            <p>✅ Modern ES modules</p>
            <p>✅ Better DX (developer experience)</p>
            <p>⚠️ Newer, smaller ecosystem</p>
          </div>
        </div>
      </div>

      <button id="test-hmr">Test HMR (Check Console)</button>
    </div>
  `;

  // HMR test button
  document.querySelector('#test-hmr').addEventListener('click', () => {
    console.log('HMR test - edit this file to see changes without refresh!');
  });
});

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept(() => {
    console.log('🔥 HMR: Module updated!');
  });
}
