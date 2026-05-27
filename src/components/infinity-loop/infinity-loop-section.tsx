"use client";

import { memo } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

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
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 45%, #121b3a 0%, #07091c 55%, #02030a 100%)",
        padding: "clamp(40px, 8vh, 96px) 16px",
      }}
    >
      {/* Ambient color washes */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            "radial-gradient(circle at 18% 78%, rgba(93,168,255,0.18), transparent 38%)",
            "radial-gradient(circle at 82% 22%, rgba(255,125,200,0.10), transparent 36%)",
            "radial-gradient(circle at 50% 50%, rgba(125,241,255,0.06), transparent 55%)",
          ].join(", "),
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="text-center mb-12"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6"
            style={{
              borderColor: "rgba(125,241,255,0.30)",
              background: "rgba(125,241,255,0.07)",
              color: "#7df1ff",
              fontSize: "11px",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#7df1ff",
                boxShadow: "0 0 8px #7df1ff",
                flexShrink: 0,
              }}
            />
            Connected Ecosystem
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="font-bold leading-tight"
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              color: "rgba(235,245,255,0.98)",
            }}
          >
            Everything works{" "}
            <span
              style={{
                background:
                  "linear-gradient(90deg, #7df1ff 0%, #5da8ff 50%, #ff7dc8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              together
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-lg mx-auto leading-relaxed"
            style={{
              fontSize: "clamp(14px, 1.3vw, 17px)",
              color: "rgba(210,225,255,0.55)",
              fontWeight: 300,
              letterSpacing: "0.02em",
            }}
          >
            Every service feeds the next. Strategy informs product. Product shapes
            media. Media drives organic growth. A continuous loop — not a checklist.
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

        {/* Tagline divider */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger}
          className="mt-10 flex flex-col items-center gap-4"
        >
          <motion.div
            variants={fadeUp}
            style={{
              width: 80,
              height: 1,
              background:
                "linear-gradient(90deg, transparent, rgba(125,241,255,0.6), transparent)",
            }}
          />
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: "clamp(13px, 1.2vw, 17px)",
              fontWeight: 300,
              letterSpacing: "0.30em",
              textTransform: "uppercase",
              color: "rgba(235,245,255,0.85)",
              textShadow: "0 0 24px rgba(125,241,255,0.35)",
            }}
          >
            AI{" "}
            <span style={{ color: "rgba(255,255,255,0.45)", margin: "0 0.4em" }}>
              —
            </span>
            Every Service,{" "}
            <span style={{ color: "#7df1ff", fontWeight: 500 }}>AI-Infused</span>
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
});

InfinityLoopSection.displayName = "InfinityLoopSection";
export { InfinityLoopSection };
