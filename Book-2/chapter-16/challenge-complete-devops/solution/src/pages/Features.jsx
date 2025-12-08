import { useState } from 'react';

export default function Features() {
  const [selectedPhase, setSelectedPhase] = useState('build');
  
  const phases = {
    build: {
      title: 'Build Optimization',
      icon: '⚡',
      features: [
        'Code splitting for optimal loading',
        'Environment-specific configurations',
        'Bundle size < 200KB (gzipped)',
        'Source maps for debugging',
        'Automatic tree shaking'
      ],
      metrics: {
        bundleSize: '185KB',
        buildTime: '2-3 min',
        chunks: '4 chunks'
      }
    },
    cicd: {
      title: 'CI/CD Pipeline',
      icon: '🚀',
      features: [
        'Automated testing on every PR',
        'Parallel job execution',
        'Staging auto-deployment',
        'Production approval gates',
        'Slack notifications'
      ],
      metrics: {
        ciTime: '3-5 min',
        cdTime: '5-7 min',
        automation: '100%'
      }
    },
    docker: {
      title: 'Docker Container',
      icon: '🐳',
      features: [
        'Multi-stage builds',
        'nginx for serving',
        'Health check endpoints',
        'Security hardening',
        'Image size < 30MB'
      ],
      metrics: {
        imageSize: '26MB',
        startup: '< 2s',
        reduction: '97%'
      }
    },
    monitoring: {
      title: 'Monitoring',
      icon: '📊',
      features: [
        'Error tracking with Sentry',
        'Web Vitals performance tracking',
        'Source map integration',
        'Real-time alerts',
        'Custom dashboards'
      ],
      metrics: {
        errorCapture: '100%',
        uptime: '99.9%',
        alerting: 'Real-time'
      }
    }
  };
  
  const currentPhase = phases[selectedPhase];
  
  return (
    <div className="page">
      <h1>Features & Capabilities</h1>
      
      <div className="phase-selector">
        <button 
          className={`phase-btn ${selectedPhase === 'build' ? 'active' : ''}`}
          onClick={() => setSelectedPhase('build')}
        >
          ⚡ Build
        </button>
        <button 
          className={`phase-btn ${selectedPhase === 'cicd' ? 'active' : ''}`}
          onClick={() => setSelectedPhase('cicd')}
        >
          🚀 CI/CD
        </button>
        <button 
          className={`phase-btn ${selectedPhase === 'docker' ? 'active' : ''}`}
          onClick={() => setSelectedPhase('docker')}
        >
          🐳 Docker
        </button>
        <button 
          className={`phase-btn ${selectedPhase === 'monitoring' ? 'active' : ''}`}
          onClick={() => setSelectedPhase('monitoring')}
        >
          📊 Monitor
        </button>
      </div>
      
      <div className="card feature-detail">
        <h2>{currentPhase.icon} {currentPhase.title}</h2>
        
        <h3>Key Features:</h3>
        <ul>
          {currentPhase.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
        
        <h3>Metrics:</h3>
        <div className="metrics-grid">
          {Object.entries(currentPhase.metrics).map(([key, value]) => (
            <div key={key} className="metric">
              <div className="metric-label">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
              <div className="metric-value">{value}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="card">
        <h2>🏆 Portfolio Impact</h2>
        <p>Completing this challenge demonstrates:</p>
        <ul>
          <li><strong>Technical Expertise:</strong> Modern DevOps tools and practices</li>
          <li><strong>Production Ready:</strong> Real-world deployment experience</li>
          <li><strong>Best Practices:</strong> Industry-standard workflows</li>
          <li><strong>Problem Solving:</strong> End-to-end system design</li>
          <li><strong>Documentation:</strong> Professional communication skills</li>
        </ul>
      </div>
    </div>
  );
}

