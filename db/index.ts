import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL as string,
  // For Supabase transaction pooling, we limit the pool size 
  // and handle potential connection issues gracefully
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,

});

export const db = drizzle(pool, { schema });

