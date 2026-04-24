"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Layers, RotateCcw, ThumbsUp, ThumbsDown, Plus } from "lucide-react";
import { addFlashcard, updateFlashcardScore } from "@/app/actions/crud";

export default function FlashcardsClient({ initialCards }: { initialCards: any[] }) {
  const router = useRouter();
  const [flipped, setFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question || !answer || saving) return;
    setSaving(true);
    setError("");
    
    const result = await addFlashcard({ question, answer });
    setSaving(false);
    
    if (result.success) {
      setIsModalOpen(false);
      setQuestion("");
      setAnswer("");
      router.refresh();
    } else {
      setError(result.error || "Failed to save");
    }
  };

  const handleScore = async (change: number) => {
    const card = initialCards[currentIndex];
    if (card) {
      const result = await updateFlashcardScore(card.id, change);
      if (result.success) {
        router.refresh();
      }
    }
    setFlipped(false);
    setTimeout(() => {
      setCurrentIndex((i) => (i + 1) % initialCards.length);
    }, 150);
  };

  return (
    <div className="h-full flex flex-col space-y-6 relative">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2 text-[var(--text-primary)]">
            <Layers className="w-6 h-6 text-[var(--accent)]" />
            Spaced Repetition
          </h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">Review active concepts to commit them to long-term memory.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-[var(--accent)] text-black px-4 py-2 rounded-lg font-bold hover:brightness-110 transition-all">
          <Plus className="w-4 h-4" /> Add Card
        </button>
      </header>

      {/* Modal overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-[var(--bg-elevated)] border border-[var(--border)] p-6 rounded-xl w-full max-w-lg shadow-2xl">
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Create Flashcard</h2>
            {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-3 py-2 rounded-md mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[var(--text-secondary)] uppercase">Front (Question)</label>
                <input autoFocus type="text" value={question} onChange={(e) => setQuestion(e.target.value)} className="w-full bg-[var(--bg-base)] border border-[var(--border)] rounded-md px-3 py-2 mt-1 text-[var(--text-primary)] focus:border-[var(--accent)] outline-none" placeholder="What is a closure in JS?" />
              </div>
              <div>
                <label className="text-xs font-bold text-[var(--text-secondary)] uppercase">Back (Answer)</label>
                <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} className="w-full bg-[var(--bg-base)] border border-[var(--border)] rounded-md px-3 py-2 mt-1 text-[var(--text-primary)] focus:border-[var(--accent)] outline-none h-24 resize-none" placeholder="A function bundled with its lexical environment..." />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border)]">
                <button type="button" onClick={() => { setIsModalOpen(false); setError(""); }} className="px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-bold">Cancel</button>
                <button type="submit" disabled={saving} className="px-4 py-2 bg-[var(--accent)] text-black rounded-lg font-bold hover:brightness-110 disabled:opacity-50">{saving ? "Saving..." : "Save Card"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {initialCards.length === 0 ? (
        <div className="text-center text-[var(--text-secondary)] py-20 border border-dashed border-[var(--border)] rounded-xl flex-1 flex flex-col justify-center items-center">
          <Layers className="w-12 h-12 mb-3 opacity-20" />
          <p>You have no pending flashcards. Add some manually or generate them from your TILs.</p>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center -mt-12">
          <div className="text-sm font-bold text-[var(--text-secondary)] mb-4 tracking-widest uppercase">
            Reviewing {currentIndex + 1} of {initialCards.length}
          </div>
          <div className="text-xs text-[var(--text-secondary)] mb-4 bg-[var(--bg-elevated)] border border-[var(--border)] px-3 py-1 rounded-full">
            Knowledge retention score: <span className="text-[var(--accent)] font-bold">{initialCards[currentIndex]?.score || 0}</span>
          </div>
          
          <div className="relative w-full max-w-2xl min-h-[320px] perspective-1000 cursor-pointer" onClick={() => setFlipped(!flipped)}>
            <div className={`absolute inset-0 w-full h-full transition-transform duration-500 transform-style-3d ${flipped ? 'rotate-y-180' : ''}`}>
              
              {/* Front */}
              <div className={`absolute w-full h-full bg-[var(--bg-elevated)] border border-[var(--border)] shadow-xl rounded-2xl p-10 flex flex-col items-center justify-center backface-hidden transition-opacity ${flipped ? 'opacity-0' : 'opacity-100'}`}>
                <span className="text-[var(--accent)] font-bold mb-4 tracking-widest uppercase text-xs">Side A</span>
                <h2 className="text-3xl font-bold text-center text-[var(--text-primary)] font-serif leading-tight">{initialCards[currentIndex]?.question}</h2>
                <p className="absolute bottom-6 text-[var(--text-muted)] text-sm flex items-center gap-2"><RotateCcw className="w-4 h-4"/> Click to reveal</p>
              </div>

              {/* Back */}
              <div className={`absolute w-full h-full bg-[var(--bg-elevated)] border-2 border-[var(--accent)] shadow-[0_0_30px_rgba(0,255,170,0.1)] rounded-2xl p-10 flex flex-col items-center justify-center backface-hidden rotate-y-180 transition-opacity ${!flipped ? 'opacity-0' : 'opacity-100'}`}>
                <span className="text-[var(--accent)] font-bold mb-4 tracking-widest uppercase text-xs">Side B</span>
                <p className="text-xl text-center text-[var(--text-primary)] leading-relaxed whitespace-pre-wrap">{initialCards[currentIndex]?.answer}</p>
              </div>

            </div>
          </div>

          {/* Action Bar */}
          <div className={`mt-12 flex gap-4 transition-opacity duration-300 ${flipped ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <button onClick={(e) => { e.stopPropagation(); handleScore(-1); }} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border)] text-red-500 hover:bg-red-500/10 hover:border-red-500/30 transition-all font-bold shadow-sm">
              <ThumbsDown className="w-5 h-5" /> Forgot
            </button>
            <button onClick={(e) => { e.stopPropagation(); handleScore(1); }} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--accent)] text-black border border-transparent shadow-[0_4px_14px_0_rgba(0,255,170,0.39)] hover:shadow-[0_6px_20px_rgba(0,255,170,0.23)] hover:brightness-110 transition-all font-bold">
              <ThumbsUp className="w-5 h-5" /> Remembered
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
