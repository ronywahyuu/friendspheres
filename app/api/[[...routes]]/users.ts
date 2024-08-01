import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { Hono } from "hono";
import { authMiddleware, checkAuth } from "./route";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { swaggerUI } from "@hono/swagger-ui";

const app = new Hono();

// interface ProviderAccess {
  
// }

// POST LOGGED IN USER TO THE DATABASE
app.get("/", authMiddleware(), async (c) => {
  checkAuth(c);
  const user = await currentUser();
  const userId = user?.id as string;
  const providerAccess: any = user?.emailAddresses[0].linkedTo[0].type as string;
  const accessToken = await clerkClient.users.getUserOauthAccessToken(userId, providerAccess);
  return c.json({ 
    message: "Hello ",
    providerAccess: providerAccess,
    accessToken: accessToken
   });
});

app.get('/getCurrentLoginSession', async (c) => {
  checkAuth(c);

  // const currentSession = await 
});

export default app;
