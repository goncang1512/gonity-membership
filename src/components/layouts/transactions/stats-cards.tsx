import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

export default function StatsCard() {
  const statsData = [
    {
      id: 1,
      description: "Total Transactions",
      count: 7,
    },
    {
      id: 2,
      description: "Succeeded Payments",
      count: 3,
    },
    {
      id: 3,
      description: "Failed Payments",
      count: 1,
    },
    {
      id: 4,
      description: "Refunded Payments",
      count: 1,
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
