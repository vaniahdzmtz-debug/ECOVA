import Link from 'next/link';
import { LANDING_COPY, PERSONA } from '../lib/marketingContent';

// Real examples taken from Ecova's starter catalog (/core).
const COMPARISONS = [
  {
    title: 'Water',
    a: { name: 'Reusable water bottle', price: '$250 MXN one-time', impact: 'Low impact' },
    b: { name: 'Bottled water', price: '$20-30 MXN each', impact: 'High impact' },
  },
  {
    title: 'Clothing',
    a: { name: 'Second-hand clothing', price: '$100-200 MXN per item', impact: 'Low impact' },
    b: { name: 'New fast-fashion item', price: '$300-500 MXN per item', impact: 'High impact' },
  },
  {
    title: 'Getting around',
    a: { name: 'Public transit', price: '$5-13 MXN per ride', impact: 'Low impact' },
    b: { name: 'Rideshare app', price: '$80-150+ MXN per ride', impact: 'High impact' },
  },
];

const STEPS = [
  {
    title: 'Pick two choices',
    text: 'Choose two everyday options from the starter catalog, like transit and rideshare.',
  },
  {
    title: 'See them side by side',
    text: 'Ecova shows the price in pesos, the impact level, and how convenient each one is.',
  },
  {
    title: 'Get a simple verdict',
    text: 'Read one clear sentence on which option is better and why. You make the final call.',
  },
];

export default function HomePage() {
  const example = COMPARISONS[2];
  return (
    <main>
      <section className="bg-gradient-to-br from-sky via-mint to-parchment">
        <div className="max-w-6xl mx-auto px-6 md:px-10 pt-14 pb-16 md:pt-20 md:pb-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-xs font-medium tracking-wide uppercase text-lakeDeep bg-white/70 rounded-full px-3 py-1 mb-5">
              For students in Mexico
            </span>
            <h1 className="font-display text-4xl md:text-5xl leading-[1.1] font-medium text-forest mb-5">
              {LANDING_COPY.headline}
            </h1>
            <p className="text-lg text-ink/80 mb-8 max-w-md">{LANDING_COPY.subheadline}</p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/core"
                className="inline-flex items-center gap-2 rounded-full bg-lake text-white font-medium px-6 py-3 hover:bg-lakeDeep transition-colors"
              >
                {LANDING_COPY.button}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
              <a
                href="#how-it-works"
                className="text-sm font-medium text-lakeDeep underline underline-offset-4 decoration-lake/30 hover:decoration-lake"
              >
                See how it works
              </a>
            </div>
            <p className="text-xs text-ink/60 mt-5">Free to start. No account needed.</p>
          </div>

          <div className="bg-card border border-lake/15 rounded-3xl p-7">
            <p className="text-xs font-medium uppercase tracking-wide text-ink/50 mb-4">Today&apos;s example</p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="rounded-2xl bg-mint p-4">
                <p className="text-xs text-leaf font-medium mb-1">Option A</p>
                <p className="font-display text-lg text-forest">{example.a.name}</p>
                <p className="text-sm text-ink/70 mt-1">
                  {example.a.price} · {example.a.impact}
                </p>
              </div>
              <div className="rounded-2xl bg-sky p-4">
                <p className="text-xs text-lake font-medium mb-1">Option B</p>
                <p className="font-display text-lg text-forest">{example.b.name}</p>
                <p className="text-sm text-ink/70 mt-1">
                  {example.b.price} · {example.b.impact}
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-ink/75">
              Ecova weighs impact, price, and convenience, then explains the verdict in one sentence.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 md:px-10 py-16">
        <h2 className="font-display text-3xl font-medium text-forest mb-8">Why students use Ecova</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {LANDING_COPY.benefits.map((b, i) => (
            <div key={b.title} className={`bg-card border rounded-2xl p-6 ${i === 1 ? 'border-leaf/25' : 'border-lake/15'}`}>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 font-medium ${
                  i === 1 ? 'bg-mint text-leaf' : 'bg-sky text-lake'
                }`}
              >
                {i + 1}
              </div>
              <h3 className="font-display text-xl text-forest mb-2">{b.title}</h3>
              <p className="text-sm text-ink/75">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-parchmentAlt border-y border-forest/10">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-16">
          <h2 className="font-display text-3xl font-medium text-forest mb-3">Real comparisons from the catalog</h2>
          <p className="text-ink/75 max-w-lg mb-8">
            Six everyday choices, in pesos, ready to compare today.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {COMPARISONS.map((c) => (
              <div key={c.title} className="bg-card border border-lake/15 rounded-2xl p-5">
                <p className="text-xs font-medium uppercase tracking-wide text-lakeDeep mb-3">{c.title}</p>
                {[c.a, c.b].map((o, i) => (
                  <div key={o.name} className={`rounded-xl p-3 ${i === 0 ? 'bg-mint mb-2' : 'bg-sky'}`}>
                    <p className="font-medium text-forest text-sm">{o.name}</p>
                    <p className="text-xs text-ink/70">
                      {o.price} · {o.impact}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-forest">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-20">
          <div className="max-w-xl mb-12">
            <h2 className="font-display text-3xl font-medium text-parchment mb-3">Getting an answer takes three steps</h2>
            <p className="text-parchment/70">No account and no quiz. Just pick what you are deciding between.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {STEPS.map((s, i) => (
              <div key={s.title}>
                <div className="w-12 h-12 rounded-full bg-mint text-forest font-display font-medium text-lg flex items-center justify-center mb-5">
                  {i + 1}
                </div>
                <h3 className="font-display text-xl font-medium text-parchment mb-2">{s.title}</h3>
                <p className="text-sm text-parchment/70 leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 md:px-10 py-14 flex flex-wrap items-center justify-between gap-6">
        <div className="max-w-lg">
          <p className="text-xs uppercase tracking-wide text-lake mb-2">
            Built for people like {PERSONA.name}, {PERSONA.age}
          </p>
          <h2 className="font-display text-3xl font-medium text-forest">Greener choices that fit a student budget.</h2>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/core" className="inline-flex rounded-full bg-leaf text-white font-medium px-6 py-3 hover:opacity-90">
            Try Ecova free
          </Link>
          <Link href="/marketing" className="text-sm font-medium text-lakeDeep underline underline-offset-4">
            See our marketing plan
          </Link>
        </div>
      </section>
    </main>
  );
}
