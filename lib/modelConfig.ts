// lib/modelConfig.ts
import { anthropic } from '@ai-sdk/anthropic';

// 1. Ensure 'model' is exported correctly
export const model = anthropic('claude-3-5-sonnet-20241022');

// 2. Ensure 'systemPrompt' is exported correctly
export const systemPrompt = `
  You are a helpful assistant. 
  Follow the guidelines specified in the project brief.
`;