import FilterTransactions from "@/src/components/layouts/transactions/filter-transactions";
import StatsCard from "@/src/components/layouts/transactions/stats-cards";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import {
  Calendar,
  Download,
  Filter,
  MoreHorizontal,
  Plus,
  Settings,
} from "lucide-react";
import React from "react";

interface Transaction {
  id: string;
  customer: string;
  tier: string;
  amount: string;
  status: "Succeeded" | "Failed" | "Pending" | "Refunded" | "Disputed";
  method: string;
  date: string;
}

const transactions: Transaction[] = [
  {
    id: "TRN-001",
    customer: "Alice Smith",
    tier: "Premium",
    amount: "USD 120.00",
    status: "Succeeded",
    method: "•••• 4242",
    date: "2023-11-28, 14:15 PM",
  },
  {
    id: "TRN-002",
    customer: "Bob Johnson",
    tier: "Standard",
    amount: "EUR 50.00",
    status: "Failed",
    method: "•••• 0010",
    date: "2023-11-27, 09:00 AM",
  },
  {
    id: "TRN-003",
    customer: "Carol White",
    tier: "Basic",
    amount: "GBP 25.00",
    status: "Pending",
    method: "•••• 3000",
    date: "2023-11-26, 18:45 PM",
  },
  {
    id: "TRN-004",
    customer: "David Green",
    tier: "Premium",
    amount: "USD 75.00",
    status: "Refunded",
    method: "•••• 9876",
    date: "2023-11-25, 11:20 AM",
  },
  {
    id: "TRN-005",
    customer: "Eve Black",
    tier: "Standard",
    amount: "CAD 90.00",
    status: "Disputed",
    method: "•••• 5555",
    date: "2023-11-24, 16:05 PM",
  },
  {
    id: "TRN-006",
    customer: "Frank Blue",
    tier: "Basic",
    amount: "AUD 30.00",
    status: "Succeeded",
    method: "•••• 1122",
    date: "2023-11-23, 10:00 AM",
  },
  {
    id: "TRN-007",
    customer: "Grace Brown",
    tier: "Premium",
    amount: "USD 150.00",
    status: "Succeeded",
    method: "•••• 6789",
    date: "2023-11-22, 08:30 AM",
  },
];

export default function TransactionPage() {
  return (
    <div className="space-y-6 p-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <div className="flex gap-2">
          <Button variant="default" className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> Create Payment
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" /> Export
          </Button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard />
      </div>

      {/* Filters */}
      <FilterTransactions />

      {/* Table Actions */}
      <div className="flex gap-2">
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="w-4 h-4" /> Export Data
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Settings className="w-4 h-4" /> Manage Columns
        </Button>
      </div>

      {/* Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Customer Name</TableHead>
              <TableHead>Membership Tier</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Payment Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell>{tx.id}</TableCell>
                <TableCell>{tx.customer}</TableCell>
                <TableCell>{tx.tier}</TableCell>
                <TableCell>{tx.amount}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      tx.status === "Succeeded"
                        ? "bg-green-100 text-green-600"
                        : tx.status === "Failed"
                        ? "bg-red-100 text-red-600"
                        : tx.status === "Refunded"
                        ? "bg-blue-100 text-blue-600"
                        : tx.status === "Disputed"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-gray-100 text-gray-600"
                    }
                  >
                    {tx.status}
                  </Badge>
                </TableCell>
                <TableCell>{tx.method}</TableCell>
                <TableCell>{tx.date}</TableCell>
                <TableCell>
                  <Button size="icon" variant="ghost">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
