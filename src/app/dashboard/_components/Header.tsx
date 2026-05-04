"use client";
import TransitionLink from "@/src/components/ui/TransitionLink";
import { Button } from "@/src/components/ui/button";
import { useUserDetail } from "@/src/hooks";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const { userDetail } = useUserDetail();
  const { user } = useUser();
  return (
    <div className="p-5 shadow-sm flex justify-between items-center sticky top-0 bg-white z-20">
      <TransitionLink href="/dashboard">
        <button className="flex items-center gap-2">
          <Image
            src="/images/logo.svg"
            alt="Logo"
            width={100}
            height={50}
            className="object-cover h-[40px]"
          />
        </button>
      </TransitionLink>
      <Link href="/dashboard/buy-credit">
        <Button variant="ghost" className="rounded-full text-primary">
          Buy More Credits
        </Button>
      </Link>
      {user ? (
        <div className="flex items-center gap-4">
          <div className="flex gap-2 p-1 px-3 items-center bg-slate-200 rounded-full">
            <Image src="/star.png" alt="star" width={20} height={20} />
            <h2>{userDetail?.credit}</h2>
          </div>
          <UserButton />
        </div>
      ) : null}
    </div>
  );
};

export default Header;
