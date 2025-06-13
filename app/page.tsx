'use client';

import { useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFExporter } from 'three-stdlib';

import ImageUploader from '@/Components/ImageUploader';
import ThreePreview from '@/Components/ThreePreview';

export default function Home() {
  const meshRef = useRef<THREE.Mesh | null>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [dragging, setDragging] = useState(false);
  const [shape, setShape] = useState< 'box' | 'sphere' | 'pyramid' | 'logo'>('box');

  const processFile = (file: File) => {
    if (shape === 'logo') {
      if (file.type !== 'image/svg+xml') {
        alert('For LOGO, only SVG files are allowed');
        return;
      }

      const url = URL.createObjectURL(file);
      const image = new Image();
      image.src = url;

      const tex = new THREE.Texture();
      tex.image = image;
      tex.needsUpdate = true;
      setTexture(tex);
    } else {
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
    }
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
      {/* Menú cilíndrico liquid glass */}
      <div
        className="
          flex rounded-3xl bg-white bg-opacity-20 backdrop-blur-lg
          border border-white/30 p-1 w-max
          space-x-1
          shadow-md
        "
      >
        {['logo', 'box', 'sphere', 'pyramid'].map((item) => (
          <button
            key={item}
            onClick={() => {
              setShape(item as any);
              setTexture(null); // Limpiar textura al cambiar forma
            }}
            className={`
              flex-1
              px-6 py-2 rounded-3xl text-sm font-semibold transition
              ${
                shape === item
                  ? 'bg-indigo-500 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-indigo-600'
              }
              focus:outline-none
            `}
          >
            {item.toUpperCase()}
          </button>
        ))}
      </div>

      <ImageUploader
  onImageSelected={processFile}
  dragging={dragging}
  setDragging={setDragging}
/>

      {texture && (
        <div className="w-full h-64 mt-6">
          <ThreePreview shape={shape} texture={texture} meshRef={meshRef} />
        </div>
      )}

      <button
        onClick={exportGLB}
        disabled={!texture}
        className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 disabled:opacity-50 transition"
      >
        Export GLB
      </button>
    </div>
  );
}
