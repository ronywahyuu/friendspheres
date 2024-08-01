import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const tasks = pgTable('task',{
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  completed: boolean("completed").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
})

export type Task = typeof tasks.$inferSelect;
export type TaskInsert = typeof tasks.$inferInsert;