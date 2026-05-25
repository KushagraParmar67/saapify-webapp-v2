"use client";

import { useState, useEffect, useCallback, memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useScroll,
  AnimatePresence,
  animate,
  type MotionValue,
} from "framer-motion";
import { Zap, ArrowUpRight } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV = [
  { label: "Services", href: "/services" },
  { label: "WaaP", href: "/waap" },
  { label: "CaaP", href: "/caap" },
  { label: "AI Suite", href: "/ai" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

// ─── Hairline heartbeat ───────────────────────────────────────────────────────

const HairlineHeartbeat = memo(function HairlineHeartbeat({
  opacity,
}: {
  opacity: MotionValue<number>;
}) {
  return (
    <motion.div
      className="absolute inset-x-0 bottom-0 h-px overflow-hidden pointer-events-none"
      style={{ opacity }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/25 to-transparent" />
      <motion.div
        className="absolute top-0 h-full w-[38%]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(34,211,238,0.75) 28%, rgba(129,140,248,0.65) 62%, transparent 100%)",
        }}
        animate={{ x: ["-100%", "370%"] }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
      />
    </motion.div>
  );
});

HairlineHeartbeat.displayName = "HairlineHeartbeat";

// ─── NavItem ──────────────────────────────────────────────────────────────────

const NavItem = memo(function NavItem({
  label,
  href,
  active,
}: {
  label: string;
  href: string;
  active: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const sweepX = useMotionValue("-110%");

  useEffect(() => {
    if (!active) {
      sweepX.set("-110%");
      return;
    }
    const controls = animate(sweepX, ["-110%", "110%"], {
      duration: 3.5,
      repeat: Infinity,
      ease: [0.4, 0, 0.6, 1] as [number, number, number, number],
      repeatDelay: 2,
    });
    return () => controls.stop();
  }, [active, sweepX]);

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative px-4 py-2.5 select-none"
      style={{ textDecoration: "none" }}
    >
      {/* Active energy capsule */}
      {active && (
        <motion.div
          layoutId="active-capsule"
          className="absolute inset-0 rounded-full overflow-hidden"
          style={{
            border: "0.75px solid rgba(34,211,238,0.32)",
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(34,211,238,0.07) 0%, transparent 70%)",
          }}
          transition={{ type: "spring", stiffness: 350, damping: 32 }}
        >
          <motion.div
            className="absolute inset-y-0 w-[2px]"
            style={{
              left: sweepX,
              background:
                "linear-gradient(180deg, transparent 0%, rgba(34,211,238,0.65) 50%, transparent 100%)",
              filter: "blur(1px)",
            }}
          />
        </motion.div>
      )}

      {/* Hover bloom */}
      <AnimatePresence>
        {hovered && !active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(34,211,238,0.06) 0%, transparent 70%)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Content row */}
      <motion.div
        className="relative flex items-center gap-1.5"
        animate={{ y: hovered ? -1 : 0 }}
        transition={{ type: "spring", stiffness: 450, damping: 28 }}
      >
        {/* Status dot */}
        <motion.span
          className="inline-block rounded-full flex-shrink-0 bg-cyan-400"
          style={{ width: 3.5, height: 3.5 }}
          animate={{
            scale: active ? 1 : hovered ? 1.6 : 1,
            opacity: active ? 1 : hovered ? 0.85 : 0.14,
          }}
          transition={{ type: "spring", stiffness: 350, damping: 22 }}
        />
        {/* Label */}
        <motion.span
          className="text-[10px] font-mono tracking-[0.18em] uppercase leading-none"
          animate={{
            color: active ? "#e2e8f0" : hovered ? "#ffffff" : "#8899aa",
          }}
          transition={{ duration: 0.18 }}
        >
          {label}
        </motion.span>
      </motion.div>

      {/* LED smear */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
        style={{
          bottom: 4,
          height: 1,
          background: "rgba(34,211,238,0.85)",
          filter: "blur(2.5px)",
        }}
        animate={{ width: hovered ? "58%" : "0%", opacity: hovered ? 0.55 : 0 }}
        transition={{ duration: 0.18 }}
      />
    </Link>
  );
});

NavItem.displayName = "NavItem";

// ─── Ghost CTA ────────────────────────────────────────────────────────────────

const GhostCta = memo(function GhostCta({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative px-4 py-2 rounded-full overflow-hidden"
      style={{
        border: "0.75px solid rgba(136,153,170,0.22)",
        textDecoration: "none",
      }}
    >
      <motion.div
        className="absolute inset-0"
        animate={{ background: hovered ? "rgba(255,255,255,0.04)" : "transparent" }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="relative text-[10px] font-mono tracking-[0.18em] uppercase"
        animate={{ color: hovered ? "#e2e8f0" : "#8899aa" }}
        transition={{ duration: 0.18 }}
      >
        {label}
      </motion.span>
    </Link>
  );
});

GhostCta.displayName = "GhostCta";

// ─── Primary CTA ──────────────────────────────────────────────────────────────

const PrimaryCta = memo(function PrimaryCta({ href }: { href: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex items-center gap-2 px-5 py-2 rounded-full overflow-hidden flex-shrink-0"
      style={{
        border: "0.75px solid rgba(34,211,238,0.22)",
        background: "rgba(34,211,238,0.06)",
        textDecoration: "none",
      }}
    >
      {/* Sweep fill */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.32, ease: "easeOut" }}
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(34,211,238,0.12) 50%, transparent 100%)",
            }}
          />
        )}
      </AnimatePresence>
      {/* Border glow */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        animate={{
          boxShadow: hovered
            ? "0 0 18px 2px rgba(34,211,238,0.14), inset 0 0 10px rgba(34,211,238,0.07)"
            : "none",
        }}
        transition={{ duration: 0.25 }}
      />
      <span className="relative text-[10px] font-mono tracking-[0.18em] uppercase text-cyan-400">
        Get Started
      </span>
      <ArrowUpRight className="relative w-3 h-3 text-cyan-400 flex-shrink-0" />
    </Link>
  );
});

