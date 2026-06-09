"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Layers, RotateCcw, Plus, RefreshCw } from "lucide-react";
import { addFlashcard, reviewFlashcard } from "@/app/actions/crud";

type Rating = 'again' | 'hard' | 'good' | 'easy';

const RATING_CONFIG: Record<Rating, { label: string; color: string; bg: string; border: string; delta: string }> = {
  again: { label: "Again",     color: "text-red-400",             bg: "bg-red-500/10",            border: "border-red-500/30",       delta: "<1d"  },
  hard:  { label: "Hard",      color: "text-orange-400",          bg: "bg-orange-500/10",         border: "border-orange-500/30",    delta: "~1d"  },
  good:  { label: "Good",      color: "text-[var(--info)]",       bg: "bg-[var(--info)]/10",      border: "border-[var(--info)]/30", delta: "~3d"  },
  easy:  { label: "Easy",      color: "text-[var(--accent)]",     bg: "bg-[var(--accent)]/10",    border: "border-[var(--accent)]/30", delta: "~1w" },
};

export default function FlashcardsClient({ initialCards }: { initialCards: any[] }) {
  const router = useRouter();
  const [flipped, setFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [rating, setRating] = useState<string | null>(null);

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

  const handleRate = async (r: Rating) => {
    const card = initialCards[currentIndex];
    if (!card) return;
    setRating(r);
    await reviewFlashcard(card.id, r);
    setFlipped(false);
    setRating(null);
    setTimeout(() => {
      setCurrentIndex(i => (i + 1) % initialCards.length);
    }, 150);
    router.refresh();
  };

  const card = initialCards[currentIndex];

  return (
    <div className="h-full flex flex-col space-y-6 relative">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2 text-[var(--text-primary)]">
            <Layers className="w-6 h-6 text-[var(--accent)]" />
            Spaced Repetition
          </h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">
            SM-2 algorithm — cards surface when you need them most.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[var(--accent)] text-black px-4 py-2 rounded-lg font-bold hover:brightness-110 transition-all"
        >
          <Plus className="w-4 h-4" /> Add Card
        </button>
      </header>

      {/* Add Card Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-[var(--bg-elevated)] border border-[var(--border)] p-6 rounded-xl w-full max-w-lg shadow-2xl">
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Create Flashcard</h2>
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-3 py-2 rounded-md mb-4">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[var(--text-secondary)] uppercase">Front (Question)</label>
                <input
                  autoFocus
                  type="text"
                  value={question}
                  onChange={e => setQuestion(e.target.value)}
                  className="w-full bg-[var(--bg-base)] border border-[var(--border)] rounded-md px-3 py-2 mt-1 text-[var(--text-primary)] focus:border-[var(--accent)] outline-none"
                  placeholder="What is a closure in JS?"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[var(--text-secondary)] uppercase">Back (Answer)</label>
                <textarea
                  value={answer}
                  onChange={e => setAnswer(e.target.value)}
                  className="w-full bg-[var(--bg-base)] border border-[var(--border)] rounded-md px-3 py-2 mt-1 text-[var(--text-primary)] focus:border-[var(--accent)] outline-none h-24 resize-none"
                  placeholder="A function bundled with its lexical environment..."
                />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border)]">
                <button
                  type="button"
                  onClick={() => { setIsModalOpen(false); setError(""); }}
                  className="px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-[var(--accent)] text-black rounded-lg font-bold hover:brightness-110 disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Card"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {initialCards.length === 0 ? (
        <div className="text-center text-[var(--text-secondary)] py-20 border border-dashed border-[var(--border)] rounded-xl flex-1 flex flex-col justify-center items-center">
          <Layers className="w-12 h-12 mb-3 opacity-20" />
          <p>No flashcards yet. Add some to start reviewing.</p>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center -mt-6">
          {/* Progress */}
          <div className="text-sm font-bold text-[var(--text-secondary)] mb-3 tracking-widest uppercase">
            Card {currentIndex + 1} of {initialCards.length}
          </div>

          {/* SM-2 stats */}
          {card && (
            <div className="flex items-center gap-3 mb-4 text-xs text-[var(--text-muted)]">
              <span className="bg-[var(--bg-elevated)] border border-[var(--border)] px-2.5 py-1 rounded-full">
                EF: <span className="text-[var(--text-secondary)] font-mono">{(card.easeFactor ?? 2.5).toFixed(2)}</span>
              </span>
              <span className="bg-[var(--bg-elevated)] border border-[var(--border)] px-2.5 py-1 rounded-full">
                Interval: <span className="text-[var(--text-secondary)] font-mono">{card.interval ?? 1}d</span>
              </span>
              <span className="bg-[var(--bg-elevated)] border border-[var(--border)] px-2.5 py-1 rounded-full">
                Reviews: <span className="text-[var(--text-secondary)] font-mono">{card.reviewCount ?? 0}</span>
              </span>
            </div>
          )}

          {/* Flashcard */}
          <div
            className="relative w-full max-w-2xl min-h-[300px] perspective-1000 cursor-pointer"
            onClick={() => setFlipped(!flipped)}
          >
            <div className={`absolute inset-0 w-full h-full transition-transform duration-500 transform-style-3d ${flipped ? "rotate-y-180" : ""}`}>
              {/* Front */}
              <div className={`absolute w-full h-full bg-[var(--bg-elevated)] border border-[var(--border)] shadow-xl rounded-2xl p-10 flex flex-col items-center justify-center backface-hidden transition-opacity ${flipped ? "opacity-0" : "opacity-100"}`}>
                <span className="text-[var(--accent)] font-bold mb-4 tracking-widest uppercase text-xs">Question</span>
                <h2 className="text-2xl font-bold text-center text-[var(--text-primary)] leading-tight">
                  {card?.question}
                </h2>
                <p className="absolute bottom-6 text-[var(--text-muted)] text-sm flex items-center gap-2">
                  <RotateCcw className="w-4 h-4" /> Click to reveal answer
                </p>
              </div>

              {/* Back */}
              <div className={`absolute w-full h-full bg-[var(--bg-elevated)] border-2 border-[var(--accent)] shadow-[0_0_30px_rgba(0,255,170,0.1)] rounded-2xl p-10 flex flex-col items-center justify-center backface-hidden rotate-y-180 transition-opacity ${!flipped ? "opacity-0" : "opacity-100"}`}>
                <span className="text-[var(--accent)] font-bold mb-4 tracking-widest uppercase text-xs">Answer</span>
                <p className="text-lg text-center text-[var(--text-primary)] leading-relaxed whitespace-pre-wrap">
                  {card?.answer}
                </p>
              </div>
            </div>
          </div>

          {/* SM-2 Rating Buttons */}
          <div className={`mt-10 transition-opacity duration-300 ${flipped ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            <p className="text-xs text-[var(--text-muted)] text-center mb-3 uppercase tracking-widest font-bold">How well did you recall this?</p>
            <div className="flex gap-3">
              {(["again", "hard", "good", "easy"] as Rating[]).map(r => {
                const cfg = RATING_CONFIG[r];
                return (
                  <button
                    key={r}
                    onClick={e => { e.stopPropagation(); handleRate(r); }}
                    disabled={!!rating}
                    className={`flex flex-col items-center gap-1 px-5 py-3 rounded-xl border font-bold text-sm transition-all disabled:opacity-50 ${cfg.color} ${cfg.bg} ${cfg.border} hover:brightness-125`}
                  >
                    {cfg.label}
                    <span className="text-[10px] font-mono opacity-60">{cfg.delta}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
