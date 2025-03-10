import React from 'react';
import { Text } from '@react-three/drei';

const Axes = ({ size = 10, showLabels = true }) => {
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
      {showLabels && (
        <Text position={[size + 0.5, 0, 0]} fontSize={0.5} color="red">
          X
        </Text>
      )}
      
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
      {showLabels && (
        <Text position={[0, size + 0.5, 0]} fontSize={0.5} color="green">
          Y
        </Text>
      )}
      
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
      {showLabels && (
        <Text position={[0, 0, size + 0.5]} fontSize={0.5} color="blue">
          Z
        </Text>
      )}
    </group>
  );
};

export default Axes;