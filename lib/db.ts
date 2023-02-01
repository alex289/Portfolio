import { guestbook, views } from '@prisma/client';
import { Generated, Kysely } from 'kysely';
import { PlanetScaleDialect } from 'kysely-planetscale';

interface Database {
  guestbook: {
    id: Generated<number>;
    created_at: Generated<Date>;
    updated_at: Generated<Date>;
  } & guestbook;
  views: {
    count: Generated<number>;
  } & views;
}

export const queryBuilder = new Kysely<Database>({
  dialect: new PlanetScaleDialect({
    url: process.env.DATABASE_URL,
  }),
});
