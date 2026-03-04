// git add src/components/History/HistoryList.jsx

import React from 'react';
import HistoryItem from './HistoryItem';
import styles from './History.module.css';

/**
 * History List Component
 * Displays list of test history or empty state
 */
const HistoryList = ({ history }) => {
  if (history.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyStateIcon}>📝</div>
        <p>No test history yet. Complete a test to see your results here!</p>
      </div>
    );
  }

  return (
    <div className={styles.historyList}>
      {history.map((result, index) => (
        <HistoryItem key={index} result={result} />
      ))}
    </div>
  );
};

export default HistoryList;