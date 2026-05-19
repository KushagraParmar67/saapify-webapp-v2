'use client';

// ─── Spinner ──────────────────────────────────────────────────────────────────
// Plug-and-play concentric spinner. Drop it anywhere in the app.
//
// Props:
//   size  — 'sm' | 'md' | 'lg' | 'xl'  (default: 'md')
//
// Usage:
//   <Spinner />
//   <Spinner size="lg" />

type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';

const SIZE: Record<SpinnerSize, { outer: string; inner: string }> = {
  sm:  { outer: 'h-8  w-8',  inner: 'h-5  w-5'  },
  md:  { outer: 'h-12 w-12', inner: 'h-8  w-8'  },
  lg:  { outer: 'h-16 w-16', inner: 'h-11 w-11' },
  xl:  { outer: 'h-24 w-24', inner: 'h-16 w-16' },
};

interface SpinnerProps {
  size?: SpinnerSize;
}

export function Spinner({ size = 'md' }: SpinnerProps) {
  const s = SIZE[size];
  return (
    <div
      className={`${s.outer} animate-spin flex items-center justify-center rounded-full border-4 border-transparent border-t-cyan-400`}
    >
      <div
        className={`${s.inner} animate-spin flex items-center justify-center rounded-full border-4 border-transparent border-t-blue-500`}
        style={{ animationDirection: 'reverse', animationDuration: '0.6s' }}
      />
    </div>
  );
}

// ─── Full-page Loader ─────────────────────────────────────────────────────────
// Used on the home page (and any page that needs a first-load gate).
//
// Props:
//   isVisible — controls opacity / pointer-events (fade out when false)
//   text      — optional subtitle under the logo  (default: 'Getting things ready…')
//
// Usage:
//   <Loader isVisible={isLoading} />
//   <Loader isVisible={isLoading} text="Fetching your data…" />

interface LoaderProps {
  isVisible: boolean;
  text?: string;
}

export function Loader({ isVisible, text = 'Getting things ready…' }: LoaderProps) {
  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a192f] transition-opacity duration-700 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex flex-col items-center gap-8">
        {/* Brand */}
        <h1
          className="text-4xl sm:text-5xl font-bold tracking-tight text-white"
          style={{ animation: 'fadeInUp 0.6s ease-out both' }}
        >
          Saa<span className="text-cyan-400">P</span>ify
        </h1>

        {/* Concentric spinner */}
        <Spinner size="xl" />

        {/* Subtitle */}
        <p
          className="text-xs tracking-[0.3em] text-slate-500 uppercase"
          style={{ animation: 'fadeInUp 0.6s ease-out 0.3s both' }}
        >
          {text}
        </p>
      </div>
    </div>
  );
}
