import { useState } from 'react';
// TODO: Convert to lazy import
import Modal from '../components/Modal';

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="page">
      <h1>🏠 Home Page</h1>
      <p>Welcome to the Code Splitting Exercise!</p>

      <div className="info-box">
        <h3>About This Exercise</h3>
        <p>
          This app demonstrates code splitting. Right now, all code loads upfront.
          Your task is to implement lazy loading to reduce the initial bundle size.
        </p>
      </div>

      <h2>Current Status: ❌ No Code Splitting</h2>
      <p>All routes and components are loaded immediately, even ones you haven't visited yet.</p>

      <button onClick={() => setShowModal(true)}>
        Open Modal (Should be lazy loaded)
      </button>

      {/* TODO: Wrap with Suspense when you lazy load Modal */}
      {showModal && <Modal onClose={() => setShowModal(false)} />}

      <div className="info-box" style={{ marginTop: '2rem' }}>
        <h3>📝 Your Tasks</h3>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li>Lazy load all routes (Home, Products, Dashboard)</li>
          <li>Lazy load the Modal component (this one!)</li>
          <li>Lazy load the Chart component (in Products page)</li>
          <li>Add Suspense boundaries with loading fallbacks</li>
          <li>Add an Error Boundary</li>
          <li>Run bundle analysis before and after</li>
        </ul>
      </div>

      <div className="info-box" style={{ marginTop: '2rem', background: '#fff3cd', borderColor: '#ffc107' }}>
        <h3>🎯 Expected Result</h3>
        <p>
          After implementing code splitting, your initial bundle size should be reduced by 50-70%.
          Each route and heavy component will download only when needed.
        </p>
      </div>
    </div>
  );
}

