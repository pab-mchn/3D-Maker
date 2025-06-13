'use client';

import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { SVGLoader } from 'three-stdlib';
import { RefObject, useMemo } from 'react';
import { RotatingMesh } from '@/Components/RotatingMesh';

export const Logo3D = ({
  meshRef,
  svgUrl,
}: {
  meshRef: RefObject<THREE.Mesh | null>;
  svgUrl: string;
}) => {
  const svg = useLoader(SVGLoader, svgUrl);

  const group = useMemo(() => {
    const g = new THREE.Group();

    svg.paths.forEach((path) => {
      const shapes = SVGLoader.createShapes(path);

      shapes.forEach((shape) => {
        const geometry = new THREE.ExtrudeGeometry(shape, {
          depth: 2,
          bevelEnabled: false,
        });

        geometry.computeBoundingBox();
        geometry.center();

        const color = path.userData?.style?.fill || path.color || '#ffffff';
        const material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(color),
          metalness: 0.2,
          roughness: 0.6,
          side: THREE.DoubleSide,
        });

        const mesh = new THREE.Mesh(geometry, material);
        g.add(mesh);
      });
    });


    const box = new THREE.Box3().setFromObject(g);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 1 / maxDim;
    g.scale.setScalar(scale * 15);
    return g;
  }, [svg]);

  return <RotatingMesh meshRef={meshRef}><primitive object={group} /></RotatingMesh>;
};
