"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import cn from "@/lib/cn";
import { gsap } from "@/lib/anim";
import { prefersReducedMotion } from "@/lib/tokens";
import Reveal from "@/components/motion/Reveal";

type Props = {
  id?: string;
  index?: string;
  eyebrow?: string;
  dateline?: string;
  title: ReactNode;
  sub?: ReactNode;
  children: ReactNode;
  className?: string;
};

/** Editorial section shell: numbered index, mono eyebrow, left-aligned headline.
 *  Extra motion: a ghost index numeral parallaxes on scroll and a hairline
 *  draws in under the section. */
export default function Section({
  id,
  index,
  eyebrow,
  dateline,
  title,
  sub,
  children,
  className,
}: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (ruleRef.current) {
        if (reduced) gsap.set(ruleRef.current, { scaleX: 1 });
        else
          gsap.fromTo(
            ruleRef.current,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: ruleRef.current,
                start: "top 96%",
                end: "top 60%",
                scrub: true,
              },
            }
          );
      }

      if (ghostRef.current && !reduced) {
        gsap.fromTo(
          ghostRef.current,
          { y: 90, opacity: 0.65 },
          {
            y: -90,
            opacity: 0.12,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id={id} className={cn("relative px-5 py-24 sm:px-10 md:py-32", className)}>
      {index && (
        <div
          ref={ghostRef}
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-8 select-none font-display text-[8rem] font-bold leading-none text-transparent md:right-8 md:text-[15rem]"
          style={{ WebkitTextStroke: "1px rgba(182,255,60,0.4)" }}
        >
          {index}
        </div>
      )}

      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex items-start justify-between gap-6 border-b border-line pb-6">
          <Reveal className="max-w-2xl">
            {(index || eyebrow) && (
              <p className="sec-index mb-4 flex flex-wrap items-center gap-3">
                {index && <span className="text-accent">{index}</span>}
                {eyebrow && <span>{eyebrow}</span>}
              </p>
            )}
            <h2 className="font-display text-4xl font-medium tracking-tight leading-[1.02] text-paper md:text-6xl">
              {title}
            </h2>
            {sub && <p className="mt-5 max-w-xl text-base text-muted leading-relaxed">{sub}</p>}
          </Reveal>
          {dateline && (
            <span className="sec-index hidden shrink-0 pt-2 text-right sm:block">{dateline}</span>
          )}
        </div>

        {children}

        {/* drawing hairline */}
        <div ref={ruleRef} className="mt-16 h-px w-full origin-left bg-accent/40" />
      </div>
    </section>
  );
}
