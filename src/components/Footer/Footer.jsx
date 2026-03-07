// Footer Component

import React from 'react';
import styles from './Footer.module.css';

/**
 * Footer Component
 * Displays copyright and developer information
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>
          &copy; {currentYear} TypeMasterPro - Professional Typing Speed Test. 
          Improve your typing skills with precision and style.
        </p>
        <p className={styles.developerInfo}>
          Designed and Developed by{' '}
          <a
            href="https://yasirawaninfo.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.developerLink}
          >
            Muhammad   Yasir 
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;