"use client";
import Image from "next/image";
import { ChangeEvent, FC, useState } from "react";

type Props = {
  handleSelectedImage: (file: File) => void;
};

const ImageSelection: FC<Props> = ({ handleSelectedImage }) => {
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>();
  const onFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    const files = input.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedImageFile(file);
      handleSelectedImage(file);
    }
  };
  return (
    <div>
      <label>Select Image of your room</label>
      <div className="mt-3">
        <label htmlFor="upload-image">
          <div
            className={`border rounded-xl 
                border-dotted flex justify-center border-primary
                 bg-slate-200 cursor-pointer hover:shadow-lg
                  ${selectedImageFile ? "p-2 bg-white" : "p-28"}`}
          >
            {!selectedImageFile ? (
              <Image src="/upload.png" width={70} height={30} alt="Upload" />
            ) : (
              <Image
                src={URL.createObjectURL(selectedImageFile)}
                alt=""
                width={300}
                height={300}
                className="w-full max-h-[300px] object-contain"
              />
            )}
          </div>
        </label>
        <input
          accept="image/*"
          id="upload-image"
          type="file"
          className="hidden"
          onChange={onFileSelected}
        />
      </div>
    </div>
  );
};

export default ImageSelection;
