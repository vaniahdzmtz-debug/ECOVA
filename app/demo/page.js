'use client';

import { useState } from 'react';
import Link from 'next/link';
import { STEPS, HOW_IT_WORKS, DECIDES, AGENT_MAP, AGENT_NOTE, IMPACT, ROADMAP } from '../../lib/demoContent';

const TABS = ['Walkthrough', 'How Ecova decides', 'Agent map', 'Impact check', 'Version 2'];

export default function DemoPage() {
  const [tab, setTab] = useState('Walkthrough');
  const [step, setStep] = useState(0);
  const s = STEPS[step];

  return (
    <main className="max-w-4xl mx-auto px-6 md:px-10 py-10 md:py-14">
      <span className="inline-block text-xs font-medium uppercase tracking-wide text-lakeDeep bg-sky rounded-full px-3 py-1 mb-3">
        Final demo
      </span>
      <h1 className="font-display text-3xl md:text-4xl font-medium text-forest mb-3">Ecova demo</h1>
      <p className="text-ink/75 max-w-2xl mb-6">
        Ecova helps young people in Mexico choose between everyday options using price, effort and impact. This page walks
        you through the whole product. Everything here is rule-based, not AI.
      </p>

      <div className="flex flex-wrap gap-2 mb-8" role="tablist">
        {TABS.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-2 text-sm border transition-colors ${
              tab === t ? 'bg-lake text-white border-lake' : 'bg-white text-lake border-lake/40 hover:bg-sky'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'Walkthrough' && (
        <section data-testid="walkthrough">
          <div className="bg-sky/50 border border-lake/20 rounded-2xl p-5 mb-6" data-testid="how-it-works">
            <h2 className="font-display text-lg text-forest mb-2">How this demo works</h2>
            <ol className="list-decimal pl-5 text-sm text-ink/80 space-y-1">
              {HOW_IT_WORKS.map((t) => <li key={t}>{t}</li>)}
            </ol>
          </div>
          <p className="text-sm text-ink/60 mb-3" data-testid="step-count">
            Step {step + 1} of {STEPS.length}
          </p>
          <div className="bg-card border border-lake/15 rounded-3xl p-6 md:p-8">
            <h2 className="font-display text-2xl text-forest mb-3">{s.title}</h2>
            <p className="text-sm font-medium text-lakeDeep mb-2" data-testid="best-if">{s.best}</p>
            <p className="text-ink/80 mb-3">{s.what}</p>
            <p className="text-sm text-ink/70 mb-5">
              <span className="font-medium text-forest">What to look for: </span>
              {s.look}
            </p>
            <Link href={s.path} target="_blank" rel="noopener noreferrer" className="inline-block rounded-full bg-leaf text-white px-5 py-2 text-sm">
              Open {s.path === '/' ? 'Home' : s.path}
            </Link>
          </div>
          <div className="flex justify-between mt-5">
            <button
              onClick={() => setStep((n) => Math.max(0, n - 1))}
              disabled={step === 0}
              className="rounded-full border border-lake text-lake px-5 py-2 text-sm disabled:opacity-40"
            >
              Back
            </button>
            <button
              onClick={() => setStep((n) => Math.min(STEPS.length - 1, n + 1))}
              disabled={step === STEPS.length - 1}
              className="rounded-full bg-lake text-white px-5 py-2 text-sm disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </section>
      )}

      {tab === 'How Ecova decides' && (
        <section data-testid="decides" className="space-y-6">
          <p className="text-ink/80">{DECIDES.intro}</p>
          <div className="bg-card border border-lake/15 rounded-2xl p-5">
            <h2 className="font-display text-xl text-forest mb-2">The levels</h2>
            <ul className="list-disc pl-5 text-sm text-ink/80 space-y-1">
              {DECIDES.levels.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
          <div className="bg-card border border-lake/15 rounded-2xl p-5">
            <h2 className="font-display text-xl text-forest mb-2">The rules</h2>
            <p className="text-sm text-ink/80 mb-3">{DECIDES.core}</p>
            <ul className="list-disc pl-5 text-sm text-ink/80 space-y-1">
              {DECIDES.chat.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
          <div className="bg-card border border-clay/30 rounded-2xl p-5" data-testid="reliability">
            <h2 className="font-display text-xl text-forest mb-2">How reliable is it?</h2>
            <p className="text-sm text-ink/80">{DECIDES.reliability}</p>
          </div>
          <div className="bg-card border border-lake/15 rounded-2xl p-5">
            <h2 className="font-display text-xl text-forest mb-2">{DECIDES.whyTitle}</h2>
            <ul className="space-y-2 text-sm text-ink/80">
              {DECIDES.why.map((w) => (
                <li key={w.item}><span className="font-medium text-forest">{w.item}: </span>{w.text}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {tab === 'Agent map' && (
        <section data-testid="agent-map">
          <p className="text-ink/75 mb-5">{AGENT_NOTE}</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {AGENT_MAP.map((a) => (
              <div key={a.name} className="bg-card border border-lake/15 rounded-2xl p-5 text-sm">
                <p className="font-display text-lg text-forest">{a.name}</p>
                <p className="text-xs text-lake mb-2">
                  <Link href={a.page} className="underline">{a.page}</Link>
                </p>
                <p className="text-ink/80 mb-2">{a.job}</p>
                <p className="text-ink/60"><span className="font-medium">In: </span>{a.input}</p>
                <p className="text-ink/60"><span className="font-medium">Out: </span>{a.output}</p>
                <p className="text-ink/60"><span className="font-medium">Human: </span>{a.human}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {tab === 'Impact check' && (
        <section data-testid="impact">
          <h2 className="font-display text-2xl text-forest mb-3">Who it helps</h2>
          <ul className="list-disc pl-5 text-ink/80 space-y-1 mb-8">
            {IMPACT.benefits.map((b) => <li key={b}>{b}</li>)}
          </ul>
          <h2 className="font-display text-2xl text-forest mb-3">What could go wrong, and what I did about it</h2>
          <div className="space-y-3 mb-8">
            {IMPACT.risks.map((r) => (
              <div key={r.risk} className="bg-card border border-clay/30 rounded-2xl p-4 text-sm">
                <p className="text-forest font-medium">{r.risk}</p>
                <p className="text-ink/75">{r.fix}</p>
              </div>
            ))}
          </div>
          <h2 className="font-display text-2xl text-forest mb-3">Is it viable?</h2>
          <p className="text-ink/80">{IMPACT.viability}</p>
        </section>
      )}

      {tab === 'Version 2' && (
        <section data-testid="roadmap" className="space-y-5">
          {ROADMAP.map((r) => (
            <div key={r.v} className="bg-card border border-lake/15 rounded-2xl p-5">
              <h2 className="font-display text-xl text-forest mb-2">{r.v}</h2>
              <ul className="list-disc pl-5 text-ink/80 space-y-1 text-sm">
                {r.items.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}
