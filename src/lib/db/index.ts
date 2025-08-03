import 'server-only';

import { sql } from '@vercel/postgres';
import { drizzle as pgDrizzle } from 'drizzle-orm/node-postgres';
import { drizzle as vercelDrizzle } from 'drizzle-orm/vercel-postgres';

import env from '@/env.mjs';
import * as schema from './schema';

export const db = process.env.LOCAL_DB
  ? pgDrizzle(env.POSTGRES_URL, { schema })
  : vercelDrizzle(sql, { schema });
