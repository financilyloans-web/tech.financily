"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/anim";
import { prefersReducedMotion } from "@/lib/tokens";

type Props = { onDone?: () => void };

/**
 * Preloader — draws the "Tech. Financily" wordmark, counts 0→100,
 * then wipes away with a mask reveal into the hero. Under 3s.
 */
export default function Preloader({ onDone }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const pct = useRef<HTMLSpanElement>(null);
  const line = useRef<HTMLDivElement>(null);
  const wordmarks = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const ease = "expo.inOut";

    if (prefersReducedMotion()) {
      const t = setTimeout(() => {
        setGone(true);
        onDone?.();
      }, 200);
      return () => clearTimeout(t);
    }

    const counter = { v: 0 };
    const tl = gsap.timeline({ onComplete: () => { setGone(true); onDone?.(); } });

    // draw wordmark letters
    tl.fromTo(
      wordmarks.current!.querySelectorAll(".pl-letter"),
      { y: 26, opacity: 0, filter: "blur(6px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.7, stagger: 0.045, ease: "power4.out" },
      0.15
    );

    // accent dot pops
    tl.fromTo(
      el.querySelector(".pl-dot"),
      { scale: 0 },
      { scale: 1, duration: 0.5, ease: "back.out(1.7)" },
      0.45
    );

    // counter
    tl.to(
      counter,
      {
        v: 100,
        duration: 1.9,
        ease: "power2.inOut",
        onUpdate: () => {
          if (pct.current) pct.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
        },
      },
      0.2
    );

    // hairline progress
    tl.fromTo(line.current, { scaleX: 0 }, { scaleX: 1, duration: 1.9, ease: "power2.inOut" }, 0.2);

    // mask wipe — two panels slide apart, revealing hero
    tl.to(
      el.querySelectorAll(".pl-panel"),
      { yPercent: -101, duration: 0.9, stagger: 0.08, ease, delay: 0.1 },
      2.1
    );

    return () => {
      tl.kill();
    };
  }, []);

  if (gone) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[500]">
      {/* wipe panels */}
      <div className="pl-panel absolute inset-0 bg-navy" />
      <div className="pl-panel absolute inset-0 bg-navy" style={{ transform: "translateY(-101%)" }} />

      <div className="relative z-10 flex h-full flex-col items-center justify-center">
        <div ref={wordmarks} className="flex flex-col items-center text-center">
          <p className="pl-letter font-display text-4xl font-semibold tracking-tight text-paper sm:text-6xl">
            Tech<span className="pl-dot inline-block text-accent">.</span>{" "}
            <span className="text-paper">Financily</span>
          </p>
          <div className="mt-6 h-px w-40 origin-left overflow-hidden bg-line">
            <div ref={line} className="h-full w-full origin-left scale-x-0 bg-accent" />
          </div>
        </div>

        <div className="absolute bottom-10 flex w-full items-end justify-between px-6 font-mono text-[11px] tracking-[0.24em] text-muted sm:px-10">
          <span>FINANCIAL INFRASTRUCTURE</span>
          <span className="text-sm text-paper">
            <span ref={pct} className="text-accent">000</span> / 100
          </span>
        </div>
      </div>
    </div>
  );
}
