import CopyButton from '../../components/CopyButton';
import { PROMPTS, BUILD_LOGS } from '../../lib/docsContent';

export const metadata = { title: 'Docs: prompt library and build logs | Ecova' };

export default function DocsPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 md:px-10 py-10 md:py-14">
      <span className="inline-block text-xs font-medium uppercase tracking-wide text-lakeDeep bg-sky rounded-full px-3 py-1 mb-3">
        Docs
      </span>
      <h1 className="font-display text-3xl md:text-4xl font-medium text-forest mb-3">Prompt library and build logs</h1>
      <p className="text-ink/75 max-w-2xl mb-10">
        The prompts I used with a coding assistant, and the commits and fixes from each week. Ecova itself does not use AI:
        every answer on the site is rule-based.
      </p>

      <h2 className="font-display text-2xl text-forest mb-4" id="prompts">Prompt library</h2>
      <div className="space-y-4 mb-12" data-testid="prompt-library">
        {PROMPTS.map((p) => (
          <details key={p.title} className="bg-card border border-lake/15 rounded-2xl p-5">
            <summary className="cursor-pointer font-medium text-forest">{p.title}</summary>
            <p className="text-sm text-ink/65 mt-2 mb-3">{p.when}</p>
            <pre className="whitespace-pre-wrap text-xs text-ink/80 bg-parchment rounded-xl p-4 mb-3 overflow-x-auto">{p.text}</pre>
            <CopyButton text={p.text} label="Copy prompt" />
          </details>
        ))}
      </div>

      <h2 className="font-display text-2xl text-forest mb-4" id="logs">Build logs</h2>
      <div className="space-y-4" data-testid="build-logs">
        {BUILD_LOGS.map((l) => (
          <div key={l.week} className="bg-card border border-lake/15 rounded-2xl p-5">
            <h3 className="font-display text-lg text-forest mb-2">{l.week}</h3>
            {l.commits.length > 0 && (
              <ol className="list-decimal pl-5 text-sm text-ink/80 space-y-0.5 mb-3">
                {l.commits.map((c) => <li key={c}>{c}</li>)}
              </ol>
            )}
            <p className="text-sm text-ink/70">{l.note}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
