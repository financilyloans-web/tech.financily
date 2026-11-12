import Section from "@/components/ui/Section";
import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/motion/Reveal";

const ROLES = [
  { t: "Senior Frontend Engineer", d: "Craft motion-rich fintech UIs. GSAP, React, love of detail." },
  { t: "Backend / Core Systems", d: "Own payment rails at sub-ms scale. Go, Rust, Kafka." },
  { t: "ML / Fraud Scientist", d: "Build the models that stop fraud in real time." },
  { t: "Developer Relations", d: "Make our APIs a joy for the world's teams." },
];

export default function CareersPage() {
  return (
    <main className="pt-32">
      <Section eyebrow="Careers" title="Do the best work of your career." sub="We're hiring builders who care about milliseconds and people.">
        <div className="grid gap-6 md:grid-cols-2">
          {ROLES.map((r, i) => (
            <Reveal key={i} delay={(i % 2) * 0.08}>
              <GlassCard className="group h-full">
                <h3 className="font-display text-xl font-bold text-paper transition-colors group-hover:text-cyan">{r.t}</h3>
                <p className="mt-3 text-muted">{r.d}</p>
                <span className="mt-6 inline-block rounded-full border border-cyan/40 px-4 py-1.5 text-sm text-cyan transition-colors group-hover:bg-cyan/10">
                  Apply →
                </span>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>
    </main>
  );
}
