"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ArrowRight, DollarSign, Users, BarChart3 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";

const data = [
  { month: "Jan", Donations: 800, Supporters: 200 },
  { month: "Feb", Donations: 950, Supporters: 250 },
  { month: "Mar", Donations: 1200, Supporters: 300 },
  { month: "Apr", Donations: 1500, Supporters: 400 },
  { month: "May", Donations: 1700, Supporters: 420 },
  { month: "Jun", Donations: 1900, Supporters: 450 },
];

export default function Dashboard() {
  return (
    <div className="p-5 grid gap-4">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-1 col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Donations Today
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,234.56</div>
            <p className="text-xs text-muted-foreground">
              ↑ 15% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Donors This Week
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">567</div>
            <p className="text-xs text-muted-foreground">
              +32 compared to last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Average Donation This Month
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$25.75</div>
            <p className="text-xs text-muted-foreground">
              Compared to last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Chart + Recent Donations */}
      {/* Donation Growth Chart */}
      <div className="grid gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Donation Growth</CardTitle>
            <Button variant="ghost" size="sm" className="text-blue-500">
              View Report <ArrowRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="max-md:px-0 max-md:pr-3">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="Donations"
                    stroke="#3b82f6"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="Supporters"
                    stroke="#10b981"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Donations */}
        <div className="grid md:grid-cols-[1fr_0.5fr] gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Donations</CardTitle>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <Table className="text-sm">
                <TableHeader className="text-muted-foreground text-left">
                  <TableRow>
                    <TableHead className="pb-2">Donor</TableHead>
                    <TableHead className="pb-2">Amount</TableHead>
                    <TableHead className="pb-2">Message</TableHead>
                    <TableHead className="pb-2">Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="breaks-words whitespace-normal">
                      Sarah Johnson
                    </TableCell>
                    <TableCell className="text-green-600 font-medium">
                      Rp20.000
                    </TableCell>
                    <TableCell className="breaks-words whitespace-normal">
                      Keep up the great work!
                    </TableCell>
                    <TableCell>2 hours ago</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Right Sidebar */}
          <div className="space-y-4">
            <Card className="bg-blue-50">
              <CardHeader>
                <CardTitle className="text-base font-semibold">
                  Alex Smith
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Biggest Supporter
                </p>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$5,000</div>
                <div className="w-full h-2 bg-gray-200 rounded mt-2">
                  <div className="h-2 bg-blue-500 rounded w-3/4"></div>
                </div>
                <Button variant="outline" className="mt-3 w-full">
                  View Profile
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-blue-500 text-white">
              <CardContent className="p-4">
                <div className="font-semibold mb-2">Withdraw Your Earnings</div>
                <Button className="bg-white text-blue-600 w-full">
                  Withdraw Now
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="font-semibold mb-2">Set Your Next Goal</div>
                <p className="text-sm text-muted-foreground">
                  Define what you want to reach for next.
                </p>
                <Button className="mt-3 w-full">Set Goal</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
