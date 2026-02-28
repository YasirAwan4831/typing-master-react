// Test Mode Selector Component

import React, { useState } from 'react';
import { TEST_MODES, TIME_OPTIONS, WORD_COUNT_OPTIONS } from '../../utils/constants';
import Button from '../Common/Button/Button';
import Input from '../Common/Input/Input';
import styles from './ControlPanel.module.css';

/**
 * Test Mode Selector Component
 * Allows selection between time, words, and custom modes
 */
const TestModeSelector = ({
  testMode,
  onTestModeChange,
  timeLimit,
  onTimeLimitChange,
  wordLimit,
  onWordLimitChange
}) => {
  const [customTime, setCustomTime] = useState('');
  const [customWords, setCustomWords] = useState('');

  const handleModeChange = (mode) => {
    onTestModeChange(mode);
  };

  const handleTimeSelect = (time) => {
    onTimeLimitChange(time);
  };

  const handleWordSelect = (words) => {
    onWordLimitChange(words);
  };

  const handleApplyCustom = () => {
    const time = parseInt(customTime);
    const words = parseInt(customWords);

    if (time && time >= 10 && time <= 300) {
      onTimeLimitChange(time);
      onTestModeChange(TEST_MODES.TIME);
    } else if (words && words >= 5 && words <= 500) {
      onWordLimitChange(words);
      onTestModeChange(TEST_MODES.WORDS);
    } else {
      alert('Please enter valid values:\nTime: 10-300 seconds\nWords: 5-500 words');
    }
  };

  return (
    <div>
      {/* Test Mode Selection */}
      <div className={styles.controlSection}>
        <label className={styles.controlLabel}>Test Mode</label>
        <div className={styles.controlOptions}>
          <Button
            variant={testMode === TEST_MODES.TIME ? 'primary' : 'secondary'}
            size="medium"
            onClick={() => handleModeChange(TEST_MODES.TIME)}
          >
             Time
          </Button>
          <Button
            variant={testMode === TEST_MODES.WORDS ? 'primary' : 'secondary'}
            size="medium"
            onClick={() => handleModeChange(TEST_MODES.WORDS)}
          >
             Words
          </Button>
          <Button
            variant={testMode === TEST_MODES.CUSTOM ? 'primary' : 'secondary'}
            size="medium"
            onClick={() => handleModeChange(TEST_MODES.CUSTOM)}
          >
             Custom
          </Button>
        </div>
      </div>

      {/* Time Options */}
      {testMode === TEST_MODES.TIME && (
        <div className={styles.controlSection}>
          <label className={styles.controlLabel}>Duration</label>
          <div className={styles.controlOptions}>
            {TIME_OPTIONS.map((time) => (
              <Button
                key={time}
                variant={timeLimit === time ? 'primary' : 'secondary'}
                size="medium"
                onClick={() => handleTimeSelect(time)}
              >
                {time}s
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Word Count Options */}
      {testMode === TEST_MODES.WORDS && (
        <div className={styles.controlSection}>
          <label className={styles.controlLabel}>Word Count</label>
          <div className={styles.controlOptions}>
            {WORD_COUNT_OPTIONS.map((words) => (
              <Button
                key={words}
                variant={wordLimit === words ? 'primary' : 'secondary'}
                size="medium"
                onClick={() => handleWordSelect(words)}
              >
                {words} words
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Custom Options */}
      {testMode === TEST_MODES.CUSTOM && (
        <div className={styles.controlSection}>
          <label className={styles.controlLabel}>Custom Settings</label>
          <div className={styles.controlOptions}>
            <Input
              type="number"
              value={customTime}
              onChange={(e) => setCustomTime(e.target.value)}
              placeholder="Time (s)"
              min={10}
              max={300}
            />
            <Input
              type="number"
              value={customWords}
              onChange={(e) => setCustomWords(e.target.value)}
              placeholder="Words"
              min={5}
              max={500}
            />
            <Button variant="primary" onClick={handleApplyCustom}>
              Apply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestModeSelector;