"use client";
import Image from "next/image";
import { FC, useState } from "react";

const designs = [
  {
    id: 1,
    title: "Modern",
    image: "/modern.png",
  },
  {
    id: 2,
    title: "Industrial",
    image: "/industrial.png",
  },
  {
    id: 3,
    title: "Bohemian",
    image: "/bohemian.png",
  },
  {
    id: 4,
    title: "Traditional",
    image: "/traditional.png",
  },
  {
    id: 5,
    title: "Rustic",
    image: "/rustic.png",
  },
  {
    id: 6,
    title: "Minimalist",
    image: "/minimalist.png",
  },
];

type Props = {
  selectDesignType: (value: string) => void;
  error?: string;
};

const DesignType: FC<Props> = ({ selectDesignType, error }) => {
  const [selectedDesignType, setSelectedDesignType] = useState("");

  const handleSelectDesignType = (value: string) => {
    setSelectedDesignType(value);
    selectDesignType(value);
  };
  return (
    <div className="mt-5">
      <label className="text-gray-500">Select Interior Design Type</label>
      <div className="grid grid-cols-2 mt-3 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {designs.map((design) => {
          return (
            <div
              key={design.id}
              onClick={() => handleSelectDesignType(design.title)}
            >
              <Image
                src={design.image}
                alt={design.title}
                width={100}
                height={100}
                className={`h-[70px] rounded-md hover:scale-105 transition-all cursor-pointer false ${
                  selectedDesignType === design.title
                    ? " border-2 border-primary rounded-md p-1"
                    : ""
                }`}
                loading="lazy"
              />
              <h2>{design.title}</h2>
            </div>
          );
        })}
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default DesignType;
