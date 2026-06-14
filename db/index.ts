import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Lazily initialize so the DB client is never created during Next.js build analysis
// (avoids the "page_client-reference-manifest.js not found" ENOENT on Vercel)
let _db: ReturnType<typeof drizzle<typeof schema>> | null = null;

function getDb() {
  if (!_db) {
    const client = postgres(process.env.DATABASE_URL as string, {
      prepare: false,
      max: 20,
      idle_timeout: 30,
      connect_timeout: 10,
      ssl: { rejectUnauthorized: false },
    });
    _db = drizzle(client, { schema });
  }
  return _db;
}

export const db = new Proxy({} as ReturnType<typeof drizzle<typeof schema>>, {
  get(_target, prop) {
    return (getDb() as any)[prop];
  },
});
