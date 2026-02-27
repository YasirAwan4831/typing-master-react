// ControlPanel component
// Control Panel Component

import React from 'react';
import TestModeSelector from './TestModeSelector';
import TextTypeSelector from './TextTypeSelector';
import SettingsPanel from './SettingsPanel';
import TypographySettings from './TypographySettings';
import styles from './ControlPanel.module.css';

/**
 * Control Panel Component
 * Main settings and configuration panel
 */
const ControlPanel = ({
  testMode,
  onTestModeChange,
  timeLimit,
  onTimeLimitChange,
  wordLimit,
  onWordLimitChange,
  textType,
  onTextTypeChange,
  customText,
  onCustomTextChange,
  onApplyCustomText,
  settings,
  onSettingToggle,
  onFontSizeChange,
  onFontFamilyChange
}) => {
  return (
    <div className={styles.controlPanel}>
      {/* Test Mode Selection */}
      <TestModeSelector
        testMode={testMode}
        onTestModeChange={onTestModeChange}
        timeLimit={timeLimit}
        onTimeLimitChange={onTimeLimitChange}
        wordLimit={wordLimit}
        onWordLimitChange={onWordLimitChange}
      />

      {/* Text Type Selection */}
      <TextTypeSelector
        textType={textType}
        onTextTypeChange={onTextTypeChange}
        customText={customText}
        onCustomTextChange={onCustomTextChange}
        onApplyCustomText={onApplyCustomText}
      />

      {/* Settings Panel */}
      <SettingsPanel
        settings={settings}
        onSettingToggle={onSettingToggle}
      />

      {/* Typography Settings */}
      <TypographySettings
        fontSize={settings.fontSize}
        fontFamily={settings.fontFamily}
        onFontSizeChange={onFontSizeChange}
        onFontFamilyChange={onFontFamilyChange}
      />
    </div>
  );
};

export default ControlPanel;