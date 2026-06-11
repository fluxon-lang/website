import { tokenizeFluxon } from "../lib/highlight";

// Statik (animatsiyasiz) kod paneli — feature kartalari uchun, server'da render bo'ladi.
export default function Code({ code }: { code: string }) {
  const lines = code.split("\n").map(tokenizeFluxon);

  return (
    <pre className="overflow-x-auto rounded-lg border border-panel-line bg-panel px-4 py-4 font-mono text-[12.5px] leading-[1.75] text-code">
      {lines.map((line, li) => (
        <div key={li} className="whitespace-pre">
          {line.map((tok, ti) => (
            <span key={ti} className={tok.cls || undefined}>
              {tok.text}
            </span>
          ))}
        </div>
      ))}
    </pre>
  );
}
