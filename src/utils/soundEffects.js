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

 
// Export the manager instance
export default soundManager;