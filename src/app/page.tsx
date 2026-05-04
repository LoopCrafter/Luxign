import { Hero } from "./_components/Hero";
import { HowItWorks } from "./_components/HowItWorks";
import { Features } from "./_components/Features";
import { CuratedStyles } from "./_components/CuratedStyles";
import { Showcase } from "./_components/Showcase";
import { CallToAction } from "./_components/CallToAction";
import { Footer } from "@/src/components/layout/Footer";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <HowItWorks />
      <Features />
      <CuratedStyles />
      <Showcase />
      <CallToAction />
    </div>
  );
}
