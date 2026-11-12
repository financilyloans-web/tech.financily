import Section from "@/components/ui/Section";
import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/motion/Reveal";

const SOLUTIONS = [
  { t: "AI-powered payments", d: "Adaptive, programmable money movement." },
  { t: "Digital banking", d: "Core systems for challenger banks." },
  { t: "Algorithmic trading", d: "Quant execution at sub-ms latency." },
  { t: "Fraud detection", d: "Real-time Sentinel models." },
  { t: "Blockchain settlement", d: "Atomic cross-chain finality." },
  { t: "Open-banking APIs", d: "Secure developer-first surfaces." },
];

export default function SolutionsPage() {
  return (
    <main className="pt-32">
      <Section eyebrow="Solutions" title="Built for every ambition." sub="From neobanks to hedge funds, our platform scales with you.">
        <div className="grid gap-6 md:grid-cols-3">
          {SOLUTIONS.map((s, i) => (
            <Reveal key={i} delay={(i % 3) * 0.08}>
              <GlassCard className="h-full">
                <h3 className="font-display text-xl font-bold text-paper">{s.t}</h3>
                <p className="mt-3 text-muted">{s.d}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>
    </main>
  );
}
