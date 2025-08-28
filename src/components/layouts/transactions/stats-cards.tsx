import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { $Enums } from "@prisma/client";

export type TransactionType = {
  id: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  status: $Enums.TransactionEnum;
  method: string;
  paidAt: Date | null;
  tier: {
    name: string;
  };
};

interface StatsCardProps {
  transactions: TransactionType[];
}

export default function StatsCard({ transactions }: StatsCardProps) {
  const statsData = [
    {
      id: 1,
      description: "Total Transactions",
      count: transactions.length,
    },
    {
      id: 2,
      description: "Succeeded Payments",
      count: transactions.filter((item) => item.status === "succeeded").length,
    },
    {
      id: 3,
      description: "Failed Payments",
      count: transactions.filter((item) => item.status === "failed").length,
    },
    {
      id: 4,
      description: "Refunded Payments",
      count: transactions.filter((item) => item.status === "refunded").length,
    },
  ];

  return statsData.map((item) => {
    return (
      <Card key={item.id}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-neutral-500">
            {item.description}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-bold">{item.count}</CardContent>
      </Card>
    );
  });
}
