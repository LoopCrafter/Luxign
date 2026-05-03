import { Hero } from "./_components/Hero";
import { HowItWorks } from "./_components/HowItWorks";
import { Features } from "./_components/Features";
import { CuratedStyles } from "./_components/CuratedStyles";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <HowItWorks />
      <Features />
      <CuratedStyles />
    </div>
  );
}
