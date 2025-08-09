import AddAccess from "@/src/components/layouts/membership/create/add-access";
import FeatureMember from "@/src/components/layouts/membership/create/feature-member";
import FormCreate, {
  CreateMembershipButton,
} from "@/src/components/layouts/membership/create/form-create";
import MembershipBadgeUpload from "@/src/components/layouts/membership/create/membership-badge";
import MembershipInput from "@/src/components/layouts/membership/create/membership-input";
import { Button, buttonVariants } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Skeleton } from "@/src/components/ui/skeleton";
import { Switch } from "@/src/components/ui/switch";
import { Textarea } from "@/src/components/ui/textarea";
import { cn } from "@/src/lib/utils";
import { SelectGroup } from "@radix-ui/react-select";
import { UploadCloud } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";

export default function CreateMembership() {
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
          <FormCreate>
            <MembershipInput />

            {/* Features */}
            <Suspense fallback={<Skeleton className="w-full h-20" />}>
              <FeatureMember />
            </Suspense>

            {/* Badge/Icon Upload */}
            <MembershipBadgeUpload />

            {/* Status */}
            <div className="flex items-center justify-between pt-4">
              <Label htmlFor="status">Status</Label>
              <Select name="status">
                <SelectTrigger>
                  <SelectValue placeholder="Choose status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Link
                href={"/dashboard/membership"}
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                Cancel
              </Link>
              <CreateMembershipButton />
            </div>
          </FormCreate>
        </CardContent>
      </Card>
    </div>
  );
}
