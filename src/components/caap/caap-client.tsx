"use client";

import { memo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Layers, Package, Puzzle, CreditCard, RefreshCw,
  Boxes, Zap, TrendingUp, LayoutDashboard, Bot,
  ArrowUpRight, CheckCircle2, Clock, DollarSign,
  ChevronRight, Users, ShoppingBag,
} from "lucide-react";

// ─── Animation variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

// ─── Services data ────────────────────────────────────────────────────────────

const SERVICES = [
  {
    icon: Layers,
    color: "cyan",
    title: "Custom SaaPify Features",
    desc: "Bespoke functionality built directly into your theme — unique features your competitors don't have.",
  },
  {
    icon: Package,
    color: "blue",
    title: "Advanced Product Pages",
    desc: "Rich product experiences: custom bundles, variant selectors, 3D previews, and dynamic pricing.",
  },
  {
    icon: Puzzle,
    color: "purple",
    title: "SaaPify App Integrations",
    desc: "Seamlessly connect third-party apps, ERPs, CRMs, and custom APIs into your SaaPify store.",
  },
  {
    icon: CreditCard,
    color: "indigo",
    title: "Checkout Customization",
    desc: "Custom checkout flows, upsells, shipping logic, and branded post-purchase experiences.",
  },
  {
    icon: RefreshCw,
    color: "teal",
    title: "Custom Subscription Flows",
    desc: "Build flexible subscription models — pause, skip, swap, and custom billing cycles.",
  },
  {
    icon: Boxes,
    color: "orange",
    title: "Inventory & Order Automation",
    desc: "Automate stock sync, fulfilment routing, reorder triggers, and warehouse integrations.",
  },
  {
    icon: Zap,
    color: "yellow",
    title: "Performance Optimization",
    desc: "Core Web Vitals, lazy loading, script audits, and CDN tuning for sub-2s load times.",
  },
  {
    icon: TrendingUp,
    color: "emerald",
    title: "Conversion Rate Improvements",
    desc: "A/B tested UI improvements, social proof widgets, cart recovery flows, and trust signals.",
  },
  {
    icon: LayoutDashboard,
    color: "pink",
    title: "Custom Admin Dashboards",
    desc: "Internal tools for your team — order management, analytics views, and operations panels.",
  },
  {
    icon: Bot,
    color: "violet",
    title: "AI / Automation Integrations",
    desc: "AI-powered product recommendations, smart search, chatbots, and automated workflows.",
  },
];

const COLOR_MAP: Record<string, { bg: string; text: string; border: string }> = {
  cyan:    { bg: "bg-cyan-500/10",    text: "text-cyan-400",    border: "border-cyan-500/20" },
  blue:    { bg: "bg-blue-500/10",    text: "text-blue-400",    border: "border-blue-500/20" },
  purple:  { bg: "bg-purple-500/10",  text: "text-purple-400",  border: "border-purple-500/20" },
  indigo:  { bg: "bg-indigo-500/10",  text: "text-indigo-400",  border: "border-indigo-500/20" },
  teal:    { bg: "bg-teal-500/10",    text: "text-teal-400",    border: "border-teal-500/20" },
  orange:  { bg: "bg-orange-500/10",  text: "text-orange-400",  border: "border-orange-500/20" },
  yellow:  { bg: "bg-yellow-500/10",  text: "text-yellow-400",  border: "border-yellow-500/20" },
  emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" },
  pink:    { bg: "bg-pink-500/10",    text: "text-pink-400",    border: "border-pink-500/20" },
  violet:  { bg: "bg-violet-500/10",  text: "text-violet-400",  border: "border-violet-500/20" },
};

// ─── How it works steps ───────────────────────────────────────────────────────

const STEPS = [
  {
    num: "01",
    title: "Share Requirements",
    desc: "You tell us your SaaPify challenge — what's broken, what's missing, or what you want to build.",
  },
  {
    num: "02",
    title: "Feasibility & Scope",
    desc: "We analyse what's technically possible, define clear deliverables, timeline, and a fixed price.",
  },
  {
    num: "03",
    title: "Build & Deploy",
    desc: "Our team builds and tests the solution on a staging environment, then deploys to production.",
  },
  {
    num: "04",
    title: "Measure Impact",
    desc: "You track improved conversion, efficiency, and revenue — with a handover doc for your team.",
  },
];

// ─── Case studies ─────────────────────────────────────────────────────────────

