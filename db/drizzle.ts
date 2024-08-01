import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { tasks } from './schema';

export const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, {
  schema: {
    tasks,
  },
});

// const result = await db.select().from(...);


