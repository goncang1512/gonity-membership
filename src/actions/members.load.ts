import { headers } from "next/headers";
import { auth } from "../lib/auth";
import prisma from "../lib/prisma-client";
import StatsMembership from "../utils/stats-dashboard";
import { $Enums } from "@prisma/client";
import { subDays } from "date-fns";
import { UserCheck, UserMinus, UserPlus, Users } from "lucide-react";

export const getAllMembers = async (
  page = 1,
  limit = 10,
  name?: string,
  status?: string
) => {
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
        ...(name
          ? {
              OR: [
                { name: { contains: name, mode: "insensitive" } },
                { email: { contains: name, mode: "insensitive" } },
              ],
            }
          : {}),
        ...(status && {
          status: status as $Enums.SubscriptionStatus,
        }),
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

    const totalCount = await prisma.subscribe.count({
      where: {
        ...(name
          ? {
              OR: [
                { name: { contains: name, mode: "insensitive" } },
                { email: { contains: name, mode: "insensitive" } },
              ],
            }
          : {}),
        ...(status && {
          status: status as $Enums.SubscriptionStatus,
        }),
      },
    });

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

export async function getDashboardStats() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const statsMember = new StatsMembership(String(session?.user.id));

    const [users, memberships, revenue, tiers] = await Promise.all([
      statsMember.getTotalUsers(),
      statsMember.getActiveMemberships(),
      statsMember.getMonthlyRevenue(),
      statsMember.getTierMember(),
    ]);

    return {
      status: true,
      statusCode: 200,
      message: "Success get stats dashboard",
      data: [
        {
          value: users.value.toLocaleString(),
          change: users.change,
        },
        {
          value: memberships.value.toLocaleString(),
          change: memberships.change,
        },
        {
          value: revenue.value,
          change: revenue.change,
        },
        {
          value: `${tiers.length} Tiers`,
          change: tiers.map((item) => item.name).join(", "),
        },
      ],
    };
  } catch (error) {
    return {
      status: false,
      statusCode: 500,
      message: "Internal Server Error",
      data: null,
    };
  }
}

export async function getOverviewCards() {
  const now = new Date();
  const last30Days = subDays(now, 30);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Query paralel biar lebih cepat
  const [totalMembers, activeMembers, pendingMembers, newThisMonth] =
    await Promise.all([
      prisma.subscribe.count({
        where: {
          userId: String(session?.user.id),
        },
      }), // Total semua
      prisma.subscribe.count({
        where: { status: "active", userId: String(session?.user.id) },
      }),
      prisma.subscribe.count({
        where: { status: "pending", userId: String(session?.user.id) },
      }),
      prisma.subscribe.count({
        where: {
          userId: String(session?.user.id),
          createdAt: {
            gte: last30Days,
          },
        },
      }),
    ]);

  return [
    {
      title: "Total Members",
      description: "Platform wide",
      value: totalMembers,
      icon: Users,
    },
    {
      title: "Active Members",
      description: "Currently subscribed",
      value: activeMembers,
      icon: UserCheck,
    },
    {
      title: "Pending Members",
      description: "Awaiting approval",
      value: pendingMembers,
      icon: UserMinus,
    },
    {
      title: "New This Month",
      description: "Last 30 days",
      value: newThisMonth,
      icon: UserPlus,
    },
  ];
}
