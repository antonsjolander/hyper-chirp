'use client';

import { useState } from 'react';

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="px-3 py-1.5 text-[13px] bg-[#256f82] text-white rounded hover:bg-[#1e5a6b] transition-colors"
      aria-label="Kopiera kod"
    >
      {copied ? 'Kopierad!' : 'Kopiera'}
    </button>
  );
}
