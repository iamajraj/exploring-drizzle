import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { InferModel } from 'drizzle-orm';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({
    autoIncrement: true,
  }),
  name: text('name', {
    length: 255,
  }).notNull(),
  age: integer('age').notNull(),
});

export type User = InferModel<typeof users>;
export type InsertUser = InferModel<typeof users, 'insert'>;
