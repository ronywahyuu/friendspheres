import { Context, Hono, Next } from "hono";
import { handle } from "hono/vercel";
import tasks from "./tasks";
import posts from "./posts";
import users from "./users";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { swaggerUI } from "@hono/swagger-ui";
import { HTTPException } from "hono/http-exception";

export const runtime = "edge";

const app = new Hono().basePath("/api/v1");

export function authMiddleware() {
  return async (c: Context, next: Next) => {
    const auth = getAuth(c);

    // auth?.getToken().then((token) => {
    //   console.log(token);
    // });
    // console.log(auth?.getToken());
    if (!auth?.userId) {
      return c.json({ error: true, message: "Unauthorized" }, 401);
    }

    c.set("authData", auth);

    return next();
  };
}

export function checkAuth(context: Context<{}, "/", {}>) {
  const auth = getAuth(context);
  if (!auth?.userId) {

    throw new HTTPException(401, {
      res: context.json({ error: true, message: "Unauthorized" }, 401),
    });
  }
}


app.use('*', clerkMiddleware())
app.get("/", authMiddleware(), (c) => {
  return c.json({ message: "Hello Worldsss" });
});

app.route("/users", users);
app.route("/tasks", tasks);
app.route("/posts", posts);

export const GET = handle(app);
