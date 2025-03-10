import React from 'react';
import { Link } from 'react-router-dom';

function HelpPanel() {
  return (
    <div className="help-panel">
      <h2>3D Integral Explorer - Quick Help</h2>
      
      <div className="help-section">
        <h3>Basic Controls</h3>
        <ul>
          <li><strong>Rotate:</strong> Click and drag to rotate the view</li>
          <li><strong>Pan:</strong> Right-click and drag to move the view</li>
          <li><strong>Zoom:</strong> Scroll to zoom in and out</li>
          <li><strong>Reset:</strong> Double-click to reset the camera</li>
        </ul>
      </div>
      
      <div className="help-section">
        <h3>Features</h3>
        <ul>
          <li>
            <strong>3D View:</strong> Visualize functions in 3D space
          </li>
          <li>
            <strong>Integration Bounds:</strong> Set the limits of integration with the range selectors
          </li>
          <li>
            <strong>Function Templates:</strong> Choose from predefined mathematical functions
          </li>
          <li>
            <strong>Real-time Calculation:</strong> See volume calculations update as you adjust parameters
          </li>
        </ul>
      </div>
      
      <div className="help-section">
        <h3>Mathematical Concepts</h3>
        <p>
          This tool helps visualize double integrals by showing the volume under a surface.
          The volume is calculated as:
        </p>
        <div className="formula">
          ∫<sub>a</sub><sup>b</sup>∫<sub>c</sub><sup>d</sup> f(x,y) dxdy
        </div>
        <p>
          Where a, b, c, and d are the integration limits you set with the range selectors.
        </p>
      </div>
      
      <div className="help-section">
        <h3>Need More Help?</h3>
        <p>
          Check out our <Link to="/getting-started">Getting Started Guide</Link> for more detailed instructions
          and explanations of the mathematical concepts.
        </p>
      </div>
    </div>
  );
}

export default HelpPanel;
