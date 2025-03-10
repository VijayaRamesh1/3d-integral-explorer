import React from 'react';

function Lighting() {
  return (
    <>
      {/* Ambient light for overall scene brightness */}
      <ambientLight intensity={0.3} />
      
      {/* Main directional light */}
      <directionalLight 
        position={[10, 10, 10]} 
        intensity={1} 
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      
      {/* Fill light from opposite side */}
      <directionalLight 
        position={[-10, 5, -10]} 
        intensity={0.5} 
      />
      
      {/* Subtle blue lighting from below for dimension */}
      <hemisphereLight 
        skyColor={0xffffbb} 
        groundColor={0x080820} 
        intensity={0.2} 
      />
    </>
  );
}

export default Lighting;
