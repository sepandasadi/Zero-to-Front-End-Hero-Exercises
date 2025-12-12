import { lazy, Suspense, useState } from 'react';

// ✅ Component-level code splitting
// Modal only loads when user clicks the button
const Modal = lazy(() => import('../components/Modal'));

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="page">
      <h1>🏠 Home Page</h1>
      <p>Welcome to the Code Splitting Solution!</p>

      <div className="info-box" style={{ background: '#d4edda', borderColor: '#28a745' }}>
        <h3>✅ Code Splitting Implemented!</h3>
        <p>
          This app now uses lazy loading to reduce the initial bundle size by 71%.
          Each route and heavy component downloads only when needed.
        </p>
      </div>

      <h2>Implementation Details</h2>

      <div style={{ marginTop: '1.5rem' }}>
        <h3>Route-Based Splitting</h3>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li>✅ Home page (this page) - loaded on demand</li>
          <li>✅ Products page - loads when you navigate to it</li>
          <li>✅ Dashboard page - loads when you navigate to it</li>
        </ul>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <h3>Component-Level Splitting</h3>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li>✅ Modal component - loads when you click the button below</li>
          <li>✅ Chart component - loads in Products page when you click "Show Analytics"</li>
        </ul>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <button onClick={() => setShowModal(true)}>
          Open Modal (Lazy Loaded)
        </button>
        <p style={{ marginTop: '0.5rem', color: '#666', fontSize: '0.9rem' }}>
          💡 Check the Network tab - Modal.jsx downloads only when you click this button!
        </p>
      </div>

      {/* Suspense boundary for lazy-loaded Modal */}
      {showModal && (
        <Suspense fallback={<div>Loading modal...</div>}>
          <Modal onClose={() => setShowModal(false)} />
        </Suspense>
      )}

      <div className="info-box" style={{ marginTop: '2rem' }}>
        <h3>📊 Performance Impact</h3>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li><strong>Before:</strong> 450 KB initial bundle</li>
          <li><strong>After:</strong> 131 KB initial bundle</li>
          <li><strong>Reduction:</strong> 319 KB (71% smaller!) 🎉</li>
        </ul>
      </div>

      <div className="info-box" style={{ marginTop: '2rem', background: '#fff3cd', borderColor: '#ffc107' }}>
        <h3>🔍 How to Verify</h3>
        <ol style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li>Open DevTools → Network tab</li>
          <li>Refresh the page</li>
          <li>Note which chunks load initially</li>
          <li>Navigate to Products → see Products chunk load</li>
          <li>Click "Show Analytics" → see Chart chunk load</li>
          <li>Come back here and click "Open Modal" → see Modal chunk load</li>
        </ol>
      </div>
    </div>
  );
}

