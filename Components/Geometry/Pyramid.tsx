'use client';

import { Texture, Mesh } from 'three';
import { RefObject } from 'react';
import { RotatingMesh } from '@/Components/RotatingMesh';

export const Pyramid = ({
  texture,
  meshRef,
}: {
  texture: Texture;
  meshRef: RefObject<Mesh | null>;
}) => {
  return (
    <RotatingMesh meshRef={meshRef}>
      <coneGeometry args={[4, 6, 4]} />
      <meshStandardMaterial map={texture} />
    </RotatingMesh>
  );
};
