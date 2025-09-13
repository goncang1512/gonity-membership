import { getAllTransactions } from "@/src/actions/transaction.action";
import FilterTransactions from "@/src/components/layouts/transactions/filter-transactions";
import StatsCard from "@/src/components/layouts/transactions/stats-cards";
import TableTransactions from "@/src/components/layouts/transactions/table-transactions";
import { Button } from "@/src/components/ui/button";
import { Download, Plus, Settings } from "lucide-react";
import React from "react";

export default async function TransactionPage() {
  const data = await getAllTransactions();

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
        <StatsCard transactions={data.data ?? []} />
      </div>

      {/* Filters */}
      <FilterTransactions />

      {/* Table */}
      <TableTransactions transactions={data.data ?? []} />
    </div>
  );
}
