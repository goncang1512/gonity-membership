"use server";

import { generateId } from "better-auth";
import prisma from "../lib/prisma-client";
import { $Enums } from "@prisma/client";
import { auth } from "../lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { chartColors } from "../utils/color-charts";
import { endOfMonth, format, startOfMonth, subMonths } from "date-fns";

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
        status: data.status as $Enums.StatusMembership,
        permissions: {
          connect: data.feature.map((id) => ({ id })),
        },
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
        permissions: true,
        status: true,
      },
      orderBy: {
        price: "desc",
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
        permissions: {
          select: {
            id: true,
            name: true,
          },
        },
        duration: true,
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
        status: data.status as $Enums.StatusMembership,
        permissions: {
          set: data.feature.map((id) => ({ id })),
        },
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

export async function getMembershipStats(userId: string) {
  const now = new Date();
  const oneYearAgo = subMonths(now, 11);

  const subscribes = await prisma.subscribe.findMany({
    where: {
      userId,
      createdAt: {
        gte: startOfMonth(oneYearAgo),
        lte: endOfMonth(now),
      },
    },
    select: {
      createdAt: true,
      status: true,
    },
  });

  const months: { month: string; newMembers: number; cancellations: number }[] =
    [];

  for (let i = 0; i < 12; i++) {
    const date = subMonths(now, 11 - i);
    const monthLabel = format(date, "MMM");

    const newMembers = subscribes.filter(
      (s) =>
        s.status === "active" &&
        format(s.createdAt, "yyyy-MM") === format(date, "yyyy-MM")
    ).length;

    const cancellations = subscribes.filter(
      (s) =>
        ["canceled", "pending", "expired"].includes(String(s.status)) &&
        format(s.createdAt, "yyyy-MM") === format(date, "yyyy-MM")
    ).length;

    // hanya push kalau ada datanya
    if (newMembers > 0 || cancellations > 0) {
      months.push({ month: monthLabel, newMembers, cancellations });
    }
  }

  return months;
}

export const getAnalyticMembership = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const memberships = await prisma.membership.findMany({
      where: {
        userId: session?.user.id,
      },
      select: {
        name: true,
        _count: {
          select: { subscribe: true },
        },
      },
      orderBy: {
        price: "desc",
      },
    });

    const subscribes = memberships.map((item, index) => ({
      name: item.name,
      value: item._count.subscribe,
      color: chartColors[index],
    }));

    return {
      status: true,
      statusCode: 201,
      message: "Success",
      data: {
        pieChart: subscribes,
        statsLine: await getMembershipStats(String(session?.user.id)),
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
