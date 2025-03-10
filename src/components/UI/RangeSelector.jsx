import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { commonStyles } from '../../styles/theme';

const RangeSelector = () => {
  const { xRange, setXRange, yRange, setYRange, view, highContrastMode } = useAppContext();
  
  // Helper function to parse and validate range input
  const handleRangeChange = (rangeType, index, value) => {
    const numValue = parseFloat(value);
    
    if (isNaN(numValue)) return;
    
    if (rangeType === 'x') {
      const newRange = [...xRange];
      newRange[index] = numValue;
      // Ensure min < max
      if (index === 0 && numValue >= newRange[1]) {
        newRange[1] = numValue + 1;
      } else if (index === 1 && numValue <= newRange[0]) {
        newRange[0] = numValue - 1;
      }
      setXRange(newRange);
    } else {
      const newRange = [...yRange];
      newRange[index] = numValue;
      // Ensure min < max
      if (index === 0 && numValue >= newRange[1]) {
        newRange[1] = numValue + 1;
      } else if (index === 1 && numValue <= newRange[0]) {
        newRange[0] = numValue - 1;
      }
      setYRange(newRange);
    }
  };
  
  const inputStyle = {
    ...commonStyles.inputStyle(highContrastMode),
    width: '70px',
    margin: '0 5px',
  };
  
  return (
    <div style={{ 
      display: 'flex', 
      flexWrap: 'wrap', 
      gap: '20px',
      marginTop: '16px',
      color: commonStyles.getColor('text', highContrastMode)
    }}>
      <div>
        <label htmlFor="x-min">X Range:</label>
        <input
          id="x-min"
          type="number"
          value={xRange[0]}
          onChange={(e) => handleRangeChange('x', 0, e.target.value)}
          style={inputStyle}
          aria-label="X minimum value"
        />
        <span>to</span>
        <input
          id="x-max"
          type="number"
          value={xRange[1]}
          onChange={(e) => handleRangeChange('x', 1, e.target.value)}
          style={inputStyle}
          aria-label="X maximum value"
        />
      </div>
      
      {view === '3D' && (
        <div>
          <label htmlFor="y-min">Y Range:</label>
          <input
            id="y-min"
            type="number"
            value={yRange[0]}
            onChange={(e) => handleRangeChange('y', 0, e.target.value)}
            style={inputStyle}
            aria-label="Y minimum value"
          />
          <span>to</span>
          <input
            id="y-max"
            type="number"
            value={yRange[1]}
            onChange={(e) => handleRangeChange('y', 1, e.target.value)}
            style={inputStyle}
            aria-label="Y maximum value"
          />
        </div>
      )}
    </div>
  );
};

export default RangeSelector;