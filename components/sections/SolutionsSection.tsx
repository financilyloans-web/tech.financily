"use client";

import Section from "@/components/ui/Section";
import Reveal from "@/components/motion/Reveal";

const WORK = [
  {
    index: "01",
    label: "Payments",
    title: "Move money like it's a packet.",
    d: "A single API with real-time rails, deterministic idempotency and sub-50ms clearing. Our median settlement is 38ms across 24 markets.",
    meta: "38ms median settle · 24 markets",
  },
  {
    index: "02",
    label: "Risk engines",
    title: "Decide in the first 12ms.",
    d: "AI risk models run inline on every event — scoring fraud, limits and exposure before the ledger even moves. Flag→resolve in 0.4s.",
    meta: "0.4s flag→resolve · inline scoring",
  },
  {
    index: "03",
    label: "Analytics",
    title: "Know the whole book, live.",
    d: "Event-sourced analytics that stream from the same event log as the ledger. No batches, no reconciliation drift, no surprises at month-end.",
    meta: "event-sourced · zero drift",
  },
  {
    index: "04",
    label: "Infrastructure",
    title: "The boring parts, done well.",
    d: "SOC 2, regional key custody, deterministic replay and a 99.999% uptime SLA. We run the rails so you run the product.",
    meta: "SOC 2 · 99.999% uptime",
  },
];

export default function SolutionsSection() {
  return (
    <Section
      id="solutions"
      index="02"
      eyebrow="What we build"
      dateline="SIGNAL / 2026"
      title="Four systems,<br />one core."
      sub="Not a suite of point products — one coherent platform where every layer reads the same source of truth."
    >
      <div className="flex flex-col">
        {WORK.map((w, i) => (
          <Reveal key={w.index} delay={(i % 2) * 0.06}>
            <div className="group grid gap-4 border-b border-line py-10 transition-colors hover:bg-white/[0.015] md:grid-cols-12 md:gap-8">
              <div className="md:col-span-1">
                <span className="sec-index text-accent">{w.index}</span>
              </div>
              <div className="md:col-span-3">
                <span className="font-mono text-sm tracking-[0.18em] text-muted uppercase">{w.label}</span>
              </div>
              <div className="md:col-span-5">
                <h3 className="font-display text-3xl font-medium tracking-tight text-paper transition-colors group-hover:text-accent md:text-4xl">
                  {w.title}
                </h3>
              </div>
              <div className="md:col-span-3">
                <p className="text-sm leading-relaxed text-muted">{w.d}</p>
                <p className="mt-4 font-mono text-[11px] tracking-[0.16em] text-accent/70">{w.meta}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
