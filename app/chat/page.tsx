'use client';

import { useState } from 'react';
import { useChat } from '@ai-sdk/react';

export default function ChatPage() {
  const [input, setInput] = useState('');
  const { sendMessage, status, stop } = useChat();

  const isLoading = status === 'streaming' || status === 'submitted';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input });
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
      <input
        className="flex-1 rounded border px-3 py-2 text-sm"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={isLoading}
        placeholder="Paste text or describe what you want…"
      />
      <button
        type="submit"
        disabled={isLoading || !input.trim()}
        className="rounded bg-black px-3 py-2 text-sm text-white disabled:opacity-50"
      >
        Send
      </button>
      <button
        type="button"
        onClick={stop}
        disabled={!isLoading}
        className="rounded border border-gray-400 px-3 py-2 text-sm text-gray-700 disabled:opacity-40"
      >
        Stop
      </button>
    </form>
  );
}