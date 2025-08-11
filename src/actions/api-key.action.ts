"use server";

import { headers } from "next/headers";
import { auth } from "../lib/auth";
import prisma from "../lib/prisma-client";
import { revalidatePath } from "next/cache";
import { generateId } from "better-auth";

export const generateApiKey = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    await prisma.apikey.deleteMany({
      where: {
        userId: String(session?.user.id),
      },
    });

    await auth.api.createApiKey({
      body: {
        name: "Membership API KEY",
        expiresIn: 60 * 60 * 24 * 7,
        userId: session?.user.id, // server-only
        prefix: "proj_",
        remaining: 100, // server-only
        refillAmount: 100, // server-only
        refillInterval: 1000, // server-only
        rateLimitTimeWindow: 1000, // server-only
        rateLimitMax: 100, // server-only
        rateLimitEnabled: true, // server-only
      },
    });

    revalidatePath("/dashboard/api-management");
  } catch (error) {
    console.log(error);
  }
};

export const getApiKey = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    return await prisma.apikey.findFirst({
      where: {
        userId: String(session?.user.id),
      },
      select: {
        key: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const createAuthroizeURIs = async (
  body: { id: string; url: string }[]
) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    // 1. Create untuk ID new-
    const createData = body.filter(
      (item) => item.id.startsWith("new-") && item.url.trim() !== ""
    );
    for (const item of createData) {
      await prisma.authorizeUri.create({
        data: {
          id: generateId(32),
          url: String(item.url),
          userId: String(session?.user.id),
        },
      });
    }

    // 2. Update untuk ID lama
    const updateData = body.filter((item) => !item.id.startsWith("new-"));
    for (const item of updateData) {
      await prisma.authorizeUri.update({
        where: { id: item.id },
        data: { url: item.url },
      });
    }

    revalidatePath("/dashboard/api-management");
    return {
      status: true,
      statusCode: 201,
      message: "Success",
      data: null,
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

export const getAuthorizeURIs = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const results = await prisma.authorizeUri.findMany({
      where: {
        userId: String(session?.user.id),
      },
      select: {
        id: true,
        url: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return {
      status: true,
      statusCode: 200,
      message: "Success",
      data: results,
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

export const deleteAuthorizeURI = async (uri_id: string) => {
  try {
    const results = await prisma.authorizeUri.delete({
      where: {
        id: uri_id,
      },
    });

    revalidatePath("/dashboard/api-management");
    return {
      status: true,
      statusCode: 200,
      message: "Success",
      data: results,
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
