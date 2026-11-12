import Section from "@/components/ui/Section";
import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/motion/Reveal";

export default function AboutPage() {
  return (
    <main className="pt-32">
      <Section eyebrow="About" title="We engineer speed you can feel." sub="Financily Technologies is a fintech infrastructure company building the AI-powered rails behind modern money.">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { t: "Mission", d: "Make financial infrastructure invisible, instant and trustworthy — everywhere on Earth." },
            { t: "Approach", d: "Deep engineering + design craft. We obsess over milliseconds and micro-interactions." },
            { t: "Trust", d: "Backed by security-first architecture and audited code. $48B processed, zero incidents." },
          ].map((c, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <GlassCard className="h-full">
                <h3 className="font-display text-xl font-bold text-paper">{c.t}</h3>
                <p className="mt-3 text-muted leading-relaxed">{c.d}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>
    </main>
  );
}
