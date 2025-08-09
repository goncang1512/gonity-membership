import AddAccess from "@/src/components/layouts/membership/create/add-access";
import FeatureMember from "@/src/components/layouts/membership/create/feature-member";
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
        <CardContent className="space-y-6">
          <MembershipInput />

          {/* Features */}
          <Suspense fallback={<Skeleton className="w-full h-20" />}>
            <FeatureMember />
          </Suspense>

          {/* Badge/Icon Upload */}
          <div className="space-y-2">
            <Label>Membership Badge/Icon</Label>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-md border flex items-center justify-center bg-gray-50">
                <UploadCloud className="w-6 h-6 text-gray-400" />
              </div>
              <Button variant="outline">
                <UploadCloud className="w-4 h-4 mr-2" /> Upload Image
              </Button>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between pt-4">
            <Label htmlFor="status">Status</Label>
            <Select>
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
            <Button>Save Plan</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
