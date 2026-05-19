"use client";

import React, { useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  X,
  Sparkles,
  Rocket,
  Briefcase,
  ShoppingBag,
  Layout,
  Code,
  ArrowUpRight,
  Zap,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import waapData from "@/data/waap.json";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Feature {
  name: string;
  value: string;
  included: boolean;
}

interface Plan {
  name: string;
  price: { inr: string; usd: string };
  timeline: string;
  popular: boolean;
  color: string;
  features: Feature[];
}

interface Tab {
  id: string;
  title: string;
  icon: string;
  description: string;
  plans: Plan[];
  metrics: { profitMargin: string; internalHours: string };
}

// ─── Icon map (JSON stores string names) ─────────────────────────────────────

const ICON_MAP: Record<string, LucideIcon> = {
  Briefcase,
  Rocket,
  ShoppingBag,
  Layout,
  Code,
};

// ─── Schedule-call modal (shared with AI page logic) ─────────────────────────

const ScheduleForm = memo(({ onClose }: { onClose: () => void }) => {
  const nameId = React.useId();
  const emailId = React.useId();
  const useCaseId = React.useId();
  const sizeId = React.useId();
  const messageId = React.useId();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    useCase: "",
    teamSize: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6">
          <Check className="w-10 h-10 text-emerald-400" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          You&apos;re on the list!
        </h2>
        <p className="text-gray-400 max-w-md">
          Our team will reach out within 24 hours to schedule your consultation.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row w-full max-w-[1100px] mx-auto items-start p-6 sm:p-10 lg:p-12 gap-8 lg:gap-12">
      {/* Left */}
      <div className="flex-1 w-full">
        <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
          Schedule a <span className="text-cyan-400">Discovery Call</span>
        </h2>
        <p className="text-gray-400 mt-3 leading-relaxed text-sm">
          Let&apos;s find the right package for your project.
        </p>
        <div className="space-y-4 mt-6">
          {[
            { Icon: Zap, color: "cyan", title: "30-Min Strategy Session", desc: "No commitment, just clarity on scope and timeline." },
            { Icon: Users, color: "purple", title: "Expert Consultation", desc: "Speak directly with our solutions team." },
            { Icon: Sparkles, color: "emerald", title: "Tailored Proposal", desc: "Receive a scoped quote within 24 hours." },
          ].map(({ Icon, color, title, desc }) => (
            <div key={title} className="flex gap-3">
              <div className={`flex-shrink-0 w-9 h-9 rounded-lg bg-${color}-500/10 border border-${color}-500/20 flex items-center justify-center`}>
                <Icon className={`w-4 h-4 text-${color}-400`} />
              </div>
              <div>
                <p className="text-white text-sm font-medium">{title}</p>
                <p className="text-gray-500 text-xs mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right — form */}
      <div className="flex-1 w-full">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor={nameId} className="block text-[10px] font-mono text-gray-400 mb-1.5 tracking-widest uppercase">Full Name *</label>
            <input type="text" id={nameId} name="name" value={formData.name} onChange={handleChange} required
              placeholder="Jane Smith"
              className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all text-sm" />
          </div>
          <div>
            <label htmlFor={emailId} className="block text-[10px] font-mono text-gray-400 mb-1.5 tracking-widest uppercase">Email *</label>
            <input type="email" id={emailId} name="email" value={formData.email} onChange={handleChange} required
              placeholder="jane@company.com"
              className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all text-sm" />
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label htmlFor={useCaseId} className="block text-[10px] font-mono text-gray-400 mb-1.5 tracking-widest uppercase">Project Type</label>
              <input type="text" id={useCaseId} name="useCase" value={formData.useCase} onChange={handleChange}
                placeholder="e.g., Portfolio, E-Commerce"
                className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all text-sm" />
            </div>
            <div className="sm:w-32 w-full">
              <label htmlFor={sizeId} className="block text-[10px] font-mono text-gray-400 mb-1.5 tracking-widest uppercase">Team Size</label>
              <select id={sizeId} name="teamSize" value={formData.teamSize} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:border-cyan-500/50 transition-all text-sm appearance-none cursor-pointer">
                <option value="">Select</option>
                <option value="1-10">1–10</option>
                <option value="11-50">11–50</option>
                <option value="51-200">51–200</option>
                <option value="201+">201+</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor={messageId} className="block text-[10px] font-mono text-gray-400 mb-1.5 tracking-widest uppercase">Tell us about your project</label>
            <textarea id={messageId} name="message" rows={3} value={formData.message} onChange={handleChange}
              placeholder="Goals, timeline, any specific requirements..."
              className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all resize-none text-sm" />
          </div>
          <button type="submit" disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold flex items-center justify-center gap-2 hover:from-cyan-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm">
            {isSubmitting ? (
              <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Submitting...</>
            ) : (
              <>Schedule Free Consultation <ArrowUpRight className="w-4 h-4" /></>
            )}
          </button>
          <p className="text-gray-500 text-xs text-center">
            We&apos;ll never share your information.
          </p>
        </form>
      </div>
    </div>
  );
});
ScheduleForm.displayName = "ScheduleForm";

const ScheduleModal = memo(({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl bg-gradient-to-br from-gray-900 to-[#0a192f] border border-gray-700/50 shadow-2xl">
            <button onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors">
              <X className="w-5 h-5 text-gray-400" />
            </button>
            <ScheduleForm onClose={onClose} />
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
));
ScheduleModal.displayName = "ScheduleModal";

// ─── Plan card ────────────────────────────────────────────────────────────────

const PlanCard = memo(({ plan, index }: { plan: Plan; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.08 }}
    whileHover={{ y: -4 }}
    className={`relative rounded-2xl overflow-hidden flex flex-col ${
      plan.popular ? "ring-2 ring-cyan-400/50 shadow-lg shadow-cyan-500/10" : ""
    }`}
  >
    {plan.popular && (
      <div className="absolute top-0 right-0 z-10">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg tracking-wider">
          MOST POPULAR
        </div>
      </div>
    )}

    {/* Header */}
    <div className={`bg-gradient-to-br ${plan.color} p-4 sm:p-5`}>
      <h3 className="text-base sm:text-lg font-bold text-white">{plan.name}</h3>
      <div className="text-xl sm:text-2xl font-bold text-white mt-2 leading-tight">
        {plan.price.inr}
      </div>
      <div className="text-white/70 text-xs sm:text-sm mt-1">
        Timeline: {plan.timeline}
      </div>
    </div>

    {/* Features */}
    <div className="flex-1 p-4 sm:p-5 bg-gray-900/60 flex flex-col">
      <ul className="space-y-2.5 flex-1">
        {plan.features.map((f) => (
          <li key={f.name} className="flex items-start gap-2">
            {f.included ? (
              <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
            ) : (
              <X className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
            )}
            <span className="text-xs sm:text-sm text-gray-300">
              <span className="font-medium">{f.name}:</span>{" "}
              <span className="text-gray-400">{f.value}</span>
            </span>
          </li>
        ))}
      </ul>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full mt-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
          plan.popular
            ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
            : "bg-gray-800 border border-gray-700 text-gray-300 hover:border-cyan-500/50"
        }`}
      >
        Get Started
      </motion.button>
    </div>
  </motion.div>
));
PlanCard.displayName = "PlanCard";

// ─── Main page ────────────────────────────────────────────────────────────────

const tabs = waapData.tabs as Tab[];

export function WaapClient() {
  const [activeTab, setActiveTab] = useState(0);
  const [currency, setCurrency] = useState<"inr" | "usd">("inr");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const current = tabs[activeTab];

  // Apply selected currency to plans before rendering
  const plansWithCurrency = current.plans.map((p) => ({
    ...p,
    price: { ...p.price, inr: currency === "inr" ? p.price.inr : p.price.usd },
  }));

  return (
    <div className="min-h-screen bg-[#0a192f]">
      {/* Hero */}
      <section className="pt-28 pb-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
          >
            Website{" "}
            <span className="text-cyan-400">as a Product</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="mt-4 text-gray-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed"
          >
            Predictable pricing, clear scope, guaranteed delivery — pick a package and ship.
          </motion.p>

          {/* Currency toggle */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="flex justify-center mt-7"
          >
            <div className="inline-flex p-1 rounded-full bg-gray-800/60 border border-gray-700">
              {(["inr", "usd"] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all ${
                    currency === c
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {c === "inr" ? "INR (₹)" : "USD ($)"}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tabs + content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        {/* Tab bar */}
        <div className="flex w-full bg-gray-800/30 rounded-2xl p-1 backdrop-blur-sm gap-1">
          {tabs.map((tab, idx) => {
            const Icon = ICON_MAP[tab.icon] ?? Code;
            const active = activeTab === idx;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(idx)}
                className={`relative flex-1 h-12 md:h-14 flex items-center justify-center gap-1.5 rounded-xl transition-all whitespace-nowrap px-2 ${
                  active ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20" : "hover:bg-white/[0.04]"
                }`}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${active ? "text-cyan-400" : "text-gray-500"}`} />
                <span className={`text-xs sm:text-sm font-medium hidden sm:block ${active ? "text-white" : "text-gray-400"}`}>
                  {tab.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <div className="mt-4 bg-gray-900/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
              className="p-5 sm:p-7 md:p-8"
            >
              {/* Panel header */}
              <div className="text-center mb-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                  {current.title}
                </h2>
                <p className="text-gray-400 text-sm mt-1">{current.description}</p>
              </div>

              {/* Plans grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {plansWithCurrency.map((plan, i) => (
                  <PlanCard key={plan.name} plan={plan} index={i} />
                ))}
              </div>

              {/* Metrics bar */}
              <div className="mt-8 pt-5 border-t border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm">
                <div className="flex flex-wrap gap-x-6 gap-y-1">
                  <span className="text-gray-500">
                    Profit Margin:{" "}
                    <span className="text-emerald-400 font-medium">{current.metrics.profitMargin}</span>
                  </span>
                  <span className="text-gray-500">
                    Internal Hours:{" "}
                    <span className="text-cyan-400 font-medium">{current.metrics.internalHours}</span>
                  </span>
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 text-xs transition-colors"
                >
                  <Sparkles className="w-3 h-3" />
                  Need custom? Contact us
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl p-7 sm:p-10 text-center border border-cyan-500/20"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Not sure which plan fits your needs?
          </h3>
          <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
            Book a free consultation — we&apos;ll scope the right package for you.
          </p>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold text-sm"
          >
            Schedule Free Consultation
            <Rocket className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </section>

      <ScheduleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
