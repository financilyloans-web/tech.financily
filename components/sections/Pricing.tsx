"use client";

import { useState } from "react";
import Section from "@/components/ui/Section";
import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import Button from "@/components/ui/Button";
import cn from "@/lib/cn";

const PLANS = [
  { name: "Starter", monthly: 490, annual: 390, tag: "For teams getting moving" },
  { name: "Studio", monthly: 990, annual: 790, tag: "Most popular", featured: true },
  { name: "Enterprise", monthly: null, annual: null, tag: "Custom terms", custom: true },
];

/** Pricing with monthly/annual toggle, morphing number animation, glowing recommended plan. */
export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <Section id="pricing" eyebrow="Pricing" title="Simple, honest pricing.">
      <Reveal className="mb-12">
        <div className="mx-auto inline-flex items-center rounded-full border border-white/10 bg-white/5 p-1">
          <button
            onClick={() => setAnnual(false)}
            className={cn("rounded-full px-5 py-2 text-sm font-semibold transition-colors", !annual ? "bg-violet text-white" : "text-muted hover:text-paper")}
          >
            Monthly
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={cn("rounded-full px-5 py-2 text-sm font-semibold transition-colors", annual ? "bg-violet text-white" : "text-muted hover:text-paper")}
          >
            Annual <span className="ml-1 text-aurora">−20%</span>
          </button>
        </div>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-3">
        {PLANS.map((p, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div className={cn("relative h-full", p.featured && "md:-translate-y-3")}>
              {p.featured && (
                <div className="absolute -inset-px rounded-[22px] bg-gradient-to-r from-cyan via-violet to-magenta opacity-60 blur-[6px]" />
              )}
              <GlassCard className={cn("relative h-full", p.featured && "ring-1 ring-violet")}>
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl font-bold text-paper">{p.name}</h3>
                  {p.featured && <span className="rounded-full bg-violet/20 px-3 py-1 text-xs font-semibold text-violet">Recommended</span>}
                </div>
                <div className="mt-6 flex items-baseline gap-1">
                  {p.custom ? (
                    <span className="font-display text-4xl font-bold text-paper">Custom</span>
                  ) : (
                    <>
                      <span className="text-2xl text-muted">$</span>
                      <span key={annual ? "a" : "m"} className="animate-[float_0.4s_ease-out] font-display text-6xl font-bold text-paper">
                        {annual ? p.annual : p.monthly}
                      </span>
                      <span className="text-muted">/mo</span>
                    </>
                  )}
                </div>
                <p className="mt-2 text-sm text-muted">{p.tag}</p>
                <div className="mt-8">
                  <Magnetic>
                    <Button variant={p.featured ? "primary" : "ghost"} className="w-full">{p.custom ? "Contact sales" : "Choose plan"}</Button>
                  </Magnetic>
                </div>
              </GlassCard>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
