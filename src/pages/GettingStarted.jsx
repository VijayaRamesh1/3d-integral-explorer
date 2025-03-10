import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';

function GettingStarted() {
  const { theme } = useAppContext();
  
  return (
    <div className={`getting-started-container ${theme}`}>
      <header className="page-header">
        <h1>Getting Started with 3D Integral Explorer</h1>
        <nav className="navigation">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/webgl-check" className="nav-link">Check WebGL Support</Link>
        </nav>
      </header>
      
      <main className="content">
        <section className="section">
          <h2>What is 3D Integral Explorer?</h2>
          <p>
            The 3D Integral Explorer is an interactive educational tool designed to help
            students visualize and understand multivariable calculus concepts, particularly
            double integrals and volume calculations.
          </p>
          <p>
            By representing mathematical functions as 3D surfaces and allowing you to adjust
            parameters in real-time, this tool bridges the gap between abstract mathematical
            concepts and intuitive visual understanding.
          </p>
        </section>
        
        <section className="section">
          <h2>Basic Controls</h2>
          <ul className="controls-list">
            <li><strong>Orbit</strong> - Click and drag to rotate the 3D view</li>
            <li><strong>Pan</strong> - Right-click and drag to move the view</li>
            <li><strong>Zoom</strong> - Scroll to zoom in and out</li>
            <li><strong>Reset</strong> - Double-click to reset the camera position</li>
          </ul>
        </section>
        
        <section className="section">
          <h2>Working with Functions</h2>
          <p>
            You can choose from predefined function templates or create your own using the
            function editor. The application supports various types of functions:
          </p>
          <ul>
            <li>Polynomial functions</li>
            <li>Trigonometric functions</li>
            <li>Exponential functions</li>
            <li>Custom combinations of the above</li>
          </ul>
          <p>
            Use the range selector to adjust the domain of integration, and watch how
            the calculated volume changes in real-time.
          </p>
        </section>
        
        <section className="section">
          <h2>View Options</h2>
          <p>
            You can toggle between different visualization modes:
          </p>
          <ul>
            <li><strong>3D Surface</strong> - Visualize the entire function surface</li>
            <li><strong>Slice View</strong> - See cross-sections of the surface</li>
            <li><strong>Volume View</strong> - Highlight the region being integrated</li>
            <li><strong>Grid View</strong> - See just the coordinate grid</li>
          </ul>
        </section>
        
        <section className="section">
          <h2>System Requirements</h2>
          <p>
            3D Integral Explorer requires a browser with WebGL support. Most modern
            browsers support WebGL, but you can check your browser's compatibility by
            visiting the <Link to="/webgl-check">WebGL Check</Link> page.
          </p>
        </section>
      </main>
      
      <footer className="page-footer">
        <p>Ready to explore? <Link to="/" className="cta-link">Go to the Explorer</Link></p>
        <p>© 2025 3D Integral Explorer - Educational Tool</p>
      </footer>
    </div>
  );
}

export default GettingStarted;
