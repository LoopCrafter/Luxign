"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import Image from "next/image";
import { CirclePoundSterling } from "lucide-react";
import { useUserDetail } from "@/src/hooks";

export function UserDropdown() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const [open, setOpen] = useState(false);
  const { userDetail } = useUserDetail();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setOpen(false);
    };

    if (open) document.addEventListener("click", handler);

    return () => document.removeEventListener("click", handler);
  }, [open]);

  if (!isLoaded) return null;
  if (!user)
    return (
      <Link
        href="/dashboard"
        className={`py-1.5 rounded-full bg-primary px-4 text-primary-foreground hover:bg-primary/90 shadow-lg`}
      >
        Try Luxign Now
      </Link>
    );
  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <div className="flex gap-2 p-1.5 px-3 items-center bg-slate-100 rounded-lg">
          <Link
            href="/dashboard/buy-credit"
            className="flex items-center justify-center gap-2 text-sm"
          >
            <CirclePoundSterling className="size-4" />
            {userDetail?.credit} Credits
          </Link>
        </div>
        <Image
          src={user.imageUrl}
          alt="avatar"
          onClick={() => setOpen(!open)}
          className="w-8 h-8 rounded-lg cursor-pointer border"
          width={40}
          height={40}
        />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-xl border p-2 z-50">
          {/* User Info */}
          <div className="px-3 py-2 border-b">
            <p className="text-sm font-semibold">{user.fullName}</p>
            <p className="text-xs text-gray-500">
              {user.primaryEmailAddress?.emailAddress}
            </p>
          </div>

          {/* Menu */}
          <div className="py-2 space-y-1">
            <Link
              href="/dashboard/buy-credit"
              className="block px-3 py-2 text-sm hover:bg-gray-100 rounded-lg"
            >
              💳 Buy Credit
            </Link>
            <Link
              href="/dashboard"
              className="block px-3 py-2 text-sm hover:bg-gray-100 rounded-lg"
            >
              🕒 History
            </Link>

            <Link
              href="/profile"
              className="block px-3 py-2 text-sm hover:bg-gray-100 rounded-lg"
            >
              ⚙️ Settings
            </Link>
          </div>

          {/* Logout */}
          <div className="border-t pt-2">
            <button
              onClick={() => signOut()}
              className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
