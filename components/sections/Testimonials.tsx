"use client";

import { useRef, useEffect } from "react";
import Section from "@/components/ui/Section";
import GlassCard from "@/components/ui/GlassCard";
import { prefersReducedMotion } from "@/lib/tokens";
import cn from "@/lib/cn";

const QUOTES = [
  { q: "Financily's platform moved our settlement from days to seconds. It changed everything.", who: "Maya Chen", role: "CTO, Ledgerly" },
  { q: "The trading APIs are absurdly fast. Sub-ms, reliable, beautifully documented.", who: "Ravi Patel", role: "Head of Quant, Strata" },
  { q: "Sentinel flagged a fraud ring before we even knew it existed. Astonishing.", who: "Lena Ortiz", role: "VP Risk, Paywave" },
  { q: "Open-banking integration took us a weekend. The docs are a joy.", who: "James Wu", role: "Engineer, Meridian" },
  { q: "We moved $48B through Neo Payments this year. Zero incidents.", who: "Aisha Khan", role: "CFO, Vanta" },
];

/** Draggable, inertia-based carousel with blur-focus on the active card. */
export default function Testimonials() {
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, scrollLeft: 0 });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    if ("ontouchstart" in window || prefersReducedMotion()) return;

    const onDown = (e: PointerEvent) => {
      drag.current = { down: true, startX: e.pageX - el.offsetLeft, scrollLeft: el.scrollLeft };
    };
    const onUp = () => (drag.current.down = false);
    const onMove = (e: PointerEvent) => {
      if (!drag.current.down) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - drag.current.startX) * 1.2;
      el.scrollLeft = drag.current.scrollLeft - walk;
    };

    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointermove", onMove, { passive: false });
    return () => {
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <Section id="testimonials" eyebrow="Testimonials" title="Loved by builders.">
      <div
        ref={track}
        className="flex gap-6 overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing snap-x snap-mandatory"
      >
        {QUOTES.map((q, i) => (
          <div key={i} className={cn("snap-center shrink-0 w-[320px] md:w-[400px] transition-[filter] duration-500", i === 1 ? "" : "blur-[2px]")}>
            <GlassCard className="h-full">
              <div className="text-5xl text-violet leading-none">"</div>
              <p className="mt-4 text-paper leading-relaxed">{q.q}</p>
              <div className="mt-6">
                <p className="font-semibold text-paper">{q.who}</p>
                <p className="text-sm text-muted">{q.role}</p>
              </div>
            </GlassCard>
          </div>
        ))}
      </div>
    </Section>
  );
}
