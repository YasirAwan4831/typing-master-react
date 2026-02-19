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