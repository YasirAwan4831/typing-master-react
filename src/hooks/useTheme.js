// Custom hook for theme management

import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';
import { THEMES, STORAGE_KEYS } from '../utils/constants';

/**
 * Custom hook to manage theme (light/dark mode)
 * @returns {object} - { theme, toggleTheme, setTheme }
 */
const useTheme = () => {
  // Get theme from localStorage, default to light
  const [theme, setTheme] = useLocalStorage(STORAGE_KEYS.THEME, THEMES.LIGHT);

  /**
   * Apply theme to document
   */
  useEffect(() => {
    // Remove both theme classes first
    document.body.removeAttribute('data-theme');
    
    // Apply current theme
    document.body.setAttribute('data-theme', theme);
    
    // Update meta theme color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        theme === THEMES.DARK ? '#0f172a' : '#f8fafc'
      );
    }
  }, [theme]);

  /**
   * Toggle between light and dark theme
   */
  const toggleTheme = () => {
    setTheme((prevTheme) => 
      prevTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT
    );
  };

  /**
   * Set specific theme
   * @param {string} newTheme - Theme to set (light or dark)
   */
  const setSpecificTheme = (newTheme) => {
    if (newTheme === THEMES.LIGHT || newTheme === THEMES.DARK) {
      setTheme(newTheme);
    }
  };

  /**
   * Get theme icon based on current theme
   * @returns {string} - Emoji icon
   */
  const getThemeIcon = () => {
    return theme === THEMES.LIGHT ? '🌙' : '☀️';
  };

  /**
   * Check if current theme is dark
   * @returns {boolean}
   */
  const isDark = () => {
    return theme === THEMES.DARK;
  };

  /**
   * Check if current theme is light
   * @returns {boolean}
   */
  const isLight = () => {
    return theme === THEMES.LIGHT;
  };

  return {
    theme,
    toggleTheme,
    setTheme: setSpecificTheme,
    getThemeIcon,
    isDark: isDark(),
    isLight: isLight()
  };
};

export default useTheme;