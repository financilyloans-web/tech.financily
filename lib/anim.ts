"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/** Calculate a "squish" ease for springy micro-interactions. */
export const springOut = "elastic.out(1, 0.55)";

/** Shared reveal config used across scroll reveals. */
export const revealEase = "power3.out";
export const revealDuration = 0.9;
