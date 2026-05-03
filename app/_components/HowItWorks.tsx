import { Upload, Palette, Sparkles } from "lucide-react";
import { Section } from "./Section";

const steps = [
  {
    icon: Upload,
    title: "Upload",
    desc: "Take a photo of any room or upload an existing floor plan.",
  },
  {
    icon: Palette,
    title: "Choose Style",
    desc: "Select from over 20+ professionally curated interior styles.",
  },
  {
    icon: Sparkles,
    title: "Get Designs",
    desc: "Our AI generates multiple photorealistic versions in seconds.",
  },
];

export const HowItWorks = () => (
  <Section id="how" className="bg-[#faf8f5]">
    <div className="text-center">
      <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
        How It Works
      </h2>
      <p className="mt-3 text-sm text-muted-foreground sm:text-base">
        Three simple steps to your dream space
      </p>
    </div>

    <div className="relative mt-14 grid gap-12 md:grid-cols-3">
      <div
        aria-hidden
        className="absolute left-[16%] right-[16%] top-7 hidden h-px bg-border md:block"
      />
      {steps.map(({ icon: Icon, title, desc }) => (
        <div
          key={title}
          className="relative flex flex-col items-center text-center"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-background ring-1 ring-border shadow-soft">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <h3 className="mt-5 text-base font-semibold">{title}</h3>
          <p className="mt-2 max-w-[14rem] text-sm text-muted-foreground">
            {desc}
          </p>
        </div>
      ))}
    </div>
  </Section>
);
