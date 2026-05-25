"use client";

import { memo } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const InfinityLoopCanvas = dynamic(
  () =>
    import("./infinity-loop-canvas").then((m) => ({
      default: m.InfinityLoopCanvas,
    })),
  { ssr: false }
);

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const InfinityLoopSection = memo(function InfinityLoopSection() {
  return (
    <section className="relative py-28 px-4 sm:px-6 bg-[#0a192f] overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.03] to-transparent pointer-events-none" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-500/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute right-1/4 top-1/3 w-[300px] h-[300px] bg-purple-500/[0.04] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute left-1/4 bottom-1/3 w-[300px] h-[300px] bg-cyan-500/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/[0.08] text-cyan-400 text-xs tracking-wider uppercase mb-6"
          >
            <Sparkles className="w-3 h-3" />
            Connected Ecosystem
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight"
          >
            Everything works{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              together
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-4 text-gray-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed"
          >
            Every service feeds the next. Strategy informs product. Product shapes media.
            Media drives organic growth. A continuous loop — not a checklist.
          </motion.p>
        </motion.div>

        {/* Infinity canvas */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <InfinityLoopCanvas />
        </motion.div>

        {/* Node legend — mobile only (labels are hidden on the SVG for mobile) */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger}
          className="mt-10 flex flex-wrap justify-center gap-3 md:hidden"
        >
          {[
            { label: "Strategy", color: "#22d3ee" },
            { label: "Consulting", color: "#60a5fa" },
            { label: "Product", color: "#c084fc" },
            { label: "Media", color: "#22d3ee" },
            { label: "Marketing", color: "#60a5fa" },
            { label: "Creative", color: "#c084fc" },
            { label: "Organic", color: "#22d3ee" },
          ].map(({ label, color }) => (
            <motion.span
              key={label}
              variants={fadeUp}
              className="px-3 py-1 rounded-full text-xs font-medium border"
              style={{
                borderColor: `${color}40`,
                backgroundColor: `${color}10`,
                color,
              }}
            >
              {label}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

InfinityLoopSection.displayName = "InfinityLoopSection";
export { InfinityLoopSection };
