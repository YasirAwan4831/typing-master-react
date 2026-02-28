// Settings Panel Component

import React from 'react';
import ToggleSwitch from '../Common/ToggleSwitch/ToggleSwitch';
import styles from './ControlPanel.module.css';

/**
 * Settings Panel Component
 * Displays toggleable settings for the typing test
 */
const SettingsPanel = ({ settings, onSettingToggle }) => {
  const settingsConfig = [
    { key: 'sound', label: 'Sound Effects' },
    { key: 'punctuation', label: 'Punctuation' },
    { key: 'numbers', label: 'Numbers' },
    { key: 'capitals', label: 'Capitals' }
  ];

  return (
    <div className={styles.controlSection}>
      <label className={styles.controlLabel}>Settings</label>
      <div className={styles.settingsGrid}>
        {settingsConfig.map((setting) => (
          <div key={setting.key} className={styles.settingItem}>
            <span>{setting.label}</span>
            <ToggleSwitch
              isActive={settings[setting.key]}
              onToggle={() => onSettingToggle(setting.key)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsPanel;