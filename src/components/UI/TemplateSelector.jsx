import React from 'react';
import { useAppContext } from '../../contexts/AppContext';

function TemplateSelector() {
  const { functionType, setFunctionType } = useAppContext();
  
  const templates = [
    { id: 'polynomial', label: 'Polynomial', formula: 'f(x,y) = x² + y²' },
    { id: 'trigonometric', label: 'Trigonometric', formula: 'f(x,y) = sin(x) × cos(y)' },
    { id: 'exponential', label: 'Exponential', formula: 'f(x,y) = e^(-(x² + y²)/4)' },
  ];
  
  return (
    <div className="template-selector">
      <h3>Function Templates</h3>
      
      <div className="template-options">
        {templates.map(template => (
          <div 
            key={template.id}
            className={`template-card ${functionType === template.id ? 'selected' : ''}`}
            onClick={() => setFunctionType(template.id)}
          >
            <div className="template-header">
              <h4>{template.label}</h4>
            </div>
            <div className="template-formula">
              {template.formula}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TemplateSelector;
