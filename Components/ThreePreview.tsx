'use client';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { RefObject } from 'react';

import { Box } from '@/Components/Geometry/box';
import { Sphere } from '@/Components/Geometry/Sphere';
import { Pyramid } from '@/Components/Geometry/Pyramid';

type Shape = 'box' | 'sphere' | 'pyramid';

export default function ThreePreview({
  shape,
  texture,
  meshRef,
}: {
  shape: Shape;
  texture: THREE.Texture;
  meshRef: RefObject<THREE.Mesh>;
}) {
  const renderShape = () => {
    switch (shape) {
      case 'box':
        return <Box texture={texture} meshRef={meshRef} />;
      case 'sphere':
        return <Sphere texture={texture} meshRef={meshRef} />;
      case 'pyramid':
        return <Pyramid texture={texture} meshRef={meshRef} />;
      default:
        return null;
    }
  };

  return (
    <Canvas camera={{ position: [8, 6, 8], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} />
      {renderShape()}
    </Canvas>
  );
}
