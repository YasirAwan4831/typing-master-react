// Reusable Toggle Switch Component

import React from 'react';
import styles from './ToggleSwitch.module.css';

/**
 * Toggle Switch Component
 * @param {boolean} isActive - Active state
 * @param {Function} onToggle - Toggle handler
 * @param {string} label - Label text
 * @param {boolean} disabled - Disabled state
 * @param {string} className - Additional CSS classes
 */
const ToggleSwitch = ({
  isActive = false,
  onToggle,
  label = '',
  disabled = false,
  className = ''
}) => {
  const handleClick = () => {
    if (!disabled && onToggle) {
      onToggle();
    }
  };

  const handleKeyPress = (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && !disabled && onToggle) {
      e.preventDefault();
      onToggle();
    }
  };

  const containerClasses = [
    styles.container,
    disabled && styles.disabled,
    className
  ]
    .filter(Boolean)
    .join(' ');

  const switchClasses = [
    styles.switch,
    isActive && styles.active,
    disabled && styles.disabled
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses}>
      {label && <span className={styles.label}>{label}</span>}
      <div
        className={switchClasses}
        onClick={handleClick}
        onKeyPress={handleKeyPress}
        role="switch"
        aria-checked={isActive}
        aria-label={label || 'Toggle switch'}
        tabIndex={disabled ? -1 : 0}
      >
        <div className={styles.slider}></div>
      </div>
    </div>
  );
};

export default ToggleSwitch;