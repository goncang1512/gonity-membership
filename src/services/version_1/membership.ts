import prisma from "@/src/lib/prisma-client";
import { Hono } from "hono";

type Variables = {
  admin_id: string;
};

const memberApp = new Hono<{ Variables: Variables }>().get("/", async (c) => {
  const admin_id = c.var.admin_id;

  const results = await prisma.membership.findMany({
    where: {
      userId: admin_id,
      status: {
        not: "inactive",
      },
    },
    select: {
      id: true,
      name: true,
      description: true,
      badge: true,
      duration: true,
      status: true,
      permissions: {
        select: {
          id: true,
          name: true,
          description: true,
          createdAt: true,
        },
      },
      price: true,
      createdAt: true,
    },
    orderBy: {
      price: "desc",
    },
  });

  return c.json({
    status: true,
    statusCode: 200,
    message: "Success get membership tier",
    data: results,
  });
});

export default memberApp;
