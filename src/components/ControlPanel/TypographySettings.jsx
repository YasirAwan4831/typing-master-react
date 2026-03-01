// Typography Settings Component

import React from 'react';
import { FONT_SIZE_OPTIONS, FONT_FAMILY_OPTIONS } from '../../utils/constants';
import styles from './ControlPanel.module.css';

/**
 * Typography Settings Component
 * Allows customization of font size and font family
 */
const TypographySettings = ({
  fontSize,
  fontFamily,
  onFontSizeChange,
  onFontFamilyChange
}) => {
  return (
    <div className={styles.controlSection}>
      <label className={styles.controlLabel}>Typography</label>
      <div className={styles.controlOptions}>
        {/* Font Size Selector */}
        <select
          className={styles.customSelect}
          value={fontSize}
          onChange={(e) => onFontSizeChange(e.target.value)}
        >
          <option value={FONT_SIZE_OPTIONS.SMALL}>Small</option>
          <option value={FONT_SIZE_OPTIONS.NORMAL}>Normal</option>
          <option value={FONT_SIZE_OPTIONS.LARGE}>Large</option>
          <option value={FONT_SIZE_OPTIONS.EXTRA_LARGE}>Extra Large</option>
        </select>

        {/* Font Family Selector */}
        <select
          className={styles.customSelect}
          value={fontFamily}
          onChange={(e) => onFontFamilyChange(e.target.value)}
        >
          <option value={FONT_FAMILY_OPTIONS.JETBRAINS}>JetBrains Mono</option>
          <option value={FONT_FAMILY_OPTIONS.COURIER}>Courier New</option>
          <option value={FONT_FAMILY_OPTIONS.DM_SANS}>DM Sans</option>
          <option value={FONT_FAMILY_OPTIONS.SYSTEM}>System Mono</option>
        </select>
      </div>
    </div>
  );
};

export default TypographySettings;