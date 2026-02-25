// History Context Provider

import React, { createContext, useContext } from 'react';
import useHistory from '../hooks/useHistory';

// Create History Context
const HistoryContext = createContext(undefined);

/**
 * History Provider Component
 * Provides history state and functions to all children
 */
export const HistoryProvider = ({ children }) => {
  const historyState = useHistory();

  return (
    <HistoryContext.Provider value={historyState}>
      {children}
    </HistoryContext.Provider>
  );
};

/**
 * Custom hook to use History Context
 * @returns {object} - History state and functions
 */
export const useHistoryContext = () => {
  const context = useContext(HistoryContext);
  
  if (context === undefined) {
    throw new Error('useHistoryContext must be used within a HistoryProvider');
  }
  
  return context;
};

export default HistoryContext;