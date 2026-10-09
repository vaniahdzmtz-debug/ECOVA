import Link from 'next/link';

const FEATURES = [
  { name: 'Compare two choices', status: 'Live', free: true, plus: true, yearly: true },
  { name: 'Starter catalog (6 items)', status: 'Live', free: true, plus: true, yearly: true },
  { name: 'Expanded catalog', status: 'Planned', free: false, plus: true, yearly: true },
  { name: 'Saved comparison history', status: 'Planned', free: false, plus: true, yearly: true },
  { name: 'Cheaper-and-greener suggestions', status: 'Planned', free: false, plus: true, yearly: true },
  { name: 'Request a new item', status: 'Planned', free: false, plus: true, yearly: true },
];

const SEGMENTS = [
  {
    title: 'University students in Mexico',
    text: 'Students balancing a tight budget with a wish to make greener everyday choices, from water and clothing to getting around the city.',
  },
  {
    title: 'Young people outside university',
    text: 'People aged 18-26 who are working or starting out and face the same trade-off between price, convenience, and impact, without a campus around them.',
  },
];

function Mark({ on }) {
  return on ? (
    <span className="text-moss font-medium" aria-label="Included">&#10003;</span>
  ) : (
    <span className="text-ink/30" aria-label="Not included">&mdash;</span>
  );
}

export default function ProductPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 md:px-10 py-10 md:py-14">
      <section className="mb-12">
        <span className="inline-block text-xs font-medium tracking-wide uppercase text-clayDeep bg-clay/15 rounded-full px-3 py-1 mb-4">
          Product
        </span>
        <h1 className="font-display text-3xl md:text-4xl font-medium text-forest mb-4 max-w-2xl">
          What Ecova does today, and what comes next
        </h1>
        <p className="text-ink/70 max-w-2xl">
          Ecova helps people aged 18-26 in Mexico weigh impact, price, and
          convenience when choosing between everyday options. Two features are
          live now. The rest are planned and would come with a paid plan.
        </p>
      </section>

      <section className="mb-14">
        <h2 className="font-display text-2xl font-medium text-forest mb-6">Feature map</h2>
        <div className="bg-card border border-forest/10 rounded-2xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ink/60 border-b border-forest/10">
                <th className="px-5 py-3">Feature</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-3 py-3 text-center">Free</th>
                <th className="px-3 py-3 text-center">Plus</th>
                <th className="px-3 py-3 text-center">Plus Yearly</th>
              </tr>
            </thead>
            <tbody>
              {FEATURES.map((f) => (
                <tr key={f.name} className="border-b border-forest/5 last:border-0">
                  <td className="px-5 py-3 font-medium text-forest">{f.name}</td>
                  <td className="px-5 py-3">
                    <span
                      className={
                        'inline-block text-xs rounded-full px-2.5 py-0.5 ' +
                        (f.status === 'Live'
                          ? 'text-moss bg-sageLight'
                          : 'text-clayDeep bg-clay/15')
                      }
                    >
                      {f.status}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-center"><Mark on={f.free} /></td>
                  <td className="px-3 py-3 text-center"><Mark on={f.plus} /></td>
                  <td className="px-3 py-3 text-center"><Mark on={f.yearly} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-14">
        <h2 className="font-display text-2xl font-medium text-forest mb-6">Who it is for</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {SEGMENTS.map((s) => (
            <div key={s.title} className="bg-card border border-forest/10 rounded-2xl p-6">
              <h3 className="font-display text-lg text-forest mb-2">{s.title}</h3>
              <p className="text-sm text-ink/70">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <Link
          href="/pricing"
          className="inline-block bg-forest text-card rounded-xl px-5 py-3 text-sm font-medium hover:bg-forestDeep transition-colors"
        >
          See pricing and the revenue simulator
        </Link>
      </section>
    </main>
  );
}
