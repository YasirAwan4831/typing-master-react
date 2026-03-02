// Result Modal Component

import React from 'react';
import Button from '../Common/Button/Button';
import ResultStats from './ResultStats';
import styles from './ResultModal.module.css';

/**
 * Result Modal Component
 * Displays test results in a modal overlay
 */
const ResultModal = ({
  isOpen,
  result,
  onClose,
  onNewTest,
  onShare
}) => {
  if (!isOpen || !result) return null;

  const handleNewTest = () => {
    onClose();
    onNewTest();
  };

  const handleShare = () => {
    onShare(result);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getPerformanceColor = (performance) => {
    const colors = {
      'Beginner': '#EF4444',
      'Intermediate': '#F59E0B',
      'Advanced': '#10B981',
      'Pro': '#8B5CF6'
    };
    return colors[performance] || '#10B981';
  };

  return (
    <div 
      className={`${styles.modalOverlay} ${isOpen ? styles.show : ''}`}
      onClick={handleOverlayClick}
    >
      <div className={styles.resultModal}>
        {/* Header */}
        <div className={styles.resultHeader}>
          <h2 className={styles.resultTitle}>Test Complete! 🎉</h2>
          <div 
            className={styles.performanceBadge}
            style={{ background: getPerformanceColor(result.performance) }}
          >
            {result.performance}
          </div>
        </div>

        {/* Stats */}
        <ResultStats result={result} />

        {/* Actions */}
        <div className={styles.resultActions}>
          <Button variant="primary" onClick={handleNewTest}>
            New Test
          </Button>
          <Button variant="secondary" onClick={handleShare}>
            📋 Copy Result
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;