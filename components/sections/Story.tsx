"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/anim";
import { prefersReducedMotion } from "@/lib/tokens";

const STEPS = [
  {
    index: "A",
    title: "Rails",
    line: "A payment enters at the edge. It is normalized, sequenced and written to the shared event log within milliseconds.",
    tag: "01 · Movement",
  },
  {
    index: "B",
    title: "Risk",
    line: "The risk engine scores the event inline — fraud, limits, exposure — before any value moves. Decisions take under 12ms.",
    tag: "02 · Judgment",
  },
  {
    index: "C",
    title: "Vault",
    line: "Settlement is atomic and reconciled in the same pass. What the ledger says is what happened, full stop.",
    tag: "03 · Finality",
  },
];

/** Pinned scrubbed story — the platform's three stages, in order. */
export default function Story() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const r = root.current;
    const s = stage.current;
    if (!r || !s || prefersReducedMotion()) return;

    const titles = s.querySelectorAll<HTMLElement>(".story-title");
    const lines = s.querySelectorAll<HTMLElement>(".story-line");
    const indices = s.querySelectorAll<HTMLElement>(".story-index");
    const tags = s.querySelectorAll<HTMLElement>(".story-tag");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: r,
          start: "top top",
          end: "+=220%",
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
        },
      });

      for (let i = 1; i < STEPS.length; i++) {
        tl.to(s, { autoAlpha: 0.08, duration: 0.5 }, i * 1.1)
          .set(s, { autoAlpha: 1 }, i * 1.1 + 0.5);
      }

      indices.forEach((el) => {
        tl.fromTo(el, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" }, 0);
      });
      tags.forEach((el) => {
        tl.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.05);
      });
      titles.forEach((el) => {
        tl.fromTo(el, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power4.out" }, 0.15);
      });
      lines.forEach((el) => {
        tl.fromTo(el, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: "power3.out" }, 0.35);
      });
    }, s);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative flex items-center overflow-hidden">
      <div className="radial-mesh absolute inset-0" />
      <div className="grid-lines absolute inset-0 opacity-50" />

      <div ref={stage} className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 px-5 sm:px-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <p className="sec-index text-accent">Focus — the platform</p>
          <p className="mt-4 font-display text-5xl font-semibold text-paper md:text-7xl">
            {STEPS.map((s, i) => (
              <span key={s.index} className="story-index mr-3 inline-block">
                {s.index}
              </span>
            ))}
          </p>
        </div>

        <div className="md:col-span-9">
          {STEPS.map((s) => (
            <div key={s.index} className="mb-12 border-l border-line pl-6 md:pl-10">
              <p className="story-tag font-mono text-[11px] tracking-[0.24em] text-accent uppercase">{s.tag}</p>
              <h3 className="story-title mt-2 font-display text-4xl font-medium tracking-tight text-paper md:text-6xl">
                {s.title}
              </h3>
              <p className="story-line mt-4 max-w-xl text-base leading-relaxed text-muted">{s.line}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
