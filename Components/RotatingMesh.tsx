'use client';

import { useFrame } from '@react-three/fiber';
import { Mesh, Texture } from 'three';
import { RefObject, ReactNode } from 'react';

export const RotatingMesh = ({
  children,
  meshRef,
}: {
  children: ReactNode;
  meshRef: RefObject<Mesh | null>;
}) => {
  useFrame(() => {
    const mesh = meshRef.current;
    if (mesh) {
      mesh.rotation.y += 0.01;
      mesh.rotation.x += 0.005;
    }
  });

  return <mesh ref={meshRef}>{children}</mesh>;
};
