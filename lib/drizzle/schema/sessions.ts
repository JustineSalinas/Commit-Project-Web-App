// Pomodoro sessions schema — Phase 1
import { pgTable, uuid, integer, boolean, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { users } from "./users";

export const sessionTypeEnum = pgEnum("session_type", ["focus", "short_break", "long_break"]);

export const pomodoroSessions = pgTable("pomodoro_sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  startedAt: timestamp("started_at").notNull(),
  endedAt: timestamp("ended_at"),
  durationMins: integer("duration_mins").notNull().default(25),
  sessionType: sessionTypeEnum("session_type").notNull().default("focus"),
  milestoneId: uuid("milestone_id"), // FK to roadmap_milestones (added after roadmap schema)
  tilLogged: boolean("til_logged").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
