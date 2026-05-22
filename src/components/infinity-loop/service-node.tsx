"use client";

import { memo } from "react";
import { motion, useTransform } from "framer-motion";
import { NODE_COLORS } from "./infinity-path";
import type { ServiceNodeProps } from "./types";

const NODE_RADIUS = 18;
const GLOW_RADIUS = 30;
const LABEL_OFFSET = 40;

// First letter of the label as the node glyph — clean, SVG-native, no foreignObject
function getLabelInitial(label: string): string {
  return label.slice(0, 2).toUpperCase();
}

const ServiceNode = memo(function ServiceNode({
  id,
  label,
  color,
  x,
  y,
  glowMV,
  scaleMV,
  labelPlacement,
  showLabel,
  onClick,
}: ServiceNodeProps) {
  const colors = NODE_COLORS[color];

  const ringOpacity = useTransform(glowMV, [0, 1], [0.12, 0.85]);
  const innerGlowOpacity = useTransform(glowMV, [0, 1], [0.4, 1]);

  const labelX =
    labelPlacement === "left"
      ? -(LABEL_OFFSET + 4)
      : labelPlacement === "right"
      ? LABEL_OFFSET + 4
      : 0;
  const labelY =
    labelPlacement === "above"
      ? -(LABEL_OFFSET - 6)
      : labelPlacement === "below"
      ? LABEL_OFFSET - 6
      : 0;
  const textAnchor =
    labelPlacement === "left" ? "end" : labelPlacement === "right" ? "start" : "middle";

  return (
    <motion.g
      // Use Framer Motion's x/y so all transforms are managed in one CSS matrix.
      // Mixing SVG transform attribute with FM style={{ scale }} loses the translate.
      style={{ x, y, scale: scaleMV }}
      whileHover={{ scale: 1.5 }}
      onClick={() => onClick(id)}
      className="cursor-pointer"
    >
      {/* Outer glow ring — proximity-driven */}
      <motion.circle
        r={GLOW_RADIUS}
        fill={colors.fill}
        stroke={colors.stroke}
        strokeWidth={1}
        style={{ opacity: ringOpacity }}
      />

      {/* Idle pulse ring — CSS animation */}
      <circle
        r={GLOW_RADIUS}
        fill="none"
        stroke={colors.stroke}
        strokeWidth={1}
        className="infinity-node-pulse"
        style={{ opacity: 0.25 }}
      />

      {/* Inner circle */}
      <motion.circle
        r={NODE_RADIUS}
        fill="#0a192f"
        stroke={colors.stroke}
        strokeWidth={1.5}
        style={{ opacity: innerGlowOpacity }}
      />

      {/* Node initial letters — SVG-native, no foreignObject */}
      <text
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={7}
        fontFamily="var(--font-space-grotesk, system-ui, sans-serif)"
        fontWeight={600}
        letterSpacing={0.5}
        fill={colors.stroke}
        style={{ userSelect: "none" }}
      >
        {getLabelInitial(label)}
      </text>

      {/* Full label pill — desktop only */}
      {showLabel && (
        <g transform={`translate(${labelX}, ${labelY})`}>
          <rect
            x={-32}
            y={-10}
            width={64}
            height={20}
            rx={10}
            fill="#0a192f"
            stroke={colors.stroke}
            strokeWidth={0.75}
            opacity={0.92}
          />
          <text
            textAnchor={textAnchor}
            dominantBaseline="central"
            fontSize={8.5}
            fontFamily="var(--font-space-grotesk, system-ui, sans-serif)"
            fontWeight={500}
            letterSpacing={0.4}
            fill={colors.stroke}
            style={{ userSelect: "none" }}
          >
            {label}
          </text>
        </g>
      )}
    </motion.g>
  );
});

ServiceNode.displayName = "ServiceNode";
export { ServiceNode };
