import { headers } from "next/headers";
import { auth } from "../lib/auth";
import prisma from "../lib/prisma-client";

export const getAllMembers = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const result = await prisma.subscribe.findMany({
      where: {
        userId: session?.user.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
        membership: {
          select: {
            name: true,
          },
        },
        createdAt: true,
      },
    });

    return {
      status: true,
      statusCode: 201,
      message: "Success",
      data: result,
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
