'use client';

import { useRef, useState, DragEvent } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { GLTFExporter } from 'three-stdlib';
import Image from "next/image";

import * as THREE from 'three';

const Box = ({
  texture,
  meshRef,
}: {
  texture: THREE.Texture;
  meshRef: React.RefObject<THREE.Mesh | null>;
}) => {
  useFrame(() => {
    const mesh = meshRef.current;
    if (mesh) {
      mesh.rotation.y += 0.01;
      mesh.rotation.x += 0.005;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[5, 5, 5]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};



export default function Home() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [dragging, setDragging] = useState(false);

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const image = document.createElement('img');
      image.src = event.target?.result as string;
      image.onload = () => {
        const tex = new THREE.Texture(image);
        tex.needsUpdate = true;
        setTexture(tex);
      };
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const exportGLB = () => {
    if (!meshRef.current) {
      alert('Mesh no disponible');
      return;
    }

    const exporter = new GLTFExporter();

    exporter.parse(
      meshRef.current,
      (result) => {
        const blob = new Blob(
          [result instanceof ArrayBuffer ? result : JSON.stringify(result)],
          {
            type: result instanceof ArrayBuffer ? 'model/gltf-binary' : 'model/gltf+json',
          }
        );
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'custom-cube.glb';
        link.click();
        URL.revokeObjectURL(url);
      },
      () => { },
      { binary: true }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div
        className={`w-full max-w-md border-2 ${dragging ? 'border-indigo-500 bg-indigo-50' : 'border-dashed border-gray-300'
          } rounded-lg p-6 bg-white flex flex-col items-center transition-colors`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <label
          htmlFor="file-upload"
          className="cursor-pointer flex flex-col items-center text-center"
        >
          <Image
            src="/3dcube.png"
            alt="3d cube"
            width={150}
            height={150}
            className="mb-4"
          />
          <p className="text-lg font-medium text-gray-700">
            Drag and drop or{" "}
            <span className="text-indigo-600 underline">upload</span>
            {" "}the image
          </p>
          <p className="text-sm text-gray-500 text-center">
            JPEG, PNG or WEBP – Max 40 MB
          </p>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>



        {texture && (
          <div className="w-full h-64 mt-6">
            <Canvas camera={{ position: [8, 6, 8], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 10, 5]} intensity={1} />
              <Box texture={texture} meshRef={meshRef} />
            </Canvas>
          </div>
        )}
      </div>

      <button
        onClick={exportGLB}
        disabled={!texture}
        className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 disabled:opacity-50"
      >
        Download
      </button>
    </div>
  );
}
