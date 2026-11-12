"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/anim";
import { prefersReducedMotion } from "@/lib/tokens";

/**
 * Custom cursor: accent dot + trailing ring. Swells over interactive
 * elements and shows a context label for [data-cursor] targets
 * ("view" / "drag"). Hidden on touch + reduced-motion.
 */
const INTERACTIVE = "a, button, [role='button'], input, textarea, [data-cursor]";

export default function CustomCursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches || prefersReducedMotion()) return;
    const ringEl = ring.current;
    const dotEl = dot.current;
    const labelEl = label.current;
    if (!ringEl || !dotEl || !labelEl) return;

    ringEl.style.display = "block";
    dotEl.style.display = "block";

    const rx = gsap.quickTo(ringEl, "x", { duration: 0.45, ease: "power3.out" });
    const ry = gsap.quickTo(ringEl, "y", { duration: 0.45, ease: "power3.out" });
    const dx = gsap.quickTo(dotEl, "x", { duration: 0.14, ease: "power2.out" });
    const dy = gsap.quickTo(dotEl, "y", { duration: 0.14, ease: "power2.out" });

    const onMove = (e: MouseEvent) => {
      rx(e.clientX); ry(e.clientY); dx(e.clientX); dy(e.clientY);
      const target = (e.target as HTMLElement).closest(INTERACTIVE) as HTMLElement | null;
      const mode = target?.dataset.cursor || (target ? "link" : null);
      gsap.to(ringEl, { scale: mode ? 2.1 : 1, duration: 0.35, ease: "power3.out" });
      labelEl.textContent = mode === "view" ? "View" : mode === "drag" ? "Drag" : "";
      gsap.to(labelEl, { opacity: mode === "view" || mode === "drag" ? 1 : 0, duration: 0.25 });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[420] flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent/50"
        style={{ display: "none" }}
      >
        <span ref={label} className="font-mono text-[9px] tracking-[0.2em] text-accent opacity-0" />
      </div>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[420] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_14px_#B6FF3C]"
        style={{ display: "none" }}
      />
    </>
  );
}
