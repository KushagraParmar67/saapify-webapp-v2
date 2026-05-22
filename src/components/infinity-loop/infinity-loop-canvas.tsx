"use client";

import { memo, useRef, useEffect, useState, useMemo, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useInView,
  animate,
  MotionValue,
} from "framer-motion";
import {
  DESKTOP_PATH_D,
  MOBILE_PATH_D,
  DESKTOP_VIEWBOX_W,
  DESKTOP_VIEWBOX_H,
  MOBILE_VIEWBOX_W,
  MOBILE_VIEWBOX_H,
  NODE_DEFINITIONS,
  LOOP_DURATION,
  ACTIVATION_RADIUS,
  ENERGY_WAVE_FRACTION,
  getProximityWeight,
} from "./infinity-path";
import { ServiceNode } from "./service-node";
import type { NodeDefinition, NodePosition } from "./types";
import type { AnimationPlaybackControls } from "framer-motion";

// ─── Label placement ──────────────────────────────────────────────────────────

function getLabelPlacement(
  x: number,
  y: number,
  vbW: number,
  vbH: number
): "above" | "below" | "left" | "right" {
  if (x < vbW * 0.2) return "left";
  if (x > vbW * 0.8) return "right";
  if (y < vbH / 2) return "above";
  return "below";
}

// ─── NodeAnimator — isolates hooks per node, avoids hooks-in-loop ─────────────

interface NodeAnimatorProps {
  node: NodeDefinition;
  progress: MotionValue<number>;
  position: NodePosition;
  showLabel: boolean;
  viewboxW: number;
  viewboxH: number;
  onClick: (id: string) => void;
}

const NodeAnimator = memo(function NodeAnimator({
  node,
  progress,
  position,
  showLabel,
  viewboxW,
  viewboxH,
  onClick,
}: NodeAnimatorProps) {
  const rawProximity = useTransform(progress, (p: number) =>
    getProximityWeight(p, node.desktopProgress, ACTIVATION_RADIUS)
  );
  const glowMV = useSpring(rawProximity, { stiffness: 120, damping: 18 });
  const scaleMV = useTransform(glowMV, [0, 1], [1, 1.3]);

  return (
    <ServiceNode
      id={node.id}
      label={node.label}
      icon={node.icon}
      color={node.color}
      x={position.x}
      y={position.y}
      glowMV={glowMV}
      scaleMV={scaleMV}
      labelPlacement={getLabelPlacement(position.x, position.y, viewboxW, viewboxH)}
      showLabel={showLabel}
      onClick={onClick}
    />
  );
});

NodeAnimator.displayName = "NodeAnimator";

// ─── SVG Defs (static, memoised) ─────────────────────────────────────────────

const SvgDefs = memo(function SvgDefs() {
  return (
    <defs>
      <filter id="il-glow-soft" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
        <feComposite in="blur" in2="SourceGraphic" operator="over" />
      </filter>
      <filter id="il-glow-strong" x="-80%" y="-80%" width="260%" height="260%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
        <feComposite in="blur" in2="SourceGraphic" operator="over" />
      </filter>
      <linearGradient id="il-wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.9" />
        <stop offset="50%" stopColor="#60a5fa" stopOpacity="1" />
        <stop offset="100%" stopColor="#c084fc" stopOpacity="0.9" />
      </linearGradient>
      <radialGradient id="il-particle-gradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
        <stop offset="40%" stopColor="#22d3ee" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
      </radialGradient>
    </defs>
  );
});

SvgDefs.displayName = "SvgDefs";

// ─── Main canvas ──────────────────────────────────────────────────────────────

