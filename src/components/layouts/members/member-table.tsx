import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { Edit, Trash, Eye } from "lucide-react";
import { Card, CardContent } from "../../ui/card";
import { getAllMembers } from "@/src/actions/members.load";
import { $Enums } from "@prisma/client";
import { format } from "date-fns";
import PaginationPage from "../pagination-page";
import { Badge } from "../../ui/badge";
import { redirect } from "next/navigation";
import DeleteMember from "./delete-member";

function StatusBadge({ status }: { status: $Enums.SubscriptionStatus }) {
  const colors: Record<$Enums.SubscriptionStatus, string> = {
    active: "bg-green-100 text-green-700",
    canceled: "bg-red-100 text-red-700",
    expired: "bg-yellow-100 text-yellow-700",
    pending: "bg-orange-100 text-orange-700",
  };

  return <Badge className={`${colors[status]} capitalize`}>{status}</Badge>;
}

export async function MemberTable({
  page,
  status,
  name,
}: {
  page?: string;
  status?: string;
  name?: string;
}) {
  const result = await getAllMembers(Number(page ?? 1), 10, name, status);

  const totalPage = Number(result.data?.totalPage ?? 1);
  const currentPage = Number(page ?? 1);

  if (currentPage > totalPage && currentPage !== 1) {
    const query: Record<string, string> = {};

    if (name) query.name = name;
    if (status) query.status = status;
    query.page = totalPage ? String(totalPage) : "1";

    const urlSearch = new URLSearchParams(query);

    return redirect(`?${urlSearch.toString()}`);
  }

  return (
    <div className="grid gap-4">
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No.</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Membership Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(result.data?.data ?? []).map((member, i) => (
                <TableRow key={member.id}>
                  <TableCell>
                    {((result.data?.page ?? 1) - 1) * 10 + (i + 1)}
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    {member.name}
                  </TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.membership.name}</TableCell>
                  <TableCell>
                    <StatusBadge status={member.status} />
                  </TableCell>
                  <TableCell>
                    {format(member.createdAt, "MMMM dd, yyyy")}
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Eye className="w-4 h-4 cursor-pointer text-gray-500 hover:text-gray-700" />
                    <Edit className="w-4 h-4 cursor-pointer text-gray-500 hover:text-gray-700" />
                    <DeleteMember subscribe_id={member.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex justify-end w-full">
        <PaginationPage
          totalHalaman={result.data?.totalPage ?? 1}
          page={result.data?.page ?? 1}
        />
      </div>
    </div>
  );
}
