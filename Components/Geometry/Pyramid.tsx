'use client';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RefObject } from 'react';

export const Pyramid = ({
  texture,
  meshRef,
}: {
  texture: THREE.Texture;
  meshRef: RefObject<THREE.Mesh>;
}) => {
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x += 0.005;
    }
  });

  return (
    <mesh ref={meshRef}>
      <coneGeometry args={[4, 6, 4]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};
