// Code Snippet Library schema — Phase 1
import { pgTable, uuid, text, integer, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";

export const snippets = pgTable("snippets", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  journalEntryId: uuid("journal_entry_id"), // nullable FK
  title: text("title").notNull(),
  code: text("code").notNull(),
  language: text("language").notNull(),
  tags: text("tags").array().default([]),
  description: text("description"),
  useCount: integer("use_count").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
