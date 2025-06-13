'use client';

import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { RefObject, useRef } from 'react';

import { Box } from '@/Components/Geometry/box';
import { Sphere } from '@/Components/Geometry/Sphere';
import { Pyramid } from '@/Components/Geometry/Pyramid';
import { Logo3D } from '@/Components/Geometry/Logo3D';

type Shape = 'box' | 'sphere' | 'pyramid' | 'logo';

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
  shape: Shape;
  texture: THREE.Texture;
  meshRef: RefObject<THREE.Mesh | null>;
}) {
  // Creamos un ref local para el mesh interno
  const internalMeshRef = useRef<THREE.Mesh | null>(null);

  // Sincronizamos el meshRef externo con el interno para que Home siempre tenga el mesh actual
  if (meshRef) {
    meshRef.current = internalMeshRef.current;
  }

  if (shape === 'logo') {
    const svgUrl = texture.image?.src as string;
    return (
      <Canvas camera={{ position: [0, 5, 15], fov: 45 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 10, 5]} intensity={1} />
        <Logo3D meshRef={internalMeshRef} svgUrl={svgUrl} />
      </Canvas>
    );
  }

  const ShapeComponent = shapesMap[shape];
  return (
    <Canvas camera={{ position: [0, 5, 15], fov: 45 }}>
      <ambientLight intensity={1} />
      <directionalLight position={[5, 10, 5]} intensity={1} />
      <ShapeComponent texture={texture} meshRef={internalMeshRef} />
    </Canvas>
  );
}
