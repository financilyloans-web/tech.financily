"use client";

import Reveal from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import Button from "@/components/ui/Button";

export default function CTA() {
  return (
    <section className="relative overflow-hidden px-5 py-28 sm:px-10 md:py-40">
      <div className="radial-mesh absolute inset-0" />
      <div className="relative z-10 mx-auto max-w-4xl">
        <Reveal>
          <p className="sec-index mb-6">Final — start here</p>
          <h2 className="font-display text-5xl font-medium tracking-tight leading-[1.02] text-paper md:text-8xl">
            Build on the<br />
            <span className="text-accent">core.</span>
          </h2>
          <p className="mt-8 max-w-lg text-lg text-muted">
            We'll move a payment through the stack with you in a single working session.
            No decks, no sales process — just the API and a shared terminal.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Magnetic>
              <Button size="lg">Request a sandbox</Button>
            </Magnetic>
            <span className="font-mono text-xs tracking-[0.2em] text-muted">
              ENGINEERING@FINANCILY.DEV
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
