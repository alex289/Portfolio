import 'server-only';

import { type DB } from '@/types/db-types';
import { createKysely } from '@vercel/postgres-kysely';

export const queryBuilder = createKysely<DB>();
