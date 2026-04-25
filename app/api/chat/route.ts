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

    const geminiKey = process.env.GEMINI_API_KEY;
    const anthropicKey = process.env.ANTHROPIC_API_KEY;

    // DEBUG
    console.log("GEMINI_KEY:", geminiKey ? `${geminiKey.substring(0, 4)}...` : "(not found)");
    console.log("ANTHROPIC_KEY:", anthropicKey ? `${anthropicKey.substring(0, 4)}...` : "(not found)");

    if (!geminiKey && !anthropicKey) {
      return NextResponse.json(
        { error: 'Missing AI API Keys. If you recently added GEMINI_API_KEY to .env.local, you MUST restart your development server (Ctrl+C, then npm run dev).' },
        { status: 400 }
      );
    }

    // Try Gemini if key is present
    if (geminiKey) {
      try {
        const selectedModel = model?.startsWith('gemini') ? model : "gemini-2.0-flash";
        const geminiModel = genAI.getGenerativeModel({ 
          model: selectedModel,
          systemInstruction: system || "You are an expert developer assistant helping the user learn and write code."
        });

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
      } catch (geminiError: any) {
        console.error("Gemini Error:", geminiError);
        // If Gemini fails, don't fall back to Anthropic unless we explicitly want to.
        // Just return the Gemini error so the user knows what actually failed.
        return NextResponse.json(
          { error: `Gemini API Error: ${geminiError.message || 'Unknown error'}` },
          { status: 500 }
        );
      }
    }

    // Fallback to Claude only if Gemini key is missing and Anthropic key is present
    try {
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
    } catch (anthropicError: any) {
      console.error("Anthropic Error:", anthropicError);
      const isBalanceError = anthropicError.status === 400 && (anthropicError.message?.includes('credit balance') || anthropicError.message?.includes('insufficient'));

      if (isBalanceError) {
        return NextResponse.json(
          { error: 'Your Anthropic balance is zero. Please use GEMINI_API_KEY instead, or add credits.' },
          { status: 402 }
        );
      }
      return NextResponse.json(
        { error: `Anthropic API Error: ${anthropicError.message || 'Unknown error'}` },
        { status: 500 }
      );
    }

  } catch (error: any) {
    console.error('AI Route Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
