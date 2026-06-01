"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// ─── Icons ───────────────────────────────────────────────────────────────────

function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
      <path d="M13 2 4.5 13.5H11l-1 8.5L19.5 10H13z" />
    </svg>
  );
}
function CodeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="w-[19px] h-[19px]">
      <path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" />
    </svg>
  );
}
function AiIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[19px] h-[19px]">
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
      <circle cx="12" cy="12" r="2.4" />
    </svg>
  );
}
function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[19px] h-[19px]">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.6 2.7 2.6 15.3 0 18M12 3c-2.6 2.7-2.6 15.3 0 18" />
    </svg>
  );
}
function BuildingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[19px] h-[19px]">
      <path d="M4 21V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v15M15 21V11h3a2 2 0 0 1 2 2v8M2 21h20M8 8h3M8 12h3M8 16h3" />
    </svg>
  );
}
function ChevDownIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="w-[13px] h-[13px]">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
function ChevRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="w-[18px] h-[18px]">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}
function BurgerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="w-[20px] h-[20px]">
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}
function ExternalArrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px]">
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES_ITEMS = [
  { icon: <CodeIcon />, title: "Custom Software Development", desc: "Bespoke platforms engineered to scale.", href: "/services" },
  { icon: <AiIcon />, title: "AI Solutions & Automation", desc: "Agents & pipelines that do the work.", href: "/ai" },
  { icon: <GlobeIcon />, title: "WaaP — Website as a Product", desc: "Your site, run as a living product.", href: "/waap" },
  { icon: <BuildingIcon />, title: "CaaP — Company as a Product", desc: "Operations productized end to end.", href: "/caap" },
];

const NAV_MAIN = [
  { label: "WaaP", href: "/waap" },
  { label: "CaaP", href: "/caap" },
  { label: "AI Suite", href: "/ai" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

// ─── Mega Menu ────────────────────────────────────────────────────────────────

function MegaMenu() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.99 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="absolute top-[calc(100%+18px)] left-1/2 -translate-x-1/2 z-50 w-[760px] max-w-[88vw]"
      style={{
        background: "linear-gradient(180deg,rgba(14,20,36,.98),rgba(8,12,22,.98))",
        border: "1px solid rgba(255,255,255,.14)",
        borderRadius: 18,
        boxShadow: "0 44px 100px -34px rgba(0,0,0,.92),inset 0 1px 0 rgba(255,255,255,.05)",
        backdropFilter: "blur(22px)",
        padding: 16,
        display: "grid",
        gridTemplateColumns: "1fr 1fr .9fr",
        gap: 8,
      }}
    >
      {SERVICES_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex gap-[13px] p-[13px] rounded-xl border border-transparent hover:border-white/8 hover:bg-white/[0.035] transition-all duration-200 group"
        >
          <span
            className="flex-shrink-0 w-[38px] h-[38px] rounded-[10px] grid place-items-center text-cyan-400 transition-all duration-200 group-hover:shadow-[0_6px_18px_-8px_rgba(34,211,238,0.45)]"
            style={{
              background: "linear-gradient(160deg,rgba(34,211,238,.16),rgba(34,211,238,.04))",
              border: "1px solid rgba(34,211,238,.18)",
            }}
          >
            {item.icon}
          </span>
          <span>
            <h4 className="m-0 mb-[3px] text-[14px] font-bold text-[#eaf1fb] leading-tight tracking-[-0.01em]">{item.title}</h4>
            <p className="m-0 text-[12.5px] leading-[1.45] text-[#8b97ad]">{item.desc}</p>
          </span>
        </Link>
      ))}

      {/* Featured panel */}
      <div
        className="col-start-3 row-start-1 row-end-3 rounded-xl p-[18px] flex flex-col"
        style={{
          background: "radial-gradient(120px 120px at 80% 0%,rgba(34,211,238,.18),transparent 70%),linear-gradient(180deg,rgba(34,211,238,.08),rgba(8,12,22,.4))",
          border: "1px solid rgba(34,211,238,.2)",
        }}
      >
        <span
          className="self-start text-[10.5px] font-bold tracking-[.14em] uppercase text-cyan-400 px-[10px] py-[4px] rounded-full"
          style={{ background: "rgba(34,211,238,.12)", border: "1px solid rgba(34,211,238,.25)" }}
        >
          Featured
        </span>
        <h4 className="mt-[14px] mb-[6px] text-[17px] font-bold text-[#eaf1fb] leading-tight tracking-[-0.02em]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
          AI Suite Products
        </h4>
        <p className="m-0 mb-4 text-[12.5px] leading-[1.5] text-[#8b97ad]">
          Ready-to-deploy intelligence tools — search, agents, and analytics on one platform.
        </p>
        <Link href="/ai" className="mt-auto inline-flex items-center gap-[6px] text-[13px] font-bold text-cyan-400 group">
          Explore the Suite <ExternalArrow />
        </Link>
      </div>
    </motion.div>
  );
}

