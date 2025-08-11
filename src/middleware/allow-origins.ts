import { Context, Next } from "hono";
import { cors } from "hono/cors";
import prisma from "../lib/prisma-client";

export const allowOrigins = async (c: Context, next: Next) => {
  const adminId = c.get("admin_id") as string;
  const data = await prisma.authorizeUri.findMany({
    where: {
      userId: adminId,
    },
    select: {
      url: true,
    },
  });
  const allowed = data.map((item) => item.url);

  return cors({
    origin: (origin) => {
      if (!origin) return null; // block request tanpa origin
      return allowed.includes(origin) ? origin : null;
    },
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })(c, next);
};