PrimaryCta.displayName = "PrimaryCta";

// ─── Dot grid (mobile trigger) ────────────────────────────────────────────────

// 6 dots in 2×3 grid. On open they converge toward an X.
const DOTS_CLOSED: Array<[number, number]> = [
  [-3.5, -4], [3.5, -4],
  [-3.5,  0], [3.5,  0],
  [-3.5,  4], [3.5,  4],
];
const DOTS_OPEN: Array<[number, number]> = [
  [-4.5, -4.5], [4.5, -4.5],
  [   0,     0], [  0,    0],
  [-4.5,  4.5], [4.5,  4.5],
];

const DotGrid = memo(function DotGrid({ open }: { open: boolean }) {
  return (
    <div className="relative w-7 h-7 flex items-center justify-center">
      {DOTS_CLOSED.map((_pos, i) => {
        const [cx, cy] = open ? DOTS_OPEN[i] : DOTS_CLOSED[i];
        const isMid = i === 2 || i === 3;
        return (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{ width: 3, height: 3, background: "#8899aa" }}
            animate={{
              x: cx,
              y: cy,
              opacity: open && isMid ? 0 : 1,
              scale: open && !isMid ? 1.25 : 1,
              background: open ? "#22d3ee" : "#8899aa",
            }}
            transition={{ type: "spring", stiffness: 420, damping: 26 }}
          />
        );
      })}
    </div>
  );
});

DotGrid.displayName = "DotGrid";

// ─── Mobile menu ──────────────────────────────────────────────────────────────

// Center-out stagger — items closest to center appear first
function mobileDelay(i: number): number {
  const center = (NAV.length - 1) / 2;
  return Math.abs(i - center) * 0.055;
}

