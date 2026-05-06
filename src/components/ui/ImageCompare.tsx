"use client";

import Image from "next/image";
import React from "react";

type ImageCompareProps = {
  before: string;
  after: string;
  className?: string;
  blurUrl?: string;
};

export const ImageCompare: React.FC<ImageCompareProps> = ({
  before,
  after,
  className = "",
  blurUrl,
}) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = React.useState(50);
  const [isDragging, setIsDragging] = React.useState(false);

  const updatePosition = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    let newPos = ((clientX - rect.left) / rect.width) * 100;
    newPos = Math.max(0, Math.min(100, newPos));
    setPosition(newPos);
  };

  React.useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;

      if ("touches" in e) {
        updatePosition(e.touches[0].clientX);
      } else {
        updatePosition(e.clientX);
      }
    };

    const stopDragging = () => setIsDragging(false);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", stopDragging);
    window.addEventListener("touchmove", handleMove);
    window.addEventListener("touchend", stopDragging);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", stopDragging);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", stopDragging);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden rounded-2xl select-none ${className}`}
    >
      <div className="absolute h-20 w-full top-0 left-0 bg-gradient-to-b from-gray-400 via-gray-200/30 to-transparent z-1"></div>
      {/* BEFORE (full) */}
      <Image
        src={before}
        alt="Before"
        className="absolute inset-0 w-full h-full object-cover select-none"
        width={2000}
        height={2000}
        blurDataURL={
          blurUrl ||
          "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAIAAAADnC86AAAACXBIWXMAAACWAAAAlgBxRv7wAAAD6UlEQVRYw41YUZLsKAyTKC6919hz7B31PrBkQ/pVbc9MOiEksmzZmOF///5DEgRJgGSdoS4BEHUgAABSDhAkAZL8V3d7GIKnoj/b44UlgIJYIGdqkPOk6lIAAQmst4OgJDbCuQ+/sYGFQAaHoCczMJcNqqkyGETBVkMiIZnKIDEYjyGCfcXiQjbkuBuY8K7BsqxmqkyBLsbckkyDcaxtpe24sA3fT+rA2A4d5HIjHief63J1GRdshgUP9ReVOIH8v3RvVBD7cT6HoEZ0fjIuVNmUEvmH7h3co+Lj6ryRF3bEPRi3+YeNLNqC/ND9oh7orYoRK2pwXokOM//CmIm0Iuajc1LKtIlb7xGTTo9PBtdOsQa79GW3I6nc0mPybiDziCvqUCXOjDEsrqFtOH2hSXrG2y5UlwBnY5XJqDo5zovl1Pb1fAdbAjXCbAtSYR5HUwTBXXbdRXJmoAI+/AHXLqmR1IPQlJnrvOqMp4A45BrFRUPbHeyHrkZoC+xwqFt5nRo7Ut2Dro4XXil2AS6HWbH0ymRxJZHQbCd2Co3IjcqndiVdV8e86xWhiICpTqR3gm1HRHwsqEWCjKsFkNPed4E8q17W4wYbizFuzlUQNAraJa6zFga+jgMSGtEtxl7si7Qy/jp61lFgS5W/8TZ9pqwFuvw11GREdbNh1j9lgqpyhzHUuhKGyu0lS/zUQhdyE9fFe+AOT09xjhhDFL1aUxrV+1rQaDpJGPdfl8OHaVMjV5eDHe9RWdGK46n3Q9xXFn0CPLu7O8BeNclO7l2LKtW6K7HVxCch/q4s3QG+konuAOlSu21UJ5ov+jA7sU8SN+CkqytEQ8GoKhFXi93Xls9PP4dO2mjsqR4aiaRXz8mmrFlEGH/mJKHVUoy9n3Rqnuld7urTHs/otuOmq8stJ/jpotx1DE8+yE997o6KE/tsVhZ+fGbb8uw/1K2Grht4IdNzMHjzs2+DhF52+/sWqb4gzr9r3UcgfyHv2Zm8jXe/OvXkF16aw+cVEzLIazJ+3fMrTG+/zTcNnmd/ok5geqvgfYyBbj2O1oi8E2M2GH60QH/EtqDX7j6W2Z6ll7WjR3v7Farpt4u81W7sA+avyTiYjXoGCfTdfvXY4d1++s31Bl5c3IWU/X/w2MzOluKGDOVT37yxu0S8EtEV1LWOHdvht702YsCXyxDIT7tqXP9Pgxfw+vyQ3OtQDJjPOVwtnxiyUGtTAA6HrYF72C2frj5lubp+eWPnSIx4xw3DHzF0BDQoi2sAe3yv9XIdRqzLAuCVWyzzfFYED6Kx6zzAa60w9vPgajvwYY/rn1HhSi5/T5eugzqAm/QftH4Yw86164wAAAAASUVORK5CYII="
        }
        placeholder="blur"
      />

      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <Image
          src={after}
          alt="After"
          width={2000}
          height={2000}
          className="select-none h-full object-cover bg-white"
          blurDataURL={
            blurUrl ||
            "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAIAAAADnC86AAAACXBIWXMAAACWAAAAlgBxRv7wAAAD6UlEQVRYw41YUZLsKAyTKC6919hz7B31PrBkQ/pVbc9MOiEksmzZmOF///5DEgRJgGSdoS4BEHUgAABSDhAkAZL8V3d7GIKnoj/b44UlgIJYIGdqkPOk6lIAAQmst4OgJDbCuQ+/sYGFQAaHoCczMJcNqqkyGETBVkMiIZnKIDEYjyGCfcXiQjbkuBuY8K7BsqxmqkyBLsbckkyDcaxtpe24sA3fT+rA2A4d5HIjHief63J1GRdshgUP9ReVOIH8v3RvVBD7cT6HoEZ0fjIuVNmUEvmH7h3co+Lj6ryRF3bEPRi3+YeNLNqC/ND9oh7orYoRK2pwXokOM//CmIm0Iuajc1LKtIlb7xGTTo9PBtdOsQa79GW3I6nc0mPybiDziCvqUCXOjDEsrqFtOH2hSXrG2y5UlwBnY5XJqDo5zovl1Pb1fAdbAjXCbAtSYR5HUwTBXXbdRXJmoAI+/AHXLqmR1IPQlJnrvOqMp4A45BrFRUPbHeyHrkZoC+xwqFt5nRo7Ut2Dro4XXil2AS6HWbH0ymRxJZHQbCd2Co3IjcqndiVdV8e86xWhiICpTqR3gm1HRHwsqEWCjKsFkNPed4E8q17W4wYbizFuzlUQNAraJa6zFga+jgMSGtEtxl7si7Qy/jp61lFgS5W/8TZ9pqwFuvw11GREdbNh1j9lgqpyhzHUuhKGyu0lS/zUQhdyE9fFe+AOT09xjhhDFL1aUxrV+1rQaDpJGPdfl8OHaVMjV5eDHe9RWdGK46n3Q9xXFn0CPLu7O8BeNclO7l2LKtW6K7HVxCch/q4s3QG+konuAOlSu21UJ5ov+jA7sU8SN+CkqytEQ8GoKhFXi93Xls9PP4dO2mjsqR4aiaRXz8mmrFlEGH/mJKHVUoy9n3Rqnuld7urTHs/otuOmq8stJ/jpotx1DE8+yE997o6KE/tsVhZ+fGbb8uw/1K2Grht4IdNzMHjzs2+DhF52+/sWqb4gzr9r3UcgfyHv2Zm8jXe/OvXkF16aw+cVEzLIazJ+3fMrTG+/zTcNnmd/ok5geqvgfYyBbj2O1oi8E2M2GH60QH/EtqDX7j6W2Z6ll7WjR3v7Farpt4u81W7sA+avyTiYjXoGCfTdfvXY4d1++s31Bl5c3IWU/X/w2MzOluKGDOVT37yxu0S8EtEV1LWOHdvht702YsCXyxDIT7tqXP9Pgxfw+vyQ3OtQDJjPOVwtnxiyUGtTAA6HrYF72C2frj5lubp+eWPnSIx4xw3DHzF0BDQoi2sAe3yv9XIdRqzLAuCVWyzzfFYED6Kx6zzAa60w9vPgajvwYY/rn1HhSi5/T5eugzqAm/QftH4Yw86164wAAAAASUVORK5CYII="
          }
          placeholder="blur"
          style={{
            width: containerRef.current?.offsetWidth || "100%",

            maxWidth: "none",
          }}
        />
      </div>

      {/* Divider */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-white"
        style={{
          left: `${position}%`,
          transform: "translateX(-50%)",
        }}
      />

      {/* Handle */}
      <div
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
        className="absolute top-[55%] z-10 -translate-y-1/2 cursor-ew-resize"
        style={{
          left: `${position}%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="w-10 h-10 rounded-full bg-white shadow border flex items-center justify-center">
          <Image
            src="/images/leftrightArrow.svg"
            width={34}
            height={34}
            alt="Handle"
            className="w-5 h-5 pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
};
