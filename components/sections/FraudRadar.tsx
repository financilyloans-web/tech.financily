"use client";

import Section from "@/components/ui/Section";
import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/motion/Reveal";

const TXNS = [
  { id: "0x9f", amount: "$12,400", status: "flag", t: "0.0s" },
  { id: "0x2a", amount: "$840", status: "ok", t: "0.4s" },
  { id: "0x71", amount: "$5,100", status: "flag", t: "0.9s" },
  { id: "0xc3", amount: "$220", status: "ok", t: "1.3s" },
];

/** Fraud-detection demo: radar sweep + transactions that resolve red→green. */
export default function FraudRadar() {
  return (
    <Section id="security" eyebrow="Security" title="Fraud stops here." sub="Watch suspicious transactions get flagged and resolved in real time.">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Radar */}
        <Reveal>
          <GlassCard className="flex items-center justify-center py-12">
            <div className="relative h-64 w-64 rounded-full border border-cyan/30">
              <div className="absolute inset-4 rounded-full border border-cyan/20" />
              <div className="absolute inset-10 rounded-full border border-cyan/10" />
              {/* sweep */}
              <div className="animate-scan absolute left-1/2 top-1/2 h-1/2 w-px origin-top bg-gradient-to-t from-cyan/60 to-transparent" style={{ transform: "translateX(-50%) rotate(0deg)" }} />
              {/* blips */}
              <div className="animate-pulse-ring absolute left-[30%] top-[35%] h-2 w-2 rounded-full bg-red-500" />
              <div className="absolute left-[65%] top-[55%] h-2 w-2 rounded-full bg-aurora shadow-[0_0_12px_#2BFFB0]" />
            </div>
          </GlassCard>
        </Reveal>

        {/* Transaction log */}
        <Reveal delay={0.1}>
          <GlassCard>
            <div className="mb-6 flex items-center justify-between">
              <p className="font-mono text-xs tracking-[0.2em] text-muted uppercase">Live stream — Sentinel</p>
              <span className="flex items-center gap-2 text-aurora">
                <span className="h-2 w-2 rounded-full bg-aurora" /> LIVE
              </span>
            </div>
            <ul className="space-y-3">
              {TXNS.map((t, i) => (
                <li
                  key={i}
                  className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm font-mono transition-colors duration-500 ${
                    t.status === "flag"
                      ? "border-red-500/40 bg-red-500/10 text-red-300"
                      : "border-aurora/30 bg-aurora/5 text-aurora"
                  }`}
                >
                  <span>{t.id}</span>
                  <span className="text-paper">{t.amount}</span>
                  <span className="text-muted">{t.t}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] uppercase ${t.status === "flag" ? "bg-red-500/20 text-red-300" : "bg-aurora/20 text-aurora"}`}>
                    {t.status === "flag" ? "flagged" : "resolved"}
                  </span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </Reveal>
      </div>
    </Section>
  );
}
