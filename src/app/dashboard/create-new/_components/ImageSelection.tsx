"use client";
import Image from "next/image";
import React, { ChangeEvent, FC, useRef, useState, DragEvent } from "react";

type Props = {
  handleSelectedImage: (file: File | null) => void;
  image: File | null;
  error?: string;
};

const ImageSelection: FC<Props> = ({ handleSelectedImage, error, image }) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    handleSelectedImage(file);
  };

  const onFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) handleFile(file);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div>
      <label className="block mb-2 font-medium">
        Select Image of your room
      </label>

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        className={`
          mt-3 rounded-xl border-2 border-dashed cursor-pointer
          transition-all flex items-center justify-center
          text-center relative overflow-hidden
          ${image ? "p-2 bg-white" : "p-20"}
          ${
            isDragging
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 bg-slate-50 hover:border-gray-400"
          }
        `}
      >
        {!image ? (
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <Image
              src="/images/upload.png"
              width={60}
              height={60}
              alt="upload"
            />
            <p className="text-sm">
              Drag & drop your image here, or click to browse
            </p>
            <span className="text-xs text-gray-400">
              Supports JPG, PNG, WEBP
            </span>
          </div>
        ) : (
          <div className="relative w-full">
            <Image
              src={URL.createObjectURL(image)}
              alt=""
              width={500}
              height={500}
              className="w-full max-h-[320px] object-contain rounded-lg"
            />

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSelectedImage(null);
              }}
              className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded-md text-xs"
            >
              Remove
            </button>
          </div>
        )}

        <input
          ref={inputRef}
          accept="image/*"
          id="upload-image"
          type="file"
          className="hidden"
          onChange={onFileSelected}
        />
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default React.memo(ImageSelection);
