"use client";

import React, { memo, useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Code2, Smartphone, Brain, Cloud, Workflow, LineChart,
  ArrowUpRight, Zap, Target, Clock, Shield, Check, ChevronRight,
  Search, Rocket,
} from "lucide-react";

// ─── Shared animation variants ────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

// ─── 1. Tech Strip ────────────────────────────────────────────────────────────

const TECH = [
  "React", "Next.js", "Node.js", "Python",
  "TypeScript", "AWS", "PostgreSQL", "TensorFlow",
];

const TechStrip = memo(() => (
  <section className="py-10 bg-[#030810] border-b border-white/[0.04]">
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <p className="text-center text-gray-600 text-xs tracking-[0.22em] uppercase mb-6">
        Built on modern, production-ready technology
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
        {TECH.map((name, i) => (
          <span
            key={name}
            className="text-gray-500 text-sm font-medium hover:text-gray-300 transition-colors cursor-default"
          >
            {name}
            {i < TECH.length - 1 && (
              <span className="ml-8 text-gray-800 select-none">·</span>
            )}
          </span>
        ))}
      </div>
    </div>
  </section>
));
TechStrip.displayName = "TechStrip";

// ─── 2. Services ──────────────────────────────────────────────────────────────

const SERVICES = [
  {
    icon: Code2,
    title: "Web Applications",
    desc: "Full-stack web apps from MVP to enterprise scale, built for performance and long-term maintainability.",
    tags: ["React", "Next.js", "Node.js"],
    color: "#6E8CFB",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    desc: "Native and cross-platform iOS & Android apps that feel fast, look polished, and actually get used.",
    tags: ["React Native", "Flutter"],
    color: "#818cf8",
  },
  {
    icon: Brain,
    title: "AI & Automation",
    desc: "Custom AI models and intelligent workflows that turn repetitive work into a competitive advantage.",
    tags: ["ML Models", "LLMs", "Automation"],
    color: "#34d399",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    desc: "Scalable, cost-optimized infrastructure with CI/CD pipelines and zero-downtime deployments.",
    tags: ["AWS", "GCP", "Docker", "K8s"],
    color: "#f472b6",
  },
  {
    icon: Workflow,
    title: "API & Integrations",
    desc: "Connect any system with clean, versioned, documented APIs that hold up under real production load.",
    tags: ["REST", "GraphQL", "Webhooks"],
    color: "#fbbf24",
  },
  {
    icon: LineChart,
    title: "Data & Analytics",
    desc: "Turn raw data into actionable dashboards and predictive insights that drive real business decisions.",
    tags: ["BI", "SQL", "Pipelines"],
    color: "#e879f9",
  },
];

