"use client";
import Image from "next/image";
import { FC, useState } from "react";

const designs = [
  {
    id: 1,
    title: "Modern",
    image: "/images/design-types/modern.jpg",
  },
  {
    id: 2,
    title: "Minimalist",
    image: "/images/design-types/minimalist.jpg",
  },
  {
    id: 3,
    title: "Scandinavian",
    image: "/images/design-types/scandinavian.jpg",
  },
  {
    id: 4,
    title: "Industrial",
    image: "/images/design-types/industrial.jpg",
  },
  {
    id: 5,
    title: "Bohemian",
    image: "/images/design-types/bohemian.jpg",
  },
  {
    id: 6,
    title: "Traditional",
    image: "/images/design-types/traditional.jpg",
  },
  {
    id: 7,
    title: "Rustic",
    image: "/images/design-types/rustic.jpg",
  },
  {
    id: 8,
    title: "Contemporary",
    image: "/images/design-types/contemporary.jpg",
  },
  {
    id: 9,
    title: "Japandi",
    image: "/images/design-types/japandi.jpg",
  },
  {
    id: 10,
    title: "Luxury",
    image: "/images/design-types/luxury.jpg",
  },
  {
    id: 11,
    title: "Mid-Century Modern",
    image: "/images/design-types/midcentury.jpg",
  },
  {
    id: 12,
    title: "Coastal",
    image: "/images/design-types/coastal.jpg",
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
      <label className="text-slate-400 mb-2 block">
        Select Interior Design Type
      </label>
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
                width={200}
                height={200}
                className={`h-[100px] md:h-[90px] w-full rounded-md hover:scale-105 transition-all cursor-pointer false ${
                  selectedDesignType === design.title
                    ? " border-2 border-primary rounded-md p-1"
                    : ""
                }`}
                loading="lazy"
              />
              <h2 className="text-gray-600 text-md">{design.title}</h2>
            </div>
          );
        })}
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default DesignType;
