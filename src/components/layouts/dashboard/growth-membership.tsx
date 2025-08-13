"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function GrowthMembership() {
  const data = [
    { month: "Jan", newMembers: 180, cancellations: 25 },
    { month: "Feb", newMembers: 225, cancellations: 40 },
    { month: "Mar", newMembers: 200, cancellations: 20 },
    { month: "Apr", newMembers: 240, cancellations: 50 },
    { month: "May", newMembers: 280, cancellations: 35 },
    { month: "Jun", newMembers: 300, cancellations: 40 },
  ];

  return (
    <Card className="rounded-xl border border-neutral-200 shadow-sm pl-0">
      <CardHeader>
        <CardTitle>Member Growth Over Time</CardTitle>
        <p className="text-sm text-neutral-500">
          New Members vs. Cancellations
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="newMembers"
                stroke="#2563eb"
                strokeWidth={2}
                dot={false}
                name="New Members"
              />
              <Line
                type="monotone"
                dataKey="cancellations"
                stroke="#10b981"
                strokeWidth={2}
                dot={false}
                name="Cancellations"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
