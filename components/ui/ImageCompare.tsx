"use client";

import Image from "next/image";
import React from "react";

type ImageCompareProps = {
  before: string;
  after: string;
  className?: string;
};

export const ImageCompare: React.FC<ImageCompareProps> = ({
  before,
  after,
  className = "",
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
      className={`relative w-full  h-full overflow-hidden rounded-2xl select-none ${className}`}
    >
      {/* BEFORE (full) */}
      <Image
        src={before}
        alt="Before"
        className="absolute inset-0 w-full h-full object-cover select-none"
        width={1000}
        height={1000}
      />

      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <Image
          src={after}
          alt="After"
          width={1000}
          height={1000}
          className="select-none h-full object-cover"
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
        className="absolute top-1/2 z-10 -translate-y-1/2 cursor-ew-resize"
        style={{
          left: `${position}%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="w-6 h-6 rounded-full bg-white shadow border flex items-center justify-center">
          <div className="w-1 h-3 bg-gray-400" />
        </div>
      </div>
    </div>
  );
};
