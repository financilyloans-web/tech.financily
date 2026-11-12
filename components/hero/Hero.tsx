"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/anim";
import { prefersReducedMotion } from "@/lib/tokens";
import ParticleGlobe, { type ParticleGlobeHandle } from "./ParticleGlobe";
import Magnetic from "@/components/motion/Magnetic";
import Button from "@/components/ui/Button";

const METRICS = [
  { k: "Processed / mo", v: "$4.2B" },
  { k: "Uptime SLA", v: "99.999%" },
  { k: "Median settle", v: "38ms" },
  { k: "Markets served", v: "24" },
];

/** Masked, line-by-line headline reveal (per-letter rise + blur). */
function MaskedLines({ lines, className = "" }: { lines: string[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.style.opacity = "1";
      return;
    }
    const spans = el.querySelectorAll(".ml-inner");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        spans,
        { yPercent: 118, opacity: 0, filter: "blur(6px)" },
        {
          yPercent: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.15,
          stagger: 0.12,
          ease: "power4.out",
          delay: 2.5,
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {lines.map((line, i) => (
        <div key={i} className="overflow-hidden">
          <span className="ml-inner block will-change-transform">
            {line.split(" ").map((w, wi) => (
              <span key={wi} className="inline-block">
                {w}
                {wi < line.split(" ").length - 1 ? "\u00A0" : ""}
              </span>
            ))}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function Hero() {
  const globeRef = useRef<ParticleGlobeHandle>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Scrubbed morph: globe -> grid -> ledger as the hero scrolls away.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 0.6,
        onUpdate: (self) => globeRef.current?.setMorph(self.progress * 2),
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative flex min-h-screen flex-col overflow-hidden">
      {/* backdrop */}
      <div className="radial-mesh absolute inset-0" />
      <div className="grid-lines absolute inset-0 opacity-70" />
      <ParticleGlobe ref={globeRef} />

      {/* top-left annotation */}
      <p className="sec-index absolute left-5 top-24 z-10 sm:left-8">
        01 — Payments / Intelligence
      </p>

      {/* content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pt-28 sm:px-10">
        <p className="mb-6 font-mono text-[12px] tracking-[0.3em] text-accent uppercase">
          Financily Technologies
        </p>

        <MaskedLines
          className="max-w-5xl"
          lines={["Financial infrastructure", "for a networked world."]}
        />

        <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md text-base leading-relaxed text-muted">
            Payments, AI risk engines, real-time analytics and APIs — engineered as one
            system. Quietly fast, obsessively reliable.
          </p>
          <div className="flex flex-wrap gap-4">
            <Magnetic>
              <Button>Talk to engineering</Button>
            </Magnetic>
            <Magnetic>
              <Button variant="ghost">Read the platform docs</Button>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* metrics strip */}
      <div className="relative z-10 border-t border-line">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-6 px-5 py-7 sm:px-10 md:grid-cols-4">
          {METRICS.map((m) => (
            <div key={m.k} className="flex flex-col gap-1">
              <span className="font-mono text-[11px] tracking-[0.22em] text-muted uppercase">{m.k}</span>
              <span className="font-display text-2xl font-semibold text-paper">{m.v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* scroll cue */}
      <p className="sec-index absolute bottom-24 right-6 hidden rotate-90 origin-bottom-right sm:block">
        Scroll — morph the data
      </p>
    </section>
  );
}
