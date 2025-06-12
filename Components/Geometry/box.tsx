'use client';

import { Texture, Mesh } from 'three';
import { RefObject } from 'react';
import { RotatingMesh } from '@/Components/RotatingMesh';

export const Box = ({
  texture,
  meshRef,
}: {
  texture: Texture;
  meshRef: RefObject<Mesh | null>;
}) => {
  return (
    <RotatingMesh meshRef={meshRef}>
      <boxGeometry args={[5, 5, 5]} />
      <meshStandardMaterial map={texture} />
    </RotatingMesh>
  );
};
