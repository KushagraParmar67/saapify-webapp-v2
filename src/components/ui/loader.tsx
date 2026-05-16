'use client';

interface LoaderProps {
  isVisible: boolean;
}

export function Loader({ isVisible }: LoaderProps) {
  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a192f] transition-opacity duration-700 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-5xl font-bold tracking-tight text-white">
          Saa<span className="text-[#1e40af]">P</span>ify
        </h1>

        <div className="h-[2px] w-52 overflow-hidden rounded-full bg-[#112240]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#133286] to-[#1e40af]"
            style={{ animation: 'growWidth 2s ease-out forwards' }}
          />
        </div>

        <p
          className="text-xs tracking-[0.3em] text-slate-500 uppercase"
          style={{ animation: 'fadeInText 0.8s ease-out 0.4s both' }}
        >
          Loading
        </p>
      </div>
    </div>
  );
}
