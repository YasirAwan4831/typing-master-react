// src/components/TypingArea/StatsBar.jsx
// Stats Bar Component

import React from 'react';
import styles from './TypingArea.module.css';

/**
 * Stats Bar Component
 * Displays live typing statistics
 */
const StatsBar = ({ stats }) => {
  const { wpm = 0, cpm = 0, accuracy = 100, mistakes = 0, timeLeft = null } = stats;

  return (
    <div className={styles.statsBar}>
      <div className={styles.statItem}>
        <span className={styles.statValue}>{wpm}</span>
        <span className={styles.statLabel}>WPM</span>
      </div>
      
      <div className={styles.statItem}>
        <span className={styles.statValue}>{cpm}</span>
        <span className={styles.statLabel}>CPM</span>
      </div>
      
      <div className={styles.statItem}>
        <span className={styles.statValue}>{accuracy}</span>
        <span className={styles.statLabel}>Accuracy %</span>
      </div>
      
      <div className={styles.statItem}>
        <span className={styles.statValue}>{mistakes}</span>
        <span className={styles.statLabel}>Errors</span>
      </div>
      
      <div className={styles.statItem}>
        <span className={styles.statValue}>
          {timeLeft !== null ? timeLeft : '∞'}
        </span>
        <span className={styles.statLabel}>Time Left</span>
      </div>
    </div>
  );
};

export default StatsBar;