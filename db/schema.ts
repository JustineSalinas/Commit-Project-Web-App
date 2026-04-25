import { pgTable, serial, text, timestamp, boolean, integer, json } from 'drizzle-orm/pg-core';

export const profiles = pgTable('profiles', {
  id: serial('id').primaryKey(),
  clerkId: text('clerk_id').unique().notNull(), // Clerk User ID
  name: text('name'),
  email: text('email').unique().notNull(),
  title: text('title'),
  bio: text('bio'),
  hasCompletedOnboarding: boolean('has_completed_onboarding').default(false),
  preferences: json('preferences').$type<{
    preferredIDE?: string;
    languages?: string[];
    workflow?: string;
    theme?: string;
    aiEnabled?: boolean;
    notifications?: boolean;
  }>(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const focusSessions = pgTable('focus_sessions', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  durationMinutes: integer('duration_minutes').notNull(),
  focusType: text('focus_type'), // pomodoro, short_break, deep_work
  createdAt: timestamp('created_at').defaultNow(),
});

export const tils = pgTable('tils', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  tags: json('tags').$type<string[]>(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const flashcards = pgTable('flashcards', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  question: text('question').notNull(),
  answer: text('answer').notNull(),
  score: integer('score').default(0), // Basic SRS stat
  lastReviewed: timestamp('last_reviewed'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const bugs = pgTable('bugs', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  status: text('status').default('open'), // open, resolved
  createdAt: timestamp('created_at').defaultNow(),
});

export const snippets = pgTable('snippets', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  title: text('title').notNull(),
  code: text('code').notNull(),
  language: text('language'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const roadmap = pgTable('roadmap', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  status: text('status').default('pending'), // pending, in-progress, complete
  order: integer('order').default(0), // For dependency chains
  subGoals: json('sub_goals').$type<{ title: string; completed: boolean }[]>(),
  linkedConcept: text('linked_concept'),
  linkedJournalId: integer('linked_journal_id'),
  pomosSpent: integer('pomos_spent').default(0),
  createdAt: timestamp('created_at').defaultNow(),
});

export const journals = pgTable('journals', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// --- NEW TABLES FOR V2 FEATURES ---

export const tasks = pgTable('tasks', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  estimatedPomos: integer('estimated_pomos').default(1),
  actualPomos: integer('actual_pomos').default(0),
  status: text('status').default('todo'), // 'todo' | 'in-progress' | 'done'
  notes: text('notes').default(''),
  createdAt: timestamp('created_at').defaultNow(),
});

export const sessionLogs = pgTable('session_logs', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  taskId: text('task_id'), // Removed strict foreign key to avoid breaking if task is deleted loosely
  taskTitle: text('task_title'),
  commitMessage: text('commit_message').notNull(),
  duration: integer('duration').notNull(),
  timestamp: timestamp('timestamp').defaultNow(),
  timezone: text('timezone'),
});

export const distractions = pgTable('distractions', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  content: text('content').notNull(),
  resolved: boolean('resolved').default(false),
  timestamp: timestamp('timestamp').defaultNow(),
});

export const mastery = pgTable('mastery', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  concept: text('concept').notNull(),
  level: integer('level').default(1), // 1: Heard of It, 2: Can Explain It, 3: Can Use It, 4: Can Teach It
  createdAt: timestamp('created_at').defaultNow(),
});
