// Action Buttons Component

import React from 'react';
import Button from '../Common/Button/Button';
import styles from './TypingArea.module.css';

/**
 * Action Buttons Component
 * Displays restart and pause/resume buttons
 */
const ActionButtons = ({
  onRestart,
  onPause,
  onResume,
  isPaused,
  isTestActive
}) => {
  const handlePauseResume = () => {
    if (isPaused) {
      onResume();
    } else {
      onPause();
    }
  };

  return (
    <div className={styles.actionButtons}>
      <Button variant="primary" onClick={onRestart}>
        🔄 Restart (Ctrl+R)
      </Button>
      
      {isTestActive && (
        <Button variant="secondary" onClick={handlePauseResume}>
          {isPaused ? '▶️ Resume' : '⏸️ Pause'}
        </Button>
      )}
    </div>
  );
};

export default ActionButtons;