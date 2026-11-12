"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/anim";
import { prefersReducedMotion } from "@/lib/tokens";

const PRODUCTS = [
  { t: "Neo Payments", d: "Instant, programmable money movement." },
  { t: "Algo Trading", d: "Quant execution with sub-ms latency." },
  { t: "Sentinel Fraud", d: "AI that stops fraud in real time." },
  { t: "Settl — Blockchain", d: "Atomic settlement across chains." },
  { t: "OpenBank APIs", d: "Secure, compliant open-banking." },
  { t: "Wealth Analytics", d: "Portfolio intelligence that earns." },
];

/** Horizontal scroll showcase — GSAP horizontal scrubbing. */
export default function HorizontalShowcase() {
  const track = useRef<HTMLDivElement>(null);
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!track.current || !section.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const getX = () => -(track.current!.scrollWidth - window.innerWidth);
      gsap.to(track.current, {
        x: getX,
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          pin: true,
          scrub: 1,
          end: () => `+=${track.current!.scrollWidth - window.innerWidth}`,
          anticipatePin: 1,
        },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} className="relative overflow-hidden border-y border-white/5 py-24">
      <div className="px-6 md:px-10">
        <p className="sec-index">03 — Where it runs</p>
        <h2 className="mt-3 font-display text-4xl font-medium tracking-tight text-paper md:text-6xl">
          Production deployments.
        </h2>
      </div>
      <div ref={track} className="mt-16 flex w-max gap-8 px-6 md:px-10">
        {PRODUCTS.map((p, i) => (
          <div key={i} className="gradient-border w-[300px] shrink-0 rounded-3xl p-8 md:w-[380px]">
            <p className="font-mono text-xs text-violet">0{i + 1}</p>
            <h3 className="mt-6 font-display text-2xl font-bold text-paper">{p.t}</h3>
            <p className="mt-3 text-muted">{p.d}</p>
            <div className="mt-8 h-1.5 rounded-full bg-white/10">
              <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-cyan to-violet" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
