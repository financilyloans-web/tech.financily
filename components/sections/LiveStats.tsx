"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/anim";
import { prefersReducedMotion } from "@/lib/tokens";

const STATS = [
  { label: "Processed", value: 48, suffix: "B", prefix: "$" },
  { label: "Uptime", value: 99.999, suffix: "%", prefix: "", decimals: 3 },
  { label: "Countries", value: 180, suffix: "+", prefix: "" },
  { label: "Latency", value: 12, suffix: "ms", prefix: "" },
];

/** Odometer-style counting stats triggered on scroll. */
export default function LiveStats() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      STATS.forEach((s, i) => {
        const node = el.querySelector(`[data-stat="${i}"]`);
        if (node) node.textContent = `${s.prefix}${s.value.toFixed(s.decimals ?? 0)}${s.suffix}`;
      });
      return;
    }
    const ctx = gsap.context(() => {
      STATS.forEach((s, i) => {
        const node = el.querySelector(`[data-stat="${i}"]`);
        if (!node) return;
        const counter = { v: 0 };
        gsap.to(counter, {
          v: s.value,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: node, start: "top 90%" },
          onUpdate: () => {
            node.textContent = `${s.prefix}${counter.v.toFixed(s.decimals ?? 0)}${s.suffix}`;
          },
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="px-6 py-20 md:px-10">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 md:grid-cols-4">
        {STATS.map((s, i) => (
          <div key={i} className="text-center">
            <div className="font-display text-5xl font-bold text-paper md:text-6xl">
              <span data-stat={i}>0</span>
            </div>
            <p className="mt-3 font-mono text-xs tracking-[0.25em] text-muted uppercase">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
