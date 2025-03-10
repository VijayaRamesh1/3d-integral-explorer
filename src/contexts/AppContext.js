import React, { createContext, useState, useContext } from 'react';

// Create the context
const AppContext = createContext();

// Custom hook to use the context
export const useAppContext = () => useContext(AppContext);

// Provider component
export const AppProvider = ({ children }) => {
  // State variables
  const [view, setView] = useState('3d'); // Default to 3D view
  const [showHelp, setShowHelp] = useState(false);
  const [functionType, setFunctionType] = useState('polynomial');
  const [integralLimits, setIntegralLimits] = useState({
    x: { min: -5, max: 5 },
    y: { min: -5, max: 5 },
  });
  const [resolution, setResolution] = useState(30); // Grid resolution
  const [theme, setTheme] = useState('light');

  // Values to be provided by context
  const contextValue = {
    view,
    setView,
    showHelp,
    setShowHelp,
    functionType,
    setFunctionType,
    integralLimits,
    setIntegralLimits,
    resolution,
    setResolution,
    theme,
    setTheme,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
