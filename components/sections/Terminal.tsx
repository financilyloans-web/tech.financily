"use client";

import { useEffect, useRef } from "react";
import Section from "@/components/ui/Section";
import Reveal from "@/components/motion/Reveal";
import { gsap, ScrollTrigger } from "@/lib/anim";
import { prefersReducedMotion } from "@/lib/tokens";

const REQ = `POST /v1/transactions
Authorization: Bearer sk_live_••••••••••••••••
Content-Type: application/json

{ "amount": 12500, "currency": "USD",
  "method": "card", "3ds": true }`;

const RESP = `{
  "status": "settled",
  "latency_ms": 12,
  "fraud_score": 0.02,
  "hash": "0x9f…4c2a"
}`;

/** Developer API terminal: types request, streams JSON response with blinking caret. */
export default function Terminal() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const reqEl = el.querySelector(".term-req");
      const resEl = el.querySelector(".term-res");
      if (!reqEl || !resEl) return;

      // type request
      gsap.fromTo(
        reqEl,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.01,
          scrollTrigger: { trigger: el, start: "top 70%" },
          onStart: () => {
            typeInto(reqEl as HTMLElement, REQ, 12);
          },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  function typeInto(el: HTMLElement, full: string, speed: number) {
    el.textContent = "";
    let i = 0;
    const timer = setInterval(() => {
      el.textContent = full.slice(0, ++i);
      if (i >= full.length) {
        clearInterval(timer);
        const res = el.parentElement!.querySelector(".term-res") as HTMLElement;
        if (res) {
          res.textContent = "";
          let j = 0;
          const rTimer = setInterval(() => {
            res.textContent = RESP.slice(0, ++j);
            if (j >= RESP.length) clearInterval(rTimer);
          }, 8);
        }
      }
    }, speed);
  }

  return (
    <Section id="technology" eyebrow="For developers" title="One API. Infinite motion.">
      <div ref={root} className="mx-auto max-w-3xl">
        <Reveal>
          <div className="glass overflow-hidden rounded-2xl">
            <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-500/70" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
              <span className="h-3 w-3 rounded-full bg-aurora/70" />
              <span className="ml-3 font-mono text-xs text-muted">financily.dev — terminal</span>
            </div>
            <div className="p-5 font-mono text-sm leading-relaxed">
              <p className="text-cyan term-req" style={{ minHeight: "7.5em" }} />
              <div className="my-3 h-px bg-white/5" />
              <p className="text-aurora term-res" style={{ minHeight: "5em" }} />
              <span className="animate-caret inline-block h-4 w-2 bg-cyan" />
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
