import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// Course schema
export const courses = sqliteTable('courses', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  category: text('category').notNull(),
  description: text('description'),
  duration: integer('duration'), // in hours
  instructor: text('instructor'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date())
});

export type Course = typeof courses.$inferSelect;
