"use client";

import React, { useMemo, memo, useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import {
  Brain, Zap, Sparkles, LineChart, Workflow, TrendingUp,
  MessageSquare, FileText, Shield, ArrowUpRight, Code2, Cloud,
  X, Check, Users,
} from "lucide-react";
import { AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

type TileSize = "small" | "medium" | "large";

interface ServiceTile {
  id: number;
  size: TileSize;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  tags: string[];
}

// ─── Neural Canvas ────────────────────────────────────────────────────────────

const NeuralCanvas = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let alive = true;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const initParticles = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const count = Math.min(Math.floor((w * h) / 15000), 80);
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      }));
    };

    const animate = () => {
      if (!alive) return;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${p.opacity})`;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(34, 211, 238, ${(1 - dist / 150) * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        const dmx = particles[i].x - mx;
        const dmy = particles[i].y - my;
        const mouseDist = Math.sqrt(dmx * dmx + dmy * dmy);
        if (mouseDist < 200) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mx, my);
          ctx.strokeStyle = `rgba(34, 211, 238, ${(1 - mouseDist / 200) * 0.3})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    // Named handler so it can be properly removed in cleanup
    const handleResize = () => {
      resize();
      initParticles();
    };

    resize();
    initParticles();
    animate();

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouse);

    return () => {
      alive = false;
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ zIndex: 2 }}
    />
  );
});
NeuralCanvas.displayName = "NeuralCanvas";

// ─── Hero ─────────────────────────────────────────────────────────────────────

