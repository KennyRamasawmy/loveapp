import './Input.css';

const Input = ({
  type = 'text',
  label,
  value,
  onChange,
  placeholder,
  error,
  icon
}) => {
  return (
    <div className="input-group">
      {label && <label className="input-label">{label}</label>}
      <div className="input-wrapper">
        {icon && <span className="input-icon">{icon}</span>}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`input ${error ? 'input-error' : ''} ${icon ? 'has-icon' : ''}`}
        />
      </div>
      {error && <span className="input-error-text">{error}</span>}
    </div>
  );
};

export default Input;