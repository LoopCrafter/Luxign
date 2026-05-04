import { Atom, Zap, Layers, Sparkle } from "lucide-react";
import { Section } from "../../components/layout/Section";
import { cn } from "@/src/lib/utils";

type Feature = {
  icon: typeof Atom;
  title: string;
  desc: string;
  variant: "light" | "dark" | "soft" | "outline";
  span?: string;
};

const features: Feature[] = [
  {
    icon: Atom,
    title: "AI Generation",
    desc: "Proprietary neural networks trained on thousands of architectural masterpieces to deliver unique, spatial designs.",
    variant: "light",
    span: "md:col-span-2",
  },
  {
    icon: Zap,
    title: "Fast Results",
    desc: "Experience real-time rendering. No more waiting days for moodboards.",
    variant: "dark",
  },
  {
    icon: Layers,
    title: "Multiple Styles",
    desc: "From Mid-Century to Cyberpunk, explore endless aesthetics.",
    variant: "soft",
  },
  {
    icon: Sparkle,
    title: "Realistic Outputs",
    desc: "Advanced ray-tracing simulation ensures every light source and texture feels authentic and buildable.",
    variant: "outline",
    span: "md:col-span-2",
  },
];

const variantStyles: Record<Feature["variant"], string> = {
  light: "bg-white ring-1 ring-border",
  dark: "bg-black text-white",
  soft: "bg-primary/10",
  outline: "bg-background ring-1 ring-border",
};

export const Features = () => (
  <Section id="features" className="bg-[#faf8f5] pt-0">
    <div className="grid gap-5 md:grid-cols-3">
      {features.map(({ icon: Icon, title, desc, variant, span }) => {
        const isDark = variant === "dark";
        return (
          <div
            key={title}
            className={cn(
              "group rounded-2xl p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card",
              variantStyles[variant],
              span,
            )}
          >
            <div
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg",
                isDark
                  ? "bg-primary/20 text-primary"
                  : "bg-primary/10 text-primary",
              )}
            >
              <Icon className="size-5" />
            </div>
            <h3 className="mt-5 text-lg font-semibold">{title}</h3>
            <p
              className={cn(
                "mt-2 text-sm",
                isDark ? "text-white/70" : "text-muted-foreground",
              )}
            >
              {desc}
            </p>
          </div>
        );
      })}
    </div>
  </Section>
);
