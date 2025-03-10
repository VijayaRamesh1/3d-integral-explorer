// Theme configuration and style utilities for the application

// Color palette
const colors = {
  // Main colors
  primary: {
    default: '#3090ff', // Blue
    highContrast: '#0059b3' // Darker blue for better contrast
  },
  secondary: {
    default: '#f8f9fa', // Light gray
    highContrast: '#e9ecef' // Slightly darker for better contrast
  },
  background: {
    default: '#ffffff', // White
    highContrast: '#f0f0f0' // Off-white for reduced eye strain
  },
  text: {
    default: '#333333', // Dark gray
    highContrast: '#000000' // Black for maximum contrast
  },
  highlight: {
    default: '#e6f4ff', // Light blue
    highContrast: '#cce5ff' // Slightly darker light blue
  },
  success: {
    default: '#28a745', // Green
    highContrast: '#1e7e34' // Darker green
  },
  warning: {
    default: '#ffc107', // Yellow
    highContrast: '#d39e00' // Darker yellow
  },
  error: {
    default: '#dc3545', // Red
    highContrast: '#bd2130' // Darker red
  },
  
  // Function visualization colors
  functionSurface: {
    default: '#3090ff', // Blue
    highContrast: '#0059b3' // Darker blue
  },
  integralVolume: {
    default: 'rgba(40, 167, 69, 0.6)', // Semi-transparent green
    highContrast: 'rgba(30, 126, 52, 0.7)' // Darker green, slightly more opaque
  },
  gridLines: {
    default: '#cccccc', // Light gray
    highContrast: '#888888' // Darker gray
  },
  axisLines: {
    default: '#333333', // Dark gray
    highContrast: '#000000' // Black
  }
};

// Typography
const typography = {
  fontFamily: "'Roboto', 'Helvetica Neue', sans-serif",
  fontSize: {
    small: '0.875rem',
    normal: '1rem',
    large: '1.25rem',
    xlarge: '1.5rem',
    xxlarge: '2rem'
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    bold: 700
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    loose: 1.75
  }
};

// Spacing
const spacing = {
  xs: '0.25rem', // 4px
  sm: '0.5rem',  // 8px
  md: '1rem',    // 16px
  lg: '1.5rem',  // 24px
  xl: '2rem',    // 32px
  xxl: '3rem'    // 48px
};

// Borders and shadows
const effects = {
  borderRadius: {
    sm: '0.125rem', // 2px
    md: '0.25rem',  // 4px
    lg: '0.5rem',   // 8px
    xl: '1rem'      // 16px
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.15)'
  }
};

// Common styles utility functions
export const commonStyles = {
  getColor: (colorName, isHighContrast = false) => {
    const mode = isHighContrast ? 'highContrast' : 'default';
    return colors[colorName] ? colors[colorName][mode] : colors.text[mode];
  },
  getFontSize: (size) => {
    return typography.fontSize[size] || typography.fontSize.normal;
  },
  getSpacing: (size) => {
    return spacing[size] || spacing.md;
  },
  getBorderRadius: (size) => {
    return effects.borderRadius[size] || effects.borderRadius.md;
  },
  getShadow: (size) => {
    return effects.shadows[size] || effects.shadows.md;
  }
};

// Export theme as the default
export default {
  colors,
  typography,
  spacing,
  effects,
  commonStyles
};
