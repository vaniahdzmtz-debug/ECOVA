'use client';

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { FALLBACK_RESEARCH_ITEMS, RISK_MAP } from '../../lib/researchItems';

const TYPE_STYLE = {
  competitor: 'text-moss bg-sageLight',
  substitute: 'text-clayDeep bg-clay/15',
};

const TYPE_LABEL = {
  competitor: 'Competitor',
  substitute: 'Substitute',
};

export default function ResearchPage() {
  const [items, setItems] = useState(FALLBACK_RESEARCH_ITEMS);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  useEffect(() => {
    async function loadItems() {
      if (!supabase) {
        console.warn('Supabase is not configured — using fallback research items.');
        return;
      }
      const { data, error } = await supabase.from('research_items').select('*').order('id');
      if (error || !data || data.length === 0) {
        console.warn('Could not load research_items from Supabase — using fallback data.', error);
        return;
      }
      setItems(data);
    }
    loadItems();
  }, []);

  const globalExamples = items.filter((i) => i.is_global_example).slice(0, 5);

  const filteredItems = useMemo(() => {
    return items.filter((i) => {
      const matchesSearch = i.name.toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilter === 'all' || i.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [items, search, typeFilter]);

  const totalCount = items.length;
  const competitorCount = items.filter((i) => i.type === 'competitor').length;
  const substituteCount = items.filter((i) => i.type === 'substitute').length;

  return (
    <main className="max-w-6xl mx-auto px-6 md:px-10 py-10 md:py-14">
      {/* Dashboard widget */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-card border border-forest/10 rounded-2xl p-5 text-center">
          <p className="font-display text-3xl text-forest">{totalCount}</p>
          <p className="text-xs text-ink/60 mt-1">Items tracked</p>
        </div>
        <div className="bg-card border border-forest/10 rounded-2xl p-5 text-center">
          <p className="font-display text-3xl text-forest">{competitorCount}</p>
          <p className="text-xs text-ink/60 mt-1">Competitors</p>
        </div>
        <div className="bg-card border border-forest/10 rounded-2xl p-5 text-center">
          <p className="font-display text-3xl text-forest">{substituteCount}</p>
          <p className="text-xs text-ink/60 mt-1">Substitutes</p>
        </div>
        <div className="bg-card border border-forest/10 rounded-2xl p-5 text-center">
          <p className="font-display text-3xl text-forest">4</p>
          <p className="text-xs text-ink/60 mt-1">Key risks</p>
        </div>
      </div>

      {/* Research intake */}
      <section className="mb-14">
        <span className="inline-block text-xs font-medium tracking-wide uppercase text-clayDeep bg-clay/15 rounded-full px-3 py-1 mb-4">
          Research + Benchmarking
        </span>
        <h1 className="font-display text-3xl md:text-4xl font-medium text-forest mb-4 max-w-2xl">
          How are existing apps and alternatives helping people make more
          sustainable everyday choices, and where is there an opportunity for
          Ecova?
        </h1>
        <p className="text-ink/75 max-w-2xl">
          This page documents research into existing tools and habits people
          already use when trying to make more sustainable decisions — both
          real apps and informal substitutes — to understand where Ecova
          genuinely fits.
        </p>
      </section>

      {/* Global examples */}
      <section className="mb-14">
        <h2 className="font-display text-2xl font-medium text-forest mb-6">
          Global Examples
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {globalExamples.map((item) => (
            <div key={item.id} className="bg-card border border-forest/10 rounded-2xl p-5">
              <span className="text-[10px] font-medium uppercase tracking-wide text-moss bg-sageLight rounded-full px-2 py-0.5">
                {item.category}
              </span>
              <p className="font-medium text-forest mt-3 mb-1">{item.name}</p>
              <p className="text-xs text-ink/70 leading-relaxed">{item.notes}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mexico localization */}
      <section className="mb-14">
        <div className="bg-forest rounded-2xl p-6 md:p-8 text-parchment">
          <h2 className="font-display text-2xl font-medium mb-3">
            Mexico-Specific Findings
          </h2>
          <p className="text-parchment/80 text-sm leading-relaxed max-w-2xl">
            Academic research shows Mexican university students report low
            sustainable consumption habits overall, largely because price and
            convenience are weighed far more heavily than environmental
            impact in everyday decisions. No dedicated consumer app was found
            that combines impact, price, and convenience specifically for
            this market — this is the gap Ecova is built to fill.
          </p>
        </div>
      </section>

      {/* Competitors & substitutes table */}
      <section className="mb-14">
        <h2 className="font-display text-2xl font-medium text-forest mb-6">
          Competitors &amp; Substitutes
        </h2>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border border-forest/20 rounded-xl px-4 py-2.5 bg-card text-ink placeholder:text-ink/40 text-sm"
          />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border border-forest/20 rounded-xl px-4 py-2.5 bg-card text-ink text-sm"
          >
            <option value="all">All types</option>
            <option value="competitor">Competitor</option>
            <option value="substitute">Substitute</option>
          </select>
        </div>

        <div className="bg-card border border-forest/10 rounded-2xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-forest/10 text-left text-xs uppercase tracking-wide text-ink/50">
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Notes</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-6 text-center text-ink/40 text-sm">
                    No matches found.
                  </td>
                </tr>
              )}
              {filteredItems.map((item) => (
                <tr key={item.id} className="border-b border-forest/5 last:border-0">
                  <td className="px-5 py-3 font-medium text-forest">{item.name}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`text-[10px] font-medium uppercase tracking-wide rounded-full px-2 py-0.5 ${TYPE_STYLE[item.type]}`}
                    >
                      {TYPE_LABEL[item.type]}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-ink/70">{item.category}</td>
                  <td className="px-5 py-3 text-ink/70">{item.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Risk map */}
      <section className="mb-14">
        <h2 className="font-display text-2xl font-medium text-forest mb-2">Risk Map</h2>
        <p className="text-sm text-ink/60 mb-6">Likelihood (horizontal) vs. Impact (vertical)</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
          {RISK_MAP.map((risk, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-5 border ${
                risk.impact === 'High'
                  ? 'bg-rust/10 border-rust/20'
                  : 'bg-clay/10 border-clay/20'
              }`}
            >
              <p
                className={`text-[10px] font-medium uppercase tracking-wide mb-2 ${
                  risk.impact === 'High' ? 'text-rust' : 'text-clayDeep'
                }`}
              >
                {risk.impact} impact · {risk.likelihood} likelihood
              </p>
              <p className="text-sm text-ink/80">{risk.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
