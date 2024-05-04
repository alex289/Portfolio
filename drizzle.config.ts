import dotenv from 'dotenv';
import { type Config } from 'drizzle-kit';

dotenv.config({ path: '.env.local' });

export default {
  schema: './src/lib/db/schema.ts',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL!,
  },
  tablesFilter: ['portfolio_*'],
} satisfies Config;
