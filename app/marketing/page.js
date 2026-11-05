import {
  BRAND,
  PERSONA,
  LANDING_COPY,
  POSTS,
  SCRIPTS,
  CALENDAR,
  itemLabel,
  itemPlatform,
} from '../../lib/marketingContent';

const sectionTitle = 'font-display text-2xl text-forest mb-4';
const card = 'bg-card border border-lake/15 rounded-2xl';

export default function MarketingPage() {
  const platformBadge = (platform) =>
    platform.startsWith('Instagram') ? 'bg-sky text-lakeDeep' : 'bg-mint text-forest';

  return (
    <main className="max-w-6xl mx-auto px-6 md:px-10 pt-12 pb-20">
      <span className="inline-block text-xs font-medium uppercase tracking-wide text-lakeDeep bg-sky rounded-full px-3 py-1 mb-4">
        Marketing
      </span>
      <h1 className="font-display text-4xl font-medium text-forest mb-3">Ecova marketing engine</h1>
      <p className="text-ink/75 max-w-2xl mb-12">
        Everything we need to explain Ecova to {PERSONA.name} and test what works: brand, persona,
        copy, posts, video scripts, a 14-day plan, and a headline test.
      </p>

      <h2 className={sectionTitle}>1. Brand system</h2>
      <div className={`${card} p-6 mb-12 grid md:grid-cols-2 gap-8`}>
        <div>
          <p className="text-xs uppercase tracking-wide text-ink/50 mb-3">Colors</p>
          <div className="flex gap-3 flex-wrap">
            {BRAND.colors.map((c) => (
              <div key={c.name}>
                <div className="w-16 h-16 rounded-xl border border-forest/10" style={{ backgroundColor: c.hex }} />
                <p className="text-xs mt-1">
                  {c.name}
                  <br />
                  {c.hex}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-ink/50 mb-3">Voice and fonts</p>
          <div className="flex gap-2 mb-3 flex-wrap">
            {BRAND.tone.map((t, i) => (
              <span key={t} className={`text-xs rounded-full px-3 py-1 text-forest ${i === 1 ? 'bg-sky' : 'bg-mint'}`}>
                {t}
              </span>
            ))}
          </div>
          <p className="font-display text-xl text-forest">{BRAND.fonts.headings} for headings</p>
          <p className="text-sm">{BRAND.fonts.body} for body text</p>
          <p className="text-sm text-ink/75 mt-3">
            Promise: <em>{BRAND.promise}</em>
          </p>
        </div>
      </div>

      <h2 className={sectionTitle}>2. Target persona</h2>
      <div className={`${card} p-6 mb-12 flex gap-6 items-start`}>
        <div className="w-16 h-16 rounded-full bg-lake text-white flex items-center justify-center font-display text-2xl shrink-0">
          {PERSONA.name[0]}
        </div>
        <div className="grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <p className="font-display text-xl text-forest">
              {PERSONA.name}, {PERSONA.age}
            </p>
            <p className="text-ink/70">
              {PERSONA.role}, {PERSONA.city}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-ink/50 mb-1">Wants</p>
            <p>{PERSONA.wants}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-ink/50 mb-1">Frustrations and channels</p>
            <p>
              {PERSONA.frustrations} Lives on {PERSONA.channels}.
            </p>
          </div>
        </div>
      </div>

      <h2 className={sectionTitle}>3. Landing page copy</h2>
      <div className={`${card} p-6 mb-12`}>
        <p className="font-display text-xl text-forest">{LANDING_COPY.headline}</p>
        <p className="text-sm text-ink/75 mt-2">{LANDING_COPY.subheadline}</p>
        <ul className="text-sm text-ink/75 mt-3 space-y-1">
          {LANDING_COPY.benefits.map((b) => (
            <li key={b.title}>
              <b className="text-forest">{b.title}:</b> {b.text}
            </li>
          ))}
        </ul>
        <p className="text-sm text-ink/75 mt-3">Button: &quot;{LANDING_COPY.button}&quot;</p>
      </div>

      <h2 className={sectionTitle}>4. Social posts ({POSTS.length})</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
        {POSTS.map((p, i) => (
          <div key={p.id} className={`${card} p-5 flex flex-col`}>
            <div className="flex justify-between mb-3">
              <span className={`text-xs rounded-full px-2.5 py-1 ${platformBadge(p.platform)}`}>{p.platform}</span>
              <span className="text-xs text-ink/50">Post {i + 1}</span>
            </div>
            <p className="font-medium text-forest mb-1">{p.hook}</p>
            <p className="text-sm text-ink/75">{p.caption}</p>
            <p className="text-sm text-lake mt-2">{p.hashtags.join(' ')}</p>
          </div>
        ))}
      </div>

      <h2 className={sectionTitle}>5. Video scripts ({SCRIPTS.length})</h2>
      <div className="grid md:grid-cols-3 gap-5 mb-12">
        {SCRIPTS.map((s, i) => (
          <div key={s.id} className={`${card} p-5 flex flex-col`}>
            <div className="flex justify-between mb-3 gap-2">
              <span className={`text-xs rounded-full px-2.5 py-1 ${platformBadge(s.platform)}`}>
                {s.platform} · {s.length}
              </span>
              <span className="text-xs text-ink/50">Script {i + 1}</span>
            </div>
            <p className="font-display text-xl text-forest mb-2">{s.title}</p>
            <p className="text-sm text-ink/80">
              <b>Hook:</b> {s.hook}
            </p>
            <ol className="text-sm text-ink/80 mt-2 space-y-1 list-decimal list-inside">
              {s.beats.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ol>
            <p className="text-sm text-ink/80 mt-2">
              <b>Call to action:</b> {s.cta}
            </p>
          </div>
        ))}
      </div>

      <h2 className={sectionTitle}>6. 14-day campaign calendar</h2>
      <div className={`${card} overflow-x-auto mb-12`}>
        <table className="w-full text-sm min-w-[560px]">
          <thead className="bg-sky text-lakeDeep text-xs uppercase tracking-wide">
            <tr>
              <th className="text-left p-3">Day</th>
              <th className="text-left p-3">Platform</th>
              <th className="text-left p-3">Content</th>
              <th className="text-left p-3">Goal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-forest/10">
            {CALENDAR.map((d) => (
              <tr key={d.day}>
                <td className="p-3">{d.day}</td>
                <td className="p-3">{itemPlatform(d.ref)}</td>
                <td className="p-3">{itemLabel(d.ref)}</td>
                <td className="p-3">{d.goal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
