import { NextRequest } from 'next/server';
import { streamText, convertToModelMessages, tool, type UIMessage } from 'ai';
import { model, systemPrompt } from '@/lib/modelConfig';

/* ----------------------------------------------------------
   1. IMPORT YOUR TOOL
---------------------------------------------------------- */
import { scoreLeadInputSchema, scoreLeadOutputSchema, executeScoreLead } from '../ai/tools/scoreLead';

export const maxDuration = 30;

/* ----------------------------------------------------------
   2. DEFINE THE TOOLS OBJECT (module-level, exported so
      page.tsx can import `typeof tools` for message typing)
---------------------------------------------------------- */
export const tools = {
  scoreLead: tool({
    description: 'Scores a lead based on provided criteria',
    inputSchema: scoreLeadInputSchema,
    outputSchema: scoreLeadOutputSchema,
    execute: executeScoreLead,
  }),
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages = body.messages as UIMessage[];

    // Safety Guard
    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: 'Invalid request: "messages" must be an array.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    /* ----------------------------------------------------------
       3. PASS TOOLS INTO streamText()
    ---------------------------------------------------------- */
    const result = streamText({
      model,
      system: systemPrompt,
      messages: await convertToModelMessages(messages),
      tools,
      maxOutputTokens: 1024,
      abortSignal: req.signal,
    });

    return result.toTextStreamResponse();

  } catch (err) {
    console.error("SDK Stream Error:", err);

    return new Response(
      JSON.stringify({
        error: 'Processing error.',
        details: err instanceof Error ? err.message : String(err)
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}