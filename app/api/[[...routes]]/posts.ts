import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { Hono } from "hono";
import { authMiddleware } from "./route";
import { currentUser } from "@clerk/nextjs/server";
import { swaggerUI } from "@hono/swagger-ui";

interface Post {
  id: number;
  title: string;
  description: string;

}

const app = new Hono();

const POSTS: Post[] = [
  { id: 1, title: "Post 1", description: "This is post 1" },
  { id: 2, title: "Post 2", description: "This is post 2" },
  { id: 3, title: "Post 3", description: "This is post 3" },
  { id: 4, title: "Post 4", description: "This is post 4" },
  { id: 5, title: "Post 5", description: "This is post 5" },
];


app.get("/", authMiddleware(), async (c) => {
  const queryParams = c.req.query();
  // Destructure with default values
  const { limit = "10", offset = "0", keyword = "" } = queryParams;
  // Convert limit and offset to numbers if necessary
  const numericLimit = parseInt(limit, 10);
  const numericOffset = parseInt(offset, 10);
  const filteredPosts = POSTS.filter((post) =>
    post.title.toLowerCase().includes(keyword.toLowerCase())
  );
  // const { limit = 10, offset = 0 } = c.req.query;
  return c.json({
    error: false,
    message: "Task retrieved successfully",
    // data: TASKS.slice(numericOffset, numericOffset + numericLimit),
    data: filteredPosts.slice(numericOffset, numericOffset + numericLimit),
  });
});



export default app;
