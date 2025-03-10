import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { commonStyles } from '../../styles/theme';

const HelpPanel = () => {
  const { highContrastMode } = useAppContext();
  
  return (
    <div style={commonStyles.infoBoxStyle(highContrastMode)}>
      <h3 style={{ margin: '0 0 10px 0', color: commonStyles.getColor('primary', highContrastMode) }}>
        How to Use
      </h3>
      
      <ul style={{ paddingLeft: '20px', margin: '0 0 15px 0' }}>
        <li style={{ marginBottom: '8px' }}>Type a mathematical function in the input field and click "Visualize"</li>
        <li style={{ marginBottom: '8px' }}>Switch between 3D Surface and Area Under Curve views using the tabs</li>
        <li style={{ marginBottom: '8px' }}>Click and drag to rotate the 3D view; scroll to zoom in/out</li>
        <li style={{ marginBottom: '8px' }}>Try the example functions for quick demonstrations</li>
        <li style={{ marginBottom: '8px' }}>Adjust X and Y ranges to focus on different parts of the function</li>
        <li style={{ marginBottom: '8px' }}>Use the "Show Explanation" button to learn about the mathematical concepts</li>
      </ul>
      
      <h3 style={{ margin: '0 0 10px 0', color: commonStyles.getColor('primary', highContrastMode) }}>
        Keyboard Controls
      </h3>
      
      <ul style={{ paddingLeft: '20px', margin: '0 0 15px 0' }}>
        <li style={{ marginBottom: '8px' }}><strong>Arrow keys</strong>: Rotate the camera when the 3D view has focus</li>
        <li style={{ marginBottom: '8px' }}><strong>+/-</strong>: Zoom in/out</li>
        <li style={{ marginBottom: '8px' }}><strong>R</strong>: Reset camera position</li>
        <li style={{ marginBottom: '8px' }}><strong>Tab</strong>: Navigate between interactive elements</li>
        <li style={{ marginBottom: '8px' }}><strong>Space/Enter</strong>: Activate buttons when focused</li>
      </ul>
      
      <h3 style={{ margin: '0 0 10px 0', color: commonStyles.getColor('primary', highContrastMode) }}>
        Accessibility Features
      </h3>
      
      <ul style={{ paddingLeft: '20px', margin: '0' }}>
        <li style={{ marginBottom: '8px' }}>High contrast mode for better visibility</li>
        <li style={{ marginBottom: '8px' }}>Full keyboard navigation support</li>
        <li style={{ marginBottom: '8px' }}>Educational explanations with clear descriptions</li>
        <li style={{ marginBottom: '8px' }}>Error messages for invalid inputs</li>
      </ul>
    </div>
  );
};

export default HelpPanel;