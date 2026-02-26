// Reusable Button Component



/**
 * Button Component
 * @param {string} variant - Button variant: 'primary', 'secondary'
 * @param {string} size - Button size: 'small', 'medium', 'large'
 * @param {Function} onClick - Click handler
 * @param {boolean} disabled - Disabled state
 * @param {string} className - Additional CSS classes
 * @param {React.ReactNode} children - Button content
 * @param {string} type - Button type: 'button', 'submit', 'reset'
 * @param {object} rest - Other props
 */
const Button = ({
  variant = 'primary',
  size = 'medium',
  onClick,
  disabled = false,
  className = '',
  children,
  type = 'button',
  ...rest
}) => {
  const buttonClasses = [
    styles.btn,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
    className
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;