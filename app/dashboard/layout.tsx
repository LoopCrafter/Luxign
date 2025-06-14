import { FC, ReactNode } from "react";
import Header from "./_components/Header";

type Dashboard = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Dashboard) {
  return (
    <div>
      <Header />
      <div className="pt-10 px-1o md:px-20 lg:px-40 xl:px-60">{children}</div>
    </div>
  );
}
