"use client";

import { useRef, type MouseEvent as ReactMouseEvent, type ReactNode } from "react";
import cn from "@/lib/cn";
import { prefersReducedMotion } from "@/lib/tokens";

type Props = {
  children: ReactNode;
  className?: string;
  glow?: string;
  /** subtle 3D tilt on pointer move (fine pointers only) */
  tilt?: boolean;
};

/** Glass card with cursor-follow glow + optional gentle 3D tilt. */
export default function GlassCard({ children, className, glow = "from-accent/15 to-warm/10", tilt = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: ReactMouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--gx", `${x}px`);
    el.style.setProperty("--gy", `${y}px`);

    if (!tilt || prefersReducedMotion() || window.matchMedia("(pointer: coarse)").matches) return;
    const px = x / r.width - 0.5;
    const py = y / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-py * 6).toFixed(2)}deg) rotateY(${(px * 8).toFixed(2)}deg)`;
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn("glass gradient-border group relative overflow-hidden p-6", className)}
      style={{
        transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
        backgroundImage: `radial-gradient(220px circle at var(--gx, 50%) var(--gy, 50%), rgba(182,255,60,0.08), transparent 70%)`,
        willChange: "transform",
      }}
    >
      <div className={cn("pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br", glow)} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
