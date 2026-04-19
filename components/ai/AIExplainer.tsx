import { Bot, Send, Settings2, Sparkles } from "lucide-react";

export function AIExplainer() {
  return (
    <div className="flex flex-col h-full bg-[#111113] border border-[#1A1A1F] rounded-xl overflow-hidden">
      {/* Header & Controls */}
      <div className="flex items-center justify-between p-4 border-b border-[#1A1A1F] bg-[#09090B]">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-[#00FFAA]" />
          <h2 className="font-bold text-[#FAFAFA]">Claude Explainer</h2>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex bg-[#111113] border border-[#27272A] rounded-md p-1">
            <button className="px-3 py-1 text-xs font-medium rounded-sm text-[#71717A] hover:text-[#FAFAFA] transition-colors">ELI5</button>
            <button className="px-3 py-1 text-xs font-medium rounded-sm bg-[#18181B] text-[#FAFAFA]">Standard</button>
            <button className="px-3 py-1 text-xs font-medium rounded-sm text-[#71717A] hover:text-[#FAFAFA] transition-colors">Deep Dive</button>
          </div>
          <button className="p-1.5 text-[#71717A] hover:text-[#FAFAFA] transition-colors">
            <Settings2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chat History Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* User Message */}
        <div className="flex justify-end">
          <div className="bg-[#18181B] border border-[#27272A] text-[#FAFAFA] px-4 py-3 rounded-2xl rounded-tr-sm max-w-[80%] text-sm">
            Can you explain how Zustand differs from Redux?
          </div>
        </div>

        {/* AI Message */}
        <div className="flex gap-4 max-w-[90%]">
          <div className="w-8 h-8 rounded-full bg-[#00FFAA]/10 border border-[#00FFAA]/20 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-[#00FFAA]" />
          </div>
          <div className="space-y-3 pt-1">
            <p className="text-[#A1A1AA] text-sm leading-relaxed">
              Zustand and Redux both help manage global state in React apps, but they take very different approaches. Here's a breakdown at a standard technical depth:
            </p>
            
            <div className="bg-[#09090B] border border-[#27272A] rounded-lg p-4 font-mono text-xs text-[#FAFAFA]">
              // Zustand is fundamentally un-opinionated.<br/>
              // You create a store...<br/>
              const useStore = create((set) ={'>'} ({"{ count: 0 }"}));<br/><br/>
              // ...and bind it anywhere.<br/>
              const count = useStore((state) ={'>'} state.count);
            </div>
            
            <ul className="space-y-2 text-[#A1A1AA] text-sm">
              <li><strong className="text-[#FAFAFA]">1. Boilerplate:</strong> Zustand eliminates actions, reducers, and dispatch wrappers.</li>
              <li><strong className="text-[#FAFAFA]">2. Provider Wrapping:</strong> Zustand doesn't require Context Providers.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-[#09090B] border-t border-[#1A1A1F]">
        <div className="relative flex items-end gap-2 bg-[#111113] border border-[#27272A] rounded-xl p-2 focus-within:border-[#00FFAA] transition-colors">
          <textarea 
            placeholder="Ask Claude to explain a concept or debug a code block..."
            className="flex-1 bg-transparent text-sm text-[#FAFAFA] placeholder:text-[#71717A] p-2 max-h-32 min-h-[44px] resize-none focus:outline-none"
            rows={1}
          />
          <button className="shrink-0 w-10 h-10 bg-[#00FFAA] hover:bg-[#00E599] rounded-lg flex items-center justify-center transition-colors mb-[2px]">
            <Send className="w-4 h-4 text-[#000000]" />
          </button>
        </div>
        <p className="text-center text-[#71717A] text-xs mt-3">
          AI Explainer uses Claude 3.5 Sonnet to provide context-aware insights.
        </p>
      </div>
    </div>
  );
}
