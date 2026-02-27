// Navbar component
// Navbar Component

import React from 'react';
import { useThemeContext } from '../../context/ThemeContext';
import Button from '../Common/Button/Button';
import styles from './Navbar.module.css';

/**
 * Navbar Component
 * @param {Function} onNewTest - New test handler
 * @param {Function} onShowHistory - Show history handler
 */
const Navbar = ({ onNewTest, onShowHistory }) => {
  const { toggleTheme, getThemeIcon } = useThemeContext();

  const handleLogoClick = () => {
    if (window.confirm('Are you sure you want to restart? Your current progress will be lost.')) {
      window.location.reload();
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContent}>
        <div className={styles.logo} onClick={handleLogoClick}>
          TypeMasterPro
        </div>
        
        <div className={styles.navControls}>
          <Button variant="secondary" onClick={onShowHistory}>
            📊 History
          </Button>
          <Button variant="primary" onClick={onNewTest}>
            🔄 New Test
          </Button>
          <div 
            className={styles.themeToggle} 
            onClick={toggleTheme}
            role="button"
            aria-label="Toggle theme"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleTheme();
              }
            }}
          >
            <span className={styles.themeIcon}>{getThemeIcon()}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;