const CASE_STUDIES = [
  {
    tag: "Fashion Brand",
    icon: ShoppingBag,
    tagColor: "cyan",
    requirement: "Needed a custom bundle builder and automated inventory sync across two warehouses.",
    solution: "Built custom bundle logic with real-time SKU mapping and automated inventory sync system via SaaPify webhooks + third-party WMS.",
    cost: "₹85,000",
    timeline: "3 weeks",
    metrics: [
      { label: "Conversion Rate", value: "+32%", icon: TrendingUp, color: "emerald" },
      { label: "Manual Work Reduced", value: "−45%", icon: Boxes, color: "cyan" },
      { label: "Order Processing", value: "Faster", icon: Zap, color: "yellow" },
      { label: "Customer Experience", value: "Improved", icon: Users, color: "purple" },
    ],
  },
  {
    tag: "D2C Skincare Brand",
    icon: RefreshCw,
    tagColor: "purple",
    requirement: "Needed subscription customization with pause/skip flows and a post-purchase upsell funnel.",
    solution: "Created custom subscription workflow with pause/skip/swap UI, dynamic post-purchase upsell pages, and automated retention emails.",
    cost: "₹1,40,000",
    timeline: "5 weeks",
    metrics: [
      { label: "Repeat Purchases", value: "+28%", icon: TrendingUp, color: "emerald" },
      { label: "Avg. Order Value", value: "+18%", icon: DollarSign, color: "cyan" },
      { label: "Subscription Retention", value: "Better", icon: RefreshCw, color: "purple" },
      { label: "Operational Efficiency", value: "Improved", icon: Zap, color: "yellow" },
    ],
  },
];

// ─── Sections ─────────────────────────────────────────────────────────────────

