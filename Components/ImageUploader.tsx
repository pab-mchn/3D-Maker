'use client';
import Image from 'next/image';
import { DragEvent, ReactNode } from 'react';

export default function ImageUploader({
  onImageSelected,
  dragging,
  setDragging,
  instructionText,
  children,
}: {
  onImageSelected: (file: File) => void;
  dragging: boolean;
  setDragging: (dragging: boolean) => void;
  instructionText?: string;
  children?: ReactNode;
}) {
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) onImageSelected(file);
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
    if (file) onImageSelected(file);
  };

  const lines = instructionText?.split('\n') || [
    'Drag and drop or upload the image',
    'JPEG, PNG or WEBP',
  ];

  return (
    <div
      className={`w-full max-w-md border-2 ${
        dragging ? 'border-indigo-500 bg-indigo-50' : 'border-dashed border-gray-300'
      } rounded-lg p-6 bg-white flex flex-col items-center transition-colors`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center text-center">
        <Image src="/3dcube.png" alt="3d shape" width={150} height={150} className="mb-4" />
        {lines.map((line, i) => (
          <p key={i} className="text-gray-400 text-sm leading-relaxed">
            {line}
          </p>
        ))}
      </label>
      {children}
      <input id="file-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
    </div>
  );
}
