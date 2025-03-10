import React from 'react';
import { useAppContext } from '../../contexts/AppContext';

const Lighting = () => {
  const { highContrastMode } = useAppContext();
  
  // Increase lighting intensity for high contrast mode
  const ambientIntensity = highContrastMode ? 0.8 : 0.6;
  const directionalIntensity = highContrastMode ? 1.2 : 1;
  
  return (
    <>
      <ambientLight intensity={ambientIntensity} />
      <pointLight position={[10, 10, 10]} intensity={directionalIntensity} castShadow />
      <directionalLight
        position={[5, 8, 5]}
        intensity={directionalIntensity}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
    </>
  );
};

export default Lighting;