import { Sparkles } from "lucide-react";
import { AIExplainer } from "@/components/ai/AIExplainer";

export default function AIPage() {
  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <header className="shrink-0 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#FAFAFA] flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#00FFAA]" />
            AI Code Explainer
          </h1>
          <p className="text-[#A1A1AA] text-sm mt-1">Get context-aware explanations for challenging concepts and code blocks.</p>
        </div>
      </header>

      <div className="flex-1 min-h-0 w-full lg:max-w-4xl mx-auto">
        <AIExplainer />
      </div>
    </div>
  );
}
