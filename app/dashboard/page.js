'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { TOPICS, PRIORITIES, FREQUENCIES } from '../../lib/chatLogic';
import { SOFTWARE_TESTS, EXTERNAL_TESTERS } from '../../lib/testingSummary';

// Counts only. This page never shows what people typed.

function countBy(rows, key) {
  const out = {};
  rows.forEach((r) => {
    const v = r[key];
    if (v) out[v] = (out[v] || 0) + 1;
  });
  return out;
}

function Stat({ label, value, testid }) {
  return (
    <div className="bg-card border border-lake/15 rounded-2xl p-4">
      <p className="text-xs uppercase tracking-wide text-ink/55">{label}</p>
      <p className="font-display text-3xl text-forest" data-testid={testid}>{value}</p>
    </div>
  );
}

function Bars({ title, counts, list }) {
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  return (
    <div className="bg-card border border-lake/15 rounded-2xl p-5">
      <h3 className="font-display text-lg text-forest mb-3">{title}</h3>
      {list.map((o) => {
        const n = counts[o.value] || 0;
        const pct = total ? Math.round((n / total) * 100) : 0;
        return (
          <div key={o.value} className="mb-2">
            <div className="flex justify-between text-xs text-ink/70">
              <span>{o.label}</span>
              <span>{n}</span>
            </div>
            <div className="h-2 rounded-full bg-sky">
              <div className="h-2 rounded-full bg-lake" style={{ width: `${pct}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function DashboardPage() {
  const [state, setState] = useState('loading'); // loading, ready, none, error
  const [data, setData] = useState(null);

  useEffect(() => {
    async function load() {
      if (!supabase) {
        setState('none');
        return;
      }
      try {
        const [s, f, v, m] = await Promise.all([
          supabase.from('chat_sessions').select('status, category, priority, frequency').limit(1000),
          supabase.from('chat_feedback').select('rating').limit(1000),
          supabase.from('ab_votes').select('test_id, choice').limit(2000),
          supabase.from('marketing_assets').select('asset_type').limit(1000),
        ]);
        if (s.error || f.error || v.error || m.error) throw new Error('query failed');
        setData({ sessions: s.data || [], feedback: f.data || [], votes: v.data || [], assets: m.data || [] });
        setState('ready');
      } catch (e) {
        setState('error');
      }
    }
    load();
  }, []);

  let body = null;
  if (state === 'loading') body = <p className="text-ink/60">Loading records…</p>;
  if (state === 'none') body = <p className="text-ink/70" data-testid="dash-msg">Records are not available right now because the database is not connected.</p>;
  if (state === 'error') body = <p className="text-ink/70" data-testid="dash-msg">Records could not be loaded right now. Please try again later.</p>;

  if (state === 'ready') {
    const completed = data.sessions.filter((r) => r.status === 'completed');
    const flagged = data.sessions.filter((r) => r.status === 'flagged');
    const up = data.feedback.filter((r) => r.rating === 'up').length;
    const down = data.feedback.filter((r) => r.rating === 'down').length;
    const t1 = data.votes.filter((r) => r.test_id === 1);
    const t2 = data.votes.filter((r) => r.test_id === 2);
    const ab = (rows, c) => rows.filter((r) => r.choice === c).length;
    body = (
      <>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <Stat label="Completed chats" value={completed.length} testid="stat-completed" />
          <Stat label="Flagged questions" value={flagged.length} testid="stat-flagged" />
          <Stat label="Thumbs up" value={up} testid="stat-up" />
          <Stat label="Thumbs down" value={down} testid="stat-down" />
          <Stat label="A/B votes" value={data.votes.length} testid="stat-votes" />
          <Stat label="Saved marketing assets" value={data.assets.length} testid="stat-assets" />
        </div>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <Bars title="Chats by topic" counts={countBy(completed, 'category')} list={TOPICS.filter((t) => t.value !== 'other')} />
          <Bars title="Chats by priority" counts={countBy(completed, 'priority')} list={PRIORITIES} />
          <Bars title="Chats by frequency" counts={countBy(completed, 'frequency')} list={FREQUENCIES} />
        </div>
        <div className="bg-card border border-lake/15 rounded-2xl p-5 mb-10 text-sm">
          <h3 className="font-display text-lg text-forest mb-2">A/B tests</h3>
          <p className="text-ink/75">Test 1: A {ab(t1, 'A')} · B {ab(t1, 'B')}</p>
          <p className="text-ink/75">Test 2: A {ab(t2, 'A')} · B {ab(t2, 'B')}</p>
        </div>
      </>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-6 md:px-10 py-10 md:py-14">
      <span className="inline-block text-xs font-medium uppercase tracking-wide text-lakeDeep bg-sky rounded-full px-3 py-1 mb-3">Records</span>
      <h1 className="font-display text-3xl md:text-4xl font-medium text-forest mb-3">Ecova dashboard</h1>
      <p className="text-ink/75 max-w-2xl mb-8">
        Real counts from the database. This page shows numbers only and never shows what people typed.
      </p>

      {body}

      <h2 className="font-display text-2xl text-forest mb-3">Testing summary</h2>
      <p className="text-ink/70 text-sm mb-4">Software tests and external testers, with what was found and what changed.</p>
      <div className="bg-card border border-lake/15 rounded-2xl overflow-x-auto mb-6">
        <table className="w-full text-sm" data-testid="software-tests">
          <thead>
            <tr className="text-left text-ink/60 border-b border-forest/10">
              <th className="px-4 py-3">Week</th>
              <th className="px-4 py-3">Test</th>
              <th className="px-4 py-3">What it checks</th>
              <th className="px-4 py-3">Result</th>
            </tr>
          </thead>
          <tbody>
            {SOFTWARE_TESTS.map((t) => (
              <tr key={t.name} className="border-b border-forest/5 align-top">
                <td className="px-4 py-2">{t.week}</td>
                <td className="px-4 py-2 font-medium text-forest">{t.name}</td>
                <td className="px-4 py-2 text-ink/75">{t.what}</td>
                <td className="px-4 py-2">{t.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-card border border-lake/15 rounded-2xl overflow-x-auto">
        <table className="w-full text-sm" data-testid="external-testers">
          <thead>
            <tr className="text-left text-ink/60 border-b border-forest/10">
              <th className="px-4 py-3">Week</th>
              <th className="px-4 py-3">Tester</th>
              <th className="px-4 py-3">What they found</th>
              <th className="px-4 py-3">What changed</th>
            </tr>
          </thead>
          <tbody>
            {EXTERNAL_TESTERS.map((t) => (
              <tr key={t.who} className="border-b border-forest/5 align-top">
                <td className="px-4 py-2">{t.week}</td>
                <td className="px-4 py-2 font-medium text-forest">{t.who}</td>
                <td className="px-4 py-2 text-ink/75">{t.found}</td>
                <td className="px-4 py-2 text-ink/75">{t.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
