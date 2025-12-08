export default function About() {
  return (
    <div className="page">
      <h1>About This Challenge</h1>

      <div className="card">
        <h2>🎓 What You'll Learn</h2>
        <p>This challenge combines everything from the chapter exercises into one comprehensive project:</p>

        <h3>Phase 1: Build Configuration</h3>
        <ul>
          <li>Configure Vite for production builds</li>
          <li>Set up code splitting (vendor, router, utils)</li>
          <li>Manage environment variables</li>
          <li>Optimize bundle size</li>
          <li>Generate source maps</li>
        </ul>

        <h3>Phase 2: Testing & Quality</h3>
        <ul>
          <li>Set up Vitest for unit testing</li>
          <li>Configure ESLint and Prettier</li>
          <li>Write component tests</li>
          <li>Add coverage reporting</li>
        </ul>

        <h3>Phase 3: CI/CD Pipeline</h3>
        <ul>
          <li>Create GitHub Actions workflows</li>
          <li>Automate testing and linting</li>
          <li>Set up staging and production deployments</li>
          <li>Configure approval gates</li>
          <li>Add notifications</li>
        </ul>

        <h3>Phase 4: Containerization</h3>
        <ul>
          <li>Write multi-stage Dockerfile</li>
          <li>Configure nginx for SPAs</li>
          <li>Optimize image size</li>
          <li>Set up docker-compose</li>
          <li>Implement health checks</li>
        </ul>

        <h3>Phase 5: Monitoring</h3>
        <ul>
          <li>Integrate Sentry for error tracking</li>
          <li>Track Web Vitals for performance</li>
          <li>Upload source maps</li>
          <li>Set up alerts</li>
        </ul>

        <h3>Phase 6: Documentation</h3>
        <ul>
          <li>Write deployment runbooks</li>
          <li>Create rollback procedures</li>
          <li>Document architecture</li>
          <li>Build troubleshooting guides</li>
        </ul>
      </div>

      <div className="card">
        <h2>⏱️ Timeline</h2>
        <p><strong>Estimated Duration:</strong> 10-12 hours</p>
        <ul>
          <li>Day 1: Project setup + Build configuration (3-4 hours)</li>
          <li>Day 2: CI/CD pipelines (3-4 hours)</li>
          <li>Day 3: Docker + Monitoring + Documentation (3-4 hours)</li>
        </ul>
      </div>

      <div className="card">
        <h2>✅ Success Criteria</h2>
        <ul>
          <li>Bundle size < 200KB (gzipped)</li>
          <li>Docker image < 30MB</li>
          <li>CI pipeline runs in < 5 minutes</li>
          <li>Zero-downtime deployments</li>
          <li>Error tracking configured</li>
          <li>Complete documentation</li>
        </ul>
      </div>
    </div>
  );
}

