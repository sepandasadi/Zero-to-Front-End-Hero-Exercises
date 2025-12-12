import './Input.css';

/**
 * Reusable Input Component
 * @param {object} props - Component props
 */
function Input({
  label,
  id,
  error,
  helperText,
  className = '',
  ...props
}) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`input-group ${className}`.trim()}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
        </label>
      )}

      <input
        id={inputId}
        className={`input ${error ? 'input--error' : ''}`.trim()}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error || helperText ? `${inputId}-description` : undefined}
        {...props}
      />

      {(error || helperText) && (
        <p
          id={`${inputId}-description`}
          className={`input-message ${error ? 'input-message--error' : ''}`.trim()}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
}

export default Input;

