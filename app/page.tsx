'use client';

import { useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFExporter } from 'three-stdlib';

import ImageUploader from '@/Components/ImageUploader';
import ThreePreview from '@/Components/ThreePreview';

export default function Home() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [dragging, setDragging] = useState(false);
  const [shape, setShape] = useState<'box' | 'sphere' | 'pyramid'>('box');

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

  const exportGLB = () => {
    if (!meshRef.current) return alert('Mesh no disponible');

    const exporter = new GLTFExporter();
    exporter.parse(
      meshRef.current,
      (result) => {
        const blob = new Blob([result instanceof ArrayBuffer ? result : JSON.stringify(result)], {
          type: result instanceof ArrayBuffer ? 'model/gltf-binary' : 'model/gltf+json',
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${shape}-model.glb`;
        link.click();
        URL.revokeObjectURL(url);
      },
      () => {},
      { binary: true }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start p-6 space-y-6">
      {/* Shape Selector */}
      <div className="flex space-x-4 mb-4">
        {['box', 'sphere', 'pyramid'].map((item) => (
          <button
            key={item}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              shape === item
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setShape(item as any)}
          >
            {item.toUpperCase()}
          </button>
        ))}
      </div>

      <ImageUploader onImageSelected={processFile} dragging={dragging} setDragging={setDragging}>
        {texture && (
          <div className="w-full aspect-[4/3] mt-4">
            <ThreePreview shape={shape} texture={texture} meshRef={meshRef} />
          </div>
        )}
      </ImageUploader>

      <button
        onClick={exportGLB}
        disabled={!texture}
        className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 disabled:opacity-50"
      >
        Export GLB
      </button>
    </div>
  );
}
