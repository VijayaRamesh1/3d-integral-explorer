import React from 'react';
import { useAppContext } from '../../contexts/AppContext';

function ViewSelector() {
  const { view, setView } = useAppContext();
  
  const views = [
    { id: '3d', label: '3D View' },
    { id: '2d', label: '2D View' },
    { id: 'slice', label: 'Slice View' }
  ];
  
  return (
    <div className="view-selector">
      <h3>Visualization Mode</h3>
      <div className="view-options">
        {views.map(viewOption => (
          <button
            key={viewOption.id}
            className={`view-button ${view === viewOption.id ? 'selected' : ''}`}
            onClick={() => setView(viewOption.id)}
          >
            {viewOption.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ViewSelector;
