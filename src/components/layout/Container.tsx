import { cn } from "@/src/lib/utils";
import { HTMLAttributes } from "react";

export const Container = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8", className)}
    {...props}
  />
);
