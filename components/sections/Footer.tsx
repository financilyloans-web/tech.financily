"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { gsap, ScrollTrigger } from "@/lib/anim";
import { prefersReducedMotion } from "@/lib/tokens";
import Magnetic from "@/components/motion/Magnetic";
import Button from "@/components/ui/Button";

/** Giant wordmark fills with the accent as you scroll. */
export default function Footer() {
  const fillRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const fill = fillRef.current;
    if (!fill) return;
    if (prefersReducedMotion()) {
      gsap.set(fill, { scaleX: 1 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        fill,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: fill,
            start: "top 95%",
            end: "bottom 30%",
            scrub: 0.4,
          },
        }
      );
    }, fill);
    return () => ctx.revert();
  }, []);

  const subscribe = (e: FormEvent) => {
    e.preventDefault();
    if (email.includes("@")) setSubscribed(true);
  };

  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="px-5 pt-20 sm:px-10 md:pt-28">
        {/* giant wordmark */}
        <div className="relative select-none text-center font-display text-[17vw] font-bold leading-[0.82] tracking-tight">
          <span className="word-outline block uppercase">
            Tech<span className="text-accent">.</span> Financily
          </span>
          <div ref={fillRef} className="absolute inset-0 origin-left overflow-hidden">
            <span className="block uppercase text-accent">
              Tech<span className="text-ink" style={{ textShadow: "0 0 1px currentColor" }}>.</span> Financily
            </span>
          </div>
        </div>

        {/* newsletter */}
        <div className="mx-auto mt-16 max-w-3xl border-b border-line pb-12">
          <p className="font-mono text-[11px] tracking-[0.26em] text-muted uppercase">Dispatch</p>
          <p className="mt-3 font-display text-2xl font-medium text-paper">
            One useful email a month. No noise.
          </p>
          {subscribed ? (
            <p className="mt-6 font-mono text-sm text-accent">✓ Subscribed — see you next month.</p>
          ) : (
            <form onSubmit={subscribe} className="mt-6 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                aria-label="Email address"
                className="flex-1 rounded-full border border-line bg-white/[0.02] px-5 py-3 text-paper outline-none transition-colors placeholder:text-muted/60 focus:border-accent/60"
              />
              <Magnetic>
                <Button type="submit" size="md">Subscribe</Button>
              </Magnetic>
            </form>
          )}
        </div>

        {/* link columns */}
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 py-14 md:grid-cols-4">
          <div>
            <p className="sec-index mb-5">Company</p>
            <ul className="space-y-3 text-sm text-muted">
              <li><a href="/about" className="transition-colors hover:text-paper">About</a></li>
              <li><a href="/careers" className="transition-colors hover:text-paper">Careers</a></li>
              <li><a href="/blog" className="transition-colors hover:text-paper">Insights</a></li>
              <li><a href="/contact" className="transition-colors hover:text-paper">Contact</a></li>
            </ul>
          </div>
          <div>
            <p className="sec-index mb-5">Platform</p>
            <ul className="space-y-3 text-sm text-muted">
              <li><a href="/technology" className="transition-colors hover:text-paper">Technology</a></li>
              <li><a href="/solutions" className="transition-colors hover:text-paper">Solutions</a></li>
              <li><a href="/pricing" className="transition-colors hover:text-paper">Pricing</a></li>
            </ul>
          </div>
          <div>
            <p className="sec-index mb-5">Legal</p>
            <ul className="space-y-3 text-sm text-muted">
              <li><a href="#" className="transition-colors hover:text-paper">Privacy</a></li>
              <li><a href="#" className="transition-colors hover:text-paper">Terms</a></li>
              <li><a href="#" className="transition-colors hover:text-paper">Security</a></li>
            </ul>
          </div>
          <div>
            <p className="sec-index mb-5">Address</p>
            <p className="text-sm leading-relaxed text-muted">
              1100 Avenue of the Americas<br />
              New York, NY 10036<br />
              <span className="text-accent/70">+1 212 555 0148</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-line py-6 text-[11px] font-mono tracking-[0.18em] text-muted sm:flex-row">
          <span>© 2026 Tech. Financily — All rights reserved</span>
          <span className="hidden sm:inline">40.7128° N — 74.0060° W</span>
          <span>build 0.1.26</span>
        </div>
      </div>
    </footer>
  );
}
