"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function Home() {
  return (
    <div className="">
      <h1>TEST</h1>
      <Button onClick={() => redirect("/dashboard")}>CLick</Button>
    </div>
  );
}
