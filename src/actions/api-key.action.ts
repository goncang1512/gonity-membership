"use server";

import { headers } from "next/headers";
import { auth } from "../lib/auth";
import prisma from "../lib/prisma-client";
import { revalidatePath } from "next/cache";
import { generateId } from "better-auth";
import { Enterprise, Pro } from "../utils/permission";
import AppError from "../utils/app-error";
import gonityFy from "../lib/gonityfy";

export const generateApiKey = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const result = await gonityFy.checkMembership({
      user_id: String(session?.user.id),
      permission: [...Enterprise, ...Pro],
    });

    let expiresIn: number | null = 60 * 60 * 24 * 7;

    if (result.data) {
      expiresIn = null;
    }

    await prisma.apikey.deleteMany({
      where: {
        userId: String(session?.user.id),
      },
    });

    await auth.api.createApiKey({
      body: {
        name: "Membership API KEY",
        expiresIn: expiresIn,
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
    return {
      status: false,
      statusCode: 500,
      message: "Internal Server Error",
      data: null,
    };
  }
};

export const getApiKey = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const apiKey = await prisma.apikey.findFirst({
      where: {
        userId: String(session?.user.id),
      },
      select: {
        key: true,
        expiresAt: true,
      },
    });

    return {
      status: true,
      statusCode: 200,
      message: "Success get api key",
      data: apiKey,
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

export const createAuthroizeURIs = async (
  body: { id: string; url: string; type: string }[]
) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const result = await gonityFy.checkMembership({
      user_id: String(session?.user.id),
      permission: Enterprise,
    });

    if (!result.data) {
      const getUris = await prisma.authorizeUri.count({
        where: {
          userId: String(session?.user.id),
        },
      });

      if (getUris >= 3) {
        throw new AppError("Limited Authorized redirect URIs", 422);
      }
    }

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
          type: String(item.type),
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
    if (error instanceof AppError) {
      return {
        status: false,
        statusCode: error.statusCode,
        message: error.message,
        data: null,
      };
    }

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

    const [results, notificationUri] = await Promise.all([
      prisma.authorizeUri.findMany({
        where: {
          userId: String(session?.user.id),
          type: "authorize",
        },
        select: { id: true, url: true },
        orderBy: { createdAt: "asc" },
      }),
      prisma.authorizeUri.findMany({
        where: {
          userId: String(session?.user.id),
          type: "notification",
        },
        select: { id: true, url: true },
        orderBy: { createdAt: "asc" },
      }),
    ]);

    return {
      status: true,
      statusCode: 200,
      message: "Success",
      data: { authorize: results, notificationUri },
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
