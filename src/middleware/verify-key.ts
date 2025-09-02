import { Context, Next } from "hono";
import prisma from "../lib/prisma-client";

export const verifyApi = async (c: Context, next: Next) => {
  try {
    const bearer = c.req.header("Authorization");
    const key = bearer?.split(" ")[1];

    const path = c.req.path; // path request

    if (path.startsWith("/api/v1/subscribe/check/")) {
      c.set("admin_id", "system");
      return await next();
    }

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

    const isAllowed = allowedOrigin.some((item) => item.url === origin);

    if (origin && !isAllowed) {
      return c.json({ error: "URIs not allowed." }, { status: 403 });
    }

    const now = new Date();
    if (data.expiresAt && data.expiresAt < now) {
      return c.json({ error: "API key expired" }, { status: 403 });
    }

    c.set("admin_id", data.userId);

    await next();
  } catch (error) {
    console.log("ERROR", error);
  }
};
