"use client";
import { Button } from "@/components/ui/button";
import { useUserDetail } from "@/hooks";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

const Header = () => {
  const { userDetail } = useUserDetail();

  return (
    <div className="p-5 shadow-sm flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Image src="/logo.svg" alt="Logo" width={40} height={40} />
        <h2 className="font-bold text-lg">AI Room Design</h2>
      </div>
      <Button variant="ghost" className="rounded-full text-primary">
        Buy More Credits
      </Button>
      <div className="flex items-center gap-4">
        <div className="flex gap-2 p-1 px-3 items-center bg-slate-200 rounded-full">
          <Image src="/star.png" alt="star" width={20} height={20} />
          <h2>{userDetail?.credit}</h2>
        </div>
        <UserButton />
      </div>
    </div>
  );
};

export default Header;
