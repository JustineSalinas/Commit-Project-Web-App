import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

// Updated to point to your secure local environment file
dotenv.config({ path: '.env.local' }); 

export default defineConfig({
  schema: './db/schema.ts',
  out: './supabase/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
