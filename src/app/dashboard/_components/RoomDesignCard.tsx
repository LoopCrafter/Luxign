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
          blurDataURL={
            blurDataUrl ||
            "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAIAAAADnC86AAAACXBIWXMAAACWAAAAlgBxRv7wAAAD6UlEQVRYw41YUZLsKAyTKC6919hz7B31PrBkQ/pVbc9MOiEksmzZmOF///5DEgRJgGSdoS4BEHUgAABSDhAkAZL8V3d7GIKnoj/b44UlgIJYIGdqkPOk6lIAAQmst4OgJDbCuQ+/sYGFQAaHoCczMJcNqqkyGETBVkMiIZnKIDEYjyGCfcXiQjbkuBuY8K7BsqxmqkyBLsbckkyDcaxtpe24sA3fT+rA2A4d5HIjHief63J1GRdshgUP9ReVOIH8v3RvVBD7cT6HoEZ0fjIuVNmUEvmH7h3co+Lj6ryRF3bEPRi3+YeNLNqC/ND9oh7orYoRK2pwXokOM//CmIm0Iuajc1LKtIlb7xGTTo9PBtdOsQa79GW3I6nc0mPybiDziCvqUCXOjDEsrqFtOH2hSXrG2y5UlwBnY5XJqDo5zovl1Pb1fAdbAjXCbAtSYR5HUwTBXXbdRXJmoAI+/AHXLqmR1IPQlJnrvOqMp4A45BrFRUPbHeyHrkZoC+xwqFt5nRo7Ut2Dro4XXil2AS6HWbH0ymRxJZHQbCd2Co3IjcqndiVdV8e86xWhiICpTqR3gm1HRHwsqEWCjKsFkNPed4E8q17W4wYbizFuzlUQNAraJa6zFga+jgMSGtEtxl7si7Qy/jp61lFgS5W/8TZ9pqwFuvw11GREdbNh1j9lgqpyhzHUuhKGyu0lS/zUQhdyE9fFe+AOT09xjhhDFL1aUxrV+1rQaDpJGPdfl8OHaVMjV5eDHe9RWdGK46n3Q9xXFn0CPLu7O8BeNclO7l2LKtW6K7HVxCch/q4s3QG+konuAOlSu21UJ5ov+jA7sU8SN+CkqytEQ8GoKhFXi93Xls9PP4dO2mjsqR4aiaRXz8mmrFlEGH/mJKHVUoy9n3Rqnuld7urTHs/otuOmq8stJ/jpotx1DE8+yE997o6KE/tsVhZ+fGbb8uw/1K2Grht4IdNzMHjzs2+DhF52+/sWqb4gzr9r3UcgfyHv2Zm8jXe/OvXkF16aw+cVEzLIazJ+3fMrTG+/zTcNnmd/ok5geqvgfYyBbj2O1oi8E2M2GH60QH/EtqDX7j6W2Z6ll7WjR3v7Farpt4u81W7sA+avyTiYjXoGCfTdfvXY4d1++s31Bl5c3IWU/X/w2MzOluKGDOVT37yxu0S8EtEV1LWOHdvht702YsCXyxDIT7tqXP9Pgxfw+vyQ3OtQDJjPOVwtnxiyUGtTAA6HrYF72C2frj5lubp+eWPnSIx4xw3DHzF0BDQoi2sAe3yv9XIdRqzLAuCVWyzzfFYED6Kx6zzAa60w9vPgajvwYY/rn1HhSi5/T5eugzqAm/QftH4Yw86164wAAAAASUVORK5CYII="
          }
          placeholder="blur"
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
