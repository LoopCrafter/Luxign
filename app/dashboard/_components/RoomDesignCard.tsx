import { Button } from "@/components/ui/button";
import { RoomType } from "@/types";
import Image from "next/image";
import { FC } from "react";
import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";
type Props = RoomType & {
  handleClickCard: () => void;
};

const RoomDesignCard: FC<Props> = ({
  roomType,
  designType,
  originalImage,
  aiImage,
  handleClickCard,
}) => {
  return (
    <div
      className="rounded-lg border border-gray-300 shadow-md overflow-hidden p-4 bg-white cursor-pointer group"
      onClick={handleClickCard}
    >
      {/* <ReactBeforeSliderComponent
        firstImage={{ imageUrl: aiImage }}
        secondImage={{ imageUrl: originalImage }}
      /> */}
      <figure className="w-full relative  overflow-hidden bg-black">
        <Image
          src={aiImage}
          alt={designType}
          width={150}
          height={100}
          className="w-full h-auto max-h[100px] object-cover group-hover:opacity-50 transition-all duration-300 ease-in-out "
          style={{ maxHeight: 200 }}
        />
        <div className="absolute w-full h-full top-0 left-0 flex justify-center items-end">
          <Button
            variant="outline"
            className="cursor-pointer px-10 relative -bottom-4 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:bottom-4"
          >
            Preview
          </Button>
        </div>
      </figure>
      <h2 className="mt-4 text-lg font-semibold flex items-center">
        <span className="mr-2">🏠</span>
        {roomType}
      </h2>
      <h2 className="text-md text-gray-700 flex items-center">
        <span className="mr-2">🎨</span>
        {designType}
      </h2>
    </div>
  );
};

export default RoomDesignCard;
