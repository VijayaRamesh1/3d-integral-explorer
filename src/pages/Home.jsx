import React, { useState, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Grid from '../components/3D/Grid';
import Lighting from '../components/3D/Lighting';
import ViewSelector from '../components/UI/ViewSelector';
import RangeSelector from '../components/UI/RangeSelector';
import TemplateSelector from '../components/UI/TemplateSelector';
import HelpPanel from '../components/UI/HelpPanel';

function Home() {
  const { 
    view, 
    showHelp, 
    setShowHelp,
    integralLimits,
    setIntegralLimits,
    functionType
  } = useAppContext();
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading resources
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading 3D Integral Explorer...</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>3D Integral Explorer</h1>
        <button 
          className="help-button"
          onClick={() => setShowHelp(!showHelp)}
        >
          {showHelp ? 'Hide Help' : 'Show Help'}
        </button>
      </header>
      
      {showHelp && <HelpPanel />}
      
      <div className="main-content">
        <div className="controls-panel">
          <ViewSelector />
          <RangeSelector 
            limits={integralLimits}
            setLimits={setIntegralLimits}
          />
          <TemplateSelector />
        </div>
        
        <div className="visualization-area">
          <Canvas camera={{ position: [5, 5, 5], fov: 60 }}>
            <Lighting />
            <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
            <Grid 
              size={10} 
              divisions={20} 
              limits={integralLimits}
              functionType={functionType}
            />
          </Canvas>
        </div>
        
        <div className="calculation-panel">
          <h2>Calculation Results</h2>
          <div className="result">
            <label>Volume:</label>
            <span>42.123 cubic units</span>
          </div>
          <div className="result">
            <label>Bounds:</label>
            <span>x: [{integralLimits.x.min}, {integralLimits.x.max}], y: [{integralLimits.y.min}, {integralLimits.y.max}]</span>
          </div>
          <div className="formula">
            <h3>Integral Formula:</h3>
            <div className="formula-display">
              ∫∫ f(x,y) dxdy = 42.123
            </div>
          </div>
        </div>
      </div>
      
      <footer className="app-footer">
        <p>© 2025 3D Integral Explorer - Educational Tool</p>
      </footer>
    </div>
  );
}

export default Home;
