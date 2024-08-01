import { defineConfig, Config } from 'drizzle-kit';
// import * as dotenv from "dotenv";

// dotenv.config();

// if (!process.env.DATABASE_URL) throw new Error('NEON DATABASE_URL not found in environment');

export default defineConfig({
  schema: './db/schema.ts',
  out: './db/migrate',
  dialect: 'postgresql', // 'postgresql' | 'mysql' | 'sqlite'
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  strict: true,
}) satisfies Config;