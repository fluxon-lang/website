import Benchmark from "./components/benchmark";
import Code from "./components/code";
import Compare from "./components/compare";
import Decide from "./components/decide";
import HeroCode from "./components/hero-code";
import Install from "./components/install";
import Marquee from "./components/marquee";
import Reveal from "./components/reveal";

const GITHUB = "https://github.com/fluxon-lang/fluxon";
const SPEC = `${GITHUB}/blob/master/docs/fluxon-agent.md`;
const EXAMPLES = `${GITHUB}/tree/master/examples`;

export default function Home() {
  return (
    <div className="relative overflow-x-clip">
      <Nav />
      <Hero />
      <Marquee />
      <Why />
      <DecideSection />
      <Different />
      <CompareSection />
      <BenchmarkSection />
      <Methodology />
      <InstallSection />
      <Cta />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#" className="flex items-baseline gap-2">
          <span className="font-display text-2xl font-semibold italic tracking-tight">
            fluxon
          </span>
          <span className="rounded border border-line bg-paper-deep px-1.5 py-0.5 font-mono text-[10px] text-ink-soft">
            .fx
          </span>
        </a>
        <nav className="flex items-center gap-5 text-sm sm:gap-8">
          <a
            href="#why"
            className="hidden text-ink-soft transition-colors hover:text-accent sm:block"
          >
            Why
          </a>
          <a
            href="#language"
            className="hidden text-ink-soft transition-colors hover:text-accent sm:block"
          >
            Language
          </a>
          <a
            href="#compare"
            className="hidden text-ink-soft transition-colors hover:text-accent sm:block"
          >
            Compare
          </a>
          <a
            href="#performance"
            className="hidden text-ink-soft transition-colors hover:text-accent sm:block"
          >
            Speed
          </a>
          <a
            href="#install"
            className="hidden text-ink-soft transition-colors hover:text-accent sm:block"
          >
            Install
          </a>
          <a
            href={GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-ink px-4 py-1.5 font-medium transition-colors hover:bg-ink hover:text-paper"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative">
      {/* fonda juda katta konturli "fx" */}
      <div
        aria-hidden
        className="fx-outline pointer-events-none absolute -top-10 right-[-4rem] select-none font-display text-[22rem] italic leading-none opacity-60 sm:text-[30rem]"
      >
        fx
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(ellipse_at_top_left,rgba(224,78,20,0.08),transparent_60%)]"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 pb-14 pt-10 sm:px-8 sm:pt-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12">
        <div>
          <p
            className="rise flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-accent sm:text-xs"
            style={{ animationDelay: "0.05s" }}
          >
            <span className="h-px w-10 bg-accent" />
            an AI-native programming language
          </p>

          <h1
            className="rise mt-5 font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl"
            style={{ animationDelay: "0.15s" }}
          >
            The language adapts to&nbsp;the&nbsp;AI.
            <br />
            <em className="text-accent">Not the other way around.</em>
          </h1>

          <p
            className="rise mt-6 max-w-md text-lg leading-relaxed text-ink-soft"
            style={{ animationDelay: "0.28s" }}
          >
            One task, one way. Fewer decisions to make, fewer tokens to spend —
            a whole language small enough for an AI to hold in its head.
          </p>

          <div
            className="rise mt-8 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "0.4s" }}
          >
            <a
              href={SPEC}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-ink px-6 py-3 font-medium text-paper transition-all hover:-translate-y-0.5 hover:bg-accent hover:shadow-[0_12px_32px_-12px_rgba(224,78,20,0.7)]"
            >
              Read the spec — 10 min
            </a>
            <a
              href={EXAMPLES}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-ink px-6 py-3 font-medium transition-colors hover:bg-paper-deep"
            >
              See examples
            </a>
          </div>
        </div>

        <HeroCode />
      </div>
    </section>
  );
}

