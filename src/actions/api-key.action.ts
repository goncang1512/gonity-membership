"use server";

import { headers } from "next/headers";
import { auth } from "../lib/auth";
import prisma from "../lib/prisma-client";
import { revalidatePath } from "next/cache";

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
        prefix: "project-api-key",
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
