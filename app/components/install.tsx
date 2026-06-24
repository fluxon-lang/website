"use client";

import { motion } from "motion/react";
import { useState } from "react";

/* Repo README'dagi `## Install` bo'limining sayt versiyasi.
   Manba: github.com/fluxon-lang/fluxon → README.md */

const RELEASES = "https://github.com/fluxon-lang/fluxon/releases";

const PLATFORMS = [
  {
    id: "unix",
    label: "macOS / Linux",
    lang: "sh",
    cmd: "curl -fsSL https://fluxon-lang.com/install.sh | sh",
  },
  {
    id: "windows",
    label: "Windows",
    lang: "powershell",
    cmd: "irm https://fluxon-lang.com/install.ps1 | iex",
  },
] as const;

const RUN_LINES: { code: string; note: string }[] = [
  { code: "fluxon run hello.fx", note: "run a .fx file" },
  { code: "fluxon repl", note: "interactive REPL" },
  { code: "fluxon --help", note: "all commands" },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(text).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        });
      }}
      aria-label="Copy command"
      className="shrink-0 rounded-md border border-panel-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-code-dim transition-colors hover:border-accent hover:text-accent"
    >
      {copied ? "copied" : "copy"}
    </button>
  );
}

export default function Install() {
  const [active, setActive] = useState<(typeof PLATFORMS)[number]["id"]>(
    "unix",
  );
  const platform = PLATFORMS.find((p) => p.id === active)!;

  return (
    <div className="flex flex-col gap-6">
      {/* platforma tab'lari — qog'oz segmented control */}
      <div className="inline-flex w-fit gap-1 rounded-full border border-line bg-paper-deep/60 p-1">
        {PLATFORMS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setActive(p.id)}
            aria-pressed={active === p.id}
            className={`relative rounded-full px-5 py-1.5 font-mono text-xs uppercase tracking-[0.12em] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent/60 ${
              active === p.id ? "text-paper" : "text-ink-soft hover:text-ink"
            }`}
          >
            {active === p.id && (
              <motion.span
                layoutId="install-tab"
                className="absolute inset-0 rounded-full bg-ink"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative">{p.label}</span>
          </button>
        ))}
      </div>

      {/* asosiy install command paneli */}
      <div className="rounded-xl border border-panel-line bg-panel text-code shadow-[0_28px_60px_-28px_rgba(29,24,18,0.55)]">
        <div className="flex items-center gap-2 border-b border-panel-line px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#e0563a]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#e0a83a]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#5ec98a]" />
          <span className="ml-2 font-mono text-[11px] text-code-dim">
            {platform.label}
          </span>
        </div>

        <div className="flex items-center gap-4 px-4 py-4 sm:px-5">
          {/* ikkala komanda bir grid hujayrasida ustma-ust turadi — shuning uchun
              panel eni HAR DOIM eng uzun komandaga teng va tab almashganda sakramaydi */}
          <div className="grid min-w-0 flex-1 overflow-x-auto">
            {PLATFORMS.map((p) => (
              <motion.code
                key={p.id}
                aria-hidden={p.id !== active}
                animate={{ opacity: p.id === active ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                className={`col-start-1 row-start-1 whitespace-nowrap font-mono text-sm sm:text-[15px] ${
                  p.id === active ? "" : "pointer-events-none"
                }`}
              >
                <span className="select-none text-code-dim">$ </span>
                {p.cmd}
              </motion.code>
            ))}
          </div>
          <CopyButton text={platform.cmd} />
        </div>
      </div>

      <p className="text-sm leading-relaxed text-ink-soft">
        Downloads the latest release, verifies its checksum, and puts{" "}
        <span className="font-mono text-[13px] text-ink">fluxon</span> on your
        PATH. No toolchain, no dependencies. Then run a file:
      </p>

      {/* run commandlari */}
      <div className="overflow-hidden rounded-xl border border-line">
        {RUN_LINES.map((line, i) => (
          <div
            key={line.code}
            className={`flex items-baseline justify-between gap-4 px-5 py-3 ${
              i > 0 ? "border-t border-line" : ""
            }`}
          >
            <code className="font-mono text-sm">
              <span className="select-none text-ink-soft">$ </span>
              <span className="text-ink">{line.code}</span>
            </code>
            <span className="shrink-0 font-mono text-[11px] text-ink-soft">
              {line.note}
            </span>
          </div>
        ))}
      </div>

      <p className="text-sm leading-relaxed text-ink-soft">
        The installer always grabs the latest release. Prefer to do it by hand?
        Grab a prebuilt archive from the{" "}
        <a
          href={RELEASES}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline-offset-4 hover:underline"
        >
          releases page
        </a>
        , or build from source with the Rust toolchain (
        <span className="font-mono text-[13px] text-ink">
          cargo install --path runtime
        </span>
        ).
      </p>
    </div>
  );
}
