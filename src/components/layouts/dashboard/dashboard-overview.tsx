import React from "react";
import { Card, CardContent } from "../../ui/card";
import { BadgeCheck, DollarSign, Star, Users } from "lucide-react";

export default function DashboardOverview() {
  const stats = [
    {
      title: "Total Users",
      value: "12,345",
      change: "+5% from last month",
      icon: <Users className="w-5 h-5 text-blue-500" />,
    },
    {
      title: "Active Memberships",
      value: "8,910",
      change: "+12% from last month",
      icon: <BadgeCheck className="w-5 h-5 text-blue-500" />,
    },
    {
      title: "Monthly Recurring Revenue",
      value: "$150,000",
      change: "+8% from last month",
      icon: <DollarSign className="w-5 h-5 text-blue-500" />,
    },
    {
      title: "Membership Tiers",
      value: "3 Tiers",
      change: "Essentials, Pro, Enterprise",
      icon: <Star className="w-5 h-5 text-blue-500" />,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <Card
          key={i}
          className="rounded-xl shadow-sm border border-neutral-200"
        >
          <CardContent className="flex items-center justify-between px-5">
            <div className="flex flex-col justify-between gap-5">
              <p className="text-sm text-neutral-500">{stat.title}</p>
              <div>
                <h2 className="text-2xl font-semibold mt-1">{stat.value}</h2>
                <p className="text-xs text-neutral-400 mt-1">{stat.change}</p>
              </div>
            </div>
            <div className="bg-blue-100 p-2 rounded-full">{stat.icon}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
