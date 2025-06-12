'use client';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RefObject } from 'react';

export const Sphere = ({
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
      <sphereGeometry args={[3.5, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};
