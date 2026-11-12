const LOGOS = [
  "VANTA", "Ledgerly", "Paywave", "STRATA", "Nodus", "Cipher", "Meridian", "Quantia",
];

/** Infinite mono marquee of teams we work with. */
export default function TrustedBy() {
  const doubled = [...LOGOS, ...LOGOS];
  return (
    <section className="relative border-b border-line py-8">
      <div className="mb-6 flex items-center justify-between px-5 sm:px-10">
        <p className="sec-index">Trust / treasury & product teams</p>
        <p className="sec-index hidden sm:block">08 integrators</p>
      </div>
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="animate-marquee flex w-max gap-16 pr-16">
          {doubled.map((l, i) => (
            <span key={i} className="whitespace-nowrap font-display text-2xl font-medium text-white/20 transition-colors duration-300 hover:text-accent">
              {l}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
