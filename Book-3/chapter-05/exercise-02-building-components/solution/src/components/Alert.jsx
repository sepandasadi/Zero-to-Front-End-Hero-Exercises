function Alert({ type = 'info', title, message, onClose }) {
  const icons = {
    success: '✅',
    warning: '⚠️',
    error: '❌',
    info: 'ℹ️',
  }

  const colors = {
    success: 'bg-green-50 text-green-900 border border-green-200',
    warning: 'bg-yellow-50 text-yellow-900 border border-yellow-200',
    error: 'bg-red-50 text-red-900 border border-red-200',
    info: 'bg-blue-50 text-blue-900 border border-blue-200',
  }

  return (
    <div className={`flex items-start gap-3 p-4 rounded-lg ${colors[type]}`}>
      <div className="flex-shrink-0 text-xl">{icons[type]}</div>
      <div className="flex-1">
        <h4 className="font-semibold mb-1">{title}</h4>
        <p className="text-sm">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 text-2xl leading-none hover:opacity-70 transition-opacity"
          aria-label="Close alert"
        >
          ×
        </button>
      )}
    </div>
  )
}

export default Alert

