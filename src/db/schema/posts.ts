import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { InferModel } from 'drizzle-orm';
import { users } from './users';

export const posts = sqliteTable('posts', {
  id: integer('id').primaryKey({
    autoIncrement: true,
  }),
  authorId: integer('authorId')
    .notNull()
    .references(() => users.id),
  title: text('title').notNull(),
  content: text('content').notNull(),
});

export type Posts = InferModel<typeof posts>;
export type InsertPosts = InferModel<typeof posts, 'insert'>;
