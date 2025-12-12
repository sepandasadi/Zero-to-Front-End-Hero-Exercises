import './Button.css';

/**
 * Reusable Button Component
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.variant - Button style variant
 * @param {string} props.size - Button size
 * @param {boolean} props.disabled - Disabled state
 * @param {Function} props.onClick - Click handler
 * @param {string} props.type - Button type
 */
function Button({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) {
  const buttonClass = `button button--${variant} button--${size} ${className}`.trim();

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;

