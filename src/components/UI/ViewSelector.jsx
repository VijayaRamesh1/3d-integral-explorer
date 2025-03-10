import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { commonStyles } from '../../styles/theme';

const ViewSelector = () => {
  const { view, setView, highContrastMode } = useAppContext();
  
  return (
    <div style={{ display: 'flex', marginBottom: '16px' }}>
      <button 
        onClick={() => setView('3D')} 
        style={commonStyles.tabButtonStyle(view === '3D', highContrastMode)}
        aria-pressed={view === '3D'}
        aria-label="3D Surface view"
      >
        3D Surface
      </button>
      <button 
        onClick={() => setView('Area')} 
        style={commonStyles.tabButtonStyle(view === 'Area', highContrastMode)}
        aria-pressed={view === 'Area'}
        aria-label="Area Under Curve view"
      >
        Area Under Curve
      </button>
    </div>
  );
};

export default ViewSelector;