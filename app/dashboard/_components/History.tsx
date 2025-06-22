"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import EmptyState from "./EmptyState";
import Link from "next/link";
import RoomDesignCard from "./RoomDesignCard";
import { RoomType } from "@/types";
import AiOutputDialog from "./AiOutputDialog";
import TransitionLink from "@/components/ui/TransitionLink";

const History = () => {
  const { user } = useUser();
  const [showAiOutputDialog, setShowAiOutputDialog] = useState(false);
  const [userRoomList, setUserRoomList] = useState<RoomType[]>([]);
  const [aiImageOutputUrl, setAiImageOutputUrl] = useState("");
  const [originalImageUrl, setOriginalImageUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    user && getUserHistory();
  }, [user]);

  const getUserHistory = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/userRoomList");
      const data = await res.json();
      setUserRoomList(data.result);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const handleClickCard = (originalImage: string, aiImage: string) => {
    setOriginalImageUrl(originalImage);
    setAiImageOutputUrl(aiImage);
    setShowAiOutputDialog(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-xl">Hello, {user?.fullName}</h2>

        <TransitionLink href="/dashboard/create-new">
          <Button>
            <Plus /> Redesign Room
          </Button>
        </TransitionLink>
      </div>

      {loading ? (
        <div className="flex flex-col justify-center items-center gap-4 mt-10 h-[60vh]">
          {" "}
          <span className="loader" />
        </div>
      ) : userRoomList?.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="py-10">
          <h2 className="font-medium text-lg text-primary mb-10">
            AI Room Studio
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {userRoomList.map((room) => (
              <RoomDesignCard
                key={room.id}
                {...room}
                handleClickCard={() =>
                  handleClickCard(room.originalImage, room.aiImage)
                }
              />
            ))}
          </div>
        </div>
      )}
      <AiOutputDialog
        openDialog={showAiOutputDialog}
        setCloseDialog={() => setShowAiOutputDialog(false)}
        originalImage={originalImageUrl}
        aiGeneratedImage={aiImageOutputUrl}
      />
    </div>
  );
};

export default History;
