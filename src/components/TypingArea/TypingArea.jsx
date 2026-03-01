// Typing Area Component

import React from 'react';
import StatsBar from './StatsBar';
import TextDisplay from './TextDisplay';
import ActionButtons from './ActionButtons';
import styles from './TypingArea.module.css';

/**
 * Typing Area Component
 * Main area where typing test happens
 */
const TypingArea = ({
  currentText,
  currentPosition,
  getCharStatus,
  stats,
  isTestActive,
  isPaused,
  onRestart,
  onPause,
  onResume,
  onCharacterInput,
  onBackspace,
  fontSize,
  fontFamily
}) => {
  const typingAreaClasses = [
    styles.typingSection,
    isTestActive && styles.active
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={typingAreaClasses}>
      {/* Stats Bar */}
      <StatsBar stats={stats} />

      {/* Text Display */}
      <TextDisplay
        currentText={currentText}
        currentPosition={currentPosition}
        getCharStatus={getCharStatus}
        isTestActive={isTestActive}
        isPaused={isPaused}
        onCharacterInput={onCharacterInput}
        onBackspace={onBackspace}
        fontSize={fontSize}
        fontFamily={fontFamily}
      />

      {/* Action Buttons */}
      <ActionButtons
        onRestart={onRestart}
        onPause={onPause}
        onResume={onResume}
        isPaused={isPaused}
        isTestActive={isTestActive}
      />
    </div>
  );
};

export default TypingArea;