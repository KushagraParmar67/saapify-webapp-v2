"use client";

import { CosmicParallaxBg } from "@/components/ui/parallax-cosmic-background";

const CosmicHero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      <CosmicParallaxBg 
        head="SaaPify" 
        text="Structured, Services, -, Predictable, Outcomes" 
        loop={false}
      />
    </section>
  );
};

export default CosmicHero;