const InfinityLoopCanvas = memo(function InfinityLoopCanvas() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<AnimationPlaybackControls | null>(null);

  // Node pixel positions — state so render updates after mount measurement
  const [desktopPositions, setDesktopPositions] = useState<NodePosition[]>([]);
  const [mobilePositions, setMobilePositions] = useState<NodePosition[]>([]);

  // Total path lengths for dasharray calculation
  const [desktopTotal, setDesktopTotal] = useState(2400);
  const [mobileTotal, setMobileTotal] = useState(2800);

  // Root progress 0→1
  const progress = useMotionValue(0);

  // Particle offset-distance
  const particleOffsetDesktop = useTransform(progress, [0, 1], ["0%", "100%"]);
  const particleOffsetMobile = useTransform(progress, [0, 1], ["0%", "100%"]);

  // Energy wave stroke-dashoffset (negative = travels forward along path)
  const energyOffsetDesktop = useMotionValue(0);
  const energyOffsetMobile = useMotionValue(0);

  // Mouse parallax
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  const springX = useSpring(rawMouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(rawMouseY, { stiffness: 60, damping: 20 });

  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  // Measure path lengths and node positions using a detached SVG element.
  // This avoids getTotalLength() returning 0 when the parent SVG has display:none
  // applied by a responsive Tailwind class at the time the effect fires.
  useEffect(() => {
    const measurePathStr = (
      pathD: string,
      progressKey: "desktopProgress" | "mobileProgress"
    ): { positions: NodePosition[]; total: number } => {
      const ns = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(ns, "svg");
      const path = document.createElementNS(ns, "path") as SVGPathElement;
      path.setAttribute("d", pathD);
      svg.appendChild(path);
      // Must be in the document for Chrome to compute length
      svg.style.position = "absolute";
      svg.style.visibility = "hidden";
      svg.style.pointerEvents = "none";
      document.body.appendChild(svg);

      const total = path.getTotalLength();
      const positions = NODE_DEFINITIONS.map((node) => {
        const pt = path.getPointAtLength(node[progressKey] * total);
        return { x: pt.x, y: pt.y };
      });

      document.body.removeChild(svg);
      return { positions, total };
    };

    const d = measurePathStr(DESKTOP_PATH_D, "desktopProgress");
    const m = measurePathStr(MOBILE_PATH_D, "mobileProgress");

    if (d.total > 0) {
      setDesktopTotal(d.total);
      setDesktopPositions(d.positions);
    }
    if (m.total > 0) {
      setMobileTotal(m.total);
      setMobilePositions(m.positions);
    }
  }, []);

  // Drive energy wave dashoffset from progress
  useEffect(() => {
    const unsub = progress.on("change", (p) => {
      energyOffsetDesktop.set(-p * desktopTotal);
      energyOffsetMobile.set(-p * mobileTotal);
    });
    return unsub;
  }, [progress, energyOffsetDesktop, energyOffsetMobile, desktopTotal, mobileTotal]);

  // Start / stop loop on in-view change
  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isInView && !prefersReduced) {
      animRef.current?.stop();
      animRef.current = animate(progress, 1, {
        duration: LOOP_DURATION,
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop",
      });
    } else if (!isInView) {
      animRef.current?.stop();
    }

    return () => {
      animRef.current?.stop();
    };
  }, [isInView, progress]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      rawMouseX.set(((e.clientX - rect.left - rect.width / 2) / rect.width) * 16);
      rawMouseY.set(((e.clientY - rect.top - rect.height / 2) / rect.height) * 10);
    },
    [rawMouseX, rawMouseY]
  );

  const handleMouseLeave = useCallback(() => {
    rawMouseX.set(0);
    rawMouseY.set(0);
  }, [rawMouseX, rawMouseY]);

  const handleNodeClick = useCallback((id: string) => {
    // Stub — connect to drawer/navigation in a future iteration
    void id;
  }, []);

  // Dasharray values
  const desktopWaveLen = useMemo(() => desktopTotal * ENERGY_WAVE_FRACTION, [desktopTotal]);
  const desktopGapLen = useMemo(
    () => desktopTotal * (1 - ENERGY_WAVE_FRACTION),
    [desktopTotal]
  );
  const mobileWaveLen = useMemo(() => mobileTotal * ENERGY_WAVE_FRACTION, [mobileTotal]);
  const mobileGapLen = useMemo(
    () => mobileTotal * (1 - ENERGY_WAVE_FRACTION),
    [mobileTotal]
  );

  return (
    <div
      ref={sectionRef}
      className="relative w-full select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div style={{ x: springX, y: springY }} className="relative w-full">
        {/* ── Desktop SVG ──────────────────────────────────────────────────── */}
        <svg
          className="hidden md:block w-full"
          viewBox={`0 0 ${DESKTOP_VIEWBOX_W} ${DESKTOP_VIEWBOX_H}`}
          preserveAspectRatio="xMidYMid meet"
          style={{ maxHeight: "clamp(280px, 45vw, 540px)", overflow: "visible" }}
          aria-hidden="true"
        >
          <SvgDefs />

          {/* Layer 1: Base wire — breathing */}
          <motion.path
            d={DESKTOP_PATH_D}
            fill="none"
            stroke="#22d3ee"
            strokeWidth={1.5}
            filter="url(#il-glow-soft)"
            animate={{ opacity: [0.12, 0.3, 0.12] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <path d={DESKTOP_PATH_D} fill="none" stroke="#22d3ee" strokeWidth={1} opacity={0.1} />

          {/* Layer 2: Energy wave */}
          <motion.path
            d={DESKTOP_PATH_D}
            fill="none"
            stroke="url(#il-wave-gradient)"
            strokeWidth={3}
            strokeDasharray={`${desktopWaveLen} ${desktopGapLen}`}
            style={{ strokeDashoffset: energyOffsetDesktop }}
            filter="url(#il-glow-soft)"
            opacity={0.85}
          />

          {/* Layer 3: Particle head */}
          <motion.circle
            r={5}
            fill="url(#il-particle-gradient)"
            filter="url(#il-glow-strong)"
            style={{
              offsetPath: `path("${DESKTOP_PATH_D}")`,
              offsetDistance: particleOffsetDesktop,
              offsetRotate: "0deg",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any}
          />

          {/* Layer 4: Nodes */}
          {NODE_DEFINITIONS.map((node, i) => (
            <NodeAnimator
              key={node.id}
              node={node}
              progress={progress}
              position={desktopPositions[i] ?? { x: 0, y: 0 }}
              showLabel={true}
              viewboxW={DESKTOP_VIEWBOX_W}
              viewboxH={DESKTOP_VIEWBOX_H}
              onClick={handleNodeClick}
            />
          ))}
        </svg>

        {/* ── Mobile SVG ───────────────────────────────────────────────────── */}
        <svg
          className="block md:hidden w-full"
          viewBox={`0 0 ${MOBILE_VIEWBOX_W} ${MOBILE_VIEWBOX_H}`}
          preserveAspectRatio="xMidYMid meet"
          style={{ maxHeight: "clamp(400px, 90vw, 600px)", overflow: "visible" }}
          aria-hidden="true"
        >
          <SvgDefs />

          {/* Base wire */}
          <motion.path
            d={MOBILE_PATH_D}
            fill="none"
            stroke="#22d3ee"
            strokeWidth={1.5}
            filter="url(#il-glow-soft)"
            animate={{ opacity: [0.12, 0.3, 0.12] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <path d={MOBILE_PATH_D} fill="none" stroke="#22d3ee" strokeWidth={1} opacity={0.1} />

          {/* Energy wave */}
          <motion.path
            d={MOBILE_PATH_D}
            fill="none"
            stroke="url(#il-wave-gradient)"
            strokeWidth={3}
            strokeDasharray={`${mobileWaveLen} ${mobileGapLen}`}
            style={{ strokeDashoffset: energyOffsetMobile }}
            filter="url(#il-glow-soft)"
            opacity={0.85}
          />

          {/* Particle */}
          <motion.circle
            r={5}
            fill="url(#il-particle-gradient)"
            filter="url(#il-glow-strong)"
            style={{
              offsetPath: `path("${MOBILE_PATH_D}")`,
              offsetDistance: particleOffsetMobile,
              offsetRotate: "0deg",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any}
          />

          {/* Nodes — no labels on mobile */}
          {NODE_DEFINITIONS.map((node, i) => (
            <NodeAnimator
              key={node.id}
              node={node}
              progress={progress}
              position={mobilePositions[i] ?? { x: 0, y: 0 }}
              showLabel={false}
              viewboxW={MOBILE_VIEWBOX_W}
              viewboxH={MOBILE_VIEWBOX_H}
              onClick={handleNodeClick}
            />
          ))}
        </svg>
      </motion.div>
    </div>
  );
});

InfinityLoopCanvas.displayName = "InfinityLoopCanvas";
export { InfinityLoopCanvas };
