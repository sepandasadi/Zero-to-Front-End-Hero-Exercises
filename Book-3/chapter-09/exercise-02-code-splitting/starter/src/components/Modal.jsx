// This component should be lazy loaded
// It's only needed when user clicks the button

export default function Modal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Welcome Modal</h2>
        <p>This modal is lazy loaded! It only downloads when you open it.</p>
        <p>Check the Network tab to see it load on demand.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

