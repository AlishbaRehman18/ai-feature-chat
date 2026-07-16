import { NextRequest } from 'next/server';
import { streamText, convertToModelMessages, type UIMessage } from 'ai';
import { model, systemPrompt } from '@/lib/modelConfig';

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages = body.messages as UIMessage[];

    // 1. Safety Guard: Make sure messages is a valid array
    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: 'Invalid request: "messages" must be an array.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 2. Run the stream inside the try block so variables are perfectly scoped
    const result = streamText({
      model,
      system: systemPrompt,
      messages: await convertToModelMessages(messages),
      maxOutputTokens: 1024,
      abortSignal: req.signal,
    });

    return result.toUIMessageStreamResponse();

  } catch (err) {
    // This will print the actual underlying error to your terminal window
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