import 'server-only';

import { sql } from '@vercel/postgres';
import { drizzle as pgDrizzle } from 'drizzle-orm/node-postgres';
import { drizzle as vercelDrizzle } from 'drizzle-orm/vercel-postgres';

import * as schema from './schema';

export const db = process.env.LOCAL_DB
  ? pgDrizzle(sql, { schema })
  : vercelDrizzle(sql, { schema });
