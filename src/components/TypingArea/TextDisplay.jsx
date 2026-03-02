// Text Display Component

import React, { useRef, useEffect } from 'react';
import styles from './TypingArea.module.css';

/**
 * Text Display Component
 * Displays the text to be typed with character highlighting
 */
const TextDisplay = ({
  currentText,
  currentPosition,
  getCharStatus,
  isTestActive,
  isPaused,
  onCharacterInput,
  onBackspace,
  fontSize,
  fontFamily
}) => {
  const textDisplayRef = useRef(null);

  // Focus on mount and when test becomes active
  useEffect(() => {
    if (textDisplayRef.current) {
      textDisplayRef.current.focus();
    }
  }, []);

  // Auto-focus when test starts
  useEffect(() => {
    if (isTestActive && !isPaused && textDisplayRef.current) {
      textDisplayRef.current.focus();
    }
  }, [isTestActive, isPaused]);

  // Handle keyboard input
  const handleKeyDown = (e) => {
    // Prevent default for all keys
    e.preventDefault();

    if (isPaused) return;

    // Handle Backspace
    if (e.key === 'Backspace') {
      onBackspace();
      return;
    }

    // Handle regular character input (single characters only)
    if (e.key.length === 1) {
      onCharacterInput(e.key);
    }
  };

  // Render characters with status
  const renderText = () => {
    return currentText.split('').map((char, index) => {
      const status = getCharStatus(index);
      const isSpace = char === ' ';

      const charClasses = [
        styles.char,
        isSpace && styles.spaceChar,
        styles[status]
      ]
        .filter(Boolean)
        .join(' ');

      return (
        <span key={index} className={charClasses}>
          {isSpace ? '\u00A0' : char}
        </span>
      );
    });
  };

  const textDisplayClasses = [
    styles.textDisplay,
    isTestActive && styles.started,
    !isPaused && styles.hasFocus
  ]
    .filter(Boolean)
    .join(' ');

  const textDisplayStyle = {
    fontSize: fontSize,
    fontFamily: fontFamily
  };

  return (
    <div
      ref={textDisplayRef}
      className={textDisplayClasses}
      style={textDisplayStyle}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="textbox"
      aria-label="Typing area"
    >
      {renderText()}
    </div>
  );
};

export default TextDisplay;