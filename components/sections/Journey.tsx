"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/anim";
import { prefersReducedMotion } from "@/lib/tokens";
import Section from "@/components/ui/Section";

const STEPS = [
  { k: "Payments", d: "Real-time rails clear in milliseconds.", c: "#00E5FF" },
  { k: "Trading", d: "Algorithmic execution at machine speed.", c: "#7B5CFF" },
  { k: "Security", d: "Fraud is flagged before it lands.", c: "#2BFFB0" },
];

/**
 * Pinned scroll storytelling: a marker travels across three steps while a
 * large word and description morph. Uses ScrollTrigger pin + timeline.
 */
export default function Journey() {
  const root = useRef<HTMLDivElement>(null);
  const pinned = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current || !pinned.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=220%",
          pin: pinned.current,
          scrub: true,
          anticipatePin: 1,
        },
      });

      STEPS.forEach((_, i) => {
        if (i === 0) return;
        tl.to(markerRef.current, { left: `${(i / (STEPS.length - 1)) * 100}%`, ease: "none", duration: 1 }, i);
      });

      // morph the central word per step
      const words = STEPS.map((s) => s.k);
      tl.to(wordRef.current, { textContent: words[1], duration: 0.4 }, 1)
        .to(wordRef.current, { textContent: words[2], duration: 0.4 }, 2);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <Section id="journey" eyebrow="How it works" title="One platform, three motions.">
      <div ref={root} className="relative h-auto">
        <div ref={pinned} className="glass gradient-border relative flex flex-col items-center justify-center py-24 text-center md:py-36">
          <div ref={wordRef} className="font-display text-5xl font-bold text-paper md:text-7xl">
            {STEPS[0].k}
          </div>
          <p ref={descRef} className="mt-6 max-w-xl text-lg text-muted">
            {STEPS[0].d}
          </p>
          <div className="mt-14 flex w-full max-w-lg items-center gap-3 px-6">
            <div className="h-1 flex-1 rounded-full bg-white/10">
              <div ref={markerRef} className="relative -top-1 h-3 w-3 rounded-full bg-cyan shadow-[0_0_18px_#00E5FF] transition-[left] duration-300" style={{ position: "relative", left: "0%" }} />
            </div>
          </div>
          <div className="mt-4 flex w-full max-w-lg justify-between px-2 text-xs font-mono text-muted">
            {STEPS.map((s, i) => (
              <span key={i} style={{ color: s.c }}>{s.k}</span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
