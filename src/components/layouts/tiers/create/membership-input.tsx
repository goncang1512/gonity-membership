"use client";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import React from "react";

export default function MembershipInput() {
  return (
    <>
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Membership Name</Label>
        <Input name="name" id="name" placeholder="e.g., Premium Monthly Pass" />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          name="description"
          id="description"
          placeholder="Provide a detailed description of this membership plan."
        />
      </div>

      {/* Price & Duration */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <div className="flex">
            <span className="inline-flex items-center px-3 border border-r-0 rounded-l-md bg-gray-100">
              Rp
            </span>
            <Input
              name="price"
              id="price"
              type="number"
              placeholder="0.00"
              className="rounded-l-none"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="duration">Duration</Label>
          <div className="flex">
            <Input
              name="duration"
              id="duration"
              type="number"
              placeholder="e.g., 30"
              className="rounded-r-none"
            />
            <span className="inline-flex items-center px-3 border border-l-0 rounded-r-md bg-gray-100">
              days
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
