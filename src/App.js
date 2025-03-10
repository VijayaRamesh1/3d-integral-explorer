import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, PerspectiveCamera } from '@react-three/drei';
import * as math from 'mathjs';

// Theme colors based on the provided UI designs
const theme = {
  background: '#0A1128',
  secondary: '#1C2541',
  highlight: '#3A506B',
  primary: '#5BC0BE',
  accent: '#FF6B6B',
  text: '#F0F4FD'
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

const loadingStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: theme.text,
  fontSize: '24px',
  textAlign: 'center'
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
      
      // Generate a color gradient based on height
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
    colors.push(0.9, 0.2, 0.4); // Reddish color for the top
    
    // Bottom point (on the x-axis)
    positions.push(x, 0, 0);
    colors.push(0.4, 0.2, 0.9); // Blueish color for the bottom
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

// Main app component
function App() {
  const [equation, setEquation] = useState('sin(x) * cos(y)');
  const [areaEquation, setAreaEquation] = useState('sin(x)');
  const [xRange, setXRange] = useState([-3, 3]);
  const [yRange, setYRange] = useState([-3, 3]);
  const [hasError, setHasError] = useState(false);
  const [view, setView] = useState('3D'); // '3D' or 'Area'
  
  // Handle equation input change
  const handleEquationChange = (e) => {
    const newEquation = e.target.value;
    setEquation(newEquation);
    
    // Also update the area equation for simple functions
    if (!newEquation.includes('y')) {
      setAreaEquation(newEquation);
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
        <h1 style={{ marginBottom: '16px', color: theme.text }}>3D Integral Explorer</h1>
        
        <div style={{ display: 'flex', marginBottom: '16px' }}>
          <button 
            onClick={() => setView('3D')} 
            style={{ 
              padding: '8px 16px', 
              backgroundColor: view === '3D' ? theme.primary : theme.highlight,
              color: theme.text,
              border: 'none',
              borderRadius: '4px',
              marginRight: '8px',
              cursor: 'pointer'
            }}
          >
            3D Surface
          </button>
          <button 
            onClick={() => setView('Area')} 
            style={{ 
              padding: '8px 16px', 
              backgroundColor: view === 'Area' ? theme.primary : theme.highlight,
              color: theme.text,
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Area Under Curve
          </button>
        </div>
        
        <div>
          <label style={{ color: theme.text }}>
            Function f({view === '3D' ? 'x,y' : 'x'}) = 
            <input
              type="text"
              value={view === '3D' ? equation : areaEquation}
              onChange={view === '3D' ? handleEquationChange : (e) => setAreaEquation(e.target.value)}
              style={inputStyle}
            />
          </label>
          
          {info.area && (
            <span style={{ marginLeft: '16px', color: theme.accent }}>
              Area: {info.area}
            </span>
          )}
        </div>
      </div>
      
      <div style={canvasContainerStyle}>
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
                  equation={equation}
                  xMin={xRange[0]}
                  xMax={xRange[1]}
                  yMin={yRange[0]}
                  yMax={yRange[1]}
                  resolution={40}
                />
              )}
              
              {view === 'Area' && (
                <AreaVisualization
                  equation={areaEquation}
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