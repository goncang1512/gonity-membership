import prisma from "@/src/lib/prisma-client";
import { Hono } from "hono";

const paymentApp = new Hono().post("/:status", async (c) => {
  try {
    const body = await c.req.json();

    const hasSuscribe = await prisma.subscribe.findFirst({
      where: {
        memberId: body.user_id,
      },
      select: {
        id: true,
      },
    });

    return c.json(
      {
        status: true,
        statusCode: 201,
        message: "Success payment membership",
        data: null,
      },
      { status: 201 }
    );
  } catch (error) {
    return c.json(
      {
        status: false,
        statusCode: 500,
        message: "Internal Server Error",
        data: null,
      },
      { status: 500 }
    );
  }
});

export default paymentApp;
