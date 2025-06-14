"use client";
import { useUser } from "@clerk/nextjs";
import { FC, ReactNode, useEffect, useState } from "react";
import { UserDetail } from "./_context/userDetail";
import { User } from "@/types";

type Props = {
  children: ReactNode;
};

const Provider: FC<Props> = ({ children }) => {
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState<User | null>(null);
  useEffect(() => {
    user && verifyUser();
  }, [user]);
  const verifyUser = async () => {
    const results = await fetch("/api/verify-user", {
      method: "POST",
      body: JSON.stringify(user),
    });
    const data = await results.json();
    console.log("user is", data);
  };

  return (
    <UserDetail.Provider value={{ userDetail, setUserDetail }}>
      {children};
    </UserDetail.Provider>
  );
};

export default Provider;