const AIHero = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.4], [0, 80]);

  const stats = useMemo(
    () => [
      { value: "10x", label: "Faster than manual", prefix: "" },
      { value: "60%", label: "Average cost reduction", prefix: "↑" },
      { value: "99.7%", label: "Model accuracy rate", prefix: "" },
    ],
    []
  );

  return (
    <section ref={containerRef} className="relative min-h-screen bg-[#010007] overflow-hidden">
      <div className="absolute inset-0 opacity-70">
        <NeuralCanvas />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#010007]/90 via-transparent to-[#010007]/90 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <motion.div style={{ opacity, y }} className="relative z-10 min-h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2 mb-8"
              >
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="text-cyan-400 text-sm tracking-wider font-medium">
                  SaaPify AI Suite
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tight">
                  <span className="block text-white">AI is</span>
                  <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Already
                  </span>
                  <span className="block text-white">Here</span>
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-xl text-gray-500 mt-8 max-w-lg leading-relaxed"
              >
                While others are still thinking,{" "}
                <span className="text-gray-300">SaaPify clients</span>{" "}
                are already running AI-powered operations. The gap is widening every day.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex flex-wrap gap-4 mt-10"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-white text-black rounded-xl font-semibold flex items-center gap-2 group"
                >
                  Start with AI
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 border border-gray-700 text-gray-300 rounded-xl font-semibold hover:border-gray-500 hover:text-white transition-all"
                >
                  Watch Demo
                </motion.button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="flex gap-12 mt-16 pt-8 border-t border-gray-800/50"
              >
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-3xl font-bold text-white">
                      {stat.prefix && (
                        <span className="text-emerald-400 text-lg">{stat.prefix}</span>
                      )}
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — Brain Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="lg:col-span-5 hidden lg:flex justify-center"
            >
              <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border border-cyan-500/20"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-4 rounded-full border border-cyan-500/15"
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-10 rounded-full border border-cyan-500/10"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 40px rgba(34, 211, 238, 0.3)",
                        "0 0 80px rgba(34, 211, 238, 0.6)",
                        "0 0 40px rgba(34, 211, 238, 0.3)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-40 h-40 lg:w-48 lg:h-48 rounded-full bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 flex items-center justify-center"
                  >
                    <Brain className="w-20 h-20 lg:w-24 lg:h-24 text-cyan-400" />
                  </motion.div>
                </div>
                {[0, 72, 144, 216, 288].map((angle) => (
                  <motion.div
                    key={angle}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0"
                    style={{ transform: `rotate(${angle}deg)` }}
                  >
                    <div
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-400"
                      style={{ boxShadow: "0 0 15px rgba(34, 211, 238, 0.8)" }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-12"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex items-center gap-3 text-gray-600"
        >
          <div className="w-px h-6 bg-gradient-to-b from-transparent via-gray-600 to-transparent" />
          <span className="text-xs tracking-[0.2em] uppercase">Explore capabilities</span>
        </motion.div>
      </motion.div>
    </section>
  );
});
AIHero.displayName = "AIHero";

// ─── Power ────────────────────────────────────────────────────────────────────

const AIPower = memo(() => {
  const metrics = useMemo(
    () => [
      {
        label: "DATA PROCESSING",
        bigText: "< 50ms",
        subText: "Real-time latency",
        detail: "Process millions of data points in the time it takes to blink.",
        color: "#22d3ee",
      },
      {
        label: "MODEL ACCURACY",
        bigText: "95.7%",
        subText: "Prediction precision",
        detail: "Enterprise-grade models fine-tuned on your specific business data.",
        color: "#818cf8",
      },
      {
        label: "AUTOMATION SPEED",
        bigText: "10x",
        subText: "Faster than manual",
        detail: "Automate days of work into minutes with intelligent workflows.",
        color: "#34d399",
      },
      {
        label: "COST EFFICIENCY",
        bigText: "60%",
        subText: "Average reduction",
        detail: "Slash operational costs while increasing output quality.",
        color: "#f472b6",
      },
    ],
    []
  );

  const comparisons = useMemo(
    () => [
      { task: "Data Entry (1,000 records)", manual: "8 hours", ai: "2 min", imp: "240x" },
      { task: "Report Generation", manual: "3 days", ai: "30 sec", imp: "8,640x" },
      { task: "Code Review (10K lines)", manual: "2 days", ai: "5 min", imp: "576x" },
      { task: "Customer Query Response", manual: "4 hours", ai: "Instant", imp: "∞" },
    ],
    []
  );

  return (
    <section className="relative py-32 px-6 bg-[#010007]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-cyan-400" />
            <span className="text-gray-500 text-sm tracking-[0.2em] uppercase">Raw Power</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] max-w-4xl">
            This is what{" "}
            <span className="text-gray-500 line-through decoration-gray-700">possible</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              already happening
            </span>{" "}
            looks like.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-24">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-6 rounded-2xl border border-gray-800/50 hover:border-gray-700 transition-all"
              style={{
                background: `linear-gradient(180deg, ${metric.color}05 0%, transparent 100%)`,
              }}
            >
              <div className="text-xs tracking-widest text-gray-600 mb-6">{metric.label}</div>
              <div className="text-5xl md:text-6xl font-bold mb-3" style={{ color: metric.color }}>
                {metric.bigText}
              </div>
              <div className="text-gray-400 text-sm mb-3">{metric.subText}</div>
              <div className="text-gray-600 text-xs leading-relaxed">{metric.detail}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <div className="text-sm text-gray-500 tracking-widest mb-6 uppercase">
            Manual vs AI-Powered
          </div>
          <div className="space-y-1">
            <div className="grid grid-cols-4 gap-4 pb-3 border-b border-gray-800">
              <div className="text-gray-500 text-xs tracking-wider">TASK</div>
              <div className="text-gray-500 text-xs tracking-wider text-center">MANUAL</div>
              <div className="text-cyan-400 text-xs tracking-wider text-center">WITH AI</div>
              <div className="text-gray-500 text-xs tracking-wider text-right">FASTER BY</div>
            </div>
            {comparisons.map((row, i) => (
              <motion.div
                key={row.task}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="grid grid-cols-4 gap-4 py-4 border-b border-gray-800/30 hover:bg-white/[0.02] transition-colors"
              >
                <div className="text-white text-sm">{row.task}</div>
                <div className="text-gray-500 text-sm text-center">{row.manual}</div>
                <div className="text-cyan-400 text-sm text-center font-medium">{row.ai}</div>
                <div className="text-emerald-400 text-sm text-right font-medium">{row.imp}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
});
AIPower.displayName = "AIPower";

// ─── Approach ─────────────────────────────────────────────────────────────────

const AIApproach = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [activeIndex, setActiveIndex] = useState(-1);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    // 0–0.2: intro, then equal quarters for steps 0–3
    setActiveIndex(Math.max(-1, Math.min(3, Math.floor((v - 0.2) / 0.2))));
  });

  const steps = useMemo(
    () => [
      {
        num: "01",
        title: "Audit & Discover",
        desc: "We map your operations, find AI-fit workflows, and prioritize high-impact areas.",
        items: ["Process mapping", "Data readiness check", "Opportunity scoring"],
      },
      {
        num: "02",
        title: "Build & Train",
        desc: "Custom models trained on your data, tested against your success metrics.",
        items: ["Model selection", "Custom training", "Accuracy validation"],
      },
      {
        num: "03",
        title: "Integrate & Deploy",
        desc: "Seamless integration into your existing stack with zero downtime.",
        items: ["API integration", "Workflow embedding", "User training"],
      },
      {
        num: "04",
        title: "Monitor & Scale",
        desc: "Continuous performance tracking with automated retraining loops.",
        items: ["Real-time monitoring", "Auto-retraining", "Scaling on demand"],
      },
    ],
    []
  );

  const costData = useMemo(
    () => [
      { service: "Web App Development", before: "$15K–$25K", after: "$8K–$14K", save: "45%" },
      { service: "Mobile App Development", before: "$20K–$40K", after: "$12K–$22K", save: "43%" },
      { service: "API & Integrations", before: "$8K–$15K", after: "$4K–$8K", save: "50%" },
      { service: "Analytics Dashboard", before: "$10K–$18K", after: "$5K–$9K", save: "50%" },
      { service: "Automation Workflows", before: "$12K–$20K", after: "$5K–$10K", save: "55%" },
    ],
    []
  );

  return (
    <>
      {/* Sticky scroll container — 500 vh gives ~100 vh per step */}
      <div ref={containerRef} style={{ height: "500vh" }} className="relative">
        <div className="sticky top-0 h-screen bg-[#020110] flex items-center overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* Left — heading + step nav */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <Workflow className="w-5 h-5 text-cyan-400" />
                  <span className="text-gray-500 text-sm tracking-[0.2em] uppercase">Our Approach</span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1]">
                  How we bring
                  <br />
                  <span className="text-cyan-400">AI into your</span>
                  <br />
                  operations.
                </h2>
                <p className="text-gray-500 mt-6 max-w-md leading-relaxed">
                  A proven 4-step methodology that transforms your business without disrupting
                  what&apos;s already working.
                </p>

                {/* Step list — highlights active, checks completed */}
                <div className="flex flex-col gap-4 mt-10">
                  {steps.map((step, i) => (
                    <motion.div
                      key={step.num}
                      animate={{ opacity: i === activeIndex ? 1 : i < activeIndex ? 0.45 : 0.18 }}
                      transition={{ duration: 0.4 }}
                      className="flex items-center gap-4"
                    >
                      <motion.span
                        animate={{
                          color: i < activeIndex ? "#22d3ee" : i === activeIndex ? "#22d3ee" : "#374151",
                        }}
                        transition={{ duration: 0.3 }}
                        className="text-xl font-bold w-10 tabular-nums"
                      >
                        {i < activeIndex ? "✓" : step.num}
                      </motion.span>
                      <motion.span
                        animate={{ color: i === activeIndex ? "#ffffff" : "#6b7280" }}
                        transition={{ duration: 0.3 }}
                        className="text-sm font-medium"
                      >
                        {step.title}
                      </motion.span>
                      {i === activeIndex && (
                        <motion.div
                          layoutId="stepLine"
                          className="h-px flex-1 bg-gradient-to-r from-cyan-500 to-transparent"
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right — animated step card */}
              <div className="relative h-[420px]">
                <AnimatePresence mode="wait">
                  {activeIndex >= 0 ? (
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, y: 70, filter: "blur(6px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -70, filter: "blur(6px)" }}
                      transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                      className="absolute inset-0 flex flex-col justify-center"
                    >
                      {/* Large ghost number */}
                      <div className="absolute -top-6 -left-4 text-[11rem] font-bold leading-none select-none text-white/[0.025] pointer-events-none">
                        {steps[activeIndex].num}
                      </div>

                      <div className="relative z-10 p-8 rounded-2xl border border-gray-800/60 bg-gradient-to-br from-white/[0.03] to-transparent">
                        <div className="flex items-baseline gap-3 mb-6">
                          <span className="text-5xl font-bold text-cyan-400">
                            {steps[activeIndex].num}
                          </span>
                          <span className="text-xs tracking-widest text-gray-600 uppercase">
                            of 04
                          </span>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-4">
                          {steps[activeIndex].title}
                        </h3>
                        <p className="text-gray-400 leading-relaxed mb-6">
                          {steps[activeIndex].desc}
                        </p>
                        <div className="flex flex-wrap gap-3">
                          {steps[activeIndex].items.map((item) => (
                            <span
                              key={item}
                              className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <p className="text-gray-700 text-sm tracking-[0.25em] uppercase">
                        Scroll to explore
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Cost table — follows after sticky section */}
      <section className="relative py-32 px-6 bg-[#020110]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-8">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <h3 className="text-xl font-bold text-white">Cost Impact of AI</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full max-w-3xl">
                <thead>
                  <tr className="border-b border-gray-800 text-left">
                    <th className="pb-3 text-gray-500 text-xs tracking-wider font-medium">SERVICE</th>
                    <th className="pb-3 text-gray-500 text-xs tracking-wider font-medium">BEFORE AI</th>
                    <th className="pb-3 text-emerald-400 text-xs tracking-wider font-medium">WITH AI</th>
                    <th className="pb-3 text-gray-500 text-xs tracking-wider font-medium text-right">
                      SAVINGS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {costData.map((row) => (
                    <tr key={row.service} className="border-b border-gray-800/20">
                      <td className="py-4 text-white text-sm">{row.service}</td>
                      <td className="py-4 text-gray-600 text-sm line-through">{row.before}</td>
                      <td className="py-4 text-emerald-400 text-sm">{row.after}</td>
                      <td className="py-4 text-right">
                        <span className="text-emerald-400 text-sm font-bold">{row.save}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
});
AIApproach.displayName = "AIApproach";

// ─── Schedule Call Modal ──────────────────────────────────────────────────────

const ExpandableScreenDemo = ({ onClose }: { onClose: () => void }) => {
  const nameId = React.useId();
  const emailId = React.useId();
  const useCaseId = React.useId();
  const companySizeId = React.useId();
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

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
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
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">You&apos;re on the list!</h2>
        <p className="text-gray-400 max-w-md">
          Thank you for your interest. Our team will reach out within 24 hours to schedule your consultation.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-full w-full max-w-[1100px] mx-auto items-start p-6 sm:p-10 lg:p-12 gap-8 lg:gap-12">
      {/* Left Column */}
      <div className="flex-1 w-full">
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
              Schedule a <span className="text-cyan-400">Discovery Call</span>
            </h2>
            <p className="text-gray-400 mt-3 leading-relaxed">
              Let&apos;s discuss your business challenges and how AI can solve them.
            </p>
          </div>
          <div className="space-y-4 pt-4">
            {[
              { Icon: Zap, color: "cyan", title: "30-Minute Strategy Session", desc: "No commitment, just clarity on your AI roadmap." },
              { Icon: Users, color: "purple", title: "Expert Consultation", desc: "Speak directly with our AI solutions architect." },
              { Icon: Sparkles, color: "emerald", title: "Tailored Roadmap", desc: "Get a customized AI implementation plan for your business." },
            ].map(({ Icon, color, title, desc }) => (
              <div key={title} className="flex gap-4">
                <div className={`flex-shrink-0 w-10 h-10 rounded-lg bg-${color}-500/10 border border-${color}-500/20 flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 text-${color}-400`} />
                </div>
                <div>
                  <p className="text-white text-sm font-medium mb-1">{title}</p>
                  <p className="text-gray-500 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-6 mt-6 border-t border-gray-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                AJ
              </div>
              <div>
                <p className="text-white text-sm font-medium">Alex Johnson</p>
                <p className="text-gray-500 text-xs">CTO, TechFlow Solutions</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mt-3 italic">
              &ldquo;SaaPify&apos;s AI consultation transformed our approach. Within weeks, we saw 40% efficiency gains.&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Right Column — Form */}
      <div className="flex-1 w-full">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor={nameId} className="block text-[10px] font-mono text-gray-400 mb-2 tracking-[0.5px] uppercase">Full Name *</label>
            <input type="text" id={nameId} name="name" value={formData.name} onChange={handleChange} required
              className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all text-sm"
              placeholder="John Doe" />
          </div>
          <div>
            <label htmlFor={emailId} className="block text-[10px] font-mono text-gray-400 mb-2 tracking-[0.5px] uppercase">Email *</label>
            <input type="email" id={emailId} name="email" value={formData.email} onChange={handleChange} required
              className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all text-sm"
              placeholder="john@company.com" />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor={useCaseId} className="block text-[10px] font-mono text-gray-400 mb-2 tracking-[0.5px] uppercase">Use Case</label>
              <input type="text" id={useCaseId} name="useCase" value={formData.useCase} onChange={handleChange}
                placeholder="e.g., Customer support automation"
                className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all text-sm" />
            </div>
            <div className="sm:w-36 w-full">
              <label htmlFor={companySizeId} className="block text-[10px] font-mono text-gray-400 mb-2 tracking-[0.5px] uppercase">Team Size</label>
              <select id={companySizeId} name="teamSize" value={formData.teamSize} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:border-cyan-500/50 transition-all text-sm appearance-none cursor-pointer">
                <option value="">Select</option>
                <option value="1-10">1–10</option>
                <option value="11-50">11–50</option>
                <option value="51-200">51–200</option>
                <option value="201-1000">201–1000</option>
                <option value="1000+">1000+</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor={messageId} className="block text-[10px] font-mono text-gray-400 mb-2 tracking-[0.5px] uppercase">What challenges are you facing?</label>
            <textarea id={messageId} name="message" rows={3} value={formData.message} onChange={handleChange}
              placeholder="Tell us about your business challenges and goals..."
              className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all resize-none text-sm" />
          </div>
          <button type="submit" disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold flex items-center justify-center gap-2 hover:from-cyan-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              <>Schedule My Free Consultation <ArrowUpRight className="w-4 h-4" /></>
            )}
          </button>
          <p className="text-gray-500 text-xs text-center">
            By submitting, you agree to our privacy policy. We&apos;ll never share your information.
          </p>
        </form>
      </div>
    </div>
  );
};

const ScheduleCallModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
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
          <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl bg-gradient-to-br from-gray-900 to-[#020110] border border-gray-700/50 shadow-2xl">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
            <ExpandableScreenDemo onClose={onClose} />
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

// ─── Services ─────────────────────────────────────────────────────────────────

const getTileClass = (size: TileSize): string => {
  switch (size) {
    case "large":
      return "lg:col-span-2 lg:row-span-2";
    case "medium":
      return "lg:col-span-2";
    default:
      return "";
  }
};

const AIServices = memo(() => {
  const [modalOpen, setModalOpen] = useState(false);

  const tiles: ServiceTile[] = useMemo(
    () => [
      {
        id: 1,
        size: "medium",
        icon: Brain,
        title: "Custom AI Models",
        desc: "Purpose-built machine learning models trained exclusively on your data for maximum relevance and accuracy.",
        tags: ["Predictions", "Classification", "Recommendations"],
      },
      {
        id: 2,
        size: "small",
        icon: MessageSquare,
        title: "Conversational AI",
        desc: "Intelligent chatbots and voice assistants.",
        tags: ["NLP", "Multi-language"],
      },
      {
        id: 3,
        size: "small",
        icon: FileText,
        title: "Document Intelligence",
        desc: "Auto-extract, classify, and process documents.",
        tags: ["OCR", "NLP"],
      },
      {
        id: 4,
        size: "large",
        icon: Code2,
        title: "AI-Assisted Development",
        desc: "Accelerate software delivery with AI code generation, review, and testing.",
        tags: ["Code Gen", "Testing", "Review"],
      },
      {
        id: 5,
        size: "small",
        icon: LineChart,
        title: "Predictive Analytics",
        desc: "Forecast trends, demand, and anomalies.",
        tags: ["Forecasting", "Anomaly Detection"],
      },
      {
        id: 6,
        size: "small",
        icon: Shield,
        title: "AI Security",
        desc: "Threat detection and prevention.",
        tags: ["Anomaly", "Real-time"],
      },
      {
        id: 7,
        size: "medium",
        icon: Cloud,
        title: "Cloud AI Infrastructure",
        desc: "Scalable, cost-optimized AI deployment pipelines on AWS, Azure, or GCP.",
        tags: ["MLOps", "Pipelines", "Scaling"],
      },
    ],
    []
  );

  return (
    <section className="relative py-32 px-6 bg-[#010007]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-8"
        >
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <span className="text-gray-500 text-sm tracking-[0.2em] uppercase">Capabilities</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-16 max-w-3xl"
        >
          AI services built for{" "}
          <span className="text-cyan-400">real business</span> outcomes.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-min">
          {tiles.map((tile, i) => {
            const Icon = tile.icon;
            return (
              <motion.div
                key={tile.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -3 }}
                className={`group p-6 rounded-2xl border border-gray-800/50 hover:border-gray-700 transition-all ${getTileClass(tile.size)}`}
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0.01) 0%, transparent 100%)",
                }}
              >
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{tile.title}</h3>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">{tile.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {tile.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-md bg-gray-900 border border-gray-800 text-gray-500 text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 flex flex-col sm:flex-row items-start sm:items-center gap-6 p-8 rounded-2xl border border-gray-800"
          style={{
            background:
              "linear-gradient(135deg, rgba(34,211,238,0.03) 0%, rgba(168,85,247,0.03) 100%)",
          }}
        >
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">
              Ready to see what AI can do for you?
            </h3>
            <p className="text-gray-500 text-sm">
              Book a 30-minute discovery call. No commitment, just clarity.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setModalOpen(true)}
            className="px-8 py-4 bg-white text-black rounded-xl font-semibold flex items-center gap-2 flex-shrink-0"
          >
            Schedule Call
            <ArrowUpRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>

      <ScheduleCallModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
});
AIServices.displayName = "AIServices";

// ─── Page Root ────────────────────────────────────────────────────────────────

export function AIPageClient() {
  return (
    <div className="bg-[#010007] text-white overflow-x-clip">
      <AIHero />
      <AIPower />
      <AIApproach />
      <AIServices />
    </div>
  );
}
