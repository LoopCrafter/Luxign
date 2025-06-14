import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";
import React from "react";

const EmptyState = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 mt-10">
      <Image
        src="/placeholder.png"
        alt="empty state"
        width={250}
        height={250}
      />
      <h3 className="font-medium text-lg text-gray-500">
        Create New AI Interior Design for your room
      </h3>
      <Button>
        <Plus /> Redesign Room
      </Button>
    </div>
  );
};

export default EmptyState;
