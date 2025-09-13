"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Button } from "@/src/components/ui/button";

export default function AccountSettings() {
  const [deleteConfirm, setDeleteConfirm] = useState("");

  return (
    <div className="space-y-6 p-5 max-md:px-2">
      {/* Page Title */}
      <h1 className="text-2xl font-bold">Account Settings</h1>
      <p className="text-sm text-muted-foreground">
        Manage your company details, security, and subscription.
      </p>

      {/* Tabs */}
      <Tabs defaultValue="company">
        <TabsList className="mb-4">
          <TabsTrigger value="company">Company Info</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="plan">Plan Subscription</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Company Profile */}
      <Card>
        <CardHeader>
          <CardTitle>Company Profile</CardTitle>
          <p className="text-sm text-muted-foreground">
            Update your company's general information. This will be visible to
            collaborators and in invoices.
          </p>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Company Name</label>
              <Input defaultValue="Acme Corp" />
            </div>
            <div>
              <label className="text-sm font-medium">Website</label>
              <Input defaultValue="https://www.acmecorp.com" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Industry</label>
            <Input defaultValue="Software Development" />
          </div>
          <div>
            <label className="text-sm font-medium">Company Biography</label>
            <Textarea defaultValue="Acme Corp is a leading provider of innovative software solutions, dedicated to empowering businesses worldwide with cutting-edge technology and exceptional service." />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline">Discard</Button>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>

      {/* Billing Address */}
      <Card>
        <CardHeader>
          <CardTitle>Billing Address</CardTitle>
          <p className="text-sm text-muted-foreground">
            Update your primary billing address for invoicing and communication.
          </p>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Address Line 1</label>
              <Input defaultValue="123 Innovation Drive" />
            </div>
            <div>
              <label className="text-sm font-medium">
                Address Line 2 (Optional)
              </label>
              <Input defaultValue="Suite 100" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">City</label>
              <Input defaultValue="Techville" />
            </div>
            <div>
              <label className="text-sm font-medium">State / Province</label>
              <Input defaultValue="CA" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Zip / Postal Code</label>
              <Input defaultValue="90210" />
            </div>
            <div>
              <label className="text-sm font-medium">Country</label>
              <Input defaultValue="United States" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Update Address</Button>
        </CardFooter>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-300 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-600">Danger Zone</CardTitle>
          <p className="text-sm text-red-600">
            Proceed with caution. These actions are irreversible and will affect
            your account data.
          </p>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            <label className="text-sm font-medium">
              Type "DELETE" to confirm
            </label>
            <Input
              value={deleteConfirm}
              onChange={(e) => setDeleteConfirm(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="destructive" disabled={deleteConfirm !== "DELETE"}>
            Delete Account
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
