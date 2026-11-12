import Section from "@/components/ui/Section";
import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/motion/Reveal";
import Terminal from "@/components/sections/Terminal";

export default function TechnologyPage() {
  return (
    <main className="pt-32">
      <Section eyebrow="Technology" title="The stack beneath every transaction." sub="Sub-ms event loops, live risk engines and developer-first APIs.">
        <div className="grid gap-6 md:grid-cols-4">
          {[
            { t: "12ms", d: "End-to-end latency" },
            { t: "99.999%", d: "Uptime SLA" },
            { t: "800k", d: "Tx/sec peak" },
            { t: "SOC 2", d: "Compliance" },
          ].map((c, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <GlassCard className="text-center">
                <p className="font-display text-4xl font-bold text-gradient">{c.t}</p>
                <p className="mt-2 text-sm text-muted">{c.d}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>
      <Terminal />
    </main>
  );
}
