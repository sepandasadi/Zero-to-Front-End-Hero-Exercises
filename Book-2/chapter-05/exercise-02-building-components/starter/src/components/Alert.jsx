// TODO: Build Alert component with 4 types
// Types: success, warning, error, info

function Alert({ type = 'info', title, message, onClose }) {
  // TODO: Define icons for each type (use emoji or SVG)
  const icons = {
    success: '✅',
    warning: '⚠️',
    error: '❌',
    info: 'ℹ️',
  }

  // TODO: Define colors for each type
  const colors = {
    success: '',
    warning: '',
    error: '',
    info: '',
  }

  return (
    <div>
      {/* TODO: Add icon, title, message, and close button */}
      <p>Alert component - implement me!</p>
    </div>
  )
}

export default Alert

