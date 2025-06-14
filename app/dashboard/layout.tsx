import { FC, ReactNode } from "react";
import Header from "./_components/Header";

type Dashboard = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Dashboard) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
