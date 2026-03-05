import { pgTableCreator, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const createTable = pgTableCreator((name) => `portfolio_${name}`);

export const guestbook = createTable('guestbook', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  email: varchar('email', { length: 256 }).notNull(),
  body: varchar('body', { length: 500 }).notNull(),
  created_by: varchar('created_by', { length: 256 }).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
});
