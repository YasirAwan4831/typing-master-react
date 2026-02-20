// Custom hook for sound management

import { useEffect, useRef } from 'react';
import soundManager from '../utils/soundEffects';

/**
 * Custom hook to manage sound effects
 * @param {boolean} isEnabled - Whether sound is enabled
 * @returns {object} - Sound control functions
 */
const useSound = (isEnabled = false) => {
  const isMountedRef = useRef(true);

  /**
   * Initialize sound manager on mount
   */
  useEffect(() => {
    if (isEnabled) {
      soundManager.enable();
    } else {
      soundManager.disable();
    }

    return () => {
      isMountedRef.current = false;
    };
  }, [isEnabled]);

  /**
   * Play correct keystroke sound
   */
  const playCorrect = () => {
    if (isMountedRef.current && isEnabled) {
      soundManager.playCorrect();
    }
  };

  /**
   * Play error keystroke sound
   */
  const playError = () => {
    if (isMountedRef.current && isEnabled) {
      soundManager.playError();
    }
  };

  /**
   * Play test complete sound
   */
  const playComplete = () => {
    if (isMountedRef.current && isEnabled) {
      soundManager.playComplete();
    }
  };

  /**
   * Play test start sound
   */
  const playStart = () => {
    if (isMountedRef.current && isEnabled) {
      soundManager.playStart();
    }
  };

  /**
   * Play success melody
   */
  const playSuccess = () => {
    if (isMountedRef.current && isEnabled) {
      soundManager.playSuccess();
    }
  };

  /**
   * Play custom sound
   * @param {number} frequency - Sound frequency in Hz
   * @param {number} volume - Volume (0 to 1)
   * @param {number} duration - Duration in seconds
   */
  const playCustom = (frequency, volume, duration) => {
    if (isMountedRef.current && isEnabled) {
      soundManager.playCustom(frequency, volume, duration);
    }
  };

  /**
   * Toggle sound on/off
   */
  const toggle = () => {
    soundManager.toggle();
  };

  /**
   * Enable sound
   */
  const enable = () => {
    soundManager.enable();
  };

  /**
   * Disable sound
   */
  const disable = () => {
    soundManager.disable();
  };

  return {
    playCorrect,
    playError,
    playComplete,
    playStart,
    playSuccess,
    playCustom,
    toggle,
    enable,
    disable,
    isEnabled
  };
};

export default useSound;