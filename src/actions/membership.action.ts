"use server";

import { generateId } from "better-auth";
import prisma from "../lib/prisma-client";
import { $Enums } from "@prisma/client";
import { auth } from "../lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export type CreateMembershipType = {
  name: string;
  description: string;
  price: number;
  duration: number;
  feature: string[];
  badgeFile: File;
  status: string;
};

export const createMembership = async (formData: FormData) => {
  try {
    const data: CreateMembershipType = {
      name: String(formData.get("name") || ""),
      description: String(formData.get("description") || ""),
      price: Number(formData.get("price") || ""),
      duration: Number(formData.get("duration") || ""),
      feature: [],
      badgeFile: formData.get("badge") as File,
      status: String(formData.get("status")),
    };

    // Loop semua field di formData
    for (const [key] of formData.entries()) {
      if (key.startsWith("checkbox-")) {
        data.feature.push(key.split("checkbox-")[1] || "");
      }
    }

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const result = await prisma.membership.create({
      data: {
        id: generateId(32),
        name: data.name,
        description: data.description,
        price: data.price,
        duration: data.duration,
        userId: String(session?.user.id),
        feature: data.feature,
        status: data.status as $Enums.StatusMembership,
        badge: "",
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

export const getMembership = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const result = await prisma.membership.findMany({
      where: {
        userId: String(session?.user.id),
      },
      select: {
        id: true,
        name: true,
        price: true,
        duration: true,
        status: true,
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

export const deleteMembership = async (tier_id: string) => {
  try {
    const result = await prisma.membership.delete({
      where: {
        id: String(tier_id),
      },
    });

    revalidatePath("/dashboard/membership");
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

export const getDetailMembership = async (tier_id: string) => {
  try {
    const result = await prisma.membership.findFirst({
      where: {
        id: tier_id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        duration: true,
        feature: true,
        badge: true,
        status: true,
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

export const updateMembership = async (formData: FormData, tier_id: string) => {
  try {
    const data: CreateMembershipType = {
      name: String(formData.get("name") || ""),
      description: String(formData.get("description") || ""),
      price: Number(formData.get("price") || ""),
      duration: Number(formData.get("duration") || ""),
      feature: [],
      badgeFile: formData.get("badge") as File,
      status: String(formData.get("status")),
    };

    // Loop semua field di formData
    for (const [key] of formData.entries()) {
      if (key.startsWith("checkbox-")) {
        data.feature.push(key.split("checkbox-")[1] || "");
      }
    }

    const result = await prisma.membership.update({
      where: {
        id: tier_id,
      },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        duration: data.duration,
        feature: data.feature,
        status: data.status as $Enums.StatusMembership,
        badge: "",
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
