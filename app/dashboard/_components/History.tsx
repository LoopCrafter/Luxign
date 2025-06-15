"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import { useState } from "react";
import EmptyState from "./EmptyState";
import Link from "next/link";

const History = () => {
  const { user } = useUser();
  const [userRoomList, setUserRoomList] = useState([]);
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-xl">Hello, {user?.fullName}</h2>
        <Link href="/dashboard/create-new">
          <Button>
            <Plus /> Redesign Room
          </Button>
        </Link>
      </div>
      {userRoomList?.length === 0 ? <EmptyState /> : <div></div>}
    </div>
  );
};

export default History;
