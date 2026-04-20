"use client";

import { useState } from "react";
import { Bot, Send, Sparkles } from "lucide-react";
import { useSettingsStore } from "@/lib/store/useSettingsStore";

export default function AITab() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! I'm your AI learning assistant powered by Claude. What code concept would you like me to explain today?" }
  ]);
  const [input, setInput] = useState("");
  const aiModel = useSettingsStore(state => state.aiModel);

  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          model: aiModel === "claude-opus-4" ? "claude-3-opus-20240229" 
               : aiModel === "claude-sonnet-4" ? "claude-3-sonnet-20240229" 
               : "claude-3-haiku-20240307",
        }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to communicate with the assistant");
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.result }]);
    } catch (error: any) {
      setMessages((prev) => [...prev, { role: "assistant", content: error.message }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      <header className="flex items-center justify-between pb-2">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2 text-[var(--text-primary)]">
            <Bot className="w-6 h-6 text-[var(--accent)]" />
            AI Explainer
          </h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">Chat contextually about your journal entries, bugs, and snippets.</p>
        </div>
        <div className="bg-[var(--bg-elevated)] border border-[var(--border)] px-3 py-1.5 rounded-full text-xs font-medium text-[var(--text-secondary)] flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-[var(--accent)]" /> 
          {aiModel === 'claude-sonnet-4' ? 'Sonnet 3.5' : aiModel === 'claude-opus-4' ? 'Opus 4' : 'Haiku'}
        </div>
      </header>

      <div className="flex-1 bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-4 max-w-[80%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-[var(--bg-surface)] border border-[var(--border)]' : 'bg-[var(--accent)]/10 border border-[var(--accent)]/30 text-[var(--accent)]'}`}>
                {msg.role === 'user' ? <div className="w-4 h-4 bg-[var(--text-secondary)] rounded-full" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`p-4 rounded-2xl ${msg.role === 'user' ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-tr-sm' : 'bg-[var(--bg-base)] border border-[var(--border)] text-[var(--text-secondary)] rounded-tl-sm'}`}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-[var(--bg-surface)] border-t border-[var(--border)]">
          <form onSubmit={handleSend} className="relative flex items-center">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              placeholder={isLoading ? "Thinking..." : "Ask me to explain a concept or debug an error..."}
              className="w-full bg-[var(--bg-base)] border border-[var(--border)] rounded-xl pl-4 pr-12 py-3 text-sm focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] outline-none text-[var(--text-primary)] disabled:opacity-50"
            />
            <button type="submit" disabled={!input.trim() || isLoading} className="absolute right-2 p-2 bg-[var(--accent)] text-black rounded-lg hover:brightness-110 transition-all disabled:opacity-50 disabled:hover:brightness-100">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
