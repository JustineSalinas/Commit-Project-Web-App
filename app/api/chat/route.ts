import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function POST(req: NextRequest) {
  try {
    const { messages, model, system } = await req.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'Missing Anthropic API Key in .env.local' },
        { status: 400 }
      );
    }

    // Convert OpenAI style messages to Anthropic style if needed,
    // though we can just pass them if they are { role: "user" | "assistant", content: string }
    const response = await anthropic.messages.create({
      model: model || "claude-3-haiku-20240307",
      max_tokens: 1024,
      system: system || "You are an expert developer assistant helping the user learn and write code.",
      messages: messages.map((m: any) => ({
        role: m.role,
        content: m.content,
      })),
    });

    // We can just extract the text blocks
    const responseContent = response.content
      .filter((block) => block.type === 'text')
      .map((block) => block.text)
      .join('\n');

    return NextResponse.json({ result: responseContent });
  } catch (error: any) {
    console.error('Claude API Error:', error);
    
    // Specific handling for Anthropic balance errors
    if (error.status === 400 && error.message?.includes('credit balance is too low')) {
      return NextResponse.json(
        { error: 'Your Anthropic API balance is zero. Please add credits at console.anthropic.com to use the AI Explainer.' },
        { status: 402 } // Payment Required
      );
    }

    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
