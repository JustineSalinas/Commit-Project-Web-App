// Bug & Error Journal schema — Phase 1
import { pgTable, uuid, text, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { users } from "./users";

export const bugStatusEnum = pgEnum("bug_status", ["open", "resolved"]);

export const bugEntries = pgTable("bug_entries", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  milestoneId: uuid("milestone_id"),
  errorMessage: text("error_message").notNull(),
  rootCause: text("root_cause"),
  fixApplied: text("fix_applied"),
  conceptTag: text("concept_tag"),
  language: text("language"),
  status: bugStatusEnum("status").notNull().default("open"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
