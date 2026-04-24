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

