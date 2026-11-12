# Tech. Financily

**Financily Technologies** — the financial core for a networked world.
A hand-crafted, award-level fintech site: dark deep-space design, one signature
accent, editorial composition, and a Three.js data-globe as the hero.

## Stack
Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 (custom token layer) ·
**Three.js** + custom GLSL shaders · GSAP + ScrollTrigger · Lenis smooth scroll ·
Framer Motion (UI state).

> **Babel note:** this sandbox's Application Control policy blocks Next's native
> SWC binary, so compilation runs through Babel (`babel.config.js` + `next/babel`,
> `@babel/*@7`, self-hosted `@fontsource` fonts — `next/font` is incompatible with
> Babel). You'll see benign "Attempted to load @next/swc-…" warnings; the build
> succeeds. In a normal environment you can drop `babel.config.js` for SWC.

## Quickstart
```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve production build
```

## Design system
- **Colors:** `ink #05070D` / `navy #0A0F1C` / **accent `#B6FF3C`**
  (single signature lime-cyan) / muted warm `#C9B896` / paper `#E9EFEA`.
- **Type:** Space Grotesk (display), JetBrains Mono (data labels), tuned
  system stack for body. Tight tracking, mixed weights.
- **Layout:** asymmetric editorial grid, numbered sections (01/02/03),
  hairline `border-line`, mono captions, coordinates/version tags, film grain.
- **Motion tokens:** power4.out / expo.out cubic-beziers; everything has weight.

## Animation checklist & where it lives
| # | Feature | Location |
| --- | --- | --- |
| 1 | Preloader: "Tech. Financily" stroke draw, 0→100 counter, mask wipe | `components/motion/Preloader.tsx` |
| 2 | Hero 3D data-globe (5000 particles + arcs, custom GLSL) | `components/hero/ParticleGlobe.tsx` |
| 3 | Globe morphs globe→grid→ledger, scrubbed by scroll | `components/hero/Hero.tsx` |
| 4 | Mouse parallax + camera drift on the globe | `components/hero/ParticleGlobe.tsx` |
| 5 | Masked headline reveal (line-by-line, per-letter rise/blur) | `components/hero/Hero.tsx` (MaskedLines) |
| 6 | Sticky nav: hides on scroll down, returns on up + full-screen menu | `components/Nav.tsx` |
| 7 | Custom cursor: accent dot + ring, context states (view/drag) | `components/ui/CustomCursor.tsx` |
| 8 | Pinned, scrubbed platform story (Rails→Risk→Vault) | `components/sections/Story.tsx` |
| 9 | Editorial solutions list (asymmetric, numbered rows) | `components/sections/SolutionsSection.tsx` |
| 10 | API terminal: types request, streams JSON, blinking caret | `components/sections/Terminal.tsx` |
| 11 | Fraud radar: scan sweep, red-flag→green-resolve live stream | `components/sections/FraudRadar.tsx` |
| 12 | Odometer metrics + drawing chart | `components/sections/LiveStats.tsx` |
| 13 | Horizontal pinned product showcase | `components/sections/HorizontalShowcase.tsx` |
| 14 | Testimonials snap carousel with blur-focus | `components/sections/Testimonials.tsx` |
| 15 | Pricing monthly/yearly toggle + morphing price | `components/sections/Pricing.tsx` |
| 16 | Footer: giant wordmark fills on scroll, newsletter input | `components/sections/Footer.tsx` |
| 17 | Page-transition wipe on route change | `components/motion/PageTransition.tsx` |
| 18 | Lenis smooth scroll ⇄ ScrollTrigger | `components/SmoothScroll.tsx` |
| 19 | `prefers-reduced-motion` fallbacks sitewide | `app/globals.css`, `lib/tokens.ts` |
| 20 | SEO: metadata, Open Graph, robots.txt, sitemap | `app/layout.tsx`, `app/robots.ts`, `app/sitemap.ts` |

## Pages
`/` Home · `/about` · `/solutions` · `/technology` · `/pricing` ·
`/contact` (animated validation) · `/careers` · `/blog`

## Accessibility & performance
- `prefers-reduced-motion` honored; native cursor on touch.
- Semantic HTML, focus states, keyboard nav, WCAG AA contrast.
- WebGL DPR-capped (1.75), pauses off-screen via IntersectionObserver,
  instanced-style particle buffers, transform/opacity-only CSS animations.

## "Not AI-made" rules — how it's met
- Single accent, no purple→blue gradients, no glassmorphism overload.
- Editorial asymmetric layout, numbered indexes, hairlines, mono annotations.
- Concrete, specific copy (real numbers, no "revolutionize/unlock/seamlessly").
- Custom 1.5px SVGs; varied section rhythm; no repeated 3-card rows.
