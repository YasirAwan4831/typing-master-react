// Text generation utilities

import { wordsList } from '../data/words';
import { sentences } from '../data/sentences';
import { paragraphs } from '../data/paragraphs';
import { codeSnippets } from '../data/codeSnippets';
import { getRandomElement, capitalize, randomNumber, shuffleArray } from './helpers';
import { PUNCTUATION_MARKS } from './constants';

/**
 * Generate random words
 * @param {number} count - Number of words to generate
 * @param {object} settings - Settings object with capitals, numbers, punctuation options
 * @returns {string} - Generated text
 */
export const generateWords = (count, settings = {}) => {
  const { capitals = false, numbers = false, punctuation = false } = settings;
  const words = [];

  for (let i = 0; i < count; i++) {
    let word = getRandomElement(wordsList);

    // Add capitals randomly
    if (capitals && Math.random() > 0.7) {
      word = capitalize(word);
    }

    // Add numbers randomly
    if (numbers && Math.random() > 0.8) {
      word += randomNumber(0, 99);
    }

    words.push(word);
  }

  let text = words.join(' ');

  // Add punctuation
  if (punctuation) {
    text = addPunctuation(text);
  }

  return text;
};

/**
 * Generate random sentences
 * @param {number} count - Number of sentences to generate
 * @returns {string} - Generated text
 */
export const generateSentences = (count) => {
  const selectedSentences = [];
  
  for (let i = 0; i < count; i++) {
    selectedSentences.push(getRandomElement(sentences));
  }

  return selectedSentences.join(' ');
};

/**
 * Generate paragraph text
 * @returns {string} - Random paragraph
 */
export const generateParagraph = () => {
  return getRandomElement(paragraphs);
};

/**
 * Generate code snippets
 * @param {number} count - Number of code snippets
 * @returns {string} - Generated code
 */
export const generateCode = (count) => {
  const selectedSnippets = [];
  
  for (let i = 0; i < count; i++) {
    selectedSnippets.push(getRandomElement(codeSnippets));
  }

  return selectedSnippets.join(' ');
};

/**
 * Add punctuation to text
 * @param {string} text - Input text
 * @returns {string} - Text with punctuation
 */
export const addPunctuation = (text) => {
  const words = text.split(' ');

  for (let i = 0; i < words.length; i++) {
    // Add punctuation randomly (15% chance)
    if (Math.random() > 0.85) {
      const punctuation = getRandomElement(PUNCTUATION_MARKS);
      words[i] += punctuation;
    }
  }

  return words.join(' ');
};

/**
 * Generate text based on type and settings
 * @param {string} textType - Type of text (words, sentences, paragraph, code, custom)
 * @param {number} wordCount - Number of words (for words mode)
 * @param {object} settings - Settings object
 * @param {string} customText - Custom text (if type is custom)
 * @returns {string} - Generated text
 */
export const generateText = (textType, wordCount = 100, settings = {}, customText = '') => {
  switch (textType) {
    case 'words':
      return generateWords(wordCount, settings);
    
    case 'sentences':
      const sentenceCount = Math.ceil(wordCount / 8); // Approx 8 words per sentence
      return generateSentences(sentenceCount);
    
    case 'paragraph':
      return generateParagraph();
    
    case 'code':
      const snippetCount = Math.ceil(wordCount / 5); // Approx 5 words per snippet
      return generateCode(snippetCount);
    
    case 'custom':
      return customText || generateWords(wordCount, settings);
    
    default:
      return generateWords(wordCount, settings);
  }
};

/**
 * Split text into characters for display
 * @param {string} text - Input text
 * @returns {Array} - Array of character objects
 */
export const splitTextToChars = (text) => {
  return text.split('').map((char, index) => ({
    char,
    index,
    isSpace: char === ' ',
    status: 'pending' // pending, correct, incorrect, current
  }));
};

/**
 * Split text into words
 * @param {string} text - Input text
 * @returns {Array} - Array of words
 */
export const splitTextToWords = (text) => {
  return text.trim().split(/\s+/);
};

