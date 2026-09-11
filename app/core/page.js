'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { FALLBACK_ITEMS, generateVerdict } from '../../lib/coreItems';
import RatingDial from '../../components/RatingDial';

const IMPACT_LABEL = { low: 'Low', medium: 'Medium', high: 'High' };
const IMPACT_TEXT_COLOR = { low: 'text-moss', medium: 'text-clayDeep', high: 'text-rust' };

function ResultCard({ item, highlight }) {
  return (
    <div
      className={`bg-card rounded-2xl p-5 ${
        highlight ? 'border-2 border-moss' : 'border border-forest/10'
      }`}
    >
      <p className="font-medium text-forest mb-3">{item.name}</p>
      <div className="flex items-center gap-3 mb-3">
        <RatingDial level={item.impact_level} />
        <span className={`text-xs font-medium ${IMPACT_TEXT_COLOR[item.impact_level]}`}>
          {IMPACT_LABEL[item.impact_level]} impact
        </span>
      </div>
      <div className="space-y-2 text-sm text-ink/75">
        <div className="flex justify-between gap-3">
          <span>Price</span>
          <span className="font-medium text-right">{item.price_level}</span>
        </div>
        <div className="flex justify-between">
          <span>Convenience</span>
          <span className="font-medium">{IMPACT_LABEL[item.convenience_level]}</span>
        </div>
      </div>
    </div>
  );
}

export default function CorePage() {
  const [items, setItems] = useState(FALLBACK_ITEMS);
  const [optionAId, setOptionAId] = useState(FALLBACK_ITEMS[0].id);
  const [optionBId, setOptionBId] = useState(FALLBACK_ITEMS[1].id);
  const [result, setResult] = useState(null); // { a, b, verdict } | 'same' | null

  useEffect(() => {
    async function loadItems() {
      if (!supabase) {
        console.warn('Supabase is not configured — using fallback comparison items.');
        return;
      }
      const { data, error } = await supabase.from('core_items').select('*').order('id');
      if (error || !data || data.length === 0) {
        console.warn('Could not load core_items from Supabase — using fallback data.', error);
        return;
      }
      setItems(data);
      setOptionAId(data[0].id);
      setOptionBId(data[1]?.id ?? data[0].id);
    }
    loadItems();
  }, []);

  function handleCompare() {
    if (optionAId === optionBId) {
      setResult('same');
      return;
    }
    const a = items.find((i) => i.id === optionAId);
    const b = items.find((i) => i.id === optionBId);
    setResult({ a, b, verdict: generateVerdict(a, b) });
  }

  return (
    <main className="max-w-3xl mx-auto px-6 md:px-10 py-14 md:py-20">
      <span className="inline-block text-xs font-medium tracking-wide uppercase text-clayDeep bg-clay/15 rounded-full px-3 py-1 mb-4">
        Quick compare, not a research project
      </span>
      <h1 className="font-display text-3xl md:text-4xl font-medium text-forest mb-3">
        Which one actually makes sense?
      </h1>
      <p className="text-ink/75 mb-10 max-w-lg">
        Pick two everyday choices. We&apos;ll weigh impact, price, and convenience
        together — not just sustainability alone — so you get a real answer, not
        a guilt trip.
      </p>

      <div className="bg-card border border-forest/10 rounded-2xl p-6 mb-10">
        <div className="grid sm:grid-cols-2 gap-4 mb-5">
          <div>
            <label className="text-xs font-medium uppercase tracking-wide text-ink/50">
              Option A
            </label>
            <select
              value={optionAId}
              onChange={(e) => setOptionAId(Number(e.target.value))}
              className="mt-1 w-full border border-forest/20 rounded-xl px-4 py-3 bg-parchment text-forest font-medium"
            >
              {items.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium uppercase tracking-wide text-ink/50">
              Option B
            </label>
            <select
              value={optionBId}
              onChange={(e) => setOptionBId(Number(e.target.value))}
              className="mt-1 w-full border border-forest/20 rounded-xl px-4 py-3 bg-parchment text-forest font-medium"
            >
              {items.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={handleCompare}
          className="w-full rounded-full bg-forest text-parchment font-medium py-3 hover:bg-forestDeep transition-colors"
        >
          Compare
        </button>
      </div>

      {result === 'same' && (
        <div className="bg-clay/15 border border-clay/30 rounded-2xl p-5 text-clayDeep text-sm">
          Pick two different options to compare — you selected the same item twice.
        </div>
      )}

      {result && result !== 'same' && (
        <>
          <div className="grid sm:grid-cols-2 gap-5 mb-8">
            <ResultCard
              item={result.a}
              highlight={result.verdict.startsWith(result.a.name)}
            />
            <ResultCard
              item={result.b}
              highlight={result.verdict.startsWith(result.b.name)}
            />
          </div>
          <div className="bg-forest rounded-2xl p-6 text-parchment">
            <p className="text-xs uppercase tracking-wide text-parchment/60 mb-2">
              Based on our simple comparison rules
            </p>
            <p className="font-display text-lg">{result.verdict}</p>
          </div>
        </>
      )}
    </main>
  );
}
