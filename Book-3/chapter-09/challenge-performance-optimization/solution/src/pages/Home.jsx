// ✅ Optimized Home page
import { format } from 'date-fns';
import capitalize from 'lodash/capitalize';

export default function Home() {
  const currentDate = format(new Date(), 'MMMM do yyyy');
  const greeting = capitalize('welcome to our store!');

  return (
    <div className="page">
      {/* ✅ Hero with optimized image */}
      <div className="hero" style={{ aspectRatio: '2 / 1' }}>
        <picture>
          <source srcSet="https://via.placeholder.com/1200x600.webp" type="image/webp" />
          <img
            src="https://via.placeholder.com/1200x600"
            alt="Hero banner"
            width="1200"
            height="600"
            fetchpriority="high"
            style={{ width: '100%', height: 'auto' }}
          />
        </picture>
        <div className="hero-content">
          <h1>{greeting}</h1>
          <p>Today: {currentDate}</p>
          <button className="cta-button">Shop Now</button>
        </div>
      </div>

      <section className="optimizations">
        <h2>⚡ Performance Optimizations Applied</h2>
        <div className="optimization-grid">
          <div className="optimization-card">
            <h3>📦 Bundle Size</h3>
            <p>❌ Before: ~330 KB</p>
            <p>✅ After: ~45 KB</p>
            <p className="improvement">87% reduction!</p>
          </div>

          <div className="optimization-card">
            <h3>🚀 Load Time</h3>
            <p>❌ Before: 4.8s</p>
            <p>✅ After: 1.2s</p>
            <p className="improvement">75% faster!</p>
          </div>

          <div className="optimization-card">
            <h3>🟢 Lighthouse</h3>
            <p>❌ Before: 42</p>
            <p>✅ After: 96</p>
            <p className="improvement">+54 points!</p>
          </div>

          <div className="optimization-card">
            <h3>📊 Web Vitals</h3>
            <p>✅ LCP: 1.4s (green)</p>
            <p>✅ INP: 98ms (green)</p>
            <p>✅ CLS: 0.01 (green)</p>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>What We Did</h2>
        <div className="feature-list">
          <div className="feature-item">
            <h3>✅ 1. Image Optimization</h3>
            <ul>
              <li>Converted to WebP format</li>
              <li>Added width/height attributes</li>
              <li>Lazy loading for below-fold images</li>
              <li>Preload for LCP image</li>
            </ul>
          </div>

          <div className="feature-item">
            <h3>✅ 2. Code Splitting</h3>
            <ul>
              <li>React.lazy() for all routes</li>
              <li>Suspense boundaries</li>
              <li>Manual chunks for vendors</li>
              <li>Lazy load chart library</li>
            </ul>
          </div>

          <div className="feature-item">
            <h3>✅ 3. Library Optimization</h3>
            <ul>
              <li>Replaced moment.js (230 KB) with date-fns (13 KB)</li>
              <li>Tree-shakeable lodash imports</li>
              <li>Removed unused dependencies</li>
            </ul>
          </div>

          <div className="feature-item">
            <h3>✅ 4. Performance Budget</h3>
            <ul>
              <li>Set strict budget limits</li>
              <li>Lighthouse CI enforcement</li>
              <li>Bundle analyzer checks</li>
            </ul>
          </div>

          <div className="feature-item">
            <h3>✅ 5. Caching Strategy</h3>
            <ul>
              <li>Content hashing for cache busting</li>
              <li>Aggressive cache headers</li>
              <li>CDN deployment</li>
              <li>Service Worker for offline</li>
            </ul>
          </div>

          <div className="feature-item">
            <h3>✅ 6. Core Web Vitals</h3>
            <ul>
              <li>Optimized LCP with preload</li>
              <li>Debounced inputs for INP</li>
              <li>Fixed CLS with dimensions</li>
              <li>Web Vitals tracking</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

