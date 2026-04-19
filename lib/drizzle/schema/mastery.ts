// Concept Mastery Tracker schema — Phase 1
import { pgTable, uuid, text, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { users } from "./users";

export const masteryLevelEnum = pgEnum("mastery_level", [
  "heard_of",       // Level 1: Heard of It
  "can_explain",    // Level 2: Can Explain It
  "can_use",        // Level 3: Can Use It
  "can_teach",      // Level 4: Can Teach It
]);

export const conceptMastery = pgTable("concept_mastery", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  milestoneId: uuid("milestone_id"),
  conceptName: text("concept_name").notNull(),
  level: masteryLevelEnum("level").notNull().default("heard_of"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
