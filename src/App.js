import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, PerspectiveCamera } from '@react-three/drei';
import * as math from 'mathjs';

// Theme colors based on the provided UI designs, with improved accessibility
const theme = {
  background: '#0A1128',
  secondary: '#1C2541',
  highlight: '#3A506B',
  primary: '#5BC0BE',
  accent: '#FF8F8F', // Brighter red for better contrast
  text: '#FFFFFF', // Pure white for better readability
  buttonText: '#FFFFFF',
  disabledButton: '#6c757d',
  lightText: '#E0E0E0'
};

// Basic styling for the 3D visualization container and controls
const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  width: '100vw',
  backgroundColor: theme.background,
  color: theme.text
};

const controlsStyle = {
  padding: '20px',
  backgroundColor: theme.secondary,
  boxShadow: `0 0 10px rgba(0, 0, 0, 0.5)`,
  zIndex: 10,
  borderBottom: `2px solid ${theme.primary}`
};

const canvasContainerStyle = {
  flex: '1',
  position: 'relative',
  backgroundColor: theme.secondary
};

const inputStyle = {
  backgroundColor: theme.highlight,
  color: theme.text,
  border: `1px solid ${theme.primary}`,
  padding: '8px 12px',
  borderRadius: '4px',
  margin: '0 10px',
  width: '250px',
  fontSize: '16px'
};

const buttonStyle = {
  padding: '8px 16px',
  backgroundColor: theme.primary,
  color: theme.buttonText,
  border: 'none',
  borderRadius: '4px',
  marginLeft: '10px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: 'bold',
  transition: 'all 0.2s ease'
};

const tabButtonStyle = (active) => ({
  padding: '8px 16px', 
  backgroundColor: active ? theme.primary : theme.highlight,
  color: theme.buttonText,
  border: 'none',
  borderRadius: '4px',
  marginRight: '8px',
  cursor: 'pointer',
  fontWeight: active ? 'bold' : 'normal'
});

const loadingStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: theme.text,
  fontSize: '24px',
  textAlign: 'center'
};

const infoBoxStyle = {
  position: 'absolute',
  top: '20px',
  right: '20px',
  backgroundColor: 'rgba(28, 37, 65, 0.8)',
  padding: '15px',
  borderRadius: '8px',
  border: `1px solid ${theme.primary}`,
  color: theme.text,
  maxWidth: '300px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  zIndex: 100
};

// Function component for the 3D axes
function Axes({ size = 10 }) {
  return (
    <group>
      {/* X axis */}
      <line>
        <bufferGeometry attach="geometry">
          <float32BufferAttribute 
            attach="attributes-position" 
            args={[[-size, 0, 0, size, 0, 0], 3]} 
          />
        </bufferGeometry>
        <lineBasicMaterial attach="material" color="red" linewidth={2} />
      </line>
      <Text position={[size + 0.5, 0, 0]} fontSize={0.5} color="red">
        X
      </Text>
      
      {/* Y axis */}
      <line>
        <bufferGeometry attach="geometry">
          <float32BufferAttribute 
            attach="attributes-position" 
            args={[[0, -size, 0, 0, size, 0], 3]} 
          />
        </bufferGeometry>
        <lineBasicMaterial attach="material" color="green" linewidth={2} />
      </line>
      <Text position={[0, size + 0.5, 0]} fontSize={0.5} color="green">
        Y
      </Text>
      
      {/* Z axis */}
      <line>
        <bufferGeometry attach="geometry">
          <float32BufferAttribute 
            attach="attributes-position" 
            args={[[0, 0, -size, 0, 0, size], 3]} 
          />
        </bufferGeometry>
        <lineBasicMaterial attach="material" color="blue" linewidth={2} />
      </line>
      <Text position={[0, 0, size + 0.5]} fontSize={0.5} color="blue">
        Z
      </Text>
    </group>
  );
}

// Grid component
function Grid({ size = 10, divisions = 10, color = '#444444' }) {
  return (
    <>
      {/* XZ plane grid */}
      <gridHelper args={[size, divisions, color, color]} rotation={[0, 0, 0]} />
      
      {/* XY plane grid */}
      <gridHelper args={[size, divisions, color, color]} rotation={[Math.PI / 2, 0, 0]} />
      
      {/* YZ plane grid */}
      <gridHelper args={[size, divisions, color, color]} rotation={[0, 0, Math.PI / 2]} />
    </>
  );
}

