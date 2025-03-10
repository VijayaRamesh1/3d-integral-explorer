import React from 'react';

function RangeSelector({ limits, setLimits }) {
  const handleChange = (axis, bound, value) => {
    setLimits({
      ...limits,
      [axis]: {
        ...limits[axis],
        [bound]: parseFloat(value)
      }
    });
  };
  
  return (
    <div className="range-selector">
      <h3>Integration Bounds</h3>
      
      <div className="range-controls">
        <div className="range-group">
          <label>X Range:</label>
          <div className="range-inputs">
            <div className="input-group">
              <label>Min:</label>
              <input
                type="number"
                value={limits.x.min}
                onChange={(e) => handleChange('x', 'min', e.target.value)}
                step="0.5"
              />
            </div>
            <div className="input-group">
              <label>Max:</label>
              <input
                type="number"
                value={limits.x.max}
                onChange={(e) => handleChange('x', 'max', e.target.value)}
                step="0.5"
              />
            </div>
          </div>
        </div>
        
        <div className="range-group">
          <label>Y Range:</label>
          <div className="range-inputs">
            <div className="input-group">
              <label>Min:</label>
              <input
                type="number"
                value={limits.y.min}
                onChange={(e) => handleChange('y', 'min', e.target.value)}
                step="0.5"
              />
            </div>
            <div className="input-group">
              <label>Max:</label>
              <input
                type="number"
                value={limits.y.max}
                onChange={(e) => handleChange('y', 'max', e.target.value)}
                step="0.5"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RangeSelector;
