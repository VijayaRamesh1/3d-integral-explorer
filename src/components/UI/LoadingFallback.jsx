import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { commonStyles } from '../../styles/theme';

const LoadingFallback = () => {
  const { highContrastMode } = useAppContext();
  
  return (
    <div style={commonStyles.loadingStyle(highContrastMode)}>
      <div role="status" aria-live="polite">
        <div>Loading 3D Visualization...</div>
        <div style={{ fontSize: '16px', marginTop: '10px' }}>
          Please ensure WebGL is enabled in your browser.
        </div>
      </div>
    </div>
  );
};

export default LoadingFallback;