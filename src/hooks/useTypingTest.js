// Custom hook for typing test logic (Main hook)

import { useState, useCallback, useRef, useEffect } from 'react';
import { generateText } from '../utils/textGenerator';
import {
  calculateWPM,
  calculateCPM,
  calculateAccuracy,
  getPerformanceLevel,
  msToSeconds,
  msToMinutes
} from '../utils/helpers';
import { TEST_MODES } from '../utils/constants';

/**
 * Main custom hook for typing test functionality
 * @param {object} settings - Test settings
 * @param {Function} onComplete - Callback when test completes
 * @returns {object} - Test state and control functions
 */
const useTypingTest = (settings = {}, onComplete = null) => {
  // Test Configuration
  const [testMode, setTestMode] = useState(settings.testMode || TEST_MODES.TIME);
  const [timeLimit, setTimeLimit] = useState(settings.timeLimit || 30);
  const [wordLimit, setWordLimit] = useState(settings.wordLimit || 10);
  const [textType, setTextType] = useState(settings.textType || 'words');
  const [customText, setCustomText] = useState(settings.customText || '');

  // Refs for callbacks and settings to avoid dependency loops
  const onCompleteRef = useRef(onComplete);
  const settingsRef = useRef(settings);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  // Test State
  const [currentText, setCurrentText] = useState('');
  const [typedText, setTypedText] = useState('');
  const [currentPosition, setCurrentPosition] = useState(0);
  const [isTestActive, setIsTestActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isTestComplete, setIsTestComplete] = useState(false);

  // Statistics
  const [correctChars, setCorrectChars] = useState(0);
  const [incorrectChars, setIncorrectChars] = useState(0);
  const [totalChars, setTotalChars] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [backspaceCount, setBackspaceCount] = useState(0);

  // Timer
  const [elapsedTime, setElapsedTime] = useState(0);
  const startTimeRef = useRef(null);
  const timerIntervalRef = useRef(null);

  /**
   * Generate new text for typing
   */
  const generateNewText = useCallback(() => {
    console.log("generateNewText called. testMode:", testMode, "wordLimit:", wordLimit, "textType:", textType);
    const wordCount = testMode === TEST_MODES.WORDS ? wordLimit : 100;
    const text = generateText(textType, wordCount, settingsRef.current, customText);
    setCurrentText(text);
  }, [testMode, wordLimit, textType, customText]);

  /**
   * Initialize test
   */
  useEffect(() => {
    console.log("useEffect: generateNewText fired");
    generateNewText();
  }, [generateNewText]);

  /**
   * Start the test
   */
  const startTest = useCallback(() => {
    if (isTestActive) return;

    setIsTestActive(true);
    setIsPaused(false);
    startTimeRef.current = Date.now();

    // Start timer interval
    timerIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      setElapsedTime(elapsed);
    }, 100);
  }, [isTestActive]);

  /**
   * Pause the test
   */
  const pauseTest = useCallback(() => {
    if (!isTestActive || isPaused) return;

    setIsPaused(true);
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
  }, [isTestActive, isPaused]);

  /**
   * Resume the test
   */
  const resumeTest = useCallback(() => {
    if (!isTestActive || !isPaused) return;

    setIsPaused(false);
    startTimeRef.current = Date.now() - elapsedTime;

    timerIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      setElapsedTime(elapsed);
    }, 100);
  }, [isTestActive, isPaused, elapsedTime]);

  /**
   * Stop the test
   */
  const stopTest = useCallback(() => {
    setIsTestActive(false);
    setIsPaused(false);
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
  }, []);

  /**
   * Reset the test
   */
  const resetTest = useCallback(() => {
    stopTest();
    setTypedText('');
    setCurrentPosition(0);
    setCorrectChars(0);
    setIncorrectChars(0);
    setTotalChars(0);
    setMistakes(0);
    setBackspaceCount(0);
    setElapsedTime(0);
    setIsTestComplete(false);
    startTimeRef.current = null;
    generateNewText();
  }, [stopTest, generateNewText]);

  /**
   * Handle character input
   */
  const handleCharacterInput = useCallback((char) => {
    if (!isTestActive || isPaused || currentPosition >= currentText.length) {
      return;
    }

    const expectedChar = currentText[currentPosition];
    const newTypedText = typedText + char;

    setTypedText(newTypedText);
    setTotalChars(prev => prev + 1);

    if (char === expectedChar) {
      setCorrectChars(prev => prev + 1);
    } else {
      setIncorrectChars(prev => prev + 1);
      setMistakes(prev => prev + 1);
    }

    setCurrentPosition(prev => prev + 1);
  }, [isTestActive, isPaused, currentPosition, currentText, typedText]);

  /**
   * Handle backspace
   */
  const handleBackspace = useCallback(() => {
    if (!isTestActive || isPaused || currentPosition === 0) {
      return;
    }

    setBackspaceCount(prev => prev + 1);
    setCurrentPosition(prev => prev - 1);

    const newTypedText = typedText.slice(0, -1);
    setTypedText(newTypedText);

    // Recalculate stats
    let correct = 0;
    let incorrect = 0;
    let errors = 0;

    for (let i = 0; i < newTypedText.length; i++) {
      if (newTypedText[i] === currentText[i]) {
        correct++;
      } else {
        incorrect++;
        errors++;
      }
    }

    setCorrectChars(correct);
    setIncorrectChars(incorrect);
    setMistakes(errors);
    setTotalChars(newTypedText.length);
  }, [isTestActive, isPaused, currentPosition, typedText, currentText]);

  /**
   * Calculate current statistics
   */
  const getCurrentStats = useCallback(() => {
    const timeInMinutes = msToMinutes(elapsedTime);
    const wpm = calculateWPM(correctChars, timeInMinutes);
    const cpm = calculateCPM(correctChars, timeInMinutes);
    const accuracy = calculateAccuracy(correctChars, totalChars);
    const timeInSeconds = msToSeconds(elapsedTime);
    const timeLeft = testMode === TEST_MODES.TIME
      ? Math.max(0, timeLimit - timeInSeconds)
      : null;

    return {
      wpm,
      cpm,
      accuracy,
      mistakes,
      correctChars,
      incorrectChars,
      backspaceCount,
      timeInSeconds,
      timeLeft,
      progress: Math.round((currentPosition / currentText.length) * 100)
    };
  }, [
    elapsedTime,
    correctChars,
    totalChars,
    mistakes,
    incorrectChars,
    backspaceCount,
    currentPosition,
    currentText,
    testMode,
    timeLimit
  ]);

  /**
   * Complete the test
   */
  const completeTest = useCallback(() => {
    stopTest();
    setIsTestComplete(true);

    const stats = getCurrentStats();
    const performance = getPerformanceLevel(stats.wpm);

    const result = {
      ...stats,
      performance: performance.label,
      timestamp: new Date().toISOString(),
      testMode,
      textType
    };

    if (onCompleteRef.current) {
      onCompleteRef.current(result);
    }

    return result;
  }, [stopTest, getCurrentStats, testMode, textType]);

  /**
   * Check if test should complete
   */
  useEffect(() => {
    console.log("useEffect: Check if test should complete fired. isTestActive:", isTestActive, "isPaused:", isPaused);
    if (!isTestActive || isPaused) return;

    let shouldComplete = false;

    // Time-based completion
    if (testMode === TEST_MODES.TIME) {
      if (elapsedTime >= timeLimit * 1000) {
        shouldComplete = true;
      }
    }

    // Word-based completion
    if (testMode === TEST_MODES.WORDS) {
      const wordsCompleted = typedText.trim().split(/\s+/).filter(w => w.length > 0).length;
      if (wordsCompleted >= wordLimit && currentPosition >= currentText.length) {
        shouldComplete = true;
      }
    }

    if (shouldComplete) {
      completeTest();
    }
  }, [
    isTestActive,
    isPaused,
    testMode,
    elapsedTime,
    timeLimit,
    typedText,
    wordLimit,
    currentPosition,
    currentText,
    completeTest
  ]);

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  /**
   * Get character status for display
   */
  const getCharStatus = useCallback((index) => {
    if (index < typedText.length) {
      return typedText[index] === currentText[index] ? 'correct' : 'incorrect';
    }
    if (index === currentPosition) {
      return 'current';
    }
    return 'pending';
  }, [typedText, currentText, currentPosition]);

  return {
    // Configuration
    testMode,
    setTestMode,
    timeLimit,
    setTimeLimit,
    wordLimit,
    setWordLimit,
    textType,
    setTextType,
    customText,
    setCustomText,

    // Text
    currentText,
    typedText,
    currentPosition,
    generateNewText,

    // State
    isTestActive,
    isPaused,
    isTestComplete,

    // Control
    startTest,
    pauseTest,
    resumeTest,
    stopTest,
    resetTest,
    completeTest,

    // Input handlers
    handleCharacterInput,
    handleBackspace,

    // Statistics
    getCurrentStats,
    getCharStatus,

    // Raw stats
    correctChars,
    incorrectChars,
    totalChars,
    mistakes,
    backspaceCount,
    elapsedTime
  };
};

export default useTypingTest;