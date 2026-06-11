// Fluxon (.fx) uchun kichik tokenizer — sayt kod namunalarini bo'yash uchun.
// To'liq grammatika emas: faqat landing'dagi snippetlar uchun yetarli sinflar.

export type Tok = { cls: string; text: string };

const KEYWORDS = new Set([
  "use",
  "tbl",
  "fn",
  "each",
  "if",
  "elif",
  "else",
  "match",
  "ret",
  "fail",
  "exp",
  "skip",
  "stop",
  "in",
  "as",
  "inf",
]);

const BUILTINS = new Set([
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
  "io",
  "sh",
  "bytes",
  "str",
  "math",
  "rand",
  "time",
  "env",
  "log",
  "rep",
]);

const WORD = /[A-Za-z_]\w*/y;

export function tokenizeFluxon(line: string): Tok[] {
  const toks: Tok[] = [];
  let i = 0;

  const push = (cls: string, text: string) => {
    if (text) toks.push({ cls, text });
  };

  while (i < line.length) {
    const ch = line[i];

    // izoh — qator oxirigacha
    if (ch === "#") {
      push("tk-c", line.slice(i));
      break;
    }

    // satr — interpolatsiya bilan birga bitta rang
    if (ch === '"') {
      let j = i + 1;
      while (j < line.length && line[j] !== '"') {
        if (line[j] === "\\") j++;
        j++;
      }
      j = Math.min(j + 1, line.length);
      push("tk-s", line.slice(i, j));
      i = j;
      continue;
    }

    // :symbol
    if (ch === ":" && /[A-Za-z_]/.test(line[i + 1] ?? "")) {
      WORD.lastIndex = i + 1;
      const m = WORD.exec(line)!;
      push("tk-y", line.slice(i, WORD.lastIndex));
      i = WORD.lastIndex;
      void m;
      continue;
    }

    // son
    if (/\d/.test(ch)) {
      let j = i;
      while (j < line.length && /[\d.]/.test(line[j])) j++;
      push("tk-n", line.slice(i, j));
      i = j;
      continue;
    }

    // so'z — keyword / battery / oddiy nom
    if (/[A-Za-z_]/.test(ch)) {
      WORD.lastIndex = i;
      WORD.exec(line);
      let j = WORD.lastIndex;
      const word = line.slice(i, j);

      if (KEYWORDS.has(word)) {
        push("tk-k", word);
        i = j;
        continue;
      }

      // battery nomi: `db.from` kabi zanjirni butunlay bitta rangda beramiz
      if (BUILTINS.has(word)) {
        while (line[j] === "." && /[A-Za-z_]/.test(line[j + 1] ?? "")) {
          WORD.lastIndex = j + 1;
          WORD.exec(line);
          j = WORD.lastIndex;
        }
        push("tk-b", line.slice(i, j));
        i = j;
        continue;
      }

      push("", word);
      i = j;
      continue;
    }

    // ko'p belgili operatorlar
    const two = line.slice(i, i + 2);
    if (two === "|>" || two === "->" || two === "<-" || two === "??") {
      push("tk-o", two);
      i += 2;
      continue;
    }

    if (/\s/.test(ch)) {
      let j = i;
      while (j < line.length && /\s/.test(line[j])) j++;
      push("", line.slice(i, j));
      i = j;
      continue;
    }

    push("tk-o", ch);
    i++;
  }

  return toks;
}
