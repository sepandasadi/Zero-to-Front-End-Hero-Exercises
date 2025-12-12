import './Button.css';

function Button({ children, onClick, variant = 'primary', disabled = false }) {
  const className = `btn btn-${variant}`;

  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;

