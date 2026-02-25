// Custom hook for test history management

import { useCallback } from 'react';
import useLocalStorage from './useLocalStorage';
import { STORAGE_KEYS, TYPING_STATS } from '../utils/constants';

/**
 * Custom hook to manage typing test history
 * @returns {object} - History state and control functions
 */
const useHistory = () => {
  const [history, setHistory, removeHistory] = useLocalStorage(
    STORAGE_KEYS.HISTORY,
    []
  );

  /**
   * Add a new test result to history
   * @param {object} result - Test result object
   */
  const addResult = useCallback((result) => {
    setHistory((prevHistory) => {
      const newHistory = [result, ...prevHistory];
      
      // Keep only last 50 results
      if (newHistory.length > TYPING_STATS.MAX_HISTORY_SAVED) {
        return newHistory.slice(0, TYPING_STATS.MAX_HISTORY_SAVED);
      }
      
      return newHistory;
    });
  }, [setHistory]);

  /**
   * Clear all history
   */
  const clearHistory = useCallback(() => {
    if (window.confirm('Are you sure you want to clear all history?')) {
      removeHistory();
    }
  }, [removeHistory]);

  /**
   * Get recent results (last n results)
   * @param {number} count - Number of results to get
   * @returns {Array} - Recent results
   */
  const getRecentResults = useCallback((count = 10) => {
    return history.slice(0, count);
  }, [history]);

  /**
   * Get total number of tests completed
   * @returns {number} - Total tests
   */
  const getTotalTests = useCallback(() => {
    return history.length;
  }, [history]);

  /**
   * Get average WPM across all tests
   * @returns {number} - Average WPM
   */
  const getAverageWPM = useCallback(() => {
    if (history.length === 0) return 0;
    
    const totalWPM = history.reduce((sum, result) => sum + result.wpm, 0);
    return Math.round(totalWPM / history.length);
  }, [history]);

  /**
   * Get average accuracy across all tests
   * @returns {number} - Average accuracy
   */
  const getAverageAccuracy = useCallback(() => {
    if (history.length === 0) return 0;
    
    const totalAccuracy = history.reduce((sum, result) => sum + result.accuracy, 0);
    return Math.round(totalAccuracy / history.length);
  }, [history]);

  /**
   * Get highest WPM achieved
   * @returns {number} - Highest WPM
   */
  const getHighestWPM = useCallback(() => {
    if (history.length === 0) return 0;
    
    return Math.max(...history.map(result => result.wpm));
  }, [history]);

  /**
   * Get best accuracy achieved
   * @returns {number} - Best accuracy
   */
  const getBestAccuracy = useCallback(() => {
    if (history.length === 0) return 0;
    
    return Math.max(...history.map(result => result.accuracy));
  }, [history]);

  /**
   * Get results filtered by date range
   * @param {Date} startDate - Start date
   * @param {Date} endDate - End date
   * @returns {Array} - Filtered results
   */
  const getResultsByDateRange = useCallback((startDate, endDate) => {
    return history.filter(result => {
      const resultDate = new Date(result.timestamp);
      return resultDate >= startDate && resultDate <= endDate;
    });
  }, [history]);

  /**
   * Get results filtered by performance level
   * @param {string} performanceLevel - Performance level (Beginner, Intermediate, Advanced, Pro)
   * @returns {Array} - Filtered results
   */
  const getResultsByPerformance = useCallback((performanceLevel) => {
    return history.filter(result => result.performance === performanceLevel);
  }, [history]);

  /**
   * Get improvement trend (comparing recent vs older results)
   * @returns {object} - Trend data { wpmTrend, accuracyTrend }
   */
  const getImprovementTrend = useCallback(() => {
    if (history.length < 2) {
      return { wpmTrend: 0, accuracyTrend: 0 };
    }

    const halfPoint = Math.floor(history.length / 2);
    const recentResults = history.slice(0, halfPoint);
    const olderResults = history.slice(halfPoint);

    const recentAvgWPM = recentResults.reduce((sum, r) => sum + r.wpm, 0) / recentResults.length;
    const olderAvgWPM = olderResults.reduce((sum, r) => sum + r.wpm, 0) / olderResults.length;

    const recentAvgAccuracy = recentResults.reduce((sum, r) => sum + r.accuracy, 0) / recentResults.length;
    const olderAvgAccuracy = olderResults.reduce((sum, r) => sum + r.accuracy, 0) / olderResults.length;

    return {
      wpmTrend: Math.round(recentAvgWPM - olderAvgWPM),
      accuracyTrend: Math.round(recentAvgAccuracy - olderAvgAccuracy)
    };
  }, [history]);

  /**
   * Get statistics summary
   * @returns {object} - Statistics object
   */
  const getStatistics = useCallback(() => {
    return {
      totalTests: getTotalTests(),
      averageWPM: getAverageWPM(),
      averageAccuracy: getAverageAccuracy(),
      highestWPM: getHighestWPM(),
      bestAccuracy: getBestAccuracy(),
      trend: getImprovementTrend()
    };
  }, [
    getTotalTests,
    getAverageWPM,
    getAverageAccuracy,
    getHighestWPM,
    getBestAccuracy,
    getImprovementTrend
  ]);

  /**
   * Check if history is empty
   * @returns {boolean}
   */
  const isEmpty = useCallback(() => {
    return history.length === 0;
  }, [history]);

  /**
   * Get last test result
   * @returns {object|null} - Last result or null
   */
  const getLastResult = useCallback(() => {
    return history.length > 0 ? history[0] : null;
  }, [history]);

  return {
    history,
    addResult,
    clearHistory,
    getRecentResults,
    getTotalTests,
    getAverageWPM,
    getAverageAccuracy,
    getHighestWPM,
    getBestAccuracy,
    getResultsByDateRange,
    getResultsByPerformance,
    getImprovementTrend,
    getStatistics,
    isEmpty,
    getLastResult
  };
};

export default useHistory;