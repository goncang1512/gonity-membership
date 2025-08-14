import React from "react";
import { Card } from "../../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { MoreHorizontal } from "lucide-react";
import { TransactionType } from "./stats-cards";

export default function TableTransactions({
  transactions,
}: {
  transactions: TransactionType[];
}) {
  return (
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
              <TableCell>{tx.customerName}</TableCell>
              <TableCell>{tx.tier.name}</TableCell>
              <TableCell>{tx.amount}</TableCell>
              <TableCell>
                <Badge
                  className={`${
                    tx.status === "succeeded"
                      ? "bg-green-100 text-green-600"
                      : tx.status === "failed"
                      ? "bg-red-100 text-red-600"
                      : tx.status === "refunded"
                      ? "bg-blue-100 text-blue-600"
                      : tx.status === "pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-gray-100 text-gray-600"
                  } capitalize`}
                >
                  {tx.status}
                </Badge>
              </TableCell>
              <TableCell>{tx.method}</TableCell>
              <TableCell>{String(tx?.paidAt ?? "-")}</TableCell>
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
  );
}
