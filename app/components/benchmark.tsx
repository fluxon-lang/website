"use client";

import { animate, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

/* Bir xil REST API (5-endpoint CRUD), bir xil SQLite (WAL), 50 VU × 30 s.
   To'liq metodologiya: benchmark/METHODOLOGY.md. Barcha testlar 0% xato. */

type Env = {
  id: string;
  label: string;
  caption: string;
  ratio: string;
  fluxon: number;
  fastapi: number;
};

const ENVS: Env[] = [
  {
    id: "single",
    label: "Single-core",
    caption: "one process each, on the host",
    ratio: "3.9×",
    fluxon: 23214,
    fastapi: 5918,
  },
  {
    id: "multi",
    label: "Multi-core",
    caption: "4 CPU each · FastAPI -w4 · DB on tmpfs",
    ratio: "2.16×",
    fluxon: 16216,
    fastapi: 7515,
  },
];

/* latency (ms) — multi-core, synchronous=NORMAL adolatli asosiy holat */
const LATENCY = [
  { metric: "Read p95", fluxon: "1.15", fastapi: "1.50", note: "GET /items/:id" },
  { metric: "List p95", fluxon: "1.29", fastapi: "2.11", note: "GET /items" },
  { metric: "Write p95", fluxon: "22.6", fastapi: "59.6", note: "PUT /items/:id" },
  { metric: "Latency p50", fluxon: "0.53", fastapi: "0.79", note: "all routes" },
];

function ThroughputBar({
  name,
  value,
  max,
  delay,
  active,
  flux,
}: {
  name: string;
  value: number;
  max: number;
  delay: number;
  active: boolean;
  flux: boolean;
}) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!active) return;
    const controls = animate(0, value, {
      duration: 1.3,
      delay,
      ease: "easeOut",
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [active, value, delay]);

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-4">
        <span
          className={`font-mono text-xs uppercase tracking-[0.18em] ${
            flux ? "text-accent" : "text-ink-soft"
          }`}
        >
          {name}
        </span>
        <span
          className={`font-display text-xl tabular-nums sm:text-2xl ${
            flux ? "text-accent" : "text-ink"
          }`}
        >
          {val.toLocaleString("en-US")}
          <span className="ml-1.5 font-mono text-[10px] uppercase tracking-widest text-ink-soft">
            req/s
          </span>
        </span>
      </div>

      <div className="h-8 rounded-md border border-line bg-paper-deep/60 p-1">
        <motion.div
          className={`h-full rounded-[4px] ${
            flux
              ? "bg-accent"
              : "bg-[repeating-linear-gradient(-45deg,#c9bda3_0_6px,#bfb295_6px_12px)]"
          }`}
          initial={{ width: "0%" }}
          animate={active ? { width: `${(value / max) * 100}%` } : {}}
          transition={{ duration: 1.3, delay, ease: [0.21, 0.65, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

function EnvCard({ env, active }: { env: Env; active: boolean }) {
  const max = Math.max(env.fluxon, env.fastapi);

  return (
    <div className="rounded-xl border border-line bg-paper p-6 sm:p-7">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <h3 className="font-display text-2xl tracking-tight">{env.label}</h3>
          <p className="mt-1 font-mono text-[11px] text-ink-soft">
            {env.caption}
          </p>
        </div>
        <div className="text-right">
          <span className="font-display text-3xl italic text-accent sm:text-4xl">
            {env.ratio}
          </span>
          <p className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">
            faster
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-5">
        <ThroughputBar
          name="Fluxon"
          value={env.fluxon}
          max={max}
          delay={0.05}
          active={active}
          flux
        />
        <ThroughputBar
          name="Python · FastAPI"
          value={env.fastapi}
          max={max}
          delay={0.2}
          active={active}
          flux={false}
        />
      </div>
    </div>
  );
}

export default function Benchmark() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <div ref={ref} className="flex flex-col gap-10">
      <div className="grid gap-6 lg:grid-cols-2">
        {ENVS.map((env) => (
          <EnvCard key={env.id} env={env} active={inView} />
        ))}
      </div>

      {/* latency jadval — multi-core, adolatli asosiy holat */}
      <div className="overflow-hidden rounded-xl border border-line">
        <div className="flex items-baseline justify-between gap-4 border-b border-line bg-paper-deep/40 px-5 py-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
            latency · multi-core, equal settings
          </span>
          <span className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">
            ms · lower = better
          </span>
        </div>

        <div className="grid grid-cols-[1.4fr_1fr_1fr] bg-paper-deep/20 px-5 py-2.5 font-mono text-[10px] uppercase tracking-widest text-ink-soft">
          <span>metric</span>
          <span className="text-right text-accent">Fluxon</span>
          <span className="text-right">FastAPI</span>
        </div>

        {LATENCY.map((row, i) => (
          <motion.div
            key={row.metric}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
            className="grid grid-cols-[1.4fr_1fr_1fr] items-baseline border-t border-line px-5 py-3 first:border-t-0"
          >
            <span className="text-sm">
              {row.metric}
              <span className="ml-2 hidden font-mono text-[10px] text-ink-soft sm:inline">
                {row.note}
              </span>
            </span>
            <span className="text-right font-display text-lg tabular-nums text-accent">
              {row.fluxon}
            </span>
            <span className="text-right font-display text-lg tabular-nums text-ink-soft">
              {row.fastapi}
            </span>
          </motion.div>
        ))}
      </div>

      <p className="border-t border-line pt-5 text-sm leading-relaxed text-ink-soft">
        Same 5-endpoint CRUD API, same SQLite (WAL), 50 VUs × 30 s,{" "}
        <span className="text-ink">0% errors</span> on every run. Settings were
        matched on both sides (identical{" "}
        <span className="font-mono text-[13px]">synchronous</span>, DB on tmpfs
        to remove disk noise) so the gap reflects runtime, not configuration —
        Apple M3, k6.
      </p>
    </div>
  );
}
