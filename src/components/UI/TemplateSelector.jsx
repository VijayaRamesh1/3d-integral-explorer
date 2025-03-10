import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { commonStyles } from '../../styles/theme';

const TemplateSelector = () => {
  const { functionTemplates, view, applyTemplate, highContrastMode } = useAppContext();
  
  const templates = functionTemplates[view === '3D' ? '3D' : '2D'] || [];
  
  return (
    <div style={{ marginTop: '16px' }}>
      <div style={{ color: commonStyles.getColor('lightText', highContrastMode), marginBottom: '8px' }}>
        <strong>Example Functions:</strong>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {templates.map((template, index) => (
          <button 
            key={index}
            onClick={() => applyTemplate({ ...template, category: view })}
            style={{
              padding: '4px 8px',
              backgroundColor: commonStyles.getColor('highlight', highContrastMode),
              color: commonStyles.getColor('buttonText', highContrastMode),
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
            title={template.description}
            aria-label={`Apply ${template.name} function: ${template.fn}`}
          >
            {template.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;