const HeroSection = memo(() => (
  <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/[0.04] via-transparent to-transparent pointer-events-none" />
    <div className="absolute left-1/2 top-24 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/[0.06] rounded-full blur-[100px] pointer-events-none" />

    <div className="relative max-w-4xl mx-auto text-center">
      <motion.div
        initial="hidden" animate="show" variants={stagger}
      >
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/[0.08] text-cyan-400 text-xs tracking-wider uppercase mb-6">
          <ShoppingBag className="w-3 h-3" />
          SaaPify Customization
        </motion.div>

        <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
          Customization{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            as a Product
          </span>
          <span className="text-gray-500 text-2xl sm:text-3xl font-medium ml-3">(CAAP)</span>
        </motion.h1>

        <motion.p variants={fadeUp} className="mt-5 text-gray-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          Tailored SaaPify customizations designed to improve store performance, customer experience, and operational efficiency.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all"
          >
            Get Your Custom Solution
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <Link
            href="#case-studies"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-gray-700 text-gray-300 font-semibold hover:border-gray-500 hover:text-white transition-all"
          >
            View Case Studies
            <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  </section>
));
HeroSection.displayName = "HeroSection";

const ServicesSection = memo(() => (
  <section className="py-24 px-4 sm:px-6 bg-[#030810]">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
        className="text-center mb-14"
      >
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-700 text-gray-400 text-xs tracking-wider uppercase mb-4">
          <Puzzle className="w-3 h-3" />
          What we customize
        </motion.div>
        <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-white">
          SaaPify Customization Capabilities
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-3 text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
          From checkout to fulfilment — we build what SaaPify&apos;s default setup can&apos;t do.
        </motion.p>
      </motion.div>

      <motion.div
        initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        {SERVICES.map(({ icon: Icon, color, title, desc }) => {
          const c = COLOR_MAP[color];
          return (
            <motion.div
              key={title}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="group p-5 rounded-2xl border border-gray-800/60 hover:border-gray-700 bg-gray-900/30 hover:bg-gray-900/50 transition-all"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${c.bg} border ${c.border}`}>
                <Icon className={`w-5 h-5 ${c.text}`} />
              </div>
              <h3 className="text-white font-semibold text-sm mb-2">{title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  </section>
));
ServicesSection.displayName = "ServicesSection";

const HowItWorksSection = memo(() => (
  <section className="py-24 px-4 sm:px-6 bg-[#0a192f]">
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
        className="text-center mb-14"
      >
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-700 text-gray-400 text-xs tracking-wider uppercase mb-4">
          <Zap className="w-3 h-3" />
          The process
        </motion.div>
        <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-white">
          How It Works
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-3 text-gray-500 max-w-lg mx-auto text-sm sm:text-base">
          Four clear steps from requirement to deployment.
        </motion.p>
      </motion.div>

      {/* Desktop: horizontal timeline */}
      <motion.div
        initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
        className="hidden md:grid grid-cols-4 gap-0 relative"
      >
        {/* Connecting line */}
        <div className="absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-cyan-500/40 via-blue-500/40 to-purple-500/40" />

        {STEPS.map((step, i) => (
          <motion.div key={step.num} variants={fadeUp} className="relative flex flex-col items-center text-center px-4">
            <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center mb-5">
              <span className="text-cyan-400 font-bold text-lg">{step.num}</span>
            </div>
            <h3 className="text-white font-semibold text-sm mb-2">{step.title}</h3>
            <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
            {i < STEPS.length - 1 && (
              <ChevronRight className="absolute top-5 -right-3 w-5 h-5 text-cyan-500/40" />
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Mobile: vertical timeline */}
      <motion.div
        initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
        className="md:hidden flex flex-col gap-0"
      >
        {STEPS.map((step, i) => (
          <motion.div key={step.num} variants={fadeUp} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                <span className="text-cyan-400 font-bold text-sm">{step.num}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="w-px flex-1 my-2 bg-gradient-to-b from-cyan-500/30 to-transparent min-h-[2rem]" />
              )}
            </div>
            <div className="pb-8">
              <h3 className="text-white font-semibold text-sm mb-1">{step.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
));
HowItWorksSection.displayName = "HowItWorksSection";

const CaseStudiesSection = memo(() => (
  <section id="case-studies" className="py-24 px-4 sm:px-6 bg-[#030810]">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
        className="text-center mb-14"
      >
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-700 text-gray-400 text-xs tracking-wider uppercase mb-4">
          <CheckCircle2 className="w-3 h-3" />
          Proven results
        </motion.div>
        <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-white">
          Case Studies
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-3 text-gray-500 max-w-lg mx-auto text-sm sm:text-base">
          Real clients, real problems, measurable outcomes.
        </motion.p>
      </motion.div>

      <motion.div
        initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {CASE_STUDIES.map((cs) => {
          const c = COLOR_MAP[cs.tagColor];
          const TagIcon = cs.icon;
          return (
            <motion.div
              key={cs.tag}
              variants={fadeUp}
              className="rounded-2xl border border-gray-800/60 bg-gray-900/40 overflow-hidden"
            >
              {/* Card header */}
              <div className="p-6 border-b border-gray-800/60">
                <div className="flex items-center justify-between mb-4">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${c.bg} ${c.text} border ${c.border}`}>
                    <TagIcon className="w-3 h-3" />
                    {cs.tag}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">{cs.cost}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {cs.timeline}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-[10px] font-mono text-gray-600 tracking-widest uppercase mb-1">Requirement</p>
                    <p className="text-gray-300 text-sm leading-relaxed">{cs.requirement}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-gray-600 tracking-widest uppercase mb-1">Our Solution</p>
                    <p className="text-gray-400 text-sm leading-relaxed">{cs.solution}</p>
                  </div>
                </div>
              </div>

              {/* Metrics grid */}
              <div className="p-6">
                <p className="text-[10px] font-mono text-gray-600 tracking-widest uppercase mb-4">Business Impact</p>
                <div className="grid grid-cols-2 gap-3">
                  {cs.metrics.map((m) => {
                    const mc = COLOR_MAP[m.color];
                    const MetricIcon = m.icon;
                    return (
                      <div key={m.label} className={`p-3 rounded-xl ${mc.bg} border ${mc.border}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <MetricIcon className={`w-3.5 h-3.5 ${mc.text}`} />
                          <span className={`text-base font-bold ${mc.text}`}>{m.value}</span>
                        </div>
                        <p className="text-gray-400 text-xs">{m.label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  </section>
));
CaseStudiesSection.displayName = "CaseStudiesSection";

const CTASection = memo(() => (
  <section className="py-24 px-4 sm:px-6 bg-[#0a192f]">
    <div className="max-w-3xl mx-auto text-center">
      <motion.div
        initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
      >
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/[0.08] text-cyan-400 text-xs tracking-wider uppercase mb-6">
          <Zap className="w-3 h-3" />
          Let&apos;s build it
        </motion.div>
        <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
          Need a Custom{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            SaaPify Solution?
          </span>
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-4 text-gray-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
          Let&apos;s build something tailored specifically for your business. Fixed scope, fixed price, guaranteed delivery.
        </motion.p>
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all"
          >
            Book Consultation
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-gray-700 text-gray-300 font-semibold hover:border-gray-500 hover:text-white transition-all"
          >
            Contact Us
          </Link>
        </motion.div>
      </motion.div>
    </div>
  </section>
));
CTASection.displayName = "CTASection";

// ─── Page ─────────────────────────────────────────────────────────────────────

export function CaapClient() {
  return (
    <div className="min-h-screen bg-[#0a192f]">
      <HeroSection />
      <ServicesSection />
      <HowItWorksSection />
      <CaseStudiesSection />
      <CTASection />
    </div>
  );
}
