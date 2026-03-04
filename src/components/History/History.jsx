// History Component

import React from 'react';
import HistoryList from './HistoryList';
import Button from '../Common/Button/Button';
import styles from './History.module.css';

/**
 * History Component
 * Displays test history and statistics
 */
const History = ({ history, onClearHistory }) => {
  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all history?')) {
      onClearHistory();
    }
  };

  return (
    <div className={styles.historySection} id="historySection">
      <div className={styles.historyHeader}>
        <h2 className={styles.sectionTitle}>Recent Tests</h2>
        {history.length > 0 && (
          <Button variant="secondary" onClick={handleClearHistory}>
            Clear History
          </Button>
        )}
      </div>

      <HistoryList history={history} />
    </div>
  );
};

export default History;