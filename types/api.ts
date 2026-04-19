// API request/response types — Phase 1
// Strongly typed contracts for all API routes

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PomodoroStatsResponse {
  todayCount: number;
  weekCount: number;
  totalMinutes: number;
  currentStreak: number;
}

export interface AIExplainRequest {
  code: string;
  context?: string;
  depth?: "simpler" | "deeper" | "normal";
}

export interface FlashcardReviewRequest {
  cardId: string;
  rating: "again" | "hard" | "good" | "easy";
}

export interface HeatmapDataPoint {
  date: string;       // ISO date string "2025-01-15"
  count: number;      // number of sessions
  minutes: number;    // total focus minutes
}
