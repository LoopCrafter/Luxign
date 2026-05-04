import { cn } from "@/src/lib/utils";
import { HTMLAttributes } from "react";
import { Container } from "./Container";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  bleed?: boolean;
  containerClassName?: string;
}

export const Section = ({
  className,
  bleed,
  containerClassName,
  children,
  ...props
}: SectionProps) => (
  <section className={cn("py-16 sm:py-20 lg:py-24", className)} {...props}>
    {bleed ? (
      children
    ) : (
      <Container className={containerClassName}>{children}</Container>
    )}
  </section>
);
