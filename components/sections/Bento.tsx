"use client";

import GlassCard from "@/components/ui/GlassCard";
import Section from "@/components/ui/Section";
import Reveal from "@/components/motion/Reveal";

const FEATURES = [
  { t: "AI-powered payments", d: "Adaptive rails that clear instantly.", icon: "◈" },
  { t: "Digital banking infra", d: "Core systems engineered for scale.", icon: "▦" },
  { t: "Algorithmic trading", d: "Quant execution at machine speed.", icon: "◉" },
  { t: "Fraud detection", d: "Sentinel models that flag in real time.", icon: "◎" },
  { t: "Blockchain settlement", d: "Atomic, cross-chain finality.", icon: "⬡" },
  { t: "Open-banking APIs", d: "Secure, compliant developer surfaces.", icon: "⇄" },
  { t: "Wealth analytics", d: "Portfolio intelligence that earns.", icon: "◬" },
  { t: "Risk engines", d: "Live exposure models you can trust.", icon: "⊞" },
];

/** Bento grid of feature cards with cursor-follow glow. */
export default function Bento() {
  return (
    <Section
      id="services"
      eyebrow="Services"
      title="Intelligence, everywhere."
      sub="A full-stack fintech toolkit — every surface animated, every interaction considered."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f, i) => (
          <Reveal key={i} delay={(i % 4) * 0.08} className={i % 5 === 0 ? "lg:col-span-2" : ""}>
            <GlassCard className="h-full">
              <div className="text-4xl text-cyan">{f.icon}</div>
              <h3 className="mt-6 font-display text-xl font-bold text-paper">{f.t}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{f.d}</p>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
