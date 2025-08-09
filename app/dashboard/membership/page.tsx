import TableMembership from "@/src/components/layouts/membership/table-membership";
import { buttonVariants } from "@/src/components/ui/button";
import { Skeleton } from "@/src/components/ui/skeleton";
import { cn } from "@/src/lib/utils";
import Link from "next/link";
import React, { Suspense } from "react";

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
        <Suspense fallback={<Skeleton className="w-full h-96" />}>
          <TableMembership />
        </Suspense>
      </div>
    </div>
  );
}
