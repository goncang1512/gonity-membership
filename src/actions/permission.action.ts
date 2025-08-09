"use server";

import { generateId } from "better-auth";
import prisma from "../lib/prisma-client";
import { auth } from "../lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export const createPermission = async (formData: FormData) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const result = await prisma.permission.create({
      data: {
        id: generateId(32),
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        userId: String(session?.user.id),
      },
    });

    revalidatePath("/dashboard/membership/create");
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

export const getPermission = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const result = await prisma.permission.findMany({
      where: {
        userId: String(session?.user.id),
      },
      select: {
        id: true,
        name: true,
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
      data: [],
    };
  }
};

export const deletePermission = async (permission_id: string) => {
  try {
    const result = await prisma.permission.delete({
      where: {
        id: permission_id,
      },
    });

    revalidatePath("/dashboard/membership/create");
    return {
      status: true,
      statusCode: 201,
      message: "Success",
      data: result,
    };
  } catch (error) {
    console.log(error);

    return {
      status: false,
      statusCode: 500,
      message: "Internal Server Error",
      data: [],
    };
  }
};
