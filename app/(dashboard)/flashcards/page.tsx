"use client";

import { useState } from "react";
import { Layers, RotateCcw, ThumbsUp, ThumbsDown } from "lucide-react";

export default function FlashcardsPage() {
  const [flipped, setFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const cards = [
    { q: "What is Zustand?", a: "A small, fast and scalable bearbones state-management solution using simplified flux principles." },
    { q: "What is Drizzle ORM?", a: "A headless TypeScript ORM that runs on Edge and Node, heavily focusing on SQL-like syntax." },
    { q: "Difference between useLayoutEffect and useEffect?", a: "useLayoutEffect fires synchronously after all DOM mutations. useEffect fires asynchronously after render." }
  ];

  const nextCard = () => {
    setFlipped(false);
    setTimeout(() => {
      setCurrentIndex((i) => (i + 1) % cards.length);
    }, 150);
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      <header>
        <h1 className="text-2xl font-bold flex items-center gap-2 text-[var(--text-primary)]">
          <Layers className="w-6 h-6 text-[var(--accent)]" />
          Spaced Repetition
        </h1>
        <p className="text-[var(--text-secondary)] text-sm mt-1">Review active concepts to commit them to long-term memory.</p>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center -mt-12">
        <div className="text-sm font-bold text-[var(--text-secondary)] mb-4 tracking-widest uppercase">
          Reviewing {currentIndex + 1} of {cards.length}
        </div>
        
        {/* Card Component */}
        <div 
          className="relative w-full max-w-2xl h-80 perspective-1000 cursor-pointer"
          onClick={() => setFlipped(!flipped)}
        >
          <div className={`w-full h-full transition-transform duration-500 transform-style-3d ${flipped ? 'rotate-y-180' : ''}`}>
            
            {/* Front */}
            <div className={`absolute w-full h-full bg-[var(--bg-elevated)] border border-[var(--border)] rounded-2xl p-8 flex flex-col items-center justify-center backface-hidden ${flipped ? 'opacity-0' : 'opacity-100'}`}>
              <span className="text-[var(--accent)] font-bold mb-4 tracking-widest uppercase text-xs">Question</span>
              <h2 className="text-3xl font-bold text-center text-[var(--text-primary)]">{cards[currentIndex].q}</h2>
              <p className="absolute bottom-6 text-[#71717A] text-sm flex items-center gap-2"><RotateCcw className="w-4 h-4"/> Click to flip</p>
            </div>

            {/* Back */}
            <div className={`absolute w-full h-full bg-[var(--bg-elevated)] border-2 border-[var(--accent)] rounded-2xl p-8 flex flex-col items-center justify-center backface-hidden rotate-y-180 ${!flipped ? 'opacity-0' : 'opacity-100'}`}>
              <span className="text-[var(--accent)] font-bold mb-4 tracking-widest uppercase text-xs">Answer</span>
              <p className="text-xl text-center text-[var(--text-primary)] leading-relaxed">{cards[currentIndex].a}</p>
            </div>

          </div>
        </div>

        {/* Action Bar */}
        <div className={`mt-12 flex gap-4 transition-opacity duration-300 ${flipped ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <button onClick={nextCard} className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border)] text-red-400 hover:bg-red-500/10 hover:border-red-500/50 transition-all font-bold">
            <ThumbsDown className="w-5 h-5" /> Hard
          </button>
          <button onClick={nextCard} className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--accent)] text-black hover:brightness-110 transition-all font-bold">
            <ThumbsUp className="w-5 h-5" /> Got it
          </button>
        </div>
      </div>
    </div>
  );
}
