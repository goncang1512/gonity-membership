"use client";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { $Enums } from "@prisma/client";
import React, { useEffect, useState } from "react";

export type MembershipType = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  duration: number;
  badge: string;
  status: $Enums.StatusMembership;
  feature: string[];
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export default function MembershipInputEdit({
  data,
}: {
  data: MembershipType | null;
}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name,
        description: data.description || "",
        price: String(data.price || ""),
        duration: String(data.duration || ""),
      });
    }
  }, [data]);

  return (
    <>
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Membership Name</Label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          name="name"
          id="name"
          placeholder="e.g., Premium Monthly Pass"
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
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
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
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
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
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
