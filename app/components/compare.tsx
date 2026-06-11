"use client";

import { animate, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

const ROWS = [
  {
    name: "TypeScript · Express",
    tokens: 410,
    note: "npm install express better-sqlite3 zod … + tsconfig + boilerplate",
    flux: false,
  },
  {
    name: "Python · FastAPI",
    tokens: 330,
    note: "pip install fastapi uvicorn sqlalchemy + models + session wiring",
    flux: false,
  },
  {
    name: "Fluxon",
    tokens: 85,
    note: "0 installs — server, schema and persistence are the language",
    flux: true,
  },
];

const MAX = Math.max(...ROWS.map((r) => r.tokens));

function Row({
  row,
  index,
  active,
}: {
  row: (typeof ROWS)[number];
  index: number;
  active: boolean;
}) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!active) return;
    const controls = animate(0, row.tokens, {
      duration: 1.3,
      delay: index * 0.18,
      ease: "easeOut",
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [active, index, row.tokens]);

  return (
    <div className="group">
      <div className="mb-2 flex items-baseline justify-between gap-4">
        <span
          className={`font-mono text-xs uppercase tracking-[0.18em] sm:text-sm ${
            row.flux ? "text-accent" : "text-ink-soft"
          }`}
        >
          {row.name}
        </span>
        <span
          className={`font-display text-2xl tabular-nums sm:text-3xl ${
            row.flux ? "text-accent" : "text-ink"
          }`}
        >
          ≈{val}
          <span className="ml-1 font-mono text-[10px] uppercase tracking-widest text-ink-soft">
            tokens
          </span>
        </span>
      </div>

      <div className="h-9 rounded-md border border-line bg-paper-deep/60 p-1">
        <motion.div
          className={`h-full rounded-[4px] ${
            row.flux
              ? "bg-accent"
              : "bg-[repeating-linear-gradient(-45deg,#c9bda3_0_6px,#bfb295_6px_12px)]"
          }`}
          initial={{ width: "0%" }}
          animate={active ? { width: `${(row.tokens / MAX) * 100}%` } : {}}
          transition={{
            duration: 1.3,
            delay: index * 0.18,
            ease: [0.21, 0.65, 0.3, 1],
          }}
        />
      </div>

      <p className="mt-2 font-mono text-[11px] text-ink-soft sm:text-xs">
        {row.note}
      </p>
    </div>
  );
}

export default function Compare() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <div ref={ref} className="flex flex-col gap-9">
      {ROWS.map((row, i) => (
        <Row key={row.name} row={row} index={i} active={inView} />
      ))}
      <p className="border-t border-line pt-5 text-sm text-ink-soft">
        Rough token counts for the same runnable service. Fewer tokens = more
        context for the real problem — and fewer places to be wrong.
      </p>
    </div>
  );
}
