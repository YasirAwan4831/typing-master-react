// Custom hook for timer management

import { useState, useEffect, useRef, useCallback } from 'react';
import { UPDATE_INTERVALS } from '../utils/constants';

/**
 * Custom hook to manage timer for typing test
 * @param {number} initialTime - Initial time in seconds (for countdown)
 * @param {string} mode - Timer mode: 'countdown' or 'countup'
 * @param {Function} onComplete - Callback when countdown reaches zero
 * @returns {object} - Timer state and control functions
 */
const useTimer = (initialTime = 0, mode = 'countdown', onComplete = null) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);
  const elapsedBeforePauseRef = useRef(0);

  /**
   * Start the timer
   */
  const start = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true);
      setIsPaused(false);
      startTimeRef.current = Date.now() - elapsedBeforePauseRef.current;
    }
  }, [isRunning]);

  /**
   * Pause the timer
   */
  const pause = useCallback(() => {
    if (isRunning && !isPaused) {
      setIsPaused(true);
      elapsedBeforePauseRef.current = Date.now() - startTimeRef.current;
    }
  }, [isRunning, isPaused]);

  /**
   * Resume the timer
   */
  const resume = useCallback(() => {
    if (isRunning && isPaused) {
      setIsPaused(false);
      startTimeRef.current = Date.now() - elapsedBeforePauseRef.current;
    }
  }, [isRunning, isPaused]);

  /**
   * Stop the timer
   */
  const stop = useCallback(() => {
    setIsRunning(false);
    setIsPaused(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  /**
   * Reset the timer
   */
  const reset = useCallback(() => {
    stop();
    setTime(initialTime);
    elapsedBeforePauseRef.current = 0;
    startTimeRef.current = null;
  }, [initialTime, stop]);

  /**
   * Set time manually
   */
  const setTimeTo = useCallback((newTime) => {
    setTime(newTime);
  }, []);

  /**
   * Get elapsed time in milliseconds
   */
  const getElapsedMs = useCallback(() => {
    if (!startTimeRef.current) return 0;
    return isPaused 
      ? elapsedBeforePauseRef.current 
      : Date.now() - startTimeRef.current;
  }, [isPaused]);

  /**
   * Get elapsed time in seconds
   */
  const getElapsedSeconds = useCallback(() => {
    return Math.floor(getElapsedMs() / 1000);
  }, [getElapsedMs]);

  /**
   * Get elapsed time in minutes
   */
  const getElapsedMinutes = useCallback(() => {
    return getElapsedMs() / 1000 / 60;
  }, [getElapsedMs]);

  /**
   * Timer effect
   */
  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTimeRef.current;

        if (mode === 'countdown') {
          const remaining = Math.max(0, initialTime - Math.floor(elapsed / 1000));
          setTime(remaining);

          // Check if countdown is complete
          if (remaining === 0) {
            stop();
            if (onComplete) {
              onComplete();
            }
          }
        } else {
          // Countup mode
          setTime(Math.floor(elapsed / 1000));
        }
      }, UPDATE_INTERVALS.TIMER_UPDATE);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isPaused, initialTime, mode, onComplete, stop]);

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  /**
   * Format time as MM:SS
   */
  const formatTime = useCallback(() => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, [time]);

  /**
   * Get time in seconds
   */
  const getTimeInSeconds = useCallback(() => {
    return time;
  }, [time]);

  return {
    time,
    isRunning,
    isPaused,
    start,
    pause,
    resume,
    stop,
    reset,
    setTime: setTimeTo,
    formatTime,
    getTimeInSeconds,
    getElapsedMs,
    getElapsedSeconds,
    getElapsedMinutes
  };
};

export default useTimer;