'use client';

import { useEffect, useRef, useState } from 'react';
import ChatMessage from '../../components/ChatMessage';
import {
  TOPICS, PRIORITIES, FREQUENCIES, INTRO, LABEL, TOPIC_HINT,
  recommend, summaryLine, labelFor,
} from '../../lib/chatLogic';

const SAVE_FAIL = 'Results could not be saved right now.';

function Choices({ options, onPick }) {
  return (
    <div className="flex flex-wrap gap-2 pl-1">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onPick(o)}
          className="rounded-full border border-lake text-lake bg-white px-4 py-2 text-sm hover:bg-sky transition-colors"
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export default function ChatPage() {
  const [messages, setMessages] = useState([{ kind: 'bot', text: INTRO }]);
  const [step, setStep] = useState('q1'); // q1, q2, q3, checkpoint, result, ended
  const [answers, setAnswers] = useState({});
  const [text, setText] = useState('');
  const [flagText, setFlagText] = useState(null); // pending question for checkpoint 2
  const [saveNote, setSaveNote] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState('');
  const [feedbackDone, setFeedbackDone] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    setMessages((m) => [...m, { kind: 'bot', text: '1 of 3. What are you deciding about?' }]);
  }, []);

  useEffect(() => {
    if (bottomRef.current && bottomRef.current.scrollIntoView) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages, step, flagText, feedbackDone]);

  const add = (...items) => setMessages((m) => [...m, ...items]);

  function startOver() {
    setMessages([{ kind: 'bot', text: INTRO }, { kind: 'bot', text: '1 of 3. What are you deciding about?' }]);
    setStep('q1');
    setAnswers({});
    setFlagText(null);
    setSaveNote('');
    setSessionId(null);
    setRating(null);
    setComment('');
    setFeedbackDone('');
    setText('');
  }

  function pickTopic(value, label) {
    if (value === 'other') {
      add(
        { kind: 'user', text: label },
        { kind: 'bot', text: `${TOPIC_HINT} If you want, type your question below and I can save it for the Ecova team.` }
      );
      return;
    }
    setAnswers((a) => ({ ...a, category: value }));
    add({ kind: 'user', text: label }, { kind: 'bot', text: '2 of 3. What matters most right now?' });
    setStep('q2');
  }

  function pickPriority(o) {
    setAnswers((a) => ({ ...a, priority: o.value }));
    add({ kind: 'user', text: o.label }, { kind: 'bot', text: '3 of 3. How often do you make this choice?' });
    setStep('q3');
  }

  function pickFrequency(o) {
    setAnswers((a) => ({ ...a, frequency: o.value }));
    add({ kind: 'user', text: o.label });
    setStep('checkpoint');
  }

  async function confirm() {
    const rec = recommend(answers);
    add({ kind: 'user', text: 'Confirm' }, { kind: 'result', rec });
    setStep('result');
  }

  function edit() {
    startOver();
  }




  function renderMessage(m, i) {
    if (m.kind === 'user') return <ChatMessage key={i} from="user">{m.text}</ChatMessage>;
    if (m.kind === 'bot') return <ChatMessage key={i} from="bot">{m.text}</ChatMessage>;
    if (m.kind === 'guard') {
      return (
        <div key={i} className="rounded-2xl border-2 border-clay bg-clay/10 p-4 text-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-clay mb-1">Guardrail</p>
          <p className="text-forest">{m.text}</p>
        </div>
      );
    }
    if (m.kind === 'saved') {
      return (
        <div key={i} className="rounded-2xl border border-lake/20 bg-white p-4 text-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-lakeDeep mb-1">Saved for review</p>
          <p className="text-ink/75">{m.text}</p>
        </div>
      );
    }
    if (m.kind === 'result') {
      const r = m.rec;
      return (
        <div key={i} className="rounded-2xl border border-lake/20 bg-white p-5" data-testid="result">
          <p className="text-xs font-medium uppercase tracking-wide text-lakeDeep mb-1">Recommendation</p>
          <p className="font-display text-xl text-forest mb-3" data-testid="rec-title">{r.title}</p>
          <p className="text-sm text-ink/80 mb-2">{r.reason}</p>
          <p className="text-sm text-ink/80 mb-2">{r.frequencyNote}</p>
          {r.tip && <p className="text-sm text-ink/80 mb-3">{r.tip}</p>}
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            {r.options.map((o) => (
              <div key={o.id} className={`rounded-xl p-3 ${o.impact_level === 'low' ? 'bg-mint' : 'bg-sky'}`}>
                <p className="font-medium text-forest">{o.name}</p>
                <p className="text-xs text-ink/70">
                  {o.price_level} · {o.impact_level[0].toUpperCase() + o.impact_level.slice(1)} impact · {o.convenience_level[0].toUpperCase() + o.convenience_level.slice(1)} convenience
                </p>
              </div>
            ))}
          </div>
          <p className="text-xs text-ink/50 mt-3">{LABEL}.</p>
        </div>
      );
    }
    return null;
  }

  return (
    <main className="max-w-3xl mx-auto px-6 pt-10 pb-16">
      <span className="inline-block text-xs font-medium uppercase tracking-wide text-lakeDeep bg-sky rounded-full px-3 py-1 mb-3">
        Guided assistant
      </span>
      <h1 className="font-display text-3xl font-medium text-forest mb-2">Ecova guide</h1>
      <p className="text-sm text-ink/70 mb-5">
        Answer 3 quick questions and get a recommendation. Rule-based, not AI. Please do not share personal information.
      </p>

      <div className="bg-card border border-lake/15 rounded-3xl p-5 md:p-6 space-y-4">
        {messages.map(renderMessage)}

        {step === 'q1' && !flagText && (
          <Choices options={TOPICS} onPick={(o) => pickTopic(o.value, o.label)} />
        )}
        {step === 'q2' && <Choices options={PRIORITIES} onPick={pickPriority} />}
        {step === 'q3' && <Choices options={FREQUENCIES} onPick={pickFrequency} />}

        {step === 'checkpoint' && (
          <div className="rounded-2xl border-2 border-leaf bg-mint/50 p-4 text-sm" data-testid="checkpoint">
            <p className="text-xs font-medium uppercase tracking-wide text-leaf mb-2">Checkpoint: is this right?</p>
            <p className="text-forest">{summaryLine(answers)}</p>
            <div className="mt-3 flex gap-2">
              <button onClick={confirm} className="rounded-full bg-leaf text-white px-4 py-2 text-sm">Confirm</button>
              <button onClick={edit} className="rounded-full border border-lake text-lake px-4 py-2 text-sm">Edit</button>
            </div>
          </div>
        )}


        {step === 'result' && (
          <div className="space-y-3">
          </div>
        )}


        <div className="flex justify-between items-center">
          <button onClick={startOver} className="text-xs text-lake underline whitespace-nowrap mr-3">Start over</button>
          <p className="text-xs text-ink/50">This conversation is stored anonymously to improve Ecova.</p>
        </div>
        <div ref={bottomRef} />
      </div>
    </main>
  );
}
