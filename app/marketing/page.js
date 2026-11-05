'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import CopyButton from '../../components/CopyButton';
import AbTester from '../../components/AbTester';
import {
  BRAND,
  PERSONA,
  LANDING_COPY,
  POSTS,
  SCRIPTS,
  CALENDAR,
  AB_TESTS,
  toText,
  itemLabel,
  itemPlatform,
} from '../../lib/marketingContent';

const sectionTitle = 'font-display text-2xl text-forest mb-4';
const card = 'bg-card border border-lake/15 rounded-2xl';

export default function MarketingPage() {
  const [saved, setSaved] = useState([]);
  const [listNote, setListNote] = useState('');
  const [message, setMessage] = useState({ text: '', ok: false });

  useEffect(() => {
    loadSaved();
  }, []);

  async function loadSaved() {
    if (!supabase) {
      setListNote('Saving is not set up yet. The content still works.');
      return;
    }
    const { data, error } = await supabase
      .from('marketing_assets')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20);
    if (error) {
      setListNote('Could not load saved assets right now. (Details: ' + (error.message || 'unknown error') + ')');
      return;
    }
    setSaved(data || []);
    setListNote('');
  }

  async function saveAsset(assetType, title, body) {
    if (!supabase) {
      setMessage({ text: 'Saving is not set up yet. Nothing was saved.', ok: false });
      return;
    }
    const { error } = await supabase
      .from('marketing_assets')
      .insert({ asset_type: assetType, title: title.slice(0, 120), body });
    if (error) {
      setMessage({
        text: 'Something went wrong while saving. Nothing was saved. (Details: ' + (error.message || 'unknown error') + ')',
        ok: false,
      });
      return;
    }
    setMessage({ text: 'Saved! "' + title.slice(0, 60) + '" is in the list below.', ok: true });
    loadSaved();
  }

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

      {message.text && (
        <p
          className={`sticky top-20 z-20 mb-8 rounded-xl px-4 py-3 text-sm ${
            message.ok ? 'bg-mint text-forest' : 'bg-rust/10 text-rust'
          }`}
        >
          {message.text}
        </p>
      )}

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
        <div className="mt-4">
          <CopyButton text={toText('landing')} />
        </div>
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
            <div className="mt-4 flex gap-2 flex-wrap">
              <CopyButton text={toText('post', p)} />
              <button
                type="button"
                onClick={() => saveAsset('post', p.hook, toText('post', p))}
                className="text-base sm:text-sm rounded-full bg-leaf text-white px-4 py-1.5 hover:opacity-90"
              >
                Save
              </button>
            </div>
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
            <div className="mt-4 flex gap-2 flex-wrap">
              <CopyButton text={toText('script', s)} />
              <button
                type="button"
                onClick={() => saveAsset('script', s.title, toText('script', s))}
                className="text-base sm:text-sm rounded-full bg-leaf text-white px-4 py-1.5 hover:opacity-90"
              >
                Save
              </button>
            </div>
          </div>
        ))}
      </div>

      <h2 className={sectionTitle}>6. 14-day campaign calendar</h2>
      <div className={`${card} overflow-x-auto mb-3`}>
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
      <div className="mb-12">
        <CopyButton text={toText('calendar')} label="Export calendar" />
      </div>

      <h2 className={sectionTitle}>7. A/B headline tests</h2>
      <div className="space-y-5 mb-12">
        {AB_TESTS.map((t) => (
          <AbTester key={t.id} test={t} />
        ))}
      </div>

      <h2 className={sectionTitle}>8. Saved assets</h2>
      <div className={`${card} overflow-x-auto`}>
        <table className="w-full text-sm min-w-[480px]">
          <thead className="bg-mint text-forest text-xs uppercase tracking-wide">
            <tr>
              <th className="text-left p-3">Type</th>
              <th className="text-left p-3">Title</th>
              <th className="text-left p-3">Saved</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-forest/10">
            {saved.length === 0 ? (
              <tr>
                <td className="p-3 text-ink/60" colSpan={3}>
                  {listNote || 'Nothing saved yet. Click Save on a post or a script.'}
                </td>
              </tr>
            ) : (
              saved.map((a) => (
                <tr key={a.id}>
                  <td className="p-3 capitalize">{a.asset_type}</td>
                  <td className="p-3">{a.title}</td>
                  <td className="p-3">{new Date(a.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