const MobileMenu = memo(function MobileMenu({
  onClose,
  pathname,
}: {
  onClose: () => void;
  pathname: string;
}) {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{
        height: { type: "spring", stiffness: 280, damping: 30 },
        opacity: { duration: 0.18 },
      }}
      className="overflow-hidden"
      style={{
        background: "rgba(5,12,26,0.97)",
        borderBottom: "0.75px solid rgba(34,211,238,0.1)",
        boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 pt-4 pb-8 flex flex-col gap-0.5">
        {NAV.map(({ label, href }, i) => {
          const active = pathname === href;
          return (
            <motion.div
              key={href}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 3 }}
              transition={{
                delay: mobileDelay(i),
                duration: 0.22,
                ease: "easeOut",
              }}
            >
              <Link
                href={href}
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-3.5 rounded-xl"
                style={{
                  background: active ? "rgba(34,211,238,0.05)" : "transparent",
                  border: active
                    ? "0.75px solid rgba(34,211,238,0.15)"
                    : "0.75px solid transparent",
                }}
              >
                <motion.span
                  className="rounded-full flex-shrink-0 bg-cyan-400"
                  style={{ width: 3.5, height: 3.5, opacity: active ? 1 : 0.18 }}
                />
                <span
                  className="text-sm font-mono tracking-[0.12em] uppercase"
                  style={{ color: active ? "#e2e8f0" : "#8899aa" }}
                >
                  {label}
                </span>
                {active && (
                  <motion.div
                    layoutId="mobile-active-dot"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400"
                    style={{ filter: "blur(0.5px)" }}
                  />
                )}
              </Link>
            </motion.div>
          );
        })}

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.32, duration: 0.2 }}
          className="mt-4 pt-4"
          style={{ borderTop: "0.75px solid rgba(136,153,170,0.08)" }}
        >
          <Link
            href="/contact"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full"
            style={{
              background: "rgba(34,211,238,0.07)",
              border: "0.75px solid rgba(34,211,238,0.22)",
            }}
          >
            <span className="text-[11px] font-mono tracking-[0.18em] uppercase text-cyan-400">
              Get Started
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
          </Link>
        </motion.div>
      </div>

      {/* Exhale glow at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent 5%, rgba(34,211,238,0.45) 38%, rgba(129,140,248,0.38) 62%, transparent 95%)",
          filter: "blur(0.75px)",
        }}
      />
    </motion.div>
  );
});

MobileMenu.displayName = "MobileMenu";

// ─── Navbar ───────────────────────────────────────────────────────────────────

export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Scroll spring
  const scrollProg = useTransform(scrollY, [0, 220], [0, 1]);
  const scrollSpring = useSpring(scrollProg, { stiffness: 85, damping: 24 });

  // Derived style values
  const headerBg = useTransform(
    scrollSpring,
    (p) => `rgba(5,12,26,${(p * 0.93).toFixed(3)})`
  );
  const backdropBlur = useTransform(
    scrollSpring,
    (p) => `blur(${(p * 20).toFixed(1)}px)`
  );
  const paddingY = useTransform(scrollSpring, [0, 1], [14, 8]);
  const hairlineOpacity = useTransform(
    scrollSpring,
    [0, 0.4, 1],
    [0.55, 0.32, 0.9]
  );
  const borderLineOpacity = useTransform(scrollSpring, [0, 1], [0, 0.07]);

  // Ghost light
  const rawMouseX = useMotionValue(0.5);
  const mouseX = useSpring(rawMouseX, { stiffness: 80, damping: 20 });
  const ghostLeft = useTransform(
    mouseX,
    [0, 1],
    ["-80px", "calc(100% + 80px)"]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      rawMouseX.set((e.clientX - rect.left) / rect.width);
    },
    [rawMouseX]
  );

  const handleMouseLeave = useCallback(() => {
    rawMouseX.set(0.5);
  }, [rawMouseX]);

  return (
    <motion.header
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="fixed inset-x-0 top-0 z-50"
      style={{
        backgroundColor: headerBg,
        backdropFilter: backdropBlur,
        WebkitBackdropFilter: backdropBlur,
      }}
    >
      {/* Ghost light trailing cursor */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden
      >
        <motion.div
          className="absolute top-0 h-full w-[180px] -translate-x-1/2"
          style={{
            left: ghostLeft,
            background:
              "radial-gradient(ellipse 90px 100% at 50% 50%, rgba(34,211,238,0.05) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Scroll-revealed static border behind hairline */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-px bg-white pointer-events-none"
        style={{ opacity: borderLineOpacity }}
      />

      {/* Main content row */}
      <motion.div
        className="relative max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between"
        style={{ paddingTop: paddingY, paddingBottom: paddingY }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="relative w-7 h-7">
            {/* Breathing ambient glow */}
            <motion.div
              className="absolute inset-0 rounded-lg bg-cyan-400 pointer-events-none"
              animate={{ opacity: [0.1, 0.28, 0.1], scale: [1, 1.55, 1] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
            </div>
          </div>
          <span className="font-bold text-lg tracking-tight text-white">
            Saa<span className="text-cyan-400">P</span>ify
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center">
          {NAV.map(({ label, href }) => (
            <NavItem
              key={href}
              label={label}
              href={href}
              active={pathname === href}
            />
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-2 flex-shrink-0">
          <GhostCta href="/contact" label="Contact" />
          <PrimaryCta href="/contact" />
        </div>

        {/* Mobile trigger */}
        <button
          onClick={() => setMobileOpen((p) => !p)}
          className="md:hidden relative w-8 h-8 flex items-center justify-center"
          aria-label="Toggle menu"
        >
          <DotGrid open={mobileOpen} />
        </button>
      </motion.div>

      {/* Hairline heartbeat */}
      <HairlineHeartbeat opacity={hairlineOpacity} />

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <MobileMenu
            key="mobile-menu"
            onClose={() => setMobileOpen(false)}
            pathname={pathname}
          />
        )}
      </AnimatePresence>
    </motion.header>
  );
}
