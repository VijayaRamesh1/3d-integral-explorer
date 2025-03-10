import React, { useMemo } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import * as THREE from 'three';
import { evaluate } from 'mathjs';

function Grid({ size = 10, divisions = 20, limits, functionType }) {
  const { view } = useAppContext();
  
  // Generate grid lines
  const gridHelper = useMemo(() => {
    return new THREE.GridHelper(size, divisions, 0x888888, 0x444444);
  }, [size, divisions]);
  
  // Generate function mesh
  const functionMesh = useMemo(() => {
    // Define function based on type
    const getZ = (x, y) => {
      try {
        switch(functionType) {
          case 'polynomial':
            return Math.pow(x, 2) + Math.pow(y, 2);
          case 'trigonometric':
            return Math.sin(x) * Math.cos(y);
          case 'exponential':
            return Math.exp(-(Math.pow(x, 2) + Math.pow(y, 2)) / 4);
          default:
            return Math.pow(x, 2) + Math.pow(y, 2);
        }
      } catch (error) {
        console.error("Error evaluating function:", error);
        return 0;
      }
    };
    
    // Create geometry
    const geometry = new THREE.PlaneGeometry(
      size, 
      size, 
      divisions, 
      divisions
    );
    
    // Scale and position vertices according to limits
    const xRange = limits.x.max - limits.x.min;
    const yRange = limits.y.max - limits.y.min;
    
    const position = geometry.attributes.position;
    const vertex = new THREE.Vector3();
    
    for (let i = 0; i < position.count; i++) {
      vertex.fromBufferAttribute(position, i);
      
      // Map vertex to actual x,y coordinates based on limits
      const x = limits.x.min + (vertex.x + size/2) * (xRange/size);
      const y = limits.y.min + (vertex.y + size/2) * (yRange/size);
      
      // Calculate z based on function
      const z = getZ(x, y);
      
      // Update position
      position.setZ(i, z);
    }
    
    // Update geometry
    geometry.computeVertexNormals();
    
    // Create material
    const material = new THREE.MeshStandardMaterial({
      color: 0x3090ff,
      side: THREE.DoubleSide,
      wireframe: false,
      flatShading: false,
    });
    
    return new THREE.Mesh(geometry, material);
  }, [size, divisions, limits, functionType]);
  
  return (
    <>
      {/* Always render the grid */}
      <primitive object={gridHelper} rotation={[Math.PI / 2, 0, 0]} />
      
      {/* Render function mesh if in 3D view */}
      {view === '3d' && <primitive object={functionMesh} />}
      
      {/* Add axes */}
      <axesHelper args={[size / 2]} />
    </>
  );
}

export default Grid;
