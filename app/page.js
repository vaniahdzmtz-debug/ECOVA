import Link from 'next/link';
import ContentCard from '../components/ContentCard';

const EXAMPLES = [
  {
    name: 'Second-hand textbooks',
    level: 'low',
    explanation: 'Reusing a book skips the resources needed to print a new one entirely.',
  },
  {
    name: 'Rideshare across town',
    level: 'medium',
    explanation: 'Better than driving alone, but public transit still beats it on a normal week.',
  },
  {
    name: 'Fast-fashion haul',
    level: 'high',
    explanation: 'Cheap and quick, but the biggest footprint per wear of anything in your closet.',
  },
  {
    name: 'Refillable laundry pods',
    level: 'low',
    explanation: 'Cuts plastic packaging by roughly two-thirds over the standard tub.',
  },
];

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 pt-14 pb-16 md:pt-20 md:pb-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block text-xs font-medium tracking-wide uppercase text-clayDeep bg-clay/15 rounded-full px-3 py-1 mb-5">
            For students, not scientists
          </span>
          <h1 className="font-display text-4xl md:text-5xl leading-[1.1] font-medium text-forest mb-5">
            Know what&apos;s actually better for the planet.
          </h1>
          <p className="text-lg text-ink/80 mb-8 max-w-md">
            Ecova turns confusing sustainability info into simple, everyday choices
            you can actually make — in seconds, not hours of research.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 rounded-full bg-forest text-parchment font-medium px-6 py-3 hover:bg-forestDeep transition-colors"
            >
              Explore choices
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-forest underline underline-offset-4 decoration-forest/30 hover:decoration-forest"
            >
              See how it works
            </a>
          </div>
          <p className="text-xs text-ink/50 mt-4">
            The full Explore page is coming soon — see our roadmap in the repo.
          </p>
        </div>

        <div className="bg-card border border-forest/10 rounded-3xl p-8 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-ink/50 mb-4">
            Today&apos;s example
          </p>
          <ContentCard {...EXAMPLES[0]} />
        </div>
      </section>

      {/* How it helps */}
      <section className="bg-parchmentAlt border-y border-forest/10">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-20">
          <div className="max-w-xl mb-12">
            <h2 className="font-display text-3xl font-medium text-forest mb-3">
              How Ecova helps
            </h2>
            <p className="text-ink/75">
              No jargon, no guilt trips — just clear answers to the choices you&apos;re
              already making.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="w-11 h-11 rounded-full bg-forest/10 flex items-center justify-center mb-4">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#1F3A2E" strokeWidth="1.6">
                  <circle cx="9" cy="9" r="6" />
                  <path d="M17 17l-4-4" />
                </svg>
              </div>
              <h3 className="font-display text-lg font-medium text-forest mb-2">Look it up</h3>
              <p className="text-sm text-ink/75 leading-relaxed">
                Search everyday products and habits to see their real environmental
                impact, explained simply.
              </p>
            </div>
            <div>
              <div className="w-11 h-11 rounded-full bg-forest/10 flex items-center justify-center mb-4">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#1F3A2E" strokeWidth="1.6">
                  <path d="M4 10h5M4 6h9M4 14h7" />
                  <circle cx="16" cy="10" r="2" />
                </svg>
              </div>
              <h3 className="font-display text-lg font-medium text-forest mb-2">Compare options</h3>
              <p className="text-sm text-ink/75 leading-relaxed">
                See two choices side by side with a plain Low, Medium, or High
                impact rating — no spreadsheets required.
              </p>
            </div>
            <div>
              <div className="w-11 h-11 rounded-full bg-forest/10 flex items-center justify-center mb-4">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#1F3A2E" strokeWidth="1.6">
                  <path d="M4 10l4 4 8-9" />
                </svg>
              </div>
              <h3 className="font-display text-lg font-medium text-forest mb-2">
                Decide with confidence
              </h3>
              <p className="text-sm text-ink/75 leading-relaxed">
                Walk away knowing why a choice is better — not just that someone
                said so.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Preview grid */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <h2 className="font-display text-3xl font-medium text-forest mb-3">
              A few everyday comparisons
            </h2>
            <p className="text-ink/75 max-w-lg">
              Real examples of the kind of guidance you&apos;ll find across campus
              and daily life.
            </p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {EXAMPLES.map((item) => (
            <ContentCard key={item.name} {...item} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-forest">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-20">
          <div className="max-w-xl mb-14">
            <h2 className="font-display text-3xl font-medium text-parchment mb-3">
              Getting guidance takes three steps
            </h2>
            <p className="text-parchment/70">
              No account, no quiz to fill out first — just start with whatever
              you&apos;re deciding on.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10 relative">
            <div className="hidden md:block absolute top-6 left-[16.5%] right-[16.5%] h-px bg-parchment/20" />
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-parchment text-forest font-display font-medium text-lg flex items-center justify-center mb-5 relative z-10">
                1
              </div>
              <h3 className="font-display text-xl font-medium text-parchment mb-2">
                Browse or search
              </h3>
              <p className="text-sm text-parchment/70 leading-relaxed">
                Find a product or habit from the explore page, or search for
                something specific.
              </p>
            </div>
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-parchment text-forest font-display font-medium text-lg flex items-center justify-center mb-5 relative z-10">
                2
              </div>
              <h3 className="font-display text-xl font-medium text-parchment mb-2">
                Compare the impact
              </h3>
              <p className="text-sm text-parchment/70 leading-relaxed">
                See a plain Low, Medium, or High rating with one sentence on why
                it lands there.
              </p>
            </div>
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-parchment text-forest font-display font-medium text-lg flex items-center justify-center mb-5 relative z-10">
                3
              </div>
              <h3 className="font-display text-xl font-medium text-parchment mb-2">
                Choose with confidence
              </h3>
              <p className="text-sm text-parchment/70 leading-relaxed">
                Make the call knowing the reasoning behind it — not just a green
                checkmark.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
