import Section from "@/components/ui/Section";
import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/motion/Reveal";

const POSTS = [
  { t: "Why latency is the new trust", d: "Sub-ms rails and what they unlock." },
  { t: "Designing money, in motion", d: "Our motion system for finance." },
  { t: "How Sentinel stops fraud", d: "Inside our real-time detection models." },
  { t: "Open banking, done right", d: "Secure developer-first APIs." },
];

export default function BlogPage() {
  return (
    <main className="pt-32">
      <Section eyebrow="Blog" title="Notes from the frontier." sub="Engineering, design, and the future of money.">
        <div className="grid gap-6 md:grid-cols-2">
          {POSTS.map((p, i) => (
            <Reveal key={i} delay={(i % 2) * 0.08}>
              <GlassCard className="group h-full">
                <p className="font-mono text-xs text-violet">0{i + 1}</p>
                <h3 className="mt-3 font-display text-2xl font-bold text-paper transition-colors group-hover:text-cyan">{p.t}</h3>
                <p className="mt-3 text-muted">{p.d}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>
    </main>
  );
}
