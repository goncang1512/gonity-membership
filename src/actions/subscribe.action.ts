"use server";

import { generateId } from "better-auth";
import prisma from "../lib/prisma-client";
import { addDays } from "date-fns";

export const sendNotification = async (transaction_id: string) => {
  try {
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

    return {
      status: true,
      statusCode: 201,
      message: "Success",
      data: subscribe,
    };
  } catch (error) {
    return {
      status: false,
      statusCode: 500,
      message: "Internal Server Error",
      data: null,
    };
  }
};