// ─── Mobile Drawer ────────────────────────────────────────────────────────────

function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) setServicesOpen(false);
  }, [open]);

  return (
    <>
      {/* Scrim */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[110]"
            style={{ background: "rgba(2,5,12,.6)", backdropFilter: "blur(4px)" }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <motion.aside
        initial={false}
        animate={{ x: open ? "0%" : "102%" }}
        transition={{ type: "spring", stiffness: 280, damping: 30 }}
        className="fixed top-0 right-0 z-[120] h-full flex flex-col p-[18px]"
        style={{
          width: "min(360px, 88vw)",
          background: "linear-gradient(180deg,#0e1424,#070b15)",
          borderLeft: "1px solid rgba(255,255,255,.14)",
          boxShadow: "-30px 0 80px -30px rgba(0,0,0,.9)",
        }}
        aria-hidden={!open}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-[18px]">
          <Link href="/" onClick={onClose} className="inline-flex items-center gap-[11px]">
            <span
              className="w-[34px] h-[34px] rounded-[10px] grid place-items-center text-[#03222c]"
              style={{
                background: "linear-gradient(150deg,#4ec5e8 0%,#22d3ee 45%,#0e7da3 100%)",
                boxShadow: "0 6px 20px -6px rgba(34,211,238,.45),inset 0 1px 0 rgba(255,255,255,.4)",
              }}
            >
              <BoltIcon />
            </span>
            <span className="font-bold text-[21px] tracking-[-0.02em] text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Saa<span className="bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">P</span>ify
            </span>
          </Link>
          <button
            onClick={onClose}
            className="w-[40px] h-[40px] rounded-[11px] grid place-items-center text-[#eaf1fb] hover:bg-white/[0.06] transition-colors"
            style={{ background: "rgba(255,255,255,.035)", border: "1px solid rgba(255,255,255,.08)" }}
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col gap-[2px] overflow-y-auto flex-1 -mx-[6px] px-[6px]">
          {/* Services accordion */}
          <button
            onClick={() => setServicesOpen((p) => !p)}
            className="flex items-center justify-between w-full text-left px-[12px] py-[14px] rounded-xl text-[16px] font-semibold text-[#eaf1fb] hover:bg-white/[0.035] transition-colors"
            aria-expanded={servicesOpen}
          >
            Services
            <span className={`transition-transform duration-250 ${servicesOpen ? "rotate-90 text-cyan-400" : "text-[#57637a]"}`}>
              <ChevRightIcon />
            </span>
          </button>
          <motion.div
            initial={false}
            animate={{ height: servicesOpen ? "auto" : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="ml-[12px] border-l border-white/[0.08] flex flex-col">
              {SERVICES_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center gap-[11px] px-[12px] py-[11px] text-[14.5px] text-[#8b97ad] hover:text-[#eaf1fb] transition-colors"
                >
                  <span className="text-cyan-400 opacity-80">{item.icon}</span>
                  {item.title}
                </Link>
              ))}
            </div>
          </motion.div>

          {NAV_MAIN.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className="flex items-center justify-between px-[12px] py-[14px] rounded-xl text-[16px] font-semibold hover:bg-white/[0.035] transition-colors"
              style={{ color: pathname === href ? "#22d3ee" : "#eaf1fb" }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA row */}
        <div className="flex flex-col gap-[10px] pt-[16px] mt-[12px]" style={{ borderTop: "1px solid rgba(255,255,255,.08)" }}>
          <Link
            href="/contact"
            onClick={onClose}
            className="flex items-center justify-center w-full py-[14px] rounded-full text-[15px] font-semibold text-[#eaf1fb] hover:bg-white/[0.06] transition-colors"
            style={{ border: "1px solid rgba(255,255,255,.14)", background: "rgba(255,255,255,.035)" }}
          >
            Contact
          </Link>
          <Link
            href="/contact"
            onClick={onClose}
            className="flex items-center justify-center gap-[7px] w-full py-[14px] rounded-full text-[15px] font-semibold text-[#02151c]"
            style={{
              background: "linear-gradient(180deg,#5fd9f0,#22d3ee)",
              boxShadow: "0 8px 24px -8px rgba(34,211,238,.45),inset 0 1px 0 rgba(255,255,255,.5)",
            }}
          >
            Get Started <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.aside>
    </>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesHovered, setServicesHovered] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navLinksRef = useRef<HTMLUListElement>(null);
  const servicesBtnRef = useRef<HTMLButtonElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const moveIndicator = useCallback((el: HTMLElement) => {
    setIndicatorStyle({ left: el.offsetLeft, width: el.offsetWidth, opacity: 1 });
  }, []);

  const hideIndicator = useCallback(() => {
    setIndicatorStyle((s) => ({ ...s, opacity: 0 }));
  }, []);

  const openServices = useCallback(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setServicesHovered(true);
  }, []);

  const closeServices = useCallback(() => {
    closeTimerRef.current = setTimeout(() => setServicesHovered(false), 120);
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[100] flex justify-center"
        style={{ padding: "18px 22px", pointerEvents: "none" }}
      >
        <div
          className="relative w-full flex items-center gap-[18px] transition-all duration-500"
          style={{
            maxWidth: scrolled ? 980 : 1180,
            height: scrolled ? 58 : 66,
            padding: "0 12px 0 22px",
            borderRadius: 999,
            background: scrolled ? "rgba(8,12,22,.84)" : "rgba(8,12,22,.66)",
            backdropFilter: "blur(22px) saturate(160%)",
            WebkitBackdropFilter: "blur(22px) saturate(160%)",
            border: "1px solid rgba(255,255,255,.08)",
            boxShadow: scrolled
              ? "0 16px 50px -22px rgba(0,0,0,.95),0 0 0 1px rgba(34,211,238,.12),inset 0 1px 0 rgba(255,255,255,.07)"
              : "0 22px 60px -28px rgba(0,0,0,.92),inset 0 1px 0 rgba(255,255,255,.07),inset 0 -1px 0 rgba(0,0,0,.3)",
            pointerEvents: "auto",
            transitionProperty: "max-width,height,background,box-shadow",
            transitionTimingFunction: "cubic-bezier(.22,1,.36,1)",
          }}
        >
          {/* Sheen border animation */}
          <span className="nav-sheen" aria-hidden />

          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-[11px] flex-shrink-0" style={{ userSelect: "none" }}>
            <span
              className="w-[34px] h-[34px] rounded-[10px] grid place-items-center text-[#03222c] flex-shrink-0"
              style={{
                background: "linear-gradient(150deg,#4ec5e8 0%,#22d3ee 45%,#0e7da3 100%)",
                boxShadow: "0 6px 20px -6px rgba(34,211,238,.45),inset 0 1px 0 rgba(255,255,255,.4)",
              }}
            >
              <BoltIcon />
            </span>
            <span className="font-bold text-[21px] tracking-[-0.02em] text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Saa<span className="bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">P</span>ify
            </span>
          </Link>

          {/* Desktop nav links */}
          <ul
            ref={navLinksRef}
            className="hidden md:flex relative items-center gap-[2px] list-none m-0 p-0 mx-auto"
            onMouseLeave={hideIndicator}
          >
            {/* Magnetic sliding indicator */}
            <span
              className="absolute top-1/2 -translate-y-1/2 pointer-events-none rounded-full transition-all duration-[340ms]"
              style={{
                left: indicatorStyle.left,
                width: indicatorStyle.width,
                height: 40,
                opacity: indicatorStyle.opacity,
                background: "linear-gradient(180deg,rgba(34,211,238,.2),rgba(34,211,238,.05))",
                border: "1px solid rgba(34,211,238,.3)",
                boxShadow: "0 0 22px -6px rgba(34,211,238,.45),inset 0 1px 0 rgba(255,255,255,.12)",
                transitionProperty: "left,width,opacity",
                transitionTimingFunction: "cubic-bezier(.22,1,.36,1)",
              }}
              aria-hidden
            />

            {/* Services with mega menu */}
            <li className="relative flex" onMouseEnter={openServices} onMouseLeave={closeServices}>
              <button
                ref={servicesBtnRef}
                className="relative z-[1] inline-flex items-center gap-[7px] px-[16px] py-[9px] rounded-full text-[14px] font-semibold tracking-[-0.005em] border-none bg-transparent transition-colors duration-250 cursor-pointer group"
                style={{ color: servicesHovered ? "#fff" : "#8b97ad" }}
                onMouseEnter={(e) => moveIndicator(e.currentTarget)}
                aria-haspopup="true"
                aria-expanded={servicesHovered}
              >
                <span
                  className="w-[5px] h-[5px] rounded-full bg-cyan-400 flex-shrink-0 transition-all duration-300"
                  style={{
                    boxShadow: "0 0 8px rgba(34,211,238,.45)",
                    opacity: servicesHovered ? 1 : 0,
                    transform: servicesHovered ? "scale(1)" : "scale(.4)",
                  }}
                />
                Services
                <span className={`transition-transform duration-300 opacity-70 ${servicesHovered ? "rotate-180" : ""}`}>
                  <ChevDownIcon />
                </span>
              </button>

              <AnimatePresence>
                {servicesHovered && (
                  <div onMouseEnter={openServices} onMouseLeave={closeServices}>
                    {/* Bridge gap so mouse can move from button to panel */}
                    <div className="absolute top-full left-0 w-full h-[18px]" />
                    <MegaMenu />
                  </div>
                )}
              </AnimatePresence>
            </li>

            {NAV_MAIN.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="group relative z-[1] inline-flex items-center gap-[7px] px-[16px] py-[9px] rounded-full text-[14px] font-semibold tracking-[-0.005em] transition-colors duration-250"
                  style={{ color: pathname === href ? "#fff" : "#8b97ad" }}
                  onMouseEnter={(e) => moveIndicator(e.currentTarget)}
                >
                  <span
                    className={`w-[5px] h-[5px] rounded-full bg-cyan-400 flex-shrink-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 ${pathname === href ? "opacity-100 scale-100" : "opacity-0 scale-[0.4]"}`}
                    style={{ boxShadow: "0 0 8px rgba(34,211,238,.45)" }}
                  />
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Divider */}
          <div className="hidden md:block w-px h-[26px] flex-shrink-0" style={{ background: "rgba(255,255,255,.14)" }} />

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-[10px] flex-shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-[7px] font-semibold text-[13.5px] tracking-[-0.005em] rounded-full px-[16px] py-[9px] text-[#eaf1fb] hover:text-white hover:bg-white/[0.06] transition-all duration-220 whitespace-nowrap"
              style={{ background: "transparent", border: "1px solid transparent" }}
            >
              Contact
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-[7px] font-semibold text-[13.5px] tracking-[-0.005em] rounded-full px-[18px] py-[10px] text-[#02151c] whitespace-nowrap hover:-translate-y-px transition-all duration-220"
              style={{
                background: "linear-gradient(180deg,#5fd9f0,#22d3ee)",
                boxShadow: "0 8px 24px -8px rgba(34,211,238,.45),inset 0 1px 0 rgba(255,255,255,.5)",
                border: "1px solid transparent",
              }}
            >
              Get Started <ArrowUpRight className="w-[15px] h-[15px]" />
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden ml-auto flex items-center justify-center rounded-full hover:bg-white/[0.06] transition-colors"
            style={{
              width: 42,
              height: 42,
              background: "rgba(255,255,255,.035)",
              border: "1px solid rgba(255,255,255,.08)",
              color: "#eaf1fb",
            }}
            aria-label="Open menu"
          >
            <BurgerIcon />
          </button>
        </div>
      </nav>

      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
