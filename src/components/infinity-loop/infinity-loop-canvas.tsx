"use client";

import { memo, useRef, useEffect, useState, useCallback } from "react";
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

// ─── NodeAnimator — isolates hooks per node ───────────────────────────────────

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

// ─── SVG Defs ─────────────────────────────────────────────────────────────────

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
      <radialGradient id="il-particle-gradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
        <stop offset="40%" stopColor="#22d3ee" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="il-center-radial" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
      </radialGradient>
    </defs>
  );
});

SvgDefs.displayName = "SvgDefs";

// ─── EchoCircle — own component so useTransform runs at top level ─────────────

interface EchoCircleProps {
  pathD: string;
  progress: MotionValue<number>;
  offset: number;
  r: number;
  opacity: number;
  strong: boolean;
}

const EchoCircle = memo(function EchoCircle({
  pathD,
  progress,
  offset,
  r,
  opacity,
  strong,
}: EchoCircleProps) {
  const shifted = useTransform(progress, (p) => {
    let v = p - offset;
    if (v < 0) v += 1;
    return v;
  });
  const pct = useTransform(shifted, [0, 1], ["0%", "100%"]);

  return (
    <motion.circle
      r={r}
      fill="#22d3ee"
      opacity={opacity}
      style={
        {
          offsetPath: `path("${pathD}")`,
          offsetDistance: pct,
          offsetRotate: "0deg",
          filter: strong ? "url(#il-glow-strong)" : "url(#il-glow-soft)",
          willChange: "transform",
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any
      }
    />
  );
});

EchoCircle.displayName = "EchoCircle";

// ─── CenterPulse — expanding ring when particle crosses the neck ──────────────

interface CenterPulseProps {
  progress: MotionValue<number>;
  cx: number;
  cy: number;
}

const CenterPulse = memo(function CenterPulse({ progress, cx, cy }: CenterPulseProps) {
  const proximity = useTransform(progress, (p) => {
    const dist = Math.min(
      Math.abs(p - 0.5),
      Math.abs(p - 0.5 + 1),
      Math.abs(p - 0.5 - 1)
    );
    return dist < 0.04 ? 1 - dist / 0.04 : 0;
  });
  const sprung = useSpring(proximity, { stiffness: 200, damping: 15 });
  const ringOpacity = useTransform(sprung, [0, 1], [0, 0.55]);

  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={50}
      fill="none"
      stroke="#22d3ee"
      strokeWidth={2}
      style={
        {
          scale: sprung,
          opacity: ringOpacity,
          transformOrigin: `${cx}px ${cy}px`,
          pointerEvents: "none",
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any
      }
    />
  );
});

CenterPulse.displayName = "CenterPulse";

// ─── Echo trail config ────────────────────────────────────────────────────────

const ECHOES = [
  { offset: 0.012, r: 4.5, opacity: 0.7,  strong: true  },
  { offset: 0.025, r: 4.0, opacity: 0.55, strong: true  },
  { offset: 0.038, r: 3.5, opacity: 0.4,  strong: false },
  { offset: 0.051, r: 3.0, opacity: 0.28, strong: false },
  { offset: 0.064, r: 2.5, opacity: 0.18, strong: false },
  { offset: 0.077, r: 2.0, opacity: 0.10, strong: false },
];

// ─── Main canvas ──────────────────────────────────────────────────────────────

const InfinityLoopCanvas = memo(function InfinityLoopCanvas() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<AnimationPlaybackControls | null>(null);

  const [desktopPositions, setDesktopPositions] = useState<NodePosition[]>([]);
  const [mobilePositions, setMobilePositions] = useState<NodePosition[]>([]);

  const progress = useMotionValue(0);

  const particleOffsetDesktop = useTransform(progress, [0, 1], ["0%", "100%"]);
  const particleOffsetMobile = useTransform(progress, [0, 1], ["0%", "100%"]);

  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  const springX = useSpring(rawMouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(rawMouseY, { stiffness: 60, damping: 20 });

  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  // Measure node positions via detached SVG (avoids getTotalLength() = 0 on hidden elements)
  useEffect(() => {
    const measure = (
      pathD: string,
      key: "desktopProgress" | "mobileProgress"
    ): NodePosition[] => {
      const ns = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(ns, "svg");
      const path = document.createElementNS(ns, "path") as SVGPathElement;
      path.setAttribute("d", pathD);
      svg.appendChild(path);
      svg.style.cssText = "position:absolute;visibility:hidden;pointer-events:none";
      document.body.appendChild(svg);
      const total = path.getTotalLength();
      const positions = NODE_DEFINITIONS.map((node) => {
        const pt = path.getPointAtLength(node[key] * total);
        return { x: pt.x, y: pt.y };
      });
      document.body.removeChild(svg);
      return total > 0 ? positions : [];
    };

    const d = measure(DESKTOP_PATH_D, "desktopProgress");
    const m = measure(MOBILE_PATH_D, "mobileProgress");
    if (d.length) setDesktopPositions(d);
    if (m.length) setMobilePositions(m);
  }, []);

  // Start / stop animation based on visibility
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
    void id;
  }, []);

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

          {/* Ambient radial glow at center neck */}
          <circle
            cx={500} cy={250} r={140}
            fill="url(#il-center-radial)"
            opacity={0.5}
            style={{ pointerEvents: "none" }}
          />

          {/* Breathing base wire */}
          <motion.path
            d={DESKTOP_PATH_D}
            fill="none"
            stroke="#22d3ee"
            strokeWidth={1.5}
            filter="url(#il-glow-soft)"
            animate={{ opacity: [0.12, 0.3, 0.12] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <path d={DESKTOP_PATH_D} fill="none" stroke="#22d3ee" strokeWidth={1} opacity={0.08} />

          {/* Center crossing pulse ring */}
          <CenterPulse progress={progress} cx={500} cy={250} />

          {/* Fading echo trail */}
          {ECHOES.map((e, i) => (
            <EchoCircle
              key={i}
              pathD={DESKTOP_PATH_D}
              progress={progress}
              offset={e.offset}
              r={e.r}
              opacity={e.opacity}
              strong={e.strong}
            />
          ))}

          {/* Main particle head */}
          <motion.circle
            r={5}
            fill="url(#il-particle-gradient)"
            filter="url(#il-glow-strong)"
            style={
              {
                offsetPath: `path("${DESKTOP_PATH_D}")`,
                offsetDistance: particleOffsetDesktop,
                offsetRotate: "0deg",
                willChange: "transform",
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
              } as any
            }
          />

          {/* Service nodes */}
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

          {/* Ambient radial glow at center neck */}
          <circle
            cx={250} cy={350} r={100}
            fill="url(#il-center-radial)"
            opacity={0.5}
            style={{ pointerEvents: "none" }}
          />

          {/* Breathing base wire */}
          <motion.path
            d={MOBILE_PATH_D}
            fill="none"
            stroke="#22d3ee"
            strokeWidth={1.5}
            filter="url(#il-glow-soft)"
            animate={{ opacity: [0.12, 0.3, 0.12] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <path d={MOBILE_PATH_D} fill="none" stroke="#22d3ee" strokeWidth={1} opacity={0.08} />

          {/* Center crossing pulse ring */}
          <CenterPulse progress={progress} cx={250} cy={350} />

          {/* Fading echo trail */}
          {ECHOES.map((e, i) => (
            <EchoCircle
              key={i}
              pathD={MOBILE_PATH_D}
              progress={progress}
              offset={e.offset}
              r={e.r}
              opacity={e.opacity}
              strong={e.strong}
            />
          ))}

          {/* Main particle head */}
          <motion.circle
            r={5}
            fill="url(#il-particle-gradient)"
            filter="url(#il-glow-strong)"
            style={
              {
                offsetPath: `path("${MOBILE_PATH_D}")`,
                offsetDistance: particleOffsetMobile,
                offsetRotate: "0deg",
                willChange: "transform",
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
              } as any
            }
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
