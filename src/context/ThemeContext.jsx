// Theme Context Provider



// Create Theme Context
const ThemeContext = createContext(undefined);

/**
 * Theme Provider Component
 * Provides theme state and functions to all children
 */
export const ThemeProvider = ({ children }) => {
  const themeState = useTheme();

  return (
    <ThemeContext.Provider value={themeState}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Custom hook to use Theme Context
 * @returns {object} - Theme state and functions
 */
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  
  return context;
};

export default ThemeContext;