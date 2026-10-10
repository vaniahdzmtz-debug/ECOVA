'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import {
  SCENARIOS,
  validateInputs,
  calcRevenue,
  formatMXN,
} from '../../lib/pricing';

const TIERS = [
  {
    name: 'Free',
    price: '$0',
    note: 'Always free',
    features: ['Compare two choices', 'Starter catalog (6 items)'],
  },
  {
    name: 'Plus',
    price: '$49 MXN',
    note: 'per month',
    features: [
      'Everything in Free',
      'Expanded catalog',
      'Saved comparison history',
      'Cheaper-and-greener suggestions',
      'Request a new item',
    ],
  },
  {
    name: 'Plus Yearly',
    price: '$480 MXN',
    note: 'per year ($40/month, saves $108)',
    features: ['Everything in Plus', 'Two months free compared with monthly'],
  },
];

const FIELDS = [
  { key: 'students', label: 'University students reached' },
  { key: 'studentPct', label: 'Students who pay (%)' },
  { key: 'others', label: 'Young people outside university reached' },
  { key: 'othersPct', label: 'Others who pay (%)' },
  { key: 'yearlyPct', label: 'Paying users on the yearly plan (%)' },
];

function toForm(s) {
  return {
    students: String(s.students),
    studentPct: String(s.studentPct),
    others: String(s.others),
    othersPct: String(s.othersPct),
    yearlyPct: String(s.yearlyPct),
  };
}

