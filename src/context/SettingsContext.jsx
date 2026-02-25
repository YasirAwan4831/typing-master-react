// Settings Context Provider

import React, { createContext, useContext, useState, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { STORAGE_KEYS, DEFAULT_SETTINGS } from '../utils/constants';

// Create Settings Context
const SettingsContext = createContext(undefined);

/**
 * Settings Provider Component
 * Provides settings state and functions to all children
 */
export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useLocalStorage(
    STORAGE_KEYS.SETTINGS,
    DEFAULT_SETTINGS
  );

  /**
   * Update a single setting
   * @param {string} key - Setting key
   * @param {*} value - Setting value
   */
  const updateSetting = useCallback((key, value) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [key]: value
    }));
  }, [setSettings]);

  /**
   * Toggle a boolean setting
   * @param {string} key - Setting key
   */
  const toggleSetting = useCallback((key) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [key]: !prevSettings[key]
    }));
  }, [setSettings]);

  /**
   * Update multiple settings at once
   * @param {object} newSettings - Object with multiple settings
   */
  const updateMultipleSettings = useCallback((newSettings) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      ...newSettings
    }));
  }, [setSettings]);

  /**
   * Reset all settings to default
   */
  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
  }, [setSettings]);

  /**
   * Get a specific setting value
   * @param {string} key - Setting key
   * @returns {*} - Setting value
   */
  const getSetting = useCallback((key) => {
    return settings[key];
  }, [settings]);

  /**
   * Check if a setting is enabled (for boolean settings)
   * @param {string} key - Setting key
   * @returns {boolean}
   */
  const isSettingEnabled = useCallback((key) => {
    return !!settings[key];
  }, [settings]);

  const value = {
    settings,
    updateSetting,
    toggleSetting,
    updateMultipleSettings,
    resetSettings,
    getSetting,
    isSettingEnabled
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

/**
 * Custom hook to use Settings Context
 * @returns {object} - Settings state and functions
 */
export const useSettingsContext = () => {
  const context = useContext(SettingsContext);
  
  if (context === undefined) {
    throw new Error('useSettingsContext must be used within a SettingsProvider');
  }
  
  return context;
};

export default SettingsContext;