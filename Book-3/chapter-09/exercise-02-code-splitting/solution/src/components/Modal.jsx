// This component is lazy loaded
// It only downloads when user clicks "Open Modal"

export default function Modal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>✅ Welcome Modal</h2>
        <p>This modal is lazy loaded! It only downloads when you open it.</p>
        <p>Check the Network tab - you'll see Modal.jsx loaded only when you clicked the button.</p>
        <div className="info-box" style={{ marginTop: '1rem', background: '#d4edda', borderColor: '#28a745' }}>
          <p style={{ marginBottom: 0 }}>
            <strong>Benefit:</strong> Users who never open this modal never download its code.
            That's ~13KB saved per user!
          </p>
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

