import { startOfMonth, subMonths } from "date-fns";
import prisma from "../lib/prisma-client";

class StatsMembership {
  userId: string;
  constructor(userId: string) {
    this.userId = userId;
  }

  async getTotalUsers() {
    const thisMonthStart = startOfMonth(new Date());
    const lastMonthStart = startOfMonth(subMonths(new Date(), 1));

    const thisMonthUsers = await prisma.subscribe.count({
      where: { userId: this.userId, createdAt: { gte: thisMonthStart } },
    });

    const lastMonthUsers = await prisma.subscribe.count({
      where: {
        userId: this.userId,
        createdAt: { gte: lastMonthStart, lt: thisMonthStart },
      },
    });

    const change =
      lastMonthUsers === 0
        ? 100
        : ((thisMonthUsers - lastMonthUsers) / lastMonthUsers) * 100;

    return {
      value: thisMonthUsers,
      change: `${change.toFixed(1)}% from last month`,
    };
  }

  async getActiveMemberships() {
    const thisMonthStart = startOfMonth(new Date());
    const lastMonthStart = startOfMonth(subMonths(new Date(), 1));

    const thisMonthActive = await prisma.subscribe.count({
      where: {
        userId: this.userId,
        status: "active",
        createdAt: { gte: thisMonthStart },
      },
    });

    const lastMonthActive = await prisma.subscribe.count({
      where: {
        userId: this.userId,
        status: "active",
        createdAt: { gte: lastMonthStart, lt: thisMonthStart },
      },
    });

    const change =
      lastMonthActive === 0
        ? 100
        : ((thisMonthActive - lastMonthActive) / lastMonthActive) * 100;

    return {
      value: thisMonthActive,
      change: `${change.toFixed(1)}% from last month`,
    };
  }

  async getMonthlyRevenue() {
    const thisMonthStart = startOfMonth(new Date());
    const lastMonthStart = startOfMonth(subMonths(new Date(), 1));

    const thisMonthRevenue = await prisma.transaction.aggregate({
      where: {
        userId: this.userId,
        status: "succeeded",
        paidAt: { gte: thisMonthStart },
      },
      _sum: { amount: true },
    });

    const lastMonthRevenue = await prisma.transaction.aggregate({
      where: {
        userId: this.userId,
        status: "succeeded",
        paidAt: { gte: lastMonthStart, lt: thisMonthStart },
      },
      _sum: { amount: true },
    });

    const change =
      (lastMonthRevenue._sum.amount ?? 0) === 0
        ? 100
        : (((thisMonthRevenue._sum.amount ?? 0) -
            (lastMonthRevenue._sum.amount ?? 0)) /
            (lastMonthRevenue._sum.amount ?? 1)) *
          100;

    return {
      value: `Rp${thisMonthRevenue._sum.amount?.toLocaleString() ?? 0}`,
      change: `${change.toFixed(1)}% from last month`,
    };
  }

  async getTierMember() {
    const tiers = await prisma.membership.findMany({
      where: {
        userId: this.userId,
      },
      select: {
        name: true,
        price: true,
      },
      orderBy: {
        price: "desc",
      },
    });

    return tiers;
  }
}

export default StatsMembership;
