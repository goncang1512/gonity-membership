import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Button, buttonVariants } from "../../ui/button";
import { Pencil, Trash } from "lucide-react";
import { Badge } from "../../ui/badge";
import { getMembership } from "@/src/actions/membership.action";
import DeleteMembership from "./delete-membership";
import Link from "next/link";
import { cn } from "@/src/lib/utils";

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return (
        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 capitalize">
          {status}
        </Badge>
      );
    case "pending":
      return (
        <Badge
          variant="secondary"
          className="bg-gray-100 text-gray-600 hover:bg-gray-100 capitalize"
        >
          {status}
        </Badge>
      );
    case "inactive":
      return (
        <Badge className="bg-red-100 text-red-700 hover:bg-red-100 capitalize">
          {status}
        </Badge>
      );
    default:
      return <Badge>{status}</Badge>;
  }
};

export default async function TableMembership() {
  const results = await getMembership();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {results.data.map((tier) => (
          <TableRow key={tier.id}>
            <TableCell>{tier.name}</TableCell>
            <TableCell>Rp {tier.price.toLocaleString("id-ID")}</TableCell>
            <TableCell>{tier.duration} days</TableCell>
            <TableCell>{getStatusBadge(tier.status)}</TableCell>
            <TableCell className="text-right space-x-2">
              <div className="flex items-center gap-2 w-full justify-end">
                <Link
                  prefetch={true}
                  href={`/dashboard/membership/${tier.id}`}
                  className={cn(buttonVariants({ variant: "outline" }))}
                >
                  <Pencil className="h-4 w-4" />
                </Link>
                <DeleteMembership membership_id={tier.id} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
