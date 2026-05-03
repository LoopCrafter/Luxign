import { Button, buttonVariants } from "@/components/ui/button";
import { Section } from "./Section";
import Image from "next/image";
import { ArrowLeftRight } from "lucide-react";
import Link from "next/link";

export const Hero = () => (
  <Section
    className="relative overflow-hidden bg-gradient-hero pt-12 pb-8 sm:pt-20 lg:pt-24"
    id="top"
  >
    <div className="mx-auto max-w-3xl text-center">
      <span className="inline-flex items-center rounded-full bg-primary-soft px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
        AI-Powered Interiors
      </span>
      <h1 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
        Design, Reimagined with AI
      </h1>
      <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
        Upload your room, choose a style, and instantly visualize stunning
        interior designs with architectural precision.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/dashboard"
          className={`${buttonVariants({ size: "lg" })} rounded-full bg-primary px-6 text-primary-foreground shadow-soft hover:bg-primary/90`}
        >
          Start Designing
        </Link>
        <Button
          size="lg"
          variant="outline"
          className="rounded-full border-border bg-background px-6 hover:bg-muted"
        >
          See Examples
        </Button>
      </div>
    </div>

    <div className="mt-14 sm:mt-16">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl shadow-card ring-1 ring-border/60">
        <div className="relative aspect-[16/9] w-full flex items-center">
          <Image
            src="/images/before.png"
            alt="Before and after interior design preview"
            className="h-full w-1/2 object-cover select-none"
            width={1600}
            height={900}
          />
          <Image
            src="/images/after.png"
            alt="Before and after interior design preview"
            className="h-full w-1/2 object-cover select-none"
            width={1600}
            height={900}
          />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background/95 px-3 py-1.5 text-xs font-medium shadow-soft">
            <ArrowLeftRight className="size-4" />
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-primary/95 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-primary-foreground">
            Rendering Reality...
          </div>
        </div>
      </div>
    </div>
  </Section>
);
