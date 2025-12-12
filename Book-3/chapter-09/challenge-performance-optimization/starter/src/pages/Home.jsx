// Home page with performance issues
import moment from 'moment';
import _ from 'lodash';

export default function Home() {
  // ❌ Using full moment.js (230 KB)
  const currentDate = moment().format('MMMM Do YYYY');

  // ❌ Using full lodash (71 KB)
  const greeting = _.capitalize('welcome to our store!');

  return (
    <div className="page">
      {/* ❌ Large unoptimized image without dimensions */}
      <div className="hero">
        <img
          src="https://via.placeholder.com/1200x600/667eea/ffffff?text=Hero+Image"
          alt="Hero"
        />
        <div className="hero-content">
          <h1>{greeting}</h1>
          <p>Today: {currentDate}</p>
          <button className="cta-button">Shop Now</button>
        </div>
      </div>

      <section className="features">
        <h2>Why Shop With Us?</h2>
        <div className="feature-grid">
          {/* ❌ More unoptimized images without lazy loading */}
          <div className="feature">
            <img src="https://via.placeholder.com/400x300" alt="Feature 1" />
            <h3>Fast Shipping</h3>
            <p>Get your products in 2-3 days</p>
          </div>
          <div className="feature">
            <img src="https://via.placeholder.com/400x300" alt="Feature 2" />
            <h3>Quality Products</h3>
            <p>Only the best for our customers</p>
          </div>
          <div className="feature">
            <img src="https://via.placeholder.com/400x300" alt="Feature 3" />
            <h3>24/7 Support</h3>
            <p>We're always here to help</p>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <h2>What Our Customers Say</h2>
        {_.times(6, (i) => (
          <div key={i} className="testimonial">
            <img src={`https://via.placeholder.com/100`} alt={`Customer ${i}`} />
            <p>"Great products and service!"</p>
            <p className="author">- Customer {i + 1}</p>
          </div>
        ))}
      </section>

      <div className="info-box warning">
        <h3>⚠️ Performance Issues in This App</h3>
        <ul>
          <li>❌ Large images (3+ MB total)</li>
          <li>❌ No image optimization (using placeholders, not WebP/AVIF)</li>
          <li>❌ No lazy loading</li>
          <li>❌ Heavy libraries (moment.js, lodash)</li>
          <li>❌ No code splitting</li>
          <li>❌ Images without width/height (CLS issues)</li>
          <li>❌ No caching headers</li>
          <li>❌ Expected Lighthouse score: ~40</li>
        </ul>
      </div>
    </div>
  );
}

