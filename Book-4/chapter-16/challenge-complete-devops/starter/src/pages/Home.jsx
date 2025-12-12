export default function Home() {
  return (
    <div className="page">
      <div className="hero">
        <h1>Welcome to the DevOps Challenge</h1>
        <p className="subtitle">Build a production-ready deployment pipeline from scratch</p>
      </div>

      <div className="card">
        <h2>🎯 Your Mission</h2>
        <p>Transform this basic React app into a fully automated, production-ready system with:</p>
        <ul>
          <li>Modern build optimization (< 200KB bundle)</li>
          <li>Complete CI/CD automation</li>
          <li>Docker containerization (< 30MB image)</li>
          <li>Error monitoring and observability</li>
          <li>Professional documentation</li>
        </ul>
      </div>

      <div className="card">
        <h2>📚 What You'll Build</h2>
        <div className="features-grid">
          <div className="feature">
            <h3>⚡ Build Tools</h3>
            <p>Vite configuration with code splitting, environment management, and bundle optimization</p>
          </div>
          <div className="feature">
            <h3>🚀 CI/CD Pipeline</h3>
            <p>GitHub Actions workflows for automated testing, building, and deployment</p>
          </div>
          <div className="feature">
            <h3>🐳 Docker</h3>
            <p>Multi-stage builds, nginx configuration, and container orchestration</p>
          </div>
          <div className="feature">
            <h3>📊 Monitoring</h3>
            <p>Sentry for errors, Web Vitals for performance, comprehensive dashboards</p>
          </div>
        </div>
      </div>

      <div className="cta">
        <h2>Ready to Start?</h2>
        <p>Follow the GETTING_STARTED.md guide to begin your journey!</p>
        <button className="btn btn-primary">Get Started →</button>
      </div>
    </div>
  );
}

