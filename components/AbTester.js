'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

// One A/B test: two clickable options. A click saves exactly 1 vote
// in ab_votes, then the totals are read back from Supabase.
export default function AbTester({ test }) {
  const [counts, setCounts] = useState({ A: 0, B: 0 });
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState({ text: '', ok: false });
  const [note, setNote] = useState('');
  const [voted, setVoted] = useState(null);
  const storageKey = 'ecova_ab_vote_' + test.id;

  useEffect(() => {
    // Remember in this browser that the person already voted in this test.
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved === 'A' || saved === 'B') setVoted(saved);
    } catch (e) {
      // Storage can be blocked. The page still works without it.
    }
    loadCounts();
  }, []);

  async function loadCounts() {
    if (!supabase) {
      setNote('Voting is not set up yet. Nothing can be saved.');
      return;
    }
    const { data, error } = await supabase
      .from('ab_votes')
      .select('choice')
      .eq('test_id', test.id)
      .limit(5000);
    if (error) {
      setNote('Could not load the votes right now. (Details: ' + (error.message || 'unknown error') + ')');
      return;
    }
    const next = { A: 0, B: 0 };
    (data || []).forEach((row) => {
      if (row.choice === 'A' || row.choice === 'B') next[row.choice] += 1;
    });
    setCounts(next);
    setNote('');
  }

  async function vote(choice) {
    if (busy || voted) return;
    if (!supabase) {
      setMessage({ text: 'Voting is not set up yet. Nothing was saved.', ok: false });
      return;
    }
    setBusy(true);
    const { error } = await supabase
      .from('ab_votes')
      .insert({ test_id: test.id, choice });
    if (error) {
      setMessage({
        text: 'Something went wrong while voting. Nothing was saved. (Details: ' + (error.message || 'unknown error') + ')',
        ok: false,
      });
      setBusy(false);
      return;
    }
    setVoted(choice);
    try {
      window.localStorage.setItem(storageKey, choice);
    } catch (e) {
      // If storage is blocked, the vote is still saved.
    }
    setMessage({ text: 'Thanks! Your vote was saved.', ok: true });
    await loadCounts();
    setTimeout(() => setBusy(false), 1000);
  }

  const total = counts.A + counts.B;
  const pct = (n) => (total === 0 ? 0 : Math.round((n / total) * 100));

  const options = [
    { key: 'A', text: test.A, border: 'border-lake', bar: 'bg-lake', track: 'bg-sky', label: 'text-lake' },
    { key: 'B', text: test.B, border: 'border-leaf', bar: 'bg-leaf', track: 'bg-mint', label: 'text-leaf' },
  ];

  return (
    <div className="bg-card border border-lake/15 rounded-2xl p-6">
      <p className="font-medium text-forest mb-1">{test.title}</p>
      <p className="text-sm text-ink/70 mb-4">Click the one you prefer. Total votes: {total}</p>
      <div className="grid md:grid-cols-2 gap-4">
        {options.map((o) => (
          <button
            key={o.key}
            type="button"
            disabled={busy || voted !== null}
            onClick={() => vote(o.key)}
            className={`text-left rounded-2xl border-2 ${o.border} p-5 bg-card hover:bg-parchment disabled:opacity-60 transition-colors`}
          >
            <span className={`block text-xs font-medium mb-1 ${o.label}`}>Option {o.key}</span>
            <span className="block font-display text-xl text-forest">{o.text}</span>
            <span className={`block h-3 rounded-full mt-4 ${o.track}`}>
              <span className={`block h-3 rounded-full ${o.bar}`} style={{ width: pct(counts[o.key]) + '%' }} />
            </span>
            <span className="block text-xs mt-1 text-ink/70">
              {counts[o.key]} {counts[o.key] === 1 ? 'vote' : 'votes'} · {pct(counts[o.key])}%
            </span>
          </button>
        ))}
      </div>
      {message.text && (
        <p className={`text-sm mt-3 ${message.ok ? 'text-leaf' : 'text-rust'}`}>{message.text}</p>
      )}
      {voted && !message.text && (
        <p className="text-sm mt-3 text-leaf">You already voted in this test (Option {voted}). Thanks!</p>
      )}
      {note && <p className="text-sm mt-3 text-ink/60">{note}</p>}
    </div>
  );
}
