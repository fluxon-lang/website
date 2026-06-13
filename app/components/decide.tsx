"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

/**
 * Two agents, one task.
 * Left: a conventional language — the agent faces a tangle of branching paths,
 * every fork a chance to pick the wrong idiom. Right: Fluxon — a single lit path.
 * The point is felt, not read: fewer decisions, less to get wrong.
 */

const EASE = [0.21, 0.65, 0.3, 1] as const;

// each branch is a cubic path from the agent node (left) toward the goal (right)
const NOISY_BRANCHES = [
  "M 24 70 C 90 70 110 18 190 18",
  "M 24 70 C 90 70 104 44 190 44",
  "M 24 70 C 90 70 110 70 190 70",
  "M 24 70 C 90 70 104 96 190 96",
  "M 24 70 C 90 70 110 122 190 122",
];

function Panel({
  label,
  flux,
  active,
}: {
  label: string;
  flux: boolean;
  active: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border p-5 sm:p-6 ${
        flux
          ? "border-accent/40 bg-accent/[0.04]"
          : "border-line bg-paper-deep/50"
      }`}
    >
      <div className="mb-4 flex items-center justify-between">
        <span
          className={`font-mono text-[11px] uppercase tracking-[0.18em] ${
            flux ? "text-accent" : "text-ink-soft"
          }`}
        >
          {label}
        </span>
        <DecisionCount flux={flux} active={active} />
      </div>

      <svg
        viewBox="0 0 214 140"
        className="w-full"
        fill="none"
        aria-hidden
      >
        {/* goal marker */}
        <motion.circle
          cx={196}
          cy={70}
          r={6}
          className={flux ? "fill-accent" : "fill-ink-soft/40"}
          initial={{ scale: 0 }}
          animate={active ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 1.1, ease: EASE }}
          style={{ transformOrigin: "196px 70px" }}
        />

        {flux ? (
          <>
            {/* the one lit path */}
            <motion.path
              d="M 24 70 C 90 70 120 70 190 70"
              className="stroke-accent"
              strokeWidth={2.5}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={active ? { pathLength: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
            />
            {/* travelling pulse */}
            <motion.circle
              r={3.5}
              className="fill-accent"
              initial={{ offsetDistance: "0%", opacity: 0 }}
              animate={
                active ? { offsetDistance: "100%", opacity: [0, 1, 1, 0] } : {}
              }
              transition={{ duration: 1, delay: 0.4, ease: EASE }}
              style={{
                offsetPath: `path("M 24 70 C 90 70 120 70 190 70")`,
              }}
            />
          </>
        ) : (
          NOISY_BRANCHES.map((d, i) => (
            <g key={d}>
              <motion.path
                d={d}
                className="stroke-ink-soft/35"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeDasharray="4 5"
                initial={{ pathLength: 0 }}
                animate={active ? { pathLength: 1 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.3 + i * 0.08,
                  ease: EASE,
                }}
              />
              {/* a doubt marker at the end of each wrong branch */}
              <motion.text
                x={d.endsWith("190 70") ? 196 : i < 2 ? 198 : 198}
                y={[18, 44, 70, 96, 122][i] + 4}
                className="fill-ink-soft/60 font-mono text-[9px]"
                initial={{ opacity: 0 }}
                animate={active ? { opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.9 + i * 0.06 }}
              >
                ?
              </motion.text>
            </g>
          ))
        )}

        {/* agent node */}
        <motion.circle
          cx={24}
          cy={70}
          r={7}
          className={flux ? "fill-accent" : "fill-ink"}
          initial={{ scale: 0 }}
          animate={active ? { scale: 1 } : {}}
          transition={{ duration: 0.4, ease: EASE }}
          style={{ transformOrigin: "24px 70px" }}
        />
        <text
          x={24}
          y={73.5}
          textAnchor="middle"
          className="fill-paper font-mono text-[8px] font-bold"
        >
          AI
        </text>
      </svg>

      <p
        className={`mt-3 text-sm leading-relaxed ${
          flux ? "text-ink" : "text-ink-soft"
        }`}
      >
        {flux
          ? "One canonical path. The agent writes; it never has to choose."
          : "A dozen idioms for one task — every fork a chance to be wrong."}
      </p>
    </div>
  );
}

function DecisionCount({ flux, active }: { flux: boolean; active: boolean }) {
  return (
    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
      decisions{" "}
      <motion.span
        className={`font-display text-lg italic tabular-nums ${
          flux ? "text-accent" : "text-ink"
        }`}
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 }}
      >
        {flux ? "1" : "12+"}
      </motion.span>
    </span>
  );
}

export default function Decide() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <div ref={ref} className="grid gap-5 sm:grid-cols-2 sm:gap-6">
      <Panel label="your language" flux={false} active={inView} />
      <Panel label="fluxon" flux={true} active={inView} />
    </div>
  );
}
