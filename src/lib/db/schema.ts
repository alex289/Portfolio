import { sql } from 'drizzle-orm';
import {
  integer,
  pgTableCreator,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const createTable = pgTableCreator((name) => `portfolio_${name}`);

export const views = createTable('views', {
  slug: varchar('slug', { length: 128 }).notNull().primaryKey(),
  count: integer('count').notNull().default(1),
});

export const guestbook = createTable('guestbook', {
  id: integer('id')
    .default(sql`nextval('guestbook_id_seq'::regclass)`)
    .primaryKey(),
  email: varchar('email', { length: 256 }).notNull(),
  body: varchar('body', { length: 500 }).notNull(),
  created_by: varchar('created_by', { length: 256 }).notNull(),
  created_at: timestamp('created_at', { withTimezone: false })
    .defaultNow()
    .notNull(),
  updated_at: timestamp('updated_at', { withTimezone: false })
    .defaultNow()
    .notNull(),
});
