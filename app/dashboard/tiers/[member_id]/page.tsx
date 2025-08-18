import { getDetailMembership } from "@/src/actions/membership.action";
import AddAccess from "@/src/components/layouts/tiers/create/add-access";
import FormCreate, {
  CreateMembershipButton,
} from "@/src/components/layouts/tiers/create/form-create";
import MembershipBadgeUpload from "@/src/components/layouts/tiers/create/membership-badge";
import FeatureMemberEdit from "@/src/components/layouts/tiers/edit/feature-member";
import FormEdit from "@/src/components/layouts/tiers/edit/form-edit";
import MembershipInputEdit from "@/src/components/layouts/tiers/edit/membership-input-edit";
import StatusMember from "@/src/components/layouts/tiers/edit/status-member";
import { buttonVariants } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Skeleton } from "@/src/components/ui/skeleton";
import prisma from "@/src/lib/prisma-client";
import { cn } from "@/src/lib/utils";
import Link from "next/link";
import React, { Suspense } from "react";

export default async function EditMembership({
  params,
}: {
  params: Promise<{ member_id: string }>;
}) {
  const querParams = await params;
  const data = await getDetailMembership(querParams.member_id);

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Create New Membership Plan</h1>

        <AddAccess />
      </div>
      <p className="text-gray-500">
        Define the details and features of your new membership offering.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Membership Details</CardTitle>
          <CardDescription>
            Fill in the information to create a new membership plan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormEdit tier_id={querParams.member_id}>
            <MembershipInputEdit data={data.data ?? null} />

            {/* Features */}
            <Suspense fallback={<Skeleton className="w-full h-20" />}>
              <FeatureMemberEdit feature_id={data.data?.permissions ?? []} />
            </Suspense>

            {/* Badge/Icon Upload */}
            <MembershipBadgeUpload />

            {/* STATUS */}
            <StatusMember status={data.data?.status} />
            {/* Buttons */}
            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Link
                href={"/dashboard/tiers"}
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                Cancel
              </Link>
              <CreateMembershipButton />
            </div>
          </FormEdit>
        </CardContent>
      </Card>
    </div>
  );
}
