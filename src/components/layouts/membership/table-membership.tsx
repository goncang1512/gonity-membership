import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Button } from "../../ui/button";
import { Pencil, Trash } from "lucide-react";
import { Badge } from "../../ui/badge";

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Active":
      return (
        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
          {status}
        </Badge>
      );
    case "Pending":
      return (
        <Badge
          variant="secondary"
          className="bg-gray-100 text-gray-600 hover:bg-gray-100"
        >
          {status}
        </Badge>
      );
    case "Inactive":
      return (
        <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
          {status}
        </Badge>
      );
    default:
      return <Badge>{status}</Badge>;
  }
};

export default function TableMembership({ data }: { data: any[] }) {
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
        {data.map((tier, index) => (
          <TableRow key={index}>
            <TableCell>{tier.name}</TableCell>
            <TableCell>{tier.price}</TableCell>
            <TableCell>{tier.duration}</TableCell>
            <TableCell>{getStatusBadge(tier.status)}</TableCell>
            <TableCell className="text-right space-x-2">
              <Button variant="outline" size="icon">
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="text-red-500 hover:text-red-600"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
