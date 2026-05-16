"use client";

import { memo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Code2, Smartphone, Brain, Cloud, Workflow, LineChart,
  ArrowUpRight, Zap, Target, Clock, Shield, Check, ChevronRight,
  Search, Rocket, Star,
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
    color: "#22d3ee",
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
  <section className="py-28 px-6 bg-[#030810]">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="mb-16"
      >
        <motion.div variants={fadeUp} className="flex items-center gap-2 mb-4">
          <Zap className="w-4 h-4 text-cyan-400" />
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
  <section className="py-28 px-6 bg-[#0a192f]">
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
              className="inline-flex items-center gap-1.5 text-cyan-400 text-sm font-medium hover:gap-2.5 transition-all"
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
          className="grid grid-cols-2 gap-4"
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
  <section className="relative py-28 px-6 bg-[#010007] overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.04] via-transparent to-purple-500/[0.04] pointer-events-none" />
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-cyan-500/[0.04] rounded-full blur-[130px] pointer-events-none" />

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
            <Brain className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 text-sm tracking-[0.22em] uppercase">AI Suite</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05]">
            AI isn&apos;t a feature.
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              It&apos;s the new foundation.
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-400 mt-6 text-lg leading-relaxed">
            From custom ML models to intelligent automation, our AI Suite replaces hours of manual work with reliable, scalable intelligence — built specifically for your business.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mt-8">
            <Link
              href="/ai"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all"
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
  <section className="py-28 px-6 bg-[#030810]">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={stagger}
        className="text-center mb-20"
      >
        <motion.div variants={fadeUp} className="flex items-center justify-center gap-2 mb-4">
          <Workflow className="w-4 h-4 text-cyan-400" />
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
        {/* Connecting line */}
        <div className="hidden md:block absolute top-10 left-[22%] right-[22%] h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />

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
              <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-cyan-500 text-black text-[10px] font-bold flex items-center justify-center">
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

// ─── 6. Testimonials ──────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    quote: "SaaPify delivered our platform in exactly the timeline they promised. Not a week late, not a feature short. That's rare.",
    name: "Riya Sharma",
    role: "CTO",
    company: "NovaPay",
    initial: "RS",
    color: "#22d3ee",
  },
  {
    quote: "Their AI automation reduced our manual ops overhead by 60%. ROI was positive within the first quarter of deployment.",
    name: "Omar Al-Farsi",
    role: "Head of Operations",
    company: "Falcon Logistics",
    initial: "OF",
    color: "#818cf8",
  },
  {
    quote: "Finally a team that speaks both business and engineering. They understood what we needed before we finished explaining.",
    name: "Priya Nair",
    role: "Founder",
    company: "Bloomware",
    initial: "PN",
    color: "#34d399",
  },
];

const TestimonialsSection = memo(() => (
  <section className="py-28 px-6 bg-[#0a192f]">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={stagger}
        className="text-center mb-16"
      >
        <motion.div variants={fadeUp} className="flex items-center justify-center gap-2 mb-4">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-gray-500 text-sm tracking-[0.22em] uppercase">Client results</span>
        </motion.div>
        <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-white">
          Don&apos;t take our word for it.
        </motion.h2>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={stagger}
        className="grid md:grid-cols-3 gap-5"
      >
        {TESTIMONIALS.map(({ quote, name, role, company, initial, color }) => (
          <motion.div
            key={name}
            variants={fadeUp}
            whileHover={{ y: -4 }}
            className="flex flex-col p-7 rounded-2xl border border-gray-800/60 bg-white/[0.02] hover:bg-white/[0.04] transition-all"
          >
            <div className="flex gap-1 mb-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-gray-300 text-sm leading-relaxed flex-1">&ldquo;{quote}&rdquo;</p>
            <div className="flex items-center gap-3 mt-6 pt-5 border-t border-gray-800/50">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${color}50, ${color}20)`,
                  border: `1px solid ${color}40`,
                }}
              >
                {initial}
              </div>
              <div>
                <div className="text-white text-sm font-medium">{name}</div>
                <div className="text-gray-500 text-xs">
                  {role}, {company}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
));
TestimonialsSection.displayName = "TestimonialsSection";

// ─── 7. CTA ───────────────────────────────────────────────────────────────────

const CTASection = memo(() => (
  <section className="relative py-36 px-6 bg-[#030810] overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.025] to-transparent pointer-events-none" />
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-500/[0.05] rounded-full blur-[120px] pointer-events-none" />

    <div className="relative max-w-3xl mx-auto text-center">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={stagger}
      >
        <motion.div
          variants={fadeUp}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/[0.08] text-cyan-400 text-xs tracking-wider uppercase mb-8"
        >
          <Zap className="w-3 h-3" />
          Ready when you are
        </motion.div>

        <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-bold text-white leading-[1.05]">
          Build something
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            predictably great.
          </span>
        </motion.h2>

        <motion.p variants={fadeUp} className="text-gray-500 mt-5 text-lg leading-relaxed">
          Tell us what you&apos;re building. We&apos;ll tell you exactly how we&apos;d deliver it, what it will cost, and when you&apos;ll have it.
        </motion.p>

        <motion.div
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
        </motion.div>
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
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
