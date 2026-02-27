// Reusable Input Component

import React from 'react';
import styles from './Input.module.css';

/**
 * Input Component
 * @param {string} type - Input type: 'text', 'number', 'email', etc.
 * @param {string} value - Input value
 * @param {Function} onChange - Change handler
 * @param {string} placeholder - Placeholder text
 * @param {boolean} disabled - Disabled state
 * @param {string} className - Additional CSS classes
 * @param {string} label - Label text
 * @param {string} error - Error message
 * @param {number} min - Minimum value (for number input)
 * @param {number} max - Maximum value (for number input)
 * @param {string} name - Input name
 * @param {boolean} required - Required field
 * @param {object} rest - Other props
 */
const Input = ({
  type = 'text',
  value,
  onChange,
  placeholder = '',
  disabled = false,
  className = '',
  label = '',
  error = '',
  min,
  max,
  name = '',
  required = false,
  ...rest
}) => {
  const inputClasses = [
    styles.input,
    error && styles.error,
    disabled && styles.disabled,
    className
  ]
    .filter(Boolean)
    .join(' ');

  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className={styles.container}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        className={inputClasses}
        min={min}
        max={max}
        name={name}
        required={required}
        {...rest}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};

export default Input;