export default function PricingPage() {
  const [scenario, setScenario] = useState('expected');
  const [form, setForm] = useState(toForm(SCENARIOS.expected));
  const [name, setName] = useState('');
  const [message, setMessage] = useState({ text: '', ok: false });
  const [saved, setSaved] = useState([]);
  const [listNote, setListNote] = useState('');

  const error = validateInputs(form);
  const result = error ? null : calcRevenue(form);

  useEffect(() => {
    loadSaved();
  }, []);

  async function loadSaved() {
    if (!supabase) {
      setListNote('Saving is not set up yet. The calculator still works.');
      return;
    }
    const { data, error: err } = await supabase
      .from('pricing_scenarios')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20);
    if (err) {
      setListNote('Could not load saved scenarios right now. The calculator still works. (Details: ' + (err.message || 'unknown error') + ')');
      return;
    }
    setSaved(data || []);
    setListNote('');
  }

  function pickScenario(key) {
    setScenario(key);
    setForm(toForm(SCENARIOS[key]));
    setMessage({ text: '', ok: false });
  }

  function onChange(key, value) {
    setForm({ ...form, [key]: value });
    setScenario('custom');
    setMessage({ text: '', ok: false });
  }

  async function onSave() {
    if (error) {
      setMessage({ text: error + ' Nothing was saved.', ok: false });
      return;
    }
    if (name.trim() === '') {
      setMessage({ text: 'Please give your scenario a name. Nothing was saved.', ok: false });
      return;
    }
    if (!supabase) {
      setMessage({ text: 'Saving is not set up yet. Nothing was saved.', ok: false });
      return;
    }
    const row = {
      name: name.trim().slice(0, 80),
      scenario,
      students: Math.round(Number(form.students)),
      students_pct: Number(form.studentPct),
      others: Math.round(Number(form.others)),
      others_pct: Number(form.othersPct),
      yearly_pct: Number(form.yearlyPct),
      monthly_revenue: result.monthly,
      annual_revenue: result.annual,
    };
    const { error: err } = await supabase.from('pricing_scenarios').insert(row);
    if (err) {
      setMessage({
        text: 'Something went wrong while saving. Nothing was saved. (Details: ' + (err.message || 'unknown error') + ')',
        ok: false,
      });
      return;
    }
    setMessage({ text: 'Saved!', ok: true });
    setName('');
    loadSaved();
  }

  const scenarioLabel = scenario === 'custom' ? 'Custom' : SCENARIOS[scenario].label;
  const inputClass =
    'w-full border border-forest/20 rounded-xl px-4 py-2.5 bg-card text-ink placeholder:text-ink/40 text-base';

  return (
    <main className="max-w-6xl mx-auto px-6 md:px-10 py-10 md:py-14">
      <section className="mb-12">
        <span className="inline-block text-xs font-medium tracking-wide uppercase text-clayDeep bg-clay/15 rounded-full px-3 py-1 mb-4">
          Pricing
        </span>
        <h1 className="font-display text-3xl md:text-4xl font-medium text-forest mb-4 max-w-2xl">
          Simple prices, and a simulator to test them
        </h1>
        <p className="text-ink/70 max-w-2xl">
          All prices are in Mexican pesos. Use the simulator to see how much
          revenue Ecova could make under different assumptions.
        </p>
      </section>

      {/* Tier cards */}
      <section className="grid md:grid-cols-3 gap-4 mb-14">
        {TIERS.map((t) => (
          <div key={t.name} className="bg-card border border-forest/10 rounded-2xl p-6">
            <h2 className="font-display text-xl text-forest">{t.name}</h2>
            <p className="font-display text-3xl text-forest mt-2">{t.price}</p>
            <p className="text-xs text-ink/60 mb-4">{t.note}</p>
            <ul className="text-sm text-ink/70 space-y-1.5">
              {t.features.map((f) => (
                <li key={f}>&#10003; {f}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* 1. Inputs */}
      <section className="mb-10">
        <h2 className="font-display text-2xl font-medium text-forest mb-2">1. Your inputs</h2>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {Object.entries(SCENARIOS).map(([key, s]) => (
            <button
              key={key}
              onClick={() => pickScenario(key)}
              className={
                'rounded-full px-4 py-1.5 text-sm border transition-colors ' +
                (scenario === key
                  ? 'bg-forest text-card border-forest'
                  : 'bg-card text-forest border-forest/20 hover:border-forest')
              }
            >
              {s.label}
            </button>
          ))}
          <span className="text-sm text-ink/60 ml-1">Scenario: {scenarioLabel}</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FIELDS.map((f) => (
            <label key={f.key} className="block text-sm text-ink/70">
              {f.label}
              <input
                type="number"
                inputMode="decimal"
                min="0"
                value={form[f.key]}
                onChange={(e) => onChange(f.key, e.target.value)}
                className={inputClass + ' mt-1'}
              />
            </label>
          ))}
        </div>
        {error && <p className="text-rust text-sm mt-3">{error}</p>}
      </section>

      {/* 2. Output */}
      <section className="mb-10">
        <h2 className="font-display text-2xl font-medium text-forest mb-1">
          2. Calculated output
        </h2>
        <p className="text-xs text-ink/50 mb-4">Rule-based, not AI</p>
        {result ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Stat value={result.payingStudents} label="Paying students" />
            <Stat value={result.payingOthers} label="Paying others" />
            <Stat
              value={`${result.monthlyPayers} / ${result.yearlyPayers}`}
              label="Monthly / yearly payers"
            />
            <Stat value={result.payers} label="Total paying users" />
            <div className="col-span-2 bg-sageLight border border-forest/10 rounded-2xl p-5 text-center">
              <p className="font-display text-3xl text-forest">{formatMXN(result.monthly)}</p>
              <p className="text-xs text-ink/60 mt-1">Revenue per month</p>
            </div>
            <div className="col-span-2 bg-sageLight border border-forest/10 rounded-2xl p-5 text-center">
              <p className="font-display text-3xl text-forest">{formatMXN(result.annual)}</p>
              <p className="text-xs text-ink/60 mt-1">Revenue per year</p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-ink/60">Fix the inputs above to see results.</p>
        )}
      </section>

      {/* Assumptions table */}
      <section className="mb-10">
        <h3 className="font-display text-lg text-forest mb-3">Scenario assumptions</h3>
        <div className="bg-card border border-forest/10 rounded-2xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ink/60 border-b border-forest/10">
                <th className="px-5 py-3"></th>
                {Object.entries(SCENARIOS).map(([key, s]) => (
                  <th
                    key={key}
                    className={'px-4 py-3 ' + (scenario === key ? 'bg-sageLight text-forest' : '')}
                  >
                    {s.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Students reached', 'students', ''],
                ['Students paying', 'studentPct', '%'],
                ['Others reached', 'others', ''],
                ['Others paying', 'othersPct', '%'],
                ['Yearly plan', 'yearlyPct', '%'],
              ].map(([label, key, suffix]) => (
                <tr key={key} className="border-b border-forest/5 last:border-0">
                  <td className="px-5 py-3 text-ink/70">{label}</td>
                  {Object.entries(SCENARIOS).map(([sk, s]) => (
                    <td
                      key={sk}
                      className={'px-4 py-3 ' + (scenario === sk ? 'bg-sageLight/50 font-medium' : '')}
                    >
                      {s[key].toLocaleString('en-US')}
                      {suffix}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="border-t border-forest/10">
                <td className="px-5 py-3 text-ink/70">Revenue per month</td>
                {Object.entries(SCENARIOS).map(([sk, s]) => (
                  <td
                    key={sk}
                    className={'px-4 py-3 ' + (scenario === sk ? 'bg-sageLight/50 font-medium' : '')}
                  >
                    {formatMXN(calcRevenue(s).monthly)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-5 py-3 text-ink/70">Revenue per year</td>
                {Object.entries(SCENARIOS).map(([sk, s]) => (
                  <td
                    key={sk}
                    className={'px-4 py-3 ' + (scenario === sk ? 'bg-sageLight/50 font-medium' : '')}
                  >
                    {formatMXN(calcRevenue(s).annual)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Save */}
      <section className="mb-14">
        <h2 className="font-display text-2xl font-medium text-forest mb-4">
          3. Save a scenario
        </h2>
        <div className="flex flex-col sm:flex-row gap-3 mb-3">
          <input
            type="text"
            placeholder="Name this scenario..."
            value={name}
            maxLength={80}
            onChange={(e) => setName(e.target.value)}
            className={inputClass + ' flex-1'}
          />
          <button
            onClick={onSave}
            className="bg-forest text-card rounded-xl px-5 py-2.5 text-sm font-medium hover:bg-forestDeep transition-colors"
          >
            Save
          </button>
        </div>
        {message.text && (
          <p className={'text-sm mb-3 ' + (message.ok ? 'text-moss' : 'text-rust')}>
            {message.text}
          </p>
        )}

        <h3 className="font-display text-lg text-forest mt-6 mb-3">Saved scenarios</h3>
        {listNote && <p className="text-sm text-ink/60 mb-3">{listNote}</p>}
        {saved.length === 0 && !listNote ? (
          <p className="text-sm text-ink/60">Nothing saved yet.</p>
        ) : (
          <div className="bg-card border border-forest/10 rounded-2xl overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-ink/60 border-b border-forest/10">
                  <th className="px-5 py-3">Name</th>
                  <th className="px-4 py-3">Scenario</th>
                  <th className="px-4 py-3">Per month</th>
                  <th className="px-4 py-3">Per year</th>
                </tr>
              </thead>
              <tbody>
                {saved.map((s) => (
                  <tr key={s.id} className="border-b border-forest/5 last:border-0">
                    <td className="px-5 py-3 font-medium text-forest">{s.name}</td>
                    <td className="px-4 py-3 text-ink/70 capitalize">{s.scenario}</td>
                    <td className="px-4 py-3">{formatMXN(s.monthly_revenue)}</td>
                    <td className="px-4 py-3">{formatMXN(s.annual_revenue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

function Stat({ value, label }) {
  return (
    <div className="bg-card border border-forest/10 rounded-2xl p-5 text-center">
      <p className="font-display text-3xl text-forest">{value}</p>
      <p className="text-xs text-ink/60 mt-1">{label}</p>
    </div>
  );
}