// Function component for the 3D surface visualization
function Surface({ equation, xMin, xMax, yMin, yMax, resolution = 50 }) {
  // Create a simple 3D surface based on the equation z = f(x,y)
  const positions = [];
  const indices = [];
  const colors = [];
  
  const xStep = (xMax - xMin) / resolution;
  const yStep = (yMax - yMin) / resolution;
  
  // Generate vertices
  for (let i = 0; i <= resolution; i++) {
    const x = xMin + i * xStep;
    
    for (let j = 0; j <= resolution; j++) {
      const y = yMin + j * yStep;
      
      // Calculate z value from the equation
      let z;
      try {
        const scope = { x, y };
        z = math.evaluate(equation, scope);
        if (isNaN(z) || !isFinite(z)) z = 0;
      } catch (e) {
        z = 0; // Default if evaluation fails
      }
      
      // Add vertex position
      positions.push(x, z, y); // Note: y and z are swapped for better 3D view
      
      // Add color based on height (z value)
      // Map z value to a color on a gradient from blue to red
      const normalizedZ = (z - xMin) / (xMax - xMin);
      const validZ = isNaN(normalizedZ) ? 0.5 : Math.max(0, Math.min(1, normalizedZ));
      
      // Generate a color gradient based on height (more accessible colors)
      const r = Math.min(1, Math.max(0, validZ));
      const g = Math.min(1, Math.max(0, 1 - Math.abs(validZ - 0.5) * 2));
      const b = Math.min(1, Math.max(0, 1 - validZ));
      
      colors.push(r, g, b);
    }
  }
  
  // Generate faces (triangles)
  for (let i = 0; i < resolution; i++) {
    for (let j = 0; j < resolution; j++) {
      const a = i * (resolution + 1) + j;
      const b = i * (resolution + 1) + j + 1;
      const c = (i + 1) * (resolution + 1) + j;
      const d = (i + 1) * (resolution + 1) + j + 1;
      
      // First triangle
      indices.push(a, c, b);
      
      // Second triangle
      indices.push(b, c, d);
    }
  }
  
  // Create the material with custom settings for better appearance
  return (
    <mesh receiveShadow castShadow>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={new Float32Array(positions)}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={new Float32Array(colors)}
          itemSize={3}
        />
        <bufferAttribute
          attach="index"
          array={new Uint32Array(indices)}
          itemSize={1}
        />
      </bufferGeometry>
      <meshStandardMaterial 
        vertexColors 
        side={2} 
        roughness={0.4}
        metalness={0.3}
        flatShading={false}
      />
    </mesh>
  );
}

// Area visualization component
function AreaVisualization({ equation, xMin, xMax, resolution = 50 }) {
  const positions = [];
  const indices = [];
  const colors = [];
  
  // Points along the curve
  const points = [];
  const xStep = (xMax - xMin) / resolution;
  
  // Generate the curve
  for (let i = 0; i <= resolution; i++) {
    const x = xMin + i * xStep;
    let y;
    try {
      y = math.evaluate(equation, { x });
      if (isNaN(y) || !isFinite(y)) y = 0;
    } catch (e) {
      y = 0;
    }
    points.push([x, y]);
  }
  
  // Create vertices for the area
  for (let i = 0; i < points.length; i++) {
    const [x, y] = points[i];
    
    // Top point (on the curve)
    positions.push(x, y, 0);
    colors.push(0.95, 0.4, 0.4); // Reddish color for the top (more accessible)
    
    // Bottom point (on the x-axis)
    positions.push(x, 0, 0);
    colors.push(0.4, 0.4, 0.95); // Blueish color for the bottom (more accessible)
  }
  
  // Create triangles
  for (let i = 0; i < points.length - 1; i++) {
    const topLeft = i * 2;
    const bottomLeft = i * 2 + 1;
    const topRight = (i + 1) * 2;
    const bottomRight = (i + 1) * 2 + 1;
    
    // First triangle (top-left, bottom-left, bottom-right)
    indices.push(topLeft, bottomLeft, bottomRight);
    
    // Second triangle (top-left, bottom-right, top-right)
    indices.push(topLeft, bottomRight, topRight);
  }
  
  return (
    <mesh position={[0, 0, -0.5]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={new Float32Array(positions)}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={new Float32Array(colors)}
          itemSize={3}
        />
        <bufferAttribute
          attach="index"
          array={new Uint32Array(indices)}
          itemSize={1}
        />
      </bufferGeometry>
      <meshStandardMaterial 
        vertexColors 
        side={2} 
        transparent={true}
        opacity={0.8}
      />
    </mesh>
  );
}

// Light setup component
function Lighting() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} castShadow />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
    </>
  );
}

