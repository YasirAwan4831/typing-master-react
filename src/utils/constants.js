// Constants file

// Application Constants

// Test Modes
export const TEST_MODES = {
  TIME: 'time',
  WORDS: 'words',
  CUSTOM: 'custom'
};

// Text Types
export const TEXT_TYPES = {
  WORDS: 'words',
  SENTENCES: 'sentences',
  PARAGRAPH: 'paragraph',
  CODE: 'code',
  CUSTOM: 'custom'
};

// Time Options (in seconds)
export const TIME_OPTIONS = [30, 60, 120];

// Word Count Options
export const WORD_COUNT_OPTIONS = [10, 25, 50, 100];

// Font Size Options
export const FONT_SIZE_OPTIONS = {
  SMALL: '1.25rem',
  NORMAL: '1.5rem',
  LARGE: '1.75rem',
  EXTRA_LARGE: '2rem'
};

// Font Family Options
export const FONT_FAMILY_OPTIONS = {
  JETBRAINS: "'JetBrains Mono', monospace",
  COURIER: "'Courier New', monospace",
  DM_SANS: "'DM Sans', sans-serif",
  SYSTEM: "monospace"
};

// Performance Levels (based on WPM)
export const PERFORMANCE_LEVELS = {
  BEGINNER: { min: 0, max: 39, label: 'Beginner', color: '#EF4444' },
  INTERMEDIATE: { min: 40, max: 59, label: 'Intermediate', color: '#F59E0B' },
  ADVANCED: { min: 60, max: 79, label: 'Advanced', color: '#10B981' },
  PRO: { min: 80, max: Infinity, label: 'Pro', color: '#8B5CF6' }
};

// Default Settings
export const DEFAULT_SETTINGS = {
  sound: false,
  punctuation: false,
  numbers: false,
  capitals: false,
  fontSize: FONT_SIZE_OPTIONS.NORMAL,
  fontFamily: FONT_FAMILY_OPTIONS.JETBRAINS
};

// Theme Options
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark'
};

// Local Storage Keys
export const STORAGE_KEYS = {
  THEME: 'theme',
  SETTINGS: 'typingSettings',
  HISTORY: 'typingTestHistory'
};

// Chart Configuration
export const CHART_CONFIG = {
  MAX_HISTORY_ITEMS: 10,
  MIN_ITEMS_FOR_CHART: 2,
  CHART_HEIGHT: 250,
  PADDING: 40
};

// Typing Statistics
export const TYPING_STATS = {
  CHARS_PER_WORD: 5, // Standard measurement for WPM calculation
  MAX_HISTORY_SAVED: 50
};

// Sound Types
export const SOUND_TYPES = {
  CORRECT: 'correct',
  ERROR: 'error',
  COMPLETE: 'complete',
  START: 'start'
};

// Sound Frequencies (Hz)
export const SOUND_FREQUENCIES = {
  CORRECT: 800,
  ERROR: 200,
  COMPLETE: 1000,
  START: 600
};

// Sound Volumes (0 to 1)
export const SOUND_VOLUMES = {
  CORRECT: 0.08,
  ERROR: 0.15,
  COMPLETE: 0.25,
  START: 0.12
};

// Keyboard Shortcuts
export const KEYBOARD_SHORTCUTS = {
  RESTART: 'Control+r',
  PAUSE: 'Escape'
};

// Animation Durations (in ms)
export const ANIMATION_DURATIONS = {
  FADE: 300,
  SLIDE: 400,
  SCALE: 400
};

// Punctuation Marks
export const PUNCTUATION_MARKS = ['.', ',', '!', '?', ';', ':'];

// Custom Input Limits
export const INPUT_LIMITS = {
  MIN_TIME: 10,
  MAX_TIME: 300,
  MIN_WORDS: 5,
  MAX_WORDS: 500,
  MIN_CUSTOM_TEXT_LENGTH: 10,
  MAX_CUSTOM_TEXT_LENGTH: 5000
};

// Update Intervals (in ms)
export const UPDATE_INTERVALS = {
  STATS_UPDATE: 100,
  TIMER_UPDATE: 100
};

