"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/anim";
import { prefersReducedMotion } from "@/lib/tokens";

/**
 * Page transition wipe. The accent panel only exists WHILE a route is
 * changing (phase 'in'/'out') and unmounts at rest — it can never cover
 * the page outside an actual navigation.
 */
type Phase = "idle" | "in" | "out";

export default function PageTransition() {
  const pathname = usePathname();
  const first = useRef(true);
  const panelRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (prefersReducedMotion()) return;
    setPhase("in");
  }, [pathname]);

  useEffect(() => {
    if (phase === "idle") return;
    const el = panelRef.current;
    if (!el) return;

    gsap.set(el, { xPercent: -100 });
    gsap.to(el, {
      xPercent: 0,
      duration: 0.5,
      ease: "power4.in",
      onComplete: () => {
        gsap.to(el, {
          xPercent: 100,
          duration: 0.55,
          ease: "expo.inOut",
          delay: 0.08,
          onComplete: () => setPhase("idle"),
        });
      },
    });
  }, [phase]);

  if (phase === "idle") return null;

  return <div ref={panelRef} className="pointer-events-none fixed inset-0 z-[480] bg-accent" aria-hidden="true" />;
}
