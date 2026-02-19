// Helper utility functions

import { PERFORMANCE_LEVELS, TYPING_STATS } from './constants';

/**
 * Calculate Words Per Minute (WPM)
 * @param {number} correctChars - Number of correct characters typed
 * @param {number} timeInMinutes - Time elapsed in minutes
 * @returns {number} - WPM value
 */
export const calculateWPM = (correctChars, timeInMinutes) => {
  if (timeInMinutes <= 0) return 0;
  const wordsTyped = correctChars / TYPING_STATS.CHARS_PER_WORD;
  return Math.round(wordsTyped / timeInMinutes);
};

/**
 * Calculate Characters Per Minute (CPM)
 * @param {number} correctChars - Number of correct characters typed
 * @param {number} timeInMinutes - Time elapsed in minutes
 * @returns {number} - CPM value
 */
export const calculateCPM = (correctChars, timeInMinutes) => {
  if (timeInMinutes <= 0) return 0;
  return Math.round(correctChars / timeInMinutes);
};

/**
 * Calculate Accuracy Percentage
 * @param {number} correctChars - Number of correct characters
 * @param {number} totalChars - Total characters typed
 * @returns {number} - Accuracy percentage
 */
export const calculateAccuracy = (correctChars, totalChars) => {
  if (totalChars === 0) return 100;
  return Math.round((correctChars / totalChars) * 100);
};

/**
 * Get performance level based on WPM
 * @param {number} wpm - Words per minute
 * @returns {object} - Performance level object
 */
export const getPerformanceLevel = (wpm) => {
  for (const level of Object.values(PERFORMANCE_LEVELS)) {
    if (wpm >= level.min && wpm <= level.max) {
      return level;
    }
  }
  return PERFORMANCE_LEVELS.BEGINNER;
};

/**
 * Format time in seconds to MM:SS format
 * @param {number} seconds - Time in seconds
 * @returns {string} - Formatted time string
 */
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Format date to readable string
 * @param {string} dateString - ISO date string
 * @returns {string} - Formatted date
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Get random element from array
 * @param {Array} array - Input array
 * @returns {*} - Random element
 */
export const getRandomElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

/**
 * Shuffle array using Fisher-Yates algorithm
 * @param {Array} array - Input array
 * @returns {Array} - Shuffled array
 */
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Capitalize first letter of string
 * @param {string} str - Input string
 * @returns {string} - Capitalized string
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Generate random number between min and max (inclusive)
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} - Random number
 */
export const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} - Debounced function
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Throttle function
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} - Throttled function
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Deep clone an object
 * @param {object} obj - Object to clone
 * @returns {object} - Cloned object
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Check if object is empty
 * @param {object} obj - Object to check
 * @returns {boolean} - True if empty
 */
export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
};

/**
 * Clamp a number between min and max
 * @param {number} value - Value to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} - Clamped value
 */
export const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Convert milliseconds to seconds
 * @param {number} ms - Milliseconds
 * @returns {number} - Seconds
 */
export const msToSeconds = (ms) => {
  return Math.floor(ms / 1000);
};

/**
 * Convert milliseconds to minutes
 * @param {number} ms - Milliseconds
 * @returns {number} - Minutes
 */
export const msToMinutes = (ms) => {
  return ms / 1000 / 60;
};

/**
 * Check if value is a number
 * @param {*} value - Value to check
 * @returns {boolean} - True if number
 */
export const isNumber = (value) => {
  return typeof value === 'number' && !isNaN(value);
};

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise} - Promise that resolves when copied
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};

/**
 * Format result for sharing
 * @param {object} result - Test result object
 * @returns {string} - Formatted result text
 */
export const formatResultForSharing = (result) => {
  return `
TypeMaster Results 🎯

WPM: ${result.wpm}
CPM: ${result.cpm}
Accuracy: ${result.accuracy}%
Performance: ${result.performance}

Try it yourself at typemasterpro.vercel.app!
  `.trim();
};

/**
 * Calculate progress percentage
 * @param {number} current - Current value
 * @param {number} total - Total value
 * @returns {number} - Progress percentage
 */
export const calculateProgress = (current, total) => {
  if (total === 0) return 0;
  return Math.round((current / total) * 100);
};