// Loading component for Suspense fallback
const LoadingFallback = () => {
  return (
    <div style={loadingStyle}>
      <div>Loading 3D Visualization...</div>
      <div style={{ fontSize: '16px', marginTop: '10px' }}>
        Please ensure WebGL is enabled in your browser.
      </div>
    </div>
  );
};

// Example function templates
const functionTemplates = [
  { name: "Sine Wave", fn: "sin(x)", type: "2D" },
  { name: "Parabola", fn: "x^2", type: "2D" },
  { name: "Gaussian", fn: "exp(-x^2)", type: "2D" },
  { name: "Sine Surface", fn: "sin(x) * cos(y)", type: "3D" },
  { name: "Bowl", fn: "x^2 + y^2", type: "3D" },
  { name: "Ripple", fn: "sin(sqrt(x^2 + y^2))", type: "3D" },
  { name: "Wave", fn: "sin(3*x) * cos(3*y) * 0.5", type: "3D" }
];

// Main app component
function App() {
  const [equation, setEquation] = useState('sin(x) * cos(y)');
  const [areaEquation, setAreaEquation] = useState('sin(x)');
  const [xRange, setXRange] = useState([-3, 3]);
  const [yRange, setYRange] = useState([-3, 3]);
  const [hasError, setHasError] = useState(false);
  const [view, setView] = useState('3D'); // '3D' or 'Area'
  const [currentEquation, setCurrentEquation] = useState(''); // Tracks what's currently being rendered
  const [showHelp, setShowHelp] = useState(false);
  
  // Apply the equation when submitted
  const applyEquation = () => {
    if (view === '3D') {
      setCurrentEquation(equation);
    } else {
      setCurrentEquation(areaEquation);
    }
  };

  // Apply equation on mount
  useEffect(() => {
    setCurrentEquation(equation);
  }, []);
  
  // Handle equation input change
  const handleEquationChange = (e) => {
    const newEquation = e.target.value;
    setEquation(newEquation);
  };

  // Handle area equation input change
  const handleAreaEquationChange = (e) => {
    const newEquation = e.target.value;
    setAreaEquation(newEquation);
  };

  // Handle view change
  const handleViewChange = (newView) => {
    setView(newView);
    // Apply the current equation for the selected view
    if (newView === '3D') {
      setCurrentEquation(equation);
    } else {
      setCurrentEquation(areaEquation);
    }
  };

  // Apply a template function
  const applyTemplate = (template) => {
    if (template.type === '3D') {
      setEquation(template.fn);
      setView('3D');
      setCurrentEquation(template.fn);
    } else {
      setAreaEquation(template.fn);
      setView('Area');
      setCurrentEquation(template.fn);
    }
  };

  // Calculate some basic information about the function
  const calculateInfo = () => {
    try {
      // For 2D functions, calculate approximate area under curve
      if (view === 'Area') {
        const samples = 100;
        const dx = (xRange[1] - xRange[0]) / samples;
        let area = 0;
        
        for (let i = 0; i < samples; i++) {
          const x = xRange[0] + i * dx;
          let y = math.evaluate(areaEquation, { x });
          if (y > 0) area += y * dx;
        }
        
        return { area: area.toFixed(3) };
      } 
      // For 3D, we could calculate volume but that's more complex
      return {};
    } catch (e) {
      return {};
    }
  };
  
  const info = calculateInfo();
  
  // Error boundary for Canvas
  const handleError = (error) => {
    console.error('Error in 3D rendering:', error);
    setHasError(true);
  };
  
  return (
    <div style={containerStyle}>
      <div style={controlsStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h1 style={{ margin: 0, color: theme.text }}>3D Integral Explorer</h1>
          <button 
            onClick={() => setShowHelp(!showHelp)}
            style={{
              ...buttonStyle,
              backgroundColor: theme.highlight,
              marginLeft: '10px'
            }}
          >
            {showHelp ? 'Hide Help' : 'Show Help'}
          </button>
        </div>
        
        <div style={{ display: 'flex', marginBottom: '16px' }}>
          <button 
            onClick={() => handleViewChange('3D')} 
            style={tabButtonStyle(view === '3D')}
          >
            3D Surface
          </button>
          <button 
            onClick={() => handleViewChange('Area')} 
            style={tabButtonStyle(view === 'Area')}
          >
            Area Under Curve
          </button>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
          <label style={{ color: theme.text, minWidth: '150px' }}>
            Function f({view === '3D' ? 'x,y' : 'x'}) = 
          </label>
          <input
            type="text"
            value={view === '3D' ? equation : areaEquation}
            onChange={view === '3D' ? handleEquationChange : handleAreaEquationChange}
            style={inputStyle}
          />
          <button 
            onClick={applyEquation}
            style={buttonStyle}
          >
            Visualize
          </button>
          
          {info.area && (
            <span style={{ marginLeft: '16px', color: theme.accent, fontWeight: 'bold' }}>
              Area: {info.area}
            </span>
          )}
        </div>
        
        <div style={{ marginTop: '10px' }}>
          <div style={{ color: theme.lightText, marginBottom: '6px' }}>Example Functions:</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {functionTemplates
              .filter(t => t.type === view)
              .map((template, index) => (
                <button 
                  key={index}
                  onClick={() => applyTemplate(template)}
                  style={{
                    padding: '4px 8px',
                    backgroundColor: theme.highlight,
                    color: theme.buttonText,
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  {template.name}
                </button>
              ))}
          </div>
        </div>
      </div>
      
      <div style={canvasContainerStyle}>
        {showHelp && (
          <div style={infoBoxStyle}>
            <h3 style={{ margin: '0 0 10px 0' }}>How to Use</h3>
            <ul style={{ paddingLeft: '20px', margin: '0 0 10px 0' }}>
              <li>Type a mathematical function in the input field</li>
              <li>Click "Visualize" to render the function</li>
              <li>Click and drag to rotate the 3D view</li>
              <li>Scroll to zoom in and out</li>
              <li>Use the example buttons for quick function ideas</li>
            </ul>
            <p style={{ margin: '0' }}>In Area mode, the area under the curve is calculated and displayed.</p>
          </div>
        )}
      
        {hasError ? (
          <div style={loadingStyle}>
            <p>3D rendering is not available.</p>
            <p>Please check your browser's WebGL support.</p>
            <p>
              <a 
                href="/webgl-check.html" 
                style={{ color: theme.primary, textDecoration: 'underline' }}
              >
                Click here to check WebGL support
              </a>
            </p>
          </div>
        ) : (
          <Suspense fallback={<LoadingFallback />}>
            <Canvas 
              shadows
              dpr={[1, 2]}
              onError={handleError}
              style={{ width: '100%', height: '100%' }}
            >
              <PerspectiveCamera makeDefault position={[5, 5, 5]} fov={50} />
              <Lighting />
              <OrbitControls 
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                dampingFactor={0.1}
                minDistance={3}
                maxDistance={20}
              />
              <Axes size={5} />
              <Grid />
              
              {view === '3D' && (
                <Surface
                  equation={currentEquation}
                  xMin={xRange[0]}
                  xMax={xRange[1]}
                  yMin={yRange[0]}
                  yMax={yRange[1]}
                  resolution={40}
                />
              )}
              
              {view === 'Area' && (
                <AreaVisualization
                  equation={currentEquation}
                  xMin={xRange[0]}
                  xMax={xRange[1]}
                  resolution={100}
                />
              )}
            </Canvas>
          </Suspense>
        )}
      </div>
    </div>
  );
}

export default App;