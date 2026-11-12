const TICKS = [
  { a: "VANTA", b: "SELL", c: "$84,200", d: "SETTLED · 38ms" },
  { a: "LEDGERLY", b: "PAY", c: "$12,400", d: "CLEARED · 41ms" },
  { a: "NODUS", b: "SWAP", c: "$620,005", d: "FINAL · 52ms" },
  { a: "CIPHER", b: "BUY", c: "$3,180", d: "SETTLED · 35ms" },
  { a: "MERIDIAN", b: "PAY", c: "$9,900", d: "CLEARED · 39ms" },
  { a: "QUANTIA", b: "SELL", c: "$142,700", d: "FINAL · 44ms" },
];

/** Real-time-feeling transaction ticker. */
export default function Ticker() {
  const doubled = [...TICKS, ...TICKS];
  return (
    <section className="relative overflow-hidden border-y border-line py-3" aria-hidden="true">
      <div className="animate-marquee flex w-max items-center gap-12 pr-12">
        {doubled.map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-3 font-mono text-[12px] tracking-[0.14em] text-muted whitespace-nowrap"
          >
            <span className="text-accent">{t.a}</span>
            <span>{t.b}</span>
            <span className="text-paper">{t.c}</span>
            <span className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-accent" />
              {t.d}
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}
