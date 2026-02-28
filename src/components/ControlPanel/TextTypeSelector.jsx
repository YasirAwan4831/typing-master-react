// Text Type Selector Component

import React from 'react';
import { TEXT_TYPES } from '../../utils/constants';
import Button from '../Common/Button/Button';
import styles from './ControlPanel.module.css';

/**
 * Text Type Selector Component
 * Allows selection between different text types
 */
const TextTypeSelector = ({
  textType,
  onTextTypeChange,
  customText,
  onCustomTextChange,
  onApplyCustomText
}) => {
  const handleTypeChange = (type) => {
    onTextTypeChange(type);
  };

  const handleCustomTextApply = () => {
    if (customText.trim().length >= 10) {
      onApplyCustomText();
    } else {
      alert('Please enter at least 10 characters');
    }
  };

  return (
    <div>
      {/* Text Type Selection */}
      <div className={styles.controlSection}>
        <label className={styles.controlLabel}>Text Type</label>
        <div className={styles.controlOptions}>
          <Button
            variant={textType === TEXT_TYPES.WORDS ? 'primary' : 'secondary'}
            size="medium"
            onClick={() => handleTypeChange(TEXT_TYPES.WORDS)}
          >
            Random Words
          </Button>
          <Button
            variant={textType === TEXT_TYPES.SENTENCES ? 'primary' : 'secondary'}
            size="medium"
            onClick={() => handleTypeChange(TEXT_TYPES.SENTENCES)}
          >
            Sentences
          </Button>
          <Button
            variant={textType === TEXT_TYPES.PARAGRAPH ? 'primary' : 'secondary'}
            size="medium"
            onClick={() => handleTypeChange(TEXT_TYPES.PARAGRAPH)}
          >
            Paragraph
          </Button>
          <Button
            variant={textType === TEXT_TYPES.CODE ? 'primary' : 'secondary'}
            size="medium"
            onClick={() => handleTypeChange(TEXT_TYPES.CODE)}
          >
            Code
          </Button>
          <Button
            variant={textType === TEXT_TYPES.CUSTOM ? 'primary' : 'secondary'}
            size="medium"
            onClick={() => handleTypeChange(TEXT_TYPES.CUSTOM)}
          >
            Custom Text
          </Button>
        </div>
      </div>

      {/* Custom Text Input */}
      {textType === TEXT_TYPES.CUSTOM && (
        <div className={styles.controlSection}>
          <label className={styles.controlLabel}>Enter Your Custom Text</label>
          <textarea
            className={styles.customTextArea}
            value={customText}
            onChange={(e) => onCustomTextChange(e.target.value)}
            placeholder="Type or paste your custom text here..."
            rows={5}
          />
          <Button 
            variant="primary" 
            onClick={handleCustomTextApply}
            className={styles.mt2}
          >
            Use This Text
          </Button>
        </div>
      )}
    </div>
  );
};

export default TextTypeSelector;