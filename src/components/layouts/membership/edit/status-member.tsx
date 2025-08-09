"use client";
import { Label } from "@/src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { $Enums } from "@prisma/client";
import React, { useEffect, useState } from "react";

export default function StatusMember({
  status,
}: {
  status?: $Enums.StatusMembership;
}) {
  const [value, setValue] = useState(String(status));

  return (
    <div className="flex items-center justify-between pt-4">
      {/* Status */}
      <Label htmlFor="status">Status</Label>
      <Select
        value={value}
        onValueChange={(value) => setValue(value)}
        name="status"
      >
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
  );
}
