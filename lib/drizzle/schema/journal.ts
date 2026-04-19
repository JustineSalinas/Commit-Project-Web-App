// Journal entries schema — Phase 1
import { pgTable, uuid, text, jsonb, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";

export const journalEntries = pgTable("journal_entries", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  milestoneId: uuid("milestone_id"), // nullable FK
  title: text("title").notNull().default("Untitled Entry"),
  content: jsonb("content"), // Tiptap JSON document
  tags: text("tags").array().default([]),
  language: text("language"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
