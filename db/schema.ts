import { pgTable, serial, text, timestamp, boolean, integer, json, real } from 'drizzle-orm/pg-core';

export const profiles = pgTable('profiles', {
  id: serial('id').primaryKey(),
  clerkId: text('clerk_id').unique().notNull(),
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
  // Billing
  plan: text('plan').default('free'),
  subscriptionStatus: text('subscription_status').default('free'),
  stripeCustomerId: text('stripe_customer_id'),
  stripeSubscriptionId: text('stripe_subscription_id'),
  paymongoCustomerId: text('paymongo_customer_id'),
  planExpiresAt: timestamp('plan_expires_at'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const focusSessions = pgTable('focus_sessions', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  durationMinutes: integer('duration_minutes').notNull(),
  focusType: text('focus_type'),
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
  score: integer('score').default(0),
  lastReviewed: timestamp('last_reviewed'),
  // SM-2 spaced repetition fields
  easeFactor: real('ease_factor').default(2.5),
  interval: integer('interval').default(1),
  dueDate: timestamp('due_date').defaultNow(),
  reviewCount: integer('review_count').default(0),
  createdAt: timestamp('created_at').defaultNow(),
});

export const bugs = pgTable('bugs', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  status: text('status').default('open'),
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
  status: text('status').default('pending'),
  order: integer('order').default(0),
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

export const tasks = pgTable('tasks', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  estimatedPomos: integer('estimated_pomos').default(1),
  actualPomos: integer('actual_pomos').default(0),
  status: text('status').default('todo'),
  notes: text('notes').default(''),
  createdAt: timestamp('created_at').defaultNow(),
});

export const sessionLogs = pgTable('session_logs', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  taskId: text('task_id'),
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
  level: integer('level').default(1),
  createdAt: timestamp('created_at').defaultNow(),
});

export const teams = pgTable('teams', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  ownerId: text('owner_id').notNull(),
  subscriptionStatus: text('subscription_status').default('free'),
  stripeCustomerId: text('stripe_customer_id'),
  stripeSubscriptionId: text('stripe_subscription_id'),
  paymongoCustomerId: text('paymongo_customer_id'),
  planExpiresAt: timestamp('plan_expires_at'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const teamMembers = pgTable('team_members', {
  id: serial('id').primaryKey(),
  teamId: integer('team_id').notNull(),
  clerkId: text('clerk_id').notNull(),
  role: text('role').default('member'),
  joinedAt: timestamp('joined_at').defaultNow(),
});
