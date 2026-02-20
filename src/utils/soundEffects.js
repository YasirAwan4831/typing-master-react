// Sound effects utilities using Web Audio API

import { SOUND_FREQUENCIES, SOUND_VOLUMES } from './constants';

/**
 * Sound Manager Class
 * Handles all sound effects for the typing test
 */
class SoundManager {
  constructor() {
    this.audioContext = null;
    this.isEnabled = false;
  }

  /**
   * Initialize audio context
   */
  init() {
    if (!this.audioContext) {
      try {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      } catch (error) {
        console.error('Web Audio API not supported:', error);
      }
    }
  }

  /**
   * Enable sound effects
   */
  enable() {
    this.init();
    this.isEnabled = true;
  }

  /**
   * Disable sound effects
   */
  disable() {
    this.isEnabled = false;
  }

  /**
   * Toggle sound effects
   */
  toggle() {
    this.isEnabled = !this.isEnabled;
    if (this.isEnabled) {
      this.init();
    }
  }

  /**
   * Play a sound effect
   * @param {string} type - Type of sound (correct, error, complete, start)
   */
  play(type) {
    if (!this.isEnabled || !this.audioContext) {
      return;
    }

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    // Set initial gain to 0 for smooth start
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);

    // Configure sound based on type
    switch (type) {
      case 'correct':
        oscillator.frequency.value = SOUND_FREQUENCIES.CORRECT;
        gainNode.gain.linearRampToValueAtTime(
          SOUND_VOLUMES.CORRECT,
          this.audioContext.currentTime + 0.01
        );
        break;

      case 'error':
        oscillator.frequency.value = SOUND_FREQUENCIES.ERROR;
        gainNode.gain.linearRampToValueAtTime(
          SOUND_VOLUMES.ERROR,
          this.audioContext.currentTime + 0.01
        );
        break;

      case 'complete':
        oscillator.frequency.value = SOUND_FREQUENCIES.COMPLETE;
        gainNode.gain.linearRampToValueAtTime(
          SOUND_VOLUMES.COMPLETE,
          this.audioContext.currentTime + 0.01
        );
        break;

      case 'start':
        oscillator.frequency.value = SOUND_FREQUENCIES.START;
        gainNode.gain.linearRampToValueAtTime(
          SOUND_VOLUMES.START,
          this.audioContext.currentTime + 0.01
        );
        break;

      default:
        oscillator.frequency.value = 440; // Default A4 note
        gainNode.gain.linearRampToValueAtTime(
          0.1,
          this.audioContext.currentTime + 0.01
        );
    }

    // Quick fade out
    gainNode.gain.linearRampToValueAtTime(
      0,
      this.audioContext.currentTime + 0.08
    );

    // Play the sound
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.08);
  }

  /**
   * Play correct keystroke sound
   */
  playCorrect() {
    this.play('correct');
  }

  /**
   * Play error keystroke sound
   */
  playError() {
    this.play('error');
  }

  /**
   * Play test complete sound
   */
  playComplete() {
    this.play('complete');
  }

  /**
   * Play test start sound
   */
  playStart() {
    this.play('start');
  }

  /**
   * Play custom sound with specific frequency and volume
   * @param {number} frequency - Sound frequency in Hz
   * @param {number} volume - Volume (0 to 1)
   * @param {number} duration - Duration in seconds
   */
  playCustom(frequency = 440, volume = 0.1, duration = 0.08) {
    if (!this.isEnabled || !this.audioContext) {
      return;
    }

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(
      volume,
      this.audioContext.currentTime + 0.01
    );
    gainNode.gain.linearRampToValueAtTime(
      0,
      this.audioContext.currentTime + duration
    );

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  /**
   * Play success melody (for achievements)
   */
  playSuccess() {
    if (!this.isEnabled || !this.audioContext) {
      return;
    }

    const notes = [
      { frequency: 523.25, duration: 0.1 }, // C5
      { frequency: 659.25, duration: 0.1 }, // E5
      { frequency: 783.99, duration: 0.2 }  // G5
    ];

    let time = this.audioContext.currentTime;

    notes.forEach((note) => {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.value = note.frequency;
      gainNode.gain.setValueAtTime(0, time);
      gainNode.gain.linearRampToValueAtTime(0.15, time + 0.01);
      gainNode.gain.linearRampToValueAtTime(0, time + note.duration);

      oscillator.start(time);
      oscillator.stop(time + note.duration);

      time += note.duration;
    });
  }

  /**
   * Clean up audio context
   */
  cleanup() {
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }
}

// Create singleton instance
const soundManager = new SoundManager();

// Export individual functions
export const initSound = () => soundManager.init();
export const enableSound = () => soundManager.enable();
export const disableSound = () => soundManager.disable();
export const toggleSound = () => soundManager.toggle();
export const playCorrectSound = () => soundManager.playCorrect();
export const playErrorSound = () => soundManager.playError();
export const playCompleteSound = () => soundManager.playComplete();
export const playStartSound = () => soundManager.playStart();
export const playCustomSound = (frequency, volume, duration) => 
  soundManager.playCustom(frequency, volume, duration);
export const playSuccessSound = () => soundManager.playSuccess();
export const cleanupSound = () => soundManager.cleanup();

// Export the manager instance
export default soundManager;