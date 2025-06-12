'use client';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { RefObject } from 'react';

import { Box } from '@/Components/Geometry/box';
import { Sphere } from '@/Components/Geometry/Sphere';
import { Pyramid } from '@/Components/Geometry/Pyramid';

const shapesMap = {
  box: Box,
  sphere: Sphere,
  pyramid: Pyramid,
};

export default function ThreePreview({
  shape,
  texture,
  meshRef,
}: {
  shape: keyof typeof shapesMap;
  texture: THREE.Texture;
  meshRef: React.RefObject<THREE.Mesh | null>;
}) {
  const ShapeComponent = shapesMap[shape];

  return (
    <Canvas camera={{ position: [0, 5, 15], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} />
      <ShapeComponent texture={texture} meshRef={meshRef} />
    </Canvas>
  );
}
