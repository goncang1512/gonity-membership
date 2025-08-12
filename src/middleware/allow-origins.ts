import { Context, Next } from "hono";
import { cors } from "hono/cors";
import prisma from "../lib/prisma-client";

export const allowOrigins = async (c: Context, next: Next) => {
  const origin = c.req.header("Origin");
  const data = await prisma.authorizeUri.findMany({
    where: {
      url: origin,
    },
    select: {
      url: true,
    },
  });

  const allowed = data.map((item) => item.url);

  return cors({
    origin: allowed,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })(c, next);
};
