"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "@/lib/anim";
import cn from "@/lib/cn";
import { prefersReducedMotion } from "@/lib/tokens";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

/** Scroll-triggered fade/slide reveal. Fires once, respects reduced motion. */
export default function Reveal({ children, className, delay = 0, y = 34 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.style.opacity = "1";
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [mounted, delay, y]);

  return (
    <div ref={ref} className={cn(className)} style={{ opacity: prefersReducedMotion() ? 1 : 0 }}>
      {children}
    </div>
  );
}
