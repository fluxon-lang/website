"use client";

import { useEffect, useMemo, useState } from "react";
import { tokenizeFluxon, type Tok } from "../lib/highlight";

const CODE = String.raw`use http db

tbl notes
  id   serial pk
  text str
  ts   now

http.on :post "/notes" \req ->
  rep 201 (db.ins "notes" {text:req.body.text})

http.on :get "/notes" \req ->
  rep 200 (db.from "notes" |> db.order :ts :desc |> db.all)

http.serve 8080`;

const LINES: Tok[][] = CODE.split("\n").map(tokenizeFluxon);
const TOTAL = LINES.reduce(
  (sum, line) => sum + line.reduce((n, t) => n + t.text.length, 0),
  0,
);

type RenderedLine = { spans: Tok[]; cursor: boolean };

// typed belgigacha bo'lgan tokenlarni kesib beradi; kursor — yozilayotgan qator oxirida
function sliceLines(typed: number): RenderedLine[] {
  let remaining = typed;
  return LINES.map((line) => {
    const spans: Tok[] = [];
    let cursor = false;
    for (const tok of line) {
      if (remaining <= 0) break;
      const take = Math.min(tok.text.length, remaining);
      remaining -= take;
      spans.push({ cls: tok.cls, text: tok.text.slice(0, take) });
      if (remaining <= 0 && typed < TOTAL) cursor = true;
    }
    return { spans, cursor };
  });
}

export default function HeroCode() {
  const [typed, setTyped] = useState(0);
  const done = typed >= TOTAL;

  useEffect(() => {
    // reduced-motion'da bitta qadamda hammasini yozamiz
    const step = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? TOTAL
      : 2;
    const id = window.setInterval(() => {
      setTyped((n) => {
        const next = n + step;
        if (next >= TOTAL) {
          window.clearInterval(id);
          return TOTAL;
        }
        return next;
      });
    }, 14);
    return () => window.clearInterval(id);
  }, []);

  const rendered = useMemo(() => sliceLines(typed), [typed]);

  return (
    <div className="rise" style={{ animationDelay: "0.35s" }}>
      <div className="overflow-hidden rounded-xl border border-panel-line bg-panel shadow-[0_32px_80px_-24px_rgba(29,24,18,0.45)]">
        <div className="flex items-center gap-2 border-b border-panel-line px-4 py-3">
          <span className="size-2.5 rounded-full bg-[#4a4337]" />
          <span className="size-2.5 rounded-full bg-[#4a4337]" />
          <span className="size-2.5 rounded-full bg-[#4a4337]" />
          <span className="ml-3 font-mono text-xs text-code-dim">app.fx</span>
          <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.2em] text-code-dim">
            fluxon runtime
          </span>
        </div>

        <pre className="overflow-x-auto px-5 py-4 font-mono text-[12.5px] leading-[1.6] text-code sm:text-[13px]">
          {rendered.map((line, li) => (
            <div key={li} className="flex">
              <span className="w-7 shrink-0 select-none text-right text-[11px] leading-[1.85] text-code-dim/60">
                {li + 1}
              </span>
              <span className="whitespace-pre pl-4">
                {line.spans.map((tok, ti) => (
                  <span key={ti} className={tok.cls || undefined}>
                    {tok.text}
                  </span>
                ))}
                {line.cursor && (
                  <span className="cursor-blink -mb-0.5 inline-block h-4 w-[7px] bg-accent" />
                )}
              </span>
            </div>
          ))}
        </pre>

        <div className="border-t border-panel-line px-5 py-2.5 font-mono text-xs">
          {done ? (
            <span className="text-[#a9c97e]">
              ✓ serving on :8080 — schema, routes, persistence. that&apos;s the
              whole app.
            </span>
          ) : (
            <span className="text-code-dim">
              $ cargo run -- run app.fx
              <span className="cursor-blink -mb-0.5 ml-1 inline-block h-3.5 w-[7px] bg-code-dim" />
            </span>
          )}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2 font-mono text-[11px] text-ink-soft">
        <span className="rounded-full border border-line bg-paper-deep px-3 py-1">
          ≈ 85 tokens
        </span>
        <span className="rounded-full border border-line bg-paper-deep px-3 py-1">
          0 dependencies
        </span>
        <span className="rounded-full border border-line bg-paper-deep px-3 py-1">
          1 file
        </span>
      </div>
    </div>
  );
}
