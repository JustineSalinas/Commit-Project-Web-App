import Anthropic from '@anthropic-ai/sdk';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from 'next/server';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const { messages, model, system } = await req.json();

    // DEBUG: Check which keys the server can see
    console.log("GEMINI_KEY_PRESENT:", !!process.env.GEMINI_API_KEY);
    console.log("ANTHROPIC_KEY_PRESENT:", !!process.env.ANTHROPIC_API_KEY);

    // Prioritize Gemini if key is present (Free tier)
    if (process.env.GEMINI_API_KEY) {
      const selectedModel = model?.startsWith('gemini') ? model : "gemini-2.0-flash";
      const geminiModel = genAI.getGenerativeModel({ 
        model: selectedModel,
        systemInstruction: system || "You are an expert developer assistant helping the user learn and write code."
      });

      // Convert messages to Gemini format
      const chat = geminiModel.startChat({
        history: messages.slice(0, -1).map((m: any) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        })),
      });

      const lastMessage = messages[messages.length - 1].content;
      const result = await chat.sendMessage(lastMessage);
      const responseText = result.response.text();

      return NextResponse.json({ result: responseText });
    }

    // Fallback to Claude if no Gemini key
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'Missing AI API Keys. Please add GEMINI_API_KEY (Free) or ANTHROPIC_API_KEY to your .env.local' },
        { status: 400 }
      );
    }

    const response = await anthropic.messages.create({
      model: model || "claude-3-haiku-20240307",
      max_tokens: 1024,
      system: system || "You are an expert developer assistant helping the user learn and write code.",
      messages: messages.map((m: any) => ({
        role: m.role,
        content: m.content,
      })),
    });

    const responseContent = response.content
      .filter((block) => block.type === 'text')
      .map((block) => block.text)
      .join('\n');

    return NextResponse.json({ result: responseContent });
  } catch (error: any) {
    console.error('AI API Error:', error);
    
    // Check for common provider-specific balance/key errors
    const isBalanceError = 
      error.status === 400 && (error.message?.includes('credit balance') || error.message?.includes('insufficient'));

    if (isBalanceError) {
      return NextResponse.json(
        { error: 'Your AI provider balance is zero. Please ensure GEMINI_API_KEY is set in .env.local to use the free tier.' },
        { status: 402 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
