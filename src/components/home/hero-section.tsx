'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Loader } from '@/components/ui/loader';

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
      <Loader isVisible={isLoading} />

      <DottedSurface>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto px-6">
          <div className="text-center">
            <h1
              className="font-bold tracking-tight text-white"
              style={{
                fontSize: 'clamp(3.5rem, 10vw, 8rem)',
                lineHeight: 1.05,
                animation: heroVisible
                  ? 'fadeInUp 0.9s ease-out both'
                  : 'none',
                opacity: heroVisible ? undefined : 0,
              }}
            >
              Saa<span className="text-[#1e40af]">P</span>ify
            </h1>

            <p
              className="mt-6 text-slate-400 font-light tracking-wide"
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
                animation: heroVisible
                  ? 'fadeInUp 0.9s ease-out 0.25s both'
                  : 'none',
                opacity: heroVisible ? undefined : 0,
              }}
            >
              Structured Services &mdash; Predictable Outcome
            </p>
          </div>
        </div>
      </DottedSurface>
    </>
  );
}
