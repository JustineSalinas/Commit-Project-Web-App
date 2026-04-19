// SM-2 Spaced Repetition Algorithm — Phase 5A
// Based on the SuperMemo 2 (SM-2) algorithm by Piotr Wozniak

export interface CardSM2State {
  easeFactor: number;   // >= 1.3, default 2.5
  interval: number;     // days until next review
  repetitions: number;  // number of successful reviews
}

/**
 * Calculate next review state using SM-2 algorithm
 * @param card - current SM-2 state
 * @param quality - response quality: 0-5 (0=blackout, 3=correct with difficulty, 5=perfect)
 */
export function sm2(card: CardSM2State, quality: 0 | 1 | 2 | 3 | 4 | 5): CardSM2State & { nextReviewAt: Date } {
  let { easeFactor, interval, repetitions } = card;

  if (quality < 3) {
    // Incorrect response — reset repetitions and interval
    repetitions = 0;
    interval = 1;
  } else {
    // Correct response
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
  }

  // Update ease factor
  easeFactor = Math.max(
    1.3,
    easeFactor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)
  );

  const nextReviewAt = new Date();
  nextReviewAt.setDate(nextReviewAt.getDate() + interval);

  return { easeFactor, interval, repetitions, nextReviewAt };
}

/**
 * Map UI rating labels to SM-2 quality values
 */
export const QUALITY_MAP = {
  again: 0,
  hard: 2,
  good: 4,
  easy: 5,
} as const;

export type ReviewRating = keyof typeof QUALITY_MAP;
