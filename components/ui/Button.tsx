"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import cn from "@/lib/cn";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "outline";
  size?: "md" | "lg";
  children: ReactNode;
};

export default function Button({
  variant = "primary",
  size = "lg",
  className = "",
  children,
  ...rest
}: Props) {
  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-all duration-300 select-none cursor-pointer overflow-hidden group";
  const sizes = {
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-[15px]",
  };
  const variants = {
    primary:
      "bg-accent text-ink shadow-[0_0_24px_rgba(182,255,60,0.22)] hover:shadow-[0_0_40px_rgba(182,255,60,0.4)]",
    ghost: "border border-line text-paper hover:border-accent/50 hover:bg-white/[0.03]",
    outline: "border border-accent/40 text-accent hover:bg-accent/10",
  };

  return (
    <button className={cn(base, sizes[size], variants[variant], className)} {...rest}>
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}
