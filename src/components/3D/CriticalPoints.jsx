import React, { useState } from 'react';
import { Html } from '@react-three/drei';

const CriticalPoints = ({ points }) => {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  
  if (!points || points.length === 0) return null;
  
  return (
    <>
      {points.map((point, index) => (
        <group key={index} position={[point.x, point.z, point.y]}>
          <mesh 
            onPointerOver={() => setHoveredPoint(point)}
            onPointerOut={() => setHoveredPoint(null)}
          >
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial 
              color={
                point.type === 'peak' ? '#ff0000' : 
                point.type === 'valley' ? '#0000ff' : 
                '#ffcc00'
              } 
              emissive={
                point.type === 'peak' ? '#550000' : 
                point.type === 'valley' ? '#000055' : 
                '#554400'
              }
              emissiveIntensity={0.5}
            />
          </mesh>
          {hoveredPoint === point && (
            <Html distanceFactor={10}>
              <div style={{
                backgroundColor: 'rgba(0,0,0,0.8)',
                color: 'white',
                padding: '8px',
                borderRadius: '4px',
                fontSize: '12px',
                fontFamily: 'Arial, sans-serif',
                width: '150px',
                textAlign: 'center',
                pointerEvents: 'none'
              }}>
                <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                  {point.type.charAt(0).toUpperCase() + point.type.slice(1)}
                </div>
                <div>x: {point.x.toFixed(2)}</div>
                <div>y: {point.y.toFixed(2)}</div>
                <div>f(x,y): {point.z.toFixed(2)}</div>
              </div>
            </Html>
          )}
        </group>
      ))}
    </>
  );
};

export default CriticalPoints;