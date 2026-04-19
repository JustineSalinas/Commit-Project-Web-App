import { Layers, Plus } from "lucide-react";
import { FlashcardReview } from "@/components/flashcards/FlashcardReview";

export default function FlashcardsPage() {
  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#FAFAFA] flex items-center gap-2">
            <Layers className="w-6 h-6 text-[#00FFAA]" />
            Flashcards Review
          </h1>
          <p className="text-[#A1A1AA] text-sm mt-1">Master core concepts using Spaced Repetition (SM-2).</p>
        </div>
        
        <button className="flex items-center justify-center gap-2 bg-[#00FFAA] text-[#000000] px-4 py-2 rounded-md text-sm font-bold hover:bg-[#00E599] transition-colors w-full md:w-auto">
          <Plus className="w-4 h-4" /> Create Deck
        </button>
      </header>

      <div className="pt-8">
        <FlashcardReview />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
        <div className="bg-[#111113] border border-[#1A1A1F] rounded-xl p-5">
          <p className="text-[#71717A] text-xs font-bold uppercase tracking-wider mb-1">Total Cards</p>
          <p className="text-[#FAFAFA] text-2xl font-bold">342</p>
        </div>
        <div className="bg-[#111113] border border-[#1A1A1F] rounded-xl p-5">
          <p className="text-[#71717A] text-xs font-bold uppercase tracking-wider mb-1">Retention Rate</p>
          <p className="text-[#00FFAA] text-2xl font-bold">92%</p>
        </div>
        <div className="bg-[#111113] border border-[#1A1A1F] rounded-xl p-5">
          <p className="text-[#71717A] text-xs font-bold uppercase tracking-wider mb-1">Reviews Today</p>
          <p className="text-[#FAFAFA] text-2xl font-bold">28 / 42</p>
        </div>
      </div>
    </div>
  );
}
