import { Button } from "@/src/components/ui/button";
import { RoomType } from "@/src/types";
import Image from "next/image";
import { FC } from "react";
type Props = RoomType & {
  handleClickCard: () => void;
};

const RoomDesignCard: FC<Props> = ({
  roomType,
  designType,
  originalImage,
  aiImage,
  blurDataUrl,
  handleClickCard,
}) => {
  return (
    <div
      onClick={handleClickCard}
      className="group w-full text-left rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
    >
      {/* Image Section */}
      <div className="relative w-full h-[180px] overflow-hidden">
        <Image
          src={aiImage}
          alt={designType}
          blurDataURL={blurDataUrl}
          width={600}
          height={600}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
          <Button variant="secondary" className="pointer-events-none">
            Preview
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        <h2 className="text-lg font-semibold flex items-center">
          <span className="mr-2">🏠</span>
          {roomType}
        </h2>
        <h2 className="text-md text-gray-700 flex items-center">
          <span className="mr-2">🎨</span>
          {designType}
        </h2>
      </div>
    </div>
  );
};

export default RoomDesignCard;
