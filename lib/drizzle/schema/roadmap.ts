// Roadmap schema — Phase 1
import { pgTable, uuid, text, integer, boolean, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { users } from "./users";

export const milestoneStatusEnum = pgEnum("milestone_status", ["not_started", "in_progress", "completed"]);

export const roadmaps = pgTable("roadmaps", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  templateId: text("template_id"), // pre-built template reference
  isPublic: boolean("is_public").default(false),
  shareToken: text("share_token").unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const roadmapMilestones = pgTable("roadmap_milestones", {
  id: uuid("id").primaryKey().defaultRandom(),
  roadmapId: uuid("roadmap_id").notNull().references(() => roadmaps.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  orderIndex: integer("order_index").notNull().default(0),
  status: milestoneStatusEnum("status").notNull().default("not_started"),
  dependsOn: uuid("depends_on").array().default([]),
  masteryScore: integer("mastery_score").default(0), // 0-100
  pomosSpent: integer("pomos_spent").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
