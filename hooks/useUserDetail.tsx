import { UserContextType, UserDetail } from "@/app/_context/userDetail";
import { useContext } from "react";

export const useUserDetail = (): UserContextType => {
  const context = useContext(UserDetail);
  if (!context) {
    throw new Error("useUserDetail must be used within a UserDetail.Provider");
  }
  return context;
};
