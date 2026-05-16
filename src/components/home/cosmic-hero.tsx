"use client";

import { CosmicParallaxBg } from "@/components/ui/parallax-cosmic-background";

const CosmicHero = () => {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <CosmicParallaxBg 
        head="EaseMize" 
        text="Easy, customizeable, Best" 
        loop={true}
      />
    </div>
  );
};

export default CosmicHero;
