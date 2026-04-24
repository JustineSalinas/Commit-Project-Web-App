import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Disable prepare for Supabase Transaction Pooler compatibility
const client = postgres(process.env.DATABASE_URL as string, { 
  prepare: false,
  max: 20,
  idle_timeout: 30,
  connect_timeout: 10,
  ssl: { rejectUnauthorized: false }
});

export const db = drizzle(client, { schema });
