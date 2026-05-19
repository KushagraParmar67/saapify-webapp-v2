'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const DottedSurface = dynamic(
  () => import('@/components/ui/dotted-surface').then((m) => m.DottedSurface),
  { ssr: false, loading: () => null }
);

export function HeroSection() {
  const [isLoading, setIsLoading] = useState(true);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const loaderTimer = setTimeout(() => setIsLoading(false), 2500);
    const heroTimer = setTimeout(() => setHeroVisible(true), 2800);
    return () => {
      clearTimeout(loaderTimer);
      clearTimeout(heroTimer);
    };
  }, []);

  return (
    <>
      {/* Fixed Three.js background — no children, sits behind everything */}
      <DottedSurface />

      {/* Hero section: takes real space in document flow */}
      <section
        className="relative flex items-center justify-center w-full"
        style={{ minHeight: '100dvh' }}
      >
        <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 sm:px-6 pt-16 pb-8 text-center pointer-events-auto">
          <h1
            className="font-bold tracking-tight text-white w-full"
            style={{
              fontSize: 'clamp(2.5rem, 12vw, 8rem)',
              lineHeight: 1.05,
              animation: heroVisible ? 'fadeInUp 0.9s ease-out both' : 'none',
              opacity: heroVisible ? undefined : 0,
            }}
          >
            Saa<span className="text-[#1e40af]">P</span>ify
          </h1>

          <p
            className="mt-4 sm:mt-6 text-slate-400 font-light leading-relaxed text-center text-sm sm:text-base md:text-lg max-w-[90vw] break-words"
            style={{
              animation: heroVisible ? 'fadeInUp 0.9s ease-out 0.25s both' : 'none',
              opacity: heroVisible ? undefined : 0,
            }}
          >
            Structured Services &mdash; Predictable Outcome
          </p>
        </div>
      </section>
    </>
  );
}
