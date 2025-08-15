import { headers } from "next/headers";
import { auth } from "../lib/auth";
import prisma from "../lib/prisma-client";

export const getAllMembers = async (page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const result = await prisma.subscribe.findMany({
      skip: Number(skip),
      take: limit,
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

    const totalCount = await prisma.subscribe.count();

    return {
      status: true,
      statusCode: 201,
      message: "Success",
      data: {
        data: result,
        total: totalCount,
        page: page,
        totalPage: Math.ceil(totalCount / limit),
      },
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
