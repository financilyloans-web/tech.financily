"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/anim";

/** Top scroll progress bar. */
export default function ProgressBar() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bar.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.to(el, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: 0,
          end: "max",
          scrub: 0.3,
        },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-150 h-1 bg-transparent">
      <div ref={bar} className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-cyan via-violet to-magenta" />
    </div>
  );
}
