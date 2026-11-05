'use client';

import { useState } from 'react';

// Copies text to the clipboard and shows "Copied" for about 2 seconds.
export default function CopyButton({ text, label = 'Copy' }) {
  const [state, setState] = useState('idle');

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setState('copied');
    } catch (e) {
      setState('blocked');
    }
    setTimeout(() => setState('idle'), 2000);
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      className="text-base sm:text-sm rounded-full border border-lake text-lake px-4 py-1.5 hover:bg-sky transition-colors"
    >
      {state === 'copied'
        ? 'Copied'
        : state === 'blocked'
        ? 'Copy blocked, select the text instead'
        : label}
    </button>
  );
}
