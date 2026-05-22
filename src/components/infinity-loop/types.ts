import type { LucideIcon } from "lucide-react";
import type { MotionValue } from "framer-motion";

export interface NodeDefinition {
  id: string;
  label: string;
  icon: LucideIcon;
  color: "cyan" | "blue" | "purple";
  desktopProgress: number; // 0→1 along desktop path
  mobileProgress: number;  // 0→1 along mobile path
}

export interface NodePosition {
  x: number;
  y: number;
}

export interface ServiceNodeProps {
  id: string;
  label: string;
  icon: LucideIcon;
  color: "cyan" | "blue" | "purple";
  x: number;
  y: number;
  glowMV: MotionValue<number>;
  scaleMV: MotionValue<number>;
  labelPlacement: "above" | "below" | "left" | "right";
  showLabel: boolean;
  onClick: (id: string) => void;
}

export type BreakpointMode = "desktop" | "mobile";
