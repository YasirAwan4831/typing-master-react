// History Item Component

import React from 'react';
import { formatDate } from '../../utils/helpers';
import styles from './History.module.css';

/**
 * History Item Component
 * Displays a single test result in history
 */
const HistoryItem = ({ result }) => {
  return (
    <div className={styles.historyItem}>
      <div className={styles.historyInfo}>
        <div className={styles.historyMetric}>
          <span className={styles.historyMetricValue}>{result.wpm}</span>
          <span className={styles.historyMetricLabel}>WPM</span>
        </div>
        
        <div className={styles.historyMetric}>
          <span className={styles.historyMetricValue}>{result.cpm}</span>
          <span className={styles.historyMetricLabel}>CPM</span>
        </div>
        
        <div className={styles.historyMetric}>
          <span className={styles.historyMetricValue}>{result.accuracy}%</span>
          <span className={styles.historyMetricLabel}>Accuracy</span>
        </div>
        
        <div className={styles.historyMetric}>
          <span className={styles.historyMetricValue}>{result.mistakes}</span>
          <span className={styles.historyMetricLabel}>Errors</span>
        </div>
      </div>
      
      <span className={styles.historyDate}>
        {formatDate(result.timestamp)}
      </span>
    </div>
  );
};

export default HistoryItem;