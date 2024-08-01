import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { Hono } from "hono";
import { authMiddleware, checkAuth } from "./route";
import { currentUser } from "@clerk/nextjs/server";
import { swaggerUI } from "@hono/swagger-ui";
import { HTTPException } from "hono/http-exception";
import { db } from "@/db/drizzle";
import { tasks } from "@/db/schema";

export interface Task {
  id: number;
  title: string;
  description: string;
}

const TASKS: Task[] = [
  { id: 1, title: "Task 1", description: "This is task 1" },
  { id: 2, title: "Task 2", description: "This is task 2" },
  { id: 3, title: "Task 3", description: "This is task 3" },
  { id: 4, title: "Task 4", description: "This is task 4" },
  { id: 5, title: "Task 5", description: "This is task 5" },
  { id: 6, title: "Task 6", description: "This is task 6" },
  { id: 7, title: "Task 7", description: "This is task 7" },
  { id: 8, title: "Task 8", description: "This is task 8" },
  { id: 9, title: "Task 9", description: "This is task 9" },
  { id: 10, title: "Task 10", description: "This is task 10" },
];

const app = new Hono()
  .get("/", clerkMiddleware(), async (c) => {
    checkAuth(c);

    const queryParams = c.req.query();
    // Destructure with default values
    const { limit = "10", offset = "0", keyword = "" } = queryParams;
    // Convert limit and offset to numbers if necessary
    const numericLimit = parseInt(limit, 10);
    const numericOffset = parseInt(offset, 10);
    const filteredTasks = TASKS.filter((task) =>
      task.title.toLowerCase().includes(keyword.toLowerCase())
    );
    // const { limit = 10, offset = 0 } = c.req.query;
    return c.json({
      error: false,
      message: "Task retrieved successfully",
      // data: TASKS.slice(numericOffset, numericOffset + numericLimit),
      data: filteredTasks.slice(numericOffset, numericOffset + numericLimit),
    });
  })
  .get("/db", async (c) => {
    checkAuth(c);
    const result = await db.select().from(tasks);
    return c.json({
      error: false,
      message: "DB connected",
      data: result,
    });
  });

export default app;
