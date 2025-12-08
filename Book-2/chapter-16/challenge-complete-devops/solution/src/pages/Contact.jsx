import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: In a real app, send to API
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  return (
    <div className="page">
      <h1>Get Help</h1>
      
      <div className="card">
        <h2>📚 Resources</h2>
        <ul>
          <li><strong>Getting Started Guide:</strong> Step-by-step implementation instructions</li>
          <li><strong>Deployment Runbook:</strong> Detailed deployment procedures</li>
          <li><strong>Rollback Procedure:</strong> Emergency response guide</li>
          <li><strong>Architecture Docs:</strong> System design and data flows</li>
          <li><strong>Troubleshooting Guide:</strong> Common issues and solutions</li>
        </ul>
      </div>
      
      <div className="card">
        <h2>🔗 Helpful Links</h2>
        <div className="links-grid">
          <a href="https://vitejs.dev/" target="_blank" rel="noopener noreferrer" className="resource-link">
            <h3>Vite Documentation</h3>
            <p>Build tool configuration and optimization</p>
          </a>
          <a href="https://docs.github.com/en/actions" target="_blank" rel="noopener noreferrer" className="resource-link">
            <h3>GitHub Actions</h3>
            <p>CI/CD workflow documentation</p>
          </a>
          <a href="https://docs.docker.com/" target="_blank" rel="noopener noreferrer" className="resource-link">
            <h3>Docker Docs</h3>
            <p>Containerization guides and best practices</p>
          </a>
          <a href="https://docs.sentry.io/" target="_blank" rel="noopener noreferrer" className="resource-link">
            <h3>Sentry</h3>
            <p>Error tracking and monitoring setup</p>
          </a>
        </div>
      </div>
      
      <div className="card">
        <h2>💬 Feedback Form</h2>
        {submitted ? (
          <div className="success-message">
            <h3>✅ Thanks for your feedback!</h3>
            <p>We appreciate you taking the time to help us improve.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
              />
            </div>
            
            <button type="submit" className="btn btn-primary">
              Send Message
            </button>
          </form>
        )}
      </div>
      
      <div className="card">
        <h2>🆘 Need Immediate Help?</h2>
        <p>If you're stuck on a specific issue:</p>
        <ol>
          <li>Check the <strong>TROUBLESHOOTING.md</strong> guide</li>
          <li>Review the exercise solutions for reference</li>
          <li>Check the official documentation for each tool</li>
          <li>Look for similar issues in GitHub repositories</li>
        </ol>
      </div>
    </div>
  );
}

