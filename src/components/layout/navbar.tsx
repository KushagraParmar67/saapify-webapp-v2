"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Zap } from "lucide-react";

const NAV = [
  { label: "Services", href: "/services" },
  { label: "AI Suite", href: "/ai" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0a192f]/90 backdrop-blur-xl border-b border-white/[0.06]"
          : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Zap className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-bold text-lg tracking-tight text-white">
            Saa<span className="text-cyan-400">P</span>ify
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="px-4 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/[0.05] transition-all"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/contact"
            className="px-4 py-2 rounded-lg border border-gray-700 text-gray-300 text-sm hover:border-gray-500 hover:text-white transition-all"
          >
            Contact
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-black text-sm font-semibold hover:bg-gray-100 transition-all"
          >
            Get Started
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((p) => !p)}
          className="md:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-all"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#0a192f]/95 backdrop-blur-xl border-b border-white/[0.06] overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-6 pb-6 pt-2 flex flex-col gap-1">
              {NAV.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/[0.05] text-base font-medium transition-all"
                >
                  {label}
                </Link>
              ))}
              <div className="pt-3 border-t border-gray-800/60 mt-2">
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white text-black font-semibold text-sm"
                >
                  Get Started
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
