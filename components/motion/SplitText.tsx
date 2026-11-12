"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/anim";
import { prefersReducedMotion } from "@/lib/tokens";

type Props = { text: string; className?: string; as?: "h1" | "h2" };

/** Per-letter 3D rise-and-blur-in headline reveal. */
export default function SplitText({ text, className, as = "h1" }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const letters = Array.from(text);
    el.textContent = "";
    const spans = letters.map((ch) => {
      const s = document.createElement("span");
      s.textContent = ch === " " ? "\u00A0" : ch;
      s.className = "inline-block will-change-transform";
      el.appendChild(s);
      return s;
    });

    const ctx = gsap.context(() => {
      gsap.fromTo(
        spans,
        { y: 40, opacity: 0, rotateX: -70, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.045,
          scrollTrigger: { trigger: el, start: "top 85%" },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [text]);

  const Tag = as;
  return (
    <Tag ref={ref} className={className} style={{ perspective: 600 }}>
      {text}
    </Tag>
  );
}
