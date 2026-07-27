'use client';

import { useChat } from 'ai/react'; // or '@ai-sdk/react' depending on your setup

import { ScoreLeadToolPart } from './tools/ScoreLeadToolPart';



function MessageBubble({ message }: { message: any }) {
  return (
    <>
      {(message?.parts || []).map((part: any, index: number) => {
        if (part?.type === 'tool-scoreLead') {
          return (
            <ScoreLeadToolPart
              key={index}
              state={part?.state}
              input={part?.input}
              output={part?.output}
              error={part?.errorText ? new Error(part.errorText) : undefined}
            />
          );
        }
        return (
          <p key={index} className="text-sm whitespace-pre-wrap">
            {part?.text || ''}
          </p>
        );
      })}
    </>
  );
}

export default function ChatPage() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    reload,
  } = useChat();

  return (
    <main className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m: any) => (
          <div key={m.id} className="p-3 rounded bg-zinc-900">
            <p className="text-xs text-zinc-500">{m.role}</p>
            <MessageBubble message={m} />
          </div>
        ))}

        {isLoading && (
          <div className="animate-pulse space-y-2">
            <div className="h-4 w-40 bg-zinc-700 rounded" />
            <div className="h-4 w-60 bg-zinc-700 rounded" />
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-900/40 border border-red-500 rounded">
            <p className="text-sm">Something went wrong.</p>
            <button
              onClick={() => reload()}
              className="mt-2 bg-red-500 px-3 py-1 rounded text-black text-xs"
            >
              Retry
            </button>
          </div>
        )}

        {messages.length === 0 && !isLoading && !error && (
          <div className="text-zinc-400 text-sm">
            No conversations yet — try asking:
            <button
              className="underline ml-1"
              onClick={() => {
                const inputEl = document.getElementById('chat-input') as HTMLInputElement | null;
                if (inputEl) inputEl.value = 'Tell me something interesting!';
              }}
            >
              “Tell me something interesting!”
            </button>
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!input.trim()) return;
          handleSubmit(e);
        }}
        className="p-3 border-t border-zinc-800 flex gap-2"
      >
        <input
          id="chat-input"
          value={input}
          onChange={handleInputChange}
          className="flex-1 bg-black border border-zinc-700 rounded px-3 py-2 text-sm"
          placeholder="Ask something…"
        />
        <button className="bg-white text-black px-4 py-2 rounded text-sm">
          Send
        </button>
      </form>
    </main>
  );
}
