import React from 'react';
import { useAppContext } from '../../contexts/AppContext';

const Grid = ({ size = 10, divisions = 10, color = '#444444' }) => {
  const { highContrastMode } = useAppContext();
  
  // Use a brighter color for high contrast mode
  const gridColor = highContrastMode ? '#888888' : color;
  
  return (
    <>
      {/* XZ plane grid */}
      <gridHelper args={[size, divisions, gridColor, gridColor]} rotation={[0, 0, 0]} />
      
      {/* XY plane grid */}
      <gridHelper args={[size, divisions, gridColor, gridColor]} rotation={[Math.PI / 2, 0, 0]} />
      
      {/* YZ plane grid */}
      <gridHelper args={[size, divisions, gridColor, gridColor]} rotation={[0, 0, Math.PI / 2]} />
    </>
  );
};

export default Grid;