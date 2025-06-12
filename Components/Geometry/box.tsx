'use client';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RefObject } from 'react';

export const Box = ({
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
      <boxGeometry args={[5, 5, 5]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};
