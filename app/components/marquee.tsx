const BATTERIES = [
  "http",
  "db",
  "ai",
  "auth",
  "ws",
  "cron",
  "queue",
  "reg",
  "crypto",
  "json",
  "fs",
  "sh",
  "time",
  "io",
];

function Strip() {
  return (
    <div className="flex shrink-0 items-center">
      {BATTERIES.map((b) => (
        <span key={b} className="flex items-center">
          <span className="px-5 font-mono text-sm tracking-[0.14em] text-ink sm:px-7">
            {b}
          </span>
          <span aria-hidden className="text-accent">
            ✱
          </span>
        </span>
      ))}
      <span className="px-5 font-display text-sm italic text-ink-soft sm:px-7">
        built into the language — nothing to install
      </span>
      <span aria-hidden className="text-accent">
        ✱
      </span>
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="overflow-hidden border-y border-line bg-paper-deep/50 py-3.5">
      <div className="marquee-track flex">
        <Strip />
        <Strip />
      </div>
    </div>
  );
}
