/**
 * Financily Technologies — Design System Tokens
 * Single signature accent + muted warm secondary. Editorial, precise.
 */

export const palette = {
  ink: "#05070D",
  navy: "#0A0F1C",
  accent: "#B6FF3C",
  warm: "#C9B896",
  paper: "#E9EFEA",
  muted: "#8A93A6",
  line: "rgba(233,239,234,0.09)",
} as const;

export const type = {
  display: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif",
  body: "ui-sans-serif, system-ui, apple-system, 'Segoe UI', sans-serif",
  mono: "'JetBrains Mono', ui-monospace, monospace",
} as const;

/* Motion: weight + intent. No random bouncing. */
export const easing = {
  out: "cubic-bezier(0.22, 1, 0.36, 1)",          // power4.out-ish
  expo: "cubic-bezier(0.16, 1, 0.3, 1)",          // expo.out
  custom: "cubic-bezier(0.65, 0, 0.35, 1)",       // in-out
} as const;

export const duration = {
  fast: 220,
  base: 520,
  slow: 760,
  scrubbed: 1,
} as const;

/** Motion preference guard — respect prefers-reduced-motion. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
