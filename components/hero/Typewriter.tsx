"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/tokens";

const WORDS = ["Payments.", "Trading.", "Security.", "Intelligence."];

/** Cycles through words with a type/delete effect and caret. */
export default function Typewriter() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setText(WORDS[0]);
      return;
    }
    const word = WORDS[index % WORDS.length];
    const speed = deleting ? 40 : 90;
    const t = setTimeout(() => {
      if (!deleting) {
        const next = word.slice(0, text.length + 1);
        setText(next);
        if (next === word) setTimeout(() => setDeleting(true), 1400);
      } else {
        const next = word.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDeleting(false);
          setIndex((i) => i + 1);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, index]);

  return (
    <span className="text-gradient font-semibold">
      {text}
      <span className="animate-caret ml-0.5 inline-block h-[0.9em] w-[2px] translate-y-[0.12em] bg-cyan" aria-hidden="true" />
    </span>
  );
}
