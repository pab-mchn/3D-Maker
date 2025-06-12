'use client';

import { Texture, Mesh } from 'three';
import { RefObject } from 'react';
import { RotatingMesh } from '@/Components/RotatingMesh';

export const Sphere = ({
  texture,
  meshRef,
}: {
  texture: Texture;
  meshRef: RefObject<Mesh | null>;
}) => {
  return (
    <RotatingMesh meshRef={meshRef}>
      <sphereGeometry args={[3, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </RotatingMesh>
  );
};
