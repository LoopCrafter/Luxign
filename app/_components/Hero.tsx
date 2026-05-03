import { Button } from "@/components/ui/button";
import { Section } from "./Section";
import Image from "next/image";

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
        <Button
          size="lg"
          className="rounded-full bg-primary px-6 text-primary-foreground shadow-soft hover:bg-primary/90"
        >
          Start Designing
        </Button>
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
        <div className="relative aspect-[16/9] w-full">
          <Image
            src="/images/hero-preview.jpg"
            alt="Before and after interior design preview"
            className="absolute inset-0 h-full w-full object-cover"
            width={1600}
            height={900}
          />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background/95 px-3 py-1.5 text-xs font-medium shadow-soft">
            ‹ ›
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-primary/95 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-primary-foreground">
            Rendering Reality...
          </div>
        </div>
      </div>
    </div>
  </Section>
);
