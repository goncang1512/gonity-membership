import prisma from "@/src/lib/prisma-client";
import { generateId } from "better-auth";
import { addDays } from "date-fns";
import { Hono } from "hono";

type Variables = {
  admin_id: string;
};

const memberApp = new Hono<{ Variables: Variables }>()
  .get("/", async (c) => {
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
  })
  .get("/:tier_id", async (c) => {
    try {
      const tier_id = c.req.param("tier_id");

      const result = await prisma.membership.findFirst({
        where: {
          id: tier_id,
        },
        select: {
          id: true,
          name: true,
          price: true,
          duration: true,
          permissions: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      return c.json({
        status: true,
        statusCode: 200,
        message: "Success detail membership detail",
        data: result,
      });
    } catch (error) {
      return c.json({
        status: false,
        statusCode: 500,
        message: "Internal Server Error",
        data: null,
      });
    }
  })
  .post("/:transaction_id", async (c) => {
    try {
      const transaction_id = c.req.param("transaction_id");

      const transaction = await prisma.transaction.findFirst({
        where: {
          id: transaction_id,
        },
        select: {
          memberId: true,
          customerEmail: true,
          customerName: true,
          userId: true,
          tier: {
            select: {
              id: true,
              duration: true,
            },
          },
        },
      });

      const subscribe = await prisma.subscribe.create({
        data: {
          id: generateId(32),
          memberId: transaction?.memberId as string,
          email: transaction?.customerEmail as string,
          name: transaction?.customerName as string,
          expiredAt: addDays(new Date(), transaction?.tier.duration as number),
          status: "active",
          userId: transaction?.userId as string,
          membershipId: transaction?.tier.id as string,
        },
      });

      return c.json(
        {
          status: true,
          statusCode: 201,
          message: "Success",
          data: subscribe,
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

export default memberApp;
