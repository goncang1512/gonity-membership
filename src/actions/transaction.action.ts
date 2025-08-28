import { headers } from "next/headers";
import { auth } from "../lib/auth";
import prisma from "../lib/prisma-client";

export const getAllTransactions = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    const result = await prisma.transaction.findMany({
      where: {
        userId: session?.user.id,
      },
      select: {
        id: true,
        customerName: true,
        customerEmail: true,
        tier: {
          select: {
            name: true,
          },
        },
        amount: true,
        status: true,
        method: true,
        paidAt: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return {
      status: true,
      statusCode: 200,
      message: "Success get transactions",
      data: result,
    };
  } catch (error) {
    return {
      status: false,
      statusCode: 500,
      message: "Server Internal Error",
      data: [],
    };
  }
};
