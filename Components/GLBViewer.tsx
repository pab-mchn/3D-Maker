'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';

interface GLBViewerProps {
  src: string;
  width?: number;
  height?: number;
}

export default function GLBViewer({ src, width = 160, height = 160 }: GLBViewerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Crear escena
    const scene = new THREE.Scene();

    // Cámara
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 3;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio); // <-- Aquí mejora la calidad
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Luz
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    scene.add(new THREE.AmbientLight(0x404040));

    // Cargar modelo
    const loader = new GLTFLoader();
    let model: THREE.Object3D | null = null;

    loader.load(src, (gltf) => {
      model = gltf.scene;

      // Centrar modelo
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);

      // Escalar para que quepa en el cuadro si es muy grande
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      if (maxDim > 1) {
        const scale = 1 / maxDim;
        model.scale.set(scale, scale, scale);
      }

      scene.add(model);
    });

    // Animación (rotación simple)
    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);
      if (model) model.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup al desmontar
    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      renderer.dispose();
      if (containerRef.current) containerRef.current.innerHTML = '';
    };
  }, [src, width, height]);

  return <div ref={containerRef} style={{ width: `${width}px`, height: `${height}px` }} />;
}
