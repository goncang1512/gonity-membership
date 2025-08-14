import prisma from "@/src/lib/prisma-client";
import { generateId } from "better-auth";
import { Hono } from "hono";

type Variables = {
  admin_id: string;
};

type BodyCreateTransaction = {
  name: string;
  email: string;
  member_id: string;
  amount: number;
  method: string;
  tier_id: string;
};

const transactionApp = new Hono<{ Variables: Variables }>().post(
  "/",
  async (c) => {
    const body: BodyCreateTransaction = await c.req.json();

    const result = await prisma.transaction.create({
      data: {
        id: `GPN${generateId(9).toUpperCase()}`,
        memberId: body.member_id,
        userId: c.var.admin_id,
        customerEmail: body.email,
        customerName: body.name,
        amount: body.amount,
        method: body.method,
        tierId: body.tier_id,
        status: "pending",
      },
    });

    return c.json({
      status: true,
      statusCode: 200,
      message: "Success create transaction",
      data: result,
    });
  }
);

export default transactionApp;
