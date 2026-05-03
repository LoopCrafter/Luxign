import { FC, ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";

type Dashboard = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Dashboard) {
  return (
    <div>
      {/* <Header /> */}
      <div className="pt-10 px-1o md:px-20 lg:px-40 xl:px-60">{children}</div>
      <Toaster />
    </div>
  );
}
