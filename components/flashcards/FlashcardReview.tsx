"use client";

import { useState } from "react";
import { BrainCircuit, Rotate3D, Check, X, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Flashcard {
  id: string;
  front: string;
  back: string;
  deck: string;
}

const mockCard: Flashcard = {
  id: "1",
  front: "What is the difference between useMemo and useCallback in React?",
  back: "useMemo caches the computed result of a function calculation. useCallback caches the function definition itself. Under the hood, useCallback(fn, deps) is just syntactic sugar for useMemo(() => fn, deps).",
  deck: "React Core"
};

export function FlashcardReview() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] max-w-2xl mx-auto w-full">
      <div className="w-full flex justify-between items-center mb-6 px-2">
        <span className="text-[#A1A1AA] text-sm font-medium bg-[#111113] border border-[#27272A] px-3 py-1 rounded-full">
          {mockCard.deck}
        </span>
        <span className="text-[#00FFAA] text-sm font-bold bg-[#00FFAA]/10 px-3 py-1 rounded-full">
          14 Cards Due
        </span>
      </div>

      <div 
        className="w-full perspective-1000 h-[300px] mb-8 cursor-pointer group"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={cn(
          "w-full h-full transition-all duration-500 preserve-3d relative",
          isFlipped ? "rotate-y-180" : ""
        )}>
          {/* Front */}
          <div className="absolute inset-0 backface-hidden bg-[#111113] border-2 border-[#1A1A1F] rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-lg group-hover:border-[#27272A] transition-colors">
            <BrainCircuit className="w-8 h-8 text-[#71717A] mb-6" />
            <h2 className="text-2xl font-bold text-[#FAFAFA] leading-relaxed">
              {mockCard.front}
            </h2>
            <div className="absolute bottom-6 flex items-center gap-2 text-[#71717A] text-sm">
              <Rotate3D className="w-4 h-4" /> Click to reveal
            </div>
          </div>

          {/* Back */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#18181B] border-2 border-[#00FFAA]/50 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-[0_0_20px_rgba(0,255,170,0.1)]">
            <p className="text-lg text-[#FAFAFA] leading-relaxed">
              {mockCard.back}
            </p>
          </div>
        </div>
      </div>

      {/* SM-2 Controls (Only show when flipped) */}
      <div className={cn(
        "w-full grid grid-cols-3 gap-4 transition-opacity duration-300",
        isFlipped ? "opacity-100" : "opacity-0 pointer-events-none"
      )}>
        <button 
          onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
          className="bg-[#111113] border border-[#FF4757]/30 hover:bg-[#FF4757]/10 flex flex-col items-center justify-center p-4 rounded-xl transition-colors group/btn"
        >
          <X className="w-6 h-6 text-[#FF4757] mb-2 group-hover/btn:scale-110 transition-transform" />
          <span className="text-[#FAFAFA] font-bold text-sm">Again</span>
          <span className="text-[#71717A] text-xs mt-1">&lt; 1 min</span>
        </button>

        <button 
          onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
          className="bg-[#111113] border border-[#FFB347]/30 hover:bg-[#FFB347]/10 flex flex-col items-center justify-center p-4 rounded-xl transition-colors group/btn"
        >
          <AlertTriangle className="w-6 h-6 text-[#FFB347] mb-2 group-hover/btn:scale-110 transition-transform" />
          <span className="text-[#FAFAFA] font-bold text-sm">Hard</span>
          <span className="text-[#71717A] text-xs mt-1">2 days</span>
        </button>

        <button 
          onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
          className="bg-[#111113] border border-[#00FFAA]/30 hover:bg-[#00FFAA]/10 flex flex-col items-center justify-center p-4 rounded-xl transition-colors group/btn"
        >
          <Check className="w-6 h-6 text-[#00FFAA] mb-2 group-hover/btn:scale-110 transition-transform" />
          <span className="text-[#FAFAFA] font-bold text-sm">Good</span>
          <span className="text-[#71717A] text-xs mt-1">4 days</span>
        </button>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}} />
    </div>
  );
}