const ServicesSection = memo(() => (
  <section className="py-14 px-6 bg-[#030810]">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="mb-10"
      >
        <motion.div variants={fadeUp} className="flex items-center gap-2 mb-4">
          <Zap className="w-4 h-4 text-[#6E8CFB]" />
          <span className="text-gray-500 text-sm tracking-[0.22em] uppercase">What we build</span>
        </motion.div>
        <motion.h2
          variants={fadeUp}
          className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.1] max-w-2xl"
        >
          Full-spectrum software delivery.
        </motion.h2>
        <motion.p variants={fadeUp} className="text-gray-500 mt-5 max-w-xl text-lg leading-relaxed">
          From first commit to production — we own quality end-to-end.
        </motion.p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {SERVICES.map(({ icon: Icon, title, desc, tags, color }) => (
          <motion.div
            key={title}
            variants={fadeUp}
            whileHover={{ y: -4 }}
            className="group p-6 rounded-2xl border border-gray-800/60 hover:border-gray-700 transition-all cursor-default"
            style={{ background: `linear-gradient(160deg, ${color}09 0%, transparent 60%)` }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
              style={{ background: `${color}15`, border: `1px solid ${color}28` }}
            >
              <Icon className="w-5 h-5" style={{ color }} />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">{desc}</p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md bg-gray-900 border border-gray-800 text-gray-500 text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
));
ServicesSection.displayName = "ServicesSection";

// ─── 3. Why SaaPify ───────────────────────────────────────────────────────────

const WHY_ITEMS = [
  {
    icon: Target,
    title: "Fixed-scope delivery",
    desc: "We define scope precisely upfront — no surprise cost or timeline overruns.",
  },
  {
    icon: Shield,
    title: "Production-grade quality",
    desc: "Not just MVPs. Code that holds up at scale, with tests and docs included.",
  },
  {
    icon: Clock,
    title: "Transparent timelines",
    desc: "Real-time progress visibility. No guessing, no status chase-ups.",
  },
  {
    icon: Zap,
    title: "AI-accelerated delivery",
    desc: "We use AI tooling internally to ship faster without compromising craft.",
  },
];

const WhySection = memo(() => (
  <section className="py-14 px-6 bg-[#0a192f]">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">

        {/* Left */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="flex items-center gap-2 mb-4">
            <Check className="w-4 h-4 text-emerald-400" />
            <span className="text-gray-500 text-sm tracking-[0.22em] uppercase">Why SaaPify</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-white leading-[1.1]">
            The difference between{" "}
            <span className="text-gray-500 line-through decoration-gray-600">done</span>
            {" "}and{" "}
            <span className="text-emerald-400">done right.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-500 mt-5 leading-relaxed max-w-md">
            Most agencies ship code. We ship outcomes. Every engagement starts with a commitment to quality, timeline, and budget — and we keep it.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8">
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 text-[#6E8CFB] text-sm font-medium hover:gap-2.5 transition-all"
            >
              How we work <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Right — 2×2 cards */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-2 gap-3 sm:gap-4"
        >
          {WHY_ITEMS.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="p-5 rounded-2xl border border-gray-800/60 bg-white/[0.02] hover:bg-white/[0.04] transition-all"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-3">
                <Icon className="w-4 h-4 text-emerald-400" />
              </div>
              <h4 className="text-white text-sm font-semibold mb-1.5">{title}</h4>
              <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  </section>
));
WhySection.displayName = "WhySection";

// ─── 4. AI Feature Banner ─────────────────────────────────────────────────────

const AI_STATS = [
  { value: "10x", label: "Faster delivery" },
  { value: "60%", label: "Cost reduction" },
  { value: "99.7%", label: "Model accuracy" },
  { value: "< 50ms", label: "Response latency" },
];

const AIBanner = memo(() => (
  <section className="relative py-14 px-6 bg-[#010007] overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-[#636CCB]/[0.04] via-transparent to-purple-500/[0.04] pointer-events-none" />
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#636CCB]/[0.04] rounded-full blur-[130px] pointer-events-none" />

    <div className="relative max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">

        {/* Left — text */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="flex items-center gap-2 mb-6">
            <Brain className="w-4 h-4 text-[#6E8CFB]" />
            <span className="text-[#6E8CFB] text-sm tracking-[0.22em] uppercase">AI Suite</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05]">
            AI isn&apos;t a feature.
            <br />
            <span className="bg-gradient-to-r from-[#6E8CFB] to-purple-400 bg-clip-text text-transparent">
              It&apos;s the new foundation.
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-400 mt-6 text-lg leading-relaxed">
            From custom ML models to intelligent automation, our AI Suite replaces hours of manual work with reliable, scalable intelligence — built specifically for your business.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mt-8">
            <Link
              href="/ai"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#636CCB] to-[#6E8CFB] text-white font-semibold hover:from-[#3C467B] hover:to-[#50589C] transition-all"
            >
              Explore AI Suite <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-700 text-gray-300 font-semibold hover:border-gray-500 hover:text-white transition-all"
            >
              Schedule Demo
            </Link>
          </motion.div>
        </motion.div>

        {/* Right — stats grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-2 gap-4"
        >
          {AI_STATS.map(({ value, label }) => (
            <motion.div
              key={label}
              variants={fadeUp}
              className="p-7 rounded-2xl border border-gray-800/50 bg-gradient-to-br from-white/[0.03] to-transparent"
            >
              <div className="text-4xl font-bold text-white mb-2">{value}</div>
              <div className="text-gray-500 text-sm">{label}</div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  </section>
));
AIBanner.displayName = "AIBanner";

// ─── 5. Process ───────────────────────────────────────────────────────────────

const STEPS = [
  {
    icon: Search,
    title: "Discover & Plan",
    desc: "We map requirements, define scope precisely, and build a delivery plan before a single line of code is written.",
  },
  {
    icon: Code2,
    title: "Build & Iterate",
    desc: "Agile sprints with weekly demos. You see real progress, flag changes early, and never wonder what's happening.",
  },
  {
    icon: Rocket,
    title: "Ship & Scale",
    desc: "Production-ready deployment with monitoring, docs, and a clear path to scale when the time comes.",
  },
];

const ProcessSection = memo(() => (
  <section className="py-14 px-6 bg-[#030810]">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={stagger}
        className="text-center mb-12"
      >
        <motion.div variants={fadeUp} className="flex items-center justify-center gap-2 mb-4">
          <Workflow className="w-4 h-4 text-[#6E8CFB]" />
          <span className="text-gray-500 text-sm tracking-[0.22em] uppercase">How we deliver</span>
        </motion.div>
        <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-white">
          From brief to production.
          <br />
          <span className="text-gray-500 font-normal">No surprises.</span>
        </motion.h2>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={stagger}
        className="relative grid md:grid-cols-3 gap-6"
      >
        {/* Connecting line — top-[72px] = py-8 (32px) + half of w-20 circle (40px) */}
        <div className="hidden md:block absolute top-[72px] left-[22%] right-[22%] h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />

        {STEPS.map(({ icon: Icon, title, desc }, i) => (
          <motion.div
            key={title}
            variants={fadeUp}
            transition={{ delay: i * 0.12 }}
            className="relative flex flex-col items-center text-center px-6 py-8"
          >
            <div className="relative mb-7">
              <div className="w-20 h-20 rounded-full border border-gray-800 bg-[#030810] flex items-center justify-center">
                <Icon className="w-7 h-7 text-gray-400" />
              </div>
              <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#636CCB] text-white text-[10px] font-bold flex items-center justify-center">
                {i + 1}
              </span>
            </div>
            <h3 className="text-white font-semibold text-xl mb-3">{title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
));
ProcessSection.displayName = "ProcessSection";

// ─── 6. FAQ ───────────────────────────────────────────────────────────────────

const FAQS = [
  {
    topic: "Timelines",
    q: "How long until we see something real?",
    a: "Most engagements produce a working, clickable build inside the first 2–3 weeks. You'll never wait a quarter to see progress — we ship in tight, reviewable increments from day one.",
  },
  {
    topic: "Pricing",
    q: "What does a typical project cost?",
    a: "We start with a fixed-price discovery sprint, then move to milestone-based or monthly pricing scoped to your roadmap. You approve every budget before we write a line of production code.",
  },
  {
    topic: "Your stack",
    q: "Can you work with our existing team and stack?",
    a: "Yes. We embed alongside your engineers, match your tooling and conventions, and hand back clean, documented code — never a black box you can't maintain.",
  },
  {
    topic: "Scope changes",
    q: "What happens when requirements change mid-build?",
    a: "They will, and that's fine. We work in short cycles with re-prioritization built in, so a change of direction costs days of planning — not a rewrite.",
  },
  {
    topic: "Ownership",
    q: "Who owns the code and the IP?",
    a: "You do, fully. Every repository, asset, and credential is transferred to you, and ownership is written into the contract from the very first day.",
  },
  {
    topic: "Support",
    q: "Do you stick around after launch?",
    a: "We offer ongoing support and SLAs, but never lock you in. Many clients keep us on retainer; others take the wheel with a complete handoff, runbook, and walkthrough.",
  },
];

const CHIPS = [...FAQS, ...FAQS];

interface FAQItem {
  topic: string;
  q: string;
  a: string;
}

interface FAQCardProps {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQCard = ({ item, index, isOpen, onToggle }: FAQCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isOpen || !cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    cardRef.current.style.transform = `perspective(800px) rotateX(${(-py * 5).toFixed(2)}deg) rotateY(${(px * 6).toFixed(2)}deg) translateY(-4px)`;
  };

  const handlePointerLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "";
  };

  const handleToggle = () => {
    if (cardRef.current) cardRef.current.style.transform = "";
    onToggle();
  };

  return (
    <motion.div variants={fadeUp}>
      <div
        ref={cardRef}
        className={`group relative border rounded-2xl overflow-hidden transition-[border-color,background,box-shadow] duration-300 ${
          isOpen
            ? "border-[#636CCB]/40 bg-[#112240]"
            : "border-gray-800/60 bg-[#0a192f] hover:border-[#6E8CFB]/25 hover:shadow-[0_26px_60px_-34px_rgba(0,0,0,0.9)]"
        }`}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{ transformStyle: "preserve-3d", willChange: "transform" }}
      >
        <button
          className="w-full bg-transparent border-0 cursor-pointer text-left flex items-center gap-4 p-6"
          style={{ fontFamily: "inherit" }}
          aria-expanded={isOpen}
          onClick={handleToggle}
        >
          <span
            className={`flex-none w-[34px] h-[34px] rounded-[10px] flex items-center justify-center text-[13px] font-bold tabular-nums border transition-all duration-300 ${
              isOpen
                ? "bg-gradient-to-br from-[#636CCB] to-[#6E8CFB] text-[#030810] border-transparent shadow-[0_6px_18px_-6px_rgba(110,140,251,0.6)]"
                : "text-gray-500 border-gray-700 group-hover:bg-gradient-to-br group-hover:from-[#636CCB] group-hover:to-[#6E8CFB] group-hover:text-[#030810] group-hover:border-transparent"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="flex-1 text-white font-semibold text-[17px] leading-snug tracking-tight">
            {item.q}
          </span>
          <span
            className={`flex-none w-[11px] h-[11px] border-r-2 border-b-2 transition-all duration-300 ${
              isOpen
                ? "rotate-[-135deg] mt-0.5 border-[#6E8CFB]"
                : "rotate-45 -mt-1 border-gray-500"
            }`}
            aria-hidden="true"
          />
        </button>
        <div
          className="grid transition-all duration-[420ms]"
          style={{
            gridTemplateRows: isOpen ? "1fr" : "0fr",
            transitionTimingFunction: "cubic-bezier(0.3, 0.7, 0.2, 1)",
          }}
        >
          <div className="overflow-hidden">
            <p className="text-gray-400 text-[15px] leading-relaxed px-6 pb-6 pl-[74px]">
              {item.a}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FAQSection = memo(() => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [marqueeHovered, setMarqueeHovered] = useState(false);

  return (
    <section className="py-12 px-6 bg-[#0a192f]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#636CCB] to-[#6E8CFB] shadow-[0_0_0_4px_rgba(110,140,251,0.14)]" />
            <span className="text-[#6E8CFB] text-xs font-semibold tracking-[0.2em] uppercase">Before you commit</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-white leading-[1.05]">
            Everything you&apos;re{" "}
            <span className="bg-gradient-to-r from-[#6E8CFB] via-blue-400 to-purple-400 bg-clip-text text-transparent">
              wondering about.
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-500 mt-5 text-base leading-relaxed max-w-md mx-auto">
            No fine print, no runaround. Here&apos;s exactly how we work — and what you can expect from day one.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="relative mb-10 overflow-hidden"
          style={{
            maskImage: "linear-gradient(90deg, transparent, #000 9%, #000 91%, transparent)",
            WebkitMaskImage: "linear-gradient(90deg, transparent, #000 9%, #000 91%, transparent)",
          }}
          onMouseEnter={() => setMarqueeHovered(true)}
          onMouseLeave={() => setMarqueeHovered(false)}
        >
          <div
            className="faq-marquee-track flex gap-3.5 w-max"
            style={{ animationPlayState: marqueeHovered ? "paused" : "running" }}
          >
            {CHIPS.map((f, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 whitespace-nowrap px-4 py-2.5 border border-gray-800 rounded-full bg-white/[0.02] text-gray-400 text-sm font-medium transition-all duration-300 hover:text-white hover:border-gray-600 hover:bg-[rgba(110,140,251,0.07)] cursor-default"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#6E8CFB] opacity-70" />
                {f.topic}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger}
          className="grid md:grid-cols-2 gap-4 max-w-[1080px] mx-auto items-start"
        >
          {FAQS.map((faq, i) => (
            <FAQCard
              key={faq.q}
              item={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
});
FAQSection.displayName = "FAQSection";

// ─── 7. CTA ───────────────────────────────────────────────────────────────────

const CTASection = memo(() => (
  <section className="relative py-20 px-6 bg-[#030810] overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.025] to-transparent pointer-events-none" />
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#636CCB]/[0.05] rounded-full blur-[120px] pointer-events-none" />

    <div className="relative max-w-3xl mx-auto text-center">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={stagger}
      >
        <motion.div
          variants={fadeUp}
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#636CCB]/30 bg-[#636CCB]/[0.08] text-[#6E8CFB] text-xs tracking-wider uppercase mb-8"
        >
          <Zap className="w-3 h-3" />
          Ready when you are
        </motion.div>

        <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-bold text-white leading-[1.05]">
          Build something
          <br />
          <span className="bg-gradient-to-r from-[#6E8CFB] via-blue-400 to-purple-400 bg-clip-text text-transparent">
            predictably great.
          </span>
        </motion.h2>

        <motion.p variants={fadeUp} className="text-gray-500 mt-5 text-lg leading-relaxed">
          Tell us what you&apos;re building. We&apos;ll tell you exactly how we&apos;d deliver it, what it will cost, and when you&apos;ll have it.
        </motion.p>

        {/* <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
        >
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-black font-semibold hover:bg-gray-100 transition-all"
          >
            Schedule a Discovery Call
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-gray-700 text-gray-300 font-semibold hover:border-gray-500 hover:text-white transition-all"
          >
            Explore Services
          </Link>
        </motion.div> */}
      </motion.div>
    </div>
  </section>
));
CTASection.displayName = "CTASection";

// ─── Export ───────────────────────────────────────────────────────────────────

export function HomeContent() {
  return (
    <>
      <TechStrip />
      <ServicesSection />
      <WhySection />
      <AIBanner />
      <ProcessSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
