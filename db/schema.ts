import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

// A simple test table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name'),
  email: text('email').unique().notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});
