"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import cn from "@/lib/cn";
import { prefersReducedMotion } from "@/lib/tokens";

const LINKS = [
  { href: "/solutions", label: "Solutions", index: "01" },
  { href: "/technology", label: "Technology", index: "02" },
  { href: "/about", label: "About", index: "03" },
  { href: "/blog", label: "Insights", index: "04" },
  { href: "/careers", label: "Careers", index: "05" },
];

const GLYPHS = "!<>-_\\/[]{}—=+*^?#________";

/** Decrypt-hover: characters scramble into place on hover. */
function Decrypt({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let raf = 0;
    let i = 0;

    const step = () => {
      el.textContent = text
        .split("")
        .map((ch, j) => (ch === " " ? " " : j < i ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
        .join("");
      if (i <= text.length) {
        i += 1;
        raf = requestAnimationFrame(step);
      } else {
        cancelAnimationFrame(raf);
      }
    };
    const onEnter = () => {
      cancelAnimationFrame(raf);
      i = 0;
      raf = requestAnimationFrame(step);
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      el.textContent = text;
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [text]);

  return <span ref={ref}>{text}</span>;
}

/** "Tech. Financily" wordmark — the dot is the accent detail. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={cn("font-display tracking-tight", className)}>
      Tech<span className="text-accent">.</span> Financily
    </span>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);

  // Hide on scroll down, return on scroll up.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 96 && y > lastY);
      setLastY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  // Lock body scroll while the menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[300] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          hidden ? "-translate-y-full" : "translate-y-0"
        )}
      >
        <div className="flex items-center justify-between border-b border-line bg-ink/70 px-5 py-4 backdrop-blur-md sm:px-8">
          <Link href="/" aria-label="Tech. Financily — home" className="text-[17px] font-semibold text-paper">
            <Wordmark />
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "group flex items-baseline gap-1.5 font-mono text-[12px] tracking-[0.14em] text-muted transition-colors hover:text-paper",
                  pathname === l.href && "text-accent"
                )}
              >
                <span className="text-accent/60">{l.index}</span>
                <Decrypt text={l.label} />
                <span className="block h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <Link
              href="/contact"
              className="rounded-full border border-accent/40 px-4 py-1.5 text-[13px] font-medium text-accent transition-colors hover:bg-accent hover:text-ink"
            >
              Contact
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="relative z-[320] flex h-10 w-10 items-center justify-center rounded-full border border-line text-paper"
          >
            <span className="flex flex-col items-center gap-1">
              <span className={cn("block h-px w-4 bg-current transition-transform duration-300", open && "translate-y-[2.5px] rotate-45")} />
              <span className={cn("block h-px w-4 bg-current transition-transform duration-300", open && "-translate-y-[2.5px] -rotate-45")} />
            </span>
          </button>
        </div>
      </header>

      {/* Full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[310] flex flex-col justify-between bg-navy px-6 pb-10 pt-28 sm:px-10"
          >
            <div className="grid-lines pointer-events-none absolute inset-0 opacity-60" />
            <nav aria-label="Full screen" className="relative flex flex-col gap-1">
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ y: 28, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.12 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={l.href}
                    className="group flex items-baseline gap-4 border-b border-line py-4"
                  >
                    <span className="font-mono text-xs text-accent">{l.index}</span>
                    <span className="font-display text-4xl font-medium tracking-tight text-paper transition-colors group-hover:text-accent sm:text-6xl">
                      {l.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ y: 28, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="pt-8"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 rounded-full border border-accent/40 px-6 py-3 font-mono text-sm text-accent transition-colors hover:bg-accent hover:text-ink"
                >
                  Start a conversation →
                </Link>
              </motion.div>
            </nav>
            <motion.div
              className="relative flex items-end justify-between font-mono text-[11px] tracking-[0.2em] text-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.6 }}
            >
              <span>© 2026 Tech. Financily</span>
              <span className="hidden sm:inline">32.7767° N — 96.7970° W</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
