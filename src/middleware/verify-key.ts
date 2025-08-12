import { Context, Next } from "hono";
import prisma from "../lib/prisma-client";

export const verifyApi = async (c: Context, next: Next) => {
  const bearer = c.req.header("Authorization");
  const key = bearer?.split(" ")[1];

  if (!key) {
    return c.json(
      {
        status: false,
        statusCode: 403,
        message: "Unauthorization",
        data: null,
      },
      { status: 403 }
    );
  }

  const data = await prisma.apikey.findUnique({
    where: { key },
    select: {
      key: true,
      userId: true,
      expiresAt: true,
    },
  });

  if (!data) {
    return c.json(
      {
        status: false,
        statusCode: 403,
        message: "Invalid Api Key",
        data: null,
      },
      { status: 403 }
    );
  }

  const allowedOrigin = await prisma.authorizeUri.findMany({
    where: {
      userId: data.userId,
    },
    select: {
      url: true,
    },
  });
  const origin = c.req.header("Origin");

  if (!allowedOrigin.some((item) => item.url !== origin)) {
    return c.json({ error: "URIs not allowed." }, { status: 403 });
  }

  const now = new Date();
  if (data.expiresAt && data.expiresAt < now) {
    return c.json({ error: "API key expired" }, { status: 403 });
  }

  c.set("admin_id", data.userId);

  await next();
};
