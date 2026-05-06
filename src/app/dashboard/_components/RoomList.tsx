"use client";

import { useState } from "react";
import RoomDesignCard from "./RoomDesignCard";
import { RoomType } from "@/src/types";
import AiOutputDialog from "./AiOutputDialog";

type RoomList = {
  userRoomList: RoomType[];
};

const RoomList = ({ userRoomList }: RoomList) => {
  const [showAiOutputDialog, setShowAiOutputDialog] = useState(false);
  const [aiImageOutputUrl, setAiImageOutputUrl] = useState("");
  const [originalImageUrl, setOriginalImageUrl] = useState("");
  const [blurUrl, setBlurUrl] = useState("");

  const handleClickCard = (
    originalImage: string,
    aiImage: string,
    blurDataUrl = "",
  ) => {
    setOriginalImageUrl(originalImage);
    setAiImageOutputUrl(aiImage);
    setShowAiOutputDialog(true);
    if (blurDataUrl) {
      setBlurUrl(blurDataUrl);
    }
  };

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {userRoomList.map((room) => (
          <RoomDesignCard
            key={room.id}
            {...room}
            handleClickCard={() =>
              handleClickCard(
                room.originalImage,
                room.aiImage,
                room.blurDataUrl,
              )
            }
          />
        ))}
      </div>
      <AiOutputDialog
        openDialog={showAiOutputDialog}
        setCloseDialog={() => setShowAiOutputDialog(false)}
        originalImage={originalImageUrl}
        aiGeneratedImage={aiImageOutputUrl}
        blurUrl={blurUrl}
      />
    </div>
  );
};

export default RoomList;
