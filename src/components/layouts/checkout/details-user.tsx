"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { authClient } from "@/src/lib/auth-client";

export default function DetailsUser() {
  const session = authClient.useSession();
  const [details, setDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (session.data?.user) {
      setDetails({
        name: session.data.user.name,
        email: session.data.user.email,
        phone: "",
      });
    }
  }, [session.data?.user]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          Your Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              name="name"
              value={details.name}
              onChange={(e) => setDetails({ ...details, name: e.target.value })}
              id="name"
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              value={details.email}
              onChange={(e) =>
                setDetails({ ...details, email: e.target.value })
              }
              name="email"
              id="email"
              type="email"
              placeholder="john.doe@example.com"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="phone">Phone Number (Optional)</Label>
            <Input
              name="phone"
              value={details.phone}
              onChange={(e) =>
                setDetails({ ...details, phone: e.target.value })
              }
              id="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
