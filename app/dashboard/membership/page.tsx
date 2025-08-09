import TableMembership from "@/src/components/layouts/membership/table-membership";
import { Badge } from "@/src/components/ui/badge";
import { Button, buttonVariants } from "@/src/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { cn } from "@/src/lib/utils";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import React from "react";

const data = [
  { name: "Basic Tier", price: "$9.99", duration: "Monthly", status: "Active" },
  {
    name: "Premium Tier",
    price: "$199.00",
    duration: "Annually",
    status: "Active",
  },
  {
    name: "Enterprise Tier",
    price: "$49.99",
    duration: "Monthly",
    status: "Pending",
  },
  {
    name: "Student Plan",
    price: "$5.99",
    duration: "Monthly",
    status: "Inactive",
  },
  {
    name: "Lifetime Access",
    price: "$999.99",
    duration: "One-time",
    status: "Active",
  },
];

export default function MembershipPage() {
  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Membership Tiers</h1>
        <Link
          href={"/dashboard/membership/create"}
          className={cn(
            buttonVariants({
              className:
                "flex items-center gap-2 bg-blue-500 hover:bg-blue-600",
              variant: "default",
            })
          )}
        >
          + Create New Membership
        </Link>
      </div>

      <div className="rounded-lg border shadow-sm p-4">
        <h2 className="text-lg font-medium mb-4">Existing Membership Tiers</h2>
        <TableMembership data={data} />
      </div>
    </div>
  );
}
