import { Button, buttonVariants } from "@/components/ui/button";
import { Section } from "./Section";
import Link from "next/link";

export const CallToAction = () => (
  <Section className="bg-white">
    <div className="relative overflow-hidden rounded-3xl bg-gradient-cta px-6 py-16 text-center text-white shadow-card sm:px-12 sm:py-20">
      <h2 className="mx-auto max-w-xl font-display text-3xl leading-tight tracking-tight sm:text-4xl">
        Transform Your Space Today
      </h2>
      <p className="mx-auto mt-4 max-w-md text-sm text-white/70">
        Join over 50,000 homeowners and designers who use Luxign to create their
        dream interiors in minutes.
      </p>
      <div className="mt-8">
        <Link
          href="/dashboard"
          className={`rounded-full bg-white px-6 text-[#17171c] hover:bg-white/90 py-3`}
        >
          Try Luxign Now
        </Link>
      </div>
      <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[11px] uppercase tracking-wider text-white/50">
        <li>Featured in Vogue</li>
        <li>Architectural Digest</li>
        <li>Dwell Magazine</li>
      </ul>
    </div>
  </Section>
);
