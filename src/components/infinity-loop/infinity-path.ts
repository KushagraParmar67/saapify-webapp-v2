import { Target, Users, Package, Film, TrendingUp, Palette, Leaf } from "lucide-react";
import type { NodeDefinition } from "./types";

// ─── ViewBox constants ────────────────────────────────────────────────────────

export const DESKTOP_VIEWBOX_W = 1000;
export const DESKTOP_VIEWBOX_H = 500;
export const MOBILE_VIEWBOX_W = 500;
export const MOBILE_VIEWBOX_H = 700;

// ─── SVG path strings ─────────────────────────────────────────────────────────

// 4-segment cubic Bezier lemniscate, center at (500,250)
// Right lobe: segments 1+2 | Left lobe: segments 3+4
// Path crosses itself at (500,250) — the ∞ neck
export const DESKTOP_PATH_D =
  "M 500,250 C 520,60 880,60 880,250 C 880,440 520,440 500,250 C 480,440 120,440 120,250 C 120,60 480,60 500,250";

// Portrait figure-eight for mobile, center at (250,350)
export const MOBILE_PATH_D =
  "M 250,350 C 60,330 60,70 250,70 C 440,70 440,330 250,350 C 60,370 60,630 250,630 C 440,630 440,370 250,350";

// ─── Animation config ─────────────────────────────────────────────────────────

export const LOOP_DURATION = 8;       // seconds per full loop
export const ACTIVATION_RADIUS = 0.09; // fraction of path for node activation window
export const ENERGY_WAVE_FRACTION = 0.18; // fraction of total path length the lit arc spans
export const TRAIL_BLUR_DESKTOP = 8;
export const TRAIL_BLUR_MOBILE = 5;

// ─── Node definitions ─────────────────────────────────────────────────────────
// desktopProgress / mobileProgress: 0→1 position along each path.
// These are starting estimates — tune after visual review by adjusting values here only.

export const NODE_DEFINITIONS: NodeDefinition[] = [
  {
    id: "strategy",
    label: "Strategy",
    icon: Target,
    color: "cyan",
    desktopProgress: 0.06,
    mobileProgress: 0.06,
  },
  {
    id: "consulting",
    label: "Consulting",
    icon: Users,
    color: "blue",
    desktopProgress: 0.25,
    mobileProgress: 0.25,
  },
  {
    id: "product",
    label: "Product",
    icon: Package,
    color: "purple",
    desktopProgress: 0.44,
    mobileProgress: 0.44,
  },
  {
    id: "media",
    label: "Media",
    icon: Film,
    color: "cyan",
    desktopProgress: 0.50,
    mobileProgress: 0.50,
  },
  {
    id: "marketing",
    label: "Marketing",
    icon: TrendingUp,
    color: "blue",
    desktopProgress: 0.62,
    mobileProgress: 0.62,
  },
  {
    id: "creative",
    label: "Creative",
    icon: Palette,
    color: "purple",
    desktopProgress: 0.75,
    mobileProgress: 0.75,
  },
  {
    id: "organic",
    label: "Organic",
    icon: Leaf,
    color: "cyan",
    desktopProgress: 0.94,
    mobileProgress: 0.94,
  },
];

// ─── Color maps ───────────────────────────────────────────────────────────────

export const NODE_COLORS = {
  cyan: {
    stroke: "#22d3ee",
    fill: "#22d3ee1a",
    glow: "#22d3ee",
  },
  blue: {
    stroke: "#60a5fa",
    fill: "#60a5fa1a",
    glow: "#60a5fa",
  },
  purple: {
    stroke: "#c084fc",
    fill: "#c084fc1a",
    glow: "#c084fc",
  },
} as const;

// ─── Proximity helper ─────────────────────────────────────────────────────────

// Returns a 0→1 weight — 1 when particle is exactly at the node,
// falling off linearly to 0 at ACTIVATION_RADIUS distance.
// Handles wrap-around at the 0/1 boundary.
export function getProximityWeight(
  particleProgress: number,
  nodeProgress: number,
  radius: number = ACTIVATION_RADIUS
): number {
  const dist = Math.min(
    Math.abs(particleProgress - nodeProgress),
    Math.abs(particleProgress - nodeProgress + 1),
    Math.abs(particleProgress - nodeProgress - 1)
  );
  return Math.max(0, 1 - dist / radius);
}
