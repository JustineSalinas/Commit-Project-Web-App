// Database types — inferred from Drizzle schema — Phase 1
// These are generated from the schema files
import type { InferSelectModel, InferInsertModel } from "drizzle-orm";
import type {
  users,
  pomodoroSessions,
  journalEntries,
  roadmaps,
  roadmapMilestones,
  flashcardDecks,
  flashcards,
  tilEntries,
  bugEntries,
  snippets,
  conceptMastery,
} from "@/lib/drizzle/schema";

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

export type PomodoroSession = InferSelectModel<typeof pomodoroSessions>;
export type NewPomodoroSession = InferInsertModel<typeof pomodoroSessions>;

export type JournalEntry = InferSelectModel<typeof journalEntries>;
export type NewJournalEntry = InferInsertModel<typeof journalEntries>;

export type Roadmap = InferSelectModel<typeof roadmaps>;
export type NewRoadmap = InferInsertModel<typeof roadmaps>;

export type RoadmapMilestone = InferSelectModel<typeof roadmapMilestones>;
export type NewRoadmapMilestone = InferInsertModel<typeof roadmapMilestones>;

export type FlashcardDeck = InferSelectModel<typeof flashcardDecks>;
export type Flashcard = InferSelectModel<typeof flashcards>;
export type NewFlashcard = InferInsertModel<typeof flashcards>;

export type TILEntry = InferSelectModel<typeof tilEntries>;
export type NewTILEntry = InferInsertModel<typeof tilEntries>;

export type BugEntry = InferSelectModel<typeof bugEntries>;
export type NewBugEntry = InferInsertModel<typeof bugEntries>;

export type Snippet = InferSelectModel<typeof snippets>;
export type NewSnippet = InferInsertModel<typeof snippets>;

export type ConceptMastery = InferSelectModel<typeof conceptMastery>;
export type NewConceptMastery = InferInsertModel<typeof conceptMastery>;
