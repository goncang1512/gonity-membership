// src/app-services/auth-handler.ts
import { Hono } from "hono";
import { cors } from "hono/cors";
import { auth } from "../lib/auth";

const authApp = new Hono();

authApp.use(
  "/api/auth/*", // or replace with "*" to enable cors for all routes
  cors({
    origin: process.env.BETTER_AUTH_URL || "", // replace with your origin
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
);

authApp.on(["GET", "POST"], "/*", (c) => {
  return auth.handler(c.req.raw);
});

export default authApp;
