import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as math from 'mathjs';

// Basic styling for the 3D visualization container and controls
const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  width: '100vw',
  backgroundColor: '#f0f0f0',
};

const controlsStyle = {
  padding: '20px',
  backgroundColor: 'rgb(255, 255, 255)',
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 10px',
  zIndex: 10
};

const canvasContainerStyle = {
  flex: '1',
  position: 'relative',
  backgroundColor: '#e0e0e0'
};

const loadingStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: '#333',
  fontSize: '24px'
};

// Function component for the 3D surface visualization
function Surface({ equation, xMin, xMax, yMin, yMax, resolution }) {
  // Create a simple 3D surface based on the equation z = f(x,y)
  const positions = [];
  const indices = [];
  const colors = [];
  
  // Generate vertices
  for (let i = 0; i <= resolution; i++) {
    const x = xMin + (xMax - xMin) * (i / resolution);
    for (let j = 0; j <= resolution; j++) {
      const y = yMin + (yMax - yMin) * (j / resolution);
      
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
      const normalizedZ = (z - xMin) / (xMax - xMin);
      const validZ = isNaN(normalizedZ) ? 0.5 : Math.max(0, Math.min(1, normalizedZ));
      colors.push(0.5, validZ, 1-validZ);
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
  
  return (
    <mesh>
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
          array={new Uint16Array(indices)}
          itemSize={1}
        />
      </bufferGeometry>
      <meshStandardMaterial vertexColors side={2} />
    </mesh>
  );
}

// Loading component for Suspense fallback
const LoadingFallback = () => {
  return <div style={loadingStyle}>Loading 3D View...</div>;
};

// Main app component
function App() {
  const [equation, setEquation] = useState('sin(x) * cos(y)');
  const [xRange, setXRange] = useState([-3, 3]);
  const [yRange, setYRange] = useState([-3, 3]);
  const [hasError, setHasError] = useState(false);
  
  // Error boundary for Canvas
  const handleError = (error) => {
    console.error('Error in 3D rendering:', error);
    setHasError(true);
  };
  
  return (
    <div style={containerStyle}>
      <div style={controlsStyle}>
        <h1>3D Integral Explorer</h1>
        <div>
          <label>
            Function f(x,y) = 
            <input
              type="text"
              value={equation}
              onChange={(e) => setEquation(e.target.value)}
              style={{ margin: '0 10px', width: '200px' }}
            />
          </label>
        </div>
      </div>
      
      <div style={canvasContainerStyle}>
        {hasError ? (
          <div style={loadingStyle}>
            <p>3D rendering is not available.</p>
            <p>Please check your browser's WebGL support.</p>
          </div>
        ) : (
          <Suspense fallback={<LoadingFallback />}>
            <Canvas 
              camera={{ position: [5, 5, 5], fov: 75 }}
              onError={handleError}
              style={{ width: '100%', height: '100%' }}
            >
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <OrbitControls />
              <axesHelper args={[5]} />
              <Surface
                equation={equation}
                xMin={xRange[0]}
                xMax={xRange[1]}
                yMin={yRange[0]}
                yMax={yRange[1]}
                resolution={20}
              />
            </Canvas>
          </Suspense>
        )}
      </div>
    </div>
  );
}

export default App;