function Why() {
  const stats = [
    {
      big: "19.7%",
      title: "of AI-suggested packages don't exist.",
      body: "Fluxon ships every battery in the language — nothing to chase down, nothing to invent.",
    },
    {
      big: "1",
      title: "way to loop, to bind, to print.",
      body: "No second idiom to weigh. The agent stops deciding and starts building.",
    },
    {
      big: "~10k",
      title: "tokens hold the entire language.",
      body: "Fewer tokens in, fewer tokens out — more context left for the real problem.",
    },
  ];

  return (
    <section id="why" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <Reveal>
        <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-accent sm:text-xs">
          <span className="h-px w-10 bg-accent" />
          the problem
        </p>
        <h2 className="mt-5 max-w-3xl font-display text-4xl leading-[1.08] tracking-tight sm:text-5xl">
          Your favorite language is{" "}
          <em className="text-accent">noise</em> to an agent.
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
          A dozen ways to do one thing. Packages that may not exist. Tokens
          spent on ceremony. For an agent, every choice is a chance to be
          wrong.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
        {stats.map((s, i) => (
          <Reveal key={s.big} delay={i * 0.12} className="bg-paper">
            <div className="group h-full p-7 transition-colors hover:bg-paper-deep/60 sm:p-8">
              <p className="font-display text-5xl italic tracking-tight text-accent sm:text-6xl">
                {s.big}
              </p>
              <p className="mt-4 font-medium leading-snug">{s.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {s.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function DecideSection() {
  return (
    <section className="border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal>
          <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-accent sm:text-xs">
            <span className="h-px w-10 bg-accent" />
            less to think about
          </p>
          <h2 className="mt-5 max-w-3xl font-display text-4xl leading-[1.08] tracking-tight sm:text-5xl">
            Every choice is a chance to be{" "}
            <em className="text-accent">wrong.</em>
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
            So Fluxon takes the choices away. Same task, same shape — the agent
            spends its thinking on the problem, not on the language.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-14">
          <Decide />
        </Reveal>
      </div>
    </section>
  );
}

function Different() {
  const features = [
    {
      n: "01",
      title: "One task = one way",
      body: "The only loop is each. No while, no for, no map-vs-reduce dilemma.",
      code: `# the only loop in the language
total <- 0
each item in cart
  total <- total + item.price`,
    },
    {
      n: "02",
      title: "Batteries, not packages",
      body: "http, db, ai, auth, ws, cron, queue — part of the language. No npm, no pip, no lockfile.",
      code: `use http db ai   # no install, no versions

http.on :get "/health" \\req -> rep 200 {ok:true}
http.serve 8080`,
    },
    {
      n: "03",
      title: "ai is a primitive",
      body: "One line to call a model. Confidence, cost and latency come back as plain data.",
      code: `r = ai.json "extract the order: \${text}" {product:str qty:int}

if r._.conf > 0.85    # confidence is built in
  db.ins "orders" r`,
    },
    {
      n: "04",
      title: "Errors without ceremony",
      body: "! propagates, ?? rescues, fail answers the client. No try/catch pyramids.",
      code: `user = db.one "select * from users where id=$1" [id]!
name = user.name ?? "guest"
fail 422 "insufficient funds"   # becomes the response`,
    },
  ];

  return (
    <section
      id="language"
      className="border-t border-line bg-paper-deep/40 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-accent sm:text-xs">
            <span className="h-px w-10 bg-accent" />
            the language
          </p>
          <h2 className="mt-5 max-w-3xl font-display text-4xl leading-[1.08] tracking-tight sm:text-5xl">
            Four ideas you can read <em className="text-accent">at a glance.</em>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {features.map((f, i) => (
            <Reveal key={f.n} delay={(i % 2) * 0.12}>
              <article className="group flex h-full flex-col rounded-xl border border-line bg-paper p-6 transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_24px_48px_-24px_rgba(29,24,18,0.35)] sm:p-7">
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-2xl italic text-accent">
                    {f.n}
                  </span>
                  <h3 className="font-display text-2xl tracking-tight">
                    {f.title}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {f.body}
                </p>
                <div className="mt-5">
                  <Code code={f.code} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CompareSection() {
  return (
    <section
      id="compare"
      className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal>
          <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-accent sm:text-xs">
            <span className="h-px w-10 bg-accent" />
            versus the world
          </p>
          <h2 className="mt-5 font-display text-4xl leading-[1.08] tracking-tight sm:text-5xl">
            The same service, <em className="text-accent">measured in tokens.</em>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            A notes API: schema, two routes, a database. Most stacks start
            with scaffolding and dependencies. In Fluxon, the wiring{" "}
            <span className="text-ink">is</span> the language.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <Compare />
        </Reveal>
      </div>
    </section>
  );
}

function BenchmarkSection() {
  return (
    <section
      id="performance"
      className="border-t border-line bg-paper-deep/40 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-accent sm:text-xs">
            <span className="h-px w-10 bg-accent" />
            measured, not claimed
          </p>
          <h2 className="mt-5 max-w-3xl font-display text-4xl leading-[1.08] tracking-tight sm:text-5xl">
            Fewer tokens to write. <em className="text-accent">Faster</em> to
            run.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
            The same CRUD service, head to head against Python · FastAPI on one
            machine. Fluxon&apos;s Rust runtime answers reads in microseconds —
            and stays ahead even when FastAPI spreads across four cores.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-14">
          <Benchmark />
        </Reveal>
      </div>
    </section>
  );
}

function InstallSection() {
  return (
    <section
      id="install"
      className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal>
          <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-accent sm:text-xs">
            <span className="h-px w-10 bg-accent" />
            get started
          </p>
          <h2 className="mt-5 font-display text-4xl leading-[1.08] tracking-tight sm:text-5xl">
            One line, <em className="text-accent">and you&apos;re running.</em>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            A single static binary — no runtime to install, no package manager
            to fight. Paste the command, write a{" "}
            <span className="font-mono text-[15px] text-ink">.fx</span> file,
            run it.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <Install />
        </Reveal>
      </div>
    </section>
  );
}

function Methodology() {
  const steps = [
    {
      n: "01",
      title: "Research",
      body: "Measured what AIs actually write reliably: canonical form beats choice, batteries beat packages.",
    },
    {
      n: "02",
      title: "Invention",
      body: "Several models independently invented a language for themselves — and converged on the same ideas.",
    },
    {
      n: "03",
      title: "Stress-testing",
      body: "The spec went to models that had never seen Fluxon. Every gap they hit was a real flaw.",
    },
    {
      n: "04",
      title: "Refinement",
      body: "Close the gap, re-test, repeat — from URL shorteners to e-commerce, chat and fintech.",
    },
  ];

  return (
    <section className="border-t border-line bg-panel py-24 text-code sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-accent sm:text-xs">
            <span className="h-px w-10 bg-accent" />
            methodology
          </p>
          <h2 className="mt-5 max-w-3xl font-display text-4xl leading-[1.08] tracking-tight sm:text-5xl">
            Designed by <em className="text-accent">stress test,</em> not by
            taste.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <div className="border-t border-panel-line pt-6">
                <span className="font-display text-3xl italic text-accent">
                  {s.n}
                </span>
                <h3 className="mt-3 font-display text-xl tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-code-dim">
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-16 max-w-2xl font-display text-lg italic leading-relaxed text-code-dim">
            “The goal is not to outcompete existing languages. It is to be the
            programming language AI knows best — and likes most.”
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(224,78,20,0.1),transparent_55%)]"
      />
      <div className="relative mx-auto max-w-6xl px-5 py-28 text-center sm:px-8 sm:py-36">
        <Reveal>
          <h2 className="mx-auto max-w-3xl font-display text-4xl leading-[1.08] tracking-tight sm:text-6xl">
            Stop teaching agents your language.
            <br />
            <em className="text-accent">Give them theirs.</em>
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mx-auto mt-10 inline-flex items-center gap-3 rounded-lg border border-panel-line bg-panel px-5 py-3.5 font-mono text-sm text-code shadow-[0_24px_56px_-24px_rgba(29,24,18,0.5)]">
            <span className="text-code-dim">$</span>
            <span>fluxon run app.fx</span>
            <span className="cursor-blink -mb-0.5 inline-block h-4 w-[7px] bg-accent" />
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-ink px-7 py-3 font-medium text-paper transition-all hover:-translate-y-0.5 hover:bg-accent hover:shadow-[0_12px_32px_-12px_rgba(224,78,20,0.7)]"
            >
              Star on GitHub
            </a>
            <a
              href={SPEC}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-ink px-7 py-3 font-medium transition-colors hover:bg-paper-deep"
            >
              Read the spec
            </a>
          </div>
          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft">
            open source · under active development
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row sm:px-8">
        <p className="flex items-baseline gap-2">
          <span className="font-display text-lg font-semibold italic">
            fluxon
          </span>
          <span className="font-mono text-[11px] text-ink-soft">
            © 2026 · MIT license
          </span>
        </p>
        <nav className="flex items-center gap-6 font-mono text-xs text-ink-soft">
          <a href="#install" className="transition-colors hover:text-accent">
            install
          </a>
          <a
            href={SPEC}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent"
          >
            spec
          </a>
          <a
            href={EXAMPLES}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent"
          >
            examples
          </a>
          <a
            href={GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent"
          >
            github
          </a>
        </nav>
      </div>
    </footer>
